from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class FeeInstallmentOut(BaseModel):
    id: int
    term_name: str
    due_date: Optional[str] = None
    total_amount: float
    paid_amount: float
    status: str
    receipt_no: Optional[str] = None
    paid_date: Optional[str] = None

    class Config:
        from_attributes = True

class FeePaymentCreate(BaseModel):
    amount: float
    payment_mode: str = "Online UPI Gateway"
    transaction_id: Optional[str] = None
    description: Optional[str] = "Term 3 Tuition Fee Payment"

class FeePaymentOut(BaseModel):
    id: int
    receipt_no: str
    amount: float
    payment_date: datetime
    payment_mode: str
    transaction_id: Optional[str] = None
    status: str
    description: str

    class Config:
        from_attributes = True

class StudentFeeAccountOut(BaseModel):
    id: int
    student_id: int
    student_name: str
    roll_no: str
    grade_level: str
    total_annual_fee: float
    paid_amount: float
    due_amount: float
    status: str
    installments: List[FeeInstallmentOut] = []
    receipts_history: List[FeePaymentOut] = []

    class Config:
        from_attributes = True
