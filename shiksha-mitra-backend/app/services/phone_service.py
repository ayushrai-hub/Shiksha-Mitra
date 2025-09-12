from datetime import datetime, timedelta
from typing import Any, Dict

import jwt
from fastapi import HTTPException
from twilio.rest import Client

from app.core.config import settings
from app.core.redis import get_redis
from app.core.security import ALGORITHM, generate_otp_secret, verify_otp


class PhoneService:
    def __init__(self):
        self.client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        self.redis = get_redis()

    async def send_otp(self, phone_number: str) -> str:
        """Send OTP to phone number and store in Redis"""
        # Generate secret for TOTP
        secret = generate_otp_secret()

        # Generate OTP
        import pyotp
        totp = pyotp.TOTP(secret)
        otp = totp.now()

        # Store secret in Redis with expiry (5 minutes)
        await self.redis.setex(f"otp_secret:{phone_number}", 300, secret)

        # Send OTP via SMS
        message = self.client.messages.create(
            body=f"Your Shiksha Mitra verification code is: {otp}",
            from_=settings.TWILIO_FROM_NUMBER,
            to=phone_number
        )

        return secret  # In production, don't return this

    async def verify_otp(self, phone_number: str, otp: str) -> bool:
        """Verify OTP"""
        secret_str = await self.redis.get(f"otp_secret:{phone_number}")
        if not secret_str:
            raise HTTPException(status_code=400, detail="OTP expired or not found")

        # Decode if needed
        secret = secret_str.decode() if isinstance(secret_str, bytes) else secret_str

        # Verify OTP
        if not verify_otp(secret, otp):
            raise HTTPException(status_code=400, detail="Invalid OTP")

        # Clean up
        await self.redis.delete(f"otp_secret:{phone_number}")

        return True

    def verify_phone_verification_token(self, token: str) -> Dict[str, Any]:
        """Verify phone verification token"""
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
            if payload.get("type") != "phone_verification":
                raise HTTPException(status_code=400, detail="Invalid token type")
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=400, detail="Token expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=400, detail="Invalid token")


phone_service = PhoneService()
