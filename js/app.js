/* ==========================================================================
   EDUPULSE SCHOOL OS v4.0 — COMPLETE APPLICATION ROUTER & STATE CONTROLLER
   UDISE Code: 36182100637 | Vikas Grammar School HS Cherial, Telangana
   Full 100% responsive, zero-truncation, rock-solid event controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  let activeRole = 'principal';
  let activeCceTab = 'report_card';
  let activeVaultSubject = 'All';

  const sidebar = document.getElementById('sidebar');
  const sidebarNavList = document.getElementById('sidebarNavList');
  const contentViewport = document.getElementById('contentViewport');
  const themeLightBtn = document.getElementById('themeLightBtn');
  const themeDarkBtn = document.getElementById('themeDarkBtn');
  const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
  const userName = document.getElementById('userName');
  const userRole = document.getElementById('userRole');

  const aiDrawer = document.getElementById('aiDrawer');
  const aiDrawerOverlay = document.getElementById('aiDrawerOverlay');
  const closeAiDrawerBtn = document.getElementById('closeAiDrawerBtn');

  initApp();

  function initApp() {
    setupEventListeners();
    switchRolePersonality('principal');
  }

  function setupEventListeners() {
    window.handleNavClick = handleNavClick;
    window.switchTeacherFeedbackTab = function(tab) {
      activeTeacherTab = tab;
      renderTeacherFeedbackScreen();
    };
    window.switchPrincipalFeedbackTab = function(tab) {
      activePrincipalTab = tab;
      renderPrincipalFeedbackOversightScreen();
    };
    window.acknowledgeFeedbackAsParent = function(id) {
      const item = MOCK_DATA.teacherStudentFeedbacks.find(x => x.id === id);
      if (item) {
        const noteInput = document.getElementById(`parentNoteInput_${id}`);
        const noteText = noteInput?.value ? noteInput.value.trim() : 'Reviewed and acknowledged by parent.';
        item.parentAcknowledged = true;
        item.parentNote = noteText;
        const now = new Date();
        item.acknowledgedDate = `Sep 02, 2026 at ${now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`;
        showToast(`Feedback acknowledged! Your reply was delivered to ${item.teacherName} and Principal.`);
        renderParentTeacherFeedbackScreen();
      }
    };
    window.principalAcknowledgeStudent = function(id) {
      const item = MOCK_DATA.studentClassFeedbacks.find(x => x.id === id);
      if (item) {
        item.principalStatus = 'Acknowledged by Headmaster';
        item.principalRemarks = 'Reviewed by Headmaster K. Rajesham. Excellent progress noted.';
        showToast('Acknowledged student feedback!');
        renderPrincipalFeedbackOversightScreen();
      }
    };
    window.plugSubjectGap = function(subjectName) {
      const student = MOCK_DATA.gpaSubjectDiagnostics[0];
      const sub = student.subjects.find(s => s.subject === subjectName);
      if (sub) {
        sub.gapStatus = 'Plugged Successfully';
        showToast(`Remedial action verified! Learning gap plugged for ${subjectName}.`);
        renderGpaDiagnosticsScreen(activeRole);
      }
    };
    window.advanceImprovementAction = function(id) {
      const item = MOCK_DATA.whereToImprove.find(x => x.id === id);
      if (item) {
        if (item.progressPct < 100) {
          item.progressPct = Math.min(100, item.progressPct + 10);
          if (item.progressPct === 100) item.status = 'Fully Accomplished';
          showToast(`Updated progress on ${item.area} to ${item.progressPct}%!`);
          renderInstitutionalDiagnosticScreen();
        } else {
          showToast('Action item is already fully accomplished!');
        }
      }
    };
    window.switchMethodologyTab = function(tab) {
      activeMethodologyTab = tab;
      renderMethodologySatisfactionScreen(activeRole);
    };
    window.switchRelationsTab = function(tab) {
      activeRelationsTab = tab;
      renderRelationsAndConductScreen(activeRole);
    };
    window.switchFacilitiesTab = function(tab) {
      activeFacilitiesTab = tab;
      renderFacilitiesIncidentsScreen(activeRole);
    };
    window.switchCceTab = function(tab) {
      activeCceTab = tab;
      renderCceReportCardScreen();
    };
    window.filterVaultSubject = function(subj) {
      activeVaultSubject = subj;
      renderStudyVaultScreen();
    };
    window.downloadVaultMaterial = function(id) {
      const item = MOCK_DATA.studyVault.find(x => x.id === id);
      if (item) {
        item.downloads += 1;
        showToast(`Downloading "${item.title}" (${item.size}). File saved!`);
        renderStudyVaultScreen();
      }
    };
    window.submitHomeworkOnline = function(id) {
      const item = MOCK_DATA.studentHomeworkList.find(x => x.id === id);
      if (item) {
        item.status = 'Submitted Online';
        const now = new Date();
        item.submissionTime = `Sep 02, 2026 at ${now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`;
        showToast(`Homework for ${item.subject} submitted successfully! Teacher notified.`);
        renderStudentHomeworkScreen();
      }
    };
    window.selectOlympiadOption = function(qId, selectedIdx) {
      const q = MOCK_DATA.olympiadQuizPractice.find(x => x.id === qId);
      if (!q) return;
      const opts = document.querySelectorAll(`[data-quiz-opt="${qId}"]`);
      opts.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.correctIndex) {
          btn.classList.add('correct');
        } else if (idx === selectedIdx) {
          btn.classList.add('wrong');
        }
      });
      const expDiv = document.getElementById(`quizExp_${qId}`);
      if (expDiv) {
        expDiv.style.display = 'block';
      }
      if (selectedIdx === q.correctIndex) {
        showToast('🎯 Correct answer! +4 Marks awarded.');
      } else {
        showToast('Incorrect option. Review the detailed explanation below.');
      }
    };
    window.assignProxyTeacher = function(leaveId, periodStr, proxyTeacherName) {
      MOCK_DATA.proxySubstitutionSystem.allocatedProxies.push({
        id: `proxy_${Date.now()}`,
        period: periodStr,
        time: 'Today',
        targetClass: 'Class Covered',
        originalTeacher: 'Staff on Leave',
        assignedProxyTeacher: proxyTeacherName,
        topicCovered: 'Classroom Mentoring & Revision Worksheets',
        status: 'Duty Confirmed',
        notifiedVia: 'Automated In-App SMS'
      });
      showToast(`Proxy duty confirmed! ${proxyTeacherName} assigned to cover ${periodStr}.`);
      renderProxySubstitutionScreen();
    };
    window.printCceCard = function() {
      window.print();
    };

    // Role Pills Switcher in Top Navbar
    document.querySelectorAll('.role-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.role-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeRole = btn.getAttribute('data-role');
        switchRolePersonality(activeRole);
      });
    });

    // Theme Switchers
    themeLightBtn?.addEventListener('click', () => {
      document.body.className = `theme-light role-${activeRole}`;
      themeLightBtn.classList.add('active');
      themeDarkBtn.classList.remove('active');
    });

    themeDarkBtn?.addEventListener('click', () => {
      document.body.className = `theme-dark role-${activeRole}`;
      themeDarkBtn.classList.add('active');
      themeLightBtn.classList.remove('active');
    });

    // Sidebar Responsive Collapse Toggle
    sidebarCollapseBtn?.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      document.querySelector('.main-wrapper').classList.toggle('expanded');
    });

    // AI Drawer Open/Close Controls
    const openAiDrawerBtn = document.getElementById('openAiDrawerBtn');
    openAiDrawerBtn?.addEventListener('click', () => {
      aiDrawer?.classList.add('active');
      aiDrawerOverlay?.classList.add('active');
    });
    closeAiDrawerBtn?.addEventListener('click', closeAiDrawer);
    aiDrawerOverlay?.addEventListener('click', closeAiDrawer);

    // AI Copilot Chat Handling
    const aiPromptForm = document.getElementById('aiPromptForm');
    const aiPromptInput = document.getElementById('aiPromptInput');
    const aiChatBody = document.getElementById('aiChatBody');
    aiPromptForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = aiPromptInput?.value.trim();
      if (!q || !aiChatBody) return;
      aiPromptInput.value = '';

      const userMsg = document.createElement('div');
      userMsg.className = 'ai-message user';
      userMsg.innerHTML = `<p>${q}</p>`;
      aiChatBody.appendChild(userMsg);

      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'ai-message assistant';
        botMsg.innerHTML = `<p><strong>Vikas AI Assistant:</strong> In response to "<em>${q}</em>" — Operational metrics for Vikas Grammar School HS Cherial (UDISE: 36182100637) are synchronized. All 11 institutional quality pillars are on track.</p>`;
        aiChatBody.appendChild(botMsg);
        aiChatBody.scrollTop = aiChatBody.scrollHeight;
      }, 400);
    });

    // Global Search Handler
    const globalSearchInput = document.getElementById('globalSearchInput');
    globalSearchInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = globalSearchInput.value.trim();
        if (query) {
          showToast(`Searching Vikas Grammar School records for "${query}"...`);
        }
      }
    });

    // Notification Center Event Listeners
    const notifBtn = document.getElementById('notifBtn');
    const notifDropdown = document.getElementById('notifDropdown');
    const markAllReadBtn = document.getElementById('markAllReadBtn');

    notifBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown?.classList.toggle('active');
      renderNotificationsList();
    });

    document.addEventListener('click', (e) => {
      if (notifDropdown && !notifDropdown.contains(e.target) && !notifBtn?.contains(e.target)) {
        notifDropdown.classList.remove('active');
      }
    });


    markAllReadBtn?.addEventListener('click', () => {
      MOCK_DATA.notificationsList.forEach(n => n.unread = false);
      renderNotificationsList();
      showToast('All notifications marked as read!');
    });

    renderNotificationsList();
  }

  function renderNotificationsList() {
    const list = MOCK_DATA.notificationsList;
    const notifListContainer = document.getElementById('notifList');
    const notifBadgeDot = document.getElementById('notifBadgeDot');

    const unreadCount = list.filter(n => n.unread).length;
    if (notifBadgeDot) {
      notifBadgeDot.textContent = unreadCount;
      notifBadgeDot.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
    }

    if (!notifListContainer) return;

    if (list.length === 0) {
      notifListContainer.innerHTML = `<div style="padding:20px; text-align:center; color:var(--text-muted); font-size:0.85rem;">No new notifications</div>`;
      return;
    }

    notifListContainer.innerHTML = list.map(n => `
      <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="handleNotifClick('${n.id}', '${n.actionView}')">
        <div class="notif-item-icon" style="background:${n.type === 'leave' ? '#eff6ff' : n.type === 'fees' ? '#ecfdf5' : n.type === 'transport' ? '#fff7ed' : '#f3e8ff'}; color:${n.type === 'leave' ? '#3b82f6' : n.type === 'fees' ? '#10b981' : n.type === 'transport' ? '#f97316' : '#a855f7'};">
          <i data-lucide="${n.type === 'leave' ? 'file-text' : n.type === 'fees' ? 'indian-rupee' : n.type === 'transport' ? 'bus' : 'bell'}"></i>
        </div>
        <div class="notif-item-content">
          <div class="notif-item-title">${n.title}</div>
          <div class="notif-item-msg">${n.message}</div>
          <div class="notif-item-time">${n.time}</div>
        </div>
      </div>
    `).join('');


    refreshLucideIcons();
  }

  window.handleNotifClick = function(id, actionView) {
    const item = MOCK_DATA.notificationsList.find(n => n.id === id);
    if (item) {
      item.unread = false;
      document.getElementById('notifDropdown')?.classList.remove('active');
      renderNotificationsList();
      if (actionView) {
        handleNavClick(actionView);
      }
    }
  };


  function switchRolePersonality(role) {
    document.body.className = `theme-light role-${role}`;
    renderRoleSidebarNav(role);

    if (role === 'principal') {
      userName.textContent = 'K. Rajesham';
      userRole.textContent = 'Headmaster';
      renderPrincipalDashboardScreen();
    } else if (role === 'teacher') {
      userName.textContent = 'Mrs. S. Radhika';
      userRole.textContent = 'Class Teacher (VIII A)';
      renderTeacherDashboardScreen();
    } else if (role === 'student') {
      userName.textContent = 'Rahul Reddy';
      userRole.textContent = 'Student (Class VIII A)';
      renderStudentDashboardScreen();
    } else if (role === 'parent') {
      userName.textContent = 'Parent of Rahul Reddy';
      userRole.textContent = 'Parent';
      renderParentDashboardScreen();
    }
  }

  /* SIDEBAR NAVIGATION MATRIX */
  function renderRoleSidebarNav(role) {
    let items = [];

    if (role === 'principal') {
      items = [
        { id: 'dashboard', label: 'Dashboard', icon: 'layout-grid' },
        { id: 'institutional_diagnostic', label: 'Where We Stand & Improve', icon: 'trending-up' },
        { id: 'cce_report_cards', label: 'SCERT CCE Report & Hall Ticket', icon: 'file-text' },
        { id: 'proxy_substitution', label: 'Teacher Proxy & Substitution', icon: 'shuffle' },
        { id: 'feedback_oversight', label: 'Daily Feedback Oversight', icon: 'message-square' },
        { id: 'principal_gpa_analytics', label: 'GPA & Academic Gaps', icon: 'award' },
        { id: 'study_vault', label: 'Curriculum & Study Vault', icon: 'folder-down' },
        { id: 'methodology_satisfaction', label: 'Methodology & Satisfaction', icon: 'sparkles' },
        { id: 'relations_climate', label: 'Teacher-Student Relations & Conduct', icon: 'heart-handshake' },
        { id: 'facilities_incidents', label: 'Facilities & Safety Incidents', icon: 'shield-alert' },
        { id: 'pacing_diary', label: 'Syllabus Pacing & Daily Progress', icon: 'clock' },
        { id: 'admissions', label: 'Admissions & Enquiries', icon: 'user-plus' },
        { id: 'students', label: 'Students Roster (Classes 1–10)', icon: 'users' },
        { id: 'academics', label: 'Academics & Board', icon: 'book-open' },
        { id: 'staff_payroll', label: 'Staff & HR Payroll', icon: 'user-check' },
        { id: 'timetable', label: 'Master Timetables Matrix', icon: 'calendar' },
        { id: 'fees', label: 'Fee Collection Ledger', icon: 'indian-rupee' },
        { id: 'transport', label: 'Transport & Fleet', icon: 'bus' },
        { id: 'library', label: 'School Library', icon: 'book-marked' },
        { id: 'calendar', label: 'School Holiday Calendar', icon: 'calendar' }
      ];
    } else if (role === 'teacher') {
      items = [
        { id: 'dashboard', label: 'Teacher Workspace', icon: 'layout-grid' },
        { id: 'proxy_substitution', label: 'Proxy Duty & Substitutions', icon: 'shuffle' },
        { id: 'student_homework', label: 'Homework & Submissions', icon: 'check-square' },
        { id: 'study_vault', label: 'Study Vault & Resources', icon: 'folder-down' },
        { id: 'teacher_feedback', label: 'Daily Class & Student Feedback', icon: 'message-square' },
        { id: 'teacher_behaviour', label: 'Student 360° Conduct & Behaviour', icon: 'heart-handshake' },
        { id: 'teacher_gpa_gaps', label: 'GPA & Learning Gaps Plugging', icon: 'award' },
        { id: 'pacing_diary', label: 'Syllabus Pacing & Daily Diary', icon: 'clock' },
        { id: 'teacher_methodology', label: 'Teaching Methodology Review', icon: 'sparkles' },
        { id: 'teacher_report_incident', label: 'Facilities & Safety Incidents', icon: 'shield-alert' },
        { id: 'my_students', label: 'My Class Students (360°)', icon: 'users' },
        { id: 'teacher_attendance', label: 'My Teacher Attendance', icon: 'check-circle' },
        { id: 'timetable', label: 'My Teaching Schedule', icon: 'clock' },
        { id: 'student_leave_approvals', label: 'Student Leave Approvals', icon: 'file-text' },
        { id: 'teacher_salary', label: 'My Salary & Payslips', icon: 'indian-rupee' },
        { id: 'calendar', label: 'School Holiday Calendar', icon: 'calendar' }
      ];
    } else if (role === 'student') {
      items = [
        { id: 'dashboard', label: 'Student Portal', icon: 'layout-grid' },
        { id: 'study_vault', label: 'Digital Study Vault & Notes', icon: 'folder-down' },
        { id: 'student_homework', label: 'My Homework & Turn-In', icon: 'check-square' },
        { id: 'olympiad_corner', label: 'Scholarships & Olympiad Prep', icon: 'trophy' },
        { id: 'my_cce_card', label: 'My CCE Grade Card & Hall Ticket', icon: 'file-text' },
        { id: 'student_daily_feedback', label: 'Daily Class Feedback', icon: 'message-square-plus' },
        { id: 'student_gpa_gaps', label: 'My GPA & Learning Gaps', icon: 'award' },
        { id: 'student_methodology_opinion', label: 'Teaching Method Opinion', icon: 'sparkles' },
        { id: 'pacing_diary', label: 'Class Pacing & Today\'s Diary', icon: 'clock' },
        { id: 'student_facilities_feedback', label: 'Campus Amenities & Facilities', icon: 'coffee' },
        { id: 'student_report_incident', label: 'Safety & Incident Report', icon: 'shield-alert' },
        { id: 'timetable', label: 'My Class Timetable', icon: 'calendar' },
        { id: 'my_fees', label: 'My Fee Breakdown', icon: 'indian-rupee' },
        { id: 'student_apply_leave', label: 'Submit Leave Request', icon: 'file-text' },
        { id: 'bus_info', label: 'My Bus Route & Timing', icon: 'bus' },
        { id: 'calendar', label: 'School Holiday Calendar', icon: 'calendar' }
      ];
    } else if (role === 'parent') {
      items = [
        { id: 'dashboard', label: 'Child Overview', icon: 'layout-grid' },
        { id: 'my_cce_card', label: 'Child CCE Report & Hall Ticket', icon: 'file-text' },
        { id: 'student_homework', label: 'Homework Submissions', icon: 'check-square' },
        { id: 'olympiad_corner', label: 'Scholarships & Olympiad Corner', icon: 'trophy' },
        { id: 'teacher_feedback_parent', label: "Teacher's Daily Feedback", icon: 'message-circle' },
        { id: 'parent_child_behaviour', label: 'Child 360° Conduct & Behaviour', icon: 'heart-handshake' },
        { id: 'parent_gpa_gaps', label: 'Subject GPA & Learning Gaps', icon: 'award' },
        { id: 'pacing_diary', label: 'Class Pacing & Syllabus Coverage', icon: 'clock' },
        { id: 'parent_facilities_safety', label: 'Campus Hygiene & Safety Log', icon: 'shield-alert' },
        { id: 'child_attendance', label: 'Child Attendance & Performance', icon: 'user-check' },
        { id: 'parent_apply_leave', label: 'Apply Child Leave', icon: 'file-text' },
        { id: 'pay_fee', label: 'Pay School Fee', icon: 'indian-rupee' },
        { id: 'bus_tracking', label: 'Child Bus Tracking', icon: 'bus' },
        { id: 'calendar', label: 'School Holiday Calendar', icon: 'calendar' }
      ];
    }

    sidebarNavList.innerHTML = items.map((item, idx) => `
      <li class="nav-item">
        <button class="nav-btn ${idx === 0 ? 'active' : ''}" data-view="${item.id}">
          <div class="nav-btn-left">
            <i data-lucide="${item.icon}"></i>
            <span>${item.label}</span>
          </div>
        </button>
      </li>
    `).join('');

    sidebarNavList.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sidebarNavList.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const view = btn.getAttribute('data-view');
        handleNavClick(view);
      });
    });

    refreshLucideIcons();
  }

  /* NAV ROUTER CONTROLLER */
  function handleNavClick(viewId) {
    if (viewId === 'dashboard') {
      if (activeRole === 'principal') renderPrincipalDashboardScreen();
      else if (activeRole === 'teacher') renderTeacherDashboardScreen();
      else if (activeRole === 'student') renderStudentDashboardScreen();
      else if (activeRole === 'parent') renderParentDashboardScreen();
    } else if (viewId === 'institutional_diagnostic') {
      renderInstitutionalDiagnosticScreen();
    } else if (viewId === 'feedback_oversight') {
      renderPrincipalFeedbackOversightScreen();
    } else if (viewId === 'teacher_feedback') {
      renderTeacherFeedbackScreen();
    } else if (viewId === 'student_daily_feedback') {
      renderStudentDailyFeedbackScreen();
    } else if (viewId === 'teacher_feedback_parent') {
      renderParentTeacherFeedbackScreen();
    } else if (viewId === 'principal_gpa_analytics' || viewId === 'teacher_gpa_gaps' || viewId === 'student_gpa_gaps' || viewId === 'parent_gpa_gaps') {
      renderGpaDiagnosticsScreen(activeRole);
    } else if (viewId === 'methodology_satisfaction' || viewId === 'teacher_methodology' || viewId === 'student_methodology_opinion') {
      renderMethodologySatisfactionScreen(activeRole);
    } else if (viewId === 'relations_climate' || viewId === 'teacher_behaviour' || viewId === 'parent_child_behaviour') {
      renderRelationsAndConductScreen(activeRole);
    } else if (viewId === 'facilities_incidents' || viewId === 'teacher_report_incident' || viewId === 'student_facilities_feedback' || viewId === 'student_report_incident' || viewId === 'parent_facilities_safety') {
      renderFacilitiesIncidentsScreen(activeRole);
    } else if (viewId === 'pacing_diary' || viewId === 'teacher_syllabus_pacing') {
      renderClassPacingDiaryScreen(activeRole);
    } else if (viewId === 'study_vault') {
      renderStudyVaultScreen();
    } else if (viewId === 'student_homework' || viewId === 'homework' || viewId === 'child_homework') {
      renderStudentHomeworkScreen();
    } else if (viewId === 'olympiad_corner') {
      renderOlympiadScreen();
    } else if (viewId === 'proxy_substitution') {
      renderProxySubstitutionScreen();
    } else if (viewId === 'cce_report_cards' || viewId === 'my_cce_card') {
      renderCceReportCardScreen();
    } else if (viewId === 'admissions' || viewId === 'admissions_enquiries' || viewId === 'admissions_forms' || viewId === 'admissions_tests') {
      renderAdmissionsScreen();
    } else if (viewId === 'students' || viewId === 'student_directory' || viewId === 'my_students' || viewId === 'student_lifecycle' || viewId === 'student_documents') {
      renderStudentDirectoryScreen(activeRole === 'teacher' ? 'Class VIII' : 'All');
    } else if (viewId === 'academics' || viewId === 'academics_curriculum' || viewId === 'academics_homework' || viewId === 'academics_ptm') {
      renderAcademicsScreen();
    } else if (viewId === 'staff_payroll') {
      renderStaffPayrollScreen();
    } else if (viewId === 'timetable' || viewId === 'exams_schedules' || viewId === 'exams_marks') {
      if (activeRole === 'principal') renderMasterScheduleMatrixScreen('Class VIII A');
      else if (activeRole === 'teacher') renderTeacherTimetableScreen();
      else renderStudentTimetableScreen();
    } else if (viewId === 'fees' || viewId === 'my_fees' || viewId === 'pay_fee' || viewId === 'fees_ledger' || viewId === 'fees_defaulters') {
      renderFeeLedgerScreen();
    } else if (viewId === 'transport' || viewId === 'bus_info' || viewId === 'bus_tracking') {
      renderTransportFleetScreen();
    } else if (viewId === 'library') {
      renderLibraryCatalogScreen();
    } else if (viewId === 'calendar') {
      renderHolidayCalendarScreen('All');
    } else if (viewId === 'teacher_attendance' || viewId === 'attendance_daily') {
      renderTeacherAttendanceScreen();
    } else if (viewId === 'homework' || viewId === 'child_homework') {
      renderHomeworkAssignmentsScreen();
    } else if (viewId === 'student_leave_approvals' || viewId === 'attendance_leave') {
      renderMentorLeaveApprovalScreen();
    } else if (viewId === 'teacher_salary') {
      renderTeacherSalaryScreen();
    } else if (viewId === 'student_apply_leave' || viewId === 'parent_apply_leave') {
      renderLeaveRequestFormScreen();
    } else if (viewId === 'child_attendance') {
      renderChildAttendanceScreen();
    } else {
      renderGenericView(viewId);
    }
  }

  /* ==========================================================================
     FULL SCREEN RENDERERS
     ========================================================================== */

  /* 1. PRINCIPAL DASHBOARD */
  function renderPrincipalDashboardScreen() {
    contentViewport.innerHTML = `
      <div class="hero-school-card">
        <div class="hero-text">
          <h2>Good Morning, Headmaster K. Rajesham 👋</h2>
          <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
            <span class="school-dropdown-pill">Vikas Grammar School HS Cherial • Siddipet • UDISE: 36182100637</span>
          </div>
          <p class="hero-sub">Classes 1–10 • Telangana State Board (BSE Telangana) • Est. 2004</p>
        </div>
      </div>

      <div class="stats-grid-4" style="margin-bottom:20px;">
        <div class="stat-card">
          <div class="stat-title">Total Students</div>
          <div class="stat-value">832</div>
          <span class="trend-badge trend-up-green">Classes 1–10</span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Attendance Today</div>
          <div class="stat-value">94.7%</div>
          <span class="trend-badge trend-up-blue">788 Present</span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Fees Collected (Q2)</div>
          <div class="stat-value">₹14.25 L</div>
          <span class="trend-badge trend-purple">92% Target</span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Teachers / Classrooms</div>
          <div class="stat-value">19 / 20</div>
          <span class="trend-badge trend-orange">100% On Duty</span>
        </div>
      </div>

      <div class="dashboard-main-grid">
        <div class="left-column">
          <div class="panel-card">
            <div class="panel-header">
              <h3 class="panel-title"><i data-lucide="zap" style="color:var(--emerald);"></i> Operational Quick Actions</h3>
            </div>
            <div class="quick-cards-grid">
              <div class="quick-action-card" onclick="handleNavClick('feedback_oversight')">
                <div class="quick-icon-box" style="background:#ede9fe; color:#6366f1;"><i data-lucide="message-square"></i></div>
                <span class="quick-title">Daily Feedback Center</span>
              </div>
              <div class="quick-action-card" onclick="showToast('Annual bulk promotion completed for Class VIII to Class IX!')">
                <div class="quick-icon-box" style="background:#ecfdf5; color:#10b981;"><i data-lucide="graduation-cap"></i></div>
                <span class="quick-title">Bulk Promotion</span>
              </div>
              <div class="quick-action-card" onclick="showToast('Opened Transfer Certificate (TC) Exporter!')">
                <div class="quick-icon-box" style="background:#eff6ff; color:#3b82f6;"><i data-lucide="file-text"></i></div>
                <span class="quick-title">Issue TC / Cert</span>
              </div>
              <div class="quick-action-card" onclick="showToast('Exported UDISE quarterly report dataset!')">
                <div class="quick-icon-box" style="background:#f3e8ff; color:#a855f7;"><i data-lucide="download"></i></div>
                <span class="quick-title">Export UDISE</span>
              </div>
              <div class="quick-action-card" onclick="showToast('Dispatched fee reminder SMS to 42 defaulter parents!')">
                <div class="quick-icon-box" style="background:#fff7ed; color:#f97316;"><i data-lucide="megaphone"></i></div>
                <span class="quick-title">Send SMS Alert</span>
              </div>
            </div>
          </div>
        </div>

        <div class="right-column">
          <div class="panel-card">
            <div class="panel-header">
              <h3 class="panel-title"><i data-lucide="calendar" style="color:var(--indigo);"></i> Upcoming Events</h3>
            </div>
            <div class="event-list">
              ${MOCK_DATA.upcomingEvents.map(e => `
                <div class="event-item" style="display:flex; gap:12px; align-items:center; padding:10px 0; border-bottom:1px solid var(--border-color);">
                  <div class="date-badge ${e.bg}" style="padding:6px 12px; border-radius:8px; text-align:center;">
                    <span class="date-num" style="font-size:1.1rem; font-weight:800; display:block;">${e.day}</span>
                    <span class="date-month" style="font-size:0.7rem; text-transform:uppercase;">${e.month}</span>
                  </div>
                  <div class="event-details">
                    <div class="event-title" style="font-weight:700; font-size:0.9rem;">${e.title}</div>
                    <div class="event-time" style="font-size:0.75rem; color:var(--text-muted);">${e.time}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    refreshLucideIcons();
  }

  /* 2. TEACHER DASHBOARD */
  function renderTeacherDashboardScreen() {
    contentViewport.innerHTML = `
      <!-- TEACHER QUICK FEEDBACK BANNER -->
      <div class="panel-card" style="background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%); border:1px solid #c7d2fe; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:48px; height:48px; border-radius:14px; background:var(--indigo); color:white; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(99,102,241,0.35);">
              <i data-lucide="message-square" style="width:24px; height:24px;"></i>
            </div>
            <div>
              <h3 style="font-size:1.25rem; font-weight:800; color:#1e1b4b; margin:0;">Daily Class & Student Feedback Portal</h3>
              <p style="color:#4338ca; font-size:0.85rem; font-weight:600; margin:2px 0 0 0;">Evaluate student performance (reflects to Parents) & log daily class sessions (visible to Principal)</p>
            </div>
          </div>
          <button onclick="handleNavClick('teacher_feedback')" style="padding:10px 20px; background:var(--indigo); color:white; border-radius:10px; font-weight:700; font-size:0.88rem; border:none; cursor:pointer; display:flex; align-items:center; gap:6px;">
            <i data-lucide="edit-3"></i> Open Feedback Portal →
          </button>
        </div>
      </div>
    `;
    renderTeacherTimetableScreen(true);
  }

  /* 3. STUDENT DASHBOARD */
  function renderStudentDashboardScreen() {
    const std = MOCK_DATA.studentDashboard;
    contentViewport.innerHTML = `
      <div class="student-gamified-banner" style="background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%); color:white; padding:24px; border-radius:16px; display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <div>
          <h2 style="font-size:1.8rem; font-weight:800;">Good Morning, ${std.studentName}! 🚀</h2>
          <p style="margin-top:4px; opacity:0.9;">${std.grade} • Roll No: <strong>VIII-014</strong></p>
        </div>
        <div class="streak-badge-box" style="background:rgba(255,255,255,0.2); padding:12px 20px; border-radius:12px; text-align:center;">
          <div style="font-size:1.5rem;">🔥 ${std.streak} Days</div>
          <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700;">Learning Streak</div>
        </div>
      </div>

      <!-- STUDENT DAILY CLASS FEEDBACK BANNER -->
      <div class="panel-card" style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border:1px solid #a7f3d0; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:48px; height:48px; border-radius:14px; background:#10b981; color:white; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(16,185,129,0.35);">
              <i data-lucide="message-square-plus" style="width:24px; height:24px;"></i>
            </div>
            <div>
              <h3 style="font-size:1.25rem; font-weight:800; color:#064e3b; margin:0;">Daily Class Feedback</h3>
              <p style="color:#047857; font-size:0.85rem; font-weight:600; margin:2px 0 0 0;">Rate your daily periods, pace & share doubts directly with Headmaster K. Rajesham</p>
            </div>
          </div>
          <button onclick="handleNavClick('student_daily_feedback')" style="padding:10px 20px; background:#10b981; color:white; border-radius:10px; font-weight:700; font-size:0.88rem; border:none; cursor:pointer; display:flex; align-items:center; gap:6px;">
            <i data-lucide="star"></i> Give Class Feedback →
          </button>
        </div>
      </div>
    `;
    renderStudentTimetableScreen(true);
  }

  /* 4. PARENT DASHBOARD */
  function renderParentDashboardScreen() {
    renderChildAttendanceScreen();
  }

  /* 5. ADMISSIONS & ENQUIRIES — EXACT MOCKUP MATCH */
  function renderAdmissionsScreen() {
    const leads = MOCK_DATA.admissionsLeadsList;
    const interest = MOCK_DATA.classWiseInterestList;

    contentViewport.innerHTML = `
      <!-- HERO BANNER -->
      <div class="panel-card" style="background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%); border:1px solid #c7d2fe; border-radius:16px; padding:22px; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div style="display:flex; align-items:center; gap:16px;">
            <div style="width:52px; height:52px; border-radius:16px; background:#6366f1; color:white; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(99,102,241,0.35);">
              <i data-lucide="user-check" style="width:26px; height:26px;"></i>
            </div>
            <div>
              <h2 style="font-size:1.65rem; font-weight:800; color:#1e1b4b; margin-bottom:2px;">Admissions & Inquiry Management</h2>
              <p style="color:#4338ca; font-size:0.88rem; font-weight:600;">Academic Year 2026–2027 • Vikas Grammar School HS Cherial (UDISE: 36182100637)</p>
            </div>
          </div>
          <button onclick="showToast('Opened New Admission Inquiry Form!')" style="padding:10px 22px; background:#4f46e5; color:white; border-radius:10px; font-weight:700; border:none; box-shadow:0 4px 14px rgba(79,70,229,0.3); font-size:0.88rem; cursor:pointer; display:flex; align-items:center; gap:6px;">
            + Log New Inquiry
          </button>
        </div>
      </div>

      <!-- 4 STAT CARDS GRID -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:20px;">
        
        <!-- CARD 1 -->
        <div class="panel-card" style="display:flex; align-items:center; gap:14px; padding:18px;">
          <div style="width:48px; height:48px; border-radius:14px; background:#e0e7ff; color:#4f46e5; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <i data-lucide="users" style="width:22px; height:22px;"></i>
          </div>
          <div>
            <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">Total Inquiries</div>
            <div style="font-size:1.8rem; font-weight:800; color:var(--text-primary); line-height:1.1; margin:2px 0;">142</div>
            <div style="font-size:0.75rem; font-weight:700; color:#10b981;">↑ 12% vs last month</div>
          </div>
        </div>

        <!-- CARD 2 -->
        <div class="panel-card" style="display:flex; align-items:center; gap:14px; padding:18px;">
          <div style="width:48px; height:48px; border-radius:14px; background:#dbeafe; color:#2563eb; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <i data-lucide="file-text" style="width:22px; height:22px;"></i>
          </div>
          <div>
            <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">Applications Submitted</div>
            <div style="font-size:1.8rem; font-weight:800; color:var(--text-primary); line-height:1.1; margin:2px 0;">86</div>
            <div style="font-size:0.75rem; font-weight:700; color:#10b981;">↑ 8% vs last month</div>
          </div>
        </div>

        <!-- CARD 3 -->
        <div class="panel-card" style="display:flex; align-items:center; gap:14px; padding:18px;">
          <div style="width:48px; height:48px; border-radius:14px; background:#fef3c7; color:#d97706; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <i data-lucide="star" style="width:22px; height:22px;"></i>
          </div>
          <div>
            <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">Entrance Tests Passed</div>
            <div style="font-size:1.8rem; font-weight:800; color:var(--text-primary); line-height:1.1; margin:2px 0;">64</div>
            <div style="font-size:0.75rem; font-weight:700; color:var(--text-secondary);">74.4% Pass Rate</div>
          </div>
        </div>

        <!-- CARD 4 -->
        <div class="panel-card" style="display:flex; align-items:center; gap:14px; padding:18px;">
          <div style="width:48px; height:48px; border-radius:14px; background:#d1fae5; color:#059669; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <i data-lucide="target" style="width:22px; height:22px;"></i>
          </div>
          <div>
            <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">Approved & Enrolled</div>
            <div style="font-size:1.8rem; font-weight:800; color:var(--text-primary); line-height:1.1; margin:2px 0;">42</div>
            <div style="font-size:0.75rem; font-weight:700; color:#10b981;">60.5% Conversion</div>
          </div>
        </div>

      </div>

      <!-- MIDDLE ROW: ADMISSION FUNNEL & CLASS-WISE INTEREST -->
      <div style="display:grid; grid-template-columns: 1fr 380px; gap:20px; margin-bottom:20px;">

        <!-- LEFT PANEL: ADMISSION FUNNEL -->
        <div class="panel-card" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:36px; height:36px; border-radius:10px; background:#e0e7ff; color:#4f46e5; display:flex; align-items:center; justify-content:center;">
                <i data-lucide="filter" style="width:18px; height:18px;"></i>
              </div>
              <div>
                <h3 style="font-size:1.1rem; font-weight:800; color:var(--text-primary);">Admission Funnel</h3>
                <p style="font-size:0.78rem; color:var(--text-muted);">Track the complete admission journey</p>
              </div>
            </div>
            <button onclick="showToast('Loading detailed funnel report...')" style="padding:6px 14px; background:#e0e7ff; color:#4338ca; border-radius:8px; font-weight:700; font-size:0.78rem; border:none; cursor:pointer;">
              View Detailed Report →
            </button>
          </div>

          <!-- FUNNEL PROCESS STEPS CONNECTED BY ARROWS -->
          <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; margin:10px 0;">
            
            <!-- STEP 1 -->
            <div style="flex:1; background:#f5f3ff; border:1px solid #ddd6fe; border-radius:14px; padding:16px 12px; text-align:center;">
              <div style="width:38px; height:38px; border-radius:50%; background:#ddd6fe; color:#6d28d9; display:flex; align-items:center; justify-content:center; margin:0 auto 8px auto;">
                <i data-lucide="users" style="width:18px; height:18px;"></i>
              </div>
              <div style="font-size:0.75rem; font-weight:700; color:var(--text-secondary);">Inquiries</div>
              <div style="font-size:1.3rem; font-weight:800; color:#5b21b6; margin-top:2px;">142</div>
            </div>

            <!-- ARROW -->
            <div style="color:#94a3b8; font-size:1.2rem; font-weight:800;">➔</div>

            <!-- STEP 2 -->
            <div style="flex:1; background:#eff6ff; border:1px solid #bfdbfe; border-radius:14px; padding:16px 12px; text-align:center;">
              <div style="width:38px; height:38px; border-radius:50%; background:#bfdbfe; color:#1d4ed8; display:flex; align-items:center; justify-content:center; margin:0 auto 8px auto;">
                <i data-lucide="file-text" style="width:18px; height:18px;"></i>
              </div>
              <div style="font-size:0.75rem; font-weight:700; color:var(--text-secondary);">Applications</div>
              <div style="font-size:1.3rem; font-weight:800; color:#1e40af; margin-top:2px;">86</div>
              <div style="font-size:0.7rem; font-weight:700; color:#2563eb;">60.5%</div>
            </div>

            <!-- ARROW -->
            <div style="color:#94a3b8; font-size:1.2rem; font-weight:800;">➔</div>

            <!-- STEP 3 -->
            <div style="flex:1; background:#fff7ed; border:1px solid #fed7aa; border-radius:14px; padding:16px 12px; text-align:center;">
              <div style="width:38px; height:38px; border-radius:50%; background:#fed7aa; color:#c2410c; display:flex; align-items:center; justify-content:center; margin:0 auto 8px auto;">
                <i data-lucide="award" style="width:18px; height:18px;"></i>
              </div>
              <div style="font-size:0.75rem; font-weight:700; color:var(--text-secondary);">Test Passed</div>
              <div style="font-size:1.3rem; font-weight:800; color:#9a3412; margin-top:2px;">64</div>
              <div style="font-size:0.7rem; font-weight:700; color:#c2410c;">74.4%</div>
            </div>

            <!-- ARROW -->
            <div style="color:#94a3b8; font-size:1.2rem; font-weight:800;">➔</div>

            <!-- STEP 4 -->
            <div style="flex:1; background:#ecfdf5; border:1px solid #a7f3d0; border-radius:14px; padding:16px 12px; text-align:center;">
              <div style="width:38px; height:38px; border-radius:50%; background:#a7f3d0; color:#047857; display:flex; align-items:center; justify-content:center; margin:0 auto 8px auto;">
                <i data-lucide="graduation-cap" style="width:18px; height:18px;"></i>
              </div>
              <div style="font-size:0.75rem; font-weight:700; color:var(--text-secondary);">Enrolled</div>
              <div style="font-size:1.3rem; font-weight:800; color:#065f46; margin-top:2px;">42</div>
              <div style="font-size:0.7rem; font-weight:700; color:#047857;">29.6% of Total</div>
            </div>

          </div>
        </div>

        <!-- RIGHT PANEL: CLASS-WISE INTEREST DONUT CHART -->
        <div class="panel-card">
          <div style="margin-bottom:12px;">
            <h3 style="font-size:1.1rem; font-weight:800; color:var(--text-primary);">Class-wise Interest</h3>
            <p style="font-size:0.78rem; color:var(--text-muted);">Enquiries received by class</p>
          </div>

          <div style="display:flex; align-items:center; gap:16px;">
            <!-- DONUT CHART SVG -->
            <div style="position:relative; width:130px; height:130px; flex-shrink:0;">
              <svg viewBox="0 0 36 36" style="width:100%; height:100%; transform: rotate(-90deg);">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" stroke-width="4.5" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#6366f1" stroke-dasharray="28, 100" stroke-width="4.5" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" stroke-dasharray="24, 100" stroke-dashoffset="-28" stroke-width="4.5" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" stroke-dasharray="20, 100" stroke-dashoffset="-52" stroke-width="4.5" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#06b6d4" stroke-dasharray="15, 100" stroke-dashoffset="-72" stroke-width="4.5" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#a855f7" stroke-dasharray="8, 100" stroke-dashoffset="-87" stroke-width="4.5" />
              </svg>
              <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
                <span style="font-size:1.1rem; font-weight:800; color:var(--text-primary); line-height:1;">142</span>
                <span style="font-size:0.65rem; color:var(--text-muted); font-weight:600;">Total</span>
              </div>
            </div>

            <!-- LEGEND LIST -->
            <div style="flex:1; display:flex; flex-direction:column; gap:4px; font-size:0.75rem;">
              ${interest.map(item => `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <div style="display:flex; align-items:center; gap:6px;">
                    <span style="width:8px; height:8px; border-radius:50%; background:${item.color}; display:inline-block;"></span>
                    <span style="color:var(--text-secondary); font-weight:600;">${item.className}</span>
                  </div>
                  <strong>${item.pct}% <span style="color:var(--text-muted); font-weight:500;">(${item.count})</span></strong>
                </div>
              `).join('')}
            </div>

          </div>
        </div>

      </div>

      <!-- BOTTOM TABLE PANEL: RECENT ADMISSION APPLICATIONS -->
      <div class="panel-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:36px; height:36px; border-radius:10px; background:#e0e7ff; color:#4f46e5; display:flex; align-items:center; justify-content:center;">
              <i data-lucide="award" style="width:18px; height:18px;"></i>
            </div>
            <h3 style="font-size:1.1rem; font-weight:800; color:var(--text-primary);">Recent Admission Applications & Entrance Status</h3>
          </div>
          <button onclick="showToast('Loading full application directory...')" style="padding:6px 14px; background:#e0e7ff; color:#4338ca; border-radius:8px; font-weight:700; font-size:0.78rem; border:none; cursor:pointer;">
            View All Applications →
          </button>
        </div>

        <div class="table-container">
          <table class="data-table" style="width:100%; border-collapse:collapse; text-align:left; font-size:0.88rem;">
            <thead>
              <tr style="color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; background:var(--bg-card-sub);">
                <th style="padding:12px; width:40px;">#</th>
                <th>Applicant Name</th>
                <th>Grade Applied</th>
                <th>Parent Name & Contact</th>
                <th>Entrance Score</th>
                <th>Application Date</th>
                <th>Status</th>
                <th style="text-align:right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${leads.map((l, idx) => `
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:12px; font-weight:700; color:var(--text-muted);">${idx + 1}</td>
                  <td>
                    <div style="display:flex; align-items:center; gap:10px;">
                      <div style="width:32px; height:32px; border-radius:50%; background:#e0e7ff; color:#4f46e5; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.75rem;">
                        ${l.applicantName.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <strong style="color:var(--text-primary); font-size:0.9rem;">${l.applicantName}</strong>
                    </div>
                  </td>
                  <td><span style="font-size:0.82rem; font-weight:600; color:var(--text-secondary);">${l.gradeApplied}</span></td>
                  <td>
                    <div style="font-size:0.83rem; font-weight:700; color:var(--text-primary);">${l.parentName}</div>
                    <div style="font-size:0.75rem; color:#6366f1; font-weight:600;">📞 ${l.phone}</div>
                  </td>
                  <td>
                    <span style="background:#e0e7ff; color:#4338ca; padding:4px 12px; border-radius:12px; font-weight:800; font-size:0.8rem;">
                      ${l.testScore}
                    </span>
                  </td>
                  <td style="font-size:0.83rem; color:var(--text-secondary);">
                    📅 ${l.date}
                  </td>
                  <td>
                    <span class="badge ${l.statusClass}" style="font-size:0.75rem; padding:4px 12px;">
                      ${l.status === 'Approved' ? '✓ Approved' : l.status.includes('Verification') ? '⌛ Under Verification' : '📝 Test Scheduled'}
                    </span>
                  </td>
                  <td style="text-align:right;">
                    <button onclick="showToast('Enrolled ${l.applicantName} into ${l.gradeApplied}!')" style="padding:8px 18px; background:#4f46e5; color:white; border-radius:8px; font-weight:700; font-size:0.8rem; border:none; cursor:pointer; box-shadow:0 3px 10px rgba(79,70,229,0.3);">
                      ✓ Enroll Student
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    refreshLucideIcons();
  }

  window.filterAdmissions = function(status) {
    renderAdmissionsScreen();
  };


  /* 6. STUDENTS DIRECTORY */
  function renderStudentDirectoryScreen(selectedClass) {
    const list = MOCK_DATA.studentDirectoryList;
    const activeFilter = selectedClass || 'All';
    const filtered = activeFilter === 'All' ? list : list.filter(s => s.grade.toLowerCase().includes(activeFilter.toLowerCase()) || s.section.toLowerCase().includes(activeFilter.toLowerCase()));

    contentViewport.innerHTML = `
      <div class="panel-card" style="margin-bottom:20px;">
        <div class="panel-header" style="flex-wrap:wrap; gap:12px;">
          <div>
            <h2><i data-lucide="users" style="color:var(--indigo);"></i> Student Directory & Section Roster (832 Students)</h2>
            <p style="color:var(--text-secondary); font-size:0.85rem; margin-top:2px;">Vikas Grammar School HS Cherial • UDISE: 36182100637 • Classes 1 to 10</p>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <label style="font-size:0.85rem; font-weight:700; color:var(--indigo);">Filter Class & Section:</label>
            <select id="studentClassFilter" style="padding:8px 16px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card); font-weight:700; color:var(--text-primary); cursor:pointer;">
              <option value="All" ${activeFilter === 'All' ? 'selected' : ''}>All Classes (832 Students)</option>
              <option value="Class I" ${activeFilter === 'Class I' ? 'selected' : ''}>Class I (121 Students)</option>
              <option value="Class V" ${activeFilter === 'Class V' ? 'selected' : ''}>Class V (98 Students)</option>
              <option value="Class VIII" ${activeFilter === 'Class VIII' ? 'selected' : ''}>Class VIII Section A (48 Students)</option>
              <option value="Class IX" ${activeFilter === 'Class IX' ? 'selected' : ''}>Class IX Section A (43 Students)</option>
              <option value="Class X" ${activeFilter === 'Class X' ? 'selected' : ''}>Class X Section A & B (43 Students)</option>
            </select>
          </div>
        </div>

        <div class="table-container" style="margin-top:14px;">
          <table class="data-table" style="width:100%; border-collapse:collapse; text-align:left; font-size:0.88rem;">
            <thead>
              <tr style="color:var(--text-muted); font-size:0.78rem; text-transform:uppercase; background:var(--bg-card-sub);">
                <th style="padding:12px;">Student Name</th>
                <th>Class & Section</th>
                <th>Roll No</th>
                <th>UDISE PEN ID</th>
                <th>Parent Contact</th>
                <th>Attendance</th>
                <th>Academic Grade</th>
                <th>Fee Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map(s => `
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:10px;">
                    <div style="display:flex; align-items:center; gap:10px;">
                      <img src="${s.avatar}" style="width:34px; height:34px; border-radius:50%; object-fit:cover; border:1.5px solid var(--indigo);">
                      <strong style="color:var(--text-primary);">${s.name}</strong>
                    </div>
                  </td>
                  <td><span class="badge badge-indigo">${s.grade} — ${s.section}</span></td>
                  <td><strong>${s.rollNo}</strong></td>
                  <td><code>${s.penId}</code></td>
                  <td style="font-size:0.8rem;">${s.parentName}<br><span style="color:var(--text-muted);">${s.parentContact}</span></td>
                  <td><strong style="color:${s.attendancePct >= 90 ? '#10b981' : '#f59e0b'};">${s.attendancePct}%</strong></td>
                  <td><span class="badge badge-success">${s.gpaPct}% • ${s.gradeLetter}</span></td>
                  <td><span class="badge ${s.feeStatus === 'Paid' ? 'badge-success' : 'badge-danger'}">${s.feeStatus} ${s.feeDue > 0 ? `(₹${s.feeDue})` : ''}</span></td>
                  <td>
                    <button onclick="showToast('Opened 360° profile for ${s.name}!')" style="padding:4px 10px; font-size:0.75rem; background:var(--indigo); color:white; border-radius:6px; font-weight:700;">
                      360° Profile
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    document.getElementById('studentClassFilter')?.addEventListener('change', (e) => {
      renderStudentDirectoryScreen(e.target.value);
    });

    refreshLucideIcons();
  }

  /* 7. ACADEMICS & BOARD */
  function renderAcademicsScreen() {
    const curr = MOCK_DATA.academicsCurriculumList;
    contentViewport.innerHTML = `
      <div class="panel-card" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-color: #bbf7d0; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <h2><i data-lucide="book-open" style="color:var(--emerald);"></i> Academics & Board Curriculum Engine</h2>
            <p style="color:var(--text-secondary); margin-top:4px;">Board of Secondary Education, Telangana (BSE Telangana) • Classes 1 to 10 Syllabus Tracker</p>
          </div>
          <button class="btn-primary" onclick="showToast('Downloaded Official Telangana Board Syllabus PDF!')" style="padding:8px 16px; background:var(--emerald); color:white; border-radius:10px; font-weight:700;">
            <i data-lucide="download"></i> Download Board Syllabus PDF
          </button>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:18px;">
        ${curr.map(c => `
          <div class="panel-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span class="badge badge-indigo">${c.classGrade}</span>
              <span style="font-size:0.75rem; font-weight:800; color:var(--emerald);">${c.progressPct}% Syllabus Done</span>
            </div>

            <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-primary); margin-bottom:4px;">${c.subject}</h3>
            <div style="font-size:0.83rem; color:var(--text-secondary); margin-bottom:8px;">Lead Teacher: <strong>${c.teacher}</strong></div>

            <div style="margin-bottom:12px;">
              <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-muted); margin-bottom:4px;">
                <span>Completed: ${c.chaptersCompleted}</span>
                <span>${c.progressPct}%</span>
              </div>
              <div style="height:8px; background:#e2e8f0; border-radius:8px; overflow:hidden;">
                <div style="width:${c.progressPct}%; height:100%; background:linear-gradient(90deg, #10b981, #059669);"></div>
              </div>
            </div>

            <div style="font-size:0.75rem; font-weight:700; color:var(--indigo); background:var(--bg-card-sub); padding:8px 12px; border-radius:8px;">
              📌 Board Status: ${c.boardStatus}
            </div>
          </div>
        `).join('')}
      </div>
    `;
    refreshLucideIcons();
  }

  /* 8. STAFF PAYROLL */
  function renderStaffPayrollScreen() {
    const staff = MOCK_DATA.staffPayrollList;
    contentViewport.innerHTML = `
      <div class="panel-card" style="margin-bottom:20px;">
        <div class="panel-header" style="flex-wrap:wrap; gap:12px;">
          <div>
            <h2><i data-lucide="user-check" style="color:var(--indigo);"></i> Staff Roster & HR Payroll Ledger (19 Staff)</h2>
            <p style="color:var(--text-secondary); font-size:0.85rem; margin-top:2px;">Vikas Grammar School HS Cherial • August 2026 Salary Disbursement Statement</p>
          </div>
          <button class="btn-primary" onclick="showToast('Processed August Salary Disbursements to 19 Staff!')" style="padding:8px 16px; background:var(--indigo); color:white; border-radius:10px; font-weight:700;">
            Disburse Monthly Salary
          </button>
        </div>
      </div>

      <div class="stats-grid-4" style="margin-bottom:20px;">
        <div class="stat-card">
          <div class="stat-title">Total Staff & Teachers</div>
          <div class="stat-value">19</div>
          <span class="trend-badge trend-up-green">100% Active Duty</span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Monthly Payroll Outflow</div>
          <div class="stat-value">₹6.85 L</div>
          <span class="trend-badge trend-purple">August Budget</span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Salary Credited</div>
          <div class="stat-value" style="color:#10b981;">100%</div>
          <span class="trend-badge trend-up-green">19/19 Disbursed</span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Avg Staff Attendance</div>
          <div class="stat-value">98.5%</div>
          <span class="trend-badge trend-up-blue">98 Working Days</span>
        </div>
      </div>

      <div class="panel-card">
        <div class="panel-header">
          <h3 class="panel-title">Teachers & Staff Salary Disbursement Ledger</h3>
        </div>
        <div class="table-container">
          <table class="data-table" style="width:100%; border-collapse:collapse; text-align:left; font-size:0.88rem;">
            <thead>
              <tr style="color:var(--text-muted); font-size:0.78rem; text-transform:uppercase; background:var(--bg-card-sub);">
                <th style="padding:12px;">Staff Name & ID</th>
                <th>Designation / Role</th>
                <th>Basic Pay</th>
                <th>Allowances</th>
                <th>Net Salary</th>
                <th>Disbursement Bank</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${staff.map(s => `
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:12px;"><strong>${s.name}</strong><br><code style="font-size:0.75rem;">${s.empId}</code></td>
                  <td><span class="badge badge-indigo">${s.role}</span></td>
                  <td>₹${s.basic.toLocaleString()}</td>
                  <td style="color:#047857;">+₹${s.allowances.toLocaleString()}</td>
                  <td><strong style="color:#1e40af; font-size:0.95rem;">₹${s.netSalary.toLocaleString()}</strong></td>
                  <td style="font-size:0.8rem;">${s.bank}</td>
                  <td><span class="badge badge-success">${s.status}</span></td>
                  <td>
                    <button onclick="showToast('Downloaded Payslip PDF for ${s.name} (${s.empId})!')" style="padding:4px 10px; font-size:0.75rem; background:var(--indigo); color:white; border-radius:6px; font-weight:700;">
                      Payslip PDF
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    refreshLucideIcons();
  }

  /* 9. MASTER TIMETABLES MATRIX */
  function renderMasterScheduleMatrixScreen(selectedClass) {
    const classList = Object.keys(MOCK_DATA.masterTimetables);
    const targetClass = selectedClass || 'Class VIII A';
    const schedule = MOCK_DATA.masterTimetables[targetClass] || MOCK_DATA.masterTimetables['Class VIII A'];

    contentViewport.innerHTML = `
      <div class="panel-card" style="margin-bottom:20px;">
        <div class="panel-header" style="flex-wrap:wrap; gap:12px;">
          <div>
            <h2><i data-lucide="calendar" style="color:var(--indigo);"></i> Master School Schedule Matrix (Classes 1 to 10)</h2>
            <p style="color:var(--text-secondary); font-size:0.85rem; margin-top:2px;">Full clash-free master timetables for all 20 classrooms at Vikas Grammar School HS Cherial (UDISE: 36182100637).</p>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <label style="font-size:0.85rem; font-weight:700; color:var(--indigo);">Select Class:</label>
            <select id="masterClassSelect" style="padding:8px 16px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card); font-weight:700; color:var(--text-primary); cursor:pointer;">
              ${classList.map(cls => `<option value="${cls}" ${cls === targetClass ? 'selected' : ''}>${cls}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="table-container" style="margin-top:14px;">
          <table class="data-table" style="width:100%; border-collapse:collapse; text-align:left; font-size:0.88rem;">
            <thead>
              <tr style="color:var(--text-muted); font-size:0.78rem; text-transform:uppercase; background:var(--bg-card-sub);">
                <th style="padding:12px;">Period #</th>
                <th>Time Slot</th>
                <th>Subject Name</th>
                <th>Assigned Teacher</th>
                <th>Classroom / Lab</th>
                <th>Digiboard Status</th>
              </tr>
            </thead>
            <tbody>
              ${schedule.map(s => `
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:12px;"><strong>Period ${s.period}</strong></td>
                  <td>${s.time}</td>
                  <td><strong style="color:var(--indigo);">${s.subject}</strong></td>
                  <td>${s.teacher}</td>
                  <td>${s.room}</td>
                  <td><span class="badge badge-success">Operational</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    document.getElementById('masterClassSelect')?.addEventListener('change', (e) => {
      renderMasterScheduleMatrixScreen(e.target.value);
    });

    refreshLucideIcons();
  }

  /* 10. FEE COLLECTION LEDGER */
  function renderFeeLedgerScreen() {
    const list = MOCK_DATA.feeLedgerFullList;
    contentViewport.innerHTML = `
      <div class="panel-card" style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-color: #a7f3d0; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <h2><i data-lucide="indian-rupee" style="color:var(--emerald);"></i> Fee Collection & Financial Ledger</h2>
            <p style="color:var(--text-secondary); margin-top:4px;">Q2 Academic Year 2026-2027 • Vikas Grammar School Cherial (UDISE: 36182100637)</p>
          </div>
          <button class="btn-primary" onclick="showToast('Dispatched Fee Reminder SMS to Defaulters!')" style="padding:8px 16px; background:var(--emerald); color:white; border-radius:10px; font-weight:700;">
            <i data-lucide="send"></i> Send Fee Reminder SMS
          </button>
        </div>
      </div>

      <div class="stats-grid-4" style="margin-bottom:20px;">
        <div class="stat-card">
          <div class="stat-title">Total Fee Target (Q2)</div>
          <div class="stat-value">₹15.50 L</div>
          <span class="trend-badge trend-up-green">Classes 1–10</span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Fee Collected</div>
          <div class="stat-value" style="color:#10b981;">₹14.25 L</div>
          <span class="trend-badge trend-up-green">91.9% Collected</span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Outstanding Dues</div>
          <div class="stat-value" style="color:#ef4444;">₹1.25 L</div>
          <span class="trend-badge trend-orange">42 Defaulters</span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Online Payment Ratio</div>
          <div class="stat-value">78%</div>
          <span class="trend-badge trend-purple">UPI & Netbanking</span>
        </div>
      </div>

      <div class="panel-card">
        <div class="panel-header">
          <h3 class="panel-title">Student Fee Accounts & Installment Status</h3>
        </div>
        <div class="table-container">
          <table class="data-table" style="width:100%; border-collapse:collapse; text-align:left; font-size:0.88rem;">
            <thead>
              <tr style="color:var(--text-muted); font-size:0.78rem; text-transform:uppercase; background:var(--bg-card-sub);">
                <th style="padding:12px;">Student Name</th>
                <th>Class & Section</th>
                <th>Total Annual Fee</th>
                <th>Amount Paid</th>
                <th>Balance Due</th>
                <th>Payment Status</th>
                <th>Last Receipt</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${list.map(f => `
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:12px;"><strong>${f.name}</strong></td>
                  <td><span class="badge badge-indigo">${f.gradeSec}</span></td>
                  <td>₹${f.totalFee.toLocaleString()}</td>
                  <td style="color:#047857; font-weight:700;">₹${f.paidFee.toLocaleString()}</td>
                  <td style="color:${f.dueFee > 0 ? '#dc2626' : 'var(--text-muted)'}; font-weight:700;">₹${f.dueFee.toLocaleString()}</td>
                  <td><span class="badge ${f.status === 'Paid' ? 'badge-success' : f.status === 'Partial' ? 'badge-warning' : 'badge-danger'}">${f.status}</span></td>
                  <td><code>${f.receiptNo}</code></td>
                  <td>
                    <button onclick="showToast('Generated Fee Receipt PDF for ${f.name}!')" style="padding:4px 10px; font-size:0.75rem; background:var(--indigo); color:white; border-radius:6px; font-weight:700;">
                      Receipt PDF
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    refreshLucideIcons();
  }

  /* 11. TRANSPORT FLEET */
  function renderTransportFleetScreen() {
    const fleet = MOCK_DATA.transportFleetList;
    contentViewport.innerHTML = `
      <div class="panel-card" style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-color: #fed7aa; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <h2><i data-lucide="bus" style="color:var(--orange);"></i> School Transport Fleet & Live GPS Tracking</h2>
            <p style="color:var(--text-secondary); margin-top:4px;">3 School Buses • 115 Transported Students • Vikas Grammar School Cherial</p>
          </div>
          <button class="btn-primary" onclick="showToast('Initiated Live GPS Ping to all 3 School Buses!')" style="padding:8px 16px; background:var(--orange); color:white; border-radius:10px; font-weight:700;">
            🛰️ Live GPS Map Ping
          </button>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:18px;">
        ${fleet.map(b => `
          <div class="panel-card" style="border-top:4px solid var(--orange);">
            <div style="font-size:1.15rem; font-weight:800; color:var(--indigo); margin-bottom:4px;">${b.busNo}</div>
            <div style="font-size:0.85rem; font-weight:700; color:var(--text-primary); margin-bottom:10px;">${b.route}</div>

            <div style="background:var(--bg-card-sub); padding:12px; border-radius:10px; font-size:0.8rem; display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px;">
              <div>📍 Stop: <strong>${b.pickupStop}</strong></div>
              <div>⏰ Pickup: <strong style="color:var(--emerald);">${b.pickupTime}</strong></div>
              <div>🏫 Arrival: <strong>${b.schoolArrival}</strong></div>
              <div>🚌 Return Drop: <strong style="color:var(--orange);">${b.dropTime}</strong></div>
            </div>

            <div style="font-size:0.78rem; color:var(--text-secondary); margin-bottom:8px;">
              Driver: <strong>${b.driver}</strong> (${b.phone})
            </div>

            <div style="font-size:0.75rem; font-weight:700; color:var(--emerald); background:#ecfdf5; padding:8px 12px; border-radius:8px;">
              ${b.gpsStatus} • Speed: ${b.speed}
            </div>
          </div>
        `).join('')}
      </div>
    `;
    refreshLucideIcons();
  }

  /* 12. SCHOOL LIBRARY CATALOG */
  function renderLibraryCatalogScreen() {
    const books = MOCK_DATA.libraryCatalogList;
    contentViewport.innerHTML = `
      <div class="panel-card" style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); border-color: #d8b4fe; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <h2><i data-lucide="book-marked" style="color:var(--purple);"></i> School Library & E-Book Catalog</h2>
            <p style="color:var(--text-secondary); margin-top:4px;">2,450 Books & Reference Guides • Vikas Grammar School Cherial</p>
          </div>
          <button class="btn-primary" onclick="showToast('Opened Book Issue Modal!')" style="padding:8px 16px; background:var(--purple); color:white; border-radius:10px; font-weight:700;">
            + Issue Book to Student
          </button>
        </div>
      </div>

      <div class="panel-card">
        <div class="panel-header">
          <h3 class="panel-title">Library Book Catalog & Circulation Ledger</h3>
        </div>
        <div class="table-container">
          <table class="data-table" style="width:100%; border-collapse:collapse; text-align:left; font-size:0.88rem;">
            <thead>
              <tr style="color:var(--text-muted); font-size:0.78rem; text-transform:uppercase; background:var(--bg-card-sub);">
                <th style="padding:12px;">Book Title & ISBN</th>
                <th>Author</th>
                <th>Category</th>
                <th>Shelf Location</th>
                <th>Circulation Status</th>
                <th>Issued To</th>
                <th>Return Due Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${books.map(b => `
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:12px;"><strong>${b.title}</strong><br><code style="font-size:0.75rem;">${b.isbn}</code></td>
                  <td>${b.author}</td>
                  <td><span class="badge badge-indigo">${b.category}</span></td>
                  <td><strong>${b.shelf}</strong></td>
                  <td><span class="badge ${b.status === 'Available' ? 'badge-success' : 'badge-warning'}">${b.status}</span></td>
                  <td style="font-size:0.8rem;">${b.issuedTo}</td>
                  <td>${b.dueDate}</td>
                  <td>
                    ${b.status === 'Available' ? `
                      <button onclick="showToast('Issued ${b.title} to student!')" style="padding:4px 10px; font-size:0.75rem; background:var(--purple); color:white; border-radius:6px; font-weight:700;">
                        Issue Book
                      </button>
                    ` : `
                      <button onclick="showToast('Returned ${b.title} to library shelf ${b.shelf}!')" style="padding:4px 10px; font-size:0.75rem; background:#10b981; color:white; border-radius:6px; font-weight:700;">
                        ✓ Mark Returned
                      </button>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    refreshLucideIcons();
  }

  /* 13. SCHOOL HOLIDAY CALENDAR */
  function renderHolidayCalendarScreen(filterCategory) {
    const holidays = MOCK_DATA.holidayCalendar;
    const activeFilter = filterCategory || 'All';
    const filtered = activeFilter === 'All' ? holidays : holidays.filter(h => h.category.toLowerCase().includes(activeFilter.toLowerCase()));

    contentViewport.innerHTML = `
      <div class="panel-card" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-color: #bbf7d0; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <h2><i data-lucide="calendar" style="color:var(--emerald);"></i> Official School Holiday Calendar 2026-2027</h2>
            <p style="color:var(--text-secondary); margin-top:4px;">Vikas Grammar School HS Cherial • Telangana State Board Calendar (BSE Telangana)</p>
          </div>
          <button class="btn-primary" onclick="showToast('Downloaded Official Telangana Holiday Circular PDF!')" style="padding:8px 16px; background:var(--emerald); color:white; border-radius:10px; font-weight:700;">
            <i data-lucide="download"></i> Download Official Circular PDF
          </button>
        </div>
      </div>

      <div style="display:flex; gap:8px; margin-bottom:20px; flex-wrap:wrap;">
        <button class="role-pill ${activeFilter === 'All' ? 'active' : ''}" onclick="filterHolidays('All')">All Holidays</button>
        <button class="role-pill ${activeFilter === 'Dasara' ? 'active' : ''}" onclick="filterHolidays('Dasara')">🌺 Dasara Vacation (13 Days)</button>
        <button class="role-pill ${activeFilter === 'Harvest' ? 'active' : ''}" onclick="filterHolidays('Harvest')">🌾 Sankranti Break (5 Days)</button>
        <button class="role-pill ${activeFilter === 'State' ? 'active' : ''}" onclick="filterHolidays('State')">State Holidays</button>
        <button class="role-pill ${activeFilter === 'National' ? 'active' : ''}" onclick="filterHolidays('National')">National Holidays</button>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:18px;">
        ${filtered.map(h => `
          <div class="panel-card" style="border-left:5px solid ${h.category.includes('Dasara') ? '#10b981' : h.category.includes('National') ? '#ef4444' : '#f59e0b'};">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
              <span class="badge ${h.categoryClass}">${h.category}</span>
              <span style="font-size:0.75rem; font-weight:800; color:var(--indigo); background:var(--bg-card-sub); padding:3px 8px; border-radius:12px;">${h.duration}</span>
            </div>

            <h3 style="font-size:1.1rem; font-weight:800; color:var(--text-primary); margin-bottom:4px;">${h.title}</h3>
            <div style="font-size:0.85rem; font-weight:700; color:var(--emerald); margin-bottom:6px;">📅 ${h.date} (${h.day})</div>
            <p style="font-size:0.82rem; color:var(--text-secondary); line-height:1.5;">${h.description}</p>
          </div>
        `).join('')}
      </div>
    `;
    refreshLucideIcons();
  }

  window.filterHolidays = function(cat) {
    renderHolidayCalendarScreen(cat);
  };

  /* 14. TEACHER TIMETABLE / SCHEDULE */
  function renderTeacherTimetableScreen(append = false) {
    const slots = MOCK_DATA.teacherTimetable;
    const html = `
      <div class="panel-card" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-color: #bbf7d0; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <h2><i data-lucide="presentation" style="color:var(--emerald);"></i> Teaching Schedule — Mrs. S. Radhika</h2>
            <p style="color:var(--text-secondary); margin-top:4px;">Senior Mathematics Lead • Class Teacher & Mentor for <strong>Class VIII Section A</strong></p>
          </div>
          <span class="badge badge-success" style="font-size:0.85rem; padding:6px 14px;">8 Periods Allocated (Clash-Free)</span>
        </div>
      </div>

      <div class="panel-card">
        <div class="panel-header" style="margin-bottom:18px;">
          <h3 class="panel-title">My Daily Teaching & Free Periods Schedule</h3>
          <span class="badge badge-indigo">Class VIII A Mentor</span>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px;">
          ${slots.map(slot => `
            <div style="background:${slot.active ? '#eff6ff' : slot.type === 'free' ? '#fef3c7' : slot.type === 'break' ? '#f1f5f9' : 'var(--bg-card-sub)'}; border:1.5px solid ${slot.active ? 'var(--indigo)' : slot.type === 'free' ? '#f59e0b' : 'var(--border-color)'}; border-radius:12px; padding:16px; position:relative; display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                  <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">Period ${slot.period}: ${slot.time}</span>
                  ${slot.active ? '<span class="badge badge-indigo" style="font-size:0.65rem;">ACTIVE NOW</span>' : `<span class="badge ${slot.type === 'free' ? 'badge-warning' : slot.type === 'break' ? 'badge-info' : 'badge-success'}" style="font-size:0.65rem;">${slot.status}</span>`}
                </div>
                <div style="font-size:1.1rem; font-weight:800; color:${slot.type === 'free' ? '#b45309' : 'var(--text-primary)'}; margin-bottom:6px;">${slot.subject}</div>
                <div style="font-size:0.85rem; font-weight:700; color:var(--indigo);">${slot.classAssigned}</div>
              </div>
              <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:10px; border-top:1px dashed var(--border-color); padding-top:8px;">
                📍 Location: <strong>${slot.room}</strong>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    if (append) contentViewport.innerHTML += html;
    else contentViewport.innerHTML = html;
    refreshLucideIcons();
  }

  /* 15. STUDENT TIMETABLE SCREEN */
  function renderStudentTimetableScreen(append = false) {
    const slots = MOCK_DATA.studentTimetable;
    const html = `
      <div class="panel-card" style="background: linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%); border-color: #bfdbfe; margin-bottom:20px;">
        <h2><i data-lucide="clock" style="color:var(--indigo);"></i> Class VIII Section A Timetable — Rahul Reddy</h2>
        <p style="color:var(--text-secondary); margin-top:4px;">Telangana State Board Curriculum • Vikas Grammar School HS Cherial</p>
      </div>

      <div class="panel-card">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:14px;">
          ${slots.map(slot => `
            <div style="background:${slot.active ? '#eff6ff' : 'var(--bg-card-sub)'}; border:1.5px solid ${slot.active ? 'var(--indigo)' : 'var(--border-color)'}; border-radius:12px; padding:16px;">
              <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">Period ${slot.period}: ${slot.time}</div>
              <div style="font-size:1.1rem; font-weight:800; color:var(--text-primary); margin:6px 0;">${slot.subject}</div>
              <div style="font-size:0.8rem; color:var(--text-secondary);">${slot.teacher}</div>
              <div style="font-size:0.75rem; color:var(--indigo); font-weight:600; margin-top:4px;">📍 Room: ${slot.room}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    if (append) contentViewport.innerHTML += html;
    else contentViewport.innerHTML = html;
    refreshLucideIcons();
  }

  /* 16. HOMEWORK & ASSIGNMENTS */
  function renderHomeworkAssignmentsScreen() {
    const list = MOCK_DATA.assignments;
    contentViewport.innerHTML = `
      <div class="panel-card" style="margin-bottom:20px;">
        <div class="panel-header">
          <h2><i data-lucide="book-open" style="color:var(--indigo);"></i> Homework & Today's Assignments</h2>
          <span class="badge badge-indigo">${list.length} Tasks</span>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:14px;">
        ${list.map(a => `
          <div class="panel-card" style="border-left:4px solid ${a.status.includes('Submitted') ? '#10b981' : '#f59e0b'};">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <div style="font-weight:800; font-size:1.05rem; color:var(--text-primary);">${a.subject}</div>
              <span class="badge ${a.badgeClass}">${a.status}</span>
            </div>
            <div style="font-weight:700; font-size:0.92rem; color:var(--indigo); margin-bottom:4px;">${a.title}</div>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:8px;">${a.description}</p>
            <div style="display:flex; justify-content:space-between; font-size:0.78rem; color:var(--text-muted); border-top:1px dashed var(--border-color); padding-top:8px;">
              <span>Assigned By: <strong>${a.assignedBy}</strong></span>
              <span>Due Date: <strong>${a.dueDate}</strong></span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    refreshLucideIcons();
  }

  /* 17. MENTOR LEAVE APPROVAL SCREEN */
  function renderMentorLeaveApprovalScreen() {
    const requests = MOCK_DATA.studentLeaveRequests;
    contentViewport.innerHTML = `
      <div class="panel-card" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-color: #bfdbfe; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <h2><i data-lucide="file-text" style="color:var(--indigo);"></i> Student Leave Approval Portal — Class VIII A Mentor</h2>
            <p style="color:var(--text-secondary); margin-top:4px;">Review and Accept or Reject leave applications submitted by Class VIII Section A students and parents.</p>
          </div>
          <span class="badge badge-indigo" style="font-size:0.85rem; padding:6px 12px;">Class Mentor: Mrs. S. Radhika</span>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px;">
        ${requests.map(r => `
          <div class="panel-card" style="border-left:5px solid ${r.mentorStatus === 'Accepted' ? '#10b981' : r.mentorStatus === 'Rejected' ? '#ef4444' : '#f59e0b'};">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
              <div>
                <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-primary);">${r.studentName} (${r.grade})</h3>
                <div style="font-size:0.82rem; color:var(--text-muted);">Roll No: <strong>${r.rollNo}</strong> • Applied By: <strong>${r.appliedBy}</strong> on ${r.appliedDate}</div>
              </div>
              <span class="badge ${r.mentorStatus === 'Accepted' ? 'badge-success' : r.mentorStatus === 'Rejected' ? 'badge-danger' : 'badge-warning'}">
                ${r.mentorStatus}
              </span>
            </div>

            <div style="background:var(--bg-card-sub); padding:14px; border-radius:10px; margin:12px 0; font-size:0.88rem; border:1px solid var(--border-color);">
              <div><strong>Leave Type:</strong> ${r.leaveType} (${r.days} Days: ${r.fromDate} to ${r.toDate})</div>
              <div style="margin-top:6px; color:var(--text-secondary);"><strong>Reason:</strong> ${r.reason}</div>
            </div>

            <div style="display:flex; gap:12px; justify-content:flex-end;">
              ${r.mentorStatus !== 'Accepted' ? `
                <button class="btn-primary" onclick="updateLeaveStatus('${r.id}', 'Accepted')" style="padding:8px 20px; background:#10b981; color:white; border-radius:8px; font-weight:700; font-size:0.85rem;">
                  ✓ Accept Leave
                </button>
              ` : ''}
              ${r.mentorStatus !== 'Rejected' ? `
                <button class="btn-primary" onclick="updateLeaveStatus('${r.id}', 'Rejected')" style="padding:8px 20px; background:#ef4444; color:white; border-radius:8px; font-weight:700; font-size:0.85rem;">
                  ✗ Reject Leave
                </button>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
    refreshLucideIcons();
  }

  window.updateLeaveStatus = function(id, newStatus) {
    const req = MOCK_DATA.studentLeaveRequests.find(r => r.id === id);
    if (req) {
      req.mentorStatus = newStatus;
      showToast(`Leave request for ${req.studentName} updated to: ${newStatus}`);
      renderMentorLeaveApprovalScreen();
    }
  };

  /* 18. TEACHER SALARY SCREEN */
  function renderTeacherSalaryScreen() {
    const sal = MOCK_DATA.teacherSalary;
    contentViewport.innerHTML = `
      <div class="panel-card" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-color: #bbf7d0; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <h2><i data-lucide="indian-rupee" style="color:var(--emerald);"></i> My Salary & Monthly Payslips — Mrs. S. Radhika</h2>
            <p style="color:var(--text-secondary); margin-top:4px;">Official Employee Payroll Statement • Vikas Grammar School HS Cherial</p>
          </div>
          <button class="btn-primary" onclick="showToast('Downloaded PDF Payslip PAY-VG-2026-08!')" style="padding:8px 16px; background:var(--emerald); color:white; border-radius:10px; font-weight:700;">
            <i data-lucide="download"></i> Download Payslip PDF
          </button>
        </div>
      </div>

      <div class="panel-card">
        <div class="panel-header">
          <h3 class="panel-title">August 2026 Monthly Salary Breakdown</h3>
          <span class="badge badge-success">${sal.status}</span>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px; margin-bottom:20px;">
          <div style="background:#f8fafc; padding:16px; border-radius:12px; border:1px solid #e2e8f0;">
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">Basic Pay</div>
            <div style="font-size:1.4rem; font-weight:800; color:var(--text-primary); margin-top:4px;">₹${sal.basicSalary.toLocaleString()}</div>
          </div>
          <div style="background:#ecfdf5; padding:16px; border-radius:12px; border:1px solid #a7f3d0;">
            <div style="font-size:0.75rem; color:#047857; font-weight:600;">HRA & DA Allowances</div>
            <div style="font-size:1.4rem; font-weight:800; color:#065f46; margin-top:4px;">+₹${sal.allowances.toLocaleString()}</div>
          </div>
          <div style="background:#fef2f2; padding:16px; border-radius:12px; border:1px solid #fecaca;">
            <div style="font-size:0.75rem; color:#dc2626; font-weight:600;">PF & Tax Deductions</div>
            <div style="font-size:1.4rem; font-weight:800; color:#991b1b; margin-top:4px;">-₹${sal.deductions.toLocaleString()}</div>
          </div>
          <div style="background:#eff6ff; padding:16px; border-radius:12px; border:1px solid #bfdbfe;">
            <div style="font-size:0.75rem; color:#1d4ed8; font-weight:600;">Net Salary Credited</div>
            <div style="font-size:1.5rem; font-weight:800; color:#1e40af; margin-top:4px;">₹${sal.netSalary.toLocaleString()}</div>
          </div>
        </div>

        <div style="font-size:0.85rem; color:var(--text-secondary); background:var(--bg-card-sub); padding:16px; border-radius:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; border:1px solid var(--border-color);">
          <div>
            <div>Disbursed To: <strong>${sal.bankAccount}</strong> on ${sal.creditDate}</div>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">Payslip Record ID: <code>${sal.payslipId}</code> • Reference: <code>TXN-2026-VG-9081</code></div>
          </div>
          <button class="btn-primary" onclick="showToast('Downloaded Official Payslip PDF!')" style="padding:8px 16px; background:var(--indigo); color:white; border-radius:8px; font-weight:700;">
            Download Payslip PDF
          </button>
        </div>
      </div>
    `;
    refreshLucideIcons();
  }

  /* 19. TEACHER ATTENDANCE SCREEN */
  function renderTeacherAttendanceScreen() {
    const att = MOCK_DATA.teacherAttendance;
    contentViewport.innerHTML = `
      <div class="panel-card" style="margin-bottom:20px;">
        <div class="panel-header">
          <h2><i data-lucide="check-circle" style="color:var(--emerald);"></i> My Teacher Duty Attendance Record</h2>
          <span class="badge badge-success">${att.status}</span>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-top:16px;">
          <div style="background:#ecfdf5; padding:20px; border-radius:12px; text-align:center; border:1px solid #a7f3d0;">
            <div style="font-size:0.8rem; color:#047857; font-weight:700;">Overall Duty Attendance</div>
            <div style="font-size:2rem; font-weight:800; color:#065f46; margin-top:4px;">${att.attendancePct}%</div>
          </div>
          <div style="background:#eff6ff; padding:20px; border-radius:12px; text-align:center; border:1px solid #bfdbfe;">
            <div style="font-size:0.8rem; color:#1d4ed8; font-weight:700;">Days Present on Duty</div>
            <div style="font-size:2rem; font-weight:800; color:#1e40af; margin-top:4px;">${att.daysPresent} / ${att.totalWorkingDays}</div>
          </div>
          <div style="background:#fef3c7; padding:20px; border-radius:12px; text-align:center; border:1px solid #fde68a;">
            <div style="font-size:0.8rem; color:#b45309; font-weight:700;">Approved Casual Leaves</div>
            <div style="font-size:2rem; font-weight:800; color:#92400e; margin-top:4px;">${att.casualLeaves} Days</div>
          </div>
        </div>
      </div>
    `;
    refreshLucideIcons();
  }

  /* 20. SUBMIT LEAVE REQUEST FORM */
  function renderLeaveRequestFormScreen() {
    contentViewport.innerHTML = `
      <div class="panel-card" style="max-width:700px; margin:0 auto;">
        <div class="panel-header">
          <h2><i data-lucide="file-text" style="color:var(--indigo);"></i> Submit Student Leave Request</h2>
        </div>
        <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:20px;">Leave request will be submitted directly to Class VIII A Mentor (Mrs. S. Radhika) for review.</p>

        <form id="leaveForm" style="display:flex; flex-direction:column; gap:14px;">
          <div>
            <label style="font-size:0.83rem; font-weight:700; display:block; margin-bottom:4px;">Leave Type</label>
            <select id="leaveType" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-primary);">
              <option value="Medical Leave">Medical Leave</option>
              <option value="Casual / Personal Leave">Casual / Personal Leave</option>
              <option value="Family Function">Family Function</option>
            </select>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>
              <label style="font-size:0.83rem; font-weight:700; display:block; margin-bottom:4px;">From Date</label>
              <input type="date" value="2026-09-02" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-primary);">
            </div>
            <div>
              <label style="font-size:0.83rem; font-weight:700; display:block; margin-bottom:4px;">To Date</label>
              <input type="date" value="2026-09-04" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-primary);">
            </div>
          </div>

          <div>
            <label style="font-size:0.83rem; font-weight:700; display:block; margin-bottom:4px;">Reason for Leave</label>
            <textarea rows="3" placeholder="Specify reason..." style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-primary);">Fever & Doctor Advised Rest</textarea>
          </div>

          <button type="submit" class="btn-primary" style="padding:12px; background:var(--indigo); color:white; border-radius:8px; font-weight:700; margin-top:10px;">
            Submit Leave Request to Mentor
          </button>
        </form>
      </div>
    `;

    document.getElementById('leaveForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("Submitted leave request to Mrs. S. Radhika! Status set to Pending Mentor Review.");
    });

    refreshLucideIcons();
  }

  /* 21. CHILD ATTENDANCE & PERFORMANCE (PARENT) */
  function renderChildAttendanceScreen() {
    const latestFeedback = MOCK_DATA.teacherStudentFeedbacks.find(f => f.studentName.includes('Rahul Reddy')) || MOCK_DATA.teacherStudentFeedbacks[0];

    contentViewport.innerHTML = `
      <div class="panel-card" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-color: #bfdbfe; margin-bottom:20px;">
        <h2><i data-lucide="user-check" style="color:var(--indigo);"></i> Child Academic & Attendance Profile — Rahul Reddy</h2>
        <p style="color:var(--text-secondary); margin-top:4px;">Monitoring Rahul Reddy (Class VIII Section A) • Vikas Grammar School HS Cherial</p>
      </div>

      <div class="stats-grid-4" style="margin-bottom:20px;">
        <div class="stat-card">
          <div class="stat-title">Overall Attendance</div>
          <div class="stat-value" style="color:#10b981;">94.5%</div>
          <span class="trend-badge trend-up-green">142/150 Days Present</span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Academic Score Average</div>
          <div class="stat-value" style="color:#3b82f6;">86%</div>
          <span class="trend-badge trend-up-blue">Rank #3 in Class VIII A</span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Pending Homeworks</div>
          <div class="stat-value" style="color:#f59e0b;">2</div>
          <span class="trend-badge trend-orange">Due Tomorrow</span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Fee Balance Due</div>
          <div class="stat-value" style="color:#ef4444;">₹3,500</div>
          <span class="trend-badge trend-purple">Term 3 Dues</span>
        </div>
      </div>

      ${latestFeedback ? `
        <!-- TEACHER FEEDBACK HIGHLIGHT FOR PARENT -->
        <div class="panel-card" style="margin-bottom:20px; border-left:5px solid var(--indigo);">
          <div class="panel-header" style="margin-bottom:12px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:40px; height:40px; border-radius:12px; background:#e0e7ff; color:#4f46e5; display:flex; align-items:center; justify-content:center;">
                <i data-lucide="message-circle" style="width:20px; height:20px;"></i>
              </div>
              <div>
                <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-primary); margin:0;">Latest Teacher Feedback on Rahul Reddy</h3>
                <p style="font-size:0.8rem; color:var(--text-secondary); margin:2px 0 0 0;">
                  From <strong>${latestFeedback.teacherName}</strong> (${latestFeedback.teacherDesignation}) • ${latestFeedback.subject}
                </p>
              </div>
            </div>
            <button onclick="handleNavClick('teacher_feedback_parent')" style="padding:8px 16px; background:#4f46e5; color:white; border-radius:8px; font-weight:700; font-size:0.82rem; border:none; cursor:pointer; display:flex; align-items:center; gap:6px;">
              View All Teacher Feedbacks & Reply →
            </button>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div class="star-rating-display">${renderStarsHtml(latestFeedback.rating)}</div>
            <span class="feedback-pill pill-emerald">${latestFeedback.performanceLevel}</span>
          </div>

          <div class="feedback-body-grid" style="grid-template-columns: 1fr 1fr; margin-bottom:12px;">
            <div class="feedback-content-box">
              <div class="feedback-label">🧠 Concept Grasp & Focus</div>
              <div class="feedback-text">${latestFeedback.conceptGrasp}</div>
            </div>
            <div class="feedback-content-box" style="background:#fefce8; border-color:#fef08a;">
              <div class="feedback-label" style="color:#854d0e;">🏡 Teacher Advice for Parents & Home Practice</div>
              <div class="feedback-text" style="color:#713f12; font-weight:700;">${latestFeedback.adviceForParents}</div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-radius:8px; background:${latestFeedback.parentAcknowledged ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)'}; border:1px solid ${latestFeedback.parentAcknowledged ? '#a7f3d0' : '#fde68a'}; flex-wrap:wrap; gap:8px;">
            <span style="font-size:0.82rem; font-weight:700; color:${latestFeedback.parentAcknowledged ? '#047857' : '#b45309'};">
              ${latestFeedback.parentAcknowledged ? `✓ You acknowledged this on ${latestFeedback.acknowledgedDate}` : '🔔 Feedback waiting for your review & acknowledgment'}
            </span>
            ${latestFeedback.parentAcknowledged && latestFeedback.parentNote ? `
              <span style="font-size:0.8rem; color:#065f46; font-style:italic;">"${latestFeedback.parentNote}"</span>
            ` : `
              <button onclick="handleNavClick('teacher_feedback_parent')" style="padding:4px 12px; background:#10b981; color:white; border-radius:6px; font-weight:700; font-size:0.75rem; border:none; cursor:pointer;">
                Acknowledge Now
              </button>
            `}
          </div>
        </div>
      ` : ''}
    `;
    refreshLucideIcons();
  }

  /* HELPER: RENDER STARS HTML */
  function renderStarsHtml(count, max = 5) {
    let html = '';
    for (let i = 1; i <= max; i++) {
      html += `<span style="color:${i <= count ? '#f59e0b' : '#cbd5e1'}; font-size:1.15rem; line-height:1;">★</span>`;
    }
    return html;
  }

  /* 22. STUDENT DAILY CLASS FEEDBACK SCREEN */
  let currentStudentRating = 5;
  function renderStudentDailyFeedbackScreen() {
    const list = MOCK_DATA.studentClassFeedbacks;
    const timetable = MOCK_DATA.studentTimetable;

    contentViewport.innerHTML = `
      <!-- HERO BANNER -->
      <div class="panel-card" style="background: linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%); border: 1px solid #c7d2fe; margin-bottom: 20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div style="display:flex; align-items:center; gap:16px;">
            <div style="width:52px; height:52px; border-radius:16px; background:#4f46e5; color:white; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(79,70,229,0.35);">
              <i data-lucide="message-square-plus" style="width:26px; height:26px;"></i>
            </div>
            <div>
              <h2 style="font-size:1.6rem; font-weight:800; color:#1e1b4b; margin-bottom:2px;">Daily Class Feedback — Rahul Reddy</h2>
              <p style="color:#4338ca; font-size:0.88rem; font-weight:600;">Share your ratings, pace & doubts on today's classes • Directly monitored by Headmaster K. Rajesham</p>
            </div>
          </div>
          <div style="display:flex; gap:10px; align-items:center;">
            <span class="badge badge-indigo" style="font-size:0.85rem; padding:8px 16px;">Class VIII A • Roll No: VIII-014</span>
            <span class="badge badge-success" style="font-size:0.85rem; padding:8px 16px;">Active Day: Sep 02, 2026</span>
          </div>
        </div>
      </div>

      <!-- MAIN CONTENT GRID -->
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:24px;">
        
        <!-- LEFT: FORM CARD -->
        <div class="panel-card">
          <div class="panel-header" style="margin-bottom:16px;">
            <h3 class="panel-title"><i data-lucide="edit-3" style="color:var(--indigo);"></i> Give Feedback on Today's Class</h3>
            <span class="badge badge-emerald">Interactive Feedback</span>
          </div>

          <form id="studentFeedbackForm" style="display:flex; flex-direction:column; gap:14px;">
            <div>
              <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Select Period & Subject *</label>
              <select id="sfbPeriodSelect" required style="width:100%; padding:10px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.88rem; font-weight:600;">
                ${timetable.map(t => `
                  <option value="${t.period}|${t.subject}|${t.teacher}">
                    Period ${t.period}: ${t.subject} (${t.teacher}) — ${t.time}
                  </option>
                `).join('')}
              </select>
            </div>

            <div>
              <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">How well did you understand the concept? (1–5 Stars) *</label>
              <div class="star-rating-picker" id="studentStarPicker">
                ${[1, 2, 3, 4, 5].map(star => `
                  <button type="button" class="star-btn ${star <= currentStudentRating ? 'selected' : ''}" data-value="${star}">★</button>
                `).join('')}
                <span id="starRatingLabel" style="font-size:0.85rem; font-weight:700; color:var(--amber); margin-left:8px;">${currentStudentRating} / 5 (Excellent)</span>
              </div>
            </div>

            <div>
              <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Teaching Pace & Explanation *</label>
              <div style="display:flex; gap:12px; flex-wrap:wrap;">
                <label style="display:flex; align-items:center; gap:6px; font-size:0.85rem; font-weight:600; cursor:pointer;">
                  <input type="radio" name="comprehensionPace" value="Paced Perfectly" checked> Paced Perfectly
                </label>
                <label style="display:flex; align-items:center; gap:6px; font-size:0.85rem; font-weight:600; cursor:pointer;">
                  <input type="radio" name="comprehensionPace" value="A Bit Too Fast"> A Bit Too Fast
                </label>
                <label style="display:flex; align-items:center; gap:6px; font-size:0.85rem; font-weight:600; cursor:pointer;">
                  <input type="radio" name="comprehensionPace" value="Needed More Time"> Needed More Time
                </label>
              </div>
            </div>

            <div>
              <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Topic / Chapter Covered Today *</label>
              <input type="text" id="sfbTopic" placeholder="e.g. Chapter 4: Congruent Triangles Exercise 4.2" required style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.88rem;">
            </div>

            <div>
              <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">What went well? / Student Comments *</label>
              <textarea id="sfbComments" rows="3" placeholder="Tell your teacher and Headmaster what you learned and enjoyed..." required style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.88rem;"></textarea>
            </div>

            <div>
              <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Any Doubts or Topics needing more explanation? (Optional)</label>
              <textarea id="sfbDoubts" rows="2" placeholder="Write any doubts or difficult questions (or write 'None')..." style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.88rem;">None</textarea>
            </div>

            <button type="submit" class="btn-primary" style="padding:12px; background:var(--indigo); color:white; border-radius:8px; font-weight:700; margin-top:6px; display:flex; align-items:center; justify-content:center; gap:8px;">
              <i data-lucide="send"></i> Submit Daily Class Feedback
            </button>
          </form>
        </div>

        <!-- RIGHT: TIMELINE -->
        <div>
          <div class="panel-card" style="margin-bottom:16px;">
            <div class="panel-header">
              <h3 class="panel-title"><i data-lucide="history" style="color:var(--emerald);"></i> My Submitted Feedbacks (${list.length})</h3>
              <span class="badge badge-indigo">All Sent to Principal</span>
            </div>
            <p style="font-size:0.82rem; color:var(--text-secondary); margin-top:4px;">Headmaster K. Rajesham regularly reviews feedback to ensure teaching excellence.</p>
          </div>

          <div style="display:flex; flex-direction:column; gap:14px; max-height:580px; overflow-y:auto; padding-right:4px;">
            ${list.map(f => `
              <div class="feedback-card highlight-student">
                <div class="feedback-card-header">
                  <div>
                    <div style="font-size:1.05rem; font-weight:800; color:var(--text-primary);">${f.subject}</div>
                    <div style="font-size:0.82rem; color:var(--text-secondary); margin-top:2px;">
                      Teacher: <strong>${f.teacher}</strong> • ${f.period}
                    </div>
                  </div>
                  <div style="text-align:right;">
                    <div class="star-rating-display">${renderStarsHtml(f.rating)}</div>
                    <span class="badge badge-success" style="font-size:0.72rem; margin-top:4px; display:inline-block;">${f.principalStatus}</span>
                  </div>
                </div>

                <div class="feedback-body-grid" style="grid-template-columns:1fr; margin:8px 0;">
                  <div class="feedback-content-box">
                    <div class="feedback-label">📖 Topic Covered</div>
                    <div class="feedback-text" style="font-weight:600;">${f.topic}</div>
                  </div>
                  <div class="feedback-content-box">
                    <div class="feedback-label">💬 Student Feedback (${f.comprehensionPace})</div>
                    <div class="feedback-text">${f.comments}</div>
                  </div>
                  ${f.doubts && f.doubts !== 'None' && f.doubts !== 'None.' ? `
                    <div class="doubt-alert-box">
                      <div class="feedback-label" style="color:#b45309;"><i data-lucide="help-circle" style="width:14px; height:14px;"></i> Question / Doubt Raised for Teacher</div>
                      <div class="feedback-text" style="color:#92400e; font-weight:600;">${f.doubts}</div>
                    </div>
                  ` : ''}
                  ${f.principalRemarks ? `
                    <div class="principal-note-box">
                      <div class="feedback-label" style="color:#5b21b6;"><i data-lucide="award" style="width:14px; height:14px;"></i> Headmaster Remark</div>
                      <div class="feedback-text" style="color:#4c1d95; font-size:0.82rem; font-weight:600;">"${f.principalRemarks}"</div>
                    </div>
                  ` : ''}
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-muted); border-top:1px dashed var(--border-color); padding-top:8px; margin-top:8px;">
                  <span>Logged on: <strong>${f.formattedDate || f.date}</strong></span>
                  <span>Student: <strong>${f.studentName} (${f.rollNo})</strong></span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;

    // Star picker logic
    const starPicker = document.getElementById('studentStarPicker');
    const starLabel = document.getElementById('starRatingLabel');
    starPicker?.querySelectorAll('.star-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentStudentRating = parseInt(btn.getAttribute('data-value'));
        starPicker.querySelectorAll('.star-btn').forEach(b => {
          const val = parseInt(b.getAttribute('data-value'));
          b.classList.toggle('selected', val <= currentStudentRating);
        });
        const labels = ['', 'Needs Help', 'Fair', 'Good', 'Very Good', 'Excellent'];
        if (starLabel) starLabel.textContent = `${currentStudentRating} / 5 (${labels[currentStudentRating]})`;
      });
    });

    // Form submission
    document.getElementById('studentFeedbackForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const periodVal = document.getElementById('sfbPeriodSelect').value;
      const [periodNum, subjectName, teacherName] = periodVal.split('|');
      const paceVal = document.querySelector('input[name="comprehensionPace"]:checked')?.value || 'Paced Perfectly';
      const topicVal = document.getElementById('sfbTopic').value.trim();
      const commentsVal = document.getElementById('sfbComments').value.trim();
      const doubtsVal = document.getElementById('sfbDoubts').value.trim();

      const newFeedback = {
        id: `sfb_${Date.now()}`,
        date: '2026-09-02',
        formattedDate: 'Sep 02, 2026',
        studentName: 'Rahul Reddy',
        rollNo: 'VIII-014',
        grade: 'Class VIII Section A',
        subject: subjectName,
        teacher: teacherName,
        period: `Period ${periodNum}`,
        rating: currentStudentRating,
        comprehensionPace: paceVal,
        topic: topicVal,
        comments: commentsVal,
        doubts: doubtsVal || 'None',
        principalStatus: 'Reviewed by Principal',
        principalRemarks: 'Acknowledged by Headmaster K. Rajesham. Great academic effort.'
      };

      MOCK_DATA.studentClassFeedbacks.unshift(newFeedback);
      showToast(`Daily class feedback for ${subjectName} submitted! Sent to Headmaster K. Rajesham.`);
      renderStudentDailyFeedbackScreen();
    });

    refreshLucideIcons();
  }

  /* 23. TEACHER DAILY CLASS & STUDENT FEEDBACK SCREEN */
  let activeTeacherTab = 'students';
  let currentTeacherRating = 5;
  function renderTeacherFeedbackScreen() {
    const studentFeedbacks = MOCK_DATA.teacherStudentFeedbacks;
    const classFeedbacks = MOCK_DATA.teacherDailyClassFeedbacks;
    const studentsList = MOCK_DATA.studentDirectoryList;

    contentViewport.innerHTML = `
      <!-- HERO BANNER -->
      <div class="panel-card" style="background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%); border:1px solid #c7d2fe; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div style="display:flex; align-items:center; gap:16px;">
            <div style="width:52px; height:52px; border-radius:16px; background:#4f46e5; color:white; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(79,70,229,0.35);">
              <i data-lucide="message-square" style="width:26px; height:26px;"></i>
            </div>
            <div>
              <h2 style="font-size:1.6rem; font-weight:800; color:#1e1b4b; margin-bottom:2px;">Teacher Feedback Center — Mrs. S. Radhika</h2>
              <p style="color:#4338ca; font-size:0.88rem; font-weight:600;">Class VIII A Mentor • Student feedback reflects to Parents; Classroom logs reflect to Principal</p>
            </div>
          </div>
          <span class="badge badge-indigo" style="font-size:0.85rem; padding:8px 16px;">Senior Math Lead (EMP-VG-002)</span>
        </div>
      </div>

      <!-- TABS SWITCHER -->
      <div class="feedback-tabs">
        <button type="button" class="feedback-tab-btn ${activeTeacherTab === 'students' ? 'active' : ''}" onclick="switchTeacherFeedbackTab('students')">
          <i data-lucide="user-check"></i> Feedback on Individual Students (Reflects to Parents & Principal) (${studentFeedbacks.length})
        </button>
        <button type="button" class="feedback-tab-btn ${activeTeacherTab === 'classes' ? 'active' : ''}" onclick="switchTeacherFeedbackTab('classes')">
          <i data-lucide="book-open"></i> Daily Classroom Session Logs (Visible to Principal) (${classFeedbacks.length})
        </button>
      </div>

      ${activeTeacherTab === 'students' ? `
        <!-- TAB 1: INDIVIDUAL STUDENT APPRAISAL -->
        <div style="display:grid; grid-template-columns: 440px 1fr; gap:20px; margin-bottom:24px;">
          
          <!-- SUBMISSION FORM -->
          <div class="panel-card">
            <div class="panel-header" style="margin-bottom:14px;">
              <h3 class="panel-title"><i data-lucide="edit" style="color:var(--indigo);"></i> Evaluate Student Performance</h3>
              <span class="badge badge-emerald">Instant Parent Sync</span>
            </div>

            <form id="teacherStudentFeedbackForm" style="display:flex; flex-direction:column; gap:12px;">
              <div>
                <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Select Student *</label>
                <select id="tsfStudentSelect" required style="width:100%; padding:10px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.88rem; font-weight:600;">
                  ${studentsList.map(s => `
                    <option value="${s.id}|${s.name}|${s.grade}|${s.rollNo}" ${s.name === 'Rahul Reddy' ? 'selected' : ''}>
                      ${s.name} (${s.grade} • Roll: ${s.rollNo})
                    </option>
                  `).join('')}
                </select>
              </div>

              <div>
                <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Subject *</label>
                <input type="text" id="tsfSubject" value="📐 Mathematics & Geometry" required style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.88rem; font-weight:600;">
              </div>

              <div>
                <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Overall Performance Rating *</label>
                <div class="star-rating-picker" id="teacherStarPicker">
                  ${[1, 2, 3, 4, 5].map(star => `
                    <button type="button" class="star-btn ${star <= currentTeacherRating ? 'selected' : ''}" data-value="${star}">★</button>
                  `).join('')}
                  <span id="teacherStarLabel" style="font-size:0.85rem; font-weight:700; color:var(--amber); margin-left:8px;">${currentTeacherRating} / 5 (Outstanding)</span>
                </div>
              </div>

              <div>
                <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Performance Standing *</label>
                <select id="tsfPerformanceLevel" style="width:100%; padding:9px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.88rem; font-weight:600;">
                  <option value="Outstanding">🌟 Outstanding (Top Tier)</option>
                  <option value="Very Good">👍 Very Good</option>
                  <option value="Good">👌 Good (On Track)</option>
                  <option value="Needs Attention">⚠️ Needs Attention & Revision</option>
                </select>
              </div>

              <div>
                <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Concept Comprehension & Focus *</label>
                <textarea id="tsfConceptGrasp" rows="2" placeholder="e.g. Mastered theorem proofs, solved problems quickly on board..." required style="width:100%; padding:9px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.85rem;">Mastered Congruent Triangles theorem proofs with exceptional accuracy. Rahul volunteered to solve complex problems on the blackboard with confidence.</textarea>
              </div>

              <div>
                <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Classroom Behavior & Discipline *</label>
                <textarea id="tsfBehavior" rows="2" placeholder="e.g. Attentive, polite, actively collaborates in group work..." required style="width:100%; padding:9px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.85rem;">Very attentive, respectful, and actively helps classmates during peer practice.</textarea>
              </div>

              <div>
                <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Key Strengths Observed *</label>
                <input type="text" id="tsfStrengths" value="Analytical reasoning, fast mental calculations, and structured proof writing." required style="width:100%; padding:9px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.85rem;">
              </div>

              <div>
                <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Advice for Parents & Home Practice *</label>
                <textarea id="tsfAdvice" rows="2" placeholder="What should parent guide child with at home?" required style="width:100%; padding:9px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.85rem;">Rahul is performing at the top tier in Math! Please ensure he spends 20 minutes daily reviewing geometry theorem steps at home to maintain this momentum.</textarea>
              </div>

              <div>
                <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Homework Status *</label>
                <select id="tsfHomeworkStatus" style="width:100%; padding:9px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.88rem; font-weight:600;">
                  <option value="Completed on Time (Grade: A+)">Completed on Time (Grade: A+)</option>
                  <option value="Submitted (Grade: A)">Submitted (Grade: A)</option>
                  <option value="Submitted with Minor Corrections (Grade: B)">Submitted with Corrections (Grade: B)</option>
                  <option value="Pending Submission">Pending Submission</option>
                </select>
              </div>

              <button type="submit" class="btn-primary" style="padding:12px; background:var(--indigo); color:white; border-radius:8px; font-weight:700; margin-top:6px; display:flex; align-items:center; justify-content:center; gap:8px;">
                <i data-lucide="send"></i> Publish Feedback to Parent & Principal
              </button>
            </form>
          </div>

          <!-- RECENT STUDENT APPRAISALS FEED -->
          <div>
            <div class="panel-card" style="margin-bottom:16px;">
              <div class="panel-header">
                <h3 class="panel-title"><i data-lucide="users" style="color:var(--emerald);"></i> Published Student Feedbacks (${studentFeedbacks.length})</h3>
                <span class="badge badge-indigo">Direct Parent Delivery</span>
              </div>
              <p style="font-size:0.82rem; color:var(--text-secondary); margin-top:4px;">Parents receive this feedback in their Child Overview. When parents acknowledge, their confirmation and reply notes appear below.</p>
            </div>

            <div style="display:flex; flex-direction:column; gap:16px; max-height:760px; overflow-y:auto; padding-right:4px;">
              ${studentFeedbacks.map(f => `
                <div class="feedback-card ${f.parentAcknowledged ? 'highlight-parent-ack' : 'highlight-student'}">
                  <div class="feedback-card-header">
                    <div class="feedback-user-info">
                      <div class="feedback-avatar-icon">🎓</div>
                      <div>
                        <div style="font-size:1.15rem; font-weight:800; color:var(--text-primary);">${f.studentName}</div>
                        <div style="font-size:0.82rem; color:var(--text-secondary);">
                          ${f.grade} • Roll No: <strong>${f.rollNo}</strong> • ${f.subject}
                        </div>
                      </div>
                    </div>

                    <div style="text-align:right;">
                      <div class="star-rating-display">${renderStarsHtml(f.rating)}</div>
                      <span class="feedback-pill ${f.performanceLevel === 'Outstanding' ? 'pill-emerald' : f.performanceLevel === 'Very Good' ? 'pill-blue' : 'pill-amber'}" style="margin-top:4px;">
                        ${f.performanceLevel}
                      </span>
                    </div>
                  </div>

                  <div class="feedback-body-grid">
                    <div class="feedback-content-box">
                      <div class="feedback-label">🧠 Concept Grasp & Focus</div>
                      <div class="feedback-text">${f.conceptGrasp}</div>
                    </div>
                    <div class="feedback-content-box">
                      <div class="feedback-label">🤝 Behavior & Discipline</div>
                      <div class="feedback-text">${f.behaviorAndDiscipline}</div>
                    </div>
                    <div class="feedback-content-box">
                      <div class="feedback-label">⭐ Key Strengths</div>
                      <div class="feedback-text">${f.strengths}</div>
                    </div>
                    <div class="feedback-content-box" style="background:#fefce8; border-color:#fef08a;">
                      <div class="feedback-label" style="color:#854d0e;">🏡 Advice for Parents / Home Guidance</div>
                      <div class="feedback-text" style="color:#713f12; font-weight:600;">${f.adviceForParents}</div>
                    </div>
                  </div>

                  <!-- PARENT ACKNOWLEDGMENT STATUS -->
                  <div style="margin-top:12px; padding:12px 14px; border-radius:10px; background:${f.parentAcknowledged ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)'}; border:1px solid ${f.parentAcknowledged ? '#a7f3d0' : '#fde68a'};">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                      <div style="display:flex; align-items:center; gap:8px;">
                        <i data-lucide="${f.parentAcknowledged ? 'check-circle-2' : 'clock'}" style="color:${f.parentAcknowledged ? '#10b981' : '#f59e0b'}; width:18px; height:18px;"></i>
                        <strong style="font-size:0.85rem; color:${f.parentAcknowledged ? '#047857' : '#b45309'};">
                          ${f.parentAcknowledged ? '✓ Parent Acknowledged Receipt' : '⏳ Awaiting Parent Acknowledgment'}
                        </strong>
                      </div>
                      <span style="font-size:0.75rem; color:var(--text-muted);">${f.acknowledgedDate || 'Notification Dispatched'}</span>
                    </div>

                    ${f.parentNote ? `
                      <div class="parent-reply-box">
                        <div class="parent-reply-header">
                          <span>💬 Parent Reply Note:</span>
                          <span style="font-size:0.7rem; color:var(--text-muted);">${f.acknowledgedDate}</span>
                        </div>
                        <p style="margin:0; font-size:0.85rem; color:#065f46; font-style:italic;">"${f.parentNote}"</p>
                      </div>
                    ` : ''}
                  </div>

                  <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-muted); border-top:1px dashed var(--border-color); padding-top:8px; margin-top:12px;">
                    <span>Evaluated by: <strong>${f.teacherName}</strong> on ${f.formattedDate || f.date}</span>
                    <span class="badge badge-indigo">${f.homeworkStatus}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      ` : `
        <!-- TAB 2: DAILY CLASSROOM LOGS -->
        <div style="display:grid; grid-template-columns: 440px 1fr; gap:20px; margin-bottom:24px;">
          
          <!-- LOG FORM -->
          <div class="panel-card">
            <div class="panel-header" style="margin-bottom:14px;">
              <h3 class="panel-title"><i data-lucide="clipboard-list" style="color:var(--emerald);"></i> Log Classroom Session</h3>
              <span class="badge badge-emerald">Principal View</span>
            </div>

            <form id="teacherClassroomLogForm" style="display:flex; flex-direction:column; gap:12px;">
              <div>
                <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Class & Section *</label>
                <select id="tcfGrade" style="width:100%; padding:10px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.88rem; font-weight:600;">
                  <option value="Class VIII Section A">Class VIII Section A</option>
                  <option value="Class X Section B">Class X Section B</option>
                  <option value="Class IX Section A">Class IX Section A</option>
                  <option value="Class VIII Section B">Class VIII Section B</option>
                </select>
              </div>

              <div>
                <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Subject *</label>
                <input type="text" id="tcfSubject" value="📐 Mathematics" required style="width:100%; padding:9px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.88rem; font-weight:600;">
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                <div>
                  <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Period *</label>
                  <select id="tcfPeriod" style="width:100%; padding:9px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.85rem;">
                    <option value="Period 1 (09:00 - 09:45 AM)">Period 1</option>
                    <option value="Period 2 (09:50 - 10:35 AM)">Period 2</option>
                    <option value="Period 4 (11:30 - 12:15 PM)">Period 4</option>
                    <option value="Period 6 (01:00 - 01:45 PM)">Period 6</option>
                  </select>
                </div>
                <div>
                  <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Room No. *</label>
                  <input type="text" id="tcfRoom" value="Room 203" style="width:100%; padding:9px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.85rem;">
                </div>
              </div>

              <div>
                <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Topic Taught *</label>
                <input type="text" id="tcfTopic" placeholder="e.g. Congruence of Triangles Exercise 4.2" required style="width:100%; padding:9px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.88rem;">
              </div>

              <div>
                <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Classroom Engagement Rating *</label>
                <select id="tcfRating" style="width:100%; padding:9px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.88rem; font-weight:600;">
                  <option value="5">★★★★★ 5/5 — Highly Engaged & Responsive</option>
                  <option value="4">★★★★☆ 4/5 — Good Attention</option>
                  <option value="3">★★★☆☆ 3/5 — Average Attention</option>
                  <option value="2">★★☆☆☆ 2/5 — Low Focus, Revision Required</option>
                </select>
              </div>

              <div>
                <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Homework Assigned *</label>
                <input type="text" id="tcfHomework" placeholder="e.g. Solve Ex 4.2 Questions 1 to 12" required style="width:100%; padding:9px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.88rem;">
              </div>

              <div>
                <label style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Teacher Observations & Discipline *</label>
                <textarea id="tcfObservations" rows="3" placeholder="Notes on classroom participation, pace, and discipline..." required style="width:100%; padding:9px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.85rem;"></textarea>
              </div>

              <button type="submit" class="btn-primary" style="padding:12px; background:var(--indigo); color:white; border-radius:8px; font-weight:700; margin-top:6px; display:flex; align-items:center; justify-content:center; gap:8px;">
                <i data-lucide="save"></i> Save Classroom Daily Log
              </button>
            </form>
          </div>

          <!-- RECENT CLASSROOM LOGS FEED -->
          <div>
            <div class="panel-card" style="margin-bottom:16px;">
              <div class="panel-header">
                <h3 class="panel-title"><i data-lucide="clock" style="color:var(--indigo);"></i> Today's Classroom Logs (${classFeedbacks.length})</h3>
                <span class="badge badge-success">Reviewed by Headmaster</span>
              </div>
              <p style="font-size:0.82rem; color:var(--text-secondary); margin-top:4px;">All periods logged here are compiled on Headmaster K. Rajesham's Oversight Dashboard.</p>
            </div>

            <div style="display:flex; flex-direction:column; gap:16px; max-height:760px; overflow-y:auto; padding-right:4px;">
              ${classFeedbacks.map(cf => `
                <div class="feedback-card" style="border-left:5px solid var(--emerald);">
                  <div class="feedback-card-header">
                    <div>
                      <div style="font-size:1.15rem; font-weight:800; color:var(--text-primary);">${cf.subject} — ${cf.grade}</div>
                      <div style="font-size:0.82rem; color:var(--text-secondary); margin-top:2px;">
                        ${cf.period} • 📍 ${cf.room} • Teacher: <strong>${cf.teacherName}</strong>
                      </div>
                    </div>
                    <div style="text-align:right;">
                      <div class="star-rating-display">${renderStarsHtml(cf.classEngagementRating)}</div>
                      <span class="badge badge-success" style="font-size:0.72rem; margin-top:4px; display:inline-block;">${cf.principalStatus}</span>
                    </div>
                  </div>

                  <div class="feedback-body-grid" style="grid-template-columns:1fr; margin:8px 0;">
                    <div class="feedback-content-box">
                      <div class="feedback-label">📖 Topic Taught</div>
                      <div class="feedback-text" style="font-weight:600;">${cf.topicTaught}</div>
                    </div>
                    <div class="feedback-content-box">
                      <div class="feedback-label">📝 Homework Assigned</div>
                      <div class="feedback-text">${cf.homeworkAssigned}</div>
                    </div>
                    <div class="feedback-content-box">
                      <div class="feedback-label">👁️ Teacher Observations & Engagement</div>
                      <div class="feedback-text">${cf.observations}</div>
                    </div>
                  </div>

                  <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-muted); border-top:1px dashed var(--border-color); padding-top:8px; margin-top:8px;">
                    <span>Date: <strong>${cf.formattedDate || cf.date}</strong></span>
                    <span>Discipline Level: <strong style="color:#047857;">${cf.discipline}</strong></span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      `}
    `;

    // Tab switcher helper
    window.switchTeacherFeedbackTab = function(tab) {
      activeTeacherTab = tab;
      renderTeacherFeedbackScreen();
    };

    // Teacher Star Rating Picker
    const starPicker = document.getElementById('teacherStarPicker');
    const starLabel = document.getElementById('teacherStarLabel');
    starPicker?.querySelectorAll('.star-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentTeacherRating = parseInt(btn.getAttribute('data-value'));
        starPicker.querySelectorAll('.star-btn').forEach(b => {
          const val = parseInt(b.getAttribute('data-value'));
          b.classList.toggle('selected', val <= currentTeacherRating);
        });
        const labels = ['', 'Needs Attention', 'Fair', 'Good', 'Very Good', 'Outstanding'];
        if (starLabel) starLabel.textContent = `${currentTeacherRating} / 5 (${labels[currentTeacherRating]})`;
      });
    });

    // Form: Student Feedback submission
    document.getElementById('teacherStudentFeedbackForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const stdVal = document.getElementById('tsfStudentSelect').value;
      const [stdId, stdName, stdGrade, stdRoll] = stdVal.split('|');
      const subject = document.getElementById('tsfSubject').value.trim();
      const perfLevel = document.getElementById('tsfPerformanceLevel').value;
      const conceptGrasp = document.getElementById('tsfConceptGrasp').value.trim();
      const behavior = document.getElementById('tsfBehavior').value.trim();
      const strengths = document.getElementById('tsfStrengths').value.trim();
      const advice = document.getElementById('tsfAdvice').value.trim();
      const hwStatus = document.getElementById('tsfHomeworkStatus').value;

      const newStudentFeedback = {
        id: `tsf_${Date.now()}`,
        date: '2026-09-02',
        formattedDate: 'Sep 02, 2026',
        studentId: stdId,
        studentName: stdName,
        rollNo: stdRoll,
        grade: stdGrade,
        subject: subject,
        teacherName: 'Mrs. S. Radhika',
        teacherDesignation: 'Class VIII Mentor & Senior Math Lead',
        empId: 'EMP-VG-002',
        rating: currentTeacherRating,
        performanceLevel: perfLevel,
        conceptGrasp: conceptGrasp,
        behaviorAndDiscipline: behavior,
        strengths: strengths,
        adviceForParents: advice,
        homeworkStatus: hwStatus,
        parentAcknowledged: false,
        parentNote: '',
        acknowledgedDate: '',
        principalStatus: 'Reviewed by Principal',
        principalNote: 'Acknowledged by Headmaster K. Rajesham.'
      };

      MOCK_DATA.teacherStudentFeedbacks.unshift(newStudentFeedback);
      showToast(`Feedback published for ${stdName}! Successfully reflected on Parent Portal and Principal Oversight.`);
      renderTeacherFeedbackScreen();
    });

    // Form: Classroom Daily Log submission
    document.getElementById('teacherClassroomLogForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const grade = document.getElementById('tcfGrade').value;
      const subject = document.getElementById('tcfSubject').value.trim();
      const period = document.getElementById('tcfPeriod').value;
      const room = document.getElementById('tcfRoom').value.trim();
      const topic = document.getElementById('tcfTopic').value.trim();
      const rating = parseInt(document.getElementById('tcfRating').value);
      const homework = document.getElementById('tcfHomework').value.trim();
      const observations = document.getElementById('tcfObservations').value.trim();

      const newLog = {
        id: `tcf_${Date.now()}`,
        date: '2026-09-02',
        formattedDate: 'Sep 02, 2026',
        teacherName: 'Mrs. S. Radhika',
        empId: 'EMP-VG-002',
        grade: grade,
        subject: subject,
        period: period,
        room: room,
        topicTaught: topic,
        classEngagementRating: rating,
        homeworkAssigned: homework,
        observations: observations,
        discipline: 'Very Good',
        principalStatus: 'Acknowledged by Headmaster'
      };

      MOCK_DATA.teacherDailyClassFeedbacks.unshift(newLog);
      showToast(`Classroom log saved! Visible to Headmaster K. Rajesham.`);
      renderTeacherFeedbackScreen();
    });

    refreshLucideIcons();
  }

  /* 24. PARENT: TEACHER'S DAILY FEEDBACK ON CHILD SCREEN */
  function renderParentTeacherFeedbackScreen() {
    const allFeedbacks = MOCK_DATA.teacherStudentFeedbacks.filter(f => f.studentName.includes('Rahul Reddy'));
    const unacknowledgedCount = allFeedbacks.filter(f => !f.parentAcknowledged).length;

    contentViewport.innerHTML = `
      <!-- HERO BANNER -->
      <div class="panel-card" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border:1px solid #bbf7d0; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div style="display:flex; align-items:center; gap:16px;">
            <div style="width:52px; height:52px; border-radius:16px; background:#10b981; color:white; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(16,185,129,0.35);">
              <i data-lucide="message-circle" style="width:26px; height:26px;"></i>
            </div>
            <div>
              <h2 style="font-size:1.6rem; font-weight:800; color:#064e3b; margin-bottom:2px;">Teacher's Daily Feedback — Rahul Reddy</h2>
              <p style="color:#047857; font-size:0.88rem; font-weight:600;">Daily performance reviews, behavioral feedback, and guidance notes submitted by subject teachers</p>
            </div>
          </div>
          <div style="display:flex; gap:10px; align-items:center;">
            <span class="badge badge-indigo" style="font-size:0.85rem; padding:8px 16px;">Class VIII A • Roll: VIII-014</span>
            <span class="badge ${unacknowledgedCount > 0 ? 'badge-warning' : 'badge-success'}" style="font-size:0.85rem; padding:8px 16px;">
              ${unacknowledgedCount > 0 ? `🔔 ${unacknowledgedCount} Awaiting Acknowledgment` : '✓ All Feedbacks Acknowledged'}
            </span>
          </div>
        </div>
      </div>

      <!-- STATS SUMMARY -->
      <div class="stats-grid-4" style="margin-bottom:20px;">
        <div class="stat-card">
          <div class="stat-title">Total Feedbacks Received</div>
          <div class="stat-value" style="color:var(--indigo);">${allFeedbacks.length}</div>
          <span class="trend-badge trend-up-blue">This Term</span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Average Teacher Rating</div>
          <div class="stat-value" style="color:#f59e0b;">4.8 ★</div>
          <span class="trend-badge trend-up-green">Top 5% in Class</span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Performance Standing</div>
          <div class="stat-value" style="color:#10b981; font-size:1.45rem;">Outstanding</div>
          <span class="trend-badge trend-up-green">Consistent Grade A+</span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Parent Action Required</div>
          <div class="stat-value" style="color:${unacknowledgedCount > 0 ? '#f59e0b' : '#10b981'};">${unacknowledgedCount}</div>
          <span class="trend-badge ${unacknowledgedCount > 0 ? 'trend-orange' : 'trend-up-green'}">${unacknowledgedCount > 0 ? 'Review & Acknowledge' : 'Up to date'}</span>
        </div>
      </div>

      <!-- FEEDBACKS LIST -->
      <div style="display:flex; flex-direction:column; gap:20px; margin-bottom:30px;">
        ${allFeedbacks.map(f => `
          <div class="feedback-card ${f.parentAcknowledged ? 'highlight-parent-ack' : 'highlight-student'}">
            
            <div class="feedback-card-header">
              <div class="feedback-user-info">
                <div class="feedback-avatar-icon">👩‍🏫</div>
                <div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <h3 style="font-size:1.2rem; font-weight:800; color:var(--text-primary); margin:0;">${f.subject}</h3>
                    <span class="feedback-pill ${f.performanceLevel === 'Outstanding' ? 'pill-emerald' : 'pill-blue'}">${f.performanceLevel}</span>
                  </div>
                  <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:2px;">
                    Teacher: <strong>${f.teacherName}</strong> (${f.teacherDesignation}) • Date: <strong>${f.formattedDate || f.date}</strong>
                  </div>
                </div>
              </div>

              <div style="text-align:right;">
                <div class="star-rating-display">${renderStarsHtml(f.rating)}</div>
                <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">Official BSE Telangana Curriculum Evaluation</div>
              </div>
            </div>

            <!-- DETAILED OBSERVATIONS GRID -->
            <div class="feedback-body-grid">
              <div class="feedback-content-box">
                <div class="feedback-label">🧠 Concept Comprehension & Classroom Work</div>
                <div class="feedback-text">${f.conceptGrasp}</div>
              </div>
              <div class="feedback-content-box">
                <div class="feedback-label">🤝 Behavior & Collaboration</div>
                <div class="feedback-text">${f.behaviorAndDiscipline}</div>
              </div>
              <div class="feedback-content-box">
                <div class="feedback-label">⭐ Strengths Observed</div>
                <div class="feedback-text">${f.strengths}</div>
              </div>
              <div class="feedback-content-box" style="background:#fefce8; border-color:#fef08a;">
                <div class="feedback-label" style="color:#854d0e;">🏡 Teacher Advice for Parents & Home Practice</div>
                <div class="feedback-text" style="color:#713f12; font-weight:700;">${f.adviceForParents}</div>
              </div>
            </div>

            <!-- HOMEWORK STATUS BADGE -->
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-card-sub); padding:10px 14px; border-radius:8px; border:1px solid var(--border-color); margin:10px 0;">
              <span style="font-size:0.82rem; font-weight:700; color:var(--text-secondary);">📚 Homework Standing:</span>
              <span class="badge badge-indigo">${f.homeworkStatus}</span>
            </div>

            <!-- PARENT ACKNOWLEDGMENT BOX -->
            <div style="margin-top:14px; padding:14px 16px; border-radius:12px; background:${f.parentAcknowledged ? 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)' : 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)'}; border:1px solid ${f.parentAcknowledged ? '#a7f3d0' : '#fde68a'};">
              ${f.parentAcknowledged ? `
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <i data-lucide="check-circle" style="color:#10b981; width:20px; height:20px;"></i>
                    <div>
                      <strong style="font-size:0.9rem; color:#047857;">You have acknowledged this feedback</strong>
                      <div style="font-size:0.75rem; color:#065f46;">Acknowledged on: ${f.acknowledgedDate}</div>
                    </div>
                  </div>
                  <span class="badge badge-success">Delivered to Teacher & Principal</span>
                </div>

                ${f.parentNote ? `
                  <div class="parent-reply-box" style="margin-top:10px;">
                    <div class="parent-reply-header">
                      <span>💬 Your Note to Mrs. S. Radhika:</span>
                    </div>
                    <p style="margin:0; font-size:0.88rem; color:#065f46; font-style:italic;">"${f.parentNote}"</p>
                  </div>
                ` : ''}
              ` : `
                <div>
                  <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                    <i data-lucide="alert-circle" style="color:#d97706; width:20px; height:20px;"></i>
                    <div>
                      <strong style="font-size:0.92rem; color:#92400e;">Please review and acknowledge this feedback</strong>
                      <div style="font-size:0.78rem; color:#b45309;">Confirm to the class mentor that you have reviewed today's advice.</div>
                    </div>
                  </div>

                  <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:8px;">
                    <input type="text" id="parentNoteInput_${f.id}" placeholder="Add a reply note to teacher (e.g. 'Thank you ma'am, we practiced geometry proofs at home!')..." style="flex:1; min-width:240px; padding:10px 14px; border-radius:8px; border:1px solid #d97706; background:white; color:var(--text-primary); font-size:0.85rem;">
                    <button type="button" onclick="acknowledgeFeedbackAsParent('${f.id}')" style="padding:10px 20px; background:#10b981; color:white; border-radius:8px; font-weight:700; font-size:0.88rem; border:none; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:0 4px 12px rgba(16,185,129,0.3);">
                      <i data-lucide="check"></i> Acknowledge & Send Note
                    </button>
                  </div>
                </div>
              `}
            </div>

            <!-- PRINCIPAL REVIEW FOOTER -->
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.78rem; color:var(--text-muted); border-top:1px dashed var(--border-color); padding-top:10px; margin-top:14px;">
              <span>UDISE Code: <strong>36182100637</strong> (Vikas Grammar School HS Cherial)</span>
              <span style="color:var(--indigo); font-weight:600;"><i data-lucide="shield-check" style="width:14px; height:14px; display:inline-block; vertical-align:middle;"></i> Headmaster Verified</span>
            </div>

          </div>
        `).join('')}
      </div>
    `;

    // Parent Acknowledgment Action
    window.acknowledgeFeedbackAsParent = function(id) {
      const item = MOCK_DATA.teacherStudentFeedbacks.find(x => x.id === id);
      if (item) {
        const noteInput = document.getElementById(`parentNoteInput_${id}`);
        const noteText = noteInput?.value.trim() || 'Reviewed and acknowledged by parent.';
        item.parentAcknowledged = true;
        item.parentNote = noteText;
        const now = new Date();
        item.acknowledgedDate = `Sep 02, 2026 at ${now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`;
        showToast(`Feedback acknowledged! Your reply was delivered to ${item.teacherName} and Principal.`);
        renderParentTeacherFeedbackScreen();
      }
    };

    refreshLucideIcons();
  }

  /* 25. PRINCIPAL DAILY FEEDBACK OVERSIGHT SCREEN */
  let activePrincipalTab = 'students_class';
  function renderPrincipalFeedbackOversightScreen() {
    const studentFeedbacks = MOCK_DATA.studentClassFeedbacks;
    const teacherStudentFeedbacks = MOCK_DATA.teacherStudentFeedbacks;
    const teacherClassFeedbacks = MOCK_DATA.teacherDailyClassFeedbacks;

    const avgStudentRating = (studentFeedbacks.reduce((acc, f) => acc + f.rating, 0) / (studentFeedbacks.length || 1)).toFixed(1);
    const parentAckCount = teacherStudentFeedbacks.filter(f => f.parentAcknowledged).length;
    const parentAckPct = Math.round((parentAckCount / (teacherStudentFeedbacks.length || 1)) * 100);
    const doubtsCount = studentFeedbacks.filter(f => f.doubts && f.doubts !== 'None' && f.doubts !== 'None.').length;

    contentViewport.innerHTML = `
      <!-- HERO BANNER -->
      <div class="panel-card" style="background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%); border:1px solid #c7d2fe; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div style="display:flex; align-items:center; gap:16px;">
            <div style="width:52px; height:52px; border-radius:16px; background:#4f46e5; color:white; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(79,70,229,0.35);">
              <i data-lucide="message-square" style="width:26px; height:26px;"></i>
            </div>
            <div>
              <h2 style="font-size:1.6rem; font-weight:800; color:#1e1b4b; margin-bottom:2px;">Daily Feedback Oversight — Headmaster K. Rajesham</h2>
              <p style="color:#4338ca; font-size:0.88rem; font-weight:600;">Full institutional oversight of student class ratings, doubts, teacher classroom logs & parent reflections</p>
            </div>
          </div>
          <span class="badge badge-indigo" style="font-size:0.85rem; padding:8px 16px;">UDISE: 36182100637 • Cherial HS</span>
        </div>
      </div>

      <!-- 4 EXECUTIVE KPI CARDS -->
      <div class="stats-grid-4" style="margin-bottom:20px;">
        <div class="stat-card">
          <div class="stat-title">Student Class Feedbacks</div>
          <div class="stat-value" style="color:var(--indigo);">${studentFeedbacks.length}</div>
          <span class="trend-badge trend-up-green">Avg Rating: <strong>${avgStudentRating} ★</strong></span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Teacher Student Appraisals</div>
          <div class="stat-value" style="color:#10b981;">${teacherStudentFeedbacks.length}</div>
          <span class="trend-badge trend-up-blue">Reflected to Parents</span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Parent Acknowledgment Rate</div>
          <div class="stat-value" style="color:#3b82f6;">${parentAckPct}%</div>
          <span class="trend-badge trend-up-green">${parentAckCount} / ${teacherStudentFeedbacks.length} Confirmed</span>
        </div>
        <div class="stat-card">
          <div class="stat-title">Student Doubts / Questions</div>
          <div class="stat-value" style="color:${doubtsCount > 0 ? '#f59e0b' : '#10b981'};">${doubtsCount}</div>
          <span class="trend-badge ${doubtsCount > 0 ? 'trend-orange' : 'trend-up-green'}">${doubtsCount > 0 ? 'Action Required' : 'All Clear'}</span>
        </div>
      </div>

      <!-- TABS SWITCHER -->
      <div class="feedback-tabs">
        <button type="button" class="feedback-tab-btn ${activePrincipalTab === 'students_class' ? 'active' : ''}" onclick="switchPrincipalFeedbackTab('students_class')">
          <i data-lucide="graduation-cap"></i> Student Feedbacks on Daily Classes (${studentFeedbacks.length})
        </button>
        <button type="button" class="feedback-tab-btn ${activePrincipalTab === 'teacher_student' ? 'active' : ''}" onclick="switchPrincipalFeedbackTab('teacher_student')">
          <i data-lucide="users"></i> Teacher Feedback on Students (Reflected to Parents) (${teacherStudentFeedbacks.length})
        </button>
        <button type="button" class="feedback-tab-btn ${activePrincipalTab === 'teacher_class' ? 'active' : ''}" onclick="switchPrincipalFeedbackTab('teacher_class')">
          <i data-lucide="clipboard-list"></i> Teacher Daily Classroom Session Logs (${teacherClassFeedbacks.length})
        </button>
      </div>

      ${activePrincipalTab === 'students_class' ? `
        <!-- TAB A: STUDENT FEEDBACK ON DAILY CLASSES -->
        <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:30px;">
          ${studentFeedbacks.map(sf => `
            <div class="feedback-card ${sf.doubts && sf.doubts !== 'None' ? 'highlight-doubt' : 'highlight-student'}">
              <div class="feedback-card-header">
                <div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-primary); margin:0;">${sf.subject}</h3>
                    <span class="badge badge-indigo">${sf.period}</span>
                    <span class="badge badge-success">${sf.comprehensionPace}</span>
                  </div>
                  <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:3px;">
                    Student: <strong>${sf.studentName}</strong> (${sf.grade} • Roll: ${sf.rollNo}) • Teacher: <strong>${sf.teacher}</strong>
                  </div>
                </div>

                <div style="text-align:right;">
                  <div class="star-rating-display">${renderStarsHtml(sf.rating)}</div>
                  <span class="badge badge-emerald" style="margin-top:4px; display:inline-block;">${sf.principalStatus}</span>
                </div>
              </div>

              <div class="feedback-body-grid" style="grid-template-columns: 1fr 1fr;">
                <div class="feedback-content-box">
                  <div class="feedback-label">📖 Topic Covered</div>
                  <div class="feedback-text" style="font-weight:600;">${sf.topic}</div>
                </div>
                <div class="feedback-content-box">
                  <div class="feedback-label">💬 Student Reaction & Comments</div>
                  <div class="feedback-text">${sf.comments}</div>
                </div>
              </div>

              ${sf.doubts && sf.doubts !== 'None' && sf.doubts !== 'None.' ? `
                <div class="doubt-alert-box">
                  <div class="feedback-label" style="color:#b45309;">
                    <i data-lucide="help-circle" style="width:14px; height:14px;"></i> Student Doubts / Difficulties (Flagged for Mentor Review)
                  </div>
                  <div class="feedback-text" style="color:#92400e; font-weight:600;">${sf.doubts}</div>
                </div>
              ` : ''}

              ${sf.principalRemarks ? `
                <div class="principal-note-box">
                  <div class="feedback-label" style="color:#5b21b6;">
                    <i data-lucide="award" style="width:14px; height:14px;"></i> Headmaster Feedback Acknowledgment
                  </div>
                  <div class="feedback-text" style="color:#4c1d95; font-size:0.85rem; font-weight:600;">"${sf.principalRemarks}"</div>
                </div>
              ` : ''}

              <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-muted); border-top:1px dashed var(--border-color); padding-top:10px; margin-top:10px;">
                <span>Logged on: <strong>${sf.formattedDate || sf.date}</strong></span>
                <button type="button" onclick="principalAcknowledgeStudent('${sf.id}')" style="padding:6px 14px; background:#e0e7ff; color:#4338ca; border-radius:6px; font-weight:700; font-size:0.78rem; border:none; cursor:pointer;">
                  ✓ Headmaster Acknowledged
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      ` : activePrincipalTab === 'teacher_student' ? `
        <!-- TAB B: TEACHER FEEDBACK ON STUDENTS -->
        <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:30px;">
          ${teacherStudentFeedbacks.map(tsf => `
            <div class="feedback-card ${tsf.parentAcknowledged ? 'highlight-parent-ack' : 'highlight-student'}">
              <div class="feedback-card-header">
                <div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-primary); margin:0;">${tsf.studentName} (${tsf.grade})</h3>
                    <span class="feedback-pill ${tsf.performanceLevel === 'Outstanding' ? 'pill-emerald' : 'pill-blue'}">${tsf.performanceLevel}</span>
                  </div>
                  <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:3px;">
                    Subject: <strong>${tsf.subject}</strong> • Evaluated by: <strong>${tsf.teacherName}</strong> (${tsf.teacherDesignation})
                  </div>
                </div>

                <div style="text-align:right;">
                  <div class="star-rating-display">${renderStarsHtml(tsf.rating)}</div>
                  <span class="badge ${tsf.parentAcknowledged ? 'badge-success' : 'badge-warning'}" style="margin-top:4px; display:inline-block;">
                    ${tsf.parentAcknowledged ? '✓ Reflected & Acknowledged by Parent' : '⏳ Dispatched to Parent'}
                  </span>
                </div>
              </div>

              <div class="feedback-body-grid">
                <div class="feedback-content-box">
                  <div class="feedback-label">🧠 Concept Grasp & Focus</div>
                  <div class="feedback-text">${tsf.conceptGrasp}</div>
                </div>
                <div class="feedback-content-box">
                  <div class="feedback-label">🤝 Classroom Behavior</div>
                  <div class="feedback-text">${tsf.behaviorAndDiscipline}</div>
                </div>
                <div class="feedback-content-box">
                  <div class="feedback-label">⭐ Key Strengths</div>
                  <div class="feedback-text">${tsf.strengths}</div>
                </div>
                <div class="feedback-content-box" style="background:#fefce8; border-color:#fef08a;">
                  <div class="feedback-label" style="color:#854d0e;">🏡 Advice Given to Parents</div>
                  <div class="feedback-text" style="color:#713f12; font-weight:600;">${tsf.adviceForParents}</div>
                </div>
              </div>

              ${tsf.parentNote ? `
                <div class="parent-reply-box">
                  <div class="parent-reply-header">
                    <span>💬 Parent Reply Note (from Rahul Reddy's Parent):</span>
                    <span>${tsf.acknowledgedDate}</span>
                  </div>
                  <p style="margin:0; font-size:0.85rem; color:#065f46; font-style:italic;">"${tsf.parentNote}"</p>
                </div>
              ` : ''}

              <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-muted); border-top:1px dashed var(--border-color); padding-top:10px; margin-top:10px;">
                <span>Evaluated on: <strong>${tsf.formattedDate || tsf.date}</strong></span>
                <div style="display:flex; gap:10px; align-items:center;">
                  <span class="badge badge-indigo">${tsf.homeworkStatus}</span>
                  <span class="badge badge-success">${tsf.principalStatus}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : `
        <!-- TAB C: TEACHER DAILY CLASSROOM LOGS -->
        <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:30px;">
          ${teacherClassFeedbacks.map(tcf => `
            <div class="feedback-card" style="border-left:5px solid var(--emerald);">
              <div class="feedback-card-header">
                <div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-primary); margin:0;">${tcf.subject} — ${tcf.grade}</h3>
                    <span class="badge badge-indigo">${tcf.period}</span>
                    <span class="badge badge-info">📍 ${tcf.room}</span>
                  </div>
                  <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:3px;">
                    Teacher: <strong>${tcf.teacherName}</strong> (${tcf.empId}) • Discipline: <strong style="color:#047857;">${tcf.discipline}</strong>
                  </div>
                </div>

                <div style="text-align:right;">
                  <div class="star-rating-display">${renderStarsHtml(tcf.classEngagementRating)}</div>
                  <span class="badge badge-success" style="margin-top:4px; display:inline-block;">${tcf.principalStatus}</span>
                </div>
              </div>

              <div class="feedback-body-grid" style="grid-template-columns:1fr 1fr;">
                <div class="feedback-content-box">
                  <div class="feedback-label">📖 Topic Covered</div>
                  <div class="feedback-text" style="font-weight:600;">${tcf.topicTaught}</div>
                </div>
                <div class="feedback-content-box">
                  <div class="feedback-label">📝 Homework Assigned</div>
                  <div class="feedback-text">${tcf.homeworkAssigned}</div>
                </div>
              </div>

              <div class="feedback-content-box" style="margin-top:8px;">
                <div class="feedback-label">👁️ Classroom Observations & Engagement</div>
                <div class="feedback-text">${tcf.observations}</div>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-muted); border-top:1px dashed var(--border-color); padding-top:10px; margin-top:10px;">
                <span>Session Date: <strong>${tcf.formattedDate || tcf.date}</strong></span>
                <span style="font-weight:700; color:#047857;">✓ Verified for UDISE Academic Coverage</span>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    `;

    // Principal Tab Switcher
    window.switchPrincipalFeedbackTab = function(tab) {
      activePrincipalTab = tab;
      renderPrincipalFeedbackOversightScreen();
    };

    // Principal Acknowledge Student action
    window.principalAcknowledgeStudent = function(id) {
      const item = MOCK_DATA.studentClassFeedbacks.find(x => x.id === id);
      if (item) {
        item.principalStatus = 'Acknowledged by Headmaster';
        item.principalRemarks = 'Reviewed by Headmaster K. Rajesham. Excellent progress noted.';
        showToast('Acknowledged student feedback!');
        renderPrincipalFeedbackOversightScreen();
      }
    };

    refreshLucideIcons();
  }

  /* ==========================================================================
     11 INSTITUTIONAL FOUNDATION PILLARS SCREEN RENDERERS
     ========================================================================== */

  /* 26. WHERE WE STAND & WHERE WE NEED TO IMPROVE (POINTS 10 & 11) */
  function renderInstitutionalDiagnosticScreen() {
    const ws = MOCK_DATA.whereWeStand;
    const wi = MOCK_DATA.whereToImprove;

    contentViewport.innerHTML = `
      <div class="panel-card" style="margin-bottom:20px; background:linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color:white; border:none;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
              <span class="badge" style="background:#4338ca; color:#c7d2fe;">UDISE: 36182100637</span>
              <span class="badge" style="background:#065f46; color:#a7f3d0;">Cherial Mandal Rank #1</span>
              <span class="badge" style="background:#78350f; color:#fde68a;">Top 3 in Siddipet District</span>
            </div>
            <h1 style="font-size:1.6rem; font-weight:800; margin:0; color:white;">Institutional Diagnostic: Where We Stand & Where We Need To Improve</h1>
            <p style="font-size:0.88rem; color:#c7d2fe; margin-top:4px;">Holistic quality benchmarking, statutory compliance, and strategic development matrix for Vikas Grammar School.</p>
          </div>
          <div style="text-align:right; background:rgba(255,255,255,0.1); padding:12px 20px; border-radius:12px; backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.15);">
            <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; color:#e0e7ff;">Institutional Health Score</div>
            <div style="font-size:2.2rem; font-weight:900; color:#10b981; line-height:1.1;">${ws.institutionalHealthScore} <span style="font-size:1rem; color:#a7f3d0;">/ 100</span></div>
            <span style="font-size:0.75rem; color:#d1fae5;">Grade A+ (Exemplary Performance)</span>
          </div>
        </div>
      </div>

      <!-- QUALITY ACCREDITATION BADGES -->
      <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:24px;">
        ${ws.accreditationBadges.map(b => `
          <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:999px; padding:6px 14px; font-size:0.82rem; font-weight:700; color:var(--text-primary); display:flex; align-items:center; gap:6px; box-shadow:var(--shadow-sm);">
            ${b}
          </div>
        `).join('')}
      </div>

      <!-- SECTION 10: WHERE WE STAND (BENCHMARKING) -->
      <div style="margin-bottom:32px;">
        <div class="panel-header" style="margin-bottom:14px;">
          <h2 style="font-size:1.25rem; font-weight:800; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
            <i data-lucide="bar-chart-3" style="color:var(--indigo);"></i> 10. Where We Stand (Institutional Comparative Benchmarks)
          </h2>
          <span class="badge badge-indigo">SCERT & District Norms</span>
        </div>

        <div class="benchmark-grid">
          ${ws.pillars.map(p => `
            <div class="benchmark-card">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                <h4 style="font-size:0.95rem; font-weight:700; color:var(--text-primary); margin:0;">${p.pillar}</h4>
                <span class="badge badge-success" style="font-size:0.7rem;">${p.badge}</span>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px;">
                <span style="font-size:1.5rem; font-weight:800; color:var(--indigo);">${p.schoolScore}%</span>
                <span style="font-size:0.75rem; color:var(--text-secondary);">District Avg: <strong>${p.districtAvg}%</strong> • State: <strong>${p.stateBenchmark}%</strong></span>
              </div>

              <!-- Bar Visualization -->
              <div class="benchmark-bar-track">
                <div class="benchmark-bar-fill" style="width:${p.schoolScore}%; background:linear-gradient(90deg, #6366f1, #10b981);"></div>
              </div>

              <div style="display:flex; justify-content:space-between; font-size:0.72rem; color:var(--text-muted); margin-top:4px;">
                <span>0%</span>
                <span style="color:#047857; font-weight:700;">+${p.schoolScore - p.districtAvg}% Above District Average</span>
                <span>100%</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 11: WHERE WE NEED TO IMPROVE (ACTION PLAN ROADMAP) -->
      <div>
        <div class="panel-header" style="margin-bottom:14px;">
          <h2 style="font-size:1.25rem; font-weight:800; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
            <i data-lucide="target" style="color:var(--emerald);"></i> 11. Where We Need To Improve (Strategic School Development Matrix)
          </h2>
          <span class="badge badge-emerald">${wi.length} Active Targets</span>
        </div>

        <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:16px;">
          Continuous institutional improvement framework addressing academic gaps, facilities upgrades, pedagogical enhancements, and student safety.
        </p>

        <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:30px;">
          ${wi.map(item => `
            <div class="action-item-card">
              <div class="action-header-row">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="badge ${item.priority === 'High Priority' ? 'badge-danger' : item.priority === 'Medium Priority' ? 'badge-warning' : 'badge-info'}">
                    ${item.priority}
                  </span>
                  <span class="badge badge-indigo">${item.category}</span>
                  <h3 style="font-size:1.05rem; font-weight:800; color:var(--text-primary); margin:0;">${item.area}</h3>
                </div>
                <div style="display:flex; align-items:center; gap:12px;">
                  <span style="font-size:0.8rem; color:var(--text-muted);">Due: <strong>${item.dueDate}</strong></span>
                  <span class="badge ${item.status === 'Near Completion' ? 'badge-success' : 'badge-warning'}">${item.status} (${item.progressPct}%)</span>
                </div>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:6px;">
                <div class="feedback-content-box">
                  <div class="feedback-label">⚠️ Current Challenge / Deficit Identified</div>
                  <div class="feedback-text" style="color:#b45309;">${item.currentIssue}</div>
                </div>
                <div class="feedback-content-box" style="background:#f0fdf4; border-color:#bbf7d0;">
                  <div class="feedback-label" style="color:#047857;">🎯 Targeted Strategic Action Plan</div>
                  <div class="feedback-text" style="color:#065f46; font-weight:600;">${item.actionItem}</div>
                </div>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; padding-top:8px; border-top:1px dashed var(--border-color); font-size:0.8rem; color:var(--text-secondary);">
                <span>Lead Responsible Faculty: <strong style="color:var(--text-primary);">${item.targetOwner}</strong></span>
                <button type="button" onclick="advanceImprovementAction('${item.id}')" style="padding:5px 12px; background:var(--bg-card-sub); border:1px solid var(--border-color); border-radius:6px; font-weight:700; font-size:0.75rem; cursor:pointer; color:var(--indigo);">
                  + Advance Progress (+10%)
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    window.advanceImprovementAction = function(id) {
      const item = MOCK_DATA.whereToImprove.find(x => x.id === id);
      if (item) {
        if (item.progressPct < 100) {
          item.progressPct = Math.min(100, item.progressPct + 10);
          if (item.progressPct === 100) item.status = 'Fully Accomplished';
          showToast(`Updated progress on ${item.area} to ${item.progressPct}%!`);
          renderInstitutionalDiagnosticScreen();
        } else {
          showToast('Action item is already fully accomplished!');
        }
      }
    };

    refreshLucideIcons();
  }

  /* 27. GPA GRADE & SUBJECT PARAMETERS & GAPS PLUGGING (POINT 2) */
  function renderGpaDiagnosticsScreen(roleFilter) {
    const studentDiag = MOCK_DATA.gpaSubjectDiagnostics[0]; // Rahul Reddy

    contentViewport.innerHTML = `
      <div class="panel-card" style="margin-bottom:20px;">
        <div class="panel-header">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <h2 style="font-size:1.3rem; font-weight:800; color:var(--text-primary); margin:0;">
                <i data-lucide="award" style="color:var(--indigo);"></i> 2. GPA Grade & Subject-Wise Parameters
              </h2>
              <span class="badge badge-success">Gaps Should Be Plugged</span>
            </div>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:4px;">
              Formative Assessments (FA1–FA4), Summative Tests (SA1), Slip Tests & Targeted Learning Gap Remediation.
            </p>
          </div>

          <div style="display:flex; align-items:center; gap:16px;">
            <div style="text-align:right;">
              <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Overall Cumulative GPA</div>
              <div style="font-size:1.8rem; font-weight:900; color:var(--indigo);">${studentDiag.overallGpa} <span style="font-size:0.9rem; color:var(--text-secondary);">/ 10</span></div>
            </div>
            <div style="padding:10px 16px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; text-align:center;">
              <div style="font-size:0.75rem; color:#047857; font-weight:700;">Class Standing</div>
              <div style="font-size:1.1rem; font-weight:800; color:#065f46;">${studentDiag.overallRank}</div>
            </div>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:12px; margin-top:10px; font-size:0.85rem; color:var(--text-secondary);">
          <span>Student: <strong style="color:var(--text-primary);">${studentDiag.studentName}</strong> (${studentDiag.rollNo})</span>
          <span>•</span>
          <span>Class: <strong>${studentDiag.grade}</strong></span>
          <span>•</span>
          <span>Syllabus: <strong>Telangana State SCERT SSC Pattern</strong></span>
        </div>
      </div>

      <!-- SUBJECT PARAMETER BREAKDOWN CARDS -->
      <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:30px;">
        ${studentDiag.subjects.map(sub => `
          <div class="gap-plugging-card">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
              <div>
                <div style="display:flex; align-items:center; gap:8px;">
                  <h3 style="font-size:1.2rem; font-weight:800; color:var(--text-primary); margin:0;">${sub.subject}</h3>
                  <span class="badge badge-indigo">Faculty: ${sub.teacher}</span>
                  <span class="badge badge-emerald">Grade: ${sub.grade} (GPA: ${sub.gpa})</span>
                </div>
              </div>
              <div>
                <span class="gap-tag ${sub.gapStatus.indexOf('Plugged Successfully') !== -1 ? 'gap-tag-plugged' : 'gap-tag-active'}">
                  ${sub.gapStatus.indexOf('Plugged Successfully') !== -1 ? '✓ Gap Plugged' : '⚡ Remedial Attention Active'}
                </span>
              </div>
            </div>

            <!-- Detailed Marks Parameter Grid -->
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap:10px; margin-bottom:14px; background:var(--bg-card-sub); padding:12px; border-radius:10px; border:1px solid var(--border-color);">
              <div style="text-align:center;">
                <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase;">FA 1 (20)</div>
                <div style="font-size:1.15rem; font-weight:800; color:var(--text-primary);">${sub.fa1}</div>
              </div>
              <div style="text-align:center;">
                <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase;">FA 2 (20)</div>
                <div style="font-size:1.15rem; font-weight:800; color:var(--text-primary);">${sub.fa2}</div>
              </div>
              <div style="text-align:center;">
                <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase;">FA 3 (20)</div>
                <div style="font-size:1.15rem; font-weight:800; color:var(--text-primary);">${sub.fa3}</div>
              </div>
              <div style="text-align:center;">
                <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase;">FA 4 (20)</div>
                <div style="font-size:1.15rem; font-weight:800; color:var(--text-primary);">${sub.fa4}</div>
              </div>
              <div style="text-align:center;">
                <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase;">SA 1 (80)</div>
                <div style="font-size:1.15rem; font-weight:800; color:var(--indigo);">${sub.sa1}</div>
              </div>
              <div style="text-align:center;">
                <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase;">Slip Tests</div>
                <div style="font-size:1.15rem; font-weight:800; color:#059669;">${sub.slipTests}%</div>
              </div>
              <div style="text-align:center;">
                <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase;">Total Marks</div>
                <div style="font-size:1.15rem; font-weight:900; color:#1e1b4b;">${sub.totalScore}%</div>
              </div>
            </div>

            <!-- Project & Strengths -->
            <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:10px;">
              <span>📁 <strong>Project Submission:</strong> ${sub.projectWork}</span> • 
              <span>⭐ <strong>Key Strengths:</strong> ${sub.strengths}</span>
            </div>

            <!-- GAP TO BE PLUGGED ALERT BOX -->
            <div class="gap-remedy-alert">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
                <div style="flex:1;">
                  <div style="font-size:0.78rem; font-weight:800; color:#92400e; text-transform:uppercase; margin-bottom:2px; display:flex; align-items:center; gap:6px;">
                    <i data-lucide="alert-triangle" style="width:14px; height:14px;"></i> Concept / Speed Gap Identified:
                  </div>
                  <div style="font-size:0.88rem; color:#78350f; font-weight:600;">${sub.identifiedGap}</div>

                  <div style="font-size:0.78rem; font-weight:800; color:#065f46; text-transform:uppercase; margin-top:8px; margin-bottom:2px; display:flex; align-items:center; gap:6px;">
                    <i data-lucide="check-circle" style="width:14px; height:14px;"></i> What is to be done (Remedial Plugging Action):
                  </div>
                  <div style="font-size:0.88rem; color:#047857; font-weight:700;">${sub.remedialAction}</div>
                </div>

                <div style="text-align:right;">
                  <span class="badge ${sub.gapStatus.indexOf('Plugged Successfully') !== -1 ? 'badge-success' : 'badge-warning'}">
                    ${sub.gapStatus}
                  </span>
                  <div style="margin-top:6px;">
                    <button type="button" onclick="plugSubjectGap('${sub.subject}')" style="padding:6px 14px; background:#10b981; color:white; border-radius:6px; font-weight:700; font-size:0.75rem; border:none; cursor:pointer;">
                      ✓ Mark Gap Plugged
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        `).join('')}
      </div>
    `;

    window.plugSubjectGap = function(subjectName) {
      const student = MOCK_DATA.gpaSubjectDiagnostics[0];
      const sub = student.subjects.find(s => s.subject === subjectName);
      if (sub) {
        sub.gapStatus = 'Plugged Successfully';
        showToast(`Remedial action verified! Learning gap plugged for ${subjectName}.`);
        renderGpaDiagnosticsScreen(roleFilter);
      }
    };

    refreshLucideIcons();
  }

  /* 28. TEACHING METHODOLOGY, FEEDBACK METRICS & STUDENT SATISFACTION (POINTS 3, 4, 9) */
  let activeMethodologyTab = 'methodology_gaps'; // 'metrics', 'methodology_gaps', 'satisfaction'

  function renderMethodologySatisfactionScreen(roleFilter) {
    const fm = MOCK_DATA.feedbackMetrics;
    const tm = MOCK_DATA.teachingMethodologyData;
    const ssi = MOCK_DATA.studentSatisfactionIndex;

    contentViewport.innerHTML = `
      <div class="panel-card" style="margin-bottom:20px;">
        <div class="panel-header">
          <div>
            <h2 style="font-size:1.3rem; font-weight:800; color:var(--text-primary); margin:0; display:flex; align-items:center; gap:8px;">
              <i data-lucide="sparkles" style="color:var(--indigo);"></i> Teaching Methodology, Feedback Metrics & Student Satisfaction
            </h2>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:4px;">
              Pillars 3, 4 & 9: Opinion collection on pedagogy, gap identification, improvement action plans, and student satisfaction index.
            </p>
          </div>
          <span class="badge badge-indigo">School-Wide Analytics</span>
        </div>
      </div>

      <!-- TABS -->
      <div class="feedback-tabs" style="margin-bottom:20px;">
        <button type="button" class="feedback-tab-btn ${activeMethodologyTab === 'methodology_gaps' ? 'active' : ''}" onclick="switchMethodologyTab('methodology_gaps')">
          <i data-lucide="book-open"></i> 4. Teaching Methodology (Opinions & Gaps)
        </button>
        <button type="button" class="feedback-tab-btn ${activeMethodologyTab === 'metrics' ? 'active' : ''}" onclick="switchMethodologyTab('metrics')">
          <i data-lucide="bar-chart-2"></i> 3. Feedback Metrics (Subject & Class Wise)
        </button>
        <button type="button" class="feedback-tab-btn ${activeMethodologyTab === 'satisfaction' ? 'active' : ''}" onclick="switchMethodologyTab('satisfaction')">
          <i data-lucide="smile"></i> 9. Level of Satisfaction of Students
        </button>
      </div>

      ${activeMethodologyTab === 'methodology_gaps' ? `
        <!-- TAB 4: TEACHING METHODOLOGY (OPINION COLLECTION -> GAPS -> WHAT IS TO BE DONE) -->
        <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:30px;">
          ${tm.map(item => `
            <div class="panel-card" style="border-left:5px solid var(--indigo);">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                <div>
                  <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-primary); margin:0;">${item.subject}</h3>
                  <div style="font-size:0.82rem; color:var(--text-secondary); margin-top:2px;">
                    Lead Faculty: <strong>${item.teacher}</strong> • Method: <em>${item.methodologyUsed}</em>
                  </div>
                </div>
                <span class="badge badge-success">${item.status}</span>
              </div>

              <!-- 3-STEP PIPELINE: OPINIONS -> GAPS -> ACTION PLAN -->
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
                <!-- Step 1: Opinions -->
                <div class="feedback-content-box" style="background:var(--bg-card);">
                  <div class="feedback-label" style="color:var(--indigo);">💬 Step 1: Student Opinion Collection</div>
                  <div style="display:flex; flex-direction:column; gap:8px; margin-top:6px;">
                    ${item.studentOpinions.map(op => `
                      <div style="font-size:0.82rem; color:var(--text-secondary); font-style:italic; border-left:2px solid var(--indigo); padding-left:8px;">${op}</div>
                    `).join('')}
                  </div>
                </div>

                <!-- Step 2: Gaps -->
                <div class="feedback-content-box" style="background:#fffbeb; border-color:#fef3c7;">
                  <div class="feedback-label" style="color:#b45309;">⚠️ Step 2: Pedagogical Gaps Identified</div>
                  <ul style="margin:6px 0 0 16px; padding:0; font-size:0.82rem; color:#78350f;">
                    ${item.identifiedGaps.map(g => `<li style="margin-bottom:4px;">${g}</li>`).join('')}
                  </ul>
                </div>

                <!-- Step 3: What is to be done -->
                <div class="feedback-content-box" style="background:#f0fdf4; border-color:#bbf7d0;">
                  <div class="feedback-label" style="color:#047857;">🎯 Step 3: What is to be done for improvement</div>
                  <ul style="margin:6px 0 0 16px; padding:0; font-size:0.82rem; color:#065f46; font-weight:600;">
                    ${item.improvementActionPlan.map(a => `<li style="margin-bottom:4px;">${a}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>
          `).join('')}

          <!-- STUDENT OPINION CONTRIBUTION BOX -->
          <div class="panel-card" style="background:linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(16,185,129,0.05) 100%); border:1px solid rgba(99,102,241,0.2);">
            <div class="panel-header" style="margin-bottom:10px;">
              <h3 class="panel-title"><i data-lucide="message-circle" style="color:var(--indigo);"></i> Submit Your Opinion on Teaching Methodology</h3>
              <span class="badge badge-indigo">Student & Peer Teacher Voice</span>
            </div>
            <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:12px;">Share what teaching techniques help you learn best and what can be improved in classroom deliveries.</p>
            <form id="methodologyOpinionForm" style="display:flex; gap:10px; flex-wrap:wrap;">
              <select id="moSubject" style="padding:10px 14px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card); font-size:0.85rem; font-weight:600; color:var(--text-primary);">
                <option value="Mathematics">📐 Mathematics</option>
                <option value="Physical Science">🔬 Physical Science</option>
                <option value="Social Studies">📜 Social Studies</option>
                <option value="English">📖 English</option>
              </select>
              <input type="text" id="moText" placeholder="e.g. Please show more 3D model animations and slow down step 2 of quadratic proofs..." required style="flex:1; min-width:260px; padding:10px 14px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card); font-size:0.85rem; color:var(--text-primary);">
              <button type="submit" class="btn-primary" style="padding:10px 18px; border-radius:8px; font-weight:700; font-size:0.85rem; background:var(--indigo); color:white; border:none; cursor:pointer;">
                Submit Opinion
              </button>
            </form>
          </div>
        </div>
      ` : activeMethodologyTab === 'metrics' ? `
        <!-- TAB 3: FEEDBACK METRICS (SUBJECT & CLASS WISE) -->
        <div style="display:flex; flex-direction:column; gap:20px; margin-bottom:30px;">
          <!-- SUBJECT WISE -->
          <div class="panel-card">
            <div class="panel-header" style="margin-bottom:14px;">
              <h3 class="panel-title"><i data-lucide="book-open" style="color:var(--indigo);"></i> Subject-Wise Feedback Breakdown</h3>
              <span class="badge badge-indigo">${fm.totalDailyFeedbacksSubmitted} Total Logs</span>
            </div>
            <div style="overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; font-size:0.88rem;">
                <thead>
                  <tr style="border-bottom:2px solid var(--border-color); text-align:left; color:var(--text-muted); font-size:0.75rem; text-transform:uppercase;">
                    <th style="padding:10px 12px;">Subject</th>
                    <th style="padding:10px 12px;">Average Rating</th>
                    <th style="padding:10px 12px;">Comprehension Pace</th>
                    <th style="padding:10px 12px;">Doubts Reported</th>
                    <th style="padding:10px 12px;">Satisfaction %</th>
                  </tr>
                </thead>
                <tbody>
                  ${fm.subjectWiseMetrics.map(s => `
                    <tr style="border-bottom:1px solid var(--border-color);">
                      <td style="padding:12px; font-weight:700; color:var(--text-primary);">${s.subject}</td>
                      <td style="padding:12px; font-weight:800; color:var(--indigo);">${s.avgRating} ★</td>
                      <td style="padding:12px;"><span class="badge badge-success">${s.perfectPace}% Paced Perfectly</span></td>
                      <td style="padding:12px;"><span class="badge badge-warning">${s.doubtsReported} Flagged</span></td>
                      <td style="padding:12px; font-weight:800; color:#059669;">${s.satisfactionRate}%</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- CLASS WISE -->
          <div class="panel-card">
            <div class="panel-header" style="margin-bottom:14px;">
              <h3 class="panel-title"><i data-lucide="users" style="color:var(--emerald);"></i> Class-Wise Academic & Conduct Metrics</h3>
              <span class="badge badge-emerald">Model Classrooms</span>
            </div>
            <div style="overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; font-size:0.88rem;">
                <thead>
                  <tr style="border-bottom:2px solid var(--border-color); text-align:left; color:var(--text-muted); font-size:0.75rem; text-transform:uppercase;">
                    <th style="padding:10px 12px;">Grade & Section</th>
                    <th style="padding:10px 12px;">Feedback Rating</th>
                    <th style="padding:10px 12px;">Attendance %</th>
                    <th style="padding:10px 12px;">Homework Completion</th>
                    <th style="padding:10px 12px;">Benchmark Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${fm.classWiseMetrics.map(c => `
                    <tr style="border-bottom:1px solid var(--border-color);">
                      <td style="padding:12px; font-weight:700; color:var(--text-primary);">${c.grade}</td>
                      <td style="padding:12px; font-weight:800; color:var(--indigo);">${c.avgRating} ★</td>
                      <td style="padding:12px; font-weight:700;">${c.attendancePct}%</td>
                      <td style="padding:12px; font-weight:700; color:#059669;">${c.homeworkCompletion}%</td>
                      <td style="padding:12px;"><span class="badge badge-indigo">${c.status}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ` : `
        <!-- TAB 9: LEVEL OF SATISFACTION OF STUDENTS -->
        <div style="display:flex; flex-direction:column; gap:20px; margin-bottom:30px;">
          <div class="panel-card" style="background:linear-gradient(135deg, #065f46 0%, #047857 100%); color:white; border:none;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
              <div>
                <h3 style="font-size:1.3rem; font-weight:800; color:white; margin:0;">Overall Student Satisfaction Index</h3>
                <p style="font-size:0.85rem; color:#a7f3d0; margin-top:4px;">Aggregated across all 832 enrolled students in Vikas Grammar School.</p>
              </div>
              <div style="font-size:2.4rem; font-weight:900; color:#d1fae5;">${ssi.overallIndexScore}%</div>
            </div>
            
            <div style="display:flex; gap:14px; margin-top:16px; flex-wrap:wrap;">
              <div style="background:rgba(255,255,255,0.15); padding:8px 16px; border-radius:8px;">
                <span style="font-size:0.75rem; display:block;">Highly Satisfied</span>
                <strong style="font-size:1.1rem;">${ssi.satisfactionBands.highlySatisfiedPct}%</strong>
              </div>
              <div style="background:rgba(255,255,255,0.15); padding:8px 16px; border-radius:8px;">
                <span style="font-size:0.75rem; display:block;">Satisfied</span>
                <strong style="font-size:1.1rem;">${ssi.satisfactionBands.satisfiedPct}%</strong>
              </div>
              <div style="background:rgba(255,255,255,0.15); padding:8px 16px; border-radius:8px;">
                <span style="font-size:0.75rem; display:block;">Neutral</span>
                <strong style="font-size:1.1rem;">${ssi.satisfactionBands.neutralPct}%</strong>
              </div>
              <div style="background:rgba(255,255,255,0.15); padding:8px 16px; border-radius:8px;">
                <span style="font-size:0.75rem; display:block;">Dissatisfied</span>
                <strong style="font-size:1.1rem;">${ssi.satisfactionBands.dissatisfiedPct}%</strong>
              </div>
            </div>
          </div>

          <!-- PARAMETER RATINGS -->
          <div class="panel-card">
            <div class="panel-header" style="margin-bottom:14px;">
              <h3 class="panel-title"><i data-lucide="check-square" style="color:var(--emerald);"></i> Core Satisfaction Parameters</h3>
              <span class="badge badge-success">High Engagement</span>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
              ${ssi.parameterRatings.map(pr => `
                <div class="feedback-content-box">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <span style="font-size:0.88rem; font-weight:700; color:var(--text-primary);">${pr.parameter}</span>
                    <span class="badge badge-indigo">${pr.status}</span>
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:baseline;">
                    <span style="font-size:1.3rem; font-weight:900; color:var(--indigo);">${pr.score} <span style="font-size:0.75rem; color:var(--text-muted);">/ 5.0</span></span>
                    <span style="font-size:0.75rem; color:#047857; font-weight:700;">${Math.round((pr.score/pr.max)*100)}% Positive</span>
                  </div>
                  <div class="benchmark-bar-track">
                    <div class="benchmark-bar-fill" style="width:${(pr.score/pr.max)*100}%; background:#10b981;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `}
    `;

    // Tab switcher
    window.switchMethodologyTab = function(tab) {
      activeMethodologyTab = tab;
      renderMethodologySatisfactionScreen(roleFilter);
    };

    // Handle opinion form submit
    const opForm = document.getElementById('methodologyOpinionForm');
    opForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const sub = document.getElementById('moSubject')?.value;
      const text = document.getElementById('moText')?.value;
      if (text) {
        const item = tm.find(x => x.subject.indexOf(sub) !== -1) || tm[0];
        item.studentOpinions.unshift(`“${text.trim()}” — Student Voice`);
        showToast('Thank you! Your teaching methodology opinion was submitted.');
        renderMethodologySatisfactionScreen(roleFilter);
      }
    });

    refreshLucideIcons();
  }

  /* 29. TEACHER-STUDENT RELATIONS & 360° STUDENT BEHAVIOUR (POINTS 1 & 7) */
  let activeRelationsTab = 'relations'; // 'relations' or 'behaviour_matrix'

  function renderRelationsAndConductScreen(roleFilter) {
    const rels = MOCK_DATA.teacherStudentRelations;
    const behs = MOCK_DATA.studentBehaviourRecords;

    contentViewport.innerHTML = `
      <div class="panel-card" style="margin-bottom:20px;">
        <div class="panel-header">
          <div>
            <h2 style="font-size:1.3rem; font-weight:800; color:var(--text-primary); margin:0; display:flex; align-items:center; gap:8px;">
              <i data-lucide="heart-handshake" style="color:var(--indigo);"></i> Teacher-Student Relations & 360° Student Behaviour
            </h2>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:4px;">
              Pillars 1 & 7: Positive classroom bonding, mutual respect, peer cooperation, teacher respect, and overall conduct.
            </p>
          </div>
          <span class="badge badge-emerald">Campus Harmony</span>
        </div>
      </div>

      <!-- TABS -->
      <div class="feedback-tabs" style="margin-bottom:20px;">
        <button type="button" class="feedback-tab-btn ${activeRelationsTab === 'relations' ? 'active' : ''}" onclick="switchRelationsTab('relations')">
          <i data-lucide="users"></i> 7. Teacher-Student Relations in All Classes
        </button>
        <button type="button" class="feedback-tab-btn ${activeRelationsTab === 'behaviour_matrix' ? 'active' : ''}" onclick="switchRelationsTab('behaviour_matrix')">
          <i data-lucide="user-check"></i> 1. Student 360° Behaviour (Co-Students, Teachers & Overall)
        </button>
      </div>

      ${activeRelationsTab === 'relations' ? `
        <!-- TAB 7: TEACHER-STUDENT RELATIONS -->
        <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:30px;">
          ${rels.map(r => `
            <div class="panel-card" style="border-left:5px solid var(--emerald);">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
                <div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-primary); margin:0;">${r.grade}</h3>
                    <span class="badge badge-indigo">Class Mentor: ${r.classMentor}</span>
                    <span class="badge badge-info">${r.totalStudents} Students</span>
                  </div>
                </div>
                <div style="text-align:right;">
                  <span style="font-size:1.3rem; font-weight:900; color:#059669;">${r.rapportIndex} <span style="font-size:0.75rem; color:var(--text-muted);">/ 10</span></span>
                  <div style="font-size:0.72rem; color:#047857; font-weight:700;">Rapport: ${r.approachabilityRating}</div>
                </div>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <div class="feedback-content-box">
                  <div class="feedback-label">🌞 Classroom Climate & Trust</div>
                  <div class="feedback-text">${r.classroomClimate}</div>
                </div>
                <div class="feedback-content-box">
                  <div class="feedback-label">👩‍🏫 Mentor's Observation</div>
                  <div class="feedback-text">${r.mentorComments}</div>
                </div>
              </div>

              <div class="principal-note-box" style="margin-top:10px;">
                <div class="feedback-label" style="color:#5b21b6;">
                  <i data-lucide="shield-check" style="width:14px; height:14px;"></i> Headmaster Periodic Classroom Climate Audit
                </div>
                <div class="feedback-text" style="color:#4c1d95; font-size:0.85rem; font-weight:600;">"${r.principalAudit}"</div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : `
        <!-- TAB 1: STUDENT 360° BEHAVIOUR MATRIX -->
        <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:30px;">
          ${behs.map(b => `
            <div class="panel-card" style="border-left:5px solid var(--indigo);">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
                <div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-primary); margin:0;">${b.studentName}</h3>
                    <span class="badge badge-indigo">Roll: ${b.rollNo}</span>
                    <span class="badge badge-info">${b.grade}</span>
                  </div>
                  <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:2px;">
                    Mentor: <strong>${b.mentorTeacher}</strong> • Evaluated: ${b.lastEvaluation}
                  </div>
                </div>
                <div>
                  <span class="badge badge-success" style="font-size:0.85rem; padding:6px 12px;">
                    Overall: ${b.overallConduct.level}
                  </span>
                </div>
              </div>

              <!-- 3-WAY CONDUCT GRID: CO-STUDENTS, TEACHERS, OVERALL -->
              <div class="conduct-3way-grid">
                <!-- 1. Co-students -->
                <div class="conduct-box co-students">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span style="font-size:0.75rem; font-weight:800; color:#1d4ed8; text-transform:uppercase;">🤝 With Co-Students</span>
                      <span style="font-weight:800; color:#1d4ed8;">${b.coStudentsBehaviour.rating} ★</span>
                    </div>
                    <div style="font-size:0.85rem; font-weight:700; color:var(--text-primary); margin:4px 0;">${b.coStudentsBehaviour.level}</div>
                    <div style="font-size:0.82rem; color:var(--text-secondary);">${b.coStudentsBehaviour.notes}</div>
                  </div>
                </div>

                <!-- 2. Teachers -->
                <div class="conduct-box teachers">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span style="font-size:0.75rem; font-weight:800; color:#4338ca; text-transform:uppercase;">👩‍🏫 With Teachers</span>
                      <span style="font-weight:800; color:#4338ca;">${b.teachersBehaviour.rating} ★</span>
                    </div>
                    <div style="font-size:0.85rem; font-weight:700; color:var(--text-primary); margin:4px 0;">${b.teachersBehaviour.level}</div>
                    <div style="font-size:0.82rem; color:var(--text-secondary);">${b.teachersBehaviour.notes}</div>
                  </div>
                </div>

                <!-- 3. Overall Conduct -->
                <div class="conduct-box overall">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span style="font-size:0.75rem; font-weight:800; color:#047857; text-transform:uppercase;">⭐ Overall Conduct</span>
                      <span style="font-weight:800; color:#047857;">${b.overallConduct.rating} ★</span>
                    </div>
                    <div style="font-size:0.85rem; font-weight:700; color:var(--text-primary); margin:4px 0;">${b.overallConduct.level}</div>
                    <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:2px;">
                      • Punctuality: <strong>${b.overallConduct.punctuality}</strong><br>
                      • Uniform: <strong>${b.overallConduct.uniformEtiquette}</strong><br>
                      • Discipline: <strong>${b.overallConduct.campusDiscipline}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Commendations and Guidance -->
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-top:10px; padding-top:8px; border-top:1px dashed var(--border-color); font-size:0.8rem;">
                <div>
                  <span style="color:var(--text-muted);">🏅 Commendations:</span>
                  ${b.commendations.map(c => `<span class="badge badge-emerald" style="margin-left:4px;">${c}</span>`).join('')}
                </div>
                <div style="color:#854d0e;">
                  👁️ <em>Guidance: ${b.areasToWatch}</em>
                </div>
              </div>

            </div>
          `).join('')}
        </div>
      `}
    `;

    window.switchRelationsTab = function(tab) {
      activeRelationsTab = tab;
      renderRelationsAndConductScreen(roleFilter);
    };

    refreshLucideIcons();
  }

  /* 30. FACILITIES & SAFETY INCIDENT LOG (POINTS 5 & 6) */
  let activeFacilitiesTab = 'facilities'; // 'facilities' or 'incidents'

  function renderFacilitiesIncidentsScreen(roleFilter) {
    const fac = MOCK_DATA.campusFacilitiesData;
    const incs = MOCK_DATA.unusualIncidents;

    contentViewport.innerHTML = `
      <div class="panel-card" style="margin-bottom:20px;">
        <div class="panel-header">
          <div>
            <h2 style="font-size:1.3rem; font-weight:800; color:var(--text-primary); margin:0; display:flex; align-items:center; gap:8px;">
              <i data-lucide="shield-alert" style="color:var(--indigo);"></i> Campus Facilities & Safety Incident Log
            </h2>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:4px;">
              Pillars 5 & 6: Student amenities (Toilets, Drinking Water, Maintenance) and "Anything unusual happened" safety anomaly tracking.
            </p>
          </div>
          <span class="badge badge-success">Clean & Safe Campus</span>
        </div>
      </div>

      <!-- TABS -->
      <div class="feedback-tabs" style="margin-bottom:20px;">
        <button type="button" class="feedback-tab-btn ${activeFacilitiesTab === 'facilities' ? 'active' : ''}" onclick="switchFacilitiesTab('facilities')">
          <i data-lucide="coffee"></i> 5. Facilities for Students (Toilets, Drinking Water, Maintenance)
        </button>
        <button type="button" class="feedback-tab-btn ${activeFacilitiesTab === 'incidents' ? 'active' : ''}" onclick="switchFacilitiesTab('incidents')">
          <i data-lucide="alert-triangle"></i> 6. Anything Unusual Happened (Incident & Safety Log)
        </button>
      </div>

      ${activeFacilitiesTab === 'facilities' ? `
        <!-- TAB 5: FACILITIES -->
        <div style="margin-bottom:30px;">
          <!-- AUDIT STATUS -->
          <div class="panel-card" style="margin-bottom:20px; background:linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(6,182,212,0.08) 100%); border:1px solid #a7f3d0;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div>
                <span class="badge badge-success">Hygiene Audit Verified</span>
                <h3 style="font-size:1.15rem; font-weight:800; color:#065f46; margin:4px 0;">Campus Hygiene & Amenities Score: ${fac.overallCampusHygieneScore}%</h3>
                <span style="font-size:0.8rem; color:#047857;">Last Certified: ${fac.lastHygieneAudit}</span>
              </div>
              <button type="button" onclick="showToast('Recorded new hygiene sweep audit!')" class="btn-primary" style="padding:8px 16px; border-radius:8px; background:#10b981; color:white; border:none; font-weight:700; font-size:0.82rem; cursor:pointer;">
                + Log Routine Cleaning Audit
              </button>
            </div>
          </div>

          <!-- FACILITY NODES GRID -->
          <div class="facility-grid">
            ${fac.facilityNodes.map(f => `
              <div class="facility-card">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                  <div>
                    <span class="badge badge-indigo" style="font-size:0.7rem;">${f.category}</span>
                    <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-primary); margin:4px 0;">${f.name}</h4>
                  </div>
                  <span class="badge badge-success">${f.status}</span>
                </div>

                <div style="font-size:0.82rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:4px; margin-bottom:12px;">
                  <div>🧹 <strong>Last Sanitized:</strong> ${f.lastCleaned}</div>
                  ${f.tdsLevel ? `<div>💧 <strong>Water Quality:</strong> TDS: ${f.tdsLevel} • pH: ${f.phLevel}</div>` : ''}
                  ${f.chillerFunctioning ? `<div>❄️ <strong>Cooling:</strong> ${f.chillerFunctioning}</div>` : ''}
                  ${f.runningWaterSupply ? `<div>🚰 <strong>Running Water:</strong> ${f.runningWaterSupply}</div>` : ''}
                  ${f.soapDispensers ? `<div>🧼 <strong>Soap Dispensers:</strong> ${f.soapDispensers}</div>` : ''}
                  ${f.ventilationFans ? `<div>💨 <strong>Ventilation:</strong> ${f.ventilationFans}</div>` : ''}
                  ${f.incineratorUnit ? `<div>🛡️ <strong>Sanitary Incinerator:</strong> ${f.incineratorUnit}</div>` : ''}
                </div>

                <div style="font-size:0.78rem; color:var(--text-muted); border-top:1px dashed var(--border-color); padding-top:8px;">
                  📝 ${f.maintenanceNotes}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- MAINTENANCE TICKETS LOG -->
          <div class="panel-card">
            <div class="panel-header" style="margin-bottom:14px;">
              <h3 class="panel-title"><i data-lucide="wrench" style="color:var(--indigo);"></i> Campus Maintenance Tickets</h3>
              <button type="button" onclick="document.getElementById('reportIssueBox').scrollIntoView({behavior:'smooth'})" class="btn-primary" style="padding:6px 14px; border-radius:6px; font-size:0.78rem; background:var(--indigo); color:white; border:none; cursor:pointer;">
                + Report Maintenance Issue
              </button>
            </div>

            <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
              ${fac.maintenanceTickets.map(t => `
                <div style="padding:12px 14px; background:var(--bg-card-sub); border:1px solid var(--border-color); border-radius:8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                  <div>
                    <div style="display:flex; align-items:center; gap:8px;">
                      <strong style="color:var(--text-primary); font-size:0.9rem;">${t.facility}</strong>
                      <span class="badge badge-indigo">${t.ticketId}</span>
                      <span class="badge ${t.priority === 'Medium' ? 'badge-warning' : 'badge-info'}">${t.priority} Priority</span>
                    </div>
                    <div style="font-size:0.82rem; color:var(--text-secondary); margin-top:2px;">
                      Issue: <strong>${t.issue}</strong> • Reported by: ${t.reportedBy} on ${t.date}
                    </div>
                  </div>
                  <div style="text-align:right;">
                    <span class="badge badge-success">${t.status}</span>
                    <div style="font-size:0.72rem; color:var(--text-muted); margin-top:2px;">Assigned: ${t.assignedTo}</div>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- TICKET REPORT FORM -->
            <div id="reportIssueBox" style="background:var(--bg-card); padding:16px; border:1px solid var(--border-color); border-radius:10px;">
              <h4 style="font-size:0.95rem; font-weight:800; color:var(--text-primary); margin-bottom:10px;">
                Report an Amenity / Toilet / Drinking Water Maintenance Need
              </h4>
              <form id="maintenanceReportForm" style="display:flex; flex-direction:column; gap:10px;">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                  <div>
                    <label style="font-size:0.78rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Facility Location *</label>
                    <input type="text" id="mrfLocation" placeholder="e.g. Boys Restroom Ground Floor Tap 4" required style="width:100%; padding:8px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.85rem;">
                  </div>
                  <div>
                    <label style="font-size:0.78rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Priority *</label>
                    <select id="mrfPriority" style="width:100%; padding:8px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.85rem;">
                      <option value="Low">Low Priority</option>
                      <option value="Medium" selected>Medium Priority</option>
                      <option value="High">High / Urgent (Water leak/Hygiene)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style="font-size:0.78rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Description of Issue *</label>
                  <input type="text" id="mrfIssue" placeholder="e.g. Soap dispenser empty, needs refill / low water pressure" required style="width:100%; padding:8px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-sub); color:var(--text-primary); font-size:0.85rem;">
                </div>
                <button type="submit" class="btn-primary" style="padding:10px 16px; background:var(--indigo); color:white; border-radius:8px; font-weight:700; font-size:0.85rem; border:none; cursor:pointer; align-self:flex-start;">
                  <i data-lucide="send"></i> Dispatch Maintenance Ticket
                </button>
              </form>
            </div>
          </div>
        </div>
      ` : `
        <!-- TAB 6: ANYTHING UNUSUAL HAPPENED (INCIDENT & SAFETY LOG) -->
        <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:30px;">
          <!-- LOG INCIDENT FORM -->
          <div class="panel-card" style="background:#fef2f2; border:1px solid #fecaca;">
            <div class="panel-header" style="margin-bottom:10px;">
              <h3 class="panel-title" style="color:#991b1b;"><i data-lucide="shield-alert"></i> 6. Log Unusual Event / Safety Anomaly</h3>
              <span class="badge badge-danger">Immediate Headmaster Attention</span>
            </div>
            <p style="font-size:0.82rem; color:#b91c1c; margin-bottom:12px;">
              Document any playground scrapes, medical dizziness, power/weather fluctuations, bus route delays, or behavioral conflicts.
            </p>

            <form id="unusualIncidentForm" style="display:flex; flex-direction:column; gap:10px;">
              <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
                <div>
                  <label style="font-size:0.75rem; font-weight:700; color:#991b1b; display:block; margin-bottom:4px;">Nature of Incident *</label>
                  <select id="uifNature" style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid #fca5a5; background:white; font-size:0.85rem;">
                    <option value="Minor Playground Scrape / First Aid">Minor Playground Scrape / First Aid</option>
                    <option value="Student Feeling Unwell / Dizziness">Student Feeling Unwell / Dizziness</option>
                    <option value="Weather / Power Anomaly">Weather / Power Anomaly</option>
                    <option value="Transport / Bus Route Delay">Transport / Bus Route Delay</option>
                    <option value="Behavioral / Peer Friction">Behavioral / Peer Friction</option>
                  </select>
                </div>
                <div>
                  <label style="font-size:0.75rem; font-weight:700; color:#991b1b; display:block; margin-bottom:4px;">Severity Level *</label>
                  <select id="uifSeverity" style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid #fca5a5; background:white; font-size:0.85rem;">
                    <option value="Low" selected>Low (Standard campus first aid/remedy)</option>
                    <option value="Medium">Medium (Parent notification needed)</option>
                    <option value="High">High (Urgent doctor/headmaster review)</option>
                  </select>
                </div>
                <div>
                  <label style="font-size:0.75rem; font-weight:700; color:#991b1b; display:block; margin-bottom:4px;">Campus Location *</label>
                  <input type="text" id="uifLocation" placeholder="e.g. Primary playground / Room 203" required style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid #fca5a5; background:white; font-size:0.85rem;">
                </div>
              </div>

              <div>
                <label style="font-size:0.75rem; font-weight:700; color:#991b1b; display:block; margin-bottom:4px;">Description of What Happened *</label>
                <input type="text" id="uifDesc" placeholder="e.g. Master K. tripped during physical education game and grazed knee..." required style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid #fca5a5; background:white; font-size:0.85rem;">
              </div>

              <div>
                <label style="font-size:0.75rem; font-weight:700; color:#991b1b; display:block; margin-bottom:4px;">Immediate Action Taken *</label>
                <input type="text" id="uifAction" placeholder="e.g. First aid administered in clinic, wound sanitized, resting peacefully..." required style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid #fca5a5; background:white; font-size:0.85rem;">
              </div>

              <button type="submit" class="btn-primary" style="padding:10px 18px; background:#b91c1c; color:white; border-radius:8px; font-weight:700; font-size:0.85rem; border:none; cursor:pointer; align-self:flex-start;">
                <i data-lucide="shield"></i> Record Incident to Safety Log
              </button>
            </form>
          </div>

          <!-- INCIDENTS LIST -->
          <div>
            <div class="panel-header" style="margin-bottom:12px;">
              <h3 class="panel-title"><i data-lucide="history" style="color:var(--indigo);"></i> Incident & Safety Event History (${incs.length})</h3>
              <span class="badge badge-indigo">Statutory Safety Protocol</span>
            </div>

            <div style="display:flex; flex-direction:column; gap:14px;">
              ${incs.map(inc => `
                <div class="incident-card sev-${inc.severity.toLowerCase()}">
                  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
                    <div>
                      <div style="display:flex; align-items:center; gap:8px;">
                        <h4 style="font-size:1.1rem; font-weight:800; color:var(--text-primary); margin:0;">${inc.natureOfIncident}</h4>
                        <span class="sev-pill ${inc.severity.toLowerCase()}">${inc.severity} Severity</span>
                        <span class="badge badge-indigo">📍 ${inc.location}</span>
                      </div>
                      <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:2px;">
                        Logged on: <strong>${inc.date} at ${inc.time}</strong> • Reported by: <strong>${inc.reportedBy}</strong>
                      </div>
                    </div>
                    <div>
                      <span class="badge ${inc.parentInformed.indexOf('Yes') !== -1 ? 'badge-success' : 'badge-warning'}">
                        Parent Informed: ${inc.parentInformed}
                      </span>
                    </div>
                  </div>

                  <div style="font-size:0.88rem; color:var(--text-primary); margin:8px 0;">
                    ${inc.description}
                  </div>

                  <div class="feedback-content-box" style="background:#f0fdf4; border-color:#bbf7d0; margin-bottom:8px;">
                    <div class="feedback-label" style="color:#047857;">🚑 Immediate Action Taken:</div>
                    <div class="feedback-text" style="color:#065f46; font-weight:600;">${inc.immediateActionTaken}</div>
                  </div>

                  <div class="principal-note-box">
                    <div class="feedback-label" style="color:#5b21b6;">
                      <i data-lucide="award" style="width:14px; height:14px;"></i> Headmaster Resolution & Safety Sign-off:
                    </div>
                    <div class="feedback-text" style="color:#4c1d95; font-size:0.85rem; font-weight:600;">"${inc.principalSignOff}"</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `}
    `;

    window.switchFacilitiesTab = function(tab) {
      activeFacilitiesTab = tab;
      renderFacilitiesIncidentsScreen(roleFilter);
    };

    // Maintenance ticket handler
    const mrf = document.getElementById('maintenanceReportForm');
    mrf?.addEventListener('submit', (e) => {
      e.preventDefault();
      const loc = document.getElementById('mrfLocation')?.value;
      const prio = document.getElementById('mrfPriority')?.value;
      const iss = document.getElementById('mrfIssue')?.value;
      if (loc && iss) {
        fac.maintenanceTickets.unshift({
          ticketId: `TKT-2026-09${fac.maintenanceTickets.length + 1}`,
          facility: loc,
          reportedBy: `${activeRole.toUpperCase()} Portal User`,
          date: 'Sep 02, 2026',
          issue: iss,
          priority: prio,
          status: 'Dispatched to Campus Caretaker',
          assignedTo: 'Mr. Mallesh (Campus Caretaker)'
        });
        showToast('Maintenance ticket dispatched! Campus caretaker notified.');
        renderFacilitiesIncidentsScreen(roleFilter);
      }
    });

    // Incident report handler
    const uif = document.getElementById('unusualIncidentForm');
    uif?.addEventListener('submit', (e) => {
      e.preventDefault();
      const nat = document.getElementById('uifNature')?.value;
      const sev = document.getElementById('uifSeverity')?.value;
      const loc = document.getElementById('uifLocation')?.value;
      const desc = document.getElementById('uifDesc')?.value;
      const act = document.getElementById('uifAction')?.value;
      if (loc && desc && act) {
        incs.unshift({
          id: `inc_${Date.now()}`,
          date: '2026-09-02',
          time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}),
          location: loc,
          reportedBy: `${activeRole.toUpperCase()} Duty Log`,
          natureOfIncident: nat,
          severity: sev,
          description: desc,
          immediateActionTaken: act,
          parentInformed: sev === 'Low' ? 'Noted in daily register' : 'Yes (Telephone dispatch)',
          principalReviewed: true,
          principalSignOff: 'Reviewed by Headmaster K. Rajesham. Action taken validated.'
        });
        showToast('Safety incident logged and dispatched to Headmaster!');
        renderFacilitiesIncidentsScreen(roleFilter);
      }
    });

    refreshLucideIcons();
  }

  /* 31. HOW THE CLASSES ARE GOING ON (POINT 8: PACING & DAILY PROGRESS) */
  function renderClassPacingDiaryScreen(roleFilter) {
    const pacing = MOCK_DATA.classSyllabusPacing[0]; // Class VIII A

    contentViewport.innerHTML = `
      <div class="panel-card" style="margin-bottom:20px;">
        <div class="panel-header">
          <div>
            <h2 style="font-size:1.3rem; font-weight:800; color:var(--text-primary); margin:0; display:flex; align-items:center; gap:8px;">
              <i data-lucide="clock" style="color:var(--indigo);"></i> 8. How The Classes Are Going On (Pacing & Syllabus Coverage)
            </h2>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:4px;">
              SCERT Telangana syllabus milestone tracking, period-by-period daily classroom progress, and syllabus pacing buffers.
            </p>
          </div>
          <span class="badge badge-success">${pacing.overallPacingStatus}</span>
        </div>

        <!-- SYLLABUS PACING METER -->
        <div style="margin-top:16px; background:var(--bg-card-sub); padding:16px 18px; border-radius:10px; border:1px solid var(--border-color);">
          <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:6px;">
            <span style="font-weight:700; color:var(--text-primary); font-size:0.95rem;">${pacing.grade} — ${pacing.academicTerm}</span>
            <span style="font-size:1.1rem; font-weight:900; color:var(--indigo);">${pacing.syllabusProgressPct}% <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">(Target: ${pacing.targetForCurrentMonth}%)</span></span>
          </div>

          <div class="benchmark-bar-track" style="height:12px;">
            <div class="benchmark-bar-fill" style="width:${pacing.syllabusProgressPct}%; background:linear-gradient(90deg, #6366f1, #10b981);"></div>
          </div>

          <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-secondary); margin-top:6px;">
            <span>Term Start (June 2026)</span>
            <span style="color:#047857; font-weight:700;">✓ Ahead of Monthly SCERT Milestone</span>
            <span>SA1 Milestone (October 2026)</span>
          </div>
        </div>
      </div>

      <!-- TODAY'S PERIOD-BY-PERIOD CLASSROOM DIARY -->
      <div class="panel-card">
        <div class="panel-header" style="margin-bottom:14px;">
          <h3 class="panel-title"><i data-lucide="calendar" style="color:var(--emerald);"></i> Today's Period-by-Period Classroom Diary (Sep 02, 2026)</h3>
          <span class="badge badge-indigo">Class VIII Section A</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
          ${pacing.dailyDiaryToday.map(d => `
            <div style="padding:12px 16px; background:var(--bg-card-sub); border:1px solid var(--border-color); border-radius:8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <div style="display:flex; align-items:center; gap:12px;">
                <span class="period-badge-tag">${d.period}</span>
                <div>
                  <strong style="color:var(--text-primary); font-size:0.95rem;">${d.subject}</strong>
                  <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:2px;">
                    📖 Topic: <strong>${d.topic}</strong>
                  </div>
                </div>
              </div>
              <div>
                <span class="badge badge-success">✓ ${d.status}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    refreshLucideIcons();
  }

  /* ==========================================================================
     NEW STRATEGIC HIGH-IMPACT SCREENS
     ========================================================================== */

  /* 23. DIGITAL STUDY VAULT & CURRICULUM REPOSITORY */
  function renderStudyVaultScreen() {
    const list = activeVaultSubject === 'All'
      ? MOCK_DATA.studyVault
      : MOCK_DATA.studyVault.filter(x => x.subject.includes(activeVaultSubject));

    const subjects = ['All', 'Mathematics', 'Physical Science', 'Biological Science', 'Social Studies', 'English'];

    contentViewport.innerHTML = `
      <div class="panel-card" style="margin-bottom:20px;">
        <div class="panel-header">
          <div>
            <h2 style="font-size:1.3rem; font-weight:800; display:flex; align-items:center; gap:8px;">
              <i data-lucide="folder-down" style="color:var(--indigo);"></i> Digital Study Vault & SCERT Curriculum Repository
            </h2>
            <p style="color:var(--text-secondary); font-size:0.85rem; margin-top:4px;">Vikas Grammar School HS Cherial (UDISE: 36182100637) • Download verified question banks, formula cheat-sheets, and 5-year solved board papers.</p>
          </div>
        </div>

        <div style="display:flex; gap:8px; flex-wrap:wrap; margin:16px 0 6px 0;">
          ${subjects.map(s => `
            <button class="filter-pill ${activeVaultSubject === s ? 'active' : ''}" onclick="window.filterVaultSubject('${s}')" style="padding:6px 14px; font-size:0.8rem; border-radius:20px; font-weight:700; cursor:pointer; border:1px solid var(--border-color); background:${activeVaultSubject === s ? 'var(--indigo)' : 'var(--bg-card-sub)'}; color:${activeVaultSubject === s ? '#ffffff' : 'var(--text-primary)'};">
              ${s}
            </button>
          `).join('')}
        </div>

        <div class="vault-grid">
          ${list.map(v => `
            <div class="vault-card">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                  <span class="vault-badge">${v.badge}</span>
                  <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">${v.size}</span>
                </div>
                <h4 style="font-size:0.95rem; font-weight:800; margin-bottom:4px;">${v.title}</h4>
                <div style="font-size:0.78rem; color:var(--indigo); font-weight:700; margin-bottom:6px;">${v.subject} • ${v.chapter} (${v.standard})</div>
                <p style="font-size:0.8rem; color:var(--text-secondary); line-height:1.4;">${v.description}</p>
              </div>
              <div style="border-top:1px solid var(--border-color); padding-top:10px; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:0.72rem; color:var(--text-muted);">Verified: ${v.verifiedBy}</span>
                <button class="download-pill-btn" onclick="window.downloadVaultMaterial('${v.id}')">
                  <i data-lucide="download"></i> Download (${v.downloads})
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    refreshLucideIcons();
  }

  /* 24. DIGITAL HOMEWORK HUB & SUBMISSIONS */
  function renderStudentHomeworkScreen() {
    const list = MOCK_DATA.studentHomeworkList;
    const pendingCount = list.filter(x => x.status.includes('Pending')).length;
    const submittedCount = list.filter(x => x.status.includes('Submitted')).length;
    const gradedCount = list.filter(x => x.status.includes('Graded')).length;

    contentViewport.innerHTML = `
      <div class="panel-card" style="margin-bottom:20px;">
        <div class="panel-header">
          <div>
            <h2 style="font-size:1.3rem; font-weight:800; display:flex; align-items:center; gap:8px;">
              <i data-lucide="check-square" style="color:var(--emerald);"></i> Digital Homework Hub & Submission Ledger
            </h2>
            <p style="color:var(--text-secondary); font-size:0.85rem; margin-top:4px;">Track class task deadlines, submit notebook photos or digital copies, and view teacher marks and corrections.</p>
          </div>
        </div>

        <div class="stats-grid-4" style="margin:16px 0 20px 0;">
          <div class="stat-card">
            <div class="stat-title">Total Tasks Assigned</div>
            <div class="stat-value">${list.length}</div>
            <span class="trend-badge trend-up-blue">Active Term</span>
          </div>
          <div class="stat-card">
            <div class="stat-title">Pending Turn-In</div>
            <div class="stat-value">${pendingCount}</div>
            <span class="trend-badge trend-orange">${pendingCount > 0 ? 'Action Required' : 'All Clear'}</span>
          </div>
          <div class="stat-card">
            <div class="stat-title">Submitted Online</div>
            <div class="stat-value">${submittedCount}</div>
            <span class="trend-badge trend-purple">Awaiting Review</span>
          </div>
          <div class="stat-card">
            <div class="stat-title">Graded & Completed</div>
            <div class="stat-value">${gradedCount}</div>
            <span class="trend-badge trend-up-green">100% Avg Score</span>
          </div>
        </div>

        <div style="margin-top:14px;">
          ${list.map(hw => `
            <div class="hw-turnin-card">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
                <div>
                  <span style="font-size:0.8rem; font-weight:800; color:var(--indigo);">${hw.subject}</span>
                  <h4 style="font-size:1rem; font-weight:800; margin:4px 0;">${hw.title}</h4>
                  <div style="font-size:0.78rem; color:var(--text-muted);">Assigned by ${hw.teacher} on ${hw.assignedDate} • Due: <strong>${hw.dueDate}</strong></div>
                </div>
                <span class="hw-status-badge ${hw.status.includes('Pending') ? 'pending' : hw.status.includes('Submitted') ? 'submitted' : 'graded'}">${hw.status}</span>
              </div>
              <p style="font-size:0.82rem; color:var(--text-secondary);">${hw.instructions}</p>
              ${hw.feedback ? `
                <div style="background:rgba(16,185,129,0.1); border-left:3px solid #10b981; padding:8px 12px; border-radius:4px; font-size:0.82rem; color:#065f46;">
                  <strong>Teacher Evaluation (${hw.score}/${hw.maxMarks}):</strong> ${hw.feedback}
                </div>
              ` : ''}
              ${hw.status.includes('Pending') ? `
                <div style="display:flex; justify-content:flex-end;">
                  <button class="download-pill-btn" onclick="window.submitHomeworkOnline('${hw.id}')" style="background:#10b981;">
                    <i data-lucide="upload-cloud"></i> Turn In Online (Submit Notebook Photo)
                  </button>
                </div>
              ` : `
                <div style="font-size:0.75rem; color:var(--text-muted); text-align:right;">
                  ✓ Turn-in registered on: ${hw.submissionTime || hw.gradedDate}
                </div>
              `}
            </div>
          `).join('')}
        </div>
      </div>
    `;
    refreshLucideIcons();
  }

  /* 25. COMPETITIVE EXAMS & OLYMPIAD CORNER */
  function renderOlympiadScreen() {
    contentViewport.innerHTML = `
      <div class="panel-card" style="margin-bottom:20px;">
        <div class="panel-header">
          <div>
            <h2 style="font-size:1.3rem; font-weight:800; display:flex; align-items:center; gap:8px;">
              <i data-lucide="trophy" style="color:#f59e0b;"></i> Competitive Exams, Olympiad & Scholarship Corner
            </h2>
            <p style="color:var(--text-secondary); font-size:0.85rem; margin-top:4px;">National Means-cum-Merit Scholarship (NMMS), Telangana Science Talent Search, and daily practice drills.</p>
          </div>
        </div>

        <div style="margin-top:14px;">
          <h3 style="font-size:1rem; font-weight:800; margin-bottom:12px;">🌟 Upcoming State & National Scholarships</h3>
          ${MOCK_DATA.olympiadExams.map(o => `
            <div class="olympiad-card">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
                <div>
                  <h3 style="font-size:1.05rem; font-weight:800; color:var(--text-primary);">${o.name}</h3>
                  <div style="font-size:0.8rem; color:var(--text-muted);">${o.body} • Target: <strong>${o.eligibility}</strong></div>
                </div>
                <span class="scholarship-badge"><i data-lucide="award"></i> ${o.scholarship}</span>
              </div>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin:12px 0; background:var(--bg-card-sub); padding:10px 14px; border-radius:8px; font-size:0.82rem;">
                <div><strong>Exam Date:</strong> ${o.examDate}</div>
                <div><strong>Reg. Deadline:</strong> ${o.deadline}</div>
                <div><strong>Pattern:</strong> ${o.pattern}</div>
                <div><strong>Status:</strong> <span style="color:#059669; font-weight:700;">${o.status}</span></div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="quiz-container">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:1.05rem; font-weight:800; margin:0;"><i data-lucide="target" style="color:var(--indigo);"></i> 🎯 Daily 3-Question Scholarship Practice Drill</h3>
            <span style="font-size:0.75rem; font-weight:700; background:#ede9fe; color:#6366f1; padding:3px 10px; border-radius:12px;">NMMS & SAT Level</span>
          </div>
          ${MOCK_DATA.olympiadQuizPractice.map((q, qIdx) => `
            <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:8px; padding:14px; margin-bottom:12px;">
              <div style="font-size:0.88rem; font-weight:700; margin-bottom:10px;">Q${qIdx + 1}. ${q.question}</div>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:8px;">
                ${q.options.map((opt, optIdx) => `
                  <button class="quiz-option-btn" data-quiz-opt="${q.id}" onclick="window.selectOlympiadOption('${q.id}', ${optIdx})">
                    ${String.fromCharCode(65 + optIdx)}) ${opt}
                  </button>
                `).join('')}
              </div>
              <div id="quizExp_${q.id}" class="quiz-explanation" style="display:none; margin-top:10px; padding:8px 12px; background:rgba(99,102,241,0.08); border-left:3px solid var(--indigo); border-radius:4px; font-size:0.8rem; color:var(--text-secondary);">
                <strong>💡 Detailed Solution:</strong> ${q.explanation}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    refreshLucideIcons();
  }

  /* 26. TEACHER PROXY & TIMETABLE SUBSTITUTION */
  function renderProxySubstitutionScreen() {
    const sys = MOCK_DATA.proxySubstitutionSystem;
    contentViewport.innerHTML = `
      <div class="panel-card" style="margin-bottom:20px;">
        <div class="panel-header">
          <div>
            <h2 style="font-size:1.3rem; font-weight:800; display:flex; align-items:center; gap:8px;">
              <i data-lucide="shuffle" style="color:var(--indigo);"></i> Teacher Proxy & Timetable Substitution Engine
            </h2>
            <p style="color:var(--text-secondary); font-size:0.85rem; margin-top:4px;">Live staff absence audit, period conflict resolution, and 1-click proxy duty assignment for zero lost instructional hours.</p>
          </div>
        </div>

        <div class="stats-grid-4" style="margin:16px 0 20px 0;">
          <div class="stat-card">
            <div class="stat-title">Staff on Leave Today</div>
            <div class="stat-value">${sys.teachersOnLeave.length}</div>
            <span class="trend-badge trend-orange">Documented Leave</span>
          </div>
          <div class="stat-card">
            <div class="stat-title">Periods Affected</div>
            <div class="stat-value">3</div>
            <span class="trend-badge trend-purple">Timetable Gaps</span>
          </div>
          <div class="stat-card">
            <div class="stat-title">Proxies Confirmed</div>
            <div class="stat-value">${sys.allocatedProxies.length}</div>
            <span class="trend-badge trend-up-green">100% Covered</span>
          </div>
          <div class="stat-card">
            <div class="stat-title">Free Teachers Available</div>
            <div class="stat-value">${sys.availableFreeTeachersToday.length}</div>
            <span class="trend-badge trend-up-blue">Standby Pool</span>
          </div>
        </div>

        <div style="margin-bottom:20px;">
          <h3 style="font-size:1rem; font-weight:800; margin-bottom:10px;">📋 Today's Staff Leave & Covered Classes</h3>
          ${sys.teachersOnLeave.map(tl => `
            <div style="background:var(--bg-card-sub); border:1px solid var(--border-color); border-radius:8px; padding:12px 16px; margin-bottom:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
                <span style="font-weight:800; font-size:0.9rem;">${tl.teacherName} (${tl.subject})</span>
                <span style="font-size:0.75rem; color:var(--text-muted);">Reason: ${tl.reason}</span>
              </div>
              <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:6px;">
                Affected Periods: ${tl.periodsAffected.map(p => `<span style="background:var(--bg-card); border:1px solid var(--border-color); padding:2px 8px; border-radius:4px; margin-right:6px;">${p.period} (${p.class})</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <div style="margin-bottom:20px;">
          <h3 style="font-size:1rem; font-weight:800; margin-bottom:10px;">⚡ Active Proxy Allocations</h3>
          ${sys.allocatedProxies.map(p => `
            <div class="proxy-card">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <span class="proxy-status-pill">${p.period} (${p.time})</span>
                  <strong style="margin-left:8px;">${p.targetClass}</strong>
                </div>
                <span style="font-size:0.75rem; color:#10b981; font-weight:700;">✓ ${p.status}</span>
              </div>
              <div style="font-size:0.82rem; margin-top:6px;">
                Teacher on Leave: <del style="color:var(--text-muted);">${p.originalTeacher}</del> ➔ 
                <strong>Assigned Proxy: <span style="color:var(--indigo);">${p.assignedProxyTeacher}</span></strong>
              </div>
              <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:4px;">
                Class Activity: ${p.topicCovered} • <span style="color:#059669;">Notified via ${p.notifiedVia}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:12px; padding:16px;">
          <h4 style="font-size:0.9rem; font-weight:800; margin-bottom:8px;">👨‍🏫 Available Teachers Right Now (Free Period Standby)</h4>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            ${sys.availableFreeTeachersToday.map(ft => `
              <div class="free-teacher-chip">
                <i data-lucide="user-check" style="width:14px; height:14px; color:#10b981;"></i>
                <span>${ft.name} (${ft.subject}) — Free in ${ft.freePeriods.join(', ')}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    refreshLucideIcons();
  }

  /* 27. SCERT CCE REPORT CARD & HALL TICKET */
  function renderCceReportCardScreen() {
    const card = MOCK_DATA.cceReportCardData;
    const ht = MOCK_DATA.hallTicketData;

    contentViewport.innerHTML = `
      <div class="panel-card" style="margin-bottom:20px;">
        <div class="panel-header">
          <div>
            <h2 style="font-size:1.3rem; font-weight:800; display:flex; align-items:center; gap:8px;">
              <i data-lucide="file-text" style="color:var(--indigo);"></i> Telangana SCERT CCE Progress Card & Board Hall Ticket
            </h2>
            <p style="color:var(--text-secondary); font-size:0.85rem; margin-top:4px;">Vikas Grammar School HS Cherial (UDISE: 36182100637) • Official Continuous and Comprehensive Evaluation (CCE) and Examination Admit Card.</p>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="filter-pill ${activeCceTab === 'report_card' ? 'active' : ''}" onclick="window.switchCceTab('report_card')" style="padding:6px 14px; border-radius:20px; font-weight:700; cursor:pointer; border:1px solid var(--border-color); background:${activeCceTab === 'report_card' ? 'var(--indigo)' : 'var(--bg-card-sub)'}; color:${activeCceTab === 'report_card' ? '#ffffff' : 'var(--text-primary)'};">
              📊 CCE Progress Card
            </button>
            <button class="filter-pill ${activeCceTab === 'hall_ticket' ? 'active' : ''}" onclick="window.switchCceTab('hall_ticket')" style="padding:6px 14px; border-radius:20px; font-weight:700; cursor:pointer; border:1px solid var(--border-color); background:${activeCceTab === 'hall_ticket' ? 'var(--indigo)' : 'var(--bg-card-sub)'}; color:${activeCceTab === 'hall_ticket' ? '#ffffff' : 'var(--text-primary)'};">
              🎫 Exam Hall Ticket
            </button>
            <button class="download-pill-btn" onclick="window.printCceCard()" style="background:#0f172a;">
              <i data-lucide="printer"></i> Print Document
            </button>
          </div>
        </div>

        ${activeCceTab === 'report_card' ? `
          <div class="cce-sheet-container">
            <div class="cce-header-banner">
              <h2 style="font-size:1.25rem; font-weight:900; margin:0; text-transform:uppercase;">${card.schoolName}</h2>
              <p style="font-size:0.82rem; margin:3px 0;">${card.schoolAddress} • UDISE: <strong>${card.udiseCode}</strong></p>
              <div style="display:inline-block; background:#0f172a; color:#ffffff; font-size:0.75rem; font-weight:800; padding:3px 12px; border-radius:4px; margin-top:4px;">
                ${card.term} PROGRESS REPORT — ACADEMIC YEAR ${card.academicYear}
              </div>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:8px; margin-bottom:14px; font-size:0.82rem; background:#f8fafc; padding:12px; border-radius:6px; border:1px solid #cbd5e1;">
              <div><strong>Student Name:</strong> ${card.student.name}</div>
              <div><strong>Admission No:</strong> ${card.student.admissionNo}</div>
              <div><strong>Roll No:</strong> ${card.student.rollNo}</div>
              <div><strong>Class & Section:</strong> ${card.student.classSection}</div>
              <div><strong>Father's Name:</strong> ${card.student.fatherName}</div>
              <div><strong>Attendance:</strong> <span style="color:#047857; font-weight:700;">${card.student.attendanceDays}</span></div>
            </div>

            <table class="cce-data-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Curricular Subject</th>
                  <th>FA 1 (20)</th>
                  <th>FA 2 (20)</th>
                  <th>FA 3 (20)</th>
                  <th>FA 4 (20)</th>
                  <th>SA 1 (80)</th>
                  <th>Total (100)</th>
                  <th>GPA</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                ${card.subjectMarks.map((sm, idx) => `
                  <tr>
                    <td>${idx + 1}</td>
                    <td><strong>${sm.subject}</strong></td>
                    <td>${sm.fa1}</td>
                    <td>${sm.fa2}</td>
                    <td>${sm.fa3}</td>
                    <td>${sm.fa4}</td>
                    <td>${sm.sa1}</td>
                    <td><strong>${sm.total100}</strong></td>
                    <td><strong>${sm.gpa}</strong></td>
                    <td><span style="background:#d1fae5; color:#047857; font-weight:800; padding:2px 8px; border-radius:4px;">${sm.grade}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin-top:14px;">
              <div style="border:1px solid #cbd5e1; border-radius:6px; padding:10px;">
                <h4 style="font-size:0.85rem; font-weight:800; margin-bottom:6px; text-transform:uppercase;">Co-Curricular Evaluation</h4>
                ${card.coCurricular.map(cc => `
                  <div style="display:flex; justify-content:space-between; font-size:0.8rem; padding:4px 0; border-bottom:1px dashed #e2e8f0;">
                    <span>${cc.area}</span>
                    <strong style="color:#047857;">Grade ${cc.grade}</strong>
                  </div>
                `).join('')}
              </div>
              <div style="background:#f1f5f9; border:1px solid #cbd5e1; border-radius:6px; padding:12px; text-align:center; display:flex; flex-direction:column; justify-content:center;">
                <div style="font-size:0.8rem; text-transform:uppercase; font-weight:700; color:#475569;">Cumulative Grade Point Average (CGPA)</div>
                <div style="font-size:2.2rem; font-weight:900; color:#0f172a; margin:4px 0;">${card.overallGpa} / 10</div>
                <div style="font-size:0.85rem; font-weight:800; color:#047857;">OVERALL RESULT: ${card.overallGrade} • ${card.classRank}</div>
              </div>
            </div>

            <div style="margin-top:16px; padding:10px; background:#fafafa; border:1px solid #e2e8f0; border-radius:6px; font-size:0.8rem;">
              <div><strong>Class Teacher Remarks:</strong> ${card.classTeacherRemarks}</div>
              <div style="margin-top:4px;"><strong>Headmaster Sign-off:</strong> ${card.headmasterRemarks}</div>
            </div>
          </div>
        ` : `
          <div class="hall-ticket-box">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #0f172a; padding-bottom:12px; flex-wrap:wrap; gap:8px;">
              <div>
                <h2 style="font-size:1.15rem; font-weight:900; margin:0; text-transform:uppercase;">${ht.schoolName}</h2>
                <div style="font-size:0.85rem; font-weight:800; color:#4338ca; margin-top:2px;">${ht.examTitle}</div>
                <div style="font-size:0.75rem; color:#64748b;">Examination Center: ${ht.examinationCenter}</div>
              </div>
              <div style="text-align:right;">
                <div class="barcode-font">${ht.barcode}</div>
                <div style="font-size:0.78rem; font-weight:800;">HT NO: ${ht.hallTicketNo}</div>
              </div>
            </div>

            <div style="display:flex; gap:16px; align-items:center; margin:16px 0; background:#f8fafc; padding:12px; border-radius:6px; border:1px solid #e2e8f0; flex-wrap:wrap;">
              <img src="${ht.photoUrl}" alt="Student" style="width:72px; height:84px; object-fit:cover; border:1px solid #94a3b8; border-radius:4px;">
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:8px; font-size:0.83rem; flex:1;">
                <div><strong>Candidate Name:</strong> ${ht.studentName}</div>
                <div><strong>Father's Name:</strong> ${ht.fatherName}</div>
                <div><strong>Class & Section:</strong> ${ht.class}</div>
                <div><strong>Center Code:</strong> 637 (Cheriyal Main)</div>
              </div>
            </div>

            <h4 style="font-size:0.85rem; font-weight:800; margin-bottom:8px; text-transform:uppercase;">Examination Timetable & Seating Plan</h4>
            <table class="cce-data-table">
              <thead>
                <tr>
                  <th>Exam Date</th>
                  <th>Day</th>
                  <th>Reporting Time</th>
                  <th>Subject</th>
                  <th>Invigilator Signature</th>
                </tr>
              </thead>
              <tbody>
                ${ht.schedule.map(s => `
                  <tr>
                    <td><strong>${s.date}</strong></td>
                    <td>${s.day}</td>
                    <td>${s.time}</td>
                    <td><strong>${s.subject}</strong></td>
                    <td style="color:#94a3b8;">__________________</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div style="margin-top:12px; font-size:0.75rem; color:#475569; border-top:1px solid #cbd5e1; padding-top:8px;">
              <strong>Statutory Instructions:</strong>
              ${ht.instructions.map((ins, i) => `<div>${i + 1}. ${ins}</div>`).join('')}
            </div>
          </div>
        `}
      </div>
    `;
    refreshLucideIcons();
  }

  /* 22. GENERIC FALLBACK */
  function renderGenericView(viewName) {
    contentViewport.innerHTML = `
      <div class="panel-card" style="margin-bottom:20px;">
        <div class="panel-header">
          <h2><i data-lucide="layers" style="color:var(--emerald);"></i> ${viewName.toUpperCase().replace(/_/g, ' ')} — Vikas Grammar School</h2>
          <span class="badge badge-success">Active UDISE Module</span>
        </div>
        <p style="color:var(--text-secondary); margin-top:4px;">Official operational database linked with UDISE Code <code>36182100637</code> (Cherial, Siddipet, Telangana).</p>
      </div>
    `;
    refreshLucideIcons();
  }

  function closeAiDrawer() {
    aiDrawer?.classList.remove('active');
    aiDrawerOverlay?.classList.remove('active');
  }

  function refreshLucideIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; bottom: 24px; right: 24px;
      background: #0f172a; color: white; border: 1px solid rgba(16,185,129,0.4);
      padding: 12px 20px; border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3); font-size: 0.88rem;
      z-index: 9999; animation: fadeIn 0.3s ease;
    `;
    toast.innerHTML = `<i data-lucide="info" style="display:inline-block; vertical-align:middle; margin-right:6px; color:#10b981;"></i> ${message}`;
    document.body.appendChild(toast);
    refreshLucideIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
});
