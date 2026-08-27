# 🏫 Vikas ERP — Vikas Grammar School HS Cherial

> **School Operating System & ERP Platform**
> **School Profile:** Vikas Grammar School HS Cherial (`UDISE Code: 36182100637`) • Cheriyal, Siddipet District, Telangana — 506223
> **Curriculum:** Board of Secondary Education, Telangana (BSE Telangana) • Classes 1 to 10 • Est. 2004
> **Demographics:** 832 Students, 19 Teachers/Staff, 20 Classrooms, 8 Desktop Computers, Digiboard Room, 3 School Bus Routes.

---

## 🌟 Key Highlights & Architectural Overview

Vikas ERP unifies school operations into one platform, with 4 role-based visual personalities toggleable from the top navbar:

1. 📊 **Principal / Management (Command Center):** enrollment, attendance, fee cashflow, and staffing overview; master timetable matrix; admissions funnel; UDISE data exports.
2. 👩‍🏫 **Teacher (Classroom Workspace):** attendance & grade entry, student leave approvals, salary/payslips, duty attendance record.
3. 🎮📚 **Student (Gamified Learning Portal):** homework tracker, fee breakdown, bus route & timings, leave request form.
4. 👨‍👩‍👧 **Parent (Info-First):** child attendance & performance, fee dues, messaging, online fee payment.

## 🏛️ Core ERP Domains

Admissions & lead engine • Student roster & bulk promotion • Academics & BSE Telangana curriculum tracking • Exams & marksheets • Attendance & leave engine • Fee collection ledger • Staff & HR payroll • Transport fleet • Library catalog • Holiday calendar • Master timetable matrix • AI assistant drawer.

---

## 📁 Project Directory Structure

```
erp/
├── index.html         # Main structural layout with role pills, sidebar, viewport & AI drawer
├── css/
│   └── styles.css      # Design system: sidebar, topbar, cards, tables, badges, both themes
├── js/
│   ├── data.js         # UDISE verified Vikas Grammar School dataset & role payloads
│   └── app.js          # Role switcher, interactive module router & state controller
└── README.md           # This file
```

**Important:** `index.html` references `css/styles.css`, `js/data.js`, and `js/app.js` by relative path — keep the `css/` and `js/` folders alongside `index.html` exactly as shown above, or the styling/scripts won't load.

---

## 🚀 How to Run Locally

1. Open your terminal in the project directory (adjust the path to wherever you saved the folder):
   ```bash
   cd "/path/to/erp"
   ```

2. Start a local dev server:
   ```bash
   python3 -m http.server 3000
   ```

3. Open your browser and navigate to:
   👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🏫 Verified School Base Info
- **School Name:** Vikas Grammar School HS Cherial
- **Location:** Cheriyal, Siddipet District, Telangana — 506223
- **UDISE Code:** `36182100637`
- **Headmaster:** K. Rajesham
- **Board:** Board of Secondary Education, Telangana (BSE Telangana)

## 🎨 v2 Redesign Notes
This version keeps all original data, roles, and screen logic identical to v1 — only the visual system changed:
- New color system (violet/indigo primary, refined neutrals) and softer, layered shadows.
- Redesigned sidebar, topbar, cards, tables, and notification panel.
- The AI Assistant drawer is now actually reachable (a bot icon in the top navbar opens it) and has a working demo chat interaction — previously the drawer existed in the HTML but had no styling and no way to open it.
- Fixed the `css/` and `js/` folder structure so the stylesheet and scripts always resolve correctly regardless of where the project folder is placed.
