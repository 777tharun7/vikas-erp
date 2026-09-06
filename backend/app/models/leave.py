from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class LeaveRequest(Base):
    __tablename__ = "leave_requests"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), index=True, nullable=False)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    
    leave_type = Column(String(50), default="Medical Leave") # Medical Leave / Casual / Family Function
    from_date = Column(String(50), nullable=False)
    to_date = Column(String(50), nullable=False)
    days_count = Column(Integer, default=1)
    reason = Column(Text, nullable=False)
    applied_by = Column(String(100), default="Student")
    
    # Status: Pending Review / Accepted / Rejected
    status = Column(String(50), default="Pending Review", index=True)
    reviewed_by_teacher = Column(String(100), nullable=True)
    review_note = Column(String(255), nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
