from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import random

from app.db.session import get_db
from app.core.dependencies import get_current_user, get_current_tenant, require_role
from app.core.security import get_password_hash
from app.models.user import User, AuditLog
from app.models.school import School
from app.models.student import Student, Parent, StudentParent
from app.models.fee import StudentFeeAccount, FeeInstallment
from app.models.admission import AdmissionInquiry
from app.schemas.admission import AdmissionInquiryCreate, AdmissionInquiryOut, EnrollLeadRequest

router = APIRouter(prefix="/admissions", tags=["Admissions & Enrollment"])

@router.post("/inquire", response_model=AdmissionInquiryOut)
def create_admission_inquiry(
    req: AdmissionInquiryCreate,
    tenant: School = Depends(get_current_tenant),
    db: Session = Depends(get_db)
):
    """
    Public Admission Inquiry capture endpoint (called from public school website).
    Automatically bound to the detected school tenant.
    """
    inquiry_no = f"ADM-INQ-{datetime.utcnow().year}-{random.randint(100, 999)}"

    inquiry = AdmissionInquiry(
        school_id=tenant.id,
        inquiry_no=inquiry_no,
        student_name=req.student_name.strip(),
        parent_name=req.parent_name.strip(),
        phone=req.phone.strip(),
        email=req.email.strip() if req.email else None,
        grade_applied=req.grade_applied,
        previous_school=req.previous_school,
        village_locality=req.village_locality,
        status="Inquiry Received",
        lead_source="Public School Website",
        notes=req.notes
    )
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return inquiry


@router.get("/inquiries", response_model=List[AdmissionInquiryOut])
def list_admission_inquiries(
    current_user: User = Depends(require_role(["principal", "admin", "teacher"])),
    db: Session = Depends(get_db)
):
    """
    List admission leads strictly scoped to current_user.school_id.
    """
    inquiries = db.query(AdmissionInquiry).filter(
        AdmissionInquiry.school_id == current_user.school_id
    ).order_by(AdmissionInquiry.created_at.desc()).all()
    return inquiries


@router.post("/enroll")
def enroll_admission_lead(
    req: EnrollLeadRequest,
    current_user: User = Depends(require_role(["principal", "admin"])),
    db: Session = Depends(get_db)
):
    """
    Convert an Admissions Lead into an active Student:
    1. Update Inquiry status to 'Enrolled'
    2. Create Student User account
    3. Create Student Directory Record with UDISE State PEN
    4. Create Parent User account and link
    5. Initialize StudentFeeAccount with installments
    6. Record AuditLog
    """
    inquiry = db.query(AdmissionInquiry).filter(
        AdmissionInquiry.id == req.inquiry_id,
        AdmissionInquiry.school_id == current_user.school_id
    ).first()

    if not inquiry:
        raise HTTPException(status_code=404, detail="Admission inquiry not found in this school")

    school = current_user.school
    clean_name = inquiry.student_name.lower().replace(" ", "")
    email = f"{clean_name}{random.randint(10, 99)}@{school.slug}.edu.in"
    roll_no = req.roll_no or f"{datetime.utcnow().year}-{req.grade.replace('Class ', '')}-{random.randint(100, 999)}"
    admission_no = f"ADM-{school.code}-{datetime.utcnow().year}-{random.randint(100, 999)}"
    udise_pen = f"PEN-TS-{datetime.utcnow().year}-{random.randint(10000, 99999)}"

    # 1. Create Student User
    student_user = User(
        school_id=school.id,
        email=email,
        hashed_password=get_password_hash("student#vikas26"),
        full_name=inquiry.student_name,
        phone=inquiry.phone,
        role="student"
    )
    db.add(student_user)
    db.flush()

    # 2. Create Student Record
    student = Student(
        school_id=school.id,
        user_id=student_user.id,
        roll_no=roll_no,
        admission_no=admission_no,
        udise_pen=udise_pen,
        grade_level=req.grade,
        section_name=req.section,
        dob=req.dob or "2012-05-15",
        gender=req.gender,
        status="Active",
        attendance_pct=100.0,
        academic_avg_pct=85.0,
        rank_in_class=5
    )
    db.add(student)
    db.flush()

    # 3. Create Parent User & Record
    parent_user = User(
        school_id=school.id,
        email=f"parent.{clean_name}{random.randint(10, 99)}@{school.slug}.edu.in",
        hashed_password=get_password_hash("parent#vikas26"),
        full_name=inquiry.parent_name,
        phone=req.parent_phone or inquiry.phone,
        role="parent"
    )
    db.add(parent_user)
    db.flush()

    parent = Parent(
        school_id=school.id,
        user_id=parent_user.id,
        relationship_type="Father"
    )
    db.add(parent)
    db.flush()

    # Link Student and Parent
    link = StudentParent(
        school_id=school.id,
        student_id=student.id,
        parent_id=parent.id
    )
    db.add(link)

    # 4. Initialize Fee Account
    fee_acc = StudentFeeAccount(
        school_id=school.id,
        student_id=student.id,
        total_annual_fee=req.annual_fee,
        paid_amount=0.0,
        due_amount=req.annual_fee,
        status="Pending Term 1"
    )
    db.add(fee_acc)
    db.flush()

    # Installments
    inst1 = FeeInstallment(
        school_id=school.id,
        fee_account_id=fee_acc.id,
        term_name="Term 1 Admission & Tuition Fee",
        due_date="2026-09-30",
        total_amount=req.annual_fee / 3,
        paid_amount=0.0,
        status="Pending"
    )
    db.add(inst1)

    # 5. Update Inquiry status
    inquiry.status = "Enrolled"

    # 6. Audit Log
    audit = AuditLog(
        school_id=school.id,
        user_id=current_user.id,
        action="ENROLL_STUDENT",
        entity_type="Student",
        entity_id=str(student.id),
        description=f"Enrolled {inquiry.student_name} into {req.grade} {req.section} (PEN: {udise_pen})"
    )
    db.add(audit)

    db.commit()

    return {
        "message": f"Successfully enrolled {inquiry.student_name}!",
        "student": {
            "id": student.id,
            "name": inquiry.student_name,
            "roll_no": roll_no,
            "udise_pen": udise_pen,
            "grade": f"{req.grade} {req.section}",
            "student_login": email,
            "parent_name": inquiry.parent_name
        }
    }
