from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional
from uuid import uuid4


class UserRole(str):
    STUDENT = "STUDENT"
    TEACHER = "TEACHER"
    INSTITUTION = "INSTITUTION"
    ADMIN = "ADMIN"


class User(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    email: str = Field(index=True, unique=True)
    phone: Optional[str] = Field(default=None, index=True, unique=True)
    password_hash: Optional[str] = None
    role: str = Field(default="STUDENT")
    is_active: bool = Field(default=True)
    is_verified: bool = Field(default=False)
    twofa_enabled: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    profile: Optional["Profile"] = Field(sa_relationship_kwargs={"back_populates": "user"})


class OAuthAccount(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    provider: str
    provider_account_id: str
    access_token: Optional[str]
    refresh_token: Optional[str]
    user_id: str = Field(foreign_key="user.id")


class Profile(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    user_id: str = Field(foreign_key="user.id", unique=True)
    first_name: str
    last_name: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    visibility: str = Field(default="PUBLIC")

    user: User = Field(sa_relationship_kwargs={"back_populates": "profile"})


class Education(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    profile_id: str = Field(foreign_key="profile.id")
    school: str
    degree: str
    field: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None


class Skill(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    name: str
    level: Optional[int] = None  # Assuming level as int, need to adjust if list
    profile_id: str = Field(foreign_key="profile.id")


class Interest(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    name: str
    profile_id: str = Field(foreign_key="profile.id")


class Availability(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    weekday: str  # Could use enum for days
    start_time: str  # e.g., "09:00"
    end_time: str
    timezone: str
    user_id: str = Field(foreign_key="user.id")


class StudyPreference(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    learning_style: str
    goals: str  # Could be JSON, but for now str
    modalities: str
    subjects: str
    level: str
    user_id: str = Field(foreign_key="user.id")


class PortfolioItem(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    title: str
    description: Optional[str] = None
    link: Optional[str] = None
    issued_by: Optional[str] = None
    date: Optional[datetime] = None
    profile_id: str = Field(foreign_key="profile.id")


# Matching entities simplified
class Match(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    # Add fields as needed


class MatchCandidate(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    # Add fields as needed


class MatchFeedback(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    rating: Optional[int] = None
    comment: Optional[str] = None
    # Flags as needed
    user_id: str = Field(foreign_key="user.id")


class ChatRoom(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    type: str  # direct/group/session
    # members list could be separate table


class Message(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    room_id: str = Field(foreign_key="chatroom.id")
    sender_id: str = Field(foreign_key="user.id")
    content: str
    content_type: Optional[str] = None
    file_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    edited_at: Optional[datetime] = None


class StudySession(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    topic: str
    start_at: datetime
    end_at: datetime
    # participants as list
    whiteboard_state_url: Optional[str] = None
    recording_url: Optional[str] = None


class AnalyticsEvent(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    user_id: str = Field(foreign_key="user.id")
    name: str
    payload_json: str  # JSON as str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class RefreshToken(SQLModel, table=True):
    jti: str = Field(primary_key=True)
    user_id: str = Field(foreign_key="user.id")
    expires_at: datetime
    revoked: bool = Field(default=False)


class EmailVerificationToken(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    user_id: str = Field(foreign_key="user.id")
    expires_at: datetime


class PhoneOTP(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    user_id: str = Field(foreign_key="user.id")
    expires_at: datetime


class PasswordResetToken(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    user_id: str = Field(foreign_key="user.id")
    expires_at: datetime


class AIConversation(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    user_id: str = Field(foreign_key="user.id")
    messages: str  # JSON
    context: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
