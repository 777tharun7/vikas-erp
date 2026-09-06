from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Float, Date, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    section_id = Column(Integer, ForeignKey("sections.id", ondelete="SET NULL"), nullable=True)

    roll_no = Column(String(50), index=True, nullable=False) # e.g. "2026-VIII-014"
    admission_no = Column(String(50), index=True, nullable=False) # e.g. "ADM-VG-2024-089"
    udise_pen = Column(String(50), index=True, nullable=True) # e.g. "PEN-TS-2026-88192"
    
    grade_level = Column(String(50), default="Class VIII")
    section_name = Column(String(20), default="A")
    dob = Column(String(50), nullable=True)
    gender = Column(String(20), default="Male")
    blood_group = Column(String(10), nullable=True)
    address = Column(String(500), nullable=True)
    bus_route = Column(String(100), nullable=True)
    
    # Academic & Attendance stats
    attendance_pct = Column(Float, default=94.5)
    academic_avg_pct = Column(Float, default=86.0)
    rank_in_class = Column(Integer, default=3)
    
    status = Column(String(50), default="Active")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="student_profile")
    school = relationship("School", back_populates="students")
    section = relationship("Section", back_populates="students")
    fee_account = relationship("StudentFeeAccount", back_populates="student", uselist=False, cascade="all, delete-orphan")


class Parent(Base):
    __tablename__ = "parents"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    occupation = Column(String(100), nullable=True)
    alternate_phone = Column(String(50), nullable=True)
    relationship_type = Column(String(50), default="Father") # Father / Mother / Guardian
    
    user = relationship("User", back_populates="parent_profile")
    children = relationship("StudentParent", back_populates="parent")


class StudentParent(Base):
    __tablename__ = "student_parents"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), index=True, nullable=False)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    parent_id = Column(Integer, ForeignKey("parents.id", ondelete="CASCADE"), nullable=False)
    
    parent = relationship("Parent", back_populates="children")
