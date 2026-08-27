/* ==========================================================================
   EDUPULSE SCHOOL OS v4.0 — COMPLETE APPLICATION ROUTER & STATE CONTROLLER
   UDISE Code: 36182100637 | Vikas Grammar School HS Cherial, Telangana
   Full 100% responsive, zero-truncation, rock-solid event controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  let activeRole = 'principal';
  let authenticatedUser = null;

  const sidebar = document.getElementById('sidebar');
  const sidebarNavList = document.getElementById('sidebarNavList');
  const contentViewport = document.getElementById('contentViewport');
  const themeLightBtn = document.getElementById('themeLightBtn');
  const themeDarkBtn = document.getElementById('themeDarkBtn');
  const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
  const userName = document.getElementById('userName');
  const userRole = document.getElementById('userRole');
  const userAvatar = document.getElementById('userAvatar');

  // DOM Elements for Login Portal
  const loginModalOverlay = document.getElementById('loginModalOverlay');
  const loginForm = document.getElementById('loginForm');
  const loginEmailInput = document.getElementById('loginEmailInput');
  const loginPasswordInput = document.getElementById('loginPasswordInput');
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  const roleDetectionBox = document.getElementById('roleDetectionBox');
  const detectionBadge = document.getElementById('detectionBadge');
  const detectionAvatar = document.getElementById('detectionAvatar');
  const detectionName = document.getElementById('detectionName');
  const detectionSub = document.getElementById('detectionSub');
  const detectionStatus = document.getElementById('detectionStatus');
  const customRoleGroup = document.getElementById('customRoleGroup');
  const loginSubmitBtn = document.getElementById('loginSubmitBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  const aiDrawer = document.getElementById('aiDrawer');
  const aiDrawerOverlay = document.getElementById('aiDrawerOverlay');
  const closeAiDrawerBtn = document.getElementById('closeAiDrawerBtn');
  const openAiDrawerBtn = document.getElementById('openAiDrawerBtn');
  const aiPromptForm = document.getElementById('aiPromptForm');
  const aiPromptInput = document.getElementById('aiPromptInput');
  const aiChatBody = document.getElementById('aiChatBody');

  // DOM Elements for Profile Modal
  const userProfilePill = document.getElementById('userProfilePill');
  const profileModalOverlay = document.getElementById('profileModalOverlay');
  const closeProfileModalBtn = document.getElementById('closeProfileModalBtn');
  const cancelProfileBtn = document.getElementById('cancelProfileBtn');
  const profileForm = document.getElementById('profileForm');

  const modalProfileAvatar = document.getElementById('modalProfileAvatar');
  const modalProfileName = document.getElementById('modalProfileName');
  const modalProfileRoleBadge = document.getElementById('modalProfileRoleBadge');
  const modalProfileDesignation = document.getElementById('modalProfileDesignation');
  const modalProfileEmailTag = document.getElementById('modalProfileEmailTag');
  const modalProfilePhoneTag = document.getElementById('modalProfilePhoneTag');
  const modalProfileIdTag = document.getElementById('modalProfileIdTag');

  const profileNameInput = document.getElementById('profileNameInput');
  const profileEmailInput = document.getElementById('profileEmailInput');
  const profilePhoneInput = document.getElementById('profilePhoneInput');
  const profileIdInput = document.getElementById('profileIdInput');
  const profilePenInput = document.getElementById('profilePenInput');
  const profileClassInput = document.getElementById('profileClassInput');
  const profileBloodGroupInput = document.getElementById('profileBloodGroupInput');
  const profileEmergencyInput = document.getElementById('profileEmergencyInput');
  const profileAddressInput = document.getElementById('profileAddressInput');
  const profileAvatarInput = document.getElementById('profileAvatarInput');

  initApp();

  function initApp() {
    setupEventListeners();
    setupLoginSystem();
    setupProfileSystem();
    setupInteractiveModals();
    restoreSavedSession();
  }

  function restoreSavedSession() {
    try {
      const saved = localStorage.getItem('vikas_erp_session');
      if (saved) {
        const session = JSON.parse(saved);
        const matchedUser = findUserByEmail(session.email) || findUserByRole(session.role);
        if (matchedUser) {
          authenticatedUser = matchedUser;
          activeRole = matchedUser.role;
          switchRolePersonality(matchedUser.role, matchedUser);
          loginModalOverlay?.classList.remove('active');
          document.body.classList.remove('modal-open');
        }
      }
    } catch (e) {
      console.warn('Session restore exception:', e);
    }
  }

  function setupInteractiveModals() {
    // Marksheet Modal
    const marksheetModalOverlay = document.getElementById('marksheetModalOverlay');
    const closeMarksheetBtn = document.getElementById('closeMarksheetBtn');
    const cancelMarksheetBtn = document.getElementById('cancelMarksheetBtn');
    closeMarksheetBtn?.addEventListener('click', () => { marksheetModalOverlay?.classList.remove('active'); document.body.classList.remove('modal-open'); });
    cancelMarksheetBtn?.addEventListener('click', () => { marksheetModalOverlay?.classList.remove('active'); document.body.classList.remove('modal-open'); });

    // Payment Modal
    const paymentModalOverlay = document.getElementById('paymentModalOverlay');
    const closePaymentBtn = document.getElementById('closePaymentBtn');
    const paymentForm = document.getElementById('paymentForm');
    closePaymentBtn?.addEventListener('click', () => { paymentModalOverlay?.classList.remove('active'); document.body.classList.remove('modal-open'); });
    paymentForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const paySubmitBtn = document.getElementById('paySubmitBtn');
      if (paySubmitBtn) {
        paySubmitBtn.disabled = true;
        paySubmitBtn.innerHTML = `<span>Processing Instant Payment...</span>`;
      }
      setTimeout(() => {
        paymentModalOverlay?.classList.remove('active');
        document.body.classList.remove('modal-open');
        if (paySubmitBtn) {
          paySubmitBtn.disabled = false;
          paySubmitBtn.innerHTML = `<span>Confirm & Pay ₹ 3,500</span><i data-lucide="check-circle"></i>`;
        }
        // Update MOCK DATA Fee dues
        if (MOCK_DATA.feeStructure) {
          MOCK_DATA.feeStructure.paidAmount += MOCK_DATA.feeStructure.dueAmount;
          MOCK_DATA.feeStructure.dueAmount = 0;
        }
        if (MOCK_DATA.feeLedgerFullList && MOCK_DATA.feeLedgerFullList[0]) {
          MOCK_DATA.feeLedgerFullList[0].paidFee += MOCK_DATA.feeLedgerFullList[0].dueFee;
          MOCK_DATA.feeLedgerFullList[0].dueFee = 0;
          MOCK_DATA.feeLedgerFullList[0].status = 'Paid';
        }
        showToast('Payment of ₹3,500 successful! Receipt generated and fee ledger updated.');
        if (activeRole === 'student') renderStudentDashboardScreen();
        else if (activeRole === 'parent') renderParentDashboardScreen();
      }, 600);
    });

    // Leave Modal
    const leaveModalOverlay = document.getElementById('leaveModalOverlay');
    const closeLeaveBtn = document.getElementById('closeLeaveBtn');
    const leaveForm = document.getElementById('leaveForm');
    closeLeaveBtn?.addEventListener('click', () => { leaveModalOverlay?.classList.remove('active'); document.body.classList.remove('modal-open'); });
    leaveForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = document.getElementById('leaveTypeSelect')?.value || 'Medical Leave';
      const from = document.getElementById('leaveFromDate')?.value || 'Sep 02, 2026';
      const to = document.getElementById('leaveToDate')?.value || 'Sep 04, 2026';
      const reason = document.getElementById('leaveReasonText')?.value || 'Leave application';

      const newLeave = {
        id: 'lve_' + Date.now(),
        studentName: authenticatedUser ? authenticatedUser.name : 'Rahul Reddy',
        rollNo: authenticatedUser ? (authenticatedUser.idNumber || 'VIII-014') : 'VIII-014',
        grade: 'Class VIII Section A',
        leaveType: type,
        fromDate: from,
        toDate: to,
        days: 2,
        reason: reason,
        appliedBy: authenticatedUser ? authenticatedUser.name : 'Parent (V. Reddy)',
        appliedDate: 'Today',
        mentorStatus: 'Pending Mentor Review',
        statusClass: 'badge-warning'
      };

      if (!MOCK_DATA.studentLeaveRequests) MOCK_DATA.studentLeaveRequests = [];
      MOCK_DATA.studentLeaveRequests.unshift(newLeave);

      leaveModalOverlay?.classList.remove('active');
      document.body.classList.remove('modal-open');
      showToast('Leave request submitted successfully for Mentor Teacher review!');
    });
  }

  // Global Helpers attached to window
  window.openMarksheetModal = function(studentName) {
    const marksheetModalOverlay = document.getElementById('marksheetModalOverlay');
    if (studentName) {
      const el = document.getElementById('msStudentName');
      if (el) el.textContent = studentName;
    }
    marksheetModalOverlay?.classList.add('active');
    document.body.classList.add('modal-open');
    if (window.lucide) lucide.createIcons();
  };

  window.openPaymentModal = function(amount, studentName) {
    const paymentModalOverlay = document.getElementById('paymentModalOverlay');
    if (amount) {
      const el = document.getElementById('payAmountText');
      if (el) el.textContent = `₹ ${amount}`;
    }
    if (studentName) {
      const el = document.getElementById('payStudentText');
      if (el) el.textContent = `Student: ${studentName}`;
    }
    paymentModalOverlay?.classList.add('active');
    document.body.classList.add('modal-open');
    if (window.lucide) lucide.createIcons();
  };

  window.openLeaveModal = function() {
    const leaveModalOverlay = document.getElementById('leaveModalOverlay');
    leaveModalOverlay?.classList.add('active');
    document.body.classList.add('modal-open');
    if (window.lucide) lucide.createIcons();
  };

  window.approveLeave = function(leaveId) {
    const req = MOCK_DATA.studentLeaveRequests?.find(l => l.id === leaveId);
    if (req) {
      req.mentorStatus = 'Approved';
      req.statusClass = 'badge-success';
      showToast(`Leave request for ${req.studentName} approved!`);
      renderTeacherDashboardScreen();
    }
  };

  window.rejectLeave = function(leaveId) {
    const req = MOCK_DATA.studentLeaveRequests?.find(l => l.id === leaveId);
    if (req) {
      req.mentorStatus = 'Rejected';
      req.statusClass = 'badge-danger';
      showToast(`Leave request for ${req.studentName} rejected.`);
      renderTeacherDashboardScreen();
    }
  };

  function setupProfileSystem() {
    userProfilePill?.addEventListener('click', openProfileModal);
    closeProfileModalBtn?.addEventListener('click', closeProfileModal);
    cancelProfileBtn?.addEventListener('click', closeProfileModal);
    profileModalOverlay?.addEventListener('click', (e) => {
      if (e.target === profileModalOverlay) closeProfileModal();
    });

    profileForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      saveProfileChanges();
    });
  }

  function openProfileModal() {
    const userObj = authenticatedUser || findUserByRole(activeRole);
    if (!userObj) return;

    if (modalProfileAvatar) modalProfileAvatar.src = userObj.avatar;
    if (modalProfileName) modalProfileName.textContent = userObj.name;
    const roleIcon = userObj.role === 'principal' ? '👑' : userObj.role === 'teacher' ? '👩‍🏫' : userObj.role === 'student' ? '🎓' : '👨‍👩‍👧';
    if (modalProfileRoleBadge) modalProfileRoleBadge.textContent = `${roleIcon} ${userObj.roleLabel || userObj.role}`;
    if (modalProfileDesignation) modalProfileDesignation.textContent = userObj.designation || userObj.roleLabel;
    
    if (modalProfileEmailTag) modalProfileEmailTag.innerHTML = `<i data-lucide="mail"></i> ${userObj.email || '-'}`;
    if (modalProfilePhoneTag) modalProfilePhoneTag.innerHTML = `<i data-lucide="phone"></i> ${userObj.phone || '-'}`;
    if (modalProfileIdTag) modalProfileIdTag.innerHTML = `<i data-lucide="id-card"></i> ID: ${userObj.idNumber || '-'}`;

    if (profileNameInput) profileNameInput.value = userObj.name || '';
    if (profileEmailInput) profileEmailInput.value = userObj.email || '';
    if (profilePhoneInput) profilePhoneInput.value = userObj.phone || '';
    if (profileIdInput) profileIdInput.value = userObj.idNumber || '';
    if (profilePenInput) profilePenInput.value = userObj.penId || '';
    if (profileClassInput) profileClassInput.value = userObj.classSec || '';
    if (profileBloodGroupInput) profileBloodGroupInput.value = userObj.bloodGroup || '';
    if (profileEmergencyInput) profileEmergencyInput.value = userObj.emergencyContact || '';
    if (profileAddressInput) profileAddressInput.value = userObj.address || '';
    if (profileAvatarInput) profileAvatarInput.value = userObj.avatar || '';

    profileModalOverlay?.classList.add('active');
    document.body.classList.add('modal-open');
    if (window.lucide) lucide.createIcons();
  }

  function closeProfileModal() {
    profileModalOverlay?.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  function saveProfileChanges() {
    let userObj = authenticatedUser || findUserByRole(activeRole);
    if (!userObj) return;

    userObj.name = profileNameInput ? profileNameInput.value.trim() : userObj.name;
    userObj.email = profileEmailInput ? profileEmailInput.value.trim() : userObj.email;
    userObj.phone = profilePhoneInput ? profilePhoneInput.value.trim() : userObj.phone;
    userObj.idNumber = profileIdInput ? profileIdInput.value.trim() : userObj.idNumber;
    userObj.penId = profilePenInput ? profilePenInput.value.trim() : userObj.penId;
    userObj.classSec = profileClassInput ? profileClassInput.value.trim() : userObj.classSec;
    userObj.bloodGroup = profileBloodGroupInput ? profileBloodGroupInput.value.trim() : userObj.bloodGroup;
    userObj.emergencyContact = profileEmergencyInput ? profileEmergencyInput.value.trim() : userObj.emergencyContact;
    userObj.address = profileAddressInput ? profileAddressInput.value.trim() : userObj.address;
    if (profileAvatarInput && profileAvatarInput.value.trim()) {
      userObj.avatar = profileAvatarInput.value.trim();
    }

    if (MOCK_DATA.registeredUsers) {
      const idx = MOCK_DATA.registeredUsers.findIndex(u => u.role === userObj.role || u.email === userObj.email);
      if (idx !== -1) {
        MOCK_DATA.registeredUsers[idx] = { ...MOCK_DATA.registeredUsers[idx], ...userObj };
      }
    }

    authenticatedUser = userObj;
    switchRolePersonality(userObj.role, userObj);
    closeProfileModal();
    showToast(`Profile details for ${userObj.name} updated successfully!`);
  }

  function setupLoginSystem() {
    if (loginModalOverlay?.classList.contains('active')) {
      document.body.classList.add('modal-open');
    }

    if (loginEmailInput) {
      detectUserByEmail(loginEmailInput.value);
      loginEmailInput.addEventListener('input', (e) => detectUserByEmail(e.target.value));
    }

    document.querySelectorAll('.demo-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.demo-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const email = chip.getAttribute('data-email');
        if (loginEmailInput) {
          loginEmailInput.value = email;
          detectUserByEmail(email);
        }
        if (loginPasswordInput) {
          loginPasswordInput.value = 'vikas2026';
        }
      });
    });

    loginForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailVal = loginEmailInput ? loginEmailInput.value.trim() : '';
      const passwordVal = loginPasswordInput ? loginPasswordInput.value.trim() : '';

      if (!emailVal || !passwordVal) {
        showToast('Please enter both email address and password for verification.', 'error');
        return;
      }

      if (loginSubmitBtn) {
        loginSubmitBtn.disabled = true;
        loginSubmitBtn.innerHTML = `<span>Verifying credentials with Vikas ERP Backend...</span>`;
      }

      try {
        const resp = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailVal, password: passwordVal })
        });

        const data = await resp.json();

        if (!resp.ok || !data.success) {
          if (loginSubmitBtn) {
            loginSubmitBtn.disabled = false;
            loginSubmitBtn.innerHTML = `<span>Sign In to ERP Workspace</span><i data-lucide="arrow-right"></i>`;
          }
          const errMsg = data.error || 'Credential verification failed. Please check your password.';
          showToast(`❌ Verification Failed: ${errMsg}`);
          if (detectionStatus) {
            detectionStatus.innerHTML = `<i data-lucide="alert-triangle"></i> Verification Failed: ${errMsg}`;
            detectionStatus.style.color = 'var(--rose)';
          }
          if (window.lucide) lucide.createIcons();
          return;
        }

        const userObj = data.user;
        const targetRole = userObj.role;

        authenticatedUser = userObj;
        activeRole = targetRole;

        try {
          localStorage.setItem('vikas_erp_session', JSON.stringify({ email: userObj.email, role: targetRole, token: data.token }));
        } catch (err) {}

        document.querySelectorAll('.role-pill').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-role') === targetRole);
        });

        switchRolePersonality(targetRole, userObj);

        loginModalOverlay?.classList.remove('active');
        document.body.classList.remove('modal-open');
        if (loginSubmitBtn) {
          loginSubmitBtn.disabled = false;
          loginSubmitBtn.innerHTML = `<span>Sign In to ERP Workspace</span><i data-lucide="arrow-right"></i>`;
        }
        if (window.lucide) lucide.createIcons();

        showToast(`✅ Verified & Signed in as ${userObj.name} (${userObj.roleLabel || targetRole})`);
      } catch (err) {
        console.warn('Backend API fallback to local authentication mode:', err);
        const matchedUser = findUserByEmail(emailVal);
        let targetRole = matchedUser ? matchedUser.role : 'principal';
        let userObj = matchedUser || { email: emailVal, role: targetRole, name: emailVal.split('@')[0] };
        authenticatedUser = userObj;
        activeRole = targetRole;
        switchRolePersonality(targetRole, userObj);
        loginModalOverlay?.classList.remove('active');
        document.body.classList.remove('modal-open');
        if (loginSubmitBtn) {
          loginSubmitBtn.disabled = false;
          loginSubmitBtn.innerHTML = `<span>Sign In to ERP Workspace</span><i data-lucide="arrow-right"></i>`;
        }
        showToast(`Signed in as ${userObj.name}`);
      }
    });

    logoutBtn?.addEventListener('click', () => {
      try {
        localStorage.removeItem('vikas_erp_session');
      } catch (e) {}
      loginModalOverlay?.classList.add('active');
      document.body.classList.add('modal-open');
      showToast('Logged out. Enter registered email and password to verify login.');
    });

    document.querySelectorAll('input[name="customRole"]').forEach(radio => {
      radio.addEventListener('change', () => {
        const emailVal = loginEmailInput ? loginEmailInput.value.trim() : '';
        if (!findUserByEmail(emailVal)) {
          updateUnregisteredDetectionCard(emailVal, radio.value);
        }
      });
    });
  }

  function findUserByEmail(emailStr) {
    if (!emailStr || !MOCK_DATA.registeredUsers) return null;
    const clean = emailStr.trim().toLowerCase();
    return MOCK_DATA.registeredUsers.find(u => 
      u.email.toLowerCase() === clean || 
      (u.altEmail && u.altEmail.toLowerCase() === clean) ||
      u.role.toLowerCase() === clean ||
      u.name.toLowerCase().includes(clean)
    );
  }

  function detectUserByEmail(emailStr) {
    const user = findUserByEmail(emailStr);
    
    document.querySelectorAll('.demo-chip').forEach(chip => {
      chip.classList.toggle('active', chip.getAttribute('data-email').toLowerCase() === emailStr.trim().toLowerCase());
    });

    if (user) {
      if (customRoleGroup) customRoleGroup.style.display = 'none';
      if (roleDetectionBox) roleDetectionBox.style.display = 'block';
      if (detectionBadge) detectionBadge.textContent = user.badge;
      if (detectionAvatar) detectionAvatar.src = user.avatar;
      if (detectionName) detectionName.textContent = user.name;
      if (detectionSub) detectionSub.textContent = `${user.designation} (${user.details})`;
      if (detectionStatus) {
        detectionStatus.innerHTML = `<i data-lucide="check-circle-2"></i> Verified School Account • Auto-assigned to <strong>${user.roleLabel || user.role}</strong> workspace`;
        detectionStatus.style.color = 'var(--emerald)';
      }
    } else {
      const selectedRole = document.querySelector('input[name="customRole"]:checked')?.value || 'principal';
      updateUnregisteredDetectionCard(emailStr, selectedRole);
    }
    if (window.lucide) lucide.createIcons();
  }

  function updateUnregisteredDetectionCard(emailStr, selectedRole) {
    if (customRoleGroup) customRoleGroup.style.display = 'block';
    if (roleDetectionBox) roleDetectionBox.style.display = 'block';
    const roleTitle = selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1);
    if (detectionBadge) detectionBadge.textContent = `❓ Custom Account — ${roleTitle} Workspace`;
    if (detectionAvatar) detectionAvatar.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80';
    if (detectionName) detectionName.textContent = emailStr ? emailStr.split('@')[0] : 'Unregistered User';
    if (detectionSub) detectionSub.textContent = emailStr || 'Unregistered email address';
    if (detectionStatus) {
      detectionStatus.innerHTML = `<i data-lucide="info"></i> New user login • Will open <strong>${roleTitle}</strong> workspace`;
      detectionStatus.style.color = 'var(--indigo)';
    }
    if (window.lucide) lucide.createIcons();
  }

  function setupEventListeners() {
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

    // Sidebar Responsive Collapse Toggle & Mobile Backdrop Overlay
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    sidebarCollapseBtn?.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      document.querySelector('.main-wrapper').classList.toggle('expanded');
      sidebarOverlay?.classList.toggle('active');
    });

    sidebarOverlay?.addEventListener('click', () => {
      sidebar.classList.remove('collapsed');
      document.querySelector('.main-wrapper').classList.remove('expanded');
      sidebarOverlay?.classList.remove('active');
    });

    // AI Drawer Open / Close
    openAiDrawerBtn?.addEventListener('click', () => {
      aiDrawer?.classList.add('active');
      aiDrawerOverlay?.classList.add('active');
    });
    closeAiDrawerBtn?.addEventListener('click', closeAiDrawer);
    aiDrawerOverlay?.addEventListener('click', closeAiDrawer);

    // AI Drawer Prompt Form (simple canned assistant reply, client-side only)
    aiPromptForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = aiPromptInput.value.trim();
      if (!text || !aiChatBody) return;

      const userMsg = document.createElement('div');
      userMsg.className = 'ai-message user';
      userMsg.style.cssText = 'align-self:flex-end; background:var(--accent-grad); color:#fff; border-bottom-right-radius:4px;';
      userMsg.innerHTML = `<p>${text.replace(/</g, '&lt;')}</p>`;
      aiChatBody.appendChild(userMsg);
      aiPromptInput.value = '';
      aiChatBody.scrollTop = aiChatBody.scrollHeight;

      setTimeout(() => {
        const replyMsg = document.createElement('div');
        replyMsg.className = 'ai-message assistant';
        replyMsg.innerHTML = `<p>Thanks for asking! This is a demo assistant — connect it to your live Vikas Grammar School data to answer "${text.replace(/</g, '&lt;')}" for real.</p>`;
        aiChatBody.appendChild(replyMsg);
        aiChatBody.scrollTop = aiChatBody.scrollHeight;
      }, 500);
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
      if (notifDropdown && !notifDropdown.contains(e.target) && e.target !== notifBtn) {
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


  function switchRolePersonality(role, userObj) {
    document.body.className = `theme-light role-${role}`;
    renderRoleSidebarNav(role);

    const currentUserObj = userObj || (MOCK_DATA.registeredUsers ? MOCK_DATA.registeredUsers.find(u => u.role === role) : null);

    const sessionRoleIcon = document.getElementById('sessionRoleIcon');
    const sessionRoleTitle = document.getElementById('sessionRoleTitle');
    const sessionEmailText = document.getElementById('sessionEmailText');

    if (currentUserObj) {
      if (userName) userName.textContent = currentUserObj.name;
      if (userRole) userRole.textContent = currentUserObj.roleLabel || currentUserObj.designation;
      if (userAvatar && currentUserObj.avatar) userAvatar.src = currentUserObj.avatar;

      const roleIcon = currentUserObj.role === 'principal' ? '👑' : currentUserObj.role === 'teacher' ? '👩‍🏫' : currentUserObj.role === 'student' ? '🎓' : '👨‍👩‍👧';
      const cleanBadge = (currentUserObj.badge || (currentUserObj.role.toUpperCase() + ' WORKSPACE')).replace(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}]\s*/u, '');
      if (sessionRoleIcon) sessionRoleIcon.textContent = roleIcon;
      if (sessionRoleTitle) sessionRoleTitle.textContent = cleanBadge;
      if (sessionEmailText) sessionEmailText.textContent = currentUserObj.email || (currentUserObj.role + '@vikas.edu.in');
    } else {
      if (role === 'principal') {
        if (userName) userName.textContent = 'K. Rajesham';
        if (userRole) userRole.textContent = 'Headmaster';
        if (sessionRoleIcon) sessionRoleIcon.textContent = '👑';
        if (sessionRoleTitle) sessionRoleTitle.textContent = 'Principal Command Center';
        if (sessionEmailText) sessionEmailText.textContent = 'principal@vikas.edu.in';
      } else if (role === 'teacher') {
        if (userName) userName.textContent = 'Mrs. S. Radhika';
        if (userRole) userRole.textContent = 'Class Teacher (VIII A)';
        if (sessionRoleIcon) sessionRoleIcon.textContent = '👩‍🏫';
        if (sessionRoleTitle) sessionRoleTitle.textContent = 'Teacher Workspace';
        if (sessionEmailText) sessionEmailText.textContent = 'teacher@vikas.edu.in';
      } else if (role === 'student') {
        if (userName) userName.textContent = 'Rahul Reddy';
        if (userRole) userRole.textContent = 'Student (Class VIII A)';
        if (sessionRoleIcon) sessionRoleIcon.textContent = '🎓';
        if (sessionRoleTitle) sessionRoleTitle.textContent = 'Student Portal';
        if (sessionEmailText) sessionEmailText.textContent = 'student@vikas.edu.in';
      } else if (role === 'parent') {
        if (userName) userName.textContent = 'Parent of Rahul Reddy';
        if (userRole) userRole.textContent = 'Parent';
        if (sessionRoleIcon) sessionRoleIcon.textContent = '👨‍👩‍👧';
        if (sessionRoleTitle) sessionRoleTitle.textContent = 'Parent Info Portal';
        if (sessionEmailText) sessionEmailText.textContent = 'parent@vikas.edu.in';
      }
    }

    if (role === 'principal') {
      renderPrincipalDashboardScreen();
    } else if (role === 'teacher') {
      renderTeacherDashboardScreen();
    } else if (role === 'student') {
      renderStudentDashboardScreen();
    } else if (role === 'parent') {
      renderParentDashboardScreen();
    }
  }

  /* SIDEBAR NAVIGATION MATRIX */
  function renderRoleSidebarNav(role) {
    let items = [];

    if (role === 'principal') {
      items = [
        { id: 'dashboard', label: 'Dashboard', icon: 'layout-grid' },
        { id: 'admissions', label: 'Admissions & Enquiries', icon: 'user-plus' },
        { id: 'students', label: 'Students Roster (Classes 1–10)', icon: 'users' },
        { id: 'academics', label: 'Academics & Board', icon: 'book-open' },
        { id: 'staff_payroll', label: 'Staff & HR Payroll', icon: 'user-check' },
        { id: 'timetable', label: 'Master Timetables Matrix', icon: 'calendar' },
        { id: 'fees', label: 'Fee Collection Ledger', icon: 'indian-rupee' },
        { id: 'transport', label: 'Transport & Fleet', icon: 'bus' },
        { id: 'library', label: 'School Library', icon: 'book-marked' },
        { id: 'calendar', label: 'School Holiday Calendar', icon: 'calendar' },
        { id: 'my_profile', label: 'My Profile & Account Info', icon: 'user-cog' }
      ];
    } else if (role === 'teacher') {
      items = [
        { id: 'dashboard', label: 'Teacher Workspace', icon: 'layout-grid' },
        { id: 'my_students', label: 'My Class Students (360°)', icon: 'users' },
        { id: 'teacher_attendance', label: 'My Teacher Attendance', icon: 'check-circle' },
        { id: 'homework', label: 'Homework & Assignments', icon: 'book-open' },
        { id: 'timetable', label: 'My Teaching Schedule', icon: 'clock' },
        { id: 'student_leave_approvals', label: 'Student Leave Approvals', icon: 'file-text' },
        { id: 'teacher_salary', label: 'My Salary & Payslips', icon: 'indian-rupee' },
        { id: 'calendar', label: 'School Holiday Calendar', icon: 'calendar' },
        { id: 'my_profile', label: 'My Profile & Account Info', icon: 'user-cog' }
      ];
    } else if (role === 'student') {
      items = [
        { id: 'dashboard', label: 'Student Portal', icon: 'layout-grid' },
        { id: 'timetable', label: 'My Class Timetable', icon: 'clock' },
        { id: 'homework', label: 'Today\'s Homework', icon: 'book-open' },
        { id: 'my_fees', label: 'My Fee Breakdown', icon: 'indian-rupee' },
        { id: 'student_apply_leave', label: 'Submit Leave Request', icon: 'file-text' },
        { id: 'bus_info', label: 'My Bus Route & Timing', icon: 'bus' },
        { id: 'calendar', label: 'School Holiday Calendar', icon: 'calendar' },
        { id: 'my_profile', label: 'My Profile & Account Info', icon: 'user-cog' }
      ];
    } else if (role === 'parent') {
      items = [
        { id: 'dashboard', label: 'Child Overview', icon: 'layout-grid' },
        { id: 'child_attendance', label: 'Child Attendance & Performance', icon: 'user-check' },
        { id: 'child_homework', label: 'Child Homework', icon: 'book-open' },
        { id: 'parent_apply_leave', label: 'Apply Child Leave', icon: 'file-text' },
        { id: 'pay_fee', label: 'Pay School Fee', icon: 'indian-rupee' },
        { id: 'bus_tracking', label: 'Child Bus Tracking', icon: 'bus' },
        { id: 'calendar', label: 'School Holiday Calendar', icon: 'calendar' },
        { id: 'my_profile', label: 'My Profile & Account Info', icon: 'user-cog' }
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

        // Auto-close mobile sidebar drawer on selection
        if (window.innerWidth <= 1024) {
          sidebar.classList.remove('collapsed');
          document.querySelector('.main-wrapper')?.classList.remove('expanded');
          document.getElementById('sidebarOverlay')?.classList.remove('active');
        }
      });
    });

    refreshLucideIcons();
  }

  /* NAV ROUTER CONTROLLER */
  function handleNavClick(viewId) {
    if (viewId === 'my_profile') {
      openProfileModal();
      return;
    }

    if (viewId === 'dashboard') {
      if (activeRole === 'principal') renderPrincipalDashboardScreen();
      else if (activeRole === 'teacher') renderTeacherDashboardScreen();
      else if (activeRole === 'student') renderStudentDashboardScreen();
      else if (activeRole === 'parent') renderParentDashboardScreen();
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
    renderTeacherTimetableScreen();
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
    `;
    renderStudentTimetableScreen();
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
  function renderTeacherTimetableScreen() {
    const slots = MOCK_DATA.teacherTimetable;
    contentViewport.innerHTML = `
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
    refreshLucideIcons();
  }

  /* 15. STUDENT TIMETABLE SCREEN */
  function renderStudentTimetableScreen() {
    const slots = MOCK_DATA.studentTimetable;
    contentViewport.innerHTML = `
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
