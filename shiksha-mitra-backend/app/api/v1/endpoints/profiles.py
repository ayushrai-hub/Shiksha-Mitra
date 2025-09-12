from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, Form
from sqlalchemy.orm import Session
from datetime import datetime

from app import crud, models, schemas
from app.core.deps import get_db
from app.core.security import get_current_user

router = APIRouter()


# Academic History Endpoints
@router.post("/academic", response_model=schemas.AcademicHistoryResponse)
def create_academic_history(
    *,
    db: Session = Depends(get_db),
    academic_in: schemas.AcademicHistoryCreate,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Create academic history entry.
    """
    # Verify ownership
    if academic_in.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    academic_history = crud.profile.create_academic_history(db, academic_in=academic_in)
    return academic_history


@router.get("/academic", response_model=List[schemas.AcademicHistoryResponse])
def get_user_academic_history(
    *,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Get current user's academic history.
    """
    academic_history = crud.profile.get_user_academic_history(db, user_id=current_user.id)
    return academic_history


@router.put("/academic/{academic_id}", response_model=schemas.AcademicHistoryResponse)
def update_academic_history(
    *,
    db: Session = Depends(get_db),
    academic_id: int,
    academic_in: schemas.AcademicHistoryUpdate,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Update academic history entry.
    """
    # Get the academic history entry
    db_obj = db.query(models.AcademicHistory).filter(
        models.AcademicHistory.id == academic_id,
        models.AcademicHistory.user_id == current_user.id
    ).first()

    if not db_obj:
        raise HTTPException(status_code=404, detail="Academic history entry not found")

    academic_history = crud.profile.update_academic_history(
        db, db_obj=db_obj, obj_in=academic_in
    )
    return academic_history


@router.delete("/academic/{academic_id}")
def delete_academic_history(
    *,
    db: Session = Depends(get_db),
    academic_id: int,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Delete academic history entry.
    """
    success = crud.profile.delete_academic_history(
        db, id=academic_id, user_id=current_user.id
    )
    if not success:
        raise HTTPException(status_code=404, detail="Academic history entry not found")
    return {"message": "Academic history entry deleted successfully"}


# Skills Endpoints
@router.post("/skills", response_model=schemas.UserSkillResponse)
def create_user_skill(
    *,
    db: Session = Depends(get_db),
    skill_in: schemas.UserSkillCreate,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Add skill to user's profile.
    """
    # Verify ownership
    if skill_in.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    # Ensure skill exists or create it
    skill = crud.profile.get_skill(db, skill_id=skill_in.skill_id)
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")

    user_skill = crud.profile.create_user_skill(db, user_skill_in=skill_in)
    return user_skill


@router.get("/skills", response_model=List[schemas.UserSkillResponse])
def get_user_skills(
    *,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Get current user's skills.
    """
    user_skills = crud.profile.get_user_skills(db, user_id=current_user.id)
    return user_skills


@router.put("/skills/{user_skill_id}", response_model=schemas.UserSkillResponse)
def update_user_skill(
    *,
    db: Session = Depends(get_db),
    user_skill_id: int,
    skill_in: schemas.UserSkillUpdate,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Update user's skill proficiency.
    """
    # Get the user skill entry
    db_obj = db.query(models.UserSkill).filter(
        models.UserSkill.id == user_skill_id,
        models.UserSkill.user_id == current_user.id
    ).first()

    if not db_obj:
        raise HTTPException(status_code=404, detail="User skill entry not found")

    user_skill = crud.profile.update_user_skill(
        db, db_obj=db_obj, obj_in=skill_in
    )
    return user_skill


@router.delete("/skills/{user_skill_id}")
def delete_user_skill(
    *,
    db: Session = Depends(get_db),
    user_skill_id: int,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Remove skill from user's profile.
    """
    success = crud.profile.delete_user_skill(
        db, user_skill_id=user_skill_id, user_id=current_user.id
    )
    if not success:
        raise HTTPException(status_code=404, detail="User skill entry not found")
    return {"message": "Skill removed from profile successfully"}


# Skills Management Endpoints (Admin/Global Skills)
@router.post("/skills/manage", response_model=schemas.SkillResponse)
def create_skill(
    *,
    db: Session = Depends(get_db),
    skill_in: schemas.SkillCreate,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Create a new skill (available to all users).
    """
    # TODO: Add admin verification if needed
    skill = crud.profile.create_skill(db, skill_in=skill_in)
    return skill


@router.get("/skills/search", response_model=List[schemas.SkillResponse])
def search_skills(
    *,
    db: Session = Depends(get_db),
    q: str = Query(..., min_length=1, description="Search query"),
    limit: int = Query(20, ge=1, le=100),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Search available skills.
    """
    skills = crud.profile.search_skills(db, query=q, limit=limit)
    return skills


@router.get("/skills/categories/{category}", response_model=List[schemas.SkillResponse])
def get_skills_by_category(
    *,
    db: Session = Depends(get_db),
    category: str,
    limit: int = Query(50, ge=1, le=100),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Get skills by category.
    """
    skills = crud.profile.get_skills_by_category(db, category=category, limit=limit)
    return skills


# Skill Assessment Endpoints
@router.post("/assessments", response_model=schemas.SkillAssessmentResponse)
def create_skill_assessment(
    *,
    db: Session = Depends(get_db),
    assessment_in: schemas.SkillAssessmentCreate,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Create skill assessment result.
    """
    # Verify ownership
    if assessment_in.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    assessment = crud.profile.create_skill_assessment(db, assessment_in=assessment_in)
    return assessment


@router.get("/assessments", response_model=List[schemas.SkillAssessmentResponse])
def get_user_assessments(
    *,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Get current user's skill assessments.
    """
    assessments = crud.profile.get_user_skill_assessments(db, user_id=current_user.id)
    return assessments


@router.get("/assessments/{assessment_id}", response_model=schemas.SkillAssessmentResponse)
def get_skill_assessment(
    *,
    db: Session = Depends(get_db),
    assessment_id: int,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Get specific skill assessment.
    """
    assessment = crud.profile.get_skill_assessment(
        db, assessment_id=assessment_id, user_id=current_user.id
    )
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return assessment


# Onboarding Endpoints
@router.get("/onboarding", response_model=schemas.OnboardingStepResponse)
def get_onboarding_status(
    *,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Get current user's onboarding progress.
    """
    onboarding = crud.profile.get_onboarding_status(db, user_id=current_user.id)
    if not onboarding:
        onboarding = crud.profile.create_or_update_onboarding(db, user_id=current_user.id)
    return onboarding


@router.put("/onboarding", response_model=schemas.OnboardingStepResponse)
def update_onboarding_status(
    *,
    db: Session = Depends(get_db),
    status_update: schemas.OnboardingStatusUpdate,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Update onboarding progress.
    """
    onboarding = crud.profile.create_or_update_onboarding(
        db, user_id=current_user.id, status_update=status_update
    )
    return onboarding


@router.get("/completion", response_model=schemas.CompleteProfileCheckResponse)
def check_profile_completion(
    *,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Check overall profile completion status.
    """
    completion_status = crud.profile.check_profile_completion(db, user_id=current_user.id)
    return completion_status


# File Upload Endpoints (For verification documents)
@router.post("/upload-verification")
def upload_verification_document(
    *,
    db: Session = Depends(get_db),
    file: UploadFile = File(...),
    academic_history_id: int = Form(...),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Upload verification document for academic history.
    """
    # Verify academic history belongs to user
    academic = db.query(models.AcademicHistory).filter(
        models.AcademicHistory.id == academic_history_id,
        models.AcademicHistory.user_id == current_user.id
    ).first()

    if not academic:
        raise HTTPException(status_code=404, detail="Academic history entry not found")

    # Validate file type
    if not file.content_type.startswith(("image/", "application/pdf")):
        raise HTTPException(status_code=400, detail="File must be an image or PDF")

    # Create uploads directory if it doesn't exist
    upload_dir = "uploads/verification"
    import os
    os.makedirs(upload_dir, exist_ok=True)

    # Generate filename
    file_extension = os.path.splitext(file.filename)[1]
    filename = f"verification_{current_user.id}_{academic_history_id}{file_extension}"
    file_path = os.path.join(upload_dir, filename)

    # Save file
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    # Update academic history with document path
    academic.verification_document = file_path
    academic.is_verified = True  # Auto-verify for now, in production this would require manual verification
    db.commit()

    return {
        "message": "Verification document uploaded successfully",
        "document_url": f"/uploads/verification/{filename}",
        "is_verified": True
    }
