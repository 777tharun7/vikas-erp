from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
import random

from app.db.session import get_db
from app.core.dependencies import get_current_user, require_role
from app.models.user import User, AuditLog
from app.models.student import Student
from app.models.fee import StudentFeeAccount, FeeInstallment, FeePayment
from app.models.communication import Notification
from app.schemas.fee import StudentFeeAccountOut, FeePaymentCreate, FeePaymentOut

router = APIRouter(prefix="/fees", tags=["Fees & Inflows"])

@router.get("/my-account", response_model=StudentFeeAccountOut)
def get_my_fee_account(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get personalized fee account for authenticated student or parent.
    """
    student = None
    if current_user.role == "student":
        student = current_user.student_profile
    elif current_user.role == "parent" and current_user.parent_profile:
        child = current_user.parent_profile.children[0] if current_user.parent_profile.children else None
        if child:
            student = db.query(Student).filter(Student.id == child.student_id).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student profile not linked to user")

    fee_acc = db.query(StudentFeeAccount).filter(
        StudentFeeAccount.student_id == student.id,
        StudentFeeAccount.school_id == current_user.school_id
    ).first()

    if not fee_acc:
        # Auto-create if missing
        fee_acc = StudentFeeAccount(
            school_id=current_user.school_id,
            student_id=student.id,
            total_annual_fee=24000.0,
            paid_amount=20500.0,
            due_amount=3500.0,
            status="Pending Term 3"
        )
        db.add(fee_acc)
        db.commit()
        db.refresh(fee_acc)

    return {
        "id": fee_acc.id,
        "student_id": student.id,
        "student_name": student.user.full_name if student.user else "Student",
        "roll_no": student.roll_no,
        "grade_level": f"{student.grade_level} {student.section_name}",
        "total_annual_fee": fee_acc.total_annual_fee,
        "paid_amount": fee_acc.paid_amount,
        "due_amount": fee_acc.due_amount,
        "status": fee_acc.status,
        "installments": fee_acc.installments,
        "receipts_history": fee_acc.payments
    }


@router.post("/pay", response_model=FeePaymentOut)
def process_fee_payment(
    req: FeePaymentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Atomic fee payment transaction:
    1. Reconciles StudentFeeAccount (paid_amount, due_amount)
    2. Updates last installment to Paid
    3. Creates FeePayment receipt
    4. Issues live in-app notification
    5. Records AuditLog
    """
    student = None
    if current_user.role == "student":
        student = current_user.student_profile
    elif current_user.role == "parent" and current_user.parent_profile:
        child = current_user.parent_profile.children[0] if current_user.parent_profile.children else None
        if child:
            student = db.query(Student).filter(Student.id == child.student_id).first()

    if not student:
        raise HTTPException(status_code=400, detail="User has no linked student profile for fee payment")

    fee_acc = db.query(StudentFeeAccount).filter(
        StudentFeeAccount.student_id == student.id,
        StudentFeeAccount.school_id == current_user.school_id
    ).first()

    if not fee_acc:
        raise HTTPException(status_code=404, detail="Fee account not found")

    pay_amount = float(req.amount)
    if pay_amount <= 0:
        raise HTTPException(status_code=400, detail="Payment amount must be greater than zero")

    # Generate official receipt number
    receipt_no = f"REC-{current_user.school.code}-{datetime.utcnow().year}-{random.randint(200, 999)}"
    
    # 1. Update account balances
    fee_acc.paid_amount += pay_amount
    fee_acc.due_amount = max(0.0, fee_acc.due_amount - pay_amount)
    if fee_acc.due_amount == 0.0:
        fee_acc.status = "Fully Paid"

    # 2. Update installment
    last_inst = db.query(FeeInstallment).filter(
        FeeInstallment.fee_account_id == fee_acc.id,
        FeeInstallment.status != "Paid"
    ).first()
    if last_inst:
        last_inst.paid_amount += pay_amount
        last_inst.status = "Paid"
        last_inst.receipt_no = receipt_no
        last_inst.paid_date = datetime.utcnow().strftime("%b %d, %Y")

    # 3. Create payment record
    payment = FeePayment(
        school_id=current_user.school_id,
        fee_account_id=fee_acc.id,
        receipt_no=receipt_no,
        amount=pay_amount,
        payment_date=datetime.utcnow(),
        payment_mode=req.payment_mode,
        transaction_id=req.transaction_id or f"TXN-UPI-{random.randint(10000000, 99999999)}",
        status="Success",
        description=req.description or "Online Tuition Fee Payment"
    )
    db.add(payment)

    # 4. Notification
    notif = Notification(
        school_id=current_user.school_id,
        user_id=current_user.id,
        title="Fee Payment Successful",
        message=f"Received payment of ₹{int(pay_amount):,} for {student.user.full_name}. Receipt #{receipt_no}",
        notification_type="FEE"
    )
    db.add(notif)

    # 5. Audit Log
    audit = AuditLog(
        school_id=current_user.school_id,
        user_id=current_user.id,
        action="PAY_FEE",
        entity_type="FeePayment",
        entity_id=receipt_no,
        description=f"Paid ₹{pay_amount} for student {student.roll_no}"
    )
    db.add(audit)

    db.commit()
    db.refresh(payment)

    return payment


@router.get("/ledger")
def get_school_fee_ledger(
    current_user: User = Depends(require_role(["principal", "admin", "teacher"])),
    db: Session = Depends(get_db)
):
    """
    Principal & Faculty view of all student fee statuses in current school.
    """
    accounts = db.query(StudentFeeAccount).join(Student, StudentFeeAccount.student_id == Student.id).join(User, Student.user_id == User.id).filter(
        StudentFeeAccount.school_id == current_user.school_id
    ).all()

    results = []
    for acc in accounts:
        s = acc.student
        results.append({
            "account_id": acc.id,
            "student_name": s.user.full_name if s and s.user else "Student",
            "roll_no": s.roll_no if s else "-",
            "grade": f"{s.grade_level} {s.section_name}" if s else "-",
            "total_fee": acc.total_annual_fee,
            "paid_fee": acc.paid_amount,
            "due_fee": acc.due_amount,
            "status": acc.status,
            "parent_phone": s.user.phone if s and s.user else "-"
        })
    return results
