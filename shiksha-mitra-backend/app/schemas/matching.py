from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List
from enum import Enum


class LearningStyle(str, Enum):
    VISUAL = "visual"
    AUDITORY = "auditory"
    KINESTHETIC = "kinesthetic"
    READING = "reading"


class StudyEnvironment(str, Enum):
    QUIET = "quiet"
    GROUP = "group"
    LIBRARY = "library"
    CAFE = "cafe"


class AvailabilityStatus(str, Enum):
    ONLINE = "online"
    BUSY = "busy"
    AWAY = "away"
    OFFLINE = "offline"


class StudyFrequency(str, Enum):
    DAILY = "daily"
    FEW_TIMES_WEEK = "few_times_week"
    WEEKENDS_ONLY = "weekends_only"


class ProfileVisibility(str, Enum):
    PUBLIC = "public"
    BUDDIES_ONLY = "buddies_only"
    PRIVATE = "private"


class UserProfileBase(BaseModel):
    # Basic profile information
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    banner_url: Optional[str] = None
    website: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    twitter_url: Optional[str] = None

    # Location and timezone
    city: Optional[str] = None
    region: Optional[str] = None
    country: Optional[str] = None
    timezone: Optional[str] = None

    # Academic interests
    subjects_of_interest: Optional[List[str]] = []
    study_goals: Optional[List[str]] = []
    preferred_study_times: Optional[List[str]] = []

    # Learning style preferences
    learning_style: Optional[LearningStyle] = None
    study_environment: Optional[List[str]] = []

    # Matching and discovery preferences
    is_open_to_study_groups: Optional[bool] = True
    is_open_to_tutoring: Optional[bool] = False
    availability_status: Optional[AvailabilityStatus] = AvailabilityStatus.ONLINE

    # Academic level and current status
    grade_level: Optional[str] = None
    current_institution: Optional[str] = None
    graduation_year: Optional[int] = None

    # Study preferences
    study_frequency: Optional[StudyFrequency] = None
    preferred_group_size: Optional[int] = 2

    # Privacy and visibility
    profile_visibility: Optional[ProfileVisibility] = ProfileVisibility.PUBLIC
    show_online_status: Optional[bool] = True


class UserProfileCreate(UserProfileBase):
    user_id: int


class UserProfileUpdate(BaseModel):
    # Basic profile information
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    banner_url: Optional[str] = None
    website: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    twitter_url: Optional[str] = None

    # Location and timezone
    city: Optional[str] = None
    region: Optional[str] = None
    country: Optional[str] = None
    timezone: Optional[str] = None

    # Academic interests
    subjects_of_interest: Optional[List[str]] = None
    study_goals: Optional[List[str]] = None
    preferred_study_times: Optional[List[str]] = None

    # Learning style preferences
    learning_style: Optional[LearningStyle] = None
    study_environment: Optional[List[str]] = None

    # Matching and discovery preferences
    is_open_to_study_groups: Optional[bool] = None
    is_open_to_tutoring: Optional[bool] = None
    availability_status: Optional[AvailabilityStatus] = None

    # Academic level and current status
    grade_level: Optional[str] = None
    current_institution: Optional[str] = None
    graduation_year: Optional[int] = None

    # Study preferences
    study_frequency: Optional[StudyFrequency] = None
    preferred_group_size: Optional[int] = None

    # Privacy and visibility
    profile_visibility: Optional[ProfileVisibility] = None
    show_online_status: Optional[bool] = None


class UserProfileResponse(UserProfileBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None


class BuddyRequestCreate(BaseModel):
    recipient_id: int
    message: Optional[str] = None


class BuddyRequestResponse(BaseModel):
    id: int
    requester_id: int
    recipient_id: int
    status: str
    message: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    requester_username: str
    requester_full_name: str
    recipient_username: str
    recipient_full_name: str


class BuddyRequestUpdate(BaseModel):
    status: str  # "accepted", "rejected", "cancelled"


class BuddyConnectionResponse(BaseModel):
    id: int
    user1_id: int
    user2_id: int
    compatibility_score: Optional[float] = None
    connected_at: datetime
    last_interaction: Optional[datetime] = None
    other_user_id: int
    other_user_username: str
    other_user_full_name: str


class BuddyMatchResponse(BaseModel):
    user_id: int
    username: str
    full_name: str
    compatibility_score: float
    matching_factors: dict  # Factors that contributed to the match


class FindBuddiesFilters(BaseModel):
    subjects: Optional[List[str]] = None
    grade_level: Optional[str] = None
    location: Optional[str] = None
    study_times: Optional[List[str]] = None
    learning_style: Optional[LearningStyle] = None
    study_environment: Optional[List[str]] = None
    max_distance: Optional[int] = None  # In kilometers


class RemoveConnection(BaseModel):
    connection_id: int
