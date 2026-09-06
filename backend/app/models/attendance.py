from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Date
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class StudentAttendance(Base):
    __tablename__ = "student_attendances"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), index=True, nullable=False)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), index=True, nullable=False)
    
    date = Column(Date, index=True, nullable=False)
    status = Column(String(20), default="Present") # Present / Absent / Leave
    check_in_time = Column(String(20), nullable=True) # e.g. "08:24 AM"
    remarks = Column(String(255), nullable=True)


class TeacherAttendance(Base):
    __tablename__ = "teacher_attendances"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), index=True, nullable=False)
    teacher_id = Column(Integer, ForeignKey("teachers.id", ondelete="CASCADE"), index=True, nullable=False)
    
    date = Column(Date, index=True, nullable=False)
    status = Column(String(20), default="Present") # Present / On Duty / Casual Leave
    check_in_time = Column(String(20), nullable=True)
