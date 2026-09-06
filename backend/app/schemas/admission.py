from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AdmissionInquiryCreate(BaseModel):
    student_name: str
    parent_name: str
    phone: str
    email: Optional[str] = None
    grade_applied: str
    previous_school: Optional[str] = None
    village_locality: Optional[str] = None
    notes: Optional[str] = None

class AdmissionInquiryOut(BaseModel):
    id: int
    school_id: int
    inquiry_no: str
    student_name: str
    parent_name: str
    phone: str
    email: Optional[str] = None
    grade_applied: str
    previous_school: Optional[str] = None
    village_locality: Optional[str] = None
    status: str
    lead_source: str
    notes: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class EnrollLeadRequest(BaseModel):
    inquiry_id: int
    grade: str
    section: str = "A"
    roll_no: Optional[str] = None
    dob: Optional[str] = None
    gender: str = "Male"
    parent_phone: Optional[str] = None
    annual_fee: float = 24000.0
