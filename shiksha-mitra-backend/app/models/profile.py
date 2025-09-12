from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Float, Boolean, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class AcademicHistory(Base):
    """Track user's academic background"""
    __tablename__ = "academic_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)

    # Academic details
    institution_name = Column(String, nullable=False)
    degree = Column(String, nullable=False)  # e.g., "Bachelor of Science", "High School"
    field_of_study = Column(String, nullable=True)  # e.g., "Computer Science"
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    is_current = Column(Boolean, default=False)  # Is this current institution?

    # Performance
    grade_gpa = Column(Float, nullable=True)  # GPA or percentage
    grade_scale = Column(String, nullable=True)  # e.g., "4.0", "100%"
    achievements = Column(Text, nullable=True)  # JSON array of achievements

    # Verification
    is_verified = Column(Boolean, default=False)
    verification_document = Column(String, nullable=True)  # Path to verification document

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationship
    user = relationship("User", backref="academic_history")


class Skill(Base):
    """User's skills"""
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=True)  # e.g., "Programming", "Mathematics"

    # Skill metadata
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class UserSkill(Base):
    """Many-to-many relationship between users and skills with proficiency level"""
    __tablename__ = "user_skills"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    skill_id = Column(Integer, ForeignKey("skills.id"), index=True)

    # Proficiency
    proficiency_level = Column(Enum("beginner", "intermediate", "advanced", "expert", name="proficiency_level"), default="beginner")
    years_of_experience = Column(Float, nullable=True)

    # Verification
    is_verified = Column(Boolean, default=False)
    last_assessed_at = Column(DateTime, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", backref="user_skills")
    skill = relationship("Skill", backref="user_skills")


class SkillAssessment(Base):
    """Skill assessment results"""
    __tablename__ = "skill_assessments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    skill_id = Column(Integer, ForeignKey("skills.id"), nullable=True)  # Optional, can be general assessment

    assessment_type = Column(String, nullable=False)  # e.g., "quiz", "project", "interview"
    assessment_name = Column(String, nullable=False)
    score = Column(Float, nullable=True)  # Score out of 100 or scale
    max_score = Column(Float, default=100.0)
    result = Column(Text, nullable=True)  # Detailed results in JSON
    feedback = Column(Text, nullable=True)

    taken_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime, nullable=True)  # When the assessment expires

    # Relationships
    user = relationship("User", backref="skill_assessments")
    skill = relationship("Skill", backref="skill_assessments")


class OnboardingStep(Base):
    """Track onboarding progress"""
    __tablename__ = "onboarding_steps"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)

    # Step completion status
    step_basic_profile = Column(Boolean, default=False)  # Name, bio, avatar
    step_academic_bg = Column(Boolean, default=False)   # Academic history
    step_skills = Column(Boolean, default=False)         # Skills assessment
    step_preferences = Column(Boolean, default=False)    # Study preferences, matching
    step_verification = Column(Boolean, default=False)   # Email/phone verification

    # Progress
    completed_steps = Column(Integer, default=0)
    total_steps = Column(Integer, default=5)
    is_completed = Column(Boolean, default=False)

    last_updated = Column(DateTime(timezone=True), onupdate=func.now())
    completed_at = Column(DateTime, nullable=True)

    # Relationships
    user = relationship("User", backref="onboarding_progress")
