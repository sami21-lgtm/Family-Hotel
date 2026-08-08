// ==========================================
// 1. GLOBAL STATE, TRANSLATIONS & SECURITY
// ==========================================
let appMode = 'guest'; // 'guest' or 'staff'
let currentLang = 'en'; // 'en' or 'bn'
let isStaffAuthenticated = false; // Security State for Staff Portal
const STAFF_DEFAULT_PASS = "admin123"; // Staff Portal Password

let currentUser = {
    role: 'ADMINISTRATOR',
    name: 'MD. EMTIAZ HOSSAIN SAMI',
    email: 'admin@grandpalace.com'
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
        roomNumber: "401",
        roomType: "Royal Family Suite",
        checkIn: "2026-08-01",
        checkOut: "2026-08-05",
        totalBill: 80000,
        paymentMethod: "BKASH",
        status: "Checked-In"
    },
    {
        id: "GP-8802",
        guestName: "Sultana Rahman",
        roomNumber: "102",
        roomType: "Single Executive Room",
        checkIn: "2026-08-06",
        checkOut: "2026-08-08",
        totalBill: 2000,
        paymentMethod: "SSLCOMMERZ",
        status: "Confirmed"
    }
];

// Food, Gym, Pool & Amenities Items
let serviceItems = [
    { id: "s1", name: "Bengali Traditional Feast", price: 500, category: "Food & Dining", icon: "fa-utensils", image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500" },
    { id: "s2", name: "Authentic Thai Gourmet", price: 750, category: "Food & Dining", icon: "fa-bowl-rice", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500" },
    { id: "s3", name: "Continental 5-Star Buffet", price: 1200, category: "Food & Dining", icon: "fa-champagne-glasses", image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=500" },
    { id: "s4", name: "Luxury Spa & Massage", price: 2500, category: "Spa & Wellness", icon: "fa-spa", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500" },
    { id: "s5", name: "Infinity Pool Day Pass", price: 500, category: "Pool", icon: "fa-person-swimming", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=500" },
    { id: "s6", name: "VIP Fitness & Gym Pass", price: 400, category: "Gym", icon: "fa-dumbbell", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500" }
];

// Helper: Text Escaping (Prevents XSS Injection)
function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Helper: Set Default Dates to Input Fields
function setupDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    ['checkIn', 'guestCheckIn'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = today;
    });

    ['checkOut', 'guestCheckOut'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = tomorrow;
    });
}

// Helper: Calculate Night Count Accurately
function getNightsBetween(checkInStr, checkOutStr) {
    if (!checkInStr || !checkOutStr) return 1;
    const diffTime = new Date(checkOutStr) - new Date(checkInStr);
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
    return diffDays > 0 ? diffDays : 1;
}

// ==========================================
// 2. PORTAL SWITCHER & PASSWORD SECURITY
// ==========================================
function setAppMode(mode) {
    if (mode === 'staff' && !isStaffAuthenticated) {
        const inputPass = prompt("🔒 STAFF PORTAL LOGIN\nPlease enter Admin/Staff Password:");
        if (inputPass === STAFF_DEFAULT_PASS) {
            isStaffAuthenticated = true;
            alert("✅ Login Successful! Accessing Staff/Admin Portal.");
        } else {
            alert("❌ Access Denied! Incorrect Password.");
            return;
        }
    }

    appMode = mode;
    const guestPortalEl = document.getElementById('guestPortal');
    const staffPortalEl = document.getElementById('staffPortal');
    const navGuestBtn = document.getElementById('btnModeGuest');
    const navStaffBtn = document.getElementById('btnModeStaff');

    if (mode === 'guest') {
        if (guestPortalEl) guestPortalEl.style.display = 'block';
        if (staffPortalEl) staffPortalEl.style.display = 'none';
        if (navGuestBtn) navGuestBtn.classList.add('active');
        if (navStaffBtn) navStaffBtn.classList.remove('active');
    } else {
        if (guestPortalEl) guestPortalEl.style.display = 'none';
        if (staffPortalEl) staffPortalEl.style.display = 'block';
        if (navStaffBtn) navStaffBtn.classList.add('active');
        if (navGuestBtn) navGuestBtn.classList.remove('active');
    }

    renderRooms();
    renderServices();
}

function staffLogout() {
    isStaffAuthenticated = false;
    alert("🔒 Staff Logged Out Successfully.");
    setAppMode('guest');
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'bn' : 'en';
    alert(`🌐 Language switched to: ${currentLang.toUpperCase()}`);
}

// ==========================================
// 3. INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    populateRoomDropdown();
    populateGuestRoomDropdown();
    renderGuestServicesOptions();
    renderStaffServicesOptions();
    renderRooms();
    renderServices();
    renderFrontDesk();
    renderHousekeeping();
    renderFinance();
    refreshDashboard();

    setupDefaultDates();
    calculateBilling();
    calculateGuestBilling();

    // Event Listeners
    const staffForm = document.getElementById('reservationForm');
    if (staffForm) {
        staffForm.addEventListener('change', calculateBilling);
        staffForm.addEventListener('input', calculateBilling);
        staffForm.addEventListener('submit', handleBookingSubmit);
    }

    const guestForm = document.getElementById('guestBookingForm');
    if (guestForm) {
        guestForm.addEventListener('change', calculateGuestBilling);
        guestForm.addEventListener('input', calculateGuestBilling);
        guestForm.addEventListener('submit', handleGuestBookingSubmit);
    }
});

// ==========================================
// 4. GUEST & SERVICES RENDERING
// ==========================================
function renderRooms() {
    const container = document.getElementById('roomsContainer');
    if (!container) return;

    if (appMode === 'guest') {
        container.innerHTML = roomList.map(r => `
            <div class="guest-room-card" style="border:1px solid #e0e0e0; border-radius:12px; overflow:hidden; background:#fff; margin-bottom:20px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
                <img src="${r.img}" alt="${escapeHTML(r.title)}" style="width:100%; height:220px; object-fit:cover;">
                <div style="padding:18px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                        <h3 style="margin:0; font-size:1.2rem; color:#1a1a1a;">${escapeHTML(r.title)}</h3>
                        <span style="background:#fff8e7; color:#d4af37; padding:4px 10px; border-radius:20px; font-weight:bold; font-size:0.85rem;">Room ${r.id}</span>
                    </div>
                    <p style="color:#666; font-size:0.9rem; margin-bottom:12px;">${escapeHTML(r.desc)}</p>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:1.25rem; font-weight:bold; color:#2c3e50;">৳${r.price.toLocaleString()} <small style="font-size:0.8rem; color:#888;">/ night</small></span>
                        ${r.status === 'available' 
                            ? `<button onclick="quickGuestBook('${r.id}')" style="padding:8px 16px; background:#27ae60; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Direct Booking</button>`
                            : `<span style="color:#e74c3c; font-weight:bold; font-size:0.85rem;">Booked / Occupied</span>`
                        }
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        container.innerHTML = `
            <div style="margin-bottom:15px; display:flex; justify-content:space-between; align-items:center; background:#2c3e50; color:#fff; padding:12px 18px; border-radius:8px;">
                <h4 style="margin:0;"><i class="fa-solid fa-boxes-stacked"></i> Admin Room & Price Inventory</h4>
                <button onclick="promptAddNewRoom()" style="background:#27ae60; color:#fff; border:none; padding:8px 15px; border-radius:6px; cursor:pointer;">+ Add New Room</button>
            </div>
            ${roomList.map(r => `
                <div style="border:1px solid #ddd; border-radius:8px; padding:15px; margin-bottom:12px; background:#fff; display:flex; gap:15px; align-items:center;">
                    <img src="${r.img}" style="width:90px; height:70px; object-fit:cover; border-radius:6px;">
                    <div style="flex-grow:1;">
                        <strong style="font-size:1.05rem;">Room ${r.id}: ${escapeHTML(r.title)}</strong>
                        <p style="margin:2px 0; color:#666; font-size:0.85rem;">৳${r.price.toLocaleString()} / night | Status: <b style="text-transform:uppercase; color:${r.status==='available'?'#27ae60':'#e74c3c'}">${r.status}</b></p>
                    </div>
                    <div style="display:flex; gap:8px;">
                        <button onclick="editRoomPrice('${r.id}')" style="background:#3498db; color:#fff; border:none; padding:6px 12px; border-radius:4px; cursor:pointer;">Edit Price</button>
                        <button onclick="toggleRoomStatus('${r.id}')" style="background:#f39c12; color:#fff; border:none; padding:6px 12px; border-radius:4px; cursor:pointer;">Toggle Status</button>
                    </div>
                </div>
            `).join('')}
        `;
    }
}

function renderServices() {
    const container = document.getElementById('servicesContainer');
    if (!container) return;

    container.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap:15px;">
            ${serviceItems.map(s => `
                <div style="border:1px solid #eee; border-radius:8px; padding:12px; background:#fff; text-align:center; box-shadow:0 2px 6px rgba(0,0,0,0.04);">
                    <img src="${s.image}" style="width:100%; height:130px; object-fit:cover; border-radius:6px; margin-bottom:8px;">
                    <h4 style="margin:5px 0;">${escapeHTML(s.name)}</h4>
                    <p style="color:#27ae60; font-weight:bold; margin:4px 0;">৳${s.price.toLocaleString()}</p>
                    <small style="color:#888;">[${s.category}]</small>
                </div>
            `).join('')}
        </div>
    `;
}

function renderGuestServicesOptions() {
    const container = document.getElementById('guestServicesContainer');
    if (!container) return;

    container.innerHTML = serviceItems.map(s => `
        <label style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; border:1px solid #eee; border-radius:6px; margin-bottom:6px; cursor:pointer; background:#fafafa;">
            <div>
                <input type="checkbox" class="guest-addon-checkbox" value="${s.price}" data-name="${escapeHTML(s.name)}" onchange="calculateGuestBilling()">
                <span style="font-weight:600; margin-left:8px;">${escapeHTML(s.name)}</span>
            </div>
            <span style="color:#d4af37; font-weight:bold;">৳${s.price.toLocaleString()}</span>
        </label>
    `).join('');
}

function renderStaffServicesOptions() {
    const container = document.getElementById('staffServicesContainer');
    if (!container) return;

    container.innerHTML = serviceItems.map(s => `
        <label style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; border:1px solid #eee; border-radius:6px; margin-bottom:6px; cursor:pointer; background:#fafafa;">
            <div>
                <input type="checkbox" class="staff-addon-checkbox" value="${s.price}" data-name="${escapeHTML(s.name)}" onchange="calculateBilling()">
                <span style="font-weight:600; margin-left:8px;">${escapeHTML(s.name)}</span>
            </div>
            <span style="color:#27ae60; font-weight:bold;">৳${s.price.toLocaleString()}</span>
        </label>
    `).join('');
}

// Live Fee Breakdown Calculator (Guest Portal)
function calculateGuestBilling() {
    const checkIn = document.getElementById('guestCheckIn')?.value;
    const checkOut = document.getElementById('guestCheckOut')?.value;
    const roomSelect = document.getElementById('guestRoomSelect')?.value;

    const nights = getNightsBetween(checkIn, checkOut);
    let roomPrice = roomSelect ? parseFloat(roomSelect.split('|')[2]) || 0 : 0;
    let roomTotal = roomPrice * nights;
    let addonsTotal = 0;

    document.querySelectorAll('.guest-addon-checkbox:checked').forEach(cb => {
        addonsTotal += parseFloat(cb.value) || 0;
    });

    const grandTotal = roomTotal + addonsTotal;

    if (document.getElementById('guestCalcNights')) document.getElementById('guestCalcNights').textContent = nights;
    if (document.getElementById('guestCalcRoomCharge')) document.getElementById('guestCalcRoomCharge').textContent = `৳${roomTotal.toLocaleString()}`;
    if (document.getElementById('guestCalcAddons')) document.getElementById('guestCalcAddons').textContent = `৳${addonsTotal.toLocaleString()}`;
    if (document.getElementById('guestCalcGrandTotal')) document.getElementById('guestCalcGrandTotal').textContent = `৳${grandTotal.toLocaleString()}`;

    return grandTotal;
}

// Direct Guest Booking Confirmation
function handleGuestBookingSubmit(e) {
    e.preventDefault();
    const guestName = document.getElementById('guestNameInput')?.value || "Guest User";
    const roomSelect = document.getElementById('guestRoomSelect')?.value;
    const checkIn = document.getElementById('guestCheckIn')?.value;
    const checkOut = document.getElementById('guestCheckOut')?.value;

    if (!roomSelect) {
        alert("⚠️ Please select a room before booking!");
        return;
    }

    const [roomId, roomTitle] = roomSelect.split('|');
    const totalBillCalculated = calculateGuestBilling();

    const newBooking = {
        id: `GP-${Math.floor(1000 + Math.random() * 9000)}`,
        guestName: guestName,
        roomNumber: roomId,
        roomType: roomTitle,
        checkIn: checkIn,
        checkOut: checkOut,
        totalBill: totalBillCalculated,
        paymentMethod: "ONLINE_CONFIRMED",
        status: "Confirmed"
    };

    bookings.unshift(newBooking);

    // Mark Room Occupied
    const room = roomList.find(r => r.id === roomId);
    if (room) room.status = "occupied";

    // Refresh UI & Controls
    populateRoomDropdown();
    populateGuestRoomDropdown();
    renderRooms();
    renderFrontDesk();
    renderFinance();
    refreshDashboard();

    alert(`🎉 Direct Booking Confirmed!\nBooking ID: ${newBooking.id}\nGuest: ${guestName}\nTotal Bill: ৳${newBooking.totalBill.toLocaleString()}`);

    // Reset Form & Dates
    document.getElementById('guestBookingForm')?.reset();
    setupDefaultDates();
    calculateGuestBilling();
}

// ==========================================
// 5. STAFF PORTAL: DASHBOARD, FRONT DESK & REPORTS
// ==========================================
function renderFrontDesk() {
    const container = document.getElementById('frontDeskContainer');
    if (!container) return;

    container.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap:12px;">
            ${roomList.map(r => `
                <div style="padding:12px; border-radius:8px; background:#fff; border-left:5px solid ${r.status==='available'?'#27ae60':r.status==='occupied'?'#e74c3c':'#f39c12'}; box-shadow:0 2px 6px rgba(0,0,0,0.05);">
                    <h4 style="margin:0;">Room ${r.id}</h4>
                    <small style="color:#666;">${escapeHTML(r.title)}</small><br>
                    <strong style="font-size:0.8rem; text-transform:uppercase; color:${r.status==='available'?'#27ae60':'#e74c3c'}">${r.status}</strong>
                </div>
            `).join('')}
        </div>
    `;
}

function renderHousekeeping() {
    const container = document.getElementById('housekeepingContainer');
    if (!container) return;

    const dirtyRooms = roomList.filter(r => r.status === 'dirty');
    if (dirtyRooms.length === 0) {
        container.innerHTML = `<p style="color:#27ae60; font-weight:bold;">✨ All rooms are clean & ready!</p>`;
        return;
    }

    container.innerHTML = dirtyRooms.map(r => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px; background:#fff; border:1px solid #ddd; border-radius:6px; margin-bottom:8px;">
            <span><b>Room ${r.id}</b> - Needs Cleaning</span>
            <button onclick="toggleRoomStatus('${r.id}')" style="background:#27ae60; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Mark Cleaned</button>
        </div>
    `).join('');
}

function renderFinance() {
    const container = document.getElementById('financeContainer');
    if (!container) return;

    const totalRev = bookings.reduce((sum, b) => sum + b.totalBill, 0);

    container.innerHTML = `
        <div style="background:#fff; padding:18px; border-radius:8px; border:1px solid #e0e0e0;">
            <h3 style="margin:0 0 10px 0;">Financial Revenue Overview</h3>
            <h1 style="color:#27ae60; margin:0;">৳${totalRev.toLocaleString()} BDT</h1>
            <p style="color:#666; font-size:0.9rem;">Total Confirmed Bookings: <b>${bookings.length}</b></p>
        </div>
    `;
}

function refreshDashboard() {
    const totalBookingsEl = document.getElementById('statTotalBookings');
    const totalRevenueEl = document.getElementById('statTotalRevenue');

    if (totalBookingsEl) totalBookingsEl.textContent = bookings.length;
    if (totalRevenueEl) {
        const totalRev = bookings.reduce((sum, b) => sum + b.totalBill, 0);
        totalRevenueEl.textContent = `৳${totalRev.toLocaleString()}`;
    }
}

// Helpers
function populateRoomDropdown() {
    const select = document.getElementById('roomTypeSelect');
    if (select) {
        select.innerHTML = roomList.map(r => `<option value="${r.id}|${escapeHTML(r.title)}|${r.price}">Room ${r.id} - ${escapeHTML(r.title)} (৳${r.price})</option>`).join('');
    }
}

function populateGuestRoomDropdown() {
    const select = document.getElementById('guestRoomSelect');
    if (select) {
        const avail = roomList.filter(r => r.status === 'available');
        if (avail.length === 0) {
            select.innerHTML = `<option value="">No Available Rooms</option>`;
            return;
        }
        select.innerHTML = avail.map(r => `<option value="${r.id}|${escapeHTML(r.title)}|${r.price}">Room ${r.id} - ${escapeHTML(r.title)} (৳${r.price}/night)</option>`).join('');
    }
}

function quickGuestBook(roomId) {
    setAppMode('guest');
    const select = document.getElementById('guestRoomSelect');
    if (select) {
        for (let opt of select.options) {
            if (opt.value.startsWith(roomId + '|')) {
                select.value = opt.value;
                break;
            }
        }
        calculateGuestBilling();
    }
    const formEl = document.getElementById('guestBookingForm');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
}

function toggleRoomStatus(roomId) {
    const room = roomList.find(r => r.id === roomId);
    if (!room) return;
    const statuses = ['available', 'occupied', 'dirty', 'maintenance'];
    room.status = statuses[(statuses.indexOf(room.status) + 1) % statuses.length];

    populateRoomDropdown();
    populateGuestRoomDropdown();
    renderRooms();
    renderFrontDesk();
    renderHousekeeping();
    renderFinance();
    refreshDashboard();
}

// ==========================================
// 6. ADMIN INVENTORY MANAGEMENT
// ==========================================
function promptAddNewRoom() {
    const id = prompt("Enter Room Number / ID (e.g. 701):");
    if (!id) return;

    const title = prompt("Enter Room Title:");
    if (!title) return;

    const priceInput = prompt("Enter Price per Night (BDT):");
    const price = parseFloat(priceInput);

    const desc = prompt("Enter Room Description:") || "Standard luxury room.";

    if (id && title && !isNaN(price) && price >= 0) {
        roomList.push({
            id: id.trim(),
            title: title.trim(),
            price: price,
            status: "available",
            img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500",
            desc: desc
        });

        populateRoomDropdown();
        populateGuestRoomDropdown();
        renderRooms();
        renderFrontDesk();
        alert(`✅ Room ${id} added successfully!`);
    } else {
        alert("❌ Invalid input! Please provide valid room details.");
    }
}

function editRoomPrice(roomId) {
    const room = roomList.find(r => r.id === roomId);
    if (!room) return;

    const newPriceInput = prompt(`Enter new price for Room ${room.id} (${room.title}):`, room.price);
    if (newPriceInput !== null) {
        const newPrice = parseFloat(newPriceInput);
        if (!isNaN(newPrice) && newPrice >= 0) {
            room.price = newPrice;
            populateRoomDropdown();
            populateGuestRoomDropdown();
            renderRooms();
            alert(`✅ Room ${room.id} price updated to ৳${newPrice.toLocaleString()}`);
        } else {
            alert("❌ Invalid price entered.");
        }
    }
}

// ==========================================
// 7. STAFF CALCULATOR & BOOKING HANDLERS
// ==========================================
function calculateBilling() {
    const checkIn = document.getElementById('checkIn')?.value;
    const checkOut = document.getElementById('checkOut')?.value;
    const roomSelect = document.getElementById('roomTypeSelect')?.value;

    const nights = getNightsBetween(checkIn, checkOut);
    let roomPrice = roomSelect ? parseFloat(roomSelect.split('|')[2]) || 0 : 0;
    let roomTotal = roomPrice * nights;
    let addonsTotal = 0;

    document.querySelectorAll('.staff-addon-checkbox:checked').forEach(cb => {
        addonsTotal += parseFloat(cb.value) || 0;
    });

    const grandTotal = roomTotal + addonsTotal;

    if (document.getElementById('calcNights')) document.getElementById('calcNights').textContent = nights;
    if (document.getElementById('calcRoomCharge')) document.getElementById('calcRoomCharge').textContent = `৳${roomTotal.toLocaleString()}`;
    if (document.getElementById('calcAddons')) document.getElementById('calcAddons').textContent = `৳${addonsTotal.toLocaleString()}`;
    if (document.getElementById('calcGrandTotal')) document.getElementById('calcGrandTotal').textContent = `৳${grandTotal.toLocaleString()}`;

    return grandTotal;
}

function handleBookingSubmit(e) {
    e.preventDefault();
    const guestName = document.getElementById('guestName')?.value || "Walk-in Guest";
    const roomSelect = document.getElementById('roomTypeSelect')?.value;
    const checkIn = document.getElementById('checkIn')?.value;
    const checkOut = document.getElementById('checkOut')?.value;
    const gateway = document.getElementById('paymentGateway')?.value || "CASH";

    if (!roomSelect) {
        alert("⚠️ Please select a room!");
        return;
    }

    const [roomId, roomTitle] = roomSelect.split('|');
    const totalBillCalculated = calculateBilling();

    const newBooking = {
        id: `GP-${Math.floor(1000 + Math.random() * 9000)}`,
        guestName: guestName,
        roomNumber: roomId,
        roomType: roomTitle,
        checkIn: checkIn,
        checkOut: checkOut,
        totalBill: totalBillCalculated,
        paymentMethod: gateway,
        status: "Confirmed"
    };

    bookings.unshift(newBooking);

    // Mark Room Occupied
    const room = roomList.find(r => r.id === roomId);
    if (room) room.status = "occupied";

    // Refresh UI & Controls
    populateRoomDropdown();
    populateGuestRoomDropdown();
    renderRooms();
    renderFrontDesk();
    renderFinance();
    refreshDashboard();

    alert(`✅ Staff Reservation Confirmed!\nBooking ID: ${newBooking.id}\nGuest Name: ${guestName}\nTotal Bill: ৳${newBooking.totalBill.toLocaleString()}`);

    // Reset Form & Restore Default Dates
    document.getElementById('reservationForm')?.reset();
    setupDefaultDates();
    calculateBilling();
}
// ==========================================
// ADMIN / STAFF PORTAL NAVIGATION & TAB SWITCHER
// ==========================================

// ১. এডমিন সাইডবার পেজ স্যুইচিং (Tab Switcher)
function switchTab(tabId) {
    // সব ট্যাব হাইড করা
    document.querySelectorAll('.tab-page').forEach(page => {
        page.classList.remove('active');
    });

    // সাইডবার বাটনের active ক্লাস রিমুভ করা
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
    });

    // টার্গেট পেজ শো করা
    const targetPage = document.getElementById(tabId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // সম্পর্কিত নেভিগেশন আইটেম Active করা
    const activeNav = document.querySelector(`.nav-item[onclick*="${tabId}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    // মোবাইলে ট্যাব চেঞ্জ হলে সাইডবার বন্ধ করা
    toggleSidebar(false);
}

// ২. কাস্টম এডমিন লগইন মডাল হ্যান্ডলার
function handleStaffLogin(event) {
    if (event) event.preventDefault();
    
    const passInput = document.getElementById('loginPasswordInput')?.value;

    if (passInput === STAFF_DEFAULT_PASS) {
        isStaffAuthenticated = true;
        
        // ড্যাশবোর্ড আনলক করা (Blur প্রভাব সরানো)
        document.body.classList.remove('logged-out');
        
        const loginModal = document.getElementById('loginModal');
        if (loginModal) loginModal.classList.remove('active');

        alert("✅ Welcome Admin! Portal Unlocked.");
        setAppMode('staff');
    } else {
        alert("❌ Incorrect Password! (Default: admin123)");
    }
}

// ৩. মোবাইল সাইডবার টগল
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

// ৪. পোর্টাল মোড চেঞ্জ (আপডেটেড)
function setAppMode(mode) {
    if (mode === 'staff' && !isStaffAuthenticated) {
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.classList.add('active');
        } else {
            const pass = prompt("🔒 STAFF PORTAL LOGIN\nEnter Password:");
            if (pass === STAFF_DEFAULT_PASS) {
                isStaffAuthenticated = true;
            } else {
                alert("❌ Incorrect Password!");
                return;
            }
        }
    }

    appMode = mode;
    const guestPortalEl = document.getElementById('guestPortal');
    const staffPortalEl = document.getElementById('staffPortal');

    if (mode === 'guest') {
        if (guestPortalEl) guestPortalEl.style.display = 'block';
        if (staffPortalEl) staffPortalEl.style.display = 'none';
    } else if (mode === 'staff' && isStaffAuthenticated) {
        if (guestPortalEl) guestPortalEl.style.display = 'none';
        if (staffPortalEl) staffPortalEl.style.display = 'block';
        
        // ডিফল্ট ফ্রন্টডেস্ক ট্যাবে নিয়ে যাওয়া
        switchTab('tabFrontDesk');
    }
}
