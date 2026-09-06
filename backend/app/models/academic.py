from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Float, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class ClassGrade(Base):
    __tablename__ = "class_grades"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), index=True, nullable=False)
    name = Column(String(50), nullable=False) # e.g. "Class VIII"
    code = Column(String(20), nullable=False) # e.g. "VIII"
    numeric_order = Column(Integer, default=1)
    
    sections = relationship("Section", back_populates="class_grade", cascade="all, delete-orphan")


class Section(Base):
    __tablename__ = "sections"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), index=True, nullable=False)
    class_id = Column(Integer, ForeignKey("class_grades.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(20), nullable=False) # e.g. "A", "B"
    room_number = Column(String(50), nullable=True)
    
    class_grade = relationship("ClassGrade", back_populates="sections")
    students = relationship("Student", back_populates="section")


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), index=True, nullable=False)
    name = Column(String(100), nullable=False) # e.g. "Mathematics", "Science", "Telugu"
    code = Column(String(50), nullable=True)
    subject_type = Column(String(50), default="Theory") # Theory / Practical / Language


class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    emp_code = Column(String(50), index=True, nullable=False) # e.g. "EMP-VG-002"
    designation = Column(String(100), default="Senior Teacher")
    primary_subject = Column(String(100), default="Mathematics")
    qualification = Column(String(100), nullable=True)
    experience_years = Column(Integer, default=5)
    monthly_salary = Column(Float, default=38500.0)
    bank_account = Column(String(50), nullable=True)
    
    is_class_mentor = Column(Boolean, default=False)
    mentor_class_name = Column(String(50), nullable=True) # e.g. "Class VIII Section A"
    
    user = relationship("User", back_populates="teacher_profile")
    school = relationship("School", back_populates="teachers")
