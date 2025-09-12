from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app import crud, models
from app.models.matching import StudyBuddyRequest
from app.core.deps import get_db
from app.core.security import get_current_user
from app.schemas.matching import (
    UserProfileCreate, UserProfileUpdate, UserProfileResponse,
    BuddyRequestCreate, BuddyRequestUpdate, BuddyRequestResponse,
    BuddyConnectionResponse, BuddyMatchResponse, FindBuddiesFilters
)

router = APIRouter()


@router.post("/profile", response_model=UserProfileResponse)
def create_or_update_user_profile(
    *,
    db: Session = Depends(get_db),
    profile_in: UserProfileUpdate,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Create or update user profile for matching.
    """
    profile = crud.matching.get_user_profile(db, user_id=current_user.id)

    if profile:
        profile = crud.matching.update_user_profile(db, profile_db=profile, profile_in=profile_in)
    else:
        profile_create = UserProfileCreate(user_id=current_user.id, **profile_in.dict())
        profile = crud.matching.create_user_profile(db, profile_in=profile_create)

    return profile


@router.get("/profile", response_model=UserProfileResponse)
def get_user_profile(
    *,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Get current user profile for matching.
    """
    profile = crud.matching.get_user_profile(db, user_id=current_user.id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found. Please create a profile first.")
    return profile


@router.post("/find-buddies", response_model=List[BuddyMatchResponse])
def find_study_buddies(
    *,
    db: Session = Depends(get_db),
    filters: FindBuddiesFilters = None,
    limit: int = Query(20, ge=1, le=100),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Find potential study buddies with matching algorithm.
    """
    buddies = crud.matching.find_potential_buddies(
        db, user_id=current_user.id, filters=filters, limit=limit
    )

    result = []
    for buddy in buddies:
        score = crud.matching.calculate_compatibility_score(
            db, user1_id=current_user.id, user2_id=buddy.id
        )
        result.append({
            'user_id': buddy.id,
            'username': buddy.username,
            'full_name': buddy.full_name,
            'compatibility_score': round(score, 2),
            'matching_factors': {
                'score_breakdown': {
                    'subject_overlap': 0.4,
                    'learning_style': 0.3,
                    'study_environment': 0.2,
                    'grade_level': 0.1
                }
            }
        })

    return result


@router.get("/recommendations", response_model=List[BuddyMatchResponse])
def get_recommendations(
    *,
    db: Session = Depends(get_db),
    limit: int = Query(10, ge=1, le=50),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Get personalized recommendations for study buddies.
    """
    recommendations = crud.matching.get_recommendations(
        db, user_id=current_user.id, limit=limit
    )
    return recommendations


@router.post("/send-request", response_model=BuddyRequestResponse)
def send_buddy_request(
    *,
    db: Session = Depends(get_db),
    request_in: BuddyRequestCreate,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Send a study buddy request to another user.
    """
    # Check if recipient exists
    recipient = crud.user.get(db, id=request_in.recipient_id)
    if not recipient or not recipient.is_active:
        raise HTTPException(status_code=404, detail="Recipient not found or inactive")

    # Check if request already exists (pending or accepted)
    existing_request = db.query(StudyBuddyRequest).filter(
        ((StudyBuddyRequest.requester_id == current_user.id) &
         (StudyBuddyRequest.recipient_id == request_in.recipient_id)) |
        ((StudyBuddyRequest.requester_id == request_in.recipient_id) &
         (StudyBuddyRequest.recipient_id == current_user.id)),
        StudyBuddyRequest.status.in_(["pending", "accepted"])
    ).first()

    if existing_request:
        raise HTTPException(status_code=400, detail="Request already exists or users are already connected")

    # Create request
    request_data = request_in.dict()
    request_data['requester_id'] = current_user.id
    request = crud.matching.create_buddy_request(db, request_in=request_data)

    return {
        'id': request.id,
        'requester_id': request.requester_id,
        'recipient_id': request.recipient_id,
        'status': request.status,
        'message': request.message,
        'created_at': request.created_at,
        'updated_at': request.updated_at,
        'requester_username': current_user.username,
        'requester_full_name': current_user.full_name,
        'recipient_username': recipient.username,
        'recipient_full_name': recipient.full_name,
    }


@router.put("/respond-request", response_model=BuddyRequestResponse)
def respond_to_buddy_request(
    *,
    db: Session = Depends(get_db),
    request_id: int,
    response: BuddyRequestUpdate,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Respond to a buddy request (accept, reject, or cancel).
    """
    request = crud.matching.get_buddy_request(db, request_id=request_id)
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")

    # Check if current user is the recipient
    if request.recipient_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to respond to this request")

    if request.status != "pending":
        raise HTTPException(status_code=400, detail="Request has already been responded to")

    # Update request
    updated_request = crud.matching.update_buddy_request(
        db, request_db=request, status=response.status
    )

    return {
        'id': updated_request.id,
        'requester_id': updated_request.requester_id,
        'recipient_id': updated_request.recipient_id,
        'status': updated_request.status,
        'message': updated_request.message,
        'created_at': updated_request.created_at,
        'updated_at': updated_request.updated_at,
        'requester_username': updated_request.requester.username,
        'requester_full_name': updated_request.requester.full_name,
        'recipient_username': updated_request.recipient.username,
        'recipient_full_name': updated_request.recipient.full_name,
    }


@router.get("/connections", response_model=List[BuddyConnectionResponse])
def get_user_connections(
    *,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Get user's study buddy connections.
    """
    connections = crud.matching.get_user_connections(db, user_id=current_user.id)

    result = []
    for connection in connections:
        other_user_id = connection.user2_id if connection.user1_id == current_user.id else connection.user1_id
        other_user = crud.user.get(db, id=other_user_id)

        result.append({
            'id': connection.id,
            'user1_id': connection.user1_id,
            'user2_id': connection.user2_id,
            'compatibility_score': connection.compatibility_score,
            'connected_at': connection.connected_at,
            'last_interaction': connection.last_interaction,
            'other_user_id': other_user_id,
            'other_user_username': other_user.username,
            'other_user_full_name': other_user.full_name,
        })

    return result


@router.delete("/remove-connection", response_model=dict)
def remove_connection(
    *,
    db: Session = Depends(get_db),
    connection_id: int,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Remove a study buddy connection.
    """
    success = crud.matching.remove_connection(
        db, connection_id=connection_id, user_id=current_user.id
    )

    if not success:
        raise HTTPException(status_code=404, detail="Connection not found or not authorized")

    return {"message": "Connection removed successfully"}
