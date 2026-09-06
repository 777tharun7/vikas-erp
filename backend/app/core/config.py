from typing import List, Union
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl, field_validator
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    PROJECT_NAME: str = "EduPulse Multi-Tenant School OS Backend"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "edupulse_super_secret_jwt_key_telangana_2026_change_in_prod"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 Days

    # Database
    DATABASE_URL: str = "sqlite:///edupulse.db"

    # Default School Slug fallback
    DEFAULT_SCHOOL_SLUG: str = "vikas-cherial"

    class Config:
        case_sensitive = False
        extra = "allow"
        env_file = ".env"

settings = Settings()
