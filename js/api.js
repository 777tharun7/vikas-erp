/**
 * EduPulse Multi-Tenant REST API Client
 * Connects frontend website and ERP portals to centralized FastAPI backend.
 */

(function () {
  const API_BASE_URL = window.EDUPULSE_API_URL || "https://vikas-erp-backend-dsrsw45gba-el.a.run.app/api/v1";
  const TOKEN_KEY = "edupulse_jwt_token";
  const CURRENT_SCHOOL_KEY = "edupulse_active_school_slug";

  class EduPulseApiClient {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
      this.activeSlug = localStorage.getItem(CURRENT_SCHOOL_KEY) || "vikas-cherial";
      this.token = sessionStorage.getItem(TOKEN_KEY) || null;
      this.isOnline = false;
    }

    setToken(token) {
      this.token = token;
      if (token) {
        sessionStorage.setItem(TOKEN_KEY, token);
      } else {
        sessionStorage.removeItem(TOKEN_KEY);
      }
    }

    setSchoolSlug(slug) {
      this.activeSlug = slug;
      localStorage.setItem(CURRENT_SCHOOL_KEY, slug);
    }

    getHeaders(extraHeaders = {}) {
      const headers = {
        "Content-Type": "application/json",
        "X-School-Slug": this.activeSlug,
        ...extraHeaders
      };
      if (this.token) {
        headers["Authorization"] = `Bearer ${this.token}`;
      }
      return headers;
    }

    async request(endpoint, options = {}) {
      const url = `${this.baseUrl}${endpoint}`;
      const config = {
        ...options,
        headers: this.getHeaders(options.headers || {})
      };

      try {
        const response = await fetch(url, config);
        this.isOnline = true;
        if (!response.ok) {
          const errData = await response.json().catch(() => ({ detail: response.statusText }));
          throw new Error(errData.detail || `HTTP Error ${response.status}`);
        }
        return await response.json();
      } catch (err) {
        console.warn(`[EduPulse API] Request to ${endpoint} failed:`, err.message);
        throw err;
      }
    }

    async checkHealth() {
      try {
        const res = await fetch(`${this.baseUrl.replace('/api/v1', '')}/health`, { method: 'GET' });
        this.isOnline = res.ok;
        return this.isOnline;
      } catch (e) {
        this.isOnline = false;
        return false;
      }
    }

    // --- Authentication ---
    async login(email, password, schoolSlug = null) {
      const slug = schoolSlug || this.activeSlug;
      const res = await this.request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password, school_slug: slug })
      });
      if (res.access_token) {
        this.setToken(res.access_token);
        this.setSchoolSlug(res.school.slug);
      }
      return res;
    }

    async getProfile() {
      return await this.request("/auth/me");
    }

    logout() {
      this.setToken(null);
    }

    // --- School Branding ---
    async getSchoolConfig(slug = null) {
      const s = slug || this.activeSlug;
      return await this.request(`/schools/by-slug/${s}`);
    }

    async listSchools() {
      return await this.request("/schools/list");
    }

    // --- Dashboard ---
    async getDashboardStats() {
      return await this.request("/dashboard/stats");
    }

    // --- Students & Teachers ---
    async getStudents(grade = null, search = null) {
      let query = "";
      const params = new URLSearchParams();
      if (grade) params.append("grade", grade);
      if (search) params.append("search", search);
      if (params.toString()) query = `?${params.toString()}`;
      return await this.request(`/students${query}`);
    }

    async getTeachers() {
      return await this.request("/teachers");
    }

    // --- Fees ---
    async getMyFeeAccount() {
      return await this.request("/fees/my-account");
    }

    async payFee(amount, paymentMode = "Online UPI Gateway") {
      return await this.request("/fees/pay", {
        method: "POST",
        body: JSON.stringify({ amount, payment_mode: paymentMode })
      });
    }

    async getFeeLedger() {
      return await this.request("/fees/ledger");
    }

    // --- Admissions ---
    async submitInquiry(inquiryData) {
      return await this.request(`/admissions/inquire?school=${this.activeSlug}`, {
        method: "POST",
        body: JSON.stringify(inquiryData)
      });
    }

    async getInquiries() {
      return await this.request("/admissions/inquiries");
    }

    async enrollLead(enrollData) {
      return await this.request("/admissions/enroll", {
        method: "POST",
        body: JSON.stringify(enrollData)
      });
    }

    // --- Leaves ---
    async applyLeave(leaveData) {
      return await this.request("/leaves/apply", {
        method: "POST",
        body: JSON.stringify(leaveData)
      });
    }

    async getLeaves() {
      return await this.request("/leaves");
    }

    async updateLeaveStatus(leaveId, newStatus, note = "") {
      return await this.request(`/leaves/${leaveId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus, review_note: note })
      });
    }

    // --- Audit Logs ---
    async getAuditLogs(limit = 50) {
      return await this.request(`/audit-logs?limit=${limit}`);
    }
  }

  // Export globally
  window.EduPulseAPI = new EduPulseApiClient(API_BASE_URL);

  // Auto-detect URL parameter for school switching (e.g. ?school=pratibha-jangaon)
  const urlParams = new URLSearchParams(window.location.search);
  const schoolParam = urlParams.get('school');
  if (schoolParam) {
    window.EduPulseAPI.setSchoolSlug(schoolParam);
  }

  // Background health check
  window.EduPulseAPI.checkHealth().then(online => {
    console.log(`[EduPulse OS] Central Multi-Tenant Backend is ${online ? 'ONLINE 🟢 (FastAPI Live)' : 'STANDALONE 🟡 (Client-Store Active)'}`);
  });
})();
