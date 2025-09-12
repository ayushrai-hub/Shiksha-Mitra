from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List
from enum import Enum


class ProficiencyLevel(str, Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    EXPERT = "expert"


class AcademicHistoryBase(BaseModel):
    institution_name: str
    degree: str
    field_of_study: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    is_current: Optional[bool] = False
    grade_gpa: Optional[float] = None
    grade_scale: Optional[str] = None
    achievements: Optional[List[str]] = []
    is_verified: Optional[bool] = False
    verification_document: Optional[str] = None


class AcademicHistoryCreate(AcademicHistoryBase):
    user_id: int


class AcademicHistoryUpdate(BaseModel):
    institution_name: Optional[str] = None
    degree: Optional[str] = None
    field_of_study: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    is_current: Optional[bool] = None
    grade_gpa: Optional[float] = None
    grade_scale: Optional[str] = None
    achievements: Optional[List[str]] = None
    is_verified: Optional[bool] = None
    verification_document: Optional[str] = None


class AcademicHistoryResponse(AcademicHistoryBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None


class SkillBase(BaseModel):
    name: str
    category: Optional[str] = None
    description: Optional[str] = None


class SkillCreate(SkillBase):
    pass


class SkillUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None


class SkillResponse(SkillBase):
    id: int
    created_at: datetime


class UserSkillBase(BaseModel):
    skill_id: int
    proficiency_level: ProficiencyLevel = ProficiencyLevel.BEGINNER
    years_of_experience: Optional[float] = None
    is_verified: Optional[bool] = False


class UserSkillCreate(UserSkillBase):
    user_id: int


class UserSkillUpdate(BaseModel):
    proficiency_level: Optional[ProficiencyLevel] = None
    years_of_experience: Optional[float] = None
    is_verified: Optional[bool] = None


class UserSkillResponse(UserSkillBase):
    id: int
    user_id: int
    last_assessed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    # Related skill info
    skill_name: str
    skill_category: Optional[str] = None


class SkillAssessmentBase(BaseModel):
    skill_id: Optional[int] = None
    assessment_type: str
    assessment_name: str
    score: Optional[float] = None
    max_score: float = 100.0
    result: Optional[str] = None  # JSON string
    feedback: Optional[str] = None
    expires_at: Optional[datetime] = None


class SkillAssessmentCreate(SkillAssessmentBase):
    user_id: int


class SkillAssessmentUpdate(BaseModel):
    assessment_type: Optional[str] = None
    assessment_name: Optional[str] = None
    score: Optional[float] = None
    max_score: Optional[float] = None
    result: Optional[str] = None
    feedback: Optional[str] = None
    expires_at: Optional[datetime] = None


class SkillAssessmentResponse(SkillAssessmentBase):
    id: int
    user_id: int
    taken_at: datetime


class OnboardingStepResponse(BaseModel):
    id: int
    user_id: int
    step_basic_profile: bool
    step_academic_bg: bool
    step_skills: bool
    step_preferences: bool
    step_verification: bool
    completed_steps: int
    total_steps: int
    is_completed: bool
    last_updated: Optional[datetime] = None
    completed_at: Optional[datetime] = None


class OnboardingStatusUpdate(BaseModel):
    step_basic_profile: Optional[bool] = None
    step_academic_bg: Optional[bool] = None
    step_skills: Optional[bool] = None
    step_preferences: Optional[bool] = None
    step_verification: Optional[bool] = None


class CompleteProfileCheckResponse(BaseModel):
    """Response for onboarding completion status"""
    user_id: int
    has_profile: bool
    has_academic_history: bool
    has_skills: bool
    has_preferences: bool
    is_email_verified: bool
    is_phone_verified: bool
    completion_percentage: float
    completed_steps: int
    total_steps: int
    is_fully_complete: bool
