from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=True) # null for school-wide broadcast
    
    title = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    notification_type = Column(String(50), default="INFO") # FEE, ATTENDANCE, LEAVE, EXAM, ACADEMIC
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)


class Announcement(Base):
    __tablename__ = "announcements"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), index=True, nullable=False)

    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String(50), default="General") # Circular, Exam, Holiday, Sports
    target_roles = Column(JSON, default=lambda: ["student", "parent", "teacher", "principal"])
    published_by = Column(String(100), default="Principal Office")
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class StudentTeacherFeedback(Base):
    __tablename__ = "student_teacher_feedbacks"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), index=True, nullable=False)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), index=True, nullable=False)
    teacher_id = Column(Integer, ForeignKey("teachers.id", ondelete="CASCADE"), index=True, nullable=False)

    subject = Column(String(100), default="Mathematics")
    rating = Column(Integer, default=5)
    performance_level = Column(String(50), default="Outstanding Concept Mastery")
    concept_grasp = Column(Text, nullable=True)
    advice_for_parents = Column(Text, nullable=True)
    
    parent_acknowledged = Column(Boolean, default=False)
    parent_note = Column(String(255), nullable=True)
    acknowledged_date = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
