from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Float, JSON, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class StudentFeeAccount(Base):
    __tablename__ = "student_fee_accounts"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), index=True, nullable=False)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), unique=True, nullable=False)

    total_annual_fee = Column(Float, default=24000.0)
    paid_amount = Column(Float, default=20500.0)
    due_amount = Column(Float, default=3500.0)
    concession_amount = Column(Float, default=0.0)
    status = Column(String(50), default="Pending Term 3") # Fully Paid / Partially Paid / Pending Term 3

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    student = relationship("Student", back_populates="fee_account")
    installments = relationship("FeeInstallment", back_populates="fee_account", cascade="all, delete-orphan")
    payments = relationship("FeePayment", back_populates="fee_account", cascade="all, delete-orphan")


class FeeInstallment(Base):
    __tablename__ = "fee_installments"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), index=True, nullable=False)
    fee_account_id = Column(Integer, ForeignKey("student_fee_accounts.id", ondelete="CASCADE"), nullable=False)

    term_name = Column(String(100), nullable=False) # e.g. "Term 1 Admission & Book Fee", "Term 2 Mid-Term Fee"
    due_date = Column(String(50), nullable=True)
    total_amount = Column(Float, nullable=False)
    paid_amount = Column(Float, default=0.0)
    status = Column(String(50), default="Pending") # Paid / Pending / Overdue
    receipt_no = Column(String(100), nullable=True)
    paid_date = Column(String(50), nullable=True)

    fee_account = relationship("StudentFeeAccount", back_populates="installments")


class FeePayment(Base):
    __tablename__ = "fee_payments"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), index=True, nullable=False)
    fee_account_id = Column(Integer, ForeignKey("student_fee_accounts.id", ondelete="CASCADE"), nullable=False)
    
    receipt_no = Column(String(100), unique=True, index=True, nullable=False)
    amount = Column(Float, nullable=False)
    payment_date = Column(DateTime, default=datetime.utcnow)
    payment_mode = Column(String(50), default="Online UPI Gateway") # Online UPI / Cash / Cheque / Bank Transfer
    transaction_id = Column(String(150), nullable=True)
    collected_by = Column(String(100), default="Online Portal Gateway")
    status = Column(String(50), default="Success")
    description = Column(String(255), default="Tuition & Academic Fee Payment")

    fee_account = relationship("StudentFeeAccount", back_populates="payments")
