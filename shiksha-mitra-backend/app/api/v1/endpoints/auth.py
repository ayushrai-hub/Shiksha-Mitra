from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Form
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.core import security
from app.core.config import settings
from app.core.deps import get_db
from app.services.email_service import email_service
from app.services.phone_service import phone_service
from app.services.oauth_service import oauth_service

router = APIRouter()


@router.post("/register", response_model=schemas.UserResponse)
async def register(
    *,
    db: Session = Depends(get_db),
    user_in: schemas.UserCreate,
) -> Any:
    """
    Create new user.
    """
    user = crud.user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    user = crud.user.get_by_username(db, username=user_in.username)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    user = crud.user.create(db, obj_in=user_in)

    # Send email verification
    await email_service.send_email_verification(user.email, user.id)

    return user


@router.post("/login", response_model=schemas.TokenWithRefresh)
def login_access_token(
    *,
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests with refresh
    """
    user = crud.user.authenticate(
        db, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    # Check if email is verified (optional)
    # if not user.is_email_verified:
    #     raise HTTPException(status_code=400, detail="Please verify your email first")

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        user.id, role=user.role.value, expires_delta=access_token_expires
    )
    refresh_token = security.create_refresh_token(user.id)

    # Update last login
    crud.user.update_last_login(db, user=user)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


@router.post("/refresh", response_model=schemas.Token)
def refresh_access_token(
    *,
    refresh_token: str = Form(...),
    db: Session = Depends(get_db),
) -> Any:
    """
    Refresh access token using refresh token
    """
    payload = security.verify_refresh_token(refresh_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    user = crud.user.get(db, id=user_id)
    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="User not found or inactive")

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, role=user.role.value, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


@router.post("/logout", response_model=dict)
def logout(
    *,
    current_user: models.User = Depends(crud.user.get_current),
) -> Any:
    """
    Logout user (client should discard tokens)
    """
    # In a stateless JWT system, logout is handled client-side by discarding tokens
    # For a stateful system, you'd blacklist the token here
    return {"message": "Logged out successfully"}


# Email verification
@router.post("/email/send-verification", response_model=dict)
async def send_email_verification(*, email: str, db: Session = Depends(get_db)):
    user = crud.user.get_by_email(db, email=email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    await email_service.send_email_verification(email, user.id)
    return {"message": "Verification email sent"}


@router.post("/email/verify", response_model=dict)
def verify_email(
    *,
    token: str,
    db: Session = Depends(get_db),
):
    payload = email_service.verify_email_token(token)
    user = crud.user.get(db, id=payload.get("sub"))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    crud.user.verify_email(db, user=user)
    return {"message": "Email verified successfully"}


# Phone verification
@router.post("/phone/send-otp", response_model=dict)
async def send_phone_otp(*, phone_number: str):
    await phone_service.send_otp(phone_number)
    return {"message": "OTP sent to phone"}


@router.post("/phone/verify-otp", response_model=dict)
async def verify_phone_otp(*, phone_number: str, otp: str, db: Session = Depends(get_db)):
    phone_service.verify_otp(phone_number, otp)

    # Optionally, find user by phone and mark verified
    # user = crud.user.get_by_phone(db, phone=phone_number)
    # crud.user.verify_phone(db, user=user)

    return {"message": "OTP verified successfully"}


# Password reset
@router.post("/password/forgot", response_model=dict)
async def forgot_password(*, email: str, db: Session = Depends(get_db)):
    user = crud.user.get_by_email(db, email=email)
    if not user:
        # Don't reveal if user exists
        return {"message": "If the email exists, a reset link has been sent"}

    await email_service.send_password_reset(email, user.id)
    return {"message": "If the email exists, a reset link has been sent"}


@router.post("/password/reset", response_model=dict)
def reset_password(*, token: str, new_password: str, db: Session = Depends(get_db)):
    payload = email_service.verify_password_reset_token(token)
    user = crud.user.get(db, id=payload.get("sub"))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    crud.user.change_password(db, user=user, new_password=new_password)
    return {"message": "Password reset successfully"}


# Change password (authenticated)
@router.post("/password/change", response_model=dict)
def change_password(*,
    old_password: str,
    new_password: str,
    current_user: models.User = Depends(crud.user.get_current),
    db: Session = Depends(get_db),
):
    if not security.verify_password(old_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect old password")

    crud.user.change_password(db, user=current_user, new_password=new_password)
    return {"message": "Password changed successfully"}


# OAuth
@router.get("/oauth/{provider}/url", response_model=dict)
def get_oauth_url(provider: str, state: str = None):
    url = oauth_service.get_authorization_url(provider, state or "default")
    return {"authorization_url": url}


# Add more endpoints for 2FA, etc.
