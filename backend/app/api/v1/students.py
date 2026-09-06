from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.session import get_db
from app.core.dependencies import get_current_user, require_role
from app.models.user import User
from app.models.student import Student
from app.schemas.student import StudentOut

router = APIRouter(prefix="/students", tags=["Student Management"])

@router.get("", response_model=List[StudentOut])
def list_students(
    grade: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    current_user: User = Depends(require_role(["principal", "teacher", "admin"])),
    db: Session = Depends(get_db)
):
    """
    List students strictly scoped to current_user.school_id.
    """
    query = db.query(Student).join(User, Student.user_id == User.id).filter(
        Student.school_id == current_user.school_id
    )

    if grade:
        query = query.filter(Student.grade_level == grade)
    if search:
        query = query.filter(
            (User.full_name.ilike(f"%{search}%")) |
            (Student.roll_no.ilike(f"%{search}%")) |
            (Student.admission_no.ilike(f"%{search}%"))
        )

    students = query.all()
    results = []
    for s in students:
        results.append({
            "id": s.id,
            "school_id": s.school_id,
            "user_id": s.user_id,
            "full_name": s.user.full_name if s.user else "Unknown",
            "roll_no": s.roll_no,
            "admission_no": s.admission_no,
            "udise_pen": s.udise_pen,
            "grade_level": s.grade_level,
            "section_name": s.section_name,
            "gender": s.gender,
            "phone": s.user.phone if s.user else None,
            "email": s.user.email if s.user else None,
            "bus_route": s.bus_route,
            "attendance_pct": s.attendance_pct,
            "academic_avg_pct": s.academic_avg_pct,
            "rank_in_class": s.rank_in_class,
            "status": s.status
        })
    return results


@router.get("/{student_id}", response_model=StudentOut)
def get_student_details(
    student_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(
        Student.id == student_id,
        Student.school_id == current_user.school_id
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found in this school")

    # If student or parent role, enforce access to only self or own child
    if current_user.role == "student" and current_user.student_profile.id != student.id:
        raise HTTPException(status_code=403, detail="Unauthorized access to other student records")

    return {
        "id": student.id,
        "school_id": student.school_id,
        "user_id": student.user_id,
        "full_name": student.user.full_name if student.user else "Unknown",
        "roll_no": student.roll_no,
        "admission_no": student.admission_no,
        "udise_pen": student.udise_pen,
        "grade_level": student.grade_level,
        "section_name": student.section_name,
        "gender": student.gender,
        "phone": student.user.phone if student.user else None,
        "email": student.user.email if student.user else None,
        "bus_route": student.bus_route,
        "attendance_pct": student.attendance_pct,
        "academic_avg_pct": student.academic_avg_pct,
        "rank_in_class": student.rank_in_class,
        "status": student.status
    }
