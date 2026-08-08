// ==========================================
// 1. GLOBAL STATE
// ==========================================

let currentRole = 'admin';
// Roles: admin, frontdesk, housekeeping, finance, guest

let isStaffAuthenticated = false;

let currentUser = {
    role: 'ADMINISTRATOR',
    name: 'MD. EMTIAZ HOSSAIN SAMI',
    email: 'admin@grandpalace.com',
    avatar: 'Md. EmTIAZ hOSSAIN sAMI LOGO.png'
};

// ==========================================
// 2. ROOMS INVENTORY
// ==========================================

let roomList = [
    {
        id: "101",
        title: "Single Standard Room",
        price: 800,
        status: "available",
        img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500",
        desc: "Cozy room with free Wi-Fi and king bed."
    },
    {
        id: "102",
        title: "Single Executive Room",
        price: 1000,
        status: "occupied",
        img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500",
        desc: "Executive workspace & smart TV."
    },
    {
        id: "201",
        title: "Deluxe Double Room",
        price: 5000,
        status: "dirty",
        img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500",
        desc: "Spacious luxury room designed for couples."
    },
    {
        id: "202",
        title: "Super Deluxe Double Room",
        price: 7500,
        status: "available",
        img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500",
        desc: "Balcony access and complimentary breakfast."
    },
    {
        id: "301",
        title: "Executive Double Ocean View",
        price: 10000,
        status: "maintenance",
        img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500",
        desc: "Panoramic view with luxury ocean deck."
    },
    {
        id: "401",
        title: "Royal Family Suite",
        price: 20000,
        status: "occupied",
        img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500",
        desc: "Multi-bedroom suite for families."
    },
    {
        id: "501",
        title: "Presidential VIP Suite",
        price: 35000,
        status: "available",
        img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500",
        desc: "VIP suite with private lounge."
    },
    {
        id: "601",
        title: "Royal Palace Villa",
        price: 50000,
        status: "available",
        img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500",
        desc: "Private villa with infinity pool."
    }
];

// ==========================================
// 3. BOOKINGS
// ==========================================

let bookings = [
    {
        id: "GP-8801",
        guestName: "Arif Chowdhury",
        guestEmail: "arif@example.com",
        guestPhone: "+8801711112233",
        roomNumber: "401",
        roomType: "Royal Family Suite",
        checkIn: "2026-08-01",
        checkOut: "2026-08-05",
        totalBill: 80000,
        paymentMethod: "BKASH",
        status: "Checked-In",
        avatar: "https://ui-avatars.com/api/?name=Arif+Chowdhury&background=c5a880&color=fff"
    },
    {
        id: "GP-8802",
        guestName: "Sultana Rahman",
        guestEmail: "sultana@example.com",
        guestPhone: "+8801822223344",
        roomNumber: "102",
        roomType: "Single Executive Room",
        checkIn: "2026-08-06",
        checkOut: "2026-08-08",
        totalBill: 2000,
        paymentMethod: "SSLCOMMERZ",
        status: "Confirmed",
        avatar: "https://ui-avatars.com/api/?name=Sultana+Rahman&background=c5a880&color=fff"
    }
];

// ==========================================
// 4. GUEST DIRECTORY
// ==========================================

let guests = [
    {
        id: "G-101",
        name: "Arif Chowdhury",
        email: "arif@example.com",
        phone: "+8801711112233",
        avatar: "https://ui-avatars.com/api/?name=Arif+Chowdhury&background=c5a880&color=fff"
    },
    {
        id: "G-102",
        name: "Sultana Rahman",
        email: "sultana@example.com",
        phone: "+8801822223344",
        avatar: "https://ui-avatars.com/api/?name=Sultana+Rahman&background=c5a880&color=fff"
    }
];

// ==========================================
// 5. HELPERS
// ==========================================

function escapeHTML(str) {
    if (str === null || str === undefined) return '';

    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function getNightsBetween(checkInStr, checkOutStr) {
    if (!checkInStr || !checkOutStr) return 1;

    const start = new Date(checkInStr);
    const end = new Date(checkOutStr);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return 1;
    }

    const diffTime = end - start;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 1;
}

// ==========================================
// 6. INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    initClock();
    setupDefaultDates();
    populateRoomDropdown();
    renderAll();
    calculateTotal();

    const resForm = document.getElementById('reservationForm');

    if (resForm) {
        resForm.addEventListener('change', calculateTotal);
        resForm.addEventListener('input', calculateTotal);

        resForm.addEventListener('submit', function (event) {
            handleBookingSubmit(event);
        });
    }

    // ------------------------------
    // STAFF LOGIN
    // ------------------------------
    const staffForm = document.getElementById('staffLoginForm');

    if (staffForm) {
        staffForm.addEventListener('submit', handleStaffLogin);
    }

    // Some HTML versions use a button instead of a form submit.
    const staffLoginBtn = document.getElementById('staffLoginSubmitBtn');

    if (staffLoginBtn && !staffForm) {
        staffLoginBtn.addEventListener('click', handleStaffLogin);
    }

    const staffPassField = document.getElementById('loginPasswordInput');

    if (staffPassField) {
        staffPassField.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' && !staffForm) {
                event.preventDefault();
                handleStaffLogin(event);
            }
        });
    }

    // ------------------------------
    // GUEST LOGIN
    // ------------------------------
    const guestForm = document.getElementById('guestLoginForm');

    if (guestForm) {
        guestForm.addEventListener('submit', handleGuestLoginSubmit);
    }

    switchUserRole(currentRole);
});

// ==========================================
// 7. CLOCK
// ==========================================

function initClock() {
    const clockEl = document.getElementById('currentDateDisplay');

    const update = function () {
        const now = new Date();

        if (clockEl) {
            clockEl.innerHTML =
                '<i class="fa-regular fa-clock"></i> ' +
                now.toLocaleDateString('en-GB') +
                ' | ' +
                now.toLocaleTimeString();
        }
    };

    update();
    setInterval(update, 1000);
}

// ==========================================
// 8. DEFAULT DATES
// ==========================================

function setupDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000)
        .toISOString()
        .split('T')[0];

    const cIn = document.getElementById('checkIn');
    const cOut = document.getElementById('checkOut');

    if (cIn && !cIn.value) cIn.value = today;
    if (cOut && !cOut.value) cOut.value = tomorrow;
}

// ==========================================
// 9. RENDER ALL
// ==========================================

function renderAll() {
    renderDashboard();
    renderRooms();
    renderFrontDesk();
    renderHousekeeping();
    renderFinance();
    renderGuests();
}

// ==========================================
// 10. AUTHENTICATION FORM SWITCH
// ==========================================

function switchAuthForm(type) {
    const guestForm = document.getElementById('guestLoginForm');
    const staffForm = document.getElementById('staffLoginForm');

    const btnGuest = document.getElementById('btnGuestAuth');
    const btnStaff = document.getElementById('btnStaffAuth');

    if (type === 'staff') {
        if (guestForm) guestForm.style.display = 'none';
        if (staffForm) staffForm.style.display = 'block';

        if (btnGuest) btnGuest.classList.remove('active');
        if (btnStaff) btnStaff.classList.add('active');
    } else {
        if (guestForm) guestForm.style.display = 'block';
        if (staffForm) staffForm.style.display = 'none';

        if (btnGuest) btnGuest.classList.add('active');
        if (btnStaff) btnStaff.classList.remove('active');
    }
}

// ==========================================
// 11. STAFF / ADMIN LOGIN
// ==========================================

function handleStaffLogin(event) {
    if (event) event.preventDefault();

    const emailField = document.getElementById('loginEmail');
    const passField = document.getElementById('loginPasswordInput');

    const email = emailField ? emailField.value.trim() : '';
    const password = passField ? passField.value : '';

    const ADMIN_EMAIL = 'admin@grandpalace.com';
    const ADMIN_PASS = 'admin123';

    if (!email || !password) {
        alert('Please enter both Email and Password!');
        return false;
    }

    const validEmail = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
    const validPassword = password === ADMIN_PASS;

    if (!validEmail || !validPassword) {
        alert(
            '❌ Invalid credentials!\n\n' +
            'Email: admin@grandpalace.com\n' +
            'Password: admin123'
        );
        return false;
    }

    // Successful authentication
    isStaffAuthenticated = true;
    currentRole = 'admin';

    document.body.classList.remove('logged-out');

    const loginModal = document.getElementById('loginModal');

    if (loginModal) {
        loginModal.classList.remove('active');
        loginModal.style.display = '';
    }

    currentUser = {
        role: 'ADMINISTRATOR',
        name: 'MD. EMTIAZ HOSSAIN SAMI',
        email: ADMIN_EMAIL,
        avatar: 'Md. EmTIAZ hOSSAIN sAMI LOGO.png'
    };

    switchUserRole('admin');

    const nameEl = document.getElementById('sidebarUserName');
    const roleEl = document.getElementById('sidebarUserRole');
    const avatarEl = document.getElementById('sidebarUserAvatar');

    if (nameEl) {
        nameEl.textContent = currentUser.name;
    }

    if (roleEl) {
        roleEl.textContent = 'Role: ADMINISTRATOR';
    }

    if (avatarEl) {
        avatarEl.src = currentUser.avatar;
    }

    // Clear password after successful login
    if (passField) {
        passField.value = '';
    }

    alert('Welcome Back, Admin!');

    return true;
}

// ==========================================
// 12. GUEST LOGIN
// ==========================================

function handleGuestLoginSubmit(event) {
    if (event) event.preventDefault();

    const name = document.getElementById('guestAuthName')?.value.trim() || 'Valued Guest';
    const email = document.getElementById('guestAuthEmail')?.value.trim() || '';
    const phone = document.getElementById('guestAuthPhone')?.value.trim() || '';
    const previewImg = document.getElementById('guestAuthPreviewImg')?.src || '';

    currentUser = {
        role: 'GUEST',
        name: name,
        email: email,
        phone: phone,
        avatar: previewImg || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=c5a880&color=fff'
    };

    currentRole = 'guest';

    document.body.classList.remove('logged-out');

    const loginModal = document.getElementById('loginModal');

    if (loginModal) {
        loginModal.classList.remove('active');
        loginModal.style.display = '';
    }

    switchUserRole('guest');

    const nameEl = document.getElementById('sidebarUserName');
    const roleEl = document.getElementById('sidebarUserRole');
    const avatarEl = document.getElementById('sidebarUserAvatar');

    if (nameEl) nameEl.textContent = name;
    if (roleEl) roleEl.textContent = 'Role: GUEST';
    if (avatarEl) avatarEl.src = currentUser.avatar;

    alert('🎉 Welcome ' + name + ' to Grand Palace Resort & Spa!');

    return true;
}

// ==========================================
// 13. ROLE MANAGEMENT
// ==========================================

function switchUserRole(role) {
    currentRole = role;

    const selector = document.getElementById('roleSelector');

    if (selector) {
        selector.value = role;
    }

    document.body.classList.toggle('role-guest', role === 'guest');

    // Navigation permissions
    document.querySelectorAll('.nav-item').forEach(function (item) {
        if (role === 'admin') {
            item.style.display = 'flex';
        } else if (item.classList.contains('role-' + role)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });

    // Admin-only elements
    document.querySelectorAll('.role-admin-only').forEach(function (element) {
        element.style.display = role === 'admin' ? '' : 'none';
    });

    // Add New Room = ADMIN ONLY
    document.querySelectorAll('#addNewRoomBtn, .add-new-room-btn').forEach(function (button) {
        button.style.display = role === 'admin' ? '' : 'none';
    });

    renderRooms();

    if (role === 'guest') {
        switchTab('tabRooms');
    } else {
        switchTab('tabDashboard');
    }
}

// ==========================================
// 14. LOGOUT
// ==========================================

function logoutUser() {
    isStaffAuthenticated = false;
    currentRole = 'guest';

    currentUser = {
        role: 'GUEST',
        name: 'Valued Guest',
        email: '',
        phone: '',
        avatar: ''
    };

    document.body.classList.add('logged-out');

    const loginModal = document.getElementById('loginModal');

    if (loginModal) {
        loginModal.classList.add('active');
        loginModal.style.display = '';
    }

    switchAuthForm('guest');
}

// ==========================================
// 15. NAVIGATION
// ==========================================

function switchTab(tabId) {
    document.querySelectorAll('.tab-page').forEach(function (page) {
        page.classList.remove('active');
    });

    document.querySelectorAll('.nav-item').forEach(function (nav) {
        nav.classList.remove('active');
    });

    const targetPage = document.getElementById(tabId);

    if (targetPage) {
        targetPage.classList.add('active');
    }

    const activeNav = document.querySelector('.nav-item[onclick*="' + tabId + '"]');

    if (activeNav) {
        activeNav.classList.add('active');
    }

    toggleSidebar(false);
}

function toggleSidebar(forceState) {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (!sidebar) return;

    const isOpen = forceState !== undefined ? forceState : !sidebar.classList.contains('open');

    if (isOpen) {
        sidebar.classList.add('open');

        if (overlay) {
            overlay.classList.add('active');
        }
    } else {
        sidebar.classList.remove('open');

        if (overlay) {
            overlay.classList.remove('active');
        }
    }
}

// ==========================================
// 16. BOOKING CALCULATOR
// ==========================================

function populateRoomDropdown() {
    const select = document.getElementById('roomTypeSelect');

    if (!select) return;

    const currentValue = select.value;

    select.innerHTML = roomList
        .map(function (room) {
            return `
                <option value="${escapeHTML(room.id)}|${escapeHTML(room.title)}|${room.price}">
                    Room ${escapeHTML(room.id)} - ${escapeHTML(room.title)} (৳${room.price.toLocaleString()}/night)
                </option>
            `;
        })
        .join('');

    if (currentValue && Array.from(select.options).some(function (option) { return option.value === currentValue; })) {
        select.value = currentValue;
    }
}

function calculateTotal() {
    const checkIn = document.getElementById('checkIn')?.value;
    const checkOut = document.getElementById('checkOut')?.value;
    const roomSelect = document.getElementById('roomTypeSelect')?.value;

    const nights = getNightsBetween(checkIn, checkOut);
    const roomPrice = roomSelect ? parseFloat(roomSelect.split('|')[2]) || 0 : 0;
    const roomTotal = roomPrice * nights;

    let addonsTotal = 0;

    document.querySelectorAll('input[name="foodMenu"]:checked, input[name="amenities"]:checked').forEach(function (cb) {
        addonsTotal += parseFloat(cb.getAttribute('data-price')) || 0;
    });

    const grandTotal = roomTotal + addonsTotal;

    const billNights = document.getElementById('billNights');
    const billRoom = document.getElementById('billRoom');
    const billAddons = document.getElementById('billAddons');
    const billTotal = document.getElementById('billTotal');

    if (billNights) billNights.textContent = nights + ' Night(s)';
    if (billRoom) billRoom.textContent = '৳' + roomTotal.toLocaleString();
    if (billAddons) billAddons.textContent = '৳' + addonsTotal.toLocaleString();
    if (billTotal) billTotal.textContent = '৳' + grandTotal.toLocaleString();

    return grandTotal;
}

// ==========================================
// 17. PAYMENT
// ==========================================

function togglePaymentDetails() {
    const method = document.getElementById('paymentMethodSelect')?.value;
    const detailsDiv = document.getElementById('onlinePaymentDetails');
    const instructions = document.getElementById('paymentInstructions');

    if (!detailsDiv || !instructions) return;

    if (method === 'cash') {
        detailsDiv.style.display = 'none';
        return;
    }

    detailsDiv.style.display = 'block';

    if (method === 'bkash') {
        instructions.innerHTML = '<b>bKash Merchant Payment:</b> Send money to <code>01700000000</code> with your booking ID.';
    } else if (method === 'nagad') {
        instructions.innerHTML = '<b>Nagad Merchant Payment:</b> Send money to <code>01800000000</code>.';
    } else {
        instructions.innerHTML = '<b>Online Gateway:</b> You will be redirected to complete secure card payment.';
    }
}

// ==========================================
// 18. BOOKING SUBMISSION
// ==========================================

function handleBookingSubmit(event) {
    if (event) event.preventDefault();

    const name = document.getElementById('bookingGuestName')?.value.trim();
    const email = document.getElementById('bookingGuestEmail')?.value.trim() || '';
    const phone = document.getElementById('bookingGuestPhone')?.value.trim() || '';
    const checkIn = document.getElementById('checkIn')?.value;
    const checkOut = document.getElementById('checkOut')?.value;
    const roomSelect = document.getElementById('roomTypeSelect')?.value;
    const method = document.getElementById('paymentMethodSelect')?.value || 'CASH';
    const previewImg = document.getElementById('previewImg')?.src || '';

    if (!name) {
        alert('⚠️ Please enter guest name!');
        return false;
    }

    if (!roomSelect) {
        alert('⚠️ Please select a room!');
        return false;
    }

    const parts = roomSelect.split('|');
    const roomId = parts[0];
    const roomTitle = parts[1];

    const room = roomList.find(function (r) { return r.id === roomId; });

    if (!room) {
        alert('❌ Selected room not found!');
        return false;
    }

    // Guests can book available rooms only.
    if (currentRole === 'guest' && room.status !== 'available') {
        alert('⚠️ Sorry! This room is currently not available.');
        return false;
    }

    const grandTotal = calculateTotal();

    const newBooking = {
        id: 'GP-' + Math.floor(1000 + Math.random() * 9000),
        guestName: name,
        guestEmail: email,
        guestPhone: phone,
        roomNumber: roomId,
        roomType: roomTitle,
        checkIn: checkIn,
        checkOut: checkOut,
        totalBill: grandTotal,
        paymentMethod: method.toUpperCase(),
        status: 'Confirmed',
        avatar: previewImg || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=c5a880&color=fff'
    };

    bookings.unshift(newBooking);

    if (email && !guests.some(function (g) { return g.email.toLowerCase() === email.toLowerCase(); })) {
        guests.push({
            id: 'G-' + Math.floor(100 + Math.random() * 900),
            name: name,
            email: email,
            phone: phone,
            avatar: newBooking.avatar
        });
    }

    // Booking makes the room occupied.
    room.status = 'occupied';

    populateRoomDropdown();
    renderAll();

    alert(
        '🎉 Booking Confirmed Successfully!\n\n' +
        'Invoice ID: ' + newBooking.id + '\n' +
        'Guest: ' + name + '\n' +
        'Room: ' + roomId + '\n' +
        'Total: ৳' + grandTotal.toLocaleString()
    );

    resetForm();

    if (currentRole === 'guest') {
        switchTab('tabRooms');
    } else {
        switchTab('tabDashboard');
    }

    return true;
}

// ==========================================
// 19. BOOK FROM BROWSE ROOMS
// ==========================================

function bookRoomFromBrowse(roomId) {
    const room = roomList.find(function (r) { return r.id === roomId; });

    if (!room) {
        alert('❌ Room not found!');
        return;
    }

    if (room.status !== 'available') {
        alert('⚠️ This room is currently not available.');
        return;
    }

    const roomSelect = document.getElementById('roomTypeSelect');

    if (roomSelect) {
        const targetValue = room.id + '|' + room.title + '|' + room.price;
        const optionExists = Array.from(roomSelect.options).some(function (option) {
            return option.value === targetValue;
        });

        if (optionExists) {
            roomSelect.value = targetValue;
        }
    }

    if (currentRole === 'guest') {
        const guestNameField = document.getElementById('bookingGuestName');
        const guestEmailField = document.getElementById('bookingGuestEmail');
        const guestPhoneField = document.getElementById('bookingGuestPhone');

        if (guestNameField && currentUser.name) guestNameField.value = currentUser.name;
        if (guestEmailField && currentUser.email) guestEmailField.value = currentUser.email;
        if (guestPhoneField && currentUser.phone) guestPhoneField.value = currentUser.phone;
    }

    const reservationForm = document.getElementById('reservationForm');
    let bookingTabFound = false;

    if (reservationForm) {
        const parentTab = reservationForm.closest('.tab-page');

        if (parentTab && parentTab.id) {
            switchTab(parentTab.id);
            bookingTabFound = true;
        }
    }

    if (!bookingTabFound) {
        const possibleTabs = [
            'tabReservation',
            'tabBooking',
            'tabNewBooking',
            'tabReservationForm',
            'tabFrontDesk'
        ];

        const availableTab = possibleTabs.find(function (id) {
            return document.getElementById(id);
        });

        if (availableTab) {
            switchTab(availableTab);
        }
    }

    calculateTotal();

    setTimeout(function () {
        if (reservationForm) {
            reservationForm.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, 150);
}

// ==========================================
// 20. RESET FORM
// ==========================================

function resetForm() {
    const form = document.getElementById('reservationForm');

    if (form) {
        form.reset();
    }

    setupDefaultDates();
    populateRoomDropdown();
    calculateTotal();
    togglePaymentDetails();
}

// ==========================================
// 21. DASHBOARD
// ==========================================

function renderDashboard() {
    const totalBookingsEl = document.getElementById('statTotalBookings');
    const totalRevEl = document.getElementById('statRevenue');
    const tbody = document.getElementById('dashboardTableBody');

    const totalRev = bookings.reduce(function (sum, booking) {
        return sum + booking.totalBill;
    }, 0);

    if (totalBookingsEl) totalBookingsEl.textContent = bookings.length;
    if (totalRevEl) totalRevEl.textContent = '৳' + totalRev.toLocaleString();

    if (tbody) {
        tbody.innerHTML = bookings.map(function (b) {
            return `
                <tr>
                    <td>
                        <img src="${escapeHTML(b.avatar)}" class="table-img vibrant-img" style="width:36px;height:36px;border-radius:50%;object-fit:cover;" alt="${escapeHTML(b.guestName)}">
                    </td>
                    <td><strong>${escapeHTML(b.id)}</strong></td>
                    <td>${escapeHTML(b.guestName)}</td>
                    <td>Room ${escapeHTML(b.roomNumber)} - ${escapeHTML(b.roomType)}</td>
                    <td><small>${escapeHTML(b.checkIn)} to ${escapeHTML(b.checkOut)}</small></td>
                    <td><strong>৳${b.totalBill.toLocaleString()}</strong></td>
                    <td>
                        <span class="badge ${b.status === 'Checked-In' ? 'badge-success' : 'badge-gold'}">
                            ${escapeHTML(b.status)}
                        </span>
                    </td>
                    <td>
                        <button type="button" class="btn-secondary-sm" onclick="alert('Printing Receipt for ${escapeHTML(b.id)}')">
                            <i class="fa-solid fa-print"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

// ==========================================
// 22. BROWSE ROOMS
// ==========================================

function renderRooms() {
    const container = document.getElementById('roomsCardsGrid');

    if (!container) return;

    const isAdmin = currentRole === 'admin';
    const isGuest = currentRole === 'guest';

    container.innerHTML = `
        <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; width:100%;" class="mt-15">
            ${roomList.map(function (room) {
                let statusClass = 'badge-danger';

                if (room.status === 'available') {
                    statusClass = 'badge-success';
                } else if (room.status === 'dirty' || room.status === 'maintenance') {
                    statusClass = 'badge-gold';
                }

                const adminControls = isAdmin ? `
                    <div class="admin-room-controls" style="display:flex; gap:5px; align-items:center; flex-wrap:wrap;">
                        <button type="button" class="btn-secondary-sm" onclick="editRoomPrice('${escapeHTML(room.id)}')">
                            <i class="fa-solid fa-pen"></i> Price
                        </button>
                        <button type="button" class="btn-secondary-sm" onclick="toggleRoomStatus('${escapeHTML(room.id)}')">
                            <i class="fa-solid fa-rotate"></i> Status
                        </button>
                    </div>
                ` : '';

                const guestBookingButton = isGuest ? `
                    <button type="button" class="btn-primary" style="width:100%; margin-top:10px; padding:10px 14px; border-radius:8px; border:none; cursor:pointer; font-weight:600; opacity:${room.status === 'available' ? '1' : '0.6'};" onclick="bookRoomFromBrowse('${escapeHTML(room.id)}')" ${room.status !== 'available' ? 'disabled' : ''}>
                        <i class="fa-solid fa-calendar-check"></i>
                        ${room.status === 'available' ? 'Book This Room' : 'Not Available'}
                    </button>
                ` : '';

                return `
                    <div class="room-card" style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:12px; overflow:hidden;">
                        <div class="room-card-img-wrapper">
                            <img src="${escapeHTML(room.img)}" class="vibrant-img" style="width:100%;height:180px;object-fit:cover;" alt="Room ${escapeHTML(room.id)}">
                        </div>

                        <div style="padding:15px;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; gap:8px;">
                                <h4 style="color:var(--gold);margin:0;">Room ${escapeHTML(room.id)}</h4>
                                <span class="badge ${statusClass}">${escapeHTML(room.status.toUpperCase())}</span>
                            </div>

                            <h5 style="margin:0 0 8px 0;">${escapeHTML(room.title)}</h5>
                            <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:12px; min-height:38px;">${escapeHTML(room.desc)}</p>

                            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:10px; gap:10px; flex-wrap:wrap;">
                                <strong style="font-size:1.1rem; color:var(--gold);">
                                    ৳${room.price.toLocaleString()}
                                    <small style="font-size:0.75rem;">/night</small>
                                </strong>
                                ${adminControls}
                            </div>

                            ${guestBookingButton}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// ==========================================
// 23. FRONT DESK
// ==========================================

function renderFrontDesk() {
    const container = document.getElementById('frontDeskRoomGrid');

    if (!container) return;

    container.innerHTML = `
        <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:15px;" class="mt-15">
            ${roomList.map(function (room) {
                let borderColor = '#ed8936';

                if (room.status === 'available') {
                    borderColor = '#48bb78';
                } else if (room.status === 'occupied') {
                    borderColor = '#f56565';
                }

                return `
                    <div style="padding:15px; border-radius:10px; background:var(--bg-card); border-left:5px solid ${borderColor}; border-top:1px solid var(--border-color); border-right:1px solid var(--border-color); border-bottom:1px solid var(--border-color);">
                        <h3 style="margin:0;color:var(--gold);">Room ${escapeHTML(room.id)}</h3>
                        <p style="font-size:0.8rem; color:var(--text-muted); margin:4px 0;">${escapeHTML(room.title)}</p>
                        <span class="badge ${room.status === 'available' ? 'badge-success' : 'badge-danger'}">
                            ${escapeHTML(room.status.toUpperCase())}
                        </span>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// ==========================================
// 24. HOUSEKEEPING
// ==========================================

function renderHousekeeping() {
    const cleanEl = document.getElementById('statCleanRooms');
    const dirtyEl = document.getElementById('statDirtyRooms');
    const maintEl = document.getElementById('statMaintRooms');
    const tbody = document.getElementById('housekeepingTableBody');

    const cleanCount = roomList.filter(function (r) { return r.status === 'available'; }).length;
    const dirtyCount = roomList.filter(function (r) { return r.status === 'dirty'; }).length;
    const maintCount = roomList.filter(function (r) { return r.status === 'maintenance'; }).length;

    if (cleanEl) cleanEl.textContent = cleanCount;
    if (dirtyEl) dirtyEl.textContent = dirtyCount;
    if (maintEl) maintEl.textContent = maintCount;

    if (tbody) {
        tbody.innerHTML = roomList.map(function (room) {
            return `
                <tr>
                    <td><strong>Room ${escapeHTML(room.id)}</strong></td>
                    <td>${escapeHTML(room.title)}</td>
                    <td>
                        <span class="badge ${room.status === 'available' ? 'badge-success' : 'badge-gold'}">
                            ${escapeHTML(room.status.toUpperCase())}
                        </span>
                    </td>
                    <td>
                        <button type="button" class="btn-secondary-sm" onclick="toggleRoomStatus('${escapeHTML(room.id)}')">
                            <i class="fa-solid fa-broom"></i> Change Status
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

// ==========================================
// 25. FINANCE
// ==========================================

function renderFinance() {
    const totalRevEl = document.getElementById('finTotalEarnings');
    const pendingEl = document.getElementById('finPending');
    const tbody = document.getElementById('financeTableBody');

    const totalRev = bookings.reduce(function (sum, booking) {
        return sum + booking.totalBill;
    }, 0);

    if (totalRevEl) totalRevEl.textContent = '৳' + totalRev.toLocaleString();
    if (pendingEl) pendingEl.textContent = '৳0';

    if (tbody) {
        tbody.innerHTML = bookings.map(function (booking) {
            return `
                <tr>
                    <td><strong>${escapeHTML(booking.id)}</strong></td>
                    <td>${escapeHTML(booking.guestName)}</td>
                    <td><span class="badge badge-gold">${escapeHTML(booking.paymentMethod)}</span></td>
                    <td><strong style="color:#48bb78;">৳${booking.totalBill.toLocaleString()}</strong></td>
                    <td>${escapeHTML(booking.checkIn)}</td>
                    <td>
                        <button type="button" class="btn-secondary-sm" onclick="alert('Downloading Receipt PDF...')">
                            <i class="fa-solid fa-download"></i> Receipt
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

// ==========================================
// 26. GUEST DIRECTORY
// ==========================================

function renderGuests() {
    const tbody = document.getElementById('guestsTableBody');

    if (!tbody) return;

    tbody.innerHTML = guests.map(function (guest) {
        return `
            <tr>
                <td>
                    <img src="${escapeHTML(guest.avatar)}" class="table-img vibrant-img" style="width:36px;height:36px;border-radius:50%;object-fit:cover;" alt="${escapeHTML(guest.name)}">
                </td>
                <td><strong>${escapeHTML(guest.name)}</strong></td>
                <td>${escapeHTML(guest.email)}</td>
                <td>${escapeHTML(guest.phone)}</td>
                <td>
                    <button type="button" class="btn-secondary-sm" onclick="alert('Viewing guest history for ${escapeHTML(guest.name)}')">
                        <i class="fa-solid fa-eye"></i> View
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// ==========================================
// 27. ADMIN ONLY - ADD NEW ROOM
// ==========================================

function promptAddNewRoom() {
    if (currentRole !== 'admin') {
        alert('❌ Only Admin can add new rooms.');
        return;
    }

    const id = prompt('Enter New Room ID (e.g. 701):');
    if (!id) return;

    const cleanId = id.trim();
    if (!cleanId) {
        alert('❌ Room ID cannot be empty.');
        return;
    }

    if (roomList.some(function (room) { return room.id === cleanId; })) {
        alert('❌ Room ' + cleanId + ' already exists!');
        return;
    }

    const title = prompt('Enter Room Category Title:');
    if (!title) return;

    const cleanTitle = title.trim();
    if (!cleanTitle) {
        alert('❌ Room title cannot be empty.');
        return;
    }

    const price = parseFloat(prompt('Enter Room Price per night (BDT):'));
    if (isNaN(price) || price < 0) {
        alert('❌ Please enter a valid room price.');
        return;
    }

    roomList.push({
        id: cleanId,
        title: cleanTitle,
        price: price,
        status: 'available',
        img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500',
        desc: 'Newly added luxury accommodation.'
    });

    populateRoomDropdown();
    renderAll();

    alert('✅ Room ' + cleanId + ' added to resort inventory!');
}

// ==========================================
// 28. ADMIN ONLY - EDIT ROOM PRICE
// ==========================================

function editRoomPrice(roomId) {
    if (currentRole !== 'admin') {
        alert('❌ Only Admin can edit room price.');
        return;
    }

    const room = roomList.find(function (r) { return r.id === roomId; });
    if (!room) return;

    const newPrice = parseFloat(prompt('Enter new price for Room ' + room.id + ':', room.price));

    if (!isNaN(newPrice) && newPrice >= 0) {
        room.price = newPrice;

        populateRoomDropdown();
        renderAll();

        alert('✅ Room ' + room.id + ' price updated to ৳' + newPrice.toLocaleString());
    }
}

// ==========================================
// 29. ROOM STATUS
// ==========================================

function toggleRoomStatus(roomId) {
    const room = roomList.find(function (r) { return r.id === roomId; });
    if (!room) return;

    const statuses = ['available', 'occupied', 'dirty', 'maintenance'];
    const currentIndex = statuses.indexOf(room.status);

    room.status = statuses[(currentIndex + 1) % statuses.length];

    renderAll();
}

// ==========================================
// 30. IMAGE PREVIEW
// ==========================================

function updateGuestImageFromUrl() {
    const url = document.getElementById('imgUrlInput')?.value;
    const img = document.getElementById('previewImg');

    if (url && img) {
        img.src = url;
    }
}

function previewUploadImage(event) {
    const file = event?.target?.files?.[0];
    const img = document.getElementById('previewImg');

    if (!file || !img) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

function updateGuestAuthImageFromUrl() {
    const url = document.getElementById('guestAuthPhotoUrl')?.value;
    const img = document.getElementById('guestAuthPreviewImg');

    if (url && img) {
        img.src = url;
    }
}

function previewGuestAuthImage(event) {
    const file = event?.target?.files?.[0];
    const img = document.getElementById('guestAuthPreviewImg');

    if (!file || !img) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
}
