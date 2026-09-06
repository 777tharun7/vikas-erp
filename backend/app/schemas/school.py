from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class SchoolConfigOut(BaseModel):
    logo_url: Optional[str] = None
    favicon_url: Optional[str] = None
    primary_color: str = "#4f46e5"
    secondary_color: str = "#06b6d4"
    accent_color: str = "#10b981"
    motto: Optional[str] = None
    slogan: Optional[str] = None
    hero_title: Optional[str] = None
    hero_subtitle: Optional[str] = None
    hero_image_url: Optional[str] = None
    about_text: Optional[str] = None
    features: List[Dict[str, Any]] = []
    statistics: Dict[str, Any] = {}
    enabled_modules: List[str] = []
    social_links: Dict[str, Any] = {}

class SchoolPublicOut(BaseModel):
    id: int
    slug: str
    name: str
    code: str
    udise_code: Optional[str] = None
    affiliation: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    district: Optional[str] = None
    state: str = "Telangana"
    phone: Optional[str] = None
    email: Optional[str] = None
    principal_name: Optional[str] = None
    academic_year: str = "2026-2027"
    config: Optional[SchoolConfigOut] = None

    class Config:
        from_attributes = True
