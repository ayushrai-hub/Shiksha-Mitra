from datetime import datetime
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from enum import Enum


class UserRole(str, Enum):
    Student = "student"
    Teacher = "teacher"
    Institution = "institution"
    Admin = "admin"


class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    full_name: str
    phone_number: Optional[str] = None
    role: Optional[UserRole] = UserRole.Student


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone_number: Optional[str] = None
    is_active: Optional[bool] = None


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    username: str
    full_name: str
    phone_number: Optional[str] = None
    role: UserRole
    is_active: bool
    is_superuser: bool
    is_email_verified: bool
    is_phone_verified: bool
    provider: Optional[str] = None
    two_factor_enabled: bool
    last_login: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None


class UserLogin(BaseModel):
    username_or_email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenWithRefresh(Token):
    refresh_token: str


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class TokenPayload(BaseModel):
    sub: Optional[int] = None
    role: Optional[str] = None
    exp: Optional[datetime] = None


# Email verification
class EmailVerificationRequest(BaseModel):
    email: EmailStr


class EmailVerificationVerify(BaseModel):
    token: str


# Phone verification
class PhoneVerificationRequest(BaseModel):
    phone_number: str


class PhoneVerificationVerify(BaseModel):
    phone_number: str
    otp: str


# Password reset
class PasswordResetRequest(BaseModel):
    email: EmailStr


class PasswordResetVerify(BaseModel):
    token: str
    new_password: str


# Change password
class ChangePassword(BaseModel):
    old_password: str
    new_password: str


# OAuth
class OAuthCallback(BaseModel):
    code: str
    state: Optional[str] = None


class Provider(str, Enum):
    GOOGLE = "google"
    GITHUB = "github"
    LINKEDIN = "linkedin"


# Account linking
class LinkAccount(BaseModel):
    provider: Provider
    provider_id: str


# 2FA
class TwoFactorSetup(BaseModel):
    pass


class TwoFactorVerify(BaseModel):
    code: str


class TwoFactorDisable(BaseModel):
    code: str


# Rate limiting is handled in middleware


# CAPTCHA
class CAPTCHARequest(BaseModel):
    captcha_token: str
