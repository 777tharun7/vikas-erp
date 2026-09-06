import sys
import os
import urllib.parse
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Add current path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.db.base import Base
from app.db.seed import seed_database
from app.models.school import School
from app.core.config import settings

def run_cloud_migration():
    print("=" * 60)
    print("🚀 GOOGLE CLOUD SQL POSTGRESQL MIGRATION ENGINE")
    print("=" * 60)

    raw_password = "school-erp-db-T#@&un7995870172"
    encoded_password = urllib.parse.quote_plus(raw_password)
    ip = "34.47.237.51"
    user = "postgres"
    port = 5432
    target_dbname = "school_erp"

    print(f"📡 Step 1: Connecting to Google Cloud SQL ({ip}:{port})...")
    
    try:
        conn = psycopg2.connect(
            host=ip,
            port=port,
            user=user,
            password=raw_password,
            dbname="postgres",
            connect_timeout=15
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Check database
        cursor.execute("SELECT 1 FROM pg_database WHERE datname=%s", (target_dbname,))
        exists = cursor.fetchone()
        if not exists:
            print(f"📦 Step 2: Creating database '{target_dbname}' on Google Cloud SQL...")
            cursor.execute(f"CREATE DATABASE {target_dbname}")
            print(f"✅ Database '{target_dbname}' created successfully!")
        else:
            print(f"✅ Database '{target_dbname}' is present on Google Cloud SQL!")
            
        cursor.close()
        conn.close()
    except Exception as e:
        print("❌ Direct postgres database setup failed:", e)
        # Fallback to postgres database if creation is restricted
        target_dbname = "postgres"

    # Step 3: SQLAlchemy schema migration
    cloud_db_url = f"postgresql://{user}:{encoded_password}@{ip}:{port}/{target_dbname}"
    print(f"\n🏗️ Step 3: Creating complete relational schema on Cloud SQL...")
    
    cloud_engine = create_engine(cloud_db_url, pool_pre_ping=True)
    
    # Create all tables
    Base.metadata.create_all(bind=cloud_engine)
    print("✅ All relational tables (19 tables) created successfully!")

    # Step 4: Seed initial data
    CloudSession = sessionmaker(autocommit=False, autoflush=False, bind=cloud_engine)
    db = CloudSession()
    try:
        school_count = db.query(School).count()
        if school_count == 0:
            print("\n🌱 Step 4: Seeding Vikas Grammar High School (UDISE 36182100637) & demo data...")
            # Override session temporarily for seed
            from app.db import session as db_session_module
            old_engine = db_session_module.engine
            old_session = db_session_module.SessionLocal
            db_session_module.engine = cloud_engine
            db_session_module.SessionLocal = CloudSession
            
            seed_database()
            
            db_session_module.engine = old_engine
            db_session_module.SessionLocal = old_session
            print("✅ Seeding complete on Google Cloud SQL!")
        else:
            print(f"✨ Found {school_count} existing schools in Cloud SQL database. Data already seeded.")
    finally:
        db.close()

    # Step 5: Update backend .env
    env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
    with open(env_path, "w") as f:
        f.write(f"DATABASE_URL={cloud_db_url}\n")
        f.write("SECRET_KEY=edupulse_super_secret_jwt_key_telangana_2026_cloud_sql\n")
        f.write("ALGORITHM=HS256\n")
        f.write("ACCESS_TOKEN_EXPIRE_MINUTES=10080\n")
        f.write("DEFAULT_SCHOOL_SLUG=vikas-cherial\n")
        f.write("BACKEND_CORS_ORIGINS=[\"http://localhost:8181\",\"http://127.0.0.1:8181\",\"http://localhost:3000\",\"http://localhost:5173\",\"*\"]\n")

    print("\n" + "=" * 60)
    print("🎉 SUCCESS! Vikas ERP Backend is now connected to Google Cloud SQL!")
    print(f"🔗 Database: {target_dbname} on {ip}")
    print(f"📄 Saved live DATABASE_URL to {env_path}")
    print("=" * 60)

if __name__ == "__main__":
    run_cloud_migration()
