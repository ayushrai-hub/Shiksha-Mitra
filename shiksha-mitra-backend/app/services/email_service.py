from datetime import datetime, timedelta
from typing import Any, Dict

import jwt
from fastapi import HTTPException
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

from app.core.config import settings
from app.core.security import ALGORITHM


class EmailService:
    def __init__(self):
        self.mail_conf = ConnectionConfig(
            MAIL_USERNAME=settings.EMAIL_USERNAME,
            MAIL_PASSWORD=settings.EMAIL_PASSWORD,
            MAIL_FROM=settings.EMAIL_FROM,
            MAIL_PORT=settings.EMAIL_PORT,
            MAIL_SERVER=settings.EMAIL_SERVER,
            MAIL_STARTTLS=settings.EMAIL_STARTTLS,
            MAIL_SSL_TLS=settings.EMAIL_SSL_TLS,
            USE_CREDENTIALS=settings.USE_CREDENTIALS,
            VALIDATE_CERTS=settings.VALIDATE_CERTS,
        )
        self.mail = FastMail(self.mail_conf)

    async def send_email_verification(self, email: str, user_id: int) -> str:
        """Send email verification token"""
        token_data = {
            "sub": str(user_id),
            "email": email,
            "type": "email_verification",
            "exp": datetime.utcnow() + timedelta(hours=24)
        }
        token = jwt.encode(token_data, settings.SECRET_KEY, algorithm=ALGORITHM)

        html = f"""
        <html>
            <body>
                <h2>Email Verification</h2>
                <p>Click the link below to verify your email:</p>
                <a href="{settings.FRONTEND_URL}/verify-email?token={token}">Verify Email</a>
                <p>This link expires in 24 hours.</p>
            </body>
        </html>
        """

        message = MessageSchema(
            subject="Verify Your Email",
            recipients=[email],
            body=html,
            subtype="html"
        )

        await self.mail.send_message(message)
        return token

    async def send_password_reset(self, email: str, user_id: int) -> str:
        """Send password reset token"""
        token_data = {
            "sub": str(user_id),
            "email": email,
            "type": "password_reset",
            "exp": datetime.utcnow() + timedelta(hours=1)
        }
        token = jwt.encode(token_data, settings.SECRET_KEY, algorithm=ALGORITHM)

        html = f"""
        <html>
            <body>
                <h2>Password Reset</h2>
                <p>Click the link below to reset your password:</p>
                <a href="{settings.FRONTEND_URL}/reset-password?token={token}">Reset Password</a>
                <p>This link expires in 1 hour.</p>
            </body>
        </html>
        """

        message = MessageSchema(
            subject="Reset Your Password",
            recipients=[email],
            body=html,
            subtype="html"
        )

        await self.mail.send_message(message)
        return token

    def verify_email_token(self, token: str) -> Dict[str, Any]:
        """Verify email token"""
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
            if payload.get("type") != "email_verification":
                raise HTTPException(status_code=400, detail="Invalid token type")
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=400, detail="Token expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=400, detail="Invalid token")

    def verify_password_reset_token(self, token: str) -> Dict[str, Any]:
        """Verify password reset token"""
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
            if payload.get("type") != "password_reset":
                raise HTTPException(status_code=400, detail="Invalid token type")
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=400, detail="Token expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=400, detail="Invalid token")


email_service = EmailService()
