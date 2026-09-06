from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class School(Base):
    __tablename__ = "schools"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False) # e.g. "vikas-cherial"
    name = Column(String(255), nullable=False)
    code = Column(String(50), unique=True, index=True, nullable=False) # e.g. "VGS-HYD-001"
    udise_code = Column(String(50), index=True, nullable=True) # e.g. "36182100637"
    affiliation = Column(String(255), nullable=True) # e.g. "State Board (SCERT Telangana)"
    
    # Location
    address = Column(String(500), nullable=True)
    city = Column(String(100), nullable=True)
    district = Column(String(100), nullable=True)
    state = Column(String(100), default="Telangana")
    pincode = Column(String(20), nullable=True)
    
    # Contact
    phone = Column(String(50), nullable=True)
    email = Column(String(100), nullable=True)
    principal_name = Column(String(150), nullable=True)
    
    # Status
    is_active = Column(Boolean, default=True)
    academic_year = Column(String(50), default="2026-2027")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    config = relationship("SchoolConfig", back_populates="school", uselist=False, cascade="all, delete-orphan")
    domains = relationship("DomainMapping", back_populates="school", cascade="all, delete-orphan")
    users = relationship("User", back_populates="school")
    students = relationship("Student", back_populates="school")
    teachers = relationship("Teacher", back_populates="school")


class SchoolConfig(Base):
    __tablename__ = "school_configs"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), unique=True, nullable=False)

    # Branding & Visual Theme
    logo_url = Column(String(500), nullable=True)
    favicon_url = Column(String(500), nullable=True)
    primary_color = Column(String(30), default="#4f46e5")
    secondary_color = Column(String(30), default="#06b6d4")
    accent_color = Column(String(30), default="#10b981")
    motto = Column(String(255), nullable=True)
    slogan = Column(String(255), nullable=True)

    # Public Website Content (Stored as JSON for infinite customizability)
    hero_title = Column(String(255), nullable=True)
    hero_subtitle = Column(Text, nullable=True)
    hero_image_url = Column(String(500), nullable=True)
    about_text = Column(Text, nullable=True)
    features = Column(JSON, default=list) # [{icon, title, desc}]
    statistics = Column(JSON, default=dict) # {students: 1250, passPct: "100%", labs: 6}
    enabled_modules = Column(JSON, default=lambda: [
        "admissions", "attendance", "fees", "exams", "leave", "feedback", "transport", "library"
    ])
    social_links = Column(JSON, default=dict)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    school = relationship("School", back_populates="config")


class DomainMapping(Base):
    __tablename__ = "domain_mappings"

    id = Column(Integer, primary_key=True, index=True)
    domain = Column(String(255), unique=True, index=True, nullable=False) # e.g. "vikasgrammar.edu.in", "school-a.com"
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), nullable=False)
    is_primary = Column(Boolean, default=False)
    is_verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    school = relationship("School", back_populates="domains")
