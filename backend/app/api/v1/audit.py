from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.session import get_db
from app.core.dependencies import get_current_user, require_role
from app.models.user import User, AuditLog

router = APIRouter(prefix="/audit-logs", tags=["Audit & Security"])

@router.get("")
def list_audit_logs(
    limit: int = Query(50, le=200),
    current_user: User = Depends(require_role(["principal", "admin"])),
    db: Session = Depends(get_db)
):
    """
    List security and audit events for current school tenant.
    """
    logs = db.query(AuditLog).filter(
        AuditLog.school_id == current_user.school_id
    ).order_by(AuditLog.created_at.desc()).limit(limit).all()

    return [{
        "id": l.id,
        "action": l.action,
        "entity_type": l.entity_type,
        "entity_id": l.entity_id,
        "description": l.description,
        "timestamp": l.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        "user_id": l.user_id
    } for l in logs]
