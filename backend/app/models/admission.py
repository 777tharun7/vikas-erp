from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class AdmissionInquiry(Base):
    __tablename__ = "admission_inquiries"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), index=True, nullable=False)

    inquiry_no = Column(String(50), unique=True, index=True, nullable=False) # e.g. "ADM-INQ-2026-081"
    student_name = Column(String(150), nullable=False)
    parent_name = Column(String(150), nullable=False)
    phone = Column(String(50), nullable=False)
    email = Column(String(100), nullable=True)
    grade_applied = Column(String(50), nullable=False) # e.g. "Class VIII", "Class IX"
    previous_school = Column(String(200), nullable=True)
    village_locality = Column(String(150), nullable=True)
    
    # Pipeline status: Inquiry Received / Campus Visit Scheduled / Documents Verified / Enrolled / Closed
    status = Column(String(50), default="Inquiry Received", index=True)
    lead_source = Column(String(50), default="Public School Website")
    notes = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
