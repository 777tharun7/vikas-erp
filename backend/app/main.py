from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import time

from app.core.config import settings
from app.db.base import Base
from app.db.session import engine
from app.db.seed import seed_database

# Routers
from app.api.v1.auth import router as auth_router
from app.api.v1.schools import router as schools_router
from app.api.v1.dashboard import router as dashboard_router
from app.api.v1.students import router as students_router
from app.api.v1.teachers import router as teachers_router
from app.api.v1.fees import router as fees_router
from app.api.v1.admissions import router as admissions_router
from app.api.v1.leaves import router as leaves_router
from app.api.v1.audit import router as audit_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Centralized Multi-Tenant School OS Backend powering independent school websites and ERPs.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event: Initialize database and seed if needed
@app.on_event("startup")
def on_startup():
    try:
        Base.metadata.create_all(bind=engine)
        seed_database()
        print("✅ Cloud SQL Database verified on startup.")
    except Exception as e:
        print("⚠️ Warning: Database initialization deferred:", e)

# Register API v1 Routers
api_v1 = FastAPI()
api_v1.include_router(auth_router)
api_v1.include_router(schools_router)
api_v1.include_router(dashboard_router)
api_v1.include_router(students_router)
api_v1.include_router(teachers_router)
api_v1.include_router(fees_router)
api_v1.include_router(admissions_router)
api_v1.include_router(leaves_router)
api_v1.include_router(audit_router)

app.mount(settings.API_V1_STR, api_v1)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "EduPulse Multi-Tenant School OS Backend",
        "version": "1.0.0",
        "documentation": "/docs",
        "api_v1": settings.API_V1_STR
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": time.time()}
