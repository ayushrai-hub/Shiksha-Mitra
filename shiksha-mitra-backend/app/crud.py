from typing import Any, Dict, Optional, Union
from sqlalchemy.orm import Session
from sqlalchemy import or_
from fastapi.encoders import jsonable_encoder

from app.core.security import get_password_hash, verify_password
from app.models.user import User
from app.schemas.auth import UserCreate, UserUpdate


class CRUDUser:
    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def get_by_username(self, db: Session, *, username: str) -> Optional[User]:
        return db.query(User).filter(User.username == username).first()

    def get_by_phone(self, db: Session, *, phone: str) -> Optional[User]:
        return db.query(User).filter(User.phone_number == phone).first()

    def get(self, db: Session, *, id: int) -> Optional[User]:
        return db.query(User).filter(User.id == id).first()

    def authenticate(self, db: Session, *, email: str, password: str) -> Optional[User]:
        user = self.get_by_email(db, email=email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        db_obj = User(
            email=obj_in.email,
            username=obj_in.username,
            hashed_password=get_password_hash(obj_in.password),
            full_name=obj_in.full_name,
            phone_number=obj_in.phone_number,
            role=obj_in.role,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, *, db_obj: User, obj_in: Union[UserUpdate, Dict[str, Any]]) -> User:
        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def change_password(self, db: Session, *, user: User, new_password: str) -> User:
        hashed_password = get_password_hash(new_password)
        user.hashed_password = hashed_password
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def verify_email(self, db: Session, *, user: User) -> User:
        user.is_email_verified = True
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def verify_phone(self, db: Session, *, user: User) -> User:
        user.is_phone_verified = True
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def update_last_login(self, db: Session, *, user: User) -> User:
        from datetime import datetime
        user.last_login = datetime.utcnow()
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def is_active(self, user: User) -> bool:
        return user.is_active

    def get_current(self, db: Session, *, current_user_id: int) -> User:
        user = db.query(User).filter(User.id == current_user_id).first()
        if not user:
            return None
        return user

    def search_users(self, db: Session, *, query: str, skip: int = 0, limit: int = 100) -> list[User]:
        """Search users by name, email, or username"""
        search = f"%{query}%"
        return (
            db.query(User)
            .filter(
                or_(
                    User.full_name.ilike(search),
                    User.username.ilike(search),
                    User.email.ilike(search),
                )
            )
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_active_users(self, db: Session) -> list[User]:
        return db.query(User).filter(User.is_active == True).all()


from app.models.matching import StudyBuddyRequest, StudyBuddyConnection, UserProfile
import json


class CRUDMatching:
    def create_user_profile(self, db: Session, *, profile_in) -> UserProfile:
        db_obj = UserProfile(
            user_id=profile_in.user_id,
            # Basic profile information
            bio=profile_in.bio,
            avatar_url=profile_in.avatar_url,
            banner_url=profile_in.banner_url,
            website=profile_in.website,
            linkedin_url=profile_in.linkedin_url,
            github_url=profile_in.github_url,
            twitter_url=profile_in.twitter_url,
            # Location and timezone
            city=profile_in.city,
            region=profile_in.region,
            country=profile_in.country,
            timezone=profile_in.timezone,
            # Academic interests
            subjects_of_interest=json.dumps(profile_in.subjects_of_interest) if profile_in.subjects_of_interest else None,
            study_goals=json.dumps(profile_in.study_goals) if profile_in.study_goals else None,
            preferred_study_times=json.dumps(profile_in.preferred_study_times) if profile_in.preferred_study_times else None,
            # Learning style preferences
            learning_style=profile_in.learning_style,
            study_environment=json.dumps(profile_in.study_environment) if profile_in.study_environment else None,
            # Matching and discovery preferences
            is_open_to_study_groups=profile_in.is_open_to_study_groups,
            is_open_to_tutoring=profile_in.is_open_to_tutoring,
            availability_status=profile_in.availability_status,
            # Academic level and current status
            grade_level=profile_in.grade_level,
            current_institution=profile_in.current_institution,
            graduation_year=profile_in.graduation_year,
            # Study preferences
            study_frequency=profile_in.study_frequency,
            preferred_group_size=profile_in.preferred_group_size,
            # Privacy and visibility
            profile_visibility=profile_in.profile_visibility,
            show_online_status=profile_in.show_online_status,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_user_profile(self, db: Session, *, user_id: int) -> Optional[UserProfile]:
        return db.query(UserProfile).filter(UserProfile.user_id == user_id).first()

    def update_user_profile(self, db: Session, *, profile_db: UserProfile, profile_in) -> UserProfile:
        update_data = profile_in.dict(exclude_unset=True)

        # Handle JSON fields
        if 'subjects_of_interest' in update_data:
            profile_db.subjects_of_interest = json.dumps(update_data['subjects_of_interest'])
        if 'study_goals' in update_data:
            profile_db.study_goals = json.dumps(update_data['study_goals'])
        if 'preferred_study_times' in update_data:
            profile_db.preferred_study_times = json.dumps(update_data['preferred_study_times'])
        if 'study_environment' in update_data:
            profile_db.study_environment = json.dumps(update_data['study_environment'])

        # Handle other fields
        for field in update_data:
            if field not in ['subjects_of_interest', 'study_goals', 'preferred_study_times', 'study_environment']:
                setattr(profile_db, field, update_data[field])

        db.add(profile_db)
        db.commit()
        db.refresh(profile_db)
        return profile_db

    def create_buddy_request(self, db: Session, *, request_in) -> StudyBuddyRequest:
        db_obj = StudyBuddyRequest(
            requester_id=request_in.requester_id,
            recipient_id=request_in.recipient_id,
            message=request_in.message,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update_buddy_request(self, db: Session, *, request_db: StudyBuddyRequest, status: str) -> StudyBuddyRequest:
        request_db.status = status
        db.add(request_db)
        db.commit()
        db.refresh(request_db)

        # If accepted, create connection
        if status == "accepted":
            self.create_connection(db, user1_id=request_db.requester_id, user2_id=request_db.recipient_id)

        return request_db

    def get_buddy_requests(self, db: Session, *, user_id: int, status: Optional[str] = None):
        query = db.query(StudyBuddyRequest)
        if status:
            query = query.filter(StudyBuddyRequest.status == status)

        # Get requests where user is either requester or recipient
        return query.filter(
            (StudyBuddyRequest.requester_id == user_id) | (StudyBuddyRequest.recipient_id == user_id)
        ).all()

    def get_pending_requests_for_user(self, db: Session, *, user_id: int):
        return db.query(StudyBuddyRequest).filter(
            StudyBuddyRequest.recipient_id == user_id,
            StudyBuddyRequest.status == "pending"
        ).all()

    def get_buddy_request(self, db: Session, *, request_id: int) -> Optional[StudyBuddyRequest]:
        return db.query(StudyBuddyRequest).filter(StudyBuddyRequest.id == request_id).first()

    def create_connection(self, db: Session, *, user1_id: int, user2_id: int, compatibility_score: float = None) -> StudyBuddyConnection:
        # Ensure consistent ordering (smaller ID first)
        if user1_id > user2_id:
            user1_id, user2_id = user2_id, user1_id

        db_obj = StudyBuddyConnection(
            user1_id=user1_id,
            user2_id=user2_id,
            compatibility_score=compatibility_score,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_user_connections(self, db: Session, *, user_id: int):
        return db.query(StudyBuddyConnection).filter(
            (StudyBuddyConnection.user1_id == user_id) | (StudyBuddyConnection.user2_id == user_id)
        ).all()

    def remove_connection(self, db: Session, *, connection_id: int, user_id: int) -> bool:
        connection = db.query(StudyBuddyConnection).filter(
            StudyBuddyConnection.id == connection_id,
            ((StudyBuddyConnection.user1_id == user_id) | (StudyBuddyConnection.user2_id == user_id))
        ).first()

        if connection:
            db.delete(connection)
            db.commit()
            return True
        return False

    def find_potential_buddies(self, db: Session, *, user_id: int, filters=None, limit: int = 20):
        """Find potential study buddies using matching algorithm"""
        user_profile = self.get_user_profile(db, user_id=user_id)
        if not user_profile:
            return []

        # Build query excluding current user and existing connections
        base_query = db.query(User).filter(
            User.id != user_id,
            User.is_active == True
        )

        # Exclude users already connected or with pending requests
        existing_connections = db.query(StudyBuddyConnection).filter(
            (StudyBuddyConnection.user1_id == user_id) | (StudyBuddyConnection.user2_id == user_id)
        ).subquery()

        pending_requests = db.query(StudyBuddyRequest).filter(
            ((StudyBuddyRequest.requester_id == user_id) | (StudyBuddyRequest.recipient_id == user_id)),
            StudyBuddyRequest.status.in_(["pending", "accepted"])
        ).subquery()

        base_query = base_query.filter(
            ~User.id.in_(
                db.query(existing_connections.c.user1_id).union(
                    db.query(existing_connections.c.user2_id),
                    db.query(pending_requests.c.requester_id),
                    db.query(pending_requests.c.recipient_id)
                )
            )
        )

        # Apply filters if provided
        if filters:
            if filters.subjects and user_profile.subjects_of_interest:
                user_subjects = json.loads(user_profile.subjects_of_interest) if user_profile.subjects_of_interest else []
                # For now, just filter by having some overlap in subjects
                # In production, you'd implement more sophisticated matching

        users = base_query.limit(limit).all()

        # Calculate compatibility scores
        scored_users = []
        for user in users:
            score = self.calculate_compatibility_score(db, user1_id=user_id, user2_id=user.id)
            scored_users.append((user, score))

        # Sort by compatibility score
        scored_users.sort(key=lambda x: x[1], reverse=True)
        return [user for user, score in scored_users][:limit]

    def calculate_compatibility_score(self, db: Session, *, user1_id: int, user2_id: int) -> float:
        """Calculate compatibility score between two users"""
        profile1 = self.get_user_profile(db, user_id=user1_id)
        profile2 = self.get_user_profile(db, user_id=user2_id)

        if not profile1 or not profile2:
            return 0.0

        score = 0.0
        total_weight = 0.0

        # Subject overlap (weight: 0.4)
        subjects1 = set(json.loads(profile1.subjects_of_interest) if profile1.subjects_of_interest else [])
        subjects2 = set(json.loads(profile2.subjects_of_interest) if profile2.subjects_of_interest else [])
        subject_overlap = len(subjects1 & subjects2) / max(len(subjects1 | subjects2), 1)
        score += subject_overlap * 0.4
        total_weight += 0.4

        # Learning style compatibility (weight: 0.3)
        if profile1.learning_style and profile2.learning_style:
            if profile1.learning_style == profile2.learning_style:
                score += 0.3
            total_weight += 0.3

        # Study environment compatibility (weight: 0.2)
        env1 = set(json.loads(profile1.study_environment) if profile1.study_environment else [])
        env2 = set(json.loads(profile2.study_environment) if profile2.study_environment else [])
        env_overlap = len(env1 & env2) / max(len(env1 | env2), 1)
        score += env_overlap * 0.2
        total_weight += 0.2

        # Grade level similarity (weight: 0.1)
        if profile1.grade_level and profile2.grade_level and profile1.grade_level == profile2.grade_level:
            score += 0.1
            total_weight += 0.1

        return score / total_weight if total_weight > 0 else 0.0

    def get_recommendations(self, db: Session, *, user_id: int, limit: int = 10):
        """Get personalized recommendations for study buddies"""
        recommendations = self.find_potential_buddies(db, user_id=user_id, limit=limit)

        result = []
        for user in recommendations:
            score = self.calculate_compatibility_score(db, user1_id=user_id, user2_id=user.id)
            result.append({
                'user_id': user.id,
                'username': user.username,
                'full_name': user.full_name,
                'compatibility_score': score,
                'matching_factors': {
                    'shared_subjects': True,  # This could be more detailed
                    'learning_style_match': True,  # This could be more detailed
                }
            })

        return result


from app.models.profile import (
    AcademicHistory, Skill, UserSkill, SkillAssessment, OnboardingStep
)


class CRUDProfile:
    def create_academic_history(self, db: Session, *, academic_in) -> AcademicHistory:
        db_obj = AcademicHistory(
            user_id=academic_in.user_id,
            institution_name=academic_in.institution_name,
            degree=academic_in.degree,
            field_of_study=academic_in.field_of_study,
            start_date=academic_in.start_date,
            end_date=academic_in.end_date,
            is_current=academic_in.is_current,
            grade_gpa=academic_in.grade_gpa,
            grade_scale=academic_in.grade_scale,
            achievements=json.dumps(academic_in.achievements) if academic_in.achievements else None,
            is_verified=academic_in.is_verified,
            verification_document=academic_in.verification_document,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_user_academic_history(self, db: Session, *, user_id: int) -> list[AcademicHistory]:
        return db.query(AcademicHistory).filter(AcademicHistory.user_id == user_id).order_by(AcademicHistory.start_date.desc()).all()

    def update_academic_history(self, db: Session, *, db_obj: AcademicHistory, obj_in) -> AcademicHistory:
        update_data = obj_in.dict(exclude_unset=True)
        if 'achievements' in update_data:
            db_obj.achievements = json.dumps(update_data['achievements'])

        for field in update_data:
            if field != 'achievements':
                setattr(db_obj, field, update_data[field])

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def delete_academic_history(self, db: Session, *, id: int, user_id: int) -> bool:
        academic = db.query(AcademicHistory).filter(
            AcademicHistory.id == id,
            AcademicHistory.user_id == user_id
        ).first()
        if academic:
            db.delete(academic)
            db.commit()
            return True
        return False

    def create_skill(self, db: Session, *, skill_in) -> Skill:
        # Check if skill already exists
        existing_skill = db.query(Skill).filter(Skill.name == skill_in.name).first()
        if existing_skill:
            return existing_skill

        db_obj = Skill(
            name=skill_in.name,
            category=skill_in.category,
            description=skill_in.description,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_skill(self, db: Session, *, skill_id: int) -> Optional[Skill]:
        return db.query(Skill).filter(Skill.id == skill_id).first()

    def get_skills_by_category(self, db: Session, *, category: str, limit: int = 50) -> list[Skill]:
        return db.query(Skill).filter(Skill.category == category).limit(limit).all()

    def search_skills(self, db: Session, *, query: str, limit: int = 20) -> list[Skill]:
        search = f"%{query}%"
        return db.query(Skill).filter(Skill.name.ilike(search)).limit(limit).all()

    def create_user_skill(self, db: Session, *, user_skill_in) -> UserSkill:
        # Check if user already has this skill
        existing = db.query(UserSkill).filter(
            UserSkill.user_id == user_skill_in.user_id,
            UserSkill.skill_id == user_skill_in.skill_id
        ).first()
        if existing:
            # Update existing skill
            return self.update_user_skill(db, db_obj=existing, obj_in=user_skill_in)

        db_obj = UserSkill(
            user_id=user_skill_in.user_id,
            skill_id=user_skill_in.skill_id,
            proficiency_level=user_skill_in.proficiency_level,
            years_of_experience=user_skill_in.years_of_experience,
            is_verified=user_skill_in.is_verified,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_user_skills(self, db: Session, *, user_id: int) -> list[UserSkill]:
        from sqlalchemy.orm import joinedload
        return db.query(UserSkill).options(joinedload(UserSkill.skill)).filter(UserSkill.user_id == user_id).all()

    def update_user_skill(self, db: Session, *, db_obj: UserSkill, obj_in) -> UserSkill:
        update_data = obj_in.dict(exclude_unset=True)
        for field in update_data:
            if field in ['proficiency_level', 'years_of_experience', 'is_verified']:
                setattr(db_obj, field, update_data[field])

        # Mark as assessed when updating proficiency
        if 'proficiency_level' in update_data:
            from datetime import datetime
            db_obj.last_assessed_at = datetime.utcnow()

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def delete_user_skill(self, db: Session, *, user_skill_id: int, user_id: int) -> bool:
        user_skill = db.query(UserSkill).filter(
            UserSkill.id == user_skill_id,
            UserSkill.user_id == user_id
        ).first()
        if user_skill:
            db.delete(user_skill)
            db.commit()
            return True
        return False

    def create_skill_assessment(self, db: Session, *, assessment_in) -> SkillAssessment:
        db_obj = SkillAssessment(
            user_id=assessment_in.user_id,
            skill_id=assessment_in.skill_id,
            assessment_type=assessment_in.assessment_type,
            assessment_name=assessment_in.assessment_name,
            score=assessment_in.score,
            max_score=assessment_in.max_score,
            result=assessment_in.result,
            feedback=assessment_in.feedback,
            expires_at=assessment_in.expires_at,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_user_skill_assessments(self, db: Session, *, user_id: int) -> list[SkillAssessment]:
        from datetime import datetime
        return db.query(SkillAssessment).filter(
            SkillAssessment.user_id == user_id,
            (SkillAssessment.expires_at.is_(None) | (SkillAssessment.expires_at > datetime.utcnow()))
        ).order_by(SkillAssessment.taken_at.desc()).all()

    def get_skill_assessment(self, db: Session, *, assessment_id: int, user_id: int) -> Optional[SkillAssessment]:
        return db.query(SkillAssessment).filter(
            SkillAssessment.id == assessment_id,
            SkillAssessment.user_id == user_id
        ).first()

    def create_or_update_onboarding(self, db: Session, *, user_id: int, status_update=None) -> OnboardingStep:
        onboarding = db.query(OnboardingStep).filter(OnboardingStep.user_id == user_id).first()

        if not onboarding:
            onboarding = OnboardingStep(user_id=user_id)
            db.add(onboarding)

        if status_update:
            update_data = status_update.dict(exclude_unset=True)
            completed_steps = 0
            total_steps = 5

            # Update step statuses
            for step in ['step_basic_profile', 'step_academic_bg', 'step_skills', 'step_preferences', 'step_verification']:
                if step in update_data:
                    setattr(onboarding, step, update_data[step])

            # Recalculate completed steps
            onboarding.completed_steps = sum([
                onboarding.step_basic_profile,
                onboarding.step_academic_bg,
                onboarding.step_skills,
                onboarding.step_preferences,
                onboarding.step_verification
            ])

            onboarding.is_completed = onboarding.completed_steps == total_steps

            if onboarding.is_completed and not onboarding.completed_at:
                from datetime import datetime
                onboarding.completed_at = datetime.utcnow()

        db.commit()
        db.refresh(onboarding)
        return onboarding

    def get_onboarding_status(self, db: Session, *, user_id: int) -> Optional[OnboardingStep]:
        return db.query(OnboardingStep).filter(OnboardingStep.user_id == user_id).first()

    def check_profile_completion(self, db: Session, *, user_id: int) -> dict:
        """Check overall profile completion status"""
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            return None

        profile = matching.get_user_profile(db, user_id=user_id)
        academic_history = self.get_user_academic_history(db, user_id=user_id)
        user_skills = self.get_user_skills(db, user_id=user_id)

        has_profile = profile is not None and (profile.bio or profile.subjects_of_interest or profile.learning_style)
        has_academic_history = len(academic_history) > 0
        has_skills = len(user_skills) > 0
        has_preferences = profile is not None and (profile.learning_style or profile.study_environment or profile.preferred_study_times)
        is_email_verified = user.is_email_verified
        is_phone_verified = user.is_phone_verified

        completed_steps = sum([has_profile, has_academic_history, has_skills, has_preferences, is_email_verified or is_phone_verified])
        total_steps = 5

        return {
            'has_profile': has_profile,
            'has_academic_history': has_academic_history,
            'has_skills': has_skills,
            'has_preferences': has_preferences,
            'is_email_verified': is_email_verified,
            'is_phone_verified': is_phone_verified,
            'completion_percentage': (completed_steps / total_steps) * 100,
            'completed_steps': completed_steps,
            'total_steps': total_steps,
            'is_fully_complete': completed_steps == total_steps
        }


profile = CRUDProfile()

matching = CRUDMatching()

user = CRUDUser()
