// ==========================================
// GRAND PALACE RESORT & SPA - SCRIPT
// ==========================================

let currentRole = 'admin'; // 'admin' or 'guest'

let currentUser = {
    role: 'ADMINISTRATOR',
    name: 'MD. EMTIAZ HOSSAIN SAMI',
    email: 'admin@grandpalace.com',
    phone: '+8801700000000',
    avatar: 'Md. EmTIAZ hOSSAIN sAMI LOGO.png'
};

// ==========================================
// 1. ROOM LIST DATA
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
// 2. BOOKINGS & GUESTS DATA
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
        status: "Confirmed",
        avatar: "https://ui-avatars.com/api/?name=Arif+Chowdhury&background=c5a880&color=fff"
    }
];

let guests = [
    {
        id: "G-101",
        name: "Arif Chowdhury",
        email: "arif@example.com",
        phone: "+8801711112233"
    }
];

// Helper Functions
function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getNightsBetween(cIn, cOut) {
    if (!cIn || !cOut) return 1;
    const start = new Date(cIn);
    const end = new Date(cOut);
    const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
}

function autoFillGuestInfo() {
    if (currentUser && currentUser.name && currentUser.name !== 'Valued Guest') {
        const nameInput = document.getElementById('bookingGuestName');
        const emailInput = document.getElementById('bookingGuestEmail');
        const phoneInput = document.getElementById('bookingGuestPhone');

        if (nameInput) nameInput.value = currentUser.name;
        if (emailInput && currentUser.email) emailInput.value = currentUser.email;
        if (phoneInput && currentUser.phone) phoneInput.value = currentUser.phone;
    }
}

// ==========================================
// 3. INITIALIZATION (UPDATED FOR RELOAD PERSISTENCE)
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    // 1. Reload Check: Restore persistent session from localStorage
    const savedRole = localStorage.getItem('currentRole');
    const savedUser = localStorage.getItem('currentUser');

    if (savedRole && savedUser) {
        try {
            currentRole = savedRole;
            currentUser = JSON.parse(savedUser);
            
            // Hide login modal if user is already logged in
            const loginModal = document.getElementById('loginModal');
            if (loginModal) {
                loginModal.classList.remove('active');
            }
        } catch (e) {
            console.error('Failed to parse saved session user', e);
        }
    }

    initClock();
    setupDefaultDates();
    populateRoomDropdown();
    renderAll();
    calculateTotal();

    const resForm = document.getElementById('reservationForm');
    if (resForm) {
        resForm.addEventListener('change', calculateTotal);
        resForm.addEventListener('input', calculateTotal);
    }

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
    
    if (cIn) {
        cIn.min = today;
        if (!cIn.value) cIn.value = today;
    }
    if (cOut) {
        cOut.min = tomorrow;
        if (!cOut.value) cOut.value = tomorrow;
    }
}

function renderAll() {
    renderGuestRooms();
    renderAdminRooms();
    renderDashboard();
    renderFrontDesk();
    renderHousekeeping();
    renderFinance();
    renderGuests();
}

// ==========================================
// 4. GUEST ROOMS RENDER
// ==========================================
function renderGuestRooms() {
    const container = document.getElementById('guestRoomsCardsGrid');
    if (!container) return;

    container.innerHTML = roomList.map(function (room) {
        const isAvailable = room.status === 'available';
        let statusClass = isAvailable ? 'badge-success' : 'badge-danger';

        return `
            <div class="room-card">
                <div class="room-card-img-wrapper">
                    <img src="${escapeHTML(room.img)}" alt="Room ${escapeHTML(room.id)}">
                </div>
                <div style="padding:15px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                        <h4 style="color:var(--gold);margin:0;">Room ${escapeHTML(room.id)}</h4>
                        <span class="badge ${statusClass}">${escapeHTML(room.status.toUpperCase())}</span>
                    </div>

                    <h5 style="margin:0 0 8px 0; font-size:1rem; color:var(--text-main);">${escapeHTML(room.title)}</h5>
                    <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:12px; min-height:36px;">${escapeHTML(room.desc)}</p>

                    <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:10px;">
                        <strong style="font-size:1.1rem; color:var(--gold);">
                            ৳${room.price.toLocaleString()} <small style="font-size:0.75rem; color:var(--text-muted);">/night</small>
                        </strong>
                    </div>

                    <div style="margin-top:12px;">
                        ${isAvailable ? `
                            <button type="button" class="btn-primary" style="width:100%;" onclick="bookRoomFromBrowse('${escapeHTML(room.id)}')">
                                <i class="fa-solid fa-calendar-check"></i> Book Now
                            </button>
                        ` : `
                            <button type="button" class="btn-disabled" style="width:100%; opacity:0.6; cursor:not-allowed;" disabled>
                                <i class="fa-solid fa-ban"></i> Room Not Available
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================
// 5. ADMIN ROOMS RENDER
// ==========================================
function renderAdminRooms() {
    const container = document.getElementById('adminRoomsCardsGrid');
    if (!container) return;

    container.innerHTML = roomList.map(function (room) {
        let statusClass = 'badge-danger';
        if (room.status === 'available') statusClass = 'badge-success';
        else if (room.status === 'dirty' || room.status === 'maintenance') statusClass = 'badge-gold';

        return `
            <div class="room-card">
                <div class="room-card-img-wrapper">
                    <img src="${escapeHTML(room.img)}" alt="Room ${escapeHTML(room.id)}">
                </div>
                <div style="padding:15px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                        <h4 style="color:var(--gold);margin:0;">Room ${escapeHTML(room.id)}</h4>
                        <span class="badge ${statusClass}">${escapeHTML(room.status.toUpperCase())}</span>
                    </div>

                    <h5 style="margin:0 0 8px 0; font-size:1rem; color:var(--text-main);">${escapeHTML(room.title)}</h5>
                    <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:12px; min-height:36px;">${escapeHTML(room.desc)}</p>

                    <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:10px;">
                        <strong style="font-size:1.1rem; color:var(--gold);">
                            ৳${room.price.toLocaleString()} <small style="font-size:0.75rem; color:var(--text-muted);">/night</small>
                        </strong>
                        
                        <div class="admin-room-controls">
                            <button type="button" class="btn-secondary-sm" onclick="editRoomPrice('${escapeHTML(room.id)}')">
                                <i class="fa-solid fa-pen"></i> Price
                            </button>
                            <button type="button" class="btn-secondary-sm" onclick="toggleRoomStatus('${escapeHTML(room.id)}')">
                                <i class="fa-solid fa-rotate"></i> Status
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================
// 6. ORDER ADDON FROM MENU
// ==========================================
function orderAddonService(serviceName) {
    const checkbox = document.getElementById('addon-' + serviceName);
    if (checkbox) {
        checkbox.checked = true;
    }
    
    autoFillGuestInfo();
    switchTab('tabBooking');
    calculateTotal();
    alert('✅ "' + serviceName + '" has been added to your booking list!');
}

// ==========================================
// 7. ADMIN ACTIONS
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
    const room = roomList.find(r => r.id === roomId);
    if (!room) return;

    const statuses = ['available', 'occupied', 'dirty', 'maintenance'];
    const idx = statuses.indexOf(room.status);
    room.status = statuses[(idx + 1) % statuses.length];

    renderAll();
}

// ==========================================
// 8. AUTH & ROLE MANAGEMENT (UPDATED FOR LOCALSTORAGE)
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
        currentRole = 'admin';
        currentUser = {
            role: 'ADMINISTRATOR',
            name: 'MD. EMTIAZ HOSSAIN SAMI',
            email: email,
            phone: '+8801700000000',
            avatar: 'Md. EmTIAZ hOSSAIN sAMI LOGO.png'
        };

        // Save session to localStorage
        localStorage.setItem('currentRole', currentRole);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        document.getElementById('loginModal')?.classList.remove('active');

        switchUserRole('admin');
        alert('Welcome Back, Admin!');
    } else {
        alert('❌ Invalid Credentials! (Use: admin@grandpalace.com / admin123)');
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

    // Save session to localStorage
    localStorage.setItem('currentRole', currentRole);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    document.getElementById('loginModal')?.classList.remove('active');

    switchUserRole('guest');
    autoFillGuestInfo();
    alert('🎉 Welcome ' + name + '!');
}

function switchUserRole(role) {
    currentRole = role;

    // Save active role to localStorage when manually switched
    localStorage.setItem('currentRole', currentRole);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    const selector = document.getElementById('roleSelector');
    if (selector) selector.value = role;

    document.body.className = 'role-' + role;

    const nameEl = document.getElementById('sidebarUserName');
    const roleEl = document.getElementById('sidebarUserRole');
    const avatarEl = document.getElementById('sidebarUserAvatar');
    const topbarAvatar = document.getElementById('topbarAvatar');

    if (role === 'admin') {
        if (nameEl) nameEl.textContent = 'MD. EMTIAZ HOSSAIN SAMI';
        if (roleEl) roleEl.textContent = 'Role: ADMINISTRATOR';
        if (avatarEl) avatarEl.src = 'Md. EmTIAZ hOSSAIN sAMI LOGO.png';
        if (topbarAvatar) topbarAvatar.src = 'Md. EmTIAZ hOSSAIN sAMI LOGO.png';
        switchTab('tabAdminRooms');
    } else {
        if (nameEl) nameEl.textContent = currentUser.name || 'Valued Guest';
        if (roleEl) roleEl.textContent = 'Role: GUEST';
        if (avatarEl) avatarEl.src = currentUser.avatar;
        if (topbarAvatar) topbarAvatar.src = currentUser.avatar;
        switchTab('tabRooms');
    }
}

function logoutUser() {
    // Clear saved session on logout
    localStorage.removeItem('currentRole');
    localStorage.removeItem('currentUser');

    currentRole = 'guest';
    currentUser = {
        role: 'GUEST',
        name: 'Valued Guest',
        email: '',
        phone: '',
        avatar: 'https://ui-avatars.com/api/?name=Guest&background=c5a880&color=fff'
    };

    document.getElementById('loginModal')?.classList.add('active');
    switchAuthForm('guest');
}

// ==========================================
// 9. NAVIGATION & BOOKING CALCULATOR
// ==========================================
function switchTab(tabId) {
    document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const page = document.getElementById(tabId);
    if (page) page.classList.add('active');

    const nav = document.querySelector(`.nav-item[onclick*="${tabId}"]`);
    if (nav) nav.classList.add('active');

    toggleSidebar(false);
}

function toggleSidebar(forceState) {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    if (forceState !== undefined) {
        if (forceState) sidebar.classList.add('open');
        else sidebar.classList.remove('open');
    } else {
        sidebar.classList.toggle('open');
    }
}

function populateRoomDropdown() {
    const select = document.getElementById('roomTypeSelect');
    if (!select) return;

    select.innerHTML = roomList.map(r => `
        <option value="${r.id}|${r.title}|${r.price}">
            Room ${r.id} - ${r.title} (৳${r.price.toLocaleString()}/night)
        </option>
    `).join('');
}

function calculateTotal() {
    const cIn = document.getElementById('checkIn')?.value;
    const cOut = document.getElementById('checkOut')?.value;
    const roomSelect = document.getElementById('roomTypeSelect')?.value;

    const nights = getNightsBetween(cIn, cOut);
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

    const select = document.getElementById('roomTypeSelect');
    if (select) select.value = `${room.id}|${room.title}|${room.price}`;

    autoFillGuestInfo();
    switchTab('tabBooking');
    calculateTotal();
}

function handleBookingSubmit(event) {
    if (event) event.preventDefault();

    const name = document.getElementById('bookingGuestName')?.value.trim();
    const email = document.getElementById('bookingGuestEmail')?.value.trim() || '';
    const phone = document.getElementById('bookingGuestPhone')?.value.trim() || '';
    const roomSelect = document.getElementById('roomTypeSelect')?.value;

    if (!name || !roomSelect) {
        alert('⚠️ Please fill out all required fields.');
        return;
    }

    const parts = roomSelect.split('|');
    const roomId = parts[0];
    const roomTitle = parts[1];
    const total = calculateTotal();

    const bookingId = 'GP-' + Math.floor(1000 + Math.random() * 9000);

    // 1. Add to Bookings List
    bookings.unshift({
        id: bookingId,
        guestName: name,
        guestEmail: email,
        guestPhone: phone,
        roomNumber: roomId,
        roomType: roomTitle,
        checkIn: document.getElementById('checkIn')?.value,
        checkOut: document.getElementById('checkOut')?.value,
        totalBill: total,
        status: 'Confirmed',
        avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=c5a880&color=fff'
    });

    // 2. Auto-sync with Guest Directory if new
    const existingGuest = guests.find(g => (email && g.email === email) || (phone && g.phone === phone));
    if (!existingGuest) {
        guests.unshift({
            id: 'G-' + Math.floor(100 + Math.random() * 900),
            name: name,
            email: email,
            phone: phone
        });
    }

    // 3. Update Room Status to Occupied
    const room = roomList.find(r => r.id === roomId);
    if (room) room.status = 'occupied';

    renderAll();
    alert('🎉 Booking Confirmed Successfully!\nInvoice ID: ' + bookingId);
    resetForm();

    if (currentRole === 'guest') switchTab('tabRooms');
    else switchTab('tabDashboard');
}

function resetForm() {
    document.getElementById('reservationForm')?.reset();
    setupDefaultDates();
    calculateTotal();
}

// ==========================================
// 10. TABLES RENDER
// ==========================================
function renderDashboard() {
    const totalEl = document.getElementById('statTotalBookings');
    const revEl = document.getElementById('statRevenue');
    const tbody = document.getElementById('dashboardTableBody');

    const rev = bookings.reduce((sum, b) => sum + b.totalBill, 0);

    if (totalEl) totalEl.textContent = bookings.length;
    if (revEl) revEl.textContent = '৳' + rev.toLocaleString();

    if (tbody) {
        tbody.innerHTML = bookings.map(b => `
            <tr>
                <td><img src="${escapeHTML(b.avatar)}" class="avatar-img" style="width:32px;height:32px;" alt=""></td>
                <td><strong>${escapeHTML(b.id)}</strong></td>
                <td>${escapeHTML(b.guestName)}</td>
                <td>Room ${escapeHTML(b.roomNumber)}</td>
                <td><small>${escapeHTML(b.checkIn)} to ${escapeHTML(b.checkOut)}</small></td>
                <td><strong>৳${b.totalBill.toLocaleString()}</strong></td>
                <td><span class="badge badge-success">${escapeHTML(b.status)}</span></td>
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
                <div style="padding:15px; border-radius:10px; background:var(--bg-card); border-left:4px solid ${r.status === 'available' ? '#48bb78' : '#f56565'}; border-top:1px solid var(--border-color); border-right:1px solid var(--border-color); border-bottom:1px solid var(--border-color);">
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
                <td><span class="badge badge-gold">ONLINE</span></td>
                <td><strong style="color:#48bb78;">৳${b.totalBill.toLocaleString()}</strong></td>
                <td>${escapeHTML(b.checkIn)}</td>
            </tr>
        `).join('');
    }
}

function renderGuests() {
    const tbody = document.getElementById('guestsTableBody');
    if (tbody) {
        tbody.innerHTML = guests.map(g => `
            <tr>
                <td><img src="https://ui-avatars.com/api/?name=${encodeURIComponent(g.name)}&background=c5a880&color=fff" class="avatar-img" style="width:32px;height:32px;" alt=""></td>
                <td><strong>${escapeHTML(g.name)}</strong></td>
                <td>${escapeHTML(g.email || 'N/A')}</td>
                <td>${escapeHTML(g.phone || 'N/A')}</td>
            </tr>
        `).join('');
    }
}
