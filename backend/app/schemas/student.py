from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class StudentOut(BaseModel):
    id: int
    school_id: int
    user_id: int
    full_name: str
    roll_no: str
    admission_no: str
    udise_pen: Optional[str] = None
    grade_level: str
    section_name: str
    gender: str
    phone: Optional[str] = None
    email: Optional[str] = None
    bus_route: Optional[str] = None
    attendance_pct: float
    academic_avg_pct: float
    rank_in_class: int
    status: str

    class Config:
        from_attributes = True

class TeacherOut(BaseModel):
    id: int
    school_id: int
    user_id: int
    full_name: str
    emp_code: str
    designation: str
    primary_subject: str
    qualification: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    is_class_mentor: bool
    mentor_class_name: Optional[str] = None

    class Config:
        from_attributes = True
