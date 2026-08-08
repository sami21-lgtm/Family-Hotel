// ==========================================
// 1. GLOBAL STATE
// ==========================================

let currentRole = 'admin';
let isStaffAuthenticated = false;

let currentUser = {
    role: 'ADMINISTRATOR',
    name: 'MD. EMTIAZ HOSSAIN SAMI',
    email: 'admin@grandpalace.com',
    avatar: 'Md. EmTIAZ hOSSAIN sAMI LOGO.png'
};

const initialRooms = [
    {
        id: "101",
        title: "Deluxe Ocean View",
        price: 12000,
        status: "available",
        img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500",
        desc: "Spacious ocean view room with private balcony."
    },
    {
        id: "102",
        title: "Executive Luxury Suite",
        price: 22000,
        status: "booked",
        img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500",
        desc: "Luxury suite featuring king bed and city skyline view."
    },
    {
        id: "201",
        title: "Garden Pool Villa",
        price: 18000,
        status: "available",
        img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500",
        desc: "Serene garden view villa with private pool access."
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

// FIX: Dynamic Room Array Reference
let roomList = [...initialRooms];

let bookings = [
    { id: "GP-8801", guestName: "Arif Chowdhury", guestEmail: "arif@example.com", guestPhone: "+8801711112233", roomNumber: "401", roomType: "Royal Family Suite", checkIn: "2026-08-01", checkOut: "2026-08-05", totalBill: 80000, paymentMethod: "BKASH", status: "Checked-In", avatar: "https://ui-avatars.com/api/?name=Arif+Chowdhury&background=c5a880&color=fff" }
];

let guests = [
    { id: "G-101", name: "Arif Chowdhury", email: "arif@example.com", phone: "+8801711112233", avatar: "https://ui-avatars.com/api/?name=Arif+Chowdhury&background=c5a880&color=fff" }
];

// ==========================================
// 2. HELPERS
// ==========================================

function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getNightsBetween(checkInStr, checkOutStr) {
    if (!checkInStr || !checkOutStr) return 1;
    const start = new Date(checkInStr);
    const end = new Date(checkOutStr);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;
    const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
}

// ==========================================
// 3. INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    initClock();
    setupDefaultDates();
    populateRoomDropdown();
    renderAll();
    calculateTotal();
    updateUserProfileDisplay();

    // Event Listener for Role Selector Dropdown
    const selector = document.getElementById('roleSelector') || document.getElementById('roleSelect');
    if (selector) {
        selector.addEventListener('change', (e) => switchUserRole(e.target.value));
    }

    switchUserRole(currentRole);
});

// ==========================================
// 4. CLOCK & DATES
// ==========================================

function initClock() {
    const clockEl = document.getElementById('currentDateDisplay');
    const update = function () {
        const now = new Date();
        if (clockEl) {
            clockEl.innerHTML = '<i class="fa-regular fa-clock"></i> ' + now.toLocaleDateString('en-GB') + ' | ' + now.toLocaleTimeString();
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

// ==========================================
// 5. AUTHENTICATION & MODAL LOGIC
// ==========================================

function openLoginModal() {
    const modal = document.getElementById('loginModal') || document.getElementById('authModal');
    if (modal) modal.classList.add('active');
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal') || document.getElementById('authModal');
    if (modal) modal.classList.remove('active');
}

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

    const email = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPasswordInput')?.value;

    if (email === 'admin@grandpalace.com' && password === 'admin123') {
        isStaffAuthenticated = true;
        currentUser = {
            role: 'ADMINISTRATOR',
            name: 'MD. EMTIAZ HOSSAIN SAMI',
            email: email,
            avatar: 'https://ui-avatars.com/api/?name=Admin+Sami&background=d4af37&color=000'
        };

        closeLoginModal();
        switchUserRole('admin');
        updateUserProfileDisplay();
        alert('Welcome Back, Admin!');
    } else {
        alert('❌ Invalid Credentials! (Use: admin@grandpalace.com / admin123)');
    }
    return false;
}

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
        avatar: previewImg || ('https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=c5a880&color=fff')
    };

    closeLoginModal();
    switchUserRole('guest');
    updateUserProfileDisplay();
    alert('🎉 Welcome ' + name + ' to Grand Palace Resort & Spa!');
    return false;
}

function updateUserProfileDisplay() {
    const nameEl = document.getElementById('sidebarUserName');
    const roleEl = document.getElementById('sidebarUserRole');
    const avatarEl = document.getElementById('sidebarAvatar');
    const topAvatarEl = document.getElementById('topbarAvatar');

    if (nameEl) nameEl.textContent = currentUser.name;
    if (roleEl) roleEl.textContent = 'Role: ' + currentUser.role;
    if (avatarEl) avatarEl.src = currentUser.avatar;
    if (topAvatarEl) topAvatarEl.src = currentUser.avatar;
}

function switchUserRole(role) {
    currentRole = role;
    const selector = document.getElementById('roleSelector') || document.getElementById('roleSelect');
    if (selector) selector.value = role;

    document.body.classList.remove('role-admin', 'role-guest');
    document.body.classList.add('role-' + role);

    // Show/Hide admin sections
    document.querySelectorAll('.role-admin-only').forEach(el => {
        el.style.display = role === 'admin' ? '' : 'none';
    });

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
    openLoginModal();
    switchAuthForm('guest');
}

// ==========================================
// 6. NAVIGATION & TAB SYSTEM
// ==========================================

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
    sidebar.classList.toggle('open', isOpen);
    if (overlay) overlay.classList.toggle('active', isOpen);
}

// ==========================================
// 7. ROOM MANAGEMENT & BOOKING
// ==========================================

function renderAll() {
    renderDashboard();
    renderRooms();
    renderFrontDesk();
    renderHousekeeping();
    renderFinance();
    renderGuests();
}

function populateRoomDropdown() {
    const select = document.getElementById('roomTypeSelect');
    if (!select) return;

    select.innerHTML = roomList.map(room => `
        <option value="${escapeHTML(room.id)}|${escapeHTML(room.title)}|${room.price}">
            Room ${escapeHTML(room.id)} - ${escapeHTML(room.title)} (৳${room.price.toLocaleString()}/night)
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
    if (method === 'bkash') instructions.innerHTML = '<b>bKash Payment:</b> Send money to <code>01700000000</code> with reference.';
    else if (method === 'nagad') instructions.innerHTML = '<b>Nagad Payment:</b> Send money to <code>01800000000</code>.';
    else instructions.innerHTML = '<b>Online Card Gateway:</b> Secure SSL Encryption standard.';
}

function handleBookingSubmit(event) {
    if (event) event.preventDefault();

    const name = document.getElementById('bookingGuestName')?.value.trim();
    const roomSelect = document.getElementById('roomTypeSelect')?.value;

    if (!name || !roomSelect) {
        alert('⚠️ Please fill required fields!');
        return false;
    }

    const parts = roomSelect.split('|');
    const room = roomList.find(r => r.id === parts[0]);

    if (currentRole === 'guest' && room.status !== 'available') {
        alert('⚠️ Sorry! Guest can only book Available rooms.');
        return false;
    }

    const grandTotal = calculateTotal();
    const newBooking = {
        id: 'GP-' + Math.floor(1000 + Math.random() * 9000),
        guestName: name,
        guestEmail: document.getElementById('bookingGuestEmail')?.value || '',
        guestPhone: document.getElementById('bookingGuestPhone')?.value || '',
        roomNumber: room.id,
        roomType: room.title,
        checkIn: document.getElementById('checkIn')?.value,
        checkOut: document.getElementById('checkOut')?.value,
        totalBill: grandTotal,
        paymentMethod: (document.getElementById('paymentMethodSelect')?.value || 'CASH').toUpperCase(),
        status: 'Confirmed',
        avatar: document.getElementById('previewImg')?.src || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name)
    };

    bookings.unshift(newBooking);
    room.status = 'occupied';

    populateRoomDropdown();
    renderAll();

    alert('🎉 Reservation Confirmed! Invoice ID: ' + newBooking.id);
    resetForm();
    switchTab('tabDashboard');
    return true;
}

function bookRoomFromBrowse(roomId) {
    const room = roomList.find(r => r.id === roomId);
    if (!room || room.status !== 'available') {
        alert('⚠️ This room is not available for booking.');
        return;
    }

    switchTab('tabBooking');
    const roomSelect = document.getElementById('roomTypeSelect');
    if (roomSelect) {
        roomSelect.value = `${room.id}|${room.title}|${room.price}`;
        calculateTotal();
    }
}

function resetForm() {
    document.getElementById('reservationForm')?.reset();
    setupDefaultDates();
    calculateTotal();
}

// ==========================================
// 8. RENDER HELPERS
// ==========================================

function renderDashboard() {
    const totalRev = bookings.reduce((sum, b) => sum + b.totalBill, 0);
    if (document.getElementById('statTotalBookings')) document.getElementById('statTotalBookings').textContent = bookings.length;
    if (document.getElementById('statRevenue')) document.getElementById('statRevenue').textContent = '৳' + totalRev.toLocaleString();

    const tbody = document.getElementById('dashboardTableBody');
    if (tbody) {
        tbody.innerHTML = bookings.map(b => `
            <tr>
                <td><img src="${escapeHTML(b.avatar)}" class="table-img" style="width:32px;height:32px;border-radius:50%;" alt="Guest"></td>
                <td><strong>${escapeHTML(b.id)}</strong></td>
                <td>${escapeHTML(b.guestName)}</td>
                <td>Room ${escapeHTML(b.roomNumber)}</td>
                <td><small>${escapeHTML(b.checkIn)} to ${escapeHTML(b.checkOut)}</small></td>
                <td><strong>৳${b.totalBill.toLocaleString()}</strong></td>
                <td><span class="badge badge-success">${escapeHTML(b.status)}</span></td>
                <td><button class="btn-secondary-sm" onclick="alert('Printing receipt...')"><i class="fa-solid fa-print"></i></button></td>
            </tr>
        `).join('');
    }
}

function renderRooms() {
    const container = document.getElementById('roomsCardsGrid');
    if (!container) return;

    const isAdmin = currentRole === 'admin';
    container.innerHTML = roomList.map(room => {
        const isAvailable = room.status === 'available';
        return `
            <div class="room-card">
                <div class="room-card-img-wrapper">
                    <img src="${escapeHTML(room.img)}" alt="Room">
                </div>
                <div style="padding:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h4 style="color:var(--gold);">Room ${escapeHTML(room.id)}</h4>
                        <span class="badge ${isAvailable ? 'badge-success' : 'badge-danger'}">${escapeHTML(room.status.toUpperCase())}</span>
                    </div>
                    <h5>${escapeHTML(room.title)}</h5>
                    <p style="color:var(--text-muted); font-size:0.8rem; margin:5px 0;">${escapeHTML(room.desc)}</p>
                    <strong style="color:var(--gold); font-size:1rem;">৳${room.price.toLocaleString()}/night</strong>

                    ${isAdmin ? `
                        <div class="admin-room-controls">
                            <button class="btn-secondary-sm" onclick="editRoomPrice('${room.id}')"><i class="fa-solid fa-pen"></i> Price</button>
                            <button class="btn-secondary-sm" onclick="toggleRoomStatus('${room.id}')"><i class="fa-solid fa-rotate"></i> Status</button>
                        </div>
                    ` : `
                        <button class="btn-primary" style="width:100%; margin-top:8px;" onclick="bookRoomFromBrowse('${room.id}')" ${!isAvailable ? 'disabled' : ''}>
                            <i class="fa-solid fa-calendar-check"></i> ${isAvailable ? 'Book Room' : 'Unavailable'}
                        </button>
                    `}
                </div>
            </div>
        `;
    }).join('');
}

function renderFrontDesk() {
    const container = document.getElementById('frontDeskRoomGrid');
    if (container) {
        container.innerHTML = `<div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:10px;">
            ${roomList.map(r => `
                <div style="padding:10px; border-radius:8px; background:var(--bg-card); border-left:4px solid ${r.status==='available'?'#10b981':'#ef4444'};">
                    <strong>Room ${r.id}</strong>
                    <div style="font-size:0.75rem; color:var(--text-muted);">${r.status.toUpperCase()}</div>
                </div>
            `).join('')}
        </div>`;
    }
}

function renderHousekeeping() {
    const tbody = document.getElementById('housekeepingTableBody');
    if (tbody) {
        tbody.innerHTML = roomList.map(r => `
            <tr>
                <td><strong>Room ${r.id}</strong></td>
                <td>${r.title}</td>
                <td><span class="badge ${r.status==='available'?'badge-success':'badge-gold'}">${r.status.toUpperCase()}</span></td>
                <td><button class="btn-secondary-sm" onclick="toggleRoomStatus('${r.id}')"><i class="fa-solid fa-broom"></i> Toggle</button></td>
            </tr>
        `).join('');
    }
}

function renderFinance() {
    const tbody = document.getElementById('financeTableBody');
    if (tbody) {
        tbody.innerHTML = bookings.map(b => `
            <tr>
                <td><strong>${b.id}</strong></td>
                <td>${b.guestName}</td>
                <td><span class="badge badge-gold">${b.paymentMethod}</span></td>
                <td>৳${b.totalBill.toLocaleString()}</td>
                <td>${b.checkIn}</td>
                <td><button class="btn-secondary-sm" onclick="alert('Downloading invoice PDF...')"><i class="fa-solid fa-download"></i></button></td>
            </tr>
        `).join('');
    }
}

function renderGuests() {
    const tbody = document.getElementById('guestsTableBody');
    if (tbody) {
        tbody.innerHTML = guests.map(g => `
            <tr>
                <td><img src="${g.avatar}" style="width:30px;height:30px;border-radius:50%;" alt="Avatar"></td>
                <td><strong>${g.name}</strong></td>
                <td>${g.email}</td>
                <td>${g.phone}</td>
                <td><button class="btn-secondary-sm" onclick="alert('Viewing guest profile...')"><i class="fa-solid fa-eye"></i></button></td>
            </tr>
        `).join('');
    }
}

// ==========================================
// 9. ADMIN ACTIONS
// ==========================================

function promptAddNewRoom() {
    if (currentRole !== 'admin') return;

    const id = prompt('Enter Room ID (e.g. 701):');
    if (!id) return;
    const title = prompt('Enter Room Category:');
    if (!title) return;
    const price = parseFloat(prompt('Enter Price per night:'));
    if (isNaN(price)) return;

    roomList.push({
        id: id,
        title: title,
        price: price,
        status: 'available',
        img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500',
        desc: 'Newly added resort accommodation.'
    });

    populateRoomDropdown();
    renderAll();
    alert('✅ Room Added!');
}

function editRoomPrice(roomId) {
    if (currentRole !== 'admin') return;
    const room = roomList.find(r => r.id === roomId);
    if (!room) return;

    const newPrice = parseFloat(prompt('Enter new price for Room ' + room.id, room.price));
    if (!isNaN(newPrice)) {
        room.price = newPrice;
        populateRoomDropdown();
        renderAll();
    }
}

function toggleRoomStatus(roomId) {
    const room = roomList.find(r => r.id === roomId);
    if (!room) return;
    const statuses = ['available', 'occupied', 'dirty', 'maintenance'];
    room.status = statuses[(statuses.indexOf(room.status) + 1) % statuses.length];
    renderAll();
}

// ==========================================
// 10. IMAGE PREVIEW HANDLERS
// ==========================================

function updateGuestImageFromUrl() {
    const url = document.getElementById('imgUrlInput')?.value;
    if (url && document.getElementById('previewImg')) {
        document.getElementById('previewImg').src = url;
    }
}

function previewUploadImage(event) {
    const file = event?.target?.files?.[0];
    if (file && document.getElementById('previewImg')) {
        const reader = new FileReader();
        reader.onload = e => document.getElementById('previewImg').src = e.target.result;
        reader.readAsDataURL(file);
    }
}

function updateGuestAuthImageFromUrl() {
    const url = document.getElementById('guestAuthPhotoUrl')?.value;
    if (url && document.getElementById('guestAuthPreviewImg')) {
        document.getElementById('guestAuthPreviewImg').src = url;
    }
}

function previewGuestAuthImage(event) {
    const file = event?.target?.files?.[0];
    if (file && document.getElementById('guestAuthPreviewImg')) {
        const reader = new FileReader();
        reader.onload = e => document.getElementById('guestAuthPreviewImg').src = e.target.result;
        reader.readAsDataURL(file);
    }
}
