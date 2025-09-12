from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Float, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class StudyBuddyRequest(Base):
    __tablename__ = "study_buddy_requests"

    id = Column(Integer, primary_key=True, index=True)
    requester_id = Column(Integer, ForeignKey("users.id"), index=True)
    recipient_id = Column(Integer, ForeignKey("users.id"), index=True)
    status = Column(Enum("pending", "accepted", "rejected", "cancelled", name="request_status"), default="pending")
    message = Column(Text, nullable=True)  # Optional message from requester
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    requester = relationship("User", foreign_keys=[requester_id], backref="sent_requests")
    recipient = relationship("User", foreign_keys=[recipient_id], backref="received_requests")


class StudyBuddyConnection(Base):
    __tablename__ = "study_buddy_connections"

    id = Column(Integer, primary_key=True, index=True)
    user1_id = Column(Integer, ForeignKey("users.id"), index=True)
    user2_id = Column(Integer, ForeignKey("users.id"), index=True)
    compatibility_score = Column(Float, nullable=True)  # Matching algorithm score
    connected_at = Column(DateTime(timezone=True), server_default=func.now())
    last_interaction = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    user1 = relationship("User", foreign_keys=[user1_id], backref="connections_as_user1")
    user2 = relationship("User", foreign_keys=[user2_id], backref="connections_as_user2")


class UserProfile(Base):
    """Extended user profile for matching and customization"""
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)

    # Basic profile information
    bio = Column(Text, nullable=True)  # User bio/description
    avatar_url = Column(String, nullable=True)  # Avatar image URL
    banner_url = Column(String, nullable=True)  # Profile banner image
    website = Column(String, nullable=True)  # Personal website
    linkedin_url = Column(String, nullable=True)
    github_url = Column(String, nullable=True)
    twitter_url = Column(String, nullable=True)

    # Location and timezone
    city = Column(String, nullable=True)
    region = Column(String, nullable=True)  # State/province
    country = Column(String, nullable=True)
    timezone = Column(String, nullable=True)

    # Academic interests
    subjects_of_interest = Column(Text, nullable=True)  # JSON array of subjects
    study_goals = Column(Text, nullable=True)  # JSON array of goals
    preferred_study_times = Column(Text, nullable=True)  # JSON array of preferred times

    # Learning style preferences
    learning_style = Column(Enum("visual", "auditory", "kinesthetic", "reading", name="learning_style"), nullable=True)
    study_environment = Column(Text, nullable=True)  # JSON array of environments

    # Matching and discovery preferences
    is_open_to_study_groups = Column(Boolean, default=True)
    is_open_to_tutoring = Column(Boolean, default=False)
    availability_status = Column(Enum("online", "busy", "away", "offline", name="availability_status"), default="online")

    # Academic level and current status
    grade_level = Column(String, nullable=True)  # e.g., "Undergraduate", "Graduate", "High School"
    current_institution = Column(String, nullable=True)
    graduation_year = Column(Integer, nullable=True)

    # Study preferences
    study_frequency = Column(Enum("daily", "few_times_week", "weekends_only", name="study_frequency"), nullable=True)
    preferred_group_size = Column(Integer, nullable=True, default=2)  # 1-10, etc.

    # Privacy and visibility
    profile_visibility = Column(Enum("public", "buddies_only", "private", name="profile_visibility"), default="public")
    show_online_status = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationship
    user = relationship("User", backref="profile")
