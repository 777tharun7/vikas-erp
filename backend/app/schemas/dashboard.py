from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class DashboardMetricsOut(BaseModel):
    role: str
    school_name: str
    stats: Dict[str, Any]
    quick_items: List[Dict[str, Any]] = []
    recent_activities: List[Dict[str, Any]] = []
    announcements: List[Dict[str, Any]] = []
