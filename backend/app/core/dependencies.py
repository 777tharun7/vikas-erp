from fastapi import Depends, HTTPException, status, Header, Request, Query
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import Optional, List
import jwt

from app.db.session import get_db
from app.core.config import settings
from app.core.security import decode_access_token
from app.models.school import School, DomainMapping
from app.models.user import User

security = HTTPBearer(auto_error=False)

def get_current_tenant(
    request: Request,
    db: Session = Depends(get_db),
    x_school_slug: Optional[str] = Header(None, alias="X-School-Slug"),
    school_param: Optional[str] = Query(None, alias="school")
) -> School:
    """
    Multi-tenant resolver:
    1. Check ?school= query parameter (for direct links)
    2. Check X-School-Slug header (from API client)
    3. Check incoming Host domain against domain_mappings table
    4. Fallback to default school slug (vikas-cherial)
    """
    slug = school_param or x_school_slug

    if not slug:
        # Check host domain
        host = request.headers.get("host", "").split(":")[0].lower()
        if host and host not in ["localhost", "127.0.0.1", "0.0.0.0"]:
            domain_map = db.query(DomainMapping).filter(DomainMapping.domain == host).first()
            if domain_map:
                school = db.query(School).filter(School.id == domain_map.school_id, School.is_active == True).first()
                if school:
                    return school

    # Query by slug
    target_slug = slug or settings.DEFAULT_SCHOOL_SLUG
    school = db.query(School).filter(School.slug == target_slug, School.is_active == True).first()
    
    if not school:
        # Fallback to first active school
        school = db.query(School).filter(School.is_active == True).first()
        
    if not school:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="School tenant not found or inactive"
        )
    return school


def get_current_user(
    auth_header: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    if not auth_header or not auth_header.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = auth_header.credentials
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user_id = payload.get("sub")
    school_id = payload.get("school_id")
    
    if not user_id or not school_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token payload malformed",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = db.query(User).filter(
        User.id == int(user_id),
        User.school_id == int(school_id),
        User.is_active == True
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found, inactive, or unauthorized for this tenant",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


class RoleChecker:
    def __init__(self, allowed_roles: List[str]):
        self.allowed_roles = [r.lower() for r in allowed_roles]

    def __call__(self, current_user: User = Depends(get_current_user)) -> User:
        if current_user.is_superuser:
            return current_user
            
        if current_user.role.lower() not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access forbidden: requires one of roles [{', '.join(self.allowed_roles)}]. Your role is '{current_user.role}'."
            )
        return current_user

def require_role(roles: List[str]):
    return RoleChecker(roles)
