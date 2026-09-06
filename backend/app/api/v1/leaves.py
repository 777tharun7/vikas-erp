from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.core.dependencies import get_current_user, require_role
from app.models.user import User, AuditLog
from app.models.student import Student
from app.models.leave import LeaveRequest
from app.schemas.leave import LeaveRequestCreate, LeaveStatusUpdate, LeaveRequestOut

router = APIRouter(prefix="/leaves", tags=["Leave Management"])

@router.post("/apply", response_model=LeaveRequestOut)
def apply_leave(
    req: LeaveRequestCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Student or Parent submits a leave request.
    """
    student = None
    if current_user.role == "student":
        student = current_user.student_profile
    elif current_user.role == "parent" and current_user.parent_profile:
        child = current_user.parent_profile.children[0] if current_user.parent_profile.children else None
        if child:
            student = db.query(Student).filter(Student.id == child.student_id).first()

    if not student:
        raise HTTPException(status_code=400, detail="User has no linked student profile")

    leave = LeaveRequest(
        school_id=current_user.school_id,
        student_id=student.id,
        leave_type=req.leave_type,
        from_date=req.from_date,
        to_date=req.to_date,
        days_count=req.days_count,
        reason=req.reason,
        applied_by=f"{current_user.full_name} ({current_user.role.title()})",
        status="Pending Review"
    )
    db.add(leave)
    db.commit()
    db.refresh(leave)

    return {
        "id": leave.id,
        "school_id": leave.school_id,
        "student_id": leave.student_id,
        "student_name": student.user.full_name if student.user else "Student",
        "roll_no": student.roll_no,
        "grade": f"{student.grade_level} {student.section_name}",
        "leave_type": leave.leave_type,
        "from_date": leave.from_date,
        "to_date": leave.to_date,
        "days_count": leave.days_count,
        "reason": leave.reason,
        "applied_by": leave.applied_by,
        "status": leave.status,
        "reviewed_by_teacher": leave.reviewed_by_teacher,
        "created_at": leave.created_at
    }


@router.get("", response_model=List[LeaveRequestOut])
def list_leaves(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    List leave requests:
    - Principal/Teacher: View all leave requests in current school.
    - Student/Parent: View only own leave requests.
    """
    query = db.query(LeaveRequest).join(Student, LeaveRequest.student_id == Student.id).filter(
        LeaveRequest.school_id == current_user.school_id
    )

    if current_user.role == "student" and current_user.student_profile:
        query = query.filter(LeaveRequest.student_id == current_user.student_profile.id)
    elif current_user.role == "parent" and current_user.parent_profile:
        child_ids = [c.student_id for c in current_user.parent_profile.children]
        query = query.filter(LeaveRequest.student_id.in_(child_ids))

    leaves = query.order_by(LeaveRequest.created_at.desc()).all()
    results = []
    for l in leaves:
        s = db.query(Student).filter(Student.id == l.student_id).first()
        results.append({
            "id": l.id,
            "school_id": l.school_id,
            "student_id": l.student_id,
            "student_name": s.user.full_name if s and s.user else "Student",
            "roll_no": s.roll_no if s else "-",
            "grade": f"{s.grade_level} {s.section_name}" if s else "-",
            "leave_type": l.leave_type,
            "from_date": l.from_date,
            "to_date": l.to_date,
            "days_count": l.days_count,
            "reason": l.reason,
            "applied_by": l.applied_by,
            "status": l.status,
            "reviewed_by_teacher": l.reviewed_by_teacher,
            "created_at": l.created_at
        })
    return results


@router.patch("/{leave_id}/status")
def update_leave_status(
    leave_id: int,
    req: LeaveStatusUpdate,
    current_user: User = Depends(require_role(["principal", "teacher", "admin"])),
    db: Session = Depends(get_db)
):
    leave = db.query(LeaveRequest).filter(
        LeaveRequest.id == leave_id,
        LeaveRequest.school_id == current_user.school_id
    ).first()

    if not leave:
        raise HTTPException(status_code=404, detail="Leave request not found")

    leave.status = req.status
    leave.reviewed_by_teacher = current_user.full_name
    leave.review_note = req.review_note
    
    db.commit()
    return {"message": f"Leave request updated to '{req.status}' by {current_user.full_name}"}
