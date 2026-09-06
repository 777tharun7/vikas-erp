import os
import sys
import unittest
from fastapi.testclient import TestClient

# Add backend to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.main import app
from app.db.seed import seed_database

class TestMultiTenantIsolation(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        seed_database()
        cls.client = TestClient(app)

    def test_01_public_school_configs_differ(self):
        """Verify each school returns independent branding and theme configuration."""
        # School A (Vikas Grammar)
        res_a = self.client.get("/api/v1/schools/by-slug/vikas-cherial")
        self.assertEqual(res_a.status_code, 200)
        data_a = res_a.json()
        self.assertEqual(data_a["name"], "Vikas Grammar High School")
        self.assertEqual(data_a["udise_code"], "36182100637")
        self.assertEqual(data_a["config"]["primary_color"], "#4f46e5")

        # School B (Pratibha Vidyalaya)
        res_b = self.client.get("/api/v1/schools/by-slug/pratibha-jangaon")
        self.assertEqual(res_b.status_code, 200)
        data_b = res_b.json()
        self.assertEqual(data_b["name"], "Pratibha Vidyalaya High School")
        self.assertEqual(data_b["udise_code"], "36182200412")
        self.assertEqual(data_b["config"]["primary_color"], "#0284c7")

        # School C (St. Mary's)
        res_c = self.client.get("/api/v1/schools/by-slug/stmarys-siddipet")
        self.assertEqual(res_c.status_code, 200)
        data_c = res_c.json()
        self.assertEqual(data_c["name"], "St. Mary's English Medium High School")
        self.assertEqual(data_c["config"]["primary_color"], "#7c3aed")

    def test_02_principal_authentication_and_tenant_token(self):
        """Verify authenticating as School A Principal issues a token bound to School A."""
        res = self.client.post("/api/v1/auth/login", json={
            "email": "principal@vikas.edu.in",
            "password": "vikas#admin26",
            "school_slug": "vikas-cherial"
        })
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIn("access_token", data)
        self.assertEqual(data["user"]["role"], "principal")
        self.assertEqual(data["school"]["slug"], "vikas-cherial")

    def test_03_student_data_isolation(self):
        """Verify School A Principal CANNOT see School B students."""
        # 1. Login as School A
        res_a = self.client.post("/api/v1/auth/login", json={
            "email": "principal@vikas.edu.in",
            "password": "vikas#admin26",
            "school_slug": "vikas-cherial"
        })
        token_a = res_a.json()["access_token"]
        headers_a = {"Authorization": f"Bearer {token_a}"}

        # 2. Get students with School A Token
        students_a = self.client.get("/api/v1/students", headers=headers_a).json()
        student_names_a = [s["full_name"] for s in students_a]
        
        self.assertIn("Rahul Reddy", student_names_a)
        self.assertNotIn("Priya Sharma", student_names_a) # School B student
        self.assertNotIn("Arjun Varma", student_names_a)  # School C student

        # 3. Login as School B
        res_b = self.client.post("/api/v1/auth/login", json={
            "email": "principal@pratibha.edu.in",
            "password": "pratibha#admin26",
            "school_slug": "pratibha-jangaon"
        })
        token_b = res_b.json()["access_token"]
        headers_b = {"Authorization": f"Bearer {token_b}"}

        # 4. Get students with School B Token
        students_b = self.client.get("/api/v1/students", headers=headers_b).json()
        student_names_b = [s["full_name"] for s in students_b]
        
        self.assertIn("Priya Sharma", student_names_b)
        self.assertNotIn("Rahul Reddy", student_names_b) # School A student

    def test_04_fee_payment_and_reconciliation(self):
        """Verify Student Fee payment updates student balance in real-time."""
        # Login as School A Student
        res = self.client.post("/api/v1/auth/login", json={
            "email": "student@vikas.edu.in",
            "password": "student#vikas26",
            "school_slug": "vikas-cherial"
        })
        token = res.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # Check account
        acc = self.client.get("/api/v1/fees/my-account", headers=headers).json()
        initial_due = acc["due_amount"]

        if initial_due > 0:
            # Pay fee
            pay_res = self.client.post("/api/v1/fees/pay", json={
                "amount": initial_due,
                "payment_mode": "Online UPI Gateway"
            }, headers=headers)
            self.assertEqual(pay_res.status_code, 200)
            
            # Check updated balance
            updated_acc = self.client.get("/api/v1/fees/my-account", headers=headers).json()
            self.assertEqual(updated_acc["due_amount"], 0.0)
            self.assertEqual(updated_acc["status"], "Fully Paid")

    def test_05_admissions_to_enrollment_pipeline(self):
        """Verify public inquiry submission and Principal one-click enrollment into directory."""
        # 1. Public user submits inquiry for School A
        inq_res = self.client.post("/api/v1/admissions/inquire?school=vikas-cherial", json={
            "student_name": "K. Harish Reddy",
            "parent_name": "K. Mallaiah",
            "phone": "+91 99887 76655",
            "grade_applied": "Class VIII",
            "village_locality": "Cherial Town"
        })
        self.assertEqual(inq_res.status_code, 200)
        inquiry = inq_res.json()
        inquiry_id = inquiry["id"]

        # 2. Login as School A Principal
        res_a = self.client.post("/api/v1/auth/login", json={
            "email": "principal@vikas.edu.in",
            "password": "vikas#admin26",
            "school_slug": "vikas-cherial"
        })
        token_a = res_a.json()["access_token"]
        headers_a = {"Authorization": f"Bearer {token_a}"}

        # 3. Principal enrolls lead
        enroll_res = self.client.post("/api/v1/admissions/enroll", json={
            "inquiry_id": inquiry_id,
            "grade": "Class VIII",
            "section": "A",
            "annual_fee": 24000.0
        }, headers=headers_a)
        self.assertEqual(enroll_res.status_code, 200)
        enroll_data = enroll_res.json()
        self.assertIn("PEN-TS", enroll_data["student"]["udise_pen"])

        # 4. Verify student is now in School A student directory
        students = self.client.get("/api/v1/students", headers=headers_a).json()
        names = [s["full_name"] for s in students]
        self.assertIn("K. Harish Reddy", names)

    def test_06_leave_application_and_approval(self):
        """Verify Student submits leave -> Teacher approves -> status changes to Accepted."""
        # 1. Student applies for leave
        res_s = self.client.post("/api/v1/auth/login", json={
            "email": "student@vikas.edu.in",
            "password": "student#vikas26",
            "school_slug": "vikas-cherial"
        })
        token_s = res_s.json()["access_token"]
        headers_s = {"Authorization": f"Bearer {token_s}"}

        apply_res = self.client.post("/api/v1/leaves/apply", json={
            "leave_type": "Medical Leave",
            "from_date": "Sep 10, 2026",
            "to_date": "Sep 11, 2026",
            "days_count": 2,
            "reason": "Dental surgery appointment."
        }, headers=headers_s)
        self.assertEqual(apply_res.status_code, 200)
        leave_id = apply_res.json()["id"]

        # 2. Teacher logs in and approves leave
        res_t = self.client.post("/api/v1/auth/login", json={
            "email": "teacher@vikas.edu.in",
            "password": "teacher#vikas26",
            "school_slug": "vikas-cherial"
        })
        token_t = res_t.json()["access_token"]
        headers_t = {"Authorization": f"Bearer {token_t}"}

        approve_res = self.client.patch(f"/api/v1/leaves/{leave_id}/status", json={
            "status": "Accepted",
            "review_note": "Approved by Class Mentor Mrs. S. Radhika"
        }, headers=headers_t)
        self.assertEqual(approve_res.status_code, 200)

        # 3. Student views leaves -> status is Accepted
        my_leaves = self.client.get("/api/v1/leaves", headers=headers_s).json()
        matching = [l for l in my_leaves if l["id"] == leave_id]
        self.assertEqual(len(matching), 1)
        self.assertEqual(matching[0]["status"], "Accepted")

if __name__ == "__main__":
    unittest.main()
