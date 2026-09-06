from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.core.dependencies import get_current_user, require_role
from app.models.user import User
from app.models.academic import Teacher
from app.schemas.student import TeacherOut

router = APIRouter(prefix="/teachers", tags=["Faculty & Teachers"])

@router.get("", response_model=List[TeacherOut])
def list_teachers(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    List all teachers strictly scoped to current_user.school_id.
    """
    teachers = db.query(Teacher).join(User, Teacher.user_id == User.id).filter(
        Teacher.school_id == current_user.school_id
    ).all()

    results = []
    for t in teachers:
        results.append({
            "id": t.id,
            "school_id": t.school_id,
            "user_id": t.user_id,
            "full_name": t.user.full_name if t.user else "Faculty Member",
            "emp_code": t.emp_code,
            "designation": t.designation,
            "primary_subject": t.primary_subject,
            "qualification": t.qualification,
            "phone": t.user.phone if t.user else None,
            "email": t.user.email if t.user else None,
            "is_class_mentor": t.is_class_mentor,
            "mentor_class_name": t.mentor_class_name
        })
    return results
