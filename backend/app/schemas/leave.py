from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LeaveRequestCreate(BaseModel):
    leave_type: str = "Medical Leave"
    from_date: str
    to_date: str
    days_count: int = 1
    reason: str
    applied_by: Optional[str] = "Student"

class LeaveStatusUpdate(BaseModel):
    status: str # "Accepted" or "Rejected"
    review_note: Optional[str] = None

class LeaveRequestOut(BaseModel):
    id: int
    school_id: int
    student_id: int
    student_name: str
    roll_no: str
    grade: str
    leave_type: str
    from_date: str
    to_date: str
    days_count: int
    reason: str
    applied_by: str
    status: str
    reviewed_by_teacher: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
