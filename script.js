// ==========================================
// 1. GLOBAL STATE & SECURITY
// ==========================================
let currentRole = 'admin'; // 'admin', 'frontdesk', 'housekeeping', 'finance', 'guest'
let isStaffAuthenticated = false;

let currentUser = {
    role: 'ADMINISTRATOR',
    name: 'MD. EMTIAZ HOSSAIN SAMI',
    email: 'admin@grandpalace.com',
    avatar: 'Md. EmTIAZ hOSSAIN sAMI LOGO.png'
};

// Rooms Inventory Database
let roomList = [
    { id: "101", title: "Single Standard Room", price: 800, status: "available", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500", desc: "Cozy room with free Wi-Fi and king bed." },
    { id: "102", title: "Single Executive Room", price: 1000, status: "occupied", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500", desc: "Executive workspace & smart TV." },
    { id: "201", title: "Deluxe Double Room", price: 5000, status: "dirty", img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500", desc: "Spacious luxury room designed for couples." },
    { id: "202", title: "Super Deluxe Double Room", price: 7500, status: "available", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500", desc: "Balcony access and complimentary breakfast." },
    { id: "301", title: "Executive Double Ocean View", price: 10000, status: "maintenance", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500", desc: "Panoramic view with luxury ocean deck." },
    { id: "401", title: "Royal Family Suite", price: 20000, status: "occupied", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500", desc: "Multi-bedroom suite for families." },
    { id: "501", title: "Presidential VIP Suite", price: 35000, status: "available", img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500", desc: "VIP suite with private lounge." },
    { id: "601", title: "Royal Palace Villa", price: 50000, status: "available", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500", desc: "Private villa with infinity pool." }
];

// Active Bookings Registry
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

// Registered Guest Directory
let guests = [
    { id: "G-101", name: "Arif Chowdhury", email: "arif@example.com", phone: "+8801711112233", avatar: "https://ui-avatars.com/api/?name=Arif+Chowdhury&background=c5a880&color=fff" },
    { id: "G-102", name: "Sultana Rahman", email: "sultana@example.com", phone: "+8801822223344", avatar: "https://ui-avatars.com/api/?name=Sultana+Rahman&background=c5a880&color=fff" }
];

// Helper: Escape HTML string
function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Helper: Calculate night count
function getNightsBetween(checkInStr, checkOutStr) {
    if (!checkInStr || !checkOutStr) return 1;
    const diffTime = new Date(checkOutStr) - new Date(checkInStr);
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
    return diffDays > 0 ? diffDays : 1;
}

// ==========================================
// 2. INITIALIZATION & CLOCK
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initClock();
    setupDefaultDates();
    populateRoomDropdown();

    // Initial Render
    renderAll();
    calculateTotal();

    // Attach Event Listeners
    const resForm = document.getElementById('reservationForm');
    if (resForm) {
        resForm.addEventListener('change', calculateTotal);
        resForm.addEventListener('input', calculateTotal);
    }

    // --- STAFF LOGIN: robust wiring (form submit + button click fallback) ---
    const staffForm = document.getElementById('staffLoginForm');
    if (staffForm) {
        staffForm.addEventListener('submit', handleStaffLogin);
    }
    const staffLoginBtn = document.getElementById('staffLoginSubmitBtn');
    if (staffLoginBtn) {
        staffLoginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            handleStaffLogin(e);
        });
    }
    // Allow pressing Enter inside password field to submit even if focus issues occur
    const staffPassField = document.getElementById('loginPasswordInput');
    if (staffPassField) {
        staffPassField.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleStaffLogin(e);
            }
        });
    }
});

function initClock() {
    const clockEl = document.getElementById('currentDateDisplay');
    const update = () => {
        const now = new Date();
        if (clockEl) {
            clockEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${now.toLocaleDateString('en-GB')} | ${now.toLocaleTimeString()}`;
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
    if (cIn) cIn.value = today;
    if (cOut) cOut.value = tomorrow;
}

// Render All Components
function renderAll() {
    renderDashboard();
    renderRooms();
    renderFrontDesk();
    renderHousekeeping();
    renderFinance();
    renderGuests();
}

// ==========================================
// 3. AUTHENTICATION & ROLE MANAGEMENT
// ==========================================

// ১. Guest এবং Staff Login ফর্মের মধ্যে সুইচ করার ফাংশন
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

// ২. Admin (Staff) Login হ্যান্ডেল করার ফাংশন (FIXED: correctly checks email + password)
function handleStaffLogin(event) {
    if (event) event.preventDefault();

    const emailField = document.getElementById('loginEmail');
    const passField = document.getElementById('loginPasswordInput');

    const email = emailField ? emailField.value.trim() : '';
    const password = passField ? passField.value.trim() : '';

    const ADMIN_EMAIL = "admin@grandpalace.com";
    const ADMIN_PASS = "admin123";

    if (!email || !password) {
        alert("Please enter both Email and Password!");
        return;
    }

    // Case-insensitive email check, exact password check
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASS) {
        isStaffAuthenticated = true;
        document.body.classList.remove('logged-out');

        const loginModal = document.getElementById('loginModal');
        if (loginModal) loginModal.classList.remove('active');

        switchUserRole('admin');

        const nameEl = document.getElementById('sidebarUserName');
        const roleEl = document.getElementById('sidebarUserRole');
        if (nameEl) nameEl.innerText = "MD. EMTIAZ HOSSAIN SAMI";
        if (roleEl) roleEl.innerText = "Role: ADMINISTRATOR";

        alert("Welcome Back, Admin!");
    } else {
        alert("❌ Invalid credentials! Please use:\nEmail: admin@grandpalace.com\nPassword: admin123");
    }
}

// ৩. Guest Login হ্যান্ডেল করার ফাংশন
function handleGuestLoginSubmit(event) {
    if (event) event.preventDefault();

    const name = document.getElementById('guestAuthName')?.value.trim() || "Valued Guest";
    const email = document.getElementById('guestAuthEmail')?.value.trim() || "";
    const phone = document.getElementById('guestAuthPhone')?.value.trim() || "";
    const previewImg = document.getElementById('guestAuthPreviewImg')?.src;

    currentUser = {
        role: 'GUEST',
        name: name,
        email: email,
        avatar: previewImg || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=c5a880&color=fff`
    };

    document.body.classList.remove('logged-out');
    const loginModal = document.getElementById('loginModal');
    if (loginModal) loginModal.classList.remove('active');

    switchUserRole('guest');

    const nameEl = document.getElementById('sidebarUserName');
    const roleEl = document.getElementById('sidebarUserRole');
    if (nameEl) nameEl.innerText = name;
    if (roleEl) roleEl.innerText = "Role: GUEST";

    alert(`🎉 Welcome ${name} to Grand Palace Resort & Spa!`);
}

// ৪. রোল অনুযায়ী সাইডবার ও ড্যাশবোর্ড ফিল্টার করার ফাংশন
function switchUserRole(role) {
    currentRole = role;

    const selector = document.getElementById('roleSelector');
    if (selector) selector.value = role;

    // Body Class Management for CSS Hiding
    if (role === 'guest') {
        document.body.classList.add('role-guest');
    } else {
        document.body.classList.remove('role-guest');
    }

    // নেভিগেশন আইটেম ফিল্টারিং
    document.querySelectorAll('.nav-item').forEach(item => {
        if (role === 'admin') {
            item.style.display = 'flex';
        } else if (item.classList.contains(`role-${role}`)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });

    // রোল অনুযায়ী ট্যাব সুইচ
    if (role === 'guest') {
        switchTab('tabRooms');
    } else {
        switchTab('tabDashboard');
    }
}

// ৫. লগআউট করার ফাংশন
function logoutUser() {
    isStaffAuthenticated = false;
    document.body.classList.add('logged-out');
    const loginModal = document.getElementById('loginModal');
    if (loginModal) loginModal.classList.add('active');
}

// ==========================================
// 4. NAVIGATION & TAB SWITCHER
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

    if (isOpen) {
        sidebar.classList.add('open');
        if (overlay) overlay.classList.add('active');
    } else {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
    }
}

// ==========================================
// 5. CALCULATOR & BOOKING FORM HANDLERS
// ==========================================
function populateRoomDropdown() {
    const select = document.getElementById('roomTypeSelect');
    if (!select) return;

    select.innerHTML = roomList.map(r => `
        <option value="${r.id}|${escapeHTML(r.title)}|${r.price}">
            Room ${r.id} - ${escapeHTML(r.title)} (৳${r.price.toLocaleString()}/night)
        </option>
    `).join('');
}

function calculateTotal() {
    const checkIn = document.getElementById('checkIn')?.value;
    const checkOut = document.getElementById('checkOut')?.value;
    const roomSelect = document.getElementById('roomTypeSelect')?.value;

    const nights = getNightsBetween(checkIn, checkOut);
    let roomPrice = roomSelect ? parseFloat(roomSelect.split('|')[2]) || 0 : 0;
    let roomTotal = roomPrice * nights;
    let addonsTotal = 0;

    // Checkboxes
    document.querySelectorAll('input[name="foodMenu"]:checked, input[name="amenities"]:checked').forEach(cb => {
        addonsTotal += parseFloat(cb.getAttribute('data-price')) || 0;
    });

    const grandTotal = roomTotal + addonsTotal;

    if (document.getElementById('billNights')) document.getElementById('billNights').textContent = `${nights} Night(s)`;
    if (document.getElementById('billRoom')) document.getElementById('billRoom').textContent = `৳${roomTotal.toLocaleString()}`;
    if (document.getElementById('billAddons')) document.getElementById('billAddons').textContent = `৳${addonsTotal.toLocaleString()}`;
    if (document.getElementById('billTotal')) document.getElementById('billTotal').textContent = `৳${grandTotal.toLocaleString()}`;

    return grandTotal;
}

function togglePaymentDetails() {
    const method = document.getElementById('paymentMethodSelect')?.value;
    const detailsDiv = document.getElementById('onlinePaymentDetails');
    const instructions = document.getElementById('paymentInstructions');

    if (!detailsDiv || !instructions) return;

    if (method === 'cash') {
        detailsDiv.style.display = 'none';
    } else {
        detailsDiv.style.display = 'block';
        if (method === 'bkash') instructions.innerHTML = "<b>bKash Merchant Payment:</b> Send money to <code>01700000000</code> with your booking ID.";
        else if (method === 'nagad') instructions.innerHTML = "<b>Nagad Merchant Payment:</b> Send money to <code>01800000000</code>.";
        else instructions.innerHTML = "<b>Online Gateway:</b> You will be redirected to complete secure card payment.";
    }
}

function handleBookingSubmit(event) {
    if (event) event.preventDefault();

    const name = document.getElementById('bookingGuestName')?.value;
    const email = document.getElementById('bookingGuestEmail')?.value;
    const phone = document.getElementById('bookingGuestPhone')?.value;
    const checkIn = document.getElementById('checkIn')?.value;
    const checkOut = document.getElementById('checkOut')?.value;
    const roomSelect = document.getElementById('roomTypeSelect')?.value;
    const method = document.getElementById('paymentMethodSelect')?.value || "CASH";
    const previewImg = document.getElementById('previewImg')?.src;

    if (!roomSelect) {
        alert("⚠️ Please select a room!");
        return;
    }

    const [roomId, roomTitle] = roomSelect.split('|');
    const grandTotal = calculateTotal();

    const newBooking = {
        id: `GP-${Math.floor(1000 + Math.random() * 9000)}`,
        guestName: name,
        guestEmail: email,
        guestPhone: phone,
        roomNumber: roomId,
        roomType: roomTitle,
        checkIn: checkIn,
        checkOut: checkOut,
        totalBill: grandTotal,
        paymentMethod: method.toUpperCase(),
        status: "Confirmed",
        avatar: previewImg || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
    };

    bookings.unshift(newBooking);

    // Save to Guests Directory if new
    if (!guests.some(g => g.email === email)) {
        guests.push({
            id: `G-${Math.floor(100 + Math.random() * 900)}`,
            name: name,
            email: email,
            phone: phone,
            avatar: newBooking.avatar
        });
    }

    // Update Room Status
    const room = roomList.find(r => r.id === roomId);
    if (room) room.status = "occupied";

    renderAll();
    alert(`🎉 Booking Confirmed Successfully!\nInvoice ID: ${newBooking.id}\nGuest: ${name}\nTotal: ৳${grandTotal.toLocaleString()}`);

    resetForm();
    switchTab('tabDashboard');
}

function resetForm() {
    document.getElementById('reservationForm')?.reset();
    setupDefaultDates();
    calculateTotal();
}

// ==========================================
// 6. MODULE RENDERING FUNCTIONS
// ==========================================

// Dashboard
function renderDashboard() {
    const totalBookingsEl = document.getElementById('statTotalBookings');
    const totalRevEl = document.getElementById('statRevenue');
    const tbody = document.getElementById('dashboardTableBody');

    const totalRev = bookings.reduce((sum, b) => sum + b.totalBill, 0);

    if (totalBookingsEl) totalBookingsEl.textContent = bookings.length;
    if (totalRevEl) totalRevEl.textContent = `৳${totalRev.toLocaleString()}`;

    if (tbody) {
        tbody.innerHTML = bookings.map(b => `
            <tr>
                <td><img src="${b.avatar}" class="table-img vibrant-img" style="width:36px; height:36px; border-radius:50%; object-fit:cover;"></td>
                <td><strong>${b.id}</strong></td>
                <td>${escapeHTML(b.guestName)}</td>
                <td>Room ${b.roomNumber} - ${escapeHTML(b.roomType)}</td>
                <td><small>${b.checkIn} to ${b.checkOut}</small></td>
                <td><strong>৳${b.totalBill.toLocaleString()}</strong></td>
                <td><span class="badge ${b.status === 'Checked-In' ? 'badge-success' : 'badge-gold'}">${b.status}</span></td>
                <td>
                    <button class="btn-secondary-sm" onclick="alert('Printing Receipt for ${b.id}')"><i class="fa-solid fa-print"></i></button>
                </td>
            </tr>
        `).join('');
    }
}

// Rooms Cards Grid
function renderRooms() {
    const container = document.getElementById('roomsCardsGrid');
    if (!container) return;

    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;" class="mt-15">
            ${roomList.map(r => `
                <div class="room-card" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden;">
                    <div class="room-card-img-wrapper">
                        <img src="${r.img}" class="vibrant-img" style="width: 100%; height: 180px; object-fit: cover;">
                    </div>
                    <div style="padding: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <h4 style="color: var(--gold); margin: 0;">Room ${r.id}</h4>
                            <span class="badge ${r.status === 'available' ? 'badge-success' : 'badge-danger'}">${r.status.toUpperCase()}</span>
                        </div>
                        <h5 style="margin: 0 0 8px 0;">${escapeHTML(r.title)}</h5>
                        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 12px;">${escapeHTML(r.desc)}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 10px;">
                            <strong style="font-size: 1.1rem; color: var(--gold);">৳${r.price.toLocaleString()} <small style="font-size: 0.75rem;">/night</small></strong>
                            <div style="display: flex; gap: 5px;">
                                <button type="button" class="btn-secondary-sm role-admin-only admin-edit-btn" onclick="editRoomPrice('${r.id}')"><i class="fa-solid fa-pen"></i> Price</button>
                                <button type="button" class="btn-secondary-sm role-admin-only admin-status-select" onclick="toggleRoomStatus('${r.id}')"><i class="fa-solid fa-rotate"></i> Status</button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Front Desk Grid
function renderFrontDesk() {
    const container = document.getElementById('frontDeskRoomGrid');
    if (!container) return;

    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 15px;" class="mt-15">
            ${roomList.map(r => `
                <div style="padding: 15px; border-radius: 10px; background: var(--bg-card); border-left: 5px solid ${r.status === 'available' ? '#48bb78' : r.status === 'occupied' ? '#f56565' : '#ed8936'}; border: 1px solid var(--border-color);">
                    <h3 style="margin: 0; color: var(--gold);">Room ${r.id}</h3>
                    <p style="font-size: 0.8rem; color: var(--text-muted); margin: 4px 0;">${escapeHTML(r.title)}</p>
                    <span class="badge ${r.status === 'available' ? 'badge-success' : 'badge-danger'}">${r.status.toUpperCase()}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Housekeeping
function renderHousekeeping() {
    const cleanEl = document.getElementById('statCleanRooms');
    const dirtyEl = document.getElementById('statDirtyRooms');
    const maintEl = document.getElementById('statMaintRooms');
    const tbody = document.getElementById('housekeepingTableBody');

    const cleanCount = roomList.filter(r => r.status === 'available').length;
    const dirtyCount = roomList.filter(r => r.status === 'dirty').length;
    const maintCount = roomList.filter(r => r.status === 'maintenance').length;

    if (cleanEl) cleanEl.textContent = cleanCount;
    if (dirtyEl) dirtyEl.textContent = dirtyCount;
    if (maintEl) maintEl.textContent = maintCount;

    if (tbody) {
        tbody.innerHTML = roomList.map(r => `
            <tr>
                <td><strong>Room ${r.id}</strong></td>
                <td>${escapeHTML(r.title)}</td>
                <td><span class="badge ${r.status === 'available' ? 'badge-success' : 'badge-gold'}">${r.status.toUpperCase()}</span></td>
                <td>
                    <button class="btn-secondary-sm" onclick="toggleRoomStatus('${r.id}')"><i class="fa-solid fa-broom"></i> Change Status</button>
                </td>
            </tr>
        `).join('');
    }
}

// Finance Table
function renderFinance() {
    const totalRevEl = document.getElementById('finTotalEarnings');
    const pendingEl = document.getElementById('finPending');
    const tbody = document.getElementById('financeTableBody');

    const totalRev = bookings.reduce((sum, b) => sum + b.totalBill, 0);

    if (totalRevEl) totalRevEl.textContent = `৳${totalRev.toLocaleString()}`;
    if (pendingEl) pendingEl.textContent = `৳0`;

    if (tbody) {
        tbody.innerHTML = bookings.map(b => `
            <tr>
                <td><strong>${b.id}</strong></td>
                <td>${escapeHTML(b.guestName)}</td>
                <td><span class="badge badge-gold">${b.paymentMethod}</span></td>
                <td><strong style="color: #48bb78;">৳${b.totalBill.toLocaleString()}</strong></td>
                <td>${b.checkIn}</td>
                <td><button class="btn-secondary-sm" onclick="alert('Downloading Receipt PDF...')"><i class="fa-solid fa-download"></i> Receipt</button></td>
            </tr>
        `).join('');
    }
}

// Guest Directory Table
function renderGuests() {
    const tbody = document.getElementById('guestsTableBody');
    if (!tbody) return;

    tbody.innerHTML = guests.map(g => `
        <tr>
            <td><img src="${g.avatar}" class="table-img vibrant-img" style="width:36px; height:36px; border-radius:50%; object-fit:cover;"></td>
            <td><strong>${escapeHTML(g.name)}</strong></td>
            <td>${escapeHTML(g.email)}</td>
            <td>${escapeHTML(g.phone)}</td>
            <td><button class="btn-secondary-sm" onclick="alert('Viewing guest history for ${g.name}')"><i class="fa-solid fa-eye"></i> View</button></td>
        </tr>
    `).join('');
}

// ==========================================
// 7. ADMIN INVENTORY MANAGEMENT
// ==========================================
function promptAddNewRoom() {
    const id = prompt("Enter New Room ID (e.g. 701):");
    if (!id) return;

    const title = prompt("Enter Room Category Title:");
    if (!title) return;

    const price = parseFloat(prompt("Enter Room Price per night (BDT):"));
    if (isNaN(price)) return;

    roomList.push({
        id: id.trim(),
        title: title.trim(),
        price: price,
        status: "available",
        img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500",
        desc: "Newly added luxury accommodation."
    });

    populateRoomDropdown();
    renderAll();
    alert(`✅ Room ${id} added to resort inventory!`);
}

function editRoomPrice(roomId) {
    const room = roomList.find(r => r.id === roomId);
    if (!room) return;

    const newPrice = parseFloat(prompt(`Enter new price for Room ${room.id}:`, room.price));
    if (!isNaN(newPrice) && newPrice >= 0) {
        room.price = newPrice;
        populateRoomDropdown();
        renderAll();
        alert(`✅ Room ${room.id} price updated to ৳${newPrice.toLocaleString()}`);
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
// 8. IMAGE PREVIEW HELPERS
// ==========================================
function updateGuestImageFromUrl() {
    const url = document.getElementById('imgUrlInput')?.value;
    const img = document.getElementById('previewImg');
    if (url && img) img.src = url;
}

function previewUploadImage(event) {
    const file = event.target.files[0];
    const img = document.getElementById('previewImg');
    if (file && img) {
        const reader = new FileReader();
        reader.onload = (e) => img.src = e.target.result;
        reader.readAsDataURL(file);
    }
}

function updateGuestAuthImageFromUrl() {
    const url = document.getElementById('guestAuthPhotoUrl')?.value;
    const img = document.getElementById('guestAuthPreviewImg');
    if (url && img) img.src = url;
}

function previewGuestAuthImage(event) {
    const file = event.target.files[0];
    const img = document.getElementById('guestAuthPreviewImg');
    if (file && img) {
        const reader = new FileReader();
        reader.onload = (e) => img.src = e.target.result;
        reader.readAsDataURL(file);
    }
}
