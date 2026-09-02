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
  ],

  // 13. STUDENT DAILY CLASS FEEDBACK (STUDENT -> PRINCIPAL)
  studentClassFeedbacks: [
    {
      id: 'sfb_01',
      date: '2026-09-02',
      formattedDate: 'Sep 02, 2026',
      studentName: 'Rahul Reddy',
      rollNo: 'VIII-014',
      grade: 'Class VIII Section A',
      subject: '📐 Mathematics',
      teacher: 'Mrs. S. Radhika',
      period: 'Period 1 (09:00 - 09:45 AM)',
      rating: 5,
      comprehensionPace: 'Paced Perfectly',
      topic: 'Chapter 4: Congruence of Triangles & ASA Criterion',
      comments: 'Understood congruent triangle criteria easily with practical blackboard diagrams. Solved 3 theorem proofs independently.',
      doubts: 'None today. Clear on all proofs.',
      principalStatus: 'Reviewed by Principal',
      principalRemarks: 'Excellent student engagement noted in Math.'
    },
    {
      id: 'sfb_02',
      date: '2026-09-02',
      formattedDate: 'Sep 02, 2026',
      studentName: 'Rahul Reddy',
      rollNo: 'VIII-014',
      grade: 'Class VIII Section A',
      subject: '🔬 Physical Science',
      teacher: 'Mr. P. Srinivas',
      period: 'Period 2 (09:50 - 10:35 AM)',
      rating: 4,
      comprehensionPace: 'Paced Perfectly',
      topic: 'Reflection of Light & Concave Mirror Lab Work',
      comments: 'The focal point experiment in Science Lab 1 was very interesting. Observed inverted images clearly.',
      doubts: 'Need slight clarification on sign conventions in mirror formula.',
      principalStatus: 'Reviewed by Principal',
      principalRemarks: 'Science lab practicals proceeding on schedule.'
    },
    {
      id: 'sfb_03',
      date: '2026-09-02',
      formattedDate: 'Sep 02, 2026',
      studentName: 'Pooja Sharma',
      rollNo: 'VIII-015',
      grade: 'Class VIII Section A',
      subject: '📖 English Literature',
      teacher: 'Mr. K. Rajesham',
      period: 'Period 3 (10:40 - 11:25 AM)',
      rating: 5,
      comprehensionPace: 'Paced Perfectly',
      topic: 'Telangana Culture & Kakatiya Heritage Discussion',
      comments: 'Inspiring explanation of historic Telangana architecture. Great interactive discussion in class.',
      doubts: 'None.',
      principalStatus: 'Reviewed by Principal',
      principalRemarks: 'Strong interest in regional heritage.'
    },
    {
      id: 'sfb_04',
      date: '2026-09-01',
      formattedDate: 'Sep 01, 2026',
      studentName: 'V. Sai Kumar',
      rollNo: 'X-001',
      grade: 'Class X Section A',
      subject: '📐 Advanced Algebra',
      teacher: 'Mrs. S. Radhika',
      period: 'Period 2 (09:50 - 10:35 AM)',
      rating: 5,
      comprehensionPace: 'Paced Perfectly',
      topic: 'Quadratic Equations & Board Prep Shortcuts',
      comments: 'The quadratic formula shortcuts and discriminant analysis are very helpful for BSE board exams.',
      doubts: 'None.',
      principalStatus: 'Reviewed by Principal',
      principalRemarks: 'Board exam preparation progressing satisfactorily.'
    }
  ],

  // 14. TEACHER DAILY CLASSROOM FEEDBACK LOGS (TEACHER -> PRINCIPAL)
  teacherDailyClassFeedbacks: [
    {
      id: 'tcf_01',
      date: '2026-09-02',
      formattedDate: 'Sep 02, 2026',
      teacherName: 'Mrs. S. Radhika',
      empId: 'EMP-VG-002',
      grade: 'Class VIII Section A',
      subject: '📐 Mathematics',
      period: 'Period 1 (09:00 - 09:45 AM)',
      room: 'Room 203',
      topicTaught: 'Chapter 4: Congruence of Triangles (Exercise 4.2)',
      classEngagementRating: 5,
      homeworkAssigned: 'Solve Ex 4.2 Q1 to Q12 in homework notebook',
      observations: 'Class was highly attentive. 28 out of 30 students answered oral theorem check questions accurately. Rahul Reddy and Pooja Sharma demonstrated proofs on the board.',
      discipline: 'Excellent',
      principalStatus: 'Acknowledged by Headmaster'
    },
    {
      id: 'tcf_02',
      date: '2026-09-02',
      formattedDate: 'Sep 02, 2026',
      teacherName: 'Mr. P. Srinivas',
      empId: 'EMP-VG-003',
      grade: 'Class VIII Section A',
      subject: '🔬 Physical Science',
      period: 'Period 2 (09:50 - 10:35 AM)',
      room: 'Science Lab 1',
      topicTaught: 'Reflection of Light: Concave Mirror Ray Tracing',
      classEngagementRating: 4,
      homeworkAssigned: 'Draw ray diagrams for object at F and C',
      observations: 'Lab session conducted safely. Most students observed real vs virtual images accurately. Minor revision needed on Cartesian sign convention.',
      discipline: 'Very Good',
      principalStatus: 'Acknowledged by Headmaster'
    },
    {
      id: 'tcf_03',
      date: '2026-09-02',
      formattedDate: 'Sep 02, 2026',
      teacherName: 'Mr. K. Rajesham',
      empId: 'EMP-VG-001',
      grade: 'Class VIII Section A',
      subject: '📖 English Literature',
      period: 'Period 3 (10:40 - 11:25 AM)',
      room: 'Room 203',
      topicTaught: 'Telangana Culture & Kakatiya Heritage Essay Reading',
      classEngagementRating: 5,
      homeworkAssigned: 'Write 250-word essay on historical monuments of Telangana',
      observations: 'Students showed deep enthusiasm for regional history and Kakatiya architectural marvels. Pronunciation and vocabulary skills improving.',
      discipline: 'Exemplary',
      principalStatus: 'Acknowledged by Headmaster'
    }
  ],

  // 15. TEACHER FEEDBACK ON INDIVIDUAL STUDENTS (TEACHER -> REFLECTS TO PARENT & PRINCIPAL)
  teacherStudentFeedbacks: [
    {
      id: 'tsf_01',
      date: '2026-09-02',
      formattedDate: 'Sep 02, 2026',
      studentId: 'std_101',
      studentName: 'Rahul Reddy',
      rollNo: 'VIII-014',
      grade: 'Class VIII Section A',
      subject: '📐 Mathematics',
      teacherName: 'Mrs. S. Radhika',
      teacherDesignation: 'Class VIII Mentor & Senior Math Lead',
      empId: 'EMP-VG-002',
      rating: 5,
      performanceLevel: 'Outstanding',
      conceptGrasp: 'Exceptional comprehension of Congruent Triangles theorem proofs today. Rahul volunteered to solve complex ASA & SAS problems on the blackboard with complete confidence.',
      behaviorAndDiscipline: 'Very attentive, respectful, and collaborates constructively with peers in group problem-solving.',
      strengths: 'Analytical reasoning, fast mental calculations, and structured proof writing.',
      adviceForParents: 'Rahul is performing at the top tier in Math! Please ensure he spends 20 minutes daily reviewing geometry theorem steps at home to maintain this momentum.',
      homeworkStatus: 'Completed on Time (Grade: A+)',
      parentAcknowledged: true,
      parentNote: 'Thank you Mrs. Radhika! We reviewed the theorem proofs together at home and Rahul solved all practice problems diligently.',
      acknowledgedDate: 'Sep 02, 2026 at 02:15 PM',
      principalStatus: 'Reviewed by Principal',
      principalNote: 'Great feedback. Outstanding academic performance.'
    },
    {
      id: 'tsf_02',
      date: '2026-09-02',
      formattedDate: 'Sep 02, 2026',
      studentId: 'std_101',
      studentName: 'Rahul Reddy',
      rollNo: 'VIII-014',
      grade: 'Class VIII Section A',
      subject: '🔬 Physical Science',
      teacherName: 'Mr. P. Srinivas',
      teacherDesignation: 'Physical Science Lead',
      empId: 'EMP-VG-003',
      rating: 4,
      performanceLevel: 'Very Good',
      conceptGrasp: 'Understood concave mirror optics and image formation very well during practical lab demonstration today.',
      behaviorAndDiscipline: 'Followed laboratory safety rules diligently and handled optical apparatus with high care.',
      strengths: 'Hands-on experimentation enthusiasm and strong observation skills.',
      adviceForParents: 'Help Rahul practice the Cartesian sign conventions (focal length +/- signs) from textbook page 48 before the upcoming quiz.',
      homeworkStatus: 'Submitted (Grade: A)',
      parentAcknowledged: false,
      parentNote: '',
      acknowledgedDate: '',
      principalStatus: 'Reviewed by Principal',
      principalNote: 'Noted for science lab progress.'
    },
    {
      id: 'tsf_03',
      date: '2026-09-01',
      formattedDate: 'Sep 01, 2026',
      studentId: 'std_102',
      studentName: 'Pooja Sharma',
      rollNo: 'VIII-015',
      grade: 'Class VIII Section A',
      subject: '📐 Mathematics',
      teacherName: 'Mrs. S. Radhika',
      teacherDesignation: 'Class VIII Mentor & Senior Math Lead',
      empId: 'EMP-VG-002',
      rating: 5,
      performanceLevel: 'Outstanding',
      conceptGrasp: 'Perfect accuracy in solving exercise questions. Guided classmates during peer tutoring session.',
      behaviorAndDiscipline: 'Exemplary conduct, focused and highly motivated.',
      strengths: 'Methodical documentation, leadership, precision in geometry.',
      adviceForParents: 'Continue supporting her interest in competitive exams like Ramanujan Math Talent Search.',
      homeworkStatus: 'Completed on Time (Grade: A+)',
      parentAcknowledged: true,
      parentNote: 'Thank you teacher for encouraging Pooja constantly!',
      acknowledgedDate: 'Sep 01, 2026 at 06:40 PM',
      principalStatus: 'Reviewed by Principal',
      principalNote: 'Nominated for State Olympiad.'
    },
    {
      id: 'tsf_04',
      date: '2026-09-01',
      formattedDate: 'Sep 01, 2026',
      studentId: 'std_107',
      studentName: 'G. Akhil',
      rollNo: 'IX-005',
      grade: 'Class IX Section A',
      subject: '📜 Social Studies',
      teacherName: 'Mr. B. Narsaiah',
      teacherDesignation: 'Social Studies & History Lead',
      empId: 'EMP-VG-004',
      rating: 3,
      performanceLevel: 'Needs Attention',
      conceptGrasp: 'Struggling with chronology and key historical events of Telangana movement. Needs revision on map reading.',
      behaviorAndDiscipline: 'Polite but reserved; rarely asks questions when in doubt.',
      strengths: 'Good listening habits, neat handwriting.',
      adviceForParents: 'Please supervise 20 minutes of daily textbook reading and map pointing exercises at home in the evening.',
      homeworkStatus: 'Pending Submission',
      parentAcknowledged: false,
      parentNote: '',
      acknowledgedDate: '',
      principalStatus: 'Flagged for Mentor Follow-up',
      principalNote: 'Class mentor requested to arrange remedial session.'
    }
  ],

  /* ==========================================================================
     11 INSTITUTIONAL FOUNDATION PILLARS (VIKAS GRAMMAR SCHOOL HS CHERIAL)
     ========================================================================== */

  // 1) BEHAVIOUR MATRIX (Co-students, Teachers, and Overall Conduct)
  studentBehaviourRecords: [
    {
      studentId: 'std_101',
      studentName: 'Rahul Reddy',
      rollNo: 'VIII-014',
      grade: 'Class VIII Section A',
      mentorTeacher: 'Mrs. S. Radhika',
      lastEvaluation: 'Sep 02, 2026',
      coStudentsBehaviour: {
        rating: 5,
        level: 'Exemplary',
        notes: 'Helpful and supportive in group work. Always shares study notes with peers. Zero instances of conflict or friction.'
      },
      teachersBehaviour: {
        rating: 5,
        level: 'Respectful & Attentive',
        notes: 'Greets teachers cordially, attentive in class lectures, raises hand before speaking, executes assignments diligently.'
      },
      overallConduct: {
        rating: 5,
        level: 'Outstanding (A+)',
        punctuality: '99% on-time arrival',
        uniformEtiquette: 'Impeccable & compliant',
        campusDiscipline: 'Member of School Discipline Committee'
      },
      commendations: ['Peer Mentor Badge', 'Mathematics Quiz Runner-up'],
      areasToWatch: 'Encourage him to step forward in public speaking and assembly anchoring.'
    },
    {
      studentId: 'std_102',
      studentName: 'Pooja Sharma',
      rollNo: 'VIII-008',
      grade: 'Class VIII Section A',
      mentorTeacher: 'Mrs. S. Radhika',
      lastEvaluation: 'Sep 01, 2026',
      coStudentsBehaviour: {
        rating: 5,
        level: 'Friendly & Collaborative',
        notes: 'Leads study circles, well-liked by classmates, very inclusive during sports and lunch sessions.'
      },
      teachersBehaviour: {
        rating: 5,
        level: 'Enthusiastic & Inquisitive',
        notes: 'Asks insightful conceptual questions in science and language classes. Highly respectful.'
      },
      overallConduct: {
        rating: 5,
        level: 'Outstanding (A+)',
        punctuality: '100% on-time',
        uniformEtiquette: 'Perfect adherence',
        campusDiscipline: 'Class Prefect'
      },
      commendations: ['Star Student of the Month', 'Science Fair 1st Prize'],
      areasToWatch: 'Balancing extracurricular responsibilities with rest time.'
    },
    {
      studentId: 'std_103',
      studentName: 'V. Sai Kumar',
      rollNo: 'VIII-022',
      grade: 'Class VIII Section A',
      mentorTeacher: 'Mrs. S. Radhika',
      lastEvaluation: 'Aug 31, 2026',
      coStudentsBehaviour: {
        rating: 4,
        level: 'Good & Cooperative',
        notes: 'Active in sports teams. Occasionally gets into playful chatter during quiet reading hours.'
      },
      teachersBehaviour: {
        rating: 4,
        level: 'Polite & Responsive',
        notes: 'Follows instructions when reminded; polite in addressing staff.'
      },
      overallConduct: {
        rating: 4,
        level: 'Good (B+)',
        punctuality: '95% attendance',
        uniformEtiquette: 'Good',
        campusDiscipline: 'Regular classroom participant'
      },
      commendations: ['Inter-House Kho-Kho Winner'],
      areasToWatch: 'Needs to maintain silent focus during self-study periods without prompting.'
    },
    {
      studentId: 'std_107',
      studentName: 'G. Akhil',
      rollNo: 'IX-005',
      grade: 'Class IX Section A',
      mentorTeacher: 'Mr. B. Narsaiah',
      lastEvaluation: 'Aug 30, 2026',
      coStudentsBehaviour: {
        rating: 3,
        level: 'Quiet & Reserved',
        notes: 'Tends to stay isolated during lunch breaks. Teachers are fostering peer buddy pairings to encourage social bonding.'
      },
      teachersBehaviour: {
        rating: 4,
        level: 'Polite & Soft-Spoken',
        notes: 'Very polite, but hesitant to raise hands even when struggling with concepts.'
      },
      overallConduct: {
        rating: 4,
        level: 'Satisfactory (B)',
        punctuality: '91% attendance',
        uniformEtiquette: 'Clean & neat',
        campusDiscipline: 'Well-behaved'
      },
      commendations: ['Perfect Library Attendance'],
      areasToWatch: 'Build classroom confidence; encourage speaking up during open discussions.'
    }
  ],

  // 2) GPA GRADE & SUBJECT-WISE PARAMETERS & GAPS PLUGGING
  gpaSubjectDiagnostics: [
    {
      studentId: 'std_101',
      studentName: 'Rahul Reddy',
      rollNo: 'VIII-014',
      grade: 'Class VIII Section A',
      overallGpa: 9.4,
      overallRank: '2nd in Class',
      subjects: [
        {
          subject: '📐 Mathematics',
          teacher: 'Mrs. S. Radhika',
          fa1: 19, fa2: 20, fa3: 18, fa4: 19, // out of 20
          sa1: 76, // out of 80
          slipTests: 95, // %
          projectWork: '10/10 (Model on Pythagorean Theorem)',
          totalScore: 94,
          gpa: 9.6,
          grade: 'A1',
          strengths: 'Geometric proofs, algebraic equations, fast mental calculation.',
          identifiedGap: 'Speed during 4-mark multi-step word problems involving surface areas.',
          remedialAction: 'Plugged via 3 weekly worksheet speed drills on 3D geometry word problems.',
          gapStatus: 'In Progress (80% Plugged)'
        },
        {
          subject: '🔬 Physical Science',
          teacher: 'Mr. P. Srinivas',
          fa1: 18, fa2: 19, fa3: 18, fa4: 19,
          sa1: 72,
          slipTests: 91,
          projectWork: '9.5/10 (Optics Ray Diagram Album)',
          totalScore: 91,
          gpa: 9.2,
          grade: 'A1',
          strengths: 'Optics, mirror formulas, conceptual ray diagrams.',
          identifiedGap: 'Numerical calculations involving lens focal lengths and sign conventions.',
          remedialAction: 'Provide formula cheat sheet with Cartesian sign convention diagrams.',
          gapStatus: 'Plugged Successfully'
        },
        {
          subject: '🌿 Biological Science',
          teacher: 'Ms. K. Lavanya',
          fa1: 19, fa2: 18, fa3: 19, fa4: 20,
          sa1: 75,
          slipTests: 93,
          projectWork: '10/10 (Cell Organelle Herbarium)',
          totalScore: 93,
          gpa: 9.4,
          grade: 'A1',
          strengths: 'Cell structure labeling, botanical nomenclature.',
          identifiedGap: 'Needs practice in drawing neat neat microscopic cross-section diagrams with proper scaling.',
          remedialAction: 'Daily 10-minute sketching of plant/animal tissues in science workbook.',
          gapStatus: 'In Progress'
        },
        {
          subject: '📖 English Literature & Grammar',
          teacher: 'Mr. M. Ramesh',
          fa1: 19, fa2: 19, fa3: 18, fa4: 18,
          sa1: 73,
          slipTests: 90,
          projectWork: '9/10 (Creative Short Story Anthology)',
          totalScore: 90,
          gpa: 9.1,
          grade: 'A1',
          strengths: 'Reading comprehension, narrative essay composition.',
          identifiedGap: 'Active/passive voice transformations in complex compound sentences.',
          remedialAction: 'Grammar practice module on sentence transformation given in homework binder.',
          gapStatus: 'Plugged Successfully'
        },
        {
          subject: '📜 Social Studies',
          teacher: 'Mr. B. Narsaiah',
          fa1: 19, fa2: 19, fa3: 19, fa4: 19,
          sa1: 74,
          slipTests: 92,
          projectWork: '10/10 (Telangana River Basin & Irrigation Project)',
          totalScore: 92,
          gpa: 9.3,
          grade: 'A1',
          strengths: 'Cartography, climatic zones, civic rights and duties.',
          identifiedGap: 'Long answer essay structuring under 15 minutes.',
          remedialAction: 'Use bullet-point answer frameworks and chronological timelines.',
          gapStatus: 'In Progress (70% Plugged)'
        },
        {
          subject: '🖋️ Telugu (First Language)',
          teacher: 'Mr. C. Venkataiah',
          fa1: 20, fa2: 19, fa3: 19, fa4: 20,
          sa1: 77,
          slipTests: 96,
          projectWork: '10/10 (Telangana Folk Poets Recitation)',
          totalScore: 96,
          gpa: 9.8,
          grade: 'A1',
          strengths: 'Classical poem recitation, Sandhi & Samasam grammar mastery.',
          identifiedGap: 'Occasional spelling corrections in Ottu (compound consonants).',
          remedialAction: 'Self-corrected via weekly Telugu dictation notebook review.',
          gapStatus: 'Plugged Successfully'
        },
        {
          subject: '🇮🇳 Hindi (Second Language)',
          teacher: 'Mrs. D. Sunitha',
          fa1: 18, fa2: 18, fa3: 18, fa4: 18,
          sa1: 71,
          slipTests: 88,
          projectWork: '9/10 (Hindi Muhavare Chart)',
          totalScore: 88,
          gpa: 8.9,
          grade: 'A2',
          strengths: 'Story understanding, oral communication.',
          identifiedGap: 'Gender agreement rules (Ling and Vachan) in past tense verbs.',
          remedialAction: 'Daily reading of 1 Hindi editorial and writing 5 sentences with correct gender agreement.',
          gapStatus: 'In Progress (60% Plugged)'
        }
      ]
    }
  ],

  // 3) FEEDBACK METRICS (Subject-wise & Class-wise breakdown)
  feedbackMetrics: {
    overallSchoolSatisfaction: 94.2, // %
    totalDailyFeedbacksSubmitted: 482,
    averagePacingScore: 4.8, // out of 5
    subjectWiseMetrics: [
      { subject: 'Mathematics', avgRating: 4.9, totalReviews: 124, perfectPace: 92, doubtsReported: 8, satisfactionRate: 96 },
      { subject: 'Physical Science', avgRating: 4.7, totalReviews: 98, perfectPace: 88, doubtsReported: 14, satisfactionRate: 93 },
      { subject: 'Biological Science', avgRating: 4.8, totalReviews: 86, perfectPace: 91, doubtsReported: 6, satisfactionRate: 95 },
      { subject: 'English', avgRating: 4.8, totalReviews: 76, perfectPace: 94, doubtsReported: 4, satisfactionRate: 96 },
      { subject: 'Social Studies', avgRating: 4.6, totalReviews: 64, perfectPace: 85, doubtsReported: 11, satisfactionRate: 90 },
      { subject: 'Telugu', avgRating: 4.9, totalReviews: 54, perfectPace: 96, doubtsReported: 3, satisfactionRate: 98 }
    ],
    classWiseMetrics: [
      { grade: 'Class X Section A', avgRating: 4.9, attendancePct: 97.4, homeworkCompletion: 98, satisfaction: 96, status: 'Top Academic Benchmark' },
      { grade: 'Class X Section B', avgRating: 4.7, attendancePct: 95.1, homeworkCompletion: 94, satisfaction: 92, status: 'Board Focus Class' },
      { grade: 'Class IX Section A', avgRating: 4.8, attendancePct: 96.0, homeworkCompletion: 95, satisfaction: 94, status: 'High Performance' },
      { grade: 'Class IX Section B', avgRating: 4.6, attendancePct: 93.8, homeworkCompletion: 91, satisfaction: 89, status: 'Remedial Support Active' },
      { grade: 'Class VIII Section A', avgRating: 4.9, attendancePct: 98.2, homeworkCompletion: 97, satisfaction: 97, status: 'Model Classroom 2026' },
      { grade: 'Class VIII Section B', avgRating: 4.7, attendancePct: 94.6, homeworkCompletion: 93, satisfaction: 91, status: 'Steady Progress' }
    ]
  },

  // 4) TEACHING METHODOLOGY: OPINION COLLECTION -> GAPS -> WHAT IS TO BE DONE FOR IMPROVEMENT
  teachingMethodologyData: [
    {
      id: 'tm_01',
      subject: '📐 Mathematics (Class VIII & IX)',
      teacher: 'Mrs. S. Radhika',
      methodologyUsed: 'Visual Concept Board + Real-world Geometric Models + Interactive Formula Derivation',
      studentOpinions: [
        '“Visual proof of algebraic identities using square cutouts helped me understand why (a+b)² = a² + 2ab + b² without memorizing.” — Rahul Reddy',
        '“Board handwriting is very neat. Request 5 more minutes at the end of class for solving doubts individually.” — Pooja Sharma'
      ],
      identifiedGaps: [
        'Time crunch: In 45-minute periods, slower students need more time for step-by-step notebook copying.',
        'Word problems require bilingual clarification (Telugu/English terms) for a few rural-background students.'
      ],
      improvementActionPlan: [
        'Allocate 35 minutes for concept & practice, and reserve the final 10 minutes strictly for circulating and clearing individual doubts.',
        'Provide bilingual glossary cards for geometric terms (e.g. Hypotenuse = కర్ణము, Congruent = సర్వసమానము).',
        'Conduct Friday peer-tutoring circles where high-scoring students partner with peers.'
      ],
      status: 'Implemented & Active'
    },
    {
      id: 'tm_02',
      subject: '🔬 Physical Science (Class VIII & X)',
      teacher: 'Mr. P. Srinivas',
      methodologyUsed: 'Demonstration-First Approach + Laboratory Apparatus in Classroom + PPT Video Clips',
      studentOpinions: [
        '“Seeing the laser beam refract through the glass prism made refraction unforgettable!” — V. Sai Kumar',
        '“Formulas are clear, but ray diagram drawing on paper takes me too long during slip tests.” — K. Divya'
      ],
      identifiedGaps: [
        'Students can observe phenomena easily, but lag in mathematical derivation of lens and mirror formulas under timed test conditions.',
        'Lack of individual hands-on apparatus handling due to 40 students per period.'
      ],
      improvementActionPlan: [
        'Split the 40-student class into 4 lab rotation groups of 10 students each during Wednesday double-periods.',
        'Distribute step-by-step ray diagram stencil practice sheets.',
        'Upload 2-minute recap experiment video links for home revision.'
      ],
      status: 'In Progress (Target: Sep 10)'
    },
    {
      id: 'tm_03',
      subject: '📜 Social Studies (Class IX & X)',
      teacher: 'Mr. B. Narsaiah',
      methodologyUsed: 'Historical Storytelling + Wall Map Demonstrations + Group Debates on Current Affairs',
      studentOpinions: [
        '“The story of the freedom struggle is exciting, but memorizing exact treaty dates and constitutional amendment numbers is hard.” — G. Akhil',
        '“Debates in class make civic rights very interesting.” — S. Ramu'
      ],
      identifiedGaps: [
        'Too much textual lecturing; need more visual timelines and infographics on blackboard.',
        'Map-pointing skills require tactile practice rather than just wall-map pointing.'
      ],
      improvementActionPlan: [
        'Introduce printed blank outline maps for every student twice a week for instant hands-on practice.',
        'Create a chronological timeline chart on the classroom side-wall for quick visual memory retention.',
        'Implement "5-minute Daily Current Affairs Bulletin" led by rotation students.'
      ],
      status: 'Implemented'
    }
  ],

  // 5) FACILITIES FOR STUDENTS (Toilets, Drinking Water, Maintenance, Hygiene Audit)
  campusFacilitiesData: {
    lastHygieneAudit: 'Sep 02, 2026 (08:30 AM by Health Committee)',
    overallCampusHygieneScore: 95.8, // %
    weeklyHygieneRatings: [
      {
        week: 'Week 1',
        dateRange: 'Aug 10 – Aug 16, 2026',
        score: 94.2,
        ratingStars: '4.7 / 5',
        status: 'Audit Certified',
        auditor: 'Health & Sanitation Committee',
        highlights: 'RO Plant TDS checked (98 PPM). Restrooms sanitized 3x daily. Zero drainage blockages.'
      },
      {
        week: 'Week 2',
        dateRange: 'Aug 17 – Aug 23, 2026',
        score: 95.0,
        ratingStars: '4.8 / 5',
        status: 'Audit Certified',
        auditor: 'Mrs. S. Radhika & Caretaker Mallesh',
        highlights: 'Deep floor scrubbing in junior wing corridors. Handwash liquid soaps replenished across all floors.'
      },
      {
        week: 'Week 3',
        dateRange: 'Aug 24 – Aug 30, 2026',
        score: 96.2,
        ratingStars: '4.9 / 5',
        status: 'Audit Certified',
        auditor: 'Headmaster K. Rajesham & Health Squad',
        highlights: 'Water testing passed neutral pH (7.2). Electric sanitary incinerator calibrated and verified.'
      },
      {
        week: 'Week 4 (Current)',
        dateRange: 'Aug 31 – Sep 02, 2026',
        score: 95.8,
        ratingStars: '4.8 / 5',
        status: 'Active Current Week Score',
        auditor: 'Campus Health Committee & Duty Faculty',
        highlights: 'All 6 facility nodes operational. Restroom Dettol dispensers 100% full. Clean surroundings verified.'
      }
    ],
    facilityNodes: [
      {
        id: 'fac_01',
        name: 'RO Drinking Water Plant (Ground Floor)',
        category: 'Drinking Water',
        status: 'Operational & Excellent',
        hygieneRating: 5,
        lastCleaned: 'Today at 06:30 AM',
        tdsLevel: '95 PPM (Ideal Drinking Standards)',
        phLevel: '7.2 (Neutral Safe)',
        chillerFunctioning: 'Active (20°C cool fresh water)',
        maintenanceNotes: 'Filter cartridge replaced on Aug 25, 2026. Next service due Oct 25.'
      },
      {
        id: 'fac_02',
        name: 'RO Drinking Water Point (First Floor Secondary Wing)',
        category: 'Drinking Water',
        status: 'Operational',
        hygieneRating: 5,
        lastCleaned: 'Today at 07:00 AM',
        tdsLevel: '102 PPM (Safe)',
        phLevel: '7.1',
        chillerFunctioning: 'Active',
        maintenanceNotes: 'Clean surroundings, zero stagnant water puddles.'
      },
      {
        id: 'fac_03',
        name: 'Boys Restroom Complex (Ground Floor)',
        category: 'Sanitation & Toilets',
        status: 'Operational & Clean',
        hygieneRating: 4.8,
        lastCleaned: 'Today at 11:30 AM (Post-Break Clean)',
        runningWaterSupply: '24/7 Overhead Tank Flow with Booster',
        soapDispensers: '3 Units Filled (Dettol Antiseptic)',
        ventilationFans: '2 Exhaust Fans Operational',
        maintenanceNotes: 'Sanitized with phenyl solution three times daily (07:30 AM, 11:30 AM, 03:30 PM).'
      },
      {
        id: 'fac_04',
        name: 'Girls Restroom Complex (First Floor)',
        category: 'Sanitation & Toilets',
        status: 'Operational & Immaculate',
        hygieneRating: 5.0,
        lastCleaned: 'Today at 11:30 AM (Post-Break Clean)',
        runningWaterSupply: 'Continuous 24/7 Flow',
        soapDispensers: '4 Units Filled',
        incineratorUnit: 'Electric Sanitary Incinerator Active & Serviced',
        maintenanceNotes: 'Full privacy doors, mirrors clean, emergency sanitary pads available in staff room.'
      },
      {
        id: 'fac_05',
        name: 'Junior Science & Physics Laboratory',
        category: 'Academic Facilities',
        status: 'Operational',
        hygieneRating: 4.9,
        lastCleaned: 'Sep 01, 2026',
        equipmentAudit: 'Optics benches, prisms, galvanic meters tested and calibrated',
        fireExtinguisher: 'Valid till March 2027 (CO2 & Dry Powder)',
        maintenanceNotes: 'First-aid box refilled with burnol, bandages, and antiseptic.'
      },
      {
        id: 'fac_06',
        name: 'Computer & ICT Lab (25 Systems)',
        category: 'Digital Infrastructure',
        status: 'Operational',
        hygieneRating: 5.0,
        lastCleaned: 'Today at 08:00 AM',
        upsBackup: '10 KVA Online UPS (4 hours backup)',
        internetBroadband: 'Bsnl Bharat Fiber 100 Mbps Optical',
        maintenanceNotes: 'All 25 machines updated with educational scratch & python compilers.'
      }
    ],
    maintenanceTickets: [
      {
        ticketId: 'TKT-2026-088',
        facility: 'Boys Restroom - Ground Floor Tap 3',
        reportedBy: 'Rahul Reddy (Student Class VIII A)',
        date: 'Sep 02, 2026',
        issue: 'Slow water pressure in Tap #3 sink.',
        priority: 'Medium',
        status: 'Resolved by Campus Electrician (Augmenter valve adjusted at 12:15 PM)',
        assignedTo: 'Mr. Mallesh (Campus Caretaker)'
      },
      {
        ticketId: 'TKT-2026-089',
        facility: 'Room 204 (Class IX B) Tube Light',
        reportedBy: 'Mr. B. Narsaiah (Teacher)',
        date: 'Sep 01, 2026',
        issue: 'One LED batten flickering near blackboard.',
        priority: 'Low',
        status: 'Resolved (LED batten replaced on Sep 01 04:30 PM)',
        assignedTo: 'Electrician Team'
      },
      {
        ticketId: 'TKT-2026-090',
        facility: 'School Playground East Drinking Water Fountain',
        reportedBy: 'Physical Education Teacher (Mr. Raju)',
        date: 'Aug 31, 2026',
        issue: 'Drainage pipe mesh accumulated dry fallen leaves.',
        priority: 'Low',
        status: 'Resolved (Mesh cleaned and washed)',
        assignedTo: 'Grounds Maintenance Staff'
      }
    ]
  },

  // 6) UNUSUAL INCIDENTS LOG ("Anything unusual happened" - Safety, Medical, Discipline Anomaly)
  unusualIncidents: [
    {
      id: 'inc_101',
      date: '2026-09-02',
      time: '11:45 AM (Short Recess)',
      location: 'Primary School Ground Corner near Gulmohar Tree',
      reportedBy: 'Mrs. S. Radhika (Teacher on Recess Duty)',
      natureOfIncident: 'Minor Playground Scrape / First Aid',
      severity: 'Low',
      description: 'Master K. Harish (Class V B) tripped while playing tag and grazed his left knee on the lawn turf.',
      immediateActionTaken: 'Immediately escorted to First Aid Room. Wound washed with Dettol, antiseptic Betadine ointment and sterile bandage applied by Duty Teacher. Student given water and rest for 15 minutes before returning to class happily.',
      parentInformed: 'Yes (Mother telephoned via office intercom at 12:05 PM; assured that injury was minor).',
      principalReviewed: true,
      principalSignOff: 'Reviewed by Headmaster K. Rajesham. Good prompt handling by duty staff. Caretaker instructed to level the turf corner.'
    },
    {
      id: 'inc_102',
      date: '2026-09-01',
      time: '02:30 PM (Period 6)',
      location: 'Class X Section B Classroom',
      reportedBy: 'Mr. P. Srinivas (Science Teacher)',
      natureOfIncident: 'Weather / Power Anomaly & Safe Transition',
      severity: 'Low',
      description: 'Sudden thundershower caused momentary Cherial town feeder power surge triggering the school main circuit breaker.',
      immediateActionTaken: '10 KVA Online UPS kicked in seamlessly. Natural daylight in high-ceiling classrooms kept students completely calm and focused. School generator started within 3 minutes by caretaker.',
      parentInformed: 'No (Routine campus management, zero hazard).',
      principalReviewed: true,
      principalSignOff: 'Reviewed by Headmaster K. Rajesham. Commended smooth electrical auto-switch.'
    },
    {
      id: 'inc_103',
      date: '2026-08-28',
      time: '08:45 AM (Morning Arrival)',
      location: 'School Bus Route #2 (Mustabad-Cherial)',
      reportedBy: 'Mr. Anjaiah (Bus Driver) & Conductor',
      natureOfIncident: 'Traffic Detour / Mild Bus Delay',
      severity: 'Medium',
      description: 'Culvert maintenance near Pedda Cheru caused a 15-minute traffic bottleneck on the state highway.',
      immediateActionTaken: 'Conductor sent automated SMS broadcast to all 28 onboard students\' parents explaining the route diversion. Bus arrived safely on campus at 08:52 AM with all children safe.',
      parentInformed: 'Yes (Instant SMS broadcast dispatched to 28 parents).',
      principalReviewed: true,
      principalSignOff: 'Reviewed by Headmaster K. Rajesham. Route timing readjusted by 10 minutes during construction.'
    }
  ],

  // 7) TEACHER-STUDENT RELATIONS IN ALL CLASSES
  teacherStudentRelations: [
    {
      grade: 'Class VIII Section A',
      classMentor: 'Mrs. S. Radhika',
      totalStudents: 38,
      rapportIndex: 9.8, // out of 10
      approachabilityRating: 'Extremely High',
      classroomClimate: 'Warm, highly participative, students feel safe asking doubts and volunteering answers.',
      mentorComments: 'High trust environment. Students actively share both academic queries and personal aspirations.',
      principalAudit: 'Model classroom rapport. Zero intimidation, encouraging pedagogy observed during Headmaster rounds.'
    },
    {
      grade: 'Class X Section A',
      classMentor: 'Mr. P. Srinivas',
      totalStudents: 42,
      rapportIndex: 9.6,
      approachabilityRating: 'Very High',
      classroomClimate: 'Focused, goal-oriented, supportive mentorship for upcoming SSC Board Examination.',
      mentorComments: 'Students look up to teachers as mentors; evening study counseling well-received.',
      principalAudit: 'Excellent mentor-student alignment. Stress-free board prep climate.'
    },
    {
      grade: 'Class IX Section A',
      classMentor: 'Mr. B. Narsaiah',
      totalStudents: 36,
      rapportIndex: 9.2,
      approachabilityRating: 'High',
      classroomClimate: 'Curious, lively discussions during social sciences and language hours.',
      mentorComments: 'Working on encouraging 3 quieter students in middle rows to speak up freely.',
      principalAudit: 'Good camaraderie. Teacher maintains a respectful and open dialogue.'
    },
    {
      grade: 'Class IX Section B',
      classMentor: 'Ms. K. Lavanya',
      totalStudents: 35,
      rapportIndex: 8.9,
      approachabilityRating: 'Good & Improving',
      classroomClimate: 'Disciplined; students requested more interactive quiz activities to build stronger connection.',
      mentorComments: 'Organizing bi-weekly science quiz competitions to foster team bonding.',
      principalAudit: 'Positive trend. Recommended interactive group activities.'
    },
    {
      grade: 'Class VI Section A',
      classMentor: 'Mr. M. Ramesh',
      totalStudents: 32,
      rapportIndex: 9.7,
      approachabilityRating: 'Warm & Nurturing',
      classroomClimate: 'Loving transition from primary to upper primary; students feel cared for and nurtured.',
      mentorComments: 'Morning circle time helps students express feelings and build strong relationships.',
      principalAudit: 'Exemplary foundational care.'
    }
  ],

  // 8) HOW THE CLASSES ARE GOING ON (Pacing, Syllabus Coverage, Daily Progress)
  classSyllabusPacing: [
    {
      grade: 'Class VIII Section A',
      academicTerm: 'Term 1 (SCERT Telangana Syllabus)',
      overallPacingStatus: 'On Track (100% Aligned with SCERT Calendar)',
      syllabusProgressPct: 62.5, // %
      targetForCurrentMonth: 60.0,
      dailyDiaryToday: [
        { period: 'Period 1 (09:00 - 09:45)', subject: '📐 Mathematics', topic: 'ASA & RHS Triangle Congruence Theorems', status: 'Completed with proof exercises in class workbook' },
        { period: 'Period 2 (09:50 - 10:35)', subject: '🔬 Physical Science', topic: 'Concave Mirror Ray Diagrams & Focal Point', status: 'Practical mirror demonstration completed' },
        { period: 'Period 3 (10:45 - 11:30)', subject: '📖 English', topic: 'Direct & Indirect Speech Conversion Practice', status: 'Workbook exercise questions 1 to 15 solved' },
        { period: 'Period 4 (11:30 - 12:15)', subject: '🌿 Biological Science', topic: 'Plant vs Animal Cell Microscopic Examination', status: 'Slide mounting and labeling completed' },
        { period: 'Period 5 (01:00 - 01:45)', subject: '💻 Computer Science', topic: 'Python Conditionals (if-else branching)', status: 'Hands-on lab programs executed' },
        { period: 'Period 6 (01:45 - 02:30)', subject: '📜 Social Studies', topic: 'Telangana Physiography and Plateau Geology', status: 'Map work completed on Telangana outline' },
        { period: 'Period 7 (02:40 - 03:20)', subject: '🖋️ Telugu', topic: 'Poem Comprehension & Grammar Sandhi', status: 'Recitation and word-break drill' },
        { period: 'Period 8 (03:20 - 04:00)', subject: '⚽ Physical Education', topic: 'Kho-Kho & Volleyball Drills', status: 'Fitness drills and teamwork games' }
      ]
    },
    {
      grade: 'Class X Section A',
      academicTerm: 'Term 1 SSC Board Preparation',
      overallPacingStatus: 'Ahead of Schedule (+4% Buffer for Board Revision)',
      syllabusProgressPct: 68.0,
      targetForCurrentMonth: 64.0,
      dailyDiaryToday: [
        { period: 'Period 1', subject: '📐 Mathematics', topic: 'Quadratic Equations Word Problems (Speed & Distance)', status: '10 Board-pattern problems solved' },
        { period: 'Period 2', subject: '🔬 Physical Science', topic: 'Refraction through Curved Surfaces & Lens Maker Formula', status: 'Derivations completed' },
        { period: 'Period 3', subject: '📜 Social Studies', topic: 'National Movement in India (Partition & Independence)', status: 'Historical timeline completed' },
        { period: 'Period 4', subject: '📖 English', topic: 'Letter Writing (Formal Application to Authorities)', status: 'Drafting format reviewed' }
      ]
    }
  ],

  // 9) LEVEL OF SATISFACTIONS OF STUDENTS ON SUBJECT / CLASS WISE
  studentSatisfactionIndex: {
    overallIndexScore: 94.6, // %
    satisfactionBands: {
      highlySatisfiedPct: 82,
      satisfiedPct: 15,
      neutralPct: 3,
      dissatisfiedPct: 0
    },
    parameterRatings: [
      { parameter: 'Conceptual Clarity in Class', score: 4.8, max: 5, status: 'Excellent' },
      { parameter: 'Pacing & Speed of Lectures', score: 4.7, max: 5, status: 'Paced Well' },
      { parameter: 'Teacher Encouragement & Warmth', score: 4.9, max: 5, status: 'Outstanding' },
      { parameter: 'Doubt Resolution in Class', score: 4.8, max: 5, status: 'Very Responsive' },
      { parameter: 'Homework Fairness & Workload', score: 4.6, max: 5, status: 'Balanced' },
      { parameter: 'Lab Practical Demonstrations', score: 4.9, max: 5, status: 'Highly Engaging' },
      { parameter: 'Fairness in Grading & Marks', score: 4.8, max: 5, status: 'Transparent' }
    ]
  },

  // 10) WHERE WE STAND (Institutional Benchmarking & Diagnostic)
  whereWeStand: {
    schoolName: 'Vikas Grammar School High School Cherial',
    udiseCode: '36182100637',
    districtRank: 'Top 3 Schools in Siddipet District',
    mandalRank: 'Rank #1 in Cherial Mandal',
    institutionalHealthScore: 94.8, // out of 100
    pillars: [
      { pillar: 'Academic Excellence (SSC & FA Results)', schoolScore: 96, districtAvg: 81, stateBenchmark: 80, badge: 'Pacesetter' },
      { pillar: 'Student Conduct & Campus Discipline', schoolScore: 97, districtAvg: 84, stateBenchmark: 82, badge: 'Exemplary' },
      { pillar: 'Campus Facilities & Hygiene (Water/Toilets)', schoolScore: 95, districtAvg: 76, stateBenchmark: 78, badge: 'A+ Grade' },
      { pillar: 'Teacher-Student Relations & Climate', schoolScore: 96, districtAvg: 80, stateBenchmark: 80, badge: 'High Rapport' },
      { pillar: 'Syllabus Pacing & Timely Coverage', schoolScore: 98, districtAvg: 82, stateBenchmark: 85, badge: 'Ahead of Target' },
      { pillar: 'Parent Trust & Communication Index', schoolScore: 94, districtAvg: 75, stateBenchmark: 75, badge: 'Active Partner' }
    ],
    accreditationBadges: [
      '🏆 SCERT Telangana High Performance School 2025-26',
      '💧 100% Pure RO Certified Safe Drinking Water Campus',
      '🛡️ Clean Restroom & Child Hygiene Safety Verified',
      '🎓 100% SSC Pass Record for 8 Consecutive Years'
    ]
  },

  // 11) WHERE WE NEED TO IMPROVE (Actionable Improvement Matrix & Targeted Intervention Plan)
  whereToImprove: [
    {
      id: 'imp_01',
      category: 'Academic & Learning Gaps',
      priority: 'High Priority',
      area: 'Speed & Presentation in 4-Mark Mathematics & Science Word Problems',
      currentIssue: 'While concepts are clear, about 15% of Class IX & X students run short of time on multi-step calculations.',
      actionItem: 'Institute twice-weekly 20-minute timed speed worksheets and model answer sheet display on notice boards.',
      targetOwner: 'Mrs. S. Radhika & Math Faculty',
      dueDate: 'Sep 25, 2026',
      progressPct: 75,
      status: 'In Progress'
    },
    {
      id: 'imp_02',
      category: 'Campus Facilities',
      priority: 'Medium Priority',
      area: 'Solar Water Heater & Rainwater Harvesting Rejuvenation',
      currentIssue: 'Groundwater recharge pit desilting required before next monsoon showers.',
      actionItem: 'Contract grounds crew to desilt the 3 campus recharge pits and inspect pipe inlets.',
      targetOwner: 'Campus Caretaker & Management Committee',
      dueDate: 'Oct 05, 2026',
      progressPct: 60,
      status: 'In Progress'
    },
    {
      id: 'imp_03',
      category: 'Teaching Methodology',
      priority: 'High Priority',
      area: 'Bilingual Scientific Concept Bridging for Slower Learners',
      currentIssue: 'A few students transitioning from rural feeder primary schools hesitate with English terminology in Physics.',
      actionItem: 'Provide printed bilingual flash cards (Telugu-English) for all technical scientific definitions.',
      targetOwner: 'Mr. P. Srinivas & Science Lead',
      dueDate: 'Sep 15, 2026',
      progressPct: 85,
      status: 'Near Completion'
    },
    {
      id: 'imp_04',
      category: 'Student Development',
      priority: 'Medium Priority',
      area: 'Public Speaking & English Debating Confidence in Assemblies',
      currentIssue: 'Students excel in written tests but show stage hesitation during morning assembly presentations.',
      actionItem: 'Implement daily rotation 2-minute "Student Thought & Discovery Talk" during morning assembly.',
      targetOwner: 'Mr. M. Ramesh (English Lead) & Cultural Committee',
      dueDate: 'Sep 20, 2026',
      progressPct: 70,
      status: 'In Progress'
    },
    {
      id: 'imp_05',
      category: 'Incident & Safety Monitoring',
      priority: 'Continuous',
      area: 'School Bus Real-time GPS Tracker Parent Notification Gateway',
      currentIssue: 'Parents requested automated SMS when school bus is 2 stops away in morning/evening.',
      actionItem: 'Calibrate telematics SMS gateway with local cellular provider for route #1, #2, and #3.',
      targetOwner: 'Transport In-charge & Tech Lead',
      dueDate: 'Sep 30, 2026',
      progressPct: 90,
      status: 'Testing Stage'
    }
  ],

  /* ==========================================================================
     STUDENT HIGH-IMPACT MODULES: STUDY VAULT & HOMEWORK
     ========================================================================== */
  studyVault: [
    {
      id: 'vault_01',
      subject: '📐 Mathematics',
      title: 'Mensuration & 3D Geometry Formula Reference & 5-Yr Solved Problems',
      standard: 'Class VIII & IX',
      chapter: 'Ch 9: Area and Volumes',
      fileType: 'PDF Document',
      size: '2.4 MB',
      downloads: 148,
      verifiedBy: 'Mrs. S. Radhika (HOD Maths)',
      badge: 'High Yield',
      description: 'Comprehensive formula cheat-sheet with step-by-step solutions for 4-mark word problems on cylinders, cones, and spheres.'
    },
    {
      id: 'vault_02',
      subject: '🔬 Physical Science',
      title: 'Ray Optics: Mirror & Lens Diagram Construction Master Guide',
      standard: 'Class VIII & X',
      chapter: 'Ch 5: Reflection of Light',
      fileType: 'PDF Document',
      size: '3.1 MB',
      downloads: 192,
      verifiedBy: 'Mr. P. Ramesh (Physics)',
      badge: 'Board Favorite',
      description: 'Precise ray diagrams for concave and convex mirrors with focal length calculation formulas and sign convention rules.'
    },
    {
      id: 'vault_03',
      subject: '🌿 Biological Science',
      title: 'Plant Tissue & Human Organ Systems Visual Diagrams with Labels',
      standard: 'Class VIII',
      chapter: 'Ch 4: Plant & Animal Tissues',
      fileType: 'PDF Document',
      size: '4.2 MB',
      downloads: 110,
      verifiedBy: 'Mrs. V. Latha (Biology)',
      badge: 'Diagram Bank',
      description: 'High-resolution histology diagrams with exact Telangana SCERT labeling guidelines for SA1 5-mark diagram questions.'
    },
    {
      id: 'vault_04',
      subject: '🏛️ Social Studies',
      title: 'Telangana Rivers, Projects & Mineral Resources Map Work Kit',
      standard: 'Class VIII–X',
      chapter: 'Ch 3: Rivers of Telangana',
      fileType: 'PDF Document',
      size: '1.8 MB',
      downloads: 215,
      verifiedBy: 'Mr. N. Srinivas (Social Studies)',
      badge: 'Map Kit',
      description: 'Complete blank and solved Telangana outline maps detailing Godavari, Krishna rivers, and major irrigation projects.'
    },
    {
      id: 'vault_05',
      subject: '📖 English Language',
      title: 'Formal Letter Writing, Notice & Diary Entry Formats with Examples',
      standard: 'Class VIII',
      chapter: 'Unit 2: Creative Writing',
      fileType: 'PDF Document',
      size: '1.2 MB',
      downloads: 176,
      verifiedBy: 'Mr. M. Venkat (English)',
      badge: 'Grammar Guide',
      description: 'Standard SCERT evaluation rubrics, high-scoring vocabulary, and sample essays on Telangana heritage and environmental conservation.'
    }
  ],

  studentHomeworkList: [
    {
      id: 'hw_01',
      subject: '📐 Mathematics',
      title: 'Exercise 9.2: Surface Area of Combination Solids (Q 1 to 8)',
      assignedDate: 'Sep 01, 2026',
      dueDate: 'Sep 03, 2026 (Tomorrow, 9:00 AM)',
      teacher: 'Mrs. S. Radhika',
      status: 'Pending Submission',
      maxMarks: 10,
      instructions: 'Solve all 8 word problems in your homework notebook showing given data, formula, and units clearly.'
    },
    {
      id: 'hw_02',
      subject: '🔬 Physical Science',
      title: 'Lab Record Writeup: Concave Mirror Focal Length by UV Method',
      assignedDate: 'Aug 31, 2026',
      dueDate: 'Sep 02, 2026 (Today, 4:00 PM)',
      teacher: 'Mr. P. Ramesh',
      status: 'Submitted Online',
      submissionTime: 'Sep 02, 2026 at 11:15 AM',
      maxMarks: 10,
      instructions: 'Submit clear photos of tabular columns with 5 observation readings and focal length graph.'
    },
    {
      id: 'hw_03',
      subject: '🏛️ Social Studies',
      title: 'Map Plotting: 10 Major Dam Projects in Telangana & Andhra',
      assignedDate: 'Aug 28, 2026',
      dueDate: 'Aug 30, 2026',
      teacher: 'Mr. N. Srinivas',
      status: 'Graded (10/10)',
      gradedDate: 'Aug 31, 2026',
      maxMarks: 10,
      score: 10,
      feedback: 'Exemplary cartographic precision! Legend and labeling are exceptionally neat.'
    }
  ],

  /* ==========================================================================
     COMPETITIVE EXAMS & OLYMPIAD CORNER
     ========================================================================== */
  olympiadExams: [
    {
      id: 'olympiad_01',
      name: 'NMMS (National Means-cum-Merit Scholarship)',
      body: 'State Council of Educational Research & Training (SCERT Telangana)',
      eligibility: 'Class VIII Students (Scored 55%+ in Class VII)',
      scholarship: '₹12,000 per year (₹1,000/month from Class IX to XII)',
      examDate: 'Nov 22, 2026',
      deadline: 'Oct 15, 2026',
      pattern: 'Paper 1: Mental Ability Test (MAT 90 Qs) • Paper 2: Scholastic Aptitude Test (SAT 90 Qs)',
      status: 'Registrations Open at School Office'
    },
    {
      id: 'olympiad_02',
      name: 'TSSTSE (Telangana State Science Talent Search)',
      body: 'Telangana Academy of Sciences & Dept of School Education',
      eligibility: 'Classes VIII, IX, and X',
      scholarship: 'Gold Medal + ₹5,000 Cash Grant + Free Science Lab Mentorship',
      examDate: 'Dec 14, 2026',
      deadline: 'Nov 05, 2026',
      pattern: '60 Objective MCQs (Physics 20, Chemistry 20, Biology 20)',
      status: 'Mock Training Ongoing'
    },
    {
      id: 'olympiad_03',
      name: 'SOF International Mathematics Olympiad (IMO)',
      body: 'Science Olympiad Foundation (SOF)',
      eligibility: 'Classes 1 to 10',
      scholarship: 'International Rank Medals + Cash Awards up to ₹50,000',
      examDate: 'Dec 03, 2026',
      deadline: 'Oct 30, 2026',
      pattern: '50 Questions: Logical Reasoning, Mathematical Reasoning, Everyday Math, Achievers Section',
      status: 'Open for Enrollment'
    }
  ],

  olympiadQuizPractice: [
    {
      id: 'q1',
      question: 'Find the next number in the series: 3, 7, 15, 31, 63, ?',
      options: ['125', '127', '129', '131'],
      correctIndex: 1,
      explanation: 'Pattern is (previous number × 2) + 1. (63 × 2) + 1 = 126 + 1 = 127.'
    },
    {
      id: 'q2',
      question: 'Which of the following is the longest river flowing entirely within Telangana?',
      options: ['Krishna', 'Manjeera', 'Musi', 'Godavari tributary'],
      correctIndex: 1,
      explanation: 'Manjeera is a major tributary of the Godavari that flows extensively across Telangana and supplies drinking water to Singur.'
    },
    {
      id: 'q3',
      question: 'A solid metallic sphere of radius 6 cm is melted and recast into small spheres of radius 2 cm. How many small spheres are formed?',
      options: ['9', '18', '27', '36'],
      correctIndex: 2,
      explanation: 'Volume ratio = (R / r)³ = (6 / 2)³ = 3³ = 27 small spheres.'
    }
  ],

  /* ==========================================================================
     SCHOOL MANAGEMENT: TEACHER PROXY & TIMETABLE SUBSTITUTION ENGINE
     ========================================================================== */
  proxySubstitutionSystem: {
    todayDate: 'Wednesday, September 02, 2026',
    teachersOnLeave: [
      {
        id: 'staff_leave_01',
        teacherName: 'Mr. N. Srinivas',
        subject: 'Social Studies',
        periodsAffected: [
          { period: 'Period 3 (11:00 AM - 11:45 AM)', class: 'Class VIII Section A', room: 'Room 204' },
          { period: 'Period 6 (02:00 PM - 02:45 PM)', class: 'Class IX Section B', room: 'Room 302' }
        ],
        reason: 'Attending MEO Workshop at Siddipet Collectorate'
      },
      {
        id: 'staff_leave_02',
        teacherName: 'Mrs. K. Sunitha',
        subject: 'Telugu',
        periodsAffected: [
          { period: 'Period 5 (01:15 PM - 02:00 PM)', class: 'Class VII Section A', room: 'Room 105' }
        ],
        reason: 'Casual Medical Leave'
      }
    ],
    allocatedProxies: [
      {
        id: 'proxy_01',
        period: 'Period 3',
        time: '11:00 AM - 11:45 AM',
        targetClass: 'Class VIII Section A',
        originalTeacher: 'Mr. N. Srinivas (Social)',
        assignedProxyTeacher: 'Mrs. S. Radhika (Maths/Class Teacher)',
        topicCovered: 'Mathematics Speed Drill & Remedial Worksheet on Surface Areas',
        status: 'Duty Confirmed',
        notifiedVia: 'In-App & SMS'
      },
      {
        id: 'proxy_02',
        period: 'Period 5',
        time: '01:15 PM - 02:00 PM',
        targetClass: 'Class VII Section A',
        originalTeacher: 'Mrs. K. Sunitha (Telugu)',
        assignedProxyTeacher: 'Mr. P. Ramesh (Physical Science)',
        topicCovered: 'Science Quiz & Interactive Library Reading',
        status: 'Duty Confirmed',
        notifiedVia: 'In-App'
      },
      {
        id: 'proxy_03',
        period: 'Period 6',
        time: '02:00 PM - 02:45 PM',
        targetClass: 'Class IX Section B',
        originalTeacher: 'Mr. N. Srinivas (Social)',
        assignedProxyTeacher: 'Mr. M. Venkat (English)',
        topicCovered: 'Creative Writing & Spell Bee Elimination Round',
        status: 'Standby / Scheduled',
        notifiedVia: 'Pending Confirmation'
      }
    ],
    availableFreeTeachersToday: [
      { name: 'Mrs. S. Radhika', subject: 'Maths', freePeriods: ['Period 3', 'Period 7'] },
      { name: 'Mr. P. Ramesh', subject: 'Physics', freePeriods: ['Period 4', 'Period 5'] },
      { name: 'Mr. M. Venkat', subject: 'English', freePeriods: ['Period 2', 'Period 6'] },
      { name: 'Mrs. V. Latha', subject: 'Biology', freePeriods: ['Period 1', 'Period 8'] }
    ]
  },

  /* ==========================================================================
     SCHOOL MANAGEMENT: CCE REPORT CARD & EXAM HALL TICKET TEMPLATES
     ========================================================================== */
  cceReportCardData: {
    schoolName: 'VIKAS GRAMMAR SCHOOL HS CHERIAL',
    schoolAddress: 'Cheriyal Mandal, Siddipet District, Telangana — 506223',
    udiseCode: '36182100637',
    affiliation: 'Telangana State Board of Secondary Education (BSE Telangana)',
    academicYear: '2026–2027',
    term: 'Summative Assessment - I (SA 1)',
    student: {
      name: 'Rahul Reddy',
      admissionNo: 'VGS-2022-084',
      rollNo: 'VIII-014',
      classSection: 'Class VIII Section A',
      dob: '14-08-2012',
      fatherName: 'Mr. R. Ramachandra Reddy',
      motherName: 'Mrs. R. Lakshmi',
      attendanceDays: '82 / 85 Days (96.5%)'
    },
    subjectMarks: [
      { subject: 'First Language (Telugu)', fa1: 19, fa2: 19, fa3: 18, fa4: 19, sa1: 74, total100: 93, gpa: 9.3, grade: 'A1' },
      { subject: 'Second Language (Hindi)', fa1: 18, fa2: 17, fa3: 19, fa4: 18, sa1: 72, total100: 90, gpa: 9.0, grade: 'A1' },
      { subject: 'Third Language (English)', fa1: 19, fa2: 19, fa3: 19, fa4: 20, sa1: 75, total100: 94, gpa: 9.4, grade: 'A1' },
      { subject: 'Mathematics', fa1: 19, fa2: 20, fa3: 18, fa4: 19, sa1: 76, total100: 96, gpa: 9.6, grade: 'A1' },
      { subject: 'Physical Science', fa1: 19, fa2: 18, fa3: 19, fa4: 19, sa1: 75, total100: 95, gpa: 9.5, grade: 'A1' },
      { subject: 'Biological Science', fa1: 18, fa2: 19, fa3: 19, fa4: 18, sa1: 74, total100: 93, gpa: 9.3, grade: 'A1' },
      { subject: 'Social Studies', fa1: 19, fa2: 18, fa3: 18, fa4: 19, sa1: 73, total100: 92, gpa: 9.2, grade: 'A1' }
    ],
    coCurricular: [
      { area: 'Value Education & Life Skills', grade: 'A+' },
      { area: 'Art & Cultural Education', grade: 'A' },
      { area: 'Work & Computer Education', grade: 'A+' },
      { area: 'Physical, Health & Yoga Education', grade: 'A+' }
    ],
    overallGpa: 9.33,
    overallGrade: 'A1 (Outstanding)',
    classRank: '2nd in Class VIII A (out of 42 students)',
    classTeacherRemarks: 'Exceptionally diligent student with strong analytical skills in STEM. Cooperative and humble in peer interactions.',
    headmasterRemarks: 'Exemplary academic and moral track record. Highly recommended for National Means-cum-Merit Scholarship (NMMS).'
  },

  hallTicketData: {
    examTitle: 'BSE TELANGANA STATE BOARD PREP / SA-I EXAMINATION 2026',
    schoolName: 'Vikas Grammar School HS Cherial',
    hallTicketNo: 'HT-2026-VIII-014',
    studentName: 'RAHUL REDDY',
    fatherName: 'R. RAMACHANDRA REDDY',
    class: 'Class VIII Section A',
    examinationCenter: 'VGS Main Campus Hall #2, Cheriyal (Code: 637)',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80',
    barcode: '|||||||||||||||||||||||||||||||||||||||||',
    schedule: [
      { date: 'Sep 14, 2026', day: 'Monday', time: '09:30 AM - 12:15 PM', subject: 'First Language (Telugu)' },
      { date: 'Sep 15, 2026', day: 'Tuesday', time: '09:30 AM - 12:15 PM', subject: 'Second Language (Hindi)' },
      { date: 'Sep 16, 2026', day: 'Wednesday', time: '09:30 AM - 12:15 PM', subject: 'Third Language (English)' },
      { date: 'Sep 17, 2026', day: 'Thursday', time: '09:30 AM - 12:15 PM', subject: 'Mathematics' },
      { date: 'Sep 18, 2026', day: 'Friday', time: '09:30 AM - 12:15 PM', subject: 'General Science (Physical & Bio)' },
      { date: 'Sep 19, 2026', day: 'Saturday', time: '09:30 AM - 12:15 PM', subject: 'Social Studies' }
    ],
    instructions: [
      'Candidates must be present in the examination room 15 minutes before commencement.',
      'Electronic gadgets, mobile phones, and calculators are strictly prohibited inside the hall.',
      'Carry this Hall Ticket along with school ID card on all exam days.'
    ]
  }
};

