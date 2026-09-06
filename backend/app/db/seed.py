import os
import sys
from datetime import datetime, date
from sqlalchemy.orm import Session

from app.db.base import Base
from app.db.session import engine, SessionLocal
from app.core.security import get_password_hash
from app.models.school import School, SchoolConfig, DomainMapping
from app.models.user import User, AuditLog
from app.models.academic import ClassGrade, Section, Subject, Teacher
from app.models.student import Student, Parent, StudentParent
from app.models.fee import StudentFeeAccount, FeeInstallment, FeePayment
from app.models.admission import AdmissionInquiry
from app.models.leave import LeaveRequest
from app.models.communication import Notification, Announcement, StudentTeacherFeedback

def seed_database():
    print("🌱 Initializing Database Tables...")
    Base.metadata.create_all(bind=engine)
    
    db: Session = SessionLocal()
    try:
        # Check if already seeded
        if db.query(School).count() > 0:
            print("✨ Database already seeded with schools. Skipping initial seed.")
            return

        print("🚀 Seeding 3 Multi-Tenant Schools & Users...")

        # =========================================================================
        # SCHOOL 1: Vikas Grammar High School (Cherial)
        # =========================================================================
        school_1 = School(
            slug="vikas-cherial",
            name="Vikas Grammar High School",
            code="VG-HYD-001",
            udise_code="36182100637",
            affiliation="TS State Board & SCERT English Medium Recognized",
            address="Near Bus Stand, Main Road, Cherial",
            city="Cherial",
            district="Siddipet District",
            state="Telangana",
            pincode="506223",
            phone="+91 94402 81898",
            email="contact@vikasgrammar.edu.in",
            principal_name="K. Rajesham (M.Sc, B.Ed)",
            academic_year="2026-2027"
        )
        db.add(school_1)
        db.flush()

        # Config
        config_1 = SchoolConfig(
            school_id=school_1.id,
            primary_color="#4f46e5",
            secondary_color="#06b6d4",
            accent_color="#10b981",
            motto="Education for Global Excellence & Moral Character",
            slogan="Empowering Telangana's Future Generations Since 1998",
            hero_title="Empowering Young Minds for a Brighter Future",
            hero_subtitle="Affiliated to Telangana State Board. Fostering academic excellence, scientific curiosity, Beti Padhao scholarships, and deep cultural values in Cherial.",
            features=[
                {"title": "100% SSC Pass Track Record", "desc": "Consecutive GPA 10.0 ranks in Telangana State Board exams.", "icon": "award"},
                {"title": "Beti Padhao Empowerment", "desc": "100% girl-child fee waiver & STEM scholarship program.", "icon": "heart"},
                {"title": "STEM Robotics Lab", "desc": "Equipped with hands-on IoT, physics, and computer kits.", "icon": "cpu"}
            ],
            statistics={"students": 1250, "teachers": 84, "passPct": "100%", "labs": 6}
        )
        db.add(config_1)

        # Domain Mapping
        domain_1 = DomainMapping(domain="vikasgrammar.edu.in", school_id=school_1.id, is_primary=True)
        domain_1b = DomainMapping(domain="school-a.com", school_id=school_1.id, is_primary=False)
        db.add_all([domain_1, domain_1b])

        # Users for School 1
        u_p1 = User(
            school_id=school_1.id,
            email="principal@vikas.edu.in",
            hashed_password=get_password_hash("vikas#admin26"),
            full_name="K. Rajesham",
            phone="+91 94402 81898",
            role="principal"
        )
        u_t1 = User(
            school_id=school_1.id,
            email="teacher@vikas.edu.in",
            hashed_password=get_password_hash("teacher#vikas26"),
            full_name="Mrs. S. Radhika",
            phone="+91 98480 22334",
            role="teacher"
        )
        u_s1 = User(
            school_id=school_1.id,
            email="student@vikas.edu.in",
            hashed_password=get_password_hash("student#vikas26"),
            full_name="Rahul Reddy",
            phone="+91 98491 55667",
            role="student"
        )
        u_par1 = User(
            school_id=school_1.id,
            email="parent@vikas.edu.in",
            hashed_password=get_password_hash("parent#vikas26"),
            full_name="Mr. K. Narayana Reddy",
            phone="+91 98491 55667",
            role="parent"
        )
        db.add_all([u_p1, u_t1, u_s1, u_par1])
        db.flush()

        # Academic structure
        c8 = ClassGrade(school_id=school_1.id, name="Class VIII", code="VIII", numeric_order=8)
        db.add(c8)
        db.flush()
        sec8a = Section(school_id=school_1.id, class_id=c8.id, name="A", room_number="Room 204")
        db.add(sec8a)
        db.flush()

        t1 = Teacher(
            school_id=school_1.id,
            user_id=u_t1.id,
            emp_code="EMP-VG-002",
            designation="Senior Mathematics Lead",
            primary_subject="Mathematics",
            is_class_mentor=True,
            mentor_class_name="Class VIII Section A",
            monthly_salary=42000.0,
            bank_account="SBI Cherial A/C ****9102"
        )
        db.add(t1)

        s1 = Student(
            school_id=school_1.id,
            user_id=u_s1.id,
            section_id=sec8a.id,
            roll_no="2026-VIII-014",
            admission_no="ADM-VG-2024-089",
            udise_pen="PEN-TS-2026-88192",
            grade_level="Class VIII",
            section_name="A",
            dob="2012-04-18",
            gender="Male",
            bus_route="Route #2 (Cherial Main Bus Stand ➔ School)",
            attendance_pct=94.5,
            academic_avg_pct=86.0,
            rank_in_class=3
        )
        db.add(s1)
        db.flush()

        par1 = Parent(school_id=school_1.id, user_id=u_par1.id, occupation="Agriculture & Business")
        db.add(par1)
        db.flush()
        db.add(StudentParent(school_id=school_1.id, student_id=s1.id, parent_id=par1.id))

        # Fee account
        fee_1 = StudentFeeAccount(
            school_id=school_1.id,
            student_id=s1.id,
            total_annual_fee=24000.0,
            paid_amount=20500.0,
            due_amount=3500.0,
            status="Pending Term 3"
        )
        db.add(fee_1)
        db.flush()

        db.add_all([
            FeeInstallment(school_id=school_1.id, fee_account_id=fee_1.id, term_name="Term 1 Admission & Book Fee", due_date="2026-06-15", total_amount=10000.0, paid_amount=10000.0, status="Paid", receipt_no="REC-VG-2026-104", paid_date="Jun 12, 2026"),
            FeeInstallment(school_id=school_1.id, fee_account_id=fee_1.id, term_name="Term 2 Mid-Term Tuition Fee", due_date="2026-08-30", total_amount=10500.0, paid_amount=10500.0, status="Paid", receipt_no="REC-VG-2026-188", paid_date="Aug 28, 2026"),
            FeeInstallment(school_id=school_1.id, fee_account_id=fee_1.id, term_name="Term 3 Final Tuition & Board Fee", due_date="2026-09-30", total_amount=3500.0, paid_amount=0.0, status="Pending")
        ])

        # Admissions Inquiries
        db.add_all([
            AdmissionInquiry(school_id=school_1.id, inquiry_no="ADM-INQ-2026-081", student_name="K. Sai Charan", parent_name="K. Ramesh", phone="+91 98490 11223", grade_applied="Class VIII", village_locality="Cherial Town", status="Inquiry Received"),
            AdmissionInquiry(school_id=school_1.id, inquiry_no="ADM-INQ-2026-082", student_name="M. Deepthi", parent_name="M. Venkat", phone="+91 94411 33445", grade_applied="Class IX", village_locality="Kompalle", status="Campus Visit Scheduled"),
            AdmissionInquiry(school_id=school_1.id, inquiry_no="ADM-INQ-2026-083", student_name="P. Tarun Kumar", parent_name="P. Srinivas", phone="+91 98765 43210", grade_applied="Class X", village_locality="Dommata", status="Documents Verified")
        ])

        # Leave Requests
        db.add(LeaveRequest(
            school_id=school_1.id,
            student_id=s1.id,
            leave_type="Medical Leave",
            from_date="Sep 02, 2026",
            to_date="Sep 03, 2026",
            days_count=2,
            reason="Viral fever and doctor-advised bed rest.",
            applied_by="Parent (Mr. K. Narayana Reddy)",
            status="Pending Review"
        ))

        # Announcements
        db.add(Announcement(
            school_id=school_1.id,
            title="Formative Assessment 2 (FA-2) Time Table Released",
            content="FA-2 examinations for Classes VI to X will commence on September 15, 2026. Hall tickets available on the portal.",
            category="Exam"
        ))


        # =========================================================================
        # SCHOOL 2: Pratibha Vidyalaya High School (Jangaon)
        # =========================================================================
        school_2 = School(
            slug="pratibha-jangaon",
            name="Pratibha Vidyalaya High School",
            code="PV-JNG-002",
            udise_code="36182200412",
            affiliation="Telangana SCERT Recognized English & Telugu Medium",
            address="Station Road, Near Nehru Park, Jangaon",
            city="Jangaon",
            district="Jangaon District",
            state="Telangana",
            pincode="506167",
            phone="+91 98481 77221",
            email="office@pratibhavidyalaya.edu.in",
            principal_name="P. Srinivas Rao (M.A, M.Ed)",
            academic_year="2026-2027"
        )
        db.add(school_2)
        db.flush()

        config_2 = SchoolConfig(
            school_id=school_2.id,
            primary_color="#0284c7",
            secondary_color="#0d9488",
            accent_color="#f59e0b",
            motto="Knowledge, Discipline & Civic Leadership",
            slogan="Premier Quality Schooling in Jangaon Town",
            hero_title="Nurturing Brilliance, Inspiring Leadership",
            hero_subtitle="State-of-the-art computer labs, digital smart classrooms, and dedicated sports coaching in Jangaon.",
            features=[
                {"title": "Smart Digital Classrooms", "desc": "Interactive smartboards in every classroom.", "icon": "monitor"},
                {"title": "Athletics & Sports Complex", "desc": "District champions in Volleyball & Athletics.", "icon": "trophy"}
            ],
            statistics={"students": 850, "teachers": 52, "passPct": "99.4%", "labs": 4}
        )
        db.add(config_2)
        db.add(DomainMapping(domain="school-b.com", school_id=school_2.id, is_primary=False))

        # Users for School 2
        u_p2 = User(school_id=school_2.id, email="principal@pratibha.edu.in", hashed_password=get_password_hash("pratibha#admin26"), full_name="P. Srinivas Rao", phone="+91 98481 77221", role="principal")
        u_t2 = User(school_id=school_2.id, email="teacher@pratibha.edu.in", hashed_password=get_password_hash("teacher#pratibha26"), full_name="Mr. V. Ravi Kumar", phone="+91 98482 33441", role="teacher")
        u_s2 = User(school_id=school_2.id, email="student@pratibha.edu.in", hashed_password=get_password_hash("student#pratibha26"), full_name="Priya Sharma", phone="+91 98483 44552", role="student")
        u_par2 = User(school_id=school_2.id, email="parent@pratibha.edu.in", hashed_password=get_password_hash("parent#pratibha26"), full_name="Mrs. Shailaja Sharma", phone="+91 98483 44552", role="parent")
        db.add_all([u_p2, u_t2, u_s2, u_par2])
        db.flush()

        s2 = Student(
            school_id=school_2.id,
            user_id=u_s2.id,
            roll_no="2026-VIII-008",
            admission_no="ADM-PV-2025-042",
            udise_pen="PEN-TS-2026-55410",
            grade_level="Class VIII",
            section_name="A",
            attendance_pct=96.0,
            academic_avg_pct=91.0,
            rank_in_class=1
        )
        db.add(s2)
        db.flush()

        db.add(StudentFeeAccount(
            school_id=school_2.id,
            student_id=s2.id,
            total_annual_fee=22000.0,
            paid_amount=22000.0,
            due_amount=0.0,
            status="Fully Paid"
        ))


        # =========================================================================
        # SCHOOL 3: St. Mary's English Medium High School (Siddipet)
        # =========================================================================
        school_3 = School(
            slug="stmarys-siddipet",
            name="St. Mary's English Medium High School",
            code="SM-SDP-003",
            udise_code="36181900188",
            affiliation="CBSE & State Board Integrated Syllabus",
            address="Collectorate Road, Prashanth Nagar, Siddipet",
            city="Siddipet",
            district="Siddipet District",
            state="Telangana",
            pincode="502103",
            phone="+91 94405 66778",
            email="admissions@stmaryssiddipet.edu.in",
            principal_name="Sister Mary Teresa (M.Sc, M.Ed)",
            academic_year="2026-2027"
        )
        db.add(school_3)
        db.flush()

        config_3 = SchoolConfig(
            school_id=school_3.id,
            primary_color="#7c3aed",
            secondary_color="#db2777",
            accent_color="#10b981",
            motto="Virtue, Truth & Academic Brilliance",
            slogan="Leading Catholic Educational Institution in Siddipet",
            hero_title="Excellence in Holistic Education & Values",
            hero_subtitle="Modern campus spread across 5 acres with Olympic-standard sports grounds, AI science club, and modern auditorium.",
            features=[
                {"title": "CBSE Olympiad Training", "desc": "Integrated coaching for national talent search & maths olympiad.", "icon": "book"},
                {"title": "Language & Arts Wing", "desc": "Dedicated Telugu, Hindi, English debate & fine arts club.", "icon": "mic"}
            ],
            statistics={"students": 2100, "teachers": 126, "passPct": "100%", "labs": 8}
        )
        db.add(config_3)
        db.add(DomainMapping(domain="school-c.com", school_id=school_3.id, is_primary=False))

        # Users for School 3
        u_p3 = User(school_id=school_3.id, email="principal@stmarys.edu.in", hashed_password=get_password_hash("stmarys#admin26"), full_name="Sister Mary Teresa", phone="+91 94405 66778", role="principal")
        u_t3 = User(school_id=school_3.id, email="teacher@stmarys.edu.in", hashed_password=get_password_hash("teacher#stmarys26"), full_name="Mr. D. Joseph", phone="+91 94406 11229", role="teacher")
        u_s3 = User(school_id=school_3.id, email="student@stmarys.edu.in", hashed_password=get_password_hash("student#stmarys26"), full_name="Arjun Varma", phone="+91 94407 88990", role="student")
        u_par3 = User(school_id=school_3.id, email="parent@stmarys.edu.in", hashed_password=get_password_hash("parent#stmarys26"), full_name="Mr. Bhupal Varma", phone="+91 94407 88990", role="parent")
        db.add_all([u_p3, u_t3, u_s3, u_par3])
        db.flush()

        s3 = Student(
            school_id=school_3.id,
            user_id=u_s3.id,
            roll_no="2026-X-022",
            admission_no="ADM-SM-2023-019",
            udise_pen="PEN-TS-2026-10982",
            grade_level="Class X",
            section_name="A",
            attendance_pct=97.2,
            academic_avg_pct=93.5,
            rank_in_class=2
        )
        db.add(s3)
        db.flush()

        db.add(StudentFeeAccount(
            school_id=school_3.id,
            student_id=s3.id,
            total_annual_fee=32000.0,
            paid_amount=24000.0,
            due_amount=8000.0,
            status="Pending Term 3"
        ))

        db.commit()
        print("✅ Successfully seeded 3 schools with full multi-tenant records!")

    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
