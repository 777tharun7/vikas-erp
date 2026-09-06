from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
from datetime import datetime

class LoginRequest(BaseModel):
    email: str
    password: str
    school_slug: Optional[str] = None # Optional: auto-detected from domain if absent

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]
    school: Dict[str, Any]

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    preferences: Optional[Dict[str, Any]] = None
