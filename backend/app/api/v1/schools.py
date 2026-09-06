from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.session import get_db
from app.core.dependencies import get_current_tenant
from app.models.school import School, SchoolConfig, DomainMapping
from app.schemas.school import SchoolPublicOut

router = APIRouter(prefix="/schools", tags=["Schools & Branding"])

@router.get("/current", response_model=SchoolPublicOut)
def get_current_school(tenant: School = Depends(get_current_tenant)):
    """
    Get the dynamically resolved school branding and configuration
    based on host domain, header, or query param.
    """
    return tenant


@router.get("/by-slug/{slug}", response_model=SchoolPublicOut)
def get_school_by_slug(slug: str, db: Session = Depends(get_db)):
    """
    Explicitly fetch a school's public website config by slug.
    """
    school = db.query(School).filter(School.slug == slug, School.is_active == True).first()
    if not school:
        raise HTTPException(status_code=404, detail=f"School with slug '{slug}' not found")
    return school


@router.get("/list", response_model=List[SchoolPublicOut])
def list_available_schools(db: Session = Depends(get_db)):
    """
    List all active schools on the platform (for SaaS landing & switchers).
    """
    schools = db.query(School).filter(School.is_active == True).all()
    return schools
