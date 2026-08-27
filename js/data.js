/* ==========================================================================
   EDUPULSE SCHOOL OS v4.0 — VIKAS GRAMMAR COMPREHENSIVE DATASET
   UDISE Code: 36182100637 | Siddipet, Telangana Academic Year 2026-2027
   Contains complete data for all 16 navigation views across 4 roles
   ========================================================================== */

const MOCK_DATA = {
  schoolInfo: {
    name: 'Vikas Grammar School HS Cherial',
    shortName: 'Vikas Grammar School',
    location: 'Cheriyal, Siddipet, Telangana — 506223',
    udise: '36182100637',
    headmaster: 'K. Rajesham',
    est: 2004,
    board: 'Board of Secondary Education, Telangana (BSE Telangana)',
    type: 'Private Unaided, Co-educational',
    medium: 'English'
  },

  // REGISTERED ACCOUNTS FOR EMAIL-BASED ROLE LOGIN
  registeredUsers: [
    {
      email: 'principal@vikas.edu.in',
      altEmail: 'rajesham@vikas.edu.in',
      role: 'principal',
      name: 'K. Rajesham',
      roleLabel: 'Principal / Headmaster',
      designation: 'Headmaster & School Administrator',
      badge: '👑 Principal Command Center',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      details: 'UDISE Admin • Vikas Grammar School HS Cherial'
    },
    {
      email: 'teacher@vikas.edu.in',
      altEmail: 'radhika@vikas.edu.in',
      role: 'teacher',
      name: 'Mrs. S. Radhika',
      roleLabel: 'Class Teacher (VIII A)',
      designation: 'Senior Mathematics Lead & Mentor',
      badge: '👩‍🏫 Teacher Workspace',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      details: 'EMP-VG-002 • Mathematics Department'
    },
    {
      email: 'student@vikas.edu.in',
      altEmail: 'rahul@vikas.edu.in',
      role: 'student',
      name: 'Rahul Reddy',
      roleLabel: 'Student (Class VIII A)',
      designation: 'Class VIII Section A Student',
      badge: '🎓 Gamified Student Portal',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
      details: 'Roll No: VIII-014 • PEN-36182100637-801'
    },
    {
      email: 'parent@vikas.edu.in',
      altEmail: 'vreddy@vikas.edu.in',
      role: 'parent',
      name: 'V. Reddy',
      roleLabel: 'Parent of Rahul Reddy',
      designation: 'Parent / Guardian',
      badge: '👨‍👩‍👧 Parent Info-First Portal',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      details: 'Parent ID: PRT-VG-101 • Contact: +91 98480 12345'
    }
  ],

  // 1. ADMISSIONS LEADS LIST
  admissionsLeadsList: [
    { id: 'adm_01', applicantName: 'S. Varun Tej', gradeApplied: 'Class VIII', parentName: 'S. Narsing Rao', phone: '+91 98481 11223', testScore: '92/100', status: 'Approved', statusClass: 'badge-success', date: 'Aug 20, 2026' },
    { id: 'adm_02', applicantName: 'M. Sravanthi', gradeApplied: 'Class V', parentName: 'M. Mallikarjun', phone: '+91 98481 22334', testScore: '85/100', status: 'Under Verification', statusClass: 'badge-warning', date: 'Aug 22, 2026' },
    { id: 'adm_03', applicantName: 'K. Nikhil Reddy', gradeApplied: 'Class I', parentName: 'K. Lingaiah', phone: '+91 98481 33445', testScore: '78/100', status: 'Test Scheduled', statusClass: 'badge-info', date: 'Aug 24, 2026' },
    { id: 'adm_04', applicantName: 'P. Kavya', gradeApplied: 'Class IX', parentName: 'P. Ravinder', phone: '+91 98481 44556', testScore: '88/100', status: 'Approved', statusClass: 'badge-success', date: 'Aug 25, 2026' }
  ],

  // CLASS-WISE INTEREST BREAKDOWN (MATCHING MOCKUP)
  classWiseInterestList: [
    { className: 'Class X', pct: 28, count: 40, color: '#6366f1' },
    { className: 'Class IX', pct: 24, count: 34, color: '#3b82f6' },
    { className: 'Class VIII', pct: 20, count: 28, color: '#10b981' },
    { className: 'Class VII', pct: 15, count: 21, color: '#06b6d4' },
    { className: 'Class VI', pct: 8, count: 11, color: '#a855f7' },
    { className: 'Classes I–V', pct: 5, count: 8, color: '#94a3b8' }
  ],


  // 2. STUDENT DIRECTORY (CLASSES 1 TO 10)
  studentDirectoryList: [
    { id: 'std_101', name: 'Rahul Reddy', grade: 'Class VIII', section: 'Section A', rollNo: 'VIII-014', penId: 'PEN-36182100637-801', parentName: 'V. Reddy', parentContact: '+91 98480 12345', attendancePct: 94.5, gpaPct: 88, gradeLetter: 'Grade A', feeStatus: 'Partial', feeDue: 3500, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80' },
    { id: 'std_102', name: 'Pooja Sharma', grade: 'Class VIII', section: 'Section A', rollNo: 'VIII-015', penId: 'PEN-36182100637-802', parentName: 'K. Sharma', parentContact: '+91 98480 67890', attendancePct: 96.8, gpaPct: 94, gradeLetter: 'Grade A+', feeStatus: 'Paid', feeDue: 0, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80' },
    { id: 'std_103', name: 'V. Sai Kumar', grade: 'Class X', section: 'Section A', rollNo: 'X-001', penId: 'PEN-36182100637-1001', parentName: 'V. Srinivas', parentContact: '+91 98480 11223', attendancePct: 98.2, gpaPct: 96, gradeLetter: 'Grade A+', feeStatus: 'Paid', feeDue: 0, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80' },
    { id: 'std_104', name: 'K. Ananya', grade: 'Class X', section: 'Section B', rollNo: 'X-022', penId: 'PEN-36182100637-1022', parentName: 'K. Ramesh', parentContact: '+91 98480 44556', attendancePct: 91.0, gpaPct: 82, gradeLetter: 'Grade B+', feeStatus: 'Partial', feeDue: 2500, avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80' },
    { id: 'std_105', name: 'M. Karthik', grade: 'Class V', section: 'Section A', rollNo: 'V-008', penId: 'PEN-36182100637-508', parentName: 'M. Venkatesh', parentContact: '+91 98480 77889', attendancePct: 95.0, gpaPct: 90, gradeLetter: 'Grade A+', feeStatus: 'Paid', feeDue: 0, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
    { id: 'std_106', name: 'T. Bhavani', grade: 'Class I', section: 'Section A', rollNo: 'I-012', penId: 'PEN-36182100637-112', parentName: 'T. Mallesh', parentContact: '+91 98480 99001', attendancePct: 93.4, gpaPct: 89, gradeLetter: 'Grade A', feeStatus: 'Paid', feeDue: 0, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
    { id: 'std_107', name: 'G. Akhil', grade: 'Class IX', section: 'Section A', rollNo: 'IX-005', penId: 'PEN-36182100637-905', parentName: 'G. Narsaiah', parentContact: '+91 98480 33445', attendancePct: 88.5, gpaPct: 78, gradeLetter: 'Grade B', feeStatus: 'Overdue', feeDue: 5000, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80' }
  ],

  // 3. ACADEMICS & BSE TELANGANA BOARD CURRICULUM
  academicsCurriculumList: [
    { id: 'acad_01', classGrade: 'Class X', subject: '📐 Mathematics & Geometry', teacher: 'Mrs. S. Radhika', chaptersCompleted: '8 of 12 Chapters', progressPct: 82, boardStatus: 'On Track for March 2027 Board Exam' },
    { id: 'acad_02', classGrade: 'Class X', subject: '🔬 Physical Science', teacher: 'Mr. P. Srinivas', chaptersCompleted: '7 of 10 Chapters', progressPct: 78, boardStatus: 'Lab Practicals 80% Complete' },
    { id: 'acad_03', classGrade: 'Class VIII', subject: '📖 English Literature & Grammar', teacher: 'Mr. K. Rajesham', chaptersCompleted: '6 of 9 Chapters', progressPct: 72, boardStatus: 'Regular Curriculum' },
    { id: 'acad_04', classGrade: 'Class VIII', subject: '📜 Social Studies & History', teacher: 'Mr. B. Narsaiah', chaptersCompleted: '7 of 10 Chapters', progressPct: 75, boardStatus: 'Telangana History Modules Completed' },
    { id: 'acad_05', classGrade: 'Class V', subject: '💻 Computer Science & Digital Literacy', teacher: 'Ms. T. Anitha', chaptersCompleted: '5 of 8 Chapters', progressPct: 68, boardStatus: 'Digiboard Room Practicals' }
  ],

  // 4. STAFF & HR PAYROLL LEDGER
  staffPayrollList: [
    { id: 'stf_01', name: 'K. Rajesham', role: 'Headmaster & Senior English Lead', empId: 'EMP-VG-001', basic: 48000, allowances: 9000, deductions: 2000, netSalary: 55000, status: 'Credited', bank: 'State Bank of India ****1001' },
    { id: 'stf_02', name: 'Mrs. S. Radhika', role: 'Mathematics Department Head', empId: 'EMP-VG-002', basic: 38000, allowances: 7000, deductions: 2000, netSalary: 43000, status: 'Credited', bank: 'State Bank of India ****4091' },
    { id: 'stf_03', name: 'Mr. P. Srinivas', role: 'Physical Science Lead', empId: 'EMP-VG-003', basic: 36000, allowances: 6000, deductions: 1500, netSalary: 40500, status: 'Credited', bank: 'Union Bank of India ****2045' },
    { id: 'stf_04', name: 'Mr. V. Krishna', role: 'Telugu Language Lead', empId: 'EMP-VG-004', basic: 35000, allowances: 6000, deductions: 1500, netSalary: 39500, status: 'Credited', bank: 'Andhra Bank / UBI ****3099' },
    { id: 'stf_05', name: 'Mrs. M. Laxmi', role: 'Biological Science Teacher', empId: 'EMP-VG-005', basic: 34000, allowances: 5500, deductions: 1500, netSalary: 38000, status: 'Credited', bank: 'State Bank of India ****5012' },
    { id: 'stf_06', name: 'Ms. T. Anitha', role: 'Computer Science & ICT Lead', empId: 'EMP-VG-006', basic: 32000, allowances: 5000, deductions: 1200, netSalary: 35800, status: 'Credited', bank: 'HDFC Bank ****6088' }
  ],

  // 5. MASTER 20-CLASSROOM SCHEDULE MATRIX
  masterTimetables: {
    'Class VIII A': [
      { period: 1, time: '09:00 - 09:45 AM', subject: '📐 Mathematics', teacher: 'Mrs. S. Radhika', room: 'Room 203' },
      { period: 2, time: '09:50 - 10:35 AM', subject: '🔬 Physical Science', teacher: 'Mr. P. Srinivas', room: 'Science Lab 1' },
      { period: 3, time: '10:40 - 11:25 AM', subject: '📖 English Literature', teacher: 'Mr. K. Rajesham', room: 'Room 203' },
      { period: 4, time: '11:30 - 12:15 PM', subject: '🌿 Biological Science', teacher: 'Mrs. M. Laxmi', room: 'Bio Lab' },
      { period: 5, time: '01:00 - 01:45 PM', subject: '💻 Computer Science', teacher: 'Ms. T. Anitha', room: 'Digiboard Room' },
      { period: 6, time: '01:50 - 02:35 PM', subject: '📜 Social Studies', teacher: 'Mr. B. Narsaiah', room: 'Room 203' },
      { period: 7, time: '02:40 - 03:25 PM', subject: '⚽ Physical Education', teacher: 'Mr. G. Rakesh', room: 'Sports Ground' }
    ],
    'Class X B': [
      { period: 1, time: '09:00 - 09:45 AM', subject: '🔬 Physical Science', teacher: 'Mr. P. Srinivas', room: 'Science Lab 2' },
      { period: 2, time: '09:50 - 10:35 AM', subject: '📐 Advanced Algebra', teacher: 'Mrs. S. Radhika', room: 'Room 302' },
      { period: 3, time: '10:40 - 11:25 AM', subject: '📖 BSE Board Telugu', teacher: 'Mr. V. Krishna', room: 'Room 302' },
      { period: 4, time: '11:30 - 12:15 PM', subject: '📜 Social Studies', teacher: 'Mr. B. Narsaiah', room: 'Room 302' },
      { period: 5, time: '01:00 - 01:45 PM', subject: '📖 English Grammar', teacher: 'Mr. K. Rajesham', room: 'Room 302' },
      { period: 6, time: '01:50 - 02:35 PM', subject: '📐 Mathematics Practice', teacher: 'Mrs. S. Radhika', room: 'Room 302' },
      { period: 7, time: '02:40 - 03:25 PM', subject: '💻 Computer Science Lab', teacher: 'Ms. T. Anitha', room: 'Digiboard Room' }
    ],
    'Class I': [
      { period: 1, time: '09:00 - 09:45 AM', subject: 'Telugu Language', teacher: 'Mrs. K. Saritha', room: 'Room 101' },
      { period: 2, time: '09:50 - 10:35 AM', subject: 'English Basics', teacher: 'Mrs. A. Sunitha', room: 'Room 101' },
      { period: 3, time: '10:40 - 11:25 AM', subject: 'Elementary Math', teacher: 'Mr. P. Srinivas', room: 'Room 101' },
      { period: 4, time: '11:30 - 12:15 PM', subject: 'Environmental Studies', teacher: 'Mrs. M. Laxmi', room: 'Room 101' },
      { period: 5, time: '01:00 - 01:45 PM', subject: 'Rhymes & Arts', teacher: 'Mrs. K. Saritha', room: 'Activity Room 1' }
    ]
  },

  // 6. FEE COLLECTION & FINANCIAL LEDGER
  feeLedgerFullList: [
    { id: 'fee_01', name: 'Rahul Reddy', gradeSec: 'Class VIII A', totalFee: 15000, paidFee: 11500, dueFee: 3500, status: 'Partial', receiptNo: 'REC-VG-2026-081', lastDate: 'Aug 05, 2026' },
    { id: 'fee_02', name: 'Pooja Sharma', gradeSec: 'Class VIII A', totalFee: 15000, paidFee: 15000, dueFee: 0, status: 'Paid', receiptNo: 'REC-VG-2026-142', lastDate: 'Aug 10, 2026' },
    { id: 'fee_03', name: 'V. Sai Kumar', gradeSec: 'Class X A', totalFee: 18000, paidFee: 18000, dueFee: 0, status: 'Paid', receiptNo: 'REC-VG-2026-198', lastDate: 'Aug 12, 2026' },
    { id: 'fee_04', name: 'K. Ananya', gradeSec: 'Class X B', totalFee: 18000, paidFee: 15500, dueFee: 2500, status: 'Partial', receiptNo: 'REC-VG-2026-204', lastDate: 'Aug 14, 2026' },
    { id: 'fee_05', name: 'G. Akhil', gradeSec: 'Class IX A', totalFee: 16500, paidFee: 11500, dueFee: 5000, status: 'Overdue', receiptNo: 'REC-VG-2026-055', lastDate: 'Jun 10, 2026' },
    { id: 'fee_06', name: 'M. Karthik', gradeSec: 'Class V A', totalFee: 12000, paidFee: 12000, dueFee: 0, status: 'Paid', receiptNo: 'REC-VG-2026-012', lastDate: 'Jul 28, 2026' }
  ],

  // 7. TRANSPORT FLEET
  transportFleetList: [
    { busNo: 'Bus #1 (TG 12 Z 4091)', route: 'Route 1 — Cherial to Nagapuri Line', driver: 'B. Venkatesh', phone: '+91 98480 12345', pickupStop: 'Cherial Main Junction', pickupTime: '07:45 AM', schoolArrival: '08:15 AM', dropTime: '04:45 PM', studentsCount: 38, gpsStatus: '🟢 On Route • Near Cherial Market', speed: '35 km/h' },
    { busNo: 'Bus #2 (TG 12 Z 4092)', route: 'Route 2 — Cherial to Maddur Line', driver: 'M. Ramesh', phone: '+91 98480 67890', pickupStop: 'Maddur Bus Stand', pickupTime: '07:30 AM', schoolArrival: '08:20 AM', dropTime: '05:00 PM', studentsCount: 42, gpsStatus: '🟢 On Route • Arriving School Gate', speed: '28 km/h' },
    { busNo: 'Bus #3 (TG 12 Z 4093)', route: 'Route 3 — Cherial to Komuravelli Line', driver: 'K. Mallesh', phone: '+91 98480 11223', pickupStop: 'Komuravelli Temple Cross', pickupTime: '07:15 AM', schoolArrival: '08:10 AM', dropTime: '05:10 PM', studentsCount: 35, gpsStatus: '🅿️ Parked at Depot', speed: '0 km/h' }
  ],

  // 8. SCHOOL LIBRARY CATALOG
  libraryCatalogList: [
    { id: 'bk_01', title: 'Higher Algebra & Geometry', author: 'Hall & Knight', isbn: 'ISBN-978-81219', category: 'Mathematics', shelf: 'Shelf M-04', status: 'Issued', issuedTo: 'Rahul Reddy (Class VIII A)', dueDate: 'Sep 02, 2026' },
    { id: 'bk_02', title: 'Concepts of Physics (Vol I)', author: 'H.C. Verma', isbn: 'ISBN-978-81770', category: 'Physical Science', shelf: 'Shelf P-02', status: 'Available', issuedTo: '-', dueDate: '-' },
    { id: 'bk_03', title: 'Telangana Culture, Kakatiya Heritage & History', author: 'Dr. B. Narsaiah', isbn: 'ISBN-978-81902', category: 'Social Studies', shelf: 'Shelf S-01', status: 'Issued', issuedTo: 'Pooja Sharma (Class VIII A)', dueDate: 'Aug 30, 2026' },
    { id: 'bk_04', title: 'Wings of Fire: An Autobiography', author: 'A.P.J. Abdul Kalam', isbn: 'ISBN-978-81737', category: 'Biography / English', shelf: 'Shelf B-08', status: 'Available', issuedTo: '-', dueDate: '-' },
    { id: 'bk_05', title: 'Python Programming Basics for Schools', author: 'Ms. T. Anitha', isbn: 'ISBN-978-81944', category: 'Computer Science', shelf: 'Shelf C-03', status: 'Issued', issuedTo: 'V. Sai Kumar (Class X A)', dueDate: 'Sep 05, 2026' }
  ],

  // 9. TELANGANA SCHOOL HOLIDAY CALENDAR 2026-2027
  holidayCalendar: [
    { title: 'Bonalu & Moharram State Holiday', date: 'Aug 29, 2026', day: 'Saturday', duration: '1 Day', category: 'State Holiday', categoryClass: 'badge-info', description: 'Official Telangana State Government Holiday for Bonalu celebrations.' },
    { title: 'Vinayaka Chavithi (Ganesh Chaturthi)', date: 'Sep 14, 2026', day: 'Monday', duration: '1 Day', category: 'Festival Holiday', categoryClass: 'badge-warning', description: 'Ganesh Chaturthi festival holiday as per Telangana Board calendar.' },
    { title: 'Milad-un-Nabi', date: 'Sep 24, 2026', day: 'Thursday', duration: '1 Day', category: 'State Holiday', categoryClass: 'badge-info', description: 'Official holiday for Milad-un-Nabi.' },
    { title: 'Mahatma Gandhi Jayanti', date: 'Oct 02, 2026', day: 'Friday', duration: '1 Day', category: 'National Holiday', categoryClass: 'badge-danger', description: 'National holiday in honor of Mahatma Gandhi.' },
    { title: '🌺 Bathukamma & Dasara Vacation', date: 'Oct 08 – Oct 20, 2026', day: '13 Days Break', duration: '13 Days', category: 'Dasara Vacation', categoryClass: 'badge-success', description: 'Official 13-day Telangana Dasara & Bathukamma festival vacation for all schools.' },
    { title: '🪔 Deepavali / Diwali Festival', date: 'Nov 08, 2026', day: 'Sunday', duration: '1 Day', category: 'Festival Holiday', categoryClass: 'badge-warning', description: 'Diwali festival celebration.' },
    { title: 'Kartika Purnima', date: 'Nov 24, 2026', day: 'Tuesday', duration: '1 Day', category: 'State Holiday', categoryClass: 'badge-info', description: 'Telangana regional state holiday.' },
    { title: '🎄 Christmas & Winter Break', date: 'Dec 24 – Dec 28, 2026', day: '5 Days Break', duration: '5 Days', category: 'Winter Break', categoryClass: 'badge-indigo', description: 'Annual winter break for schools.' },
    { title: '🌾 Sankranti & Bhogi Vacation', date: 'Jan 13 – Jan 17, 2027', day: '5 Days Break', duration: '5 Days', category: 'Harvest Vacation', categoryClass: 'badge-success', description: 'Official 5-day Sankranti harvest vacation for Telangana schools.' },
    { title: 'Maha Shivaratri', date: 'Feb 15, 2027', day: 'Monday', duration: '1 Day', category: 'Festival Holiday', categoryClass: 'badge-warning', description: 'Festival holiday for Maha Shivaratri.' }
  ],

  // 10. TEACHER SCHEDULE
  teacherTimetable: [
    { period: 1, time: '09:00 - 09:45 AM', classAssigned: 'Class VIII Section A', subject: '📐 Mathematics', room: 'Room 203', status: 'Completed', type: 'class' },
    { period: 2, time: '09:50 - 10:35 AM', classAssigned: 'Class X Section B', subject: '📐 Advanced Algebra', room: 'Room 302', status: 'Active Now', active: true, type: 'class' },
    { period: 3, time: '10:40 - 11:25 AM', classAssigned: 'Staff Room 2', subject: '☕ Lesson Planning & Homework Review', room: 'Staff Room 2', status: 'Free Period', type: 'free' },
    { period: 4, time: '11:30 - 12:15 PM', classAssigned: 'Class IX Section A', subject: '📐 Geometry & Proofs', room: 'Room 204', status: 'Upcoming', type: 'class' },
    { period: 5, time: '12:15 - 01:00 PM', classAssigned: 'Faculty Lounge', subject: '🍱 Lunch & Refreshment Break', room: 'Dining Hall', status: 'Lunch Break', type: 'break' },
    { period: 6, time: '01:00 - 01:45 PM', classAssigned: 'Class VIII Section B', subject: '📐 Mathematics', room: 'Room 202', status: 'Upcoming', type: 'class' },
    { period: 7, time: '01:50 - 02:35 PM', classAssigned: 'Class X Section A', subject: '📐 Board Exam Practice Test', room: 'Room 301', status: 'Upcoming', type: 'class' },
    { period: 8, time: '02:40 - 03:25 PM', classAssigned: 'Room 201', subject: '💡 Peer Tutoring & Remedial Math', room: 'Room 201', status: 'Remedial / Free', type: 'free' }
  ],

  // 11. STUDENT TIMETABLE
  studentTimetable: [
    { period: 1, time: '09:00 - 09:45 AM', subject: '📐 Mathematics', teacher: 'Mrs. S. Radhika', room: 'Room 203', status: 'Completed' },
    { period: 2, time: '09:50 - 10:35 AM', subject: '🔬 Physical Science', teacher: 'Mr. P. Srinivas', room: 'Science Lab 1', status: 'Active Now', active: true },
    { period: 3, time: '10:40 - 11:25 AM', subject: '📖 English Literature', teacher: 'Mr. K. Rajesham', room: 'Room 203', status: 'Upcoming' },
    { period: 4, time: '11:30 - 12:15 PM', subject: '🌿 Biological Science', teacher: 'Mrs. M. Laxmi', room: 'Bio Lab', status: 'Upcoming' },
    { period: 5, time: '01:00 - 01:45 PM', subject: '💻 Computer Science', teacher: 'Ms. T. Anitha', room: 'Digiboard Room', status: 'Upcoming' },
    { period: 6, time: '01:50 - 02:35 PM', subject: '📜 Social Studies', teacher: 'Mr. B. Narsaiah', room: 'Room 203', status: 'Upcoming' },
    { period: 7, time: '02:40 - 03:25 PM', subject: '⚽ Physical Education', teacher: 'Mr. G. Rakesh', room: 'Sports Ground', status: 'Upcoming' }
  ],

  // 12. HOMEWORK ASSIGNMENTS
  assignments: [
    { id: 'hw_101', subject: '📐 Mathematics', title: 'Geometry Proofs & Chapter 4 Exercise 4.2', assignedBy: 'Mrs. S. Radhika', dueDate: 'Aug 28, 2026 at 05:00 PM', status: 'Pending', badgeClass: 'badge-warning', description: 'Solve questions 1 to 12 on congruent triangles in homework notebook.' },
    { id: 'hw_102', subject: '🔬 Physical Science', title: 'Reflection of Light & Concave Mirror Diagrams', assignedBy: 'Mr. P. Srinivas', dueDate: 'Aug 29, 2026 at 09:00 AM', status: 'Pending', badgeClass: 'badge-warning', description: 'Draw ray diagrams for object positions at F, C, and infinity.' },
    { id: 'hw_103', subject: '📖 English Language', title: 'Essay on Telangana Culture & Kakatiya Heritage', assignedBy: 'Mr. K. Rajesham', dueDate: 'Aug 24, 2026', status: 'Submitted (Grade: 9/10)', badgeClass: 'badge-success', description: '250-word essay on historic monuments of Telangana.' },
    { id: 'hw_104', subject: '💻 Computer Science', title: 'Python For-Loops & Multiplication Table Script', assignedBy: 'Ms. T. Anitha', dueDate: 'Aug 23, 2026', status: 'Submitted (Grade: 10/10)', badgeClass: 'badge-success', description: 'Write a script to generate multiplication tables for numbers 1 to 10.' }
  ],

  teacherSalary: { teacherName: 'Mrs. S. Radhika', designation: 'Senior Mathematics Teacher & Class VIII Mentor', month: 'August 2026', basicSalary: 38000, allowances: 7000, deductions: 2000, netSalary: 43000, status: 'Issued & Credited', bankAccount: 'State Bank of India A/C ****4091', creditDate: 'Aug 01, 2026', payslipId: 'PAY-VG-2026-08' },
  teacherAttendance: { teacherName: 'Mrs. S. Radhika', totalWorkingDays: 98, daysPresent: 96, casualLeaves: 2, attendancePct: 98.0, status: 'Excellent Duty Standing' },
  studentLeaveRequests: [
    { id: 'lve_101', studentName: 'Rahul Reddy', rollNo: 'VIII-014', grade: 'Class VIII Section A', leaveType: 'Medical Leave', fromDate: 'Sep 02, 2026', toDate: 'Sep 04, 2026', days: 3, reason: 'Fever & Doctor Advised Rest (Medical Certificate Attached)', appliedBy: 'Parent (V. Reddy)', appliedDate: 'Aug 25, 2026', mentorStatus: 'Pending Mentor Review', statusClass: 'badge-warning' },
    { id: 'lve_102', studentName: 'Pooja Sharma', rollNo: 'VIII-015', grade: 'Class VIII Section A', leaveType: 'Family Event', fromDate: 'Sep 10, 2026', toDate: 'Sep 11, 2026', days: 2, reason: 'Family Function in Hyderabad', appliedBy: 'Parent (K. Sharma)', appliedDate: 'Aug 24, 2026', mentorStatus: 'Accepted', statusClass: 'badge-success' }
  ],
  feeStructure: { annualTotal: 15000, paidAmount: 11500, dueAmount: 3500 },
  studentDashboard: { studentName: 'Rahul Reddy', grade: 'Class VIII • Section A', streak: 7 },
  upcomingEvents: [
    { day: '28', month: 'AUG', title: 'Class X Board Prep Exam', time: '9:00 AM - 12:00 PM', bg: 'badge-blue' },
    { day: '30', month: 'AUG', title: 'Parent-Teacher Meeting (PTM)', time: '10:00 AM - 2:00 PM', bg: 'badge-indigo' },
    { day: '05', month: 'SEP', title: "Teachers' Day Event", time: 'All Day Event', bg: 'badge-emerald' }
  ],

  notificationsList: [
    { id: 'nt_1', title: 'Student Leave Request Submitted', message: 'Rahul Reddy (Class VIII A) applied for 3 days Medical Leave.', time: '10 mins ago', type: 'leave', unread: true, actionView: 'student_leave_approvals' },
    { id: 'nt_2', title: 'Q2 Fee Installment Due Alert', message: '42 parents have pending Term 3 fee dues. Reminders dispatched.', time: '1 hour ago', type: 'fees', unread: true, actionView: 'fees' },
    { id: 'nt_3', title: 'BSE Board Hall Tickets Released', message: 'Class X Board Examination hall tickets for March 2027 generated.', time: '3 hours ago', type: 'academic', unread: true, actionView: 'academics' },
    { id: 'nt_4', title: 'Bus #1 Live GPS Status Update', message: 'Bus #1 (TG 12 Z 4091) arrived safely at School Gate from Cherial.', time: '5 hours ago', type: 'transport', unread: true, actionView: 'transport' }
  ]
};

