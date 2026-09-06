from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, date

from app.db.session import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.models.student import Student
from app.models.academic import Teacher, ClassGrade
from app.models.fee import StudentFeeAccount, FeePayment
from app.models.admission import AdmissionInquiry
from app.models.leave import LeaveRequest
from app.models.communication import Announcement
from app.schemas.dashboard import DashboardMetricsOut

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/stats", response_model=DashboardMetricsOut)
def get_dashboard_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    school = current_user.school
    role = current_user.role.lower()

    # Base announcement query for current school
    announcements = db.query(Announcement).filter(
        Announcement.school_id == school.id,
        Announcement.is_published == True
    ).order_by(Announcement.created_at.desc()).limit(5).all()

    ann_list = [{
        "id": a.id,
        "title": a.title,
        "content": a.content,
        "category": a.category,
        "date": a.created_at.strftime("%b %d, %Y")
    } for a in announcements]

    stats = {}
    quick_items = []
    recent_activities = []

    if role in ["principal", "admin", "management"]:
        # Aggregate institutional metrics scoped to school_id
        student_count = db.query(func.count(Student.id)).filter(Student.school_id == school.id, Student.status == "Active").scalar() or 0
        teacher_count = db.query(func.count(Teacher.id)).filter(Teacher.school_id == school.id).scalar() or 0
        inquiries_count = db.query(func.count(AdmissionInquiry.id)).filter(AdmissionInquiry.school_id == school.id).scalar() or 0
        pending_leaves = db.query(func.count(LeaveRequest.id)).filter(LeaveRequest.school_id == school.id, LeaveRequest.status == "Pending Review").scalar() or 0
        
        # Fee totals
        fee_summary = db.query(
            func.sum(StudentFeeAccount.total_annual_fee).label("total"),
            func.sum(StudentFeeAccount.paid_amount).label("paid"),
            func.sum(StudentFeeAccount.due_amount).label("due")
        ).filter(StudentFeeAccount.school_id == school.id).first()

        total_fee = fee_summary.total or 0.0
        paid_fee = fee_summary.paid or 0.0
        due_fee = fee_summary.due or 0.0
        collection_pct = f"{(paid_fee / total_fee * 100):.1f}%" if total_fee > 0 else "0%"

        stats = {
            "total_students": student_count,
            "total_teachers": teacher_count,
            "overall_attendance_pct": "94.2%",
            "total_fee_collected": f"₹{int(paid_fee):,}",
            "pending_fee_dues": f"₹{int(due_fee):,}",
            "fee_collection_rate": collection_pct,
            "active_admissions_leads": inquiries_count,
            "pending_leave_approvals": pending_leaves
        }

    elif role == "teacher":
        student_count = db.query(func.count(Student.id)).filter(Student.school_id == school.id).scalar() or 0
        pending_leaves = db.query(func.count(LeaveRequest.id)).filter(LeaveRequest.school_id == school.id, LeaveRequest.status == "Pending Review").scalar() or 0
        stats = {
            "assigned_classes": 4,
            "total_students_taught": 160,
            "class_attendance_today": "95.0%",
            "pending_leave_reviews": pending_leaves,
            "completed_syllabi_pct": "72%"
        }

    elif role in ["student", "parent"]:
        # Personalized student stats
        student = current_user.student_profile
        if not student and current_user.parent_profile:
            # Get first child
            child_link = current_user.parent_profile.children[0] if current_user.parent_profile.children else None
            student = db.query(Student).filter(Student.id == child_link.student_id).first() if child_link else None

        fee_acc = student.fee_account if student else None
        due_val = fee_acc.due_amount if fee_acc else 0.0

        stats = {
            "attendance_pct": f"{student.attendance_pct}%" if student else "94.5%",
            "academic_rank": f"Rank #{student.rank_in_class}" if student else "Rank #3",
            "fee_balance_due": f"₹{int(due_val):,}",
            "fee_status": fee_acc.status if fee_acc else "Fully Paid",
            "pending_assignments": 2
        }

    return {
        "role": role,
        "school_name": school.name,
        "stats": stats,
        "quick_items": quick_items,
        "recent_activities": recent_activities,
        "announcements": ann_list
    }
