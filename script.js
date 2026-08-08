// ==========================================
// GRAND PALACE RESORT & SPA - SCRIPT
// ==========================================

let currentRole = 'admin'; // admin, guest, frontdesk, etc.
let isStaffAuthenticated = true;

let currentUser = {
    role: 'ADMINISTRATOR',
    name: 'MD. EMTIAZ HOSSAIN SAMI',
    email: 'admin@grandpalace.com',
    avatar: 'Md. EmTIAZ hOSSAIN sAMI LOGO.png'
};

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
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;
    const diffTime = end - start;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
}

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
        resForm.addEventListener('submit', handleBookingSubmit);
    }

    const staffForm = document.getElementById('staffLoginForm');
    if (staffForm) staffForm.addEventListener('submit', handleStaffLogin);

    const guestForm = document.getElementById('guestLoginForm');
    if (guestForm) guestForm.addEventListener('submit', handleGuestLoginSubmit);

    switchUserRole(currentRole);
});

function initClock() {
    const clockEl = document.getElementById('currentDateDisplay');
    const update = function () {
        const now = new Date();
        if (clockEl) {
            clockEl.innerHTML = '<i class="fa-regular fa-clock"></i> ' +
                now.toLocaleDateString('en-GB') + ' | ' + now.toLocaleTimeString();
        }
    };
    update();
    setInterval(update, 1000);
}

function setupDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    const cIn = document.getElementById('checkIn');
    const cOut = document.getElementById('checkOut');

    if (cIn && !cIn.value) cIn.value = today;
    if (cOut && !cOut.value) cOut.value = tomorrow;
}

function renderAll() {
    renderDashboard();
    renderRooms();
    renderFrontDesk();
    renderHousekeeping();
    renderFinance();
    renderGuests();
}

// ==========================================
// BROWSE ROOMS (GUEST vs ADMIN DYNAMIC VIEW)
// ==========================================

function renderRooms() {
    const container = document.getElementById('roomsCardsGrid');
    if (!container) return;

    const isAdmin = (currentRole === 'admin');

    // Add New Room Button visibility handle
    const addBtn = document.getElementById('addNewRoomBtn');
    if (addBtn) {
        addBtn.style.display = isAdmin ? 'inline-flex' : 'none';
    }

    container.innerHTML = roomList.map(function (room) {
        let statusClass = 'badge-danger';
        if (room.status === 'available') {
            statusClass = 'badge-success';
        } else if (room.status === 'dirty' || room.status === 'maintenance') {
            statusClass = 'badge-gold';
        }

        // ADMIN ONLY CONTROLS (Price Edit & Status Toggle Buttons)
        const adminControls = isAdmin ? `
            <div class="admin-room-controls" style="display: flex; gap: 6px;">
                <button type="button" class="btn-secondary-sm" onclick="editRoomPrice('${escapeHTML(room.id)}')">
                    <i class="fa-solid fa-pen"></i> Price
                </button>
                <button type="button" class="btn-secondary-sm" onclick="toggleRoomStatus('${escapeHTML(room.id)}')">
                    <i class="fa-solid fa-rotate"></i> Status
                </button>
            </div>
        ` : '';

        // GUEST ONLY BOOKING BUTTON (No Price or Status edit allowed for Guest)
        const guestBookingButton = !isAdmin ? `
            <div class="guest-room-controls" style="width:100%; margin-top:12px;">
                <button type="button" class="btn-primary" style="width:100%;" onclick="bookRoomFromBrowse('${escapeHTML(room.id)}')" ${room.status !== 'available' ? 'disabled' : ''}>
                    <i class="fa-solid fa-calendar-check"></i>
                    ${room.status === 'available' ? 'Book This Room (৳' + room.price.toLocaleString() + ')' : 'Not Available'}
                </button>
            </div>
        ` : '';

        return `
            <div class="room-card">
                <div class="room-card-img-wrapper">
                    <img src="${escapeHTML(room.img)}" class="vibrant-img" alt="Room ${escapeHTML(room.id)}">
                </div>

                <div style="padding:15px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; gap:8px;">
                        <h4 style="color:var(--gold);margin:0;">Room ${escapeHTML(room.id)}</h4>
                        <span class="badge ${statusClass}">${escapeHTML(room.status.toUpperCase())}</span>
                    </div>

                    <h5 style="margin:0 0 8px 0; font-size:1rem; color:var(--text-main);">${escapeHTML(room.title)}</h5>
                    <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:12px; min-height:36px;">${escapeHTML(room.desc)}</p>

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
    }).join('');
}

// ==========================================
// AUTH & ROLE MANAGEMENT
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

function handleStaffLogin(event) {
    if (event) event.preventDefault();
    const email = document.getElementById('loginEmail')?.value.trim() || '';
    const password = document.getElementById('loginPasswordInput')?.value || '';

    if (email.toLowerCase() === 'admin@grandpalace.com' && password === 'admin123') {
        isStaffAuthenticated = true;
        currentRole = 'admin';
        document.body.classList.remove('logged-out');

        const loginModal = document.getElementById('loginModal');
        if (loginModal) loginModal.classList.remove('active');

        currentUser = {
            role: 'ADMINISTRATOR',
            name: 'MD. EMTIAZ HOSSAIN SAMI',
            email: email,
            avatar: 'Md. EmTIAZ hOSSAIN sAMI LOGO.png'
        };

        switchUserRole('admin');
        alert('Welcome Back, Admin!');
        return true;
    } else {
        alert('❌ Invalid Credentials!\nUse admin@grandpalace.com / admin123');
        return false;
    }
}

function handleGuestLoginSubmit(event) {
    if (event) event.preventDefault();
    const name = document.getElementById('guestAuthName')?.value.trim() || 'Valued Guest';
    const email = document.getElementById('guestAuthEmail')?.value.trim() || '';
    const phone = document.getElementById('guestAuthPhone')?.value.trim() || '';

    currentUser = {
        role: 'GUEST',
        name: name,
        email: email,
        phone: phone,
        avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=c5a880&color=fff'
    };

    currentRole = 'guest';
    document.body.classList.remove('logged-out');

    const loginModal = document.getElementById('loginModal');
    if (loginModal) loginModal.classList.remove('active');

    switchUserRole('guest');
    alert('🎉 Welcome ' + name + '!');
    return true;
}

function switchUserRole(role) {
    currentRole = role;
    const selector = document.getElementById('roleSelector');
    if (selector) selector.value = role;

    document.body.className = 'role-' + role;

    const nameEl = document.getElementById('sidebarUserName');
    const roleEl = document.getElementById('sidebarUserRole');
    const avatarEl = document.getElementById('sidebarUserAvatar');

    if (role === 'admin') {
        if (nameEl) nameEl.textContent = 'MD. EMTIAZ HOSSAIN SAMI';
        if (roleEl) roleEl.textContent = 'Role: ADMINISTRATOR';
        if (avatarEl) avatarEl.src = 'Md. EmTIAZ hOSSAIN sAMI LOGO.png';
    } else {
        if (nameEl) nameEl.textContent = currentUser.name || 'Valued Guest';
        if (roleEl) roleEl.textContent = 'Role: GUEST';
        if (avatarEl) avatarEl.src = currentUser.avatar || 'https://ui-avatars.com/api/?name=Guest&background=c5a880&color=fff';
    }

    renderRooms();

    if (role === 'guest') {
        switchTab('tabRooms');
    } else {
        switchTab('tabDashboard');
    }
}

function logoutUser() {
    isStaffAuthenticated = false;
    currentRole = 'guest';

    const loginModal = document.getElementById('loginModal');
    if (loginModal) loginModal.classList.add('active');
    switchAuthForm('guest');
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));

    const targetPage = document.getElementById(tabId);
    if (targetPage) targetPage.classList.add('active');

    const activeNav = document.querySelector(`.nav-item[onclick*="${tabId}"]`);
    if (activeNav) activeNav.classList.add('active');

    toggleSidebar(false);
}

function toggleSidebar(forceState) {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (!sidebar) return;

    const isOpen = forceState !== undefined ? forceState : !sidebar.classList.contains('open');
    if (isOpen) {
        sidebar.classList.add('open');
        if (overlay) overlay.classList.add('active');
    } else {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
    }
}

function populateRoomDropdown() {
    const select = document.getElementById('roomTypeSelect');
    if (!select) return;

    select.innerHTML = roomList.map(room => `
        <option value="${room.id}|${room.title}|${room.price}">
            Room ${room.id} - ${room.title} (৳${room.price.toLocaleString()}/night)
        </option>
    `).join('');
}

function calculateTotal() {
    const checkIn = document.getElementById('checkIn')?.value;
    const checkOut = document.getElementById('checkOut')?.value;
    const roomSelect = document.getElementById('roomTypeSelect')?.value;

    const nights = getNightsBetween(checkIn, checkOut);
    const roomPrice = roomSelect ? parseFloat(roomSelect.split('|')[2]) || 0 : 0;
    const roomTotal = roomPrice * nights;

    let addonsTotal = 0;
    document.querySelectorAll('input[name="foodMenu"]:checked, input[name="amenities"]:checked').forEach(cb => {
        addonsTotal += parseFloat(cb.getAttribute('data-price')) || 0;
    });

    const grandTotal = roomTotal + addonsTotal;

    if (document.getElementById('billNights')) document.getElementById('billNights').textContent = nights + ' Night(s)';
    if (document.getElementById('billRoom')) document.getElementById('billRoom').textContent = '৳' + roomTotal.toLocaleString();
    if (document.getElementById('billAddons')) document.getElementById('billAddons').textContent = '৳' + addonsTotal.toLocaleString();
    if (document.getElementById('billTotal')) document.getElementById('billTotal').textContent = '৳' + grandTotal.toLocaleString();

    return grandTotal;
}

function bookRoomFromBrowse(roomId) {
    const room = roomList.find(r => r.id === roomId);
    if (!room || room.status !== 'available') {
        alert('⚠️ Sorry! This room is currently unavailable.');
        return;
    }

    const roomSelect = document.getElementById('roomTypeSelect');
    if (roomSelect) {
        const targetVal = `${room.id}|${room.title}|${room.price}`;
        roomSelect.value = targetVal;
    }

    if (currentUser.name && currentUser.name !== 'Valued Guest') {
        if (document.getElementById('bookingGuestName')) document.getElementById('bookingGuestName').value = currentUser.name;
        if (document.getElementById('bookingGuestEmail')) document.getElementById('bookingGuestEmail').value = currentUser.email || '';
        if (document.getElementById('bookingGuestPhone')) document.getElementById('bookingGuestPhone').value = currentUser.phone || '';
    }

    switchTab('tabBooking');
    calculateTotal();
}

function handleBookingSubmit(event) {
    if (event) event.preventDefault();

    const name = document.getElementById('bookingGuestName')?.value.trim();
    const roomSelect = document.getElementById('roomTypeSelect')?.value;

    if (!name || !roomSelect) {
        alert('⚠️ Please complete all required fields.');
        return false;
    }

    const parts = roomSelect.split('|');
    const roomId = parts[0];
    const roomTitle = parts[1];

    const grandTotal = calculateTotal();

    bookings.unshift({
        id: 'GP-' + Math.floor(1000 + Math.random() * 9000),
        guestName: name,
        guestEmail: document.getElementById('bookingGuestEmail')?.value || '',
        guestPhone: document.getElementById('bookingGuestPhone')?.value || '',
        roomNumber: roomId,
        roomType: roomTitle,
        checkIn: document.getElementById('checkIn')?.value,
        checkOut: document.getElementById('checkOut')?.value,
        totalBill: grandTotal,
        paymentMethod: document.getElementById('paymentMethodSelect')?.value.toUpperCase() || 'CASH',
        status: 'Confirmed',
        avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=c5a880&color=fff'
    });

    const room = roomList.find(r => r.id === roomId);
    if (room) room.status = 'occupied';

    renderAll();
    alert('🎉 Booking Confirmed Successfully!\nInvoice ID: ' + bookings[0].id);
    resetForm();

    if (currentRole === 'guest') {
        switchTab('tabRooms');
    } else {
        switchTab('tabDashboard');
    }
    return true;
}

// ==========================================
// ADMIN ACTIONS: ADD ROOM, EDIT PRICE & STATUS
// ==========================================

function promptAddNewRoom() {
    if (currentRole !== 'admin') return;

    const id = prompt('Enter Room ID (e.g. 701):');
    if (!id) return;
    const title = prompt('Enter Room Title:');
    if (!title) return;
    const price = parseFloat(prompt('Enter Room Price per night (BDT):'));
    if (isNaN(price)) return;

    roomList.push({
        id: id,
        title: title,
        price: price,
        status: 'available',
        img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500',
        desc: 'Newly added room accommodation.'
    });

    populateRoomDropdown();
    renderAll();
    alert('✅ New Room Added Successfully!');
}

function editRoomPrice(roomId) {
    if (currentRole !== 'admin') return;
    const room = roomList.find(r => r.id === roomId);
    if (!room) return;

    const newPrice = parseFloat(prompt('Enter new price for Room ' + room.id + ':', room.price));
    if (!isNaN(newPrice) && newPrice >= 0) {
        room.price = newPrice;
        populateRoomDropdown();
        renderAll();
        alert('✅ Room ' + room.id + ' price updated to ৳' + newPrice.toLocaleString());
    }
}

function toggleRoomStatus(roomId) {
    if (currentRole !== 'admin') return;
    const room = roomList.find(r => r.id === roomId);
    if (!room) return;

    const statuses = ['available', 'occupied', 'dirty', 'maintenance'];
    const idx = statuses.indexOf(room.status);
    room.status = statuses[(idx + 1) % statuses.length];

    renderAll();
}

function resetForm() {
    const form = document.getElementById('reservationForm');
    if (form) form.reset();
    setupDefaultDates();
    calculateTotal();
}

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
    instructions.innerHTML = '<b>Payment Gateway Instructions:</b> Complete payment via ' + method.toUpperCase() + ' merchant number.';
}

function renderDashboard() {
    const totalBookingsEl = document.getElementById('statTotalBookings');
    const totalRevEl = document.getElementById('statRevenue');
    const tbody = document.getElementById('dashboardTableBody');

    const totalRev = bookings.reduce((sum, b) => sum + b.totalBill, 0);

    if (totalBookingsEl) totalBookingsEl.textContent = bookings.length;
    if (totalRevEl) totalRevEl.textContent = '৳' + totalRev.toLocaleString();

    if (tbody) {
        tbody.innerHTML = bookings.map(b => `
            <tr>
                <td><img src="${escapeHTML(b.avatar)}" class="table-img" style="width:36px;height:36px;border-radius:50%;" alt="${escapeHTML(b.guestName)}"></td>
                <td><strong>${escapeHTML(b.id)}</strong></td>
                <td>${escapeHTML(b.guestName)}</td>
                <td>Room ${escapeHTML(b.roomNumber)}</td>
                <td><small>${escapeHTML(b.checkIn)} to ${escapeHTML(b.checkOut)}</small></td>
                <td><strong>৳${b.totalBill.toLocaleString()}</strong></td>
                <td><span class="badge badge-success">${escapeHTML(b.status)}</span></td>
                <td><button type="button" class="btn-secondary-sm" onclick="alert('Receipt ID: ${b.id}')"><i class="fa-solid fa-print"></i></button></td>
            </tr>
        `).join('');
    }
}

function renderFrontDesk() {
    const container = document.getElementById('frontDeskRoomGrid');
    if (!container) return;

    container.innerHTML = `
        <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:15px;" class="mt-15">
            ${roomList.map(r => `
                <div style="padding:15px; border-radius:10px; background:var(--bg-card); border-left:5px solid ${r.status === 'available' ? '#48bb78' : '#f56565'}; border-top:1px solid var(--border-color); border-right:1px solid var(--border-color); border-bottom:1px solid var(--border-color);">
                    <h3 style="margin:0;color:var(--gold);">Room ${escapeHTML(r.id)}</h3>
                    <p style="font-size:0.8rem; color:var(--text-muted); margin:4px 0;">${escapeHTML(r.title)}</p>
                    <span class="badge ${r.status === 'available' ? 'badge-success' : 'badge-danger'}">${escapeHTML(r.status.toUpperCase())}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function renderHousekeeping() {
    const tbody = document.getElementById('housekeepingTableBody');
    if (tbody) {
        tbody.innerHTML = roomList.map(r => `
            <tr>
                <td><strong>Room ${escapeHTML(r.id)}</strong></td>
                <td>${escapeHTML(r.title)}</td>
                <td><span class="badge badge-gold">${escapeHTML(r.status.toUpperCase())}</span></td>
                <td>
                    <button type="button" class="btn-secondary-sm" onclick="toggleRoomStatus('${escapeHTML(r.id)}')">
                        <i class="fa-solid fa-broom"></i> Change Status
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

function renderFinance() {
    const tbody = document.getElementById('financeTableBody');
    if (tbody) {
        tbody.innerHTML = bookings.map(b => `
            <tr>
                <td><strong>${escapeHTML(b.id)}</strong></td>
                <td>${escapeHTML(b.guestName)}</td>
                <td><span class="badge badge-gold">${escapeHTML(b.paymentMethod)}</span></td>
                <td><strong style="color:#48bb78;">৳${b.totalBill.toLocaleString()}</strong></td>
                <td>${escapeHTML(b.checkIn)}</td>
                <td><button type="button" class="btn-secondary-sm"><i class="fa-solid fa-download"></i> Receipt</button></td>
            </tr>
        `).join('');
    }
}

function renderGuests() {
    const tbody = document.getElementById('guestsTableBody');
    if (tbody) {
        tbody.innerHTML = guests.map(g => `
            <tr>
                <td><img src="${escapeHTML(g.avatar)}" class="table-img" style="width:36px;height:36px;border-radius:50%;" alt="${escapeHTML(g.name)}"></td>
                <td><strong>${escapeHTML(g.name)}</strong></td>
                <td>${escapeHTML(g.email)}</td>
                <td>${escapeHTML(g.phone)}</td>
                <td><button type="button" class="btn-secondary-sm"><i class="fa-solid fa-eye"></i> View</button></td>
            </tr>
        `).join('');
    }
}

function updateGuestImageFromUrl() {
    const url = document.getElementById('imgUrlInput')?.value;
    const img = document.getElementById('previewImg');
    if (url && img) img.src = url;
}

function previewUploadImage(e) {
    const file = e?.target?.files?.[0];
    const img = document.getElementById('previewImg');
    if (file && img) {
        const reader = new FileReader();
        reader.onload = ev => img.src = ev.target.result;
        reader.readAsDataURL(file);
    }
}

function updateGuestAuthImageFromUrl() {
    const url = document.getElementById('guestAuthPhotoUrl')?.value;
    const img = document.getElementById('guestAuthPreviewImg');
    if (url && img) img.src = url;
}

function previewGuestAuthImage(e) {
    const file = e?.target?.files?.[0];
    const img = document.getElementById('guestAuthPreviewImg');
    if (file && img) {
        const reader = new FileReader();
        reader.onload = ev => img.src = ev.target.result;
        reader.readAsDataURL(file);
    }
}
