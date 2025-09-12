from typing import Any, List
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, Query
from sqlalchemy.orm import Session
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

from app import crud, models, schemas
from app.core.config import settings
from app.core.deps import get_db
from app.core.security import get_current_user

router = APIRouter()


@router.get("/profile", response_model=schemas.UserResponse)
def read_user_profile(
    *,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Get current user profile.
    """
    return current_user


@router.put("/profile", response_model=schemas.UserResponse)
def update_user_profile(
    *,
    db: Session = Depends(get_db),
    obj_in: schemas.UserUpdate,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Update current user profile.
    """
    user = crud.user.update(db, db_obj=current_user, obj_in=obj_in)
    return user


@router.post("/upload-avatar")
def upload_avatar(
    *,
    db: Session = Depends(get_db),
    file: UploadFile = File(...),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Upload avatar for current user.
    """
    # Create uploads directory if it doesn't exist
    upload_dir = "uploads/avatars"
    os.makedirs(upload_dir, exist_ok=True)

    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    # Generate filename
    file_extension = os.path.splitext(file.filename)[1]
    filename = f"{current_user.id}_avatar{file_extension}"
    file_path = os.path.join(upload_dir, filename)

    # Save file
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    # TODO: Update user avatar URL in database
    # For now, just return the file path
    return {
        "message": "Avatar uploaded successfully",
        "avatar_url": f"/uploads/avatars/{filename}"
    }


@router.get("/search", response_model=List[schemas.UserResponse])
def search_users(
    *,
    db: Session = Depends(get_db),
    q: str = Query(..., min_length=1, description="Search query"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Search users by name, email, or username.
    """
    users = crud.user.search_users(db, query=q, skip=skip, limit=limit)
    # Don't include current user in results
    users = [user for user in users if user.id != current_user.id]
    return users
