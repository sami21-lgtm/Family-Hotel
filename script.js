// --- GLOBAL APPLICATION STATE & TRANSLATIONS ---
let currentLang = 'en'; // 'en' or 'bn'
let currentRole = 'admin'; // 'admin', 'frontdesk', 'housekeeping', 'finance', 'guest'

let currentUser = {
    role: 'ADMINISTRATOR',
    name: 'MD. EMTIAZ HOSSAIN SAMI',
    email: 'admin@grandpalace.com',
    photo: 'Md. EmTIAZ hOSSAIN sAMI LOGO.png'
};

// Rooms Database with Room Status Tracking (Available, Occupied, Dirty, Maintenance)
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

let bookings = [
    {
        id: "GP-8801",
        guestName: "Arif Chowdhury",
        guestPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
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
        guestPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
        roomNumber: "102",
        roomType: "Single Executive Room",
        checkIn: "2026-08-06",
        checkOut: "2026-08-08",
        totalBill: 2000,
        paymentMethod: "SSLCOMMERZ",
        status: "Confirmed"
    }
];

const serviceItems = [
    { name: "Bengali Traditional Feast", price: 500, category: "Dining", icon: "fa-utensils" },
    { name: "Authentic Thai Gourmet", price: 750, category: "Dining", icon: "fa-bowl-rice" },
    { name: "Continental 5-Star Buffet", price: 1200, category: "Dining", icon: "fa-champagne-glasses" },
    { name: "Infinity Swimming Pool Pass", price: 500, category: "Wellness", icon: "fa-person-swimming" },
    { name: "VIP Fitness & Gym Day Pass", price: 400, category: "Fitness", icon: "fa-dumbbell" }
];

// Bilingual Dictionary
const i18nData = {
    en: {
        brand: "GRAND PALACE",
        subbrand: "RESORT & SPA",
        activeRole: "Active System Role:",
        navDashboard: "Dashboard",
        navRooms: "Rooms & Inventory",
        navBooking: "New Booking",
        navFrontDesk: "Front Desk Status",
        navHousekeeping: "Housekeeping",
        navFinance: "Finance & Reports",
        navGuests: "Guest Directory",
        navServices: "Food & Facilities",
        supportTitle: "Direct Support",
        callUs: "Call Us 24/7",
        emailUs: "Email Support",
        dashTitle: "Executive Dashboard",
        dashSub: "Live status of resort reservations, guests, and services.",
        heroSub: "WELCOME TO GRAND PALACE",
        heroTitle: "World-Class Hospitality & Luxury Stay",
        heroDesc: "Manage real-time guest bookings, luxury suites, gourmet dining, and exclusive wellness amenities.",
        statTotalBookings: "Total Bookings",
        statRevenue: "Total Revenue",
        statPoolPass: "Pool Passes",
        statDiningOrders: "Dining Orders",
        recentCheckins: "Recent Check-Ins",
        tblPhoto: "Photo",
        tblId: "ID",
        tblName: "Guest Name",
        tblRoom: "Room Type",
        tblDates: "Dates",
        tblBill: "Bill",
        tblStatus: "Status",
        tblAction: "Action",
        roomsTitle: "Rooms & Custom Photos",
        roomsSub: "Manage resort inventory and custom room photography.",
        newBookingTitle: "New Guest Booking",
        newBookingSub: "Create room reservations, food orders, and activity slots.",
        roomCat: "Room Category",
        lblCheckIn: "Check-In *",
        lblCheckOut: "Check-Out *",
        lblRoomType: "Select Room *",
        cuisineOpt: "Cuisine & Services",
        amenitiesOpt: "Pool & Gym Access",
        payOptions: "Payment Gateways",
        lblGateway: "Select Gateway *",
        calcSummary: "Real-time Calculation",
        invNights: "Stay Duration:",
        invRoomCharge: "Room Charge:",
        invAddons: "Services Total:",
        invGrandTotal: "Grand Total Amount:",
        btnCompleteBooking: "Complete Reservation",
        btnReset: "Reset",
        fdTitle: "Front Desk & Real-time Room Status",
        fdSub: "Manage live Check-ins, Check-outs, and Room Conditions.",
        hkTitle: "Housekeeping Dashboard",
        hkSub: "Cleanliness status updates and maintenance requests.",
        hkClean: "Available & Clean",
        hkDirty: "Needs Cleaning (Dirty)",
        hkMaintenance: "Under Maintenance",
        finTitle: "Finance & Financial Summary",
        finSub: "Automatic revenue breakdown and printable invoice generation.",
        guestsTitle: "Guest Directory",
        guestsSub: "All recorded guest check-ins and active stays.",
        servicesTitle: "Food, Pool & Gym",
        servicesSub: "Manage dining packages and facility access."
    },
    bn: {
        brand: "গ্র্যান্ড প্যালেস",
        subbrand: "রিসোর্ট ও স্পা",
        activeRole: "সক্রিয় সিস্টেম রোল:",
        navDashboard: "ড্যাশবোর্ড",
        navRooms: "রুম ও ইনভেন্টরি",
        navBooking: "নতুন বুকিং",
        navFrontDesk: "ফ্রন্ট ডেস্ক স্ট্যাটাস",
        navHousekeeping: "হাউসকেপিং",
        navFinance: "ফাইন্যান্স ও রিপোর্ট",
        navGuests: "গেস্ট তালিকা",
        navServices: "খাবার ও সার্ভিস",
        supportTitle: "সরাসরি সহায়তা",
        callUs: "কল করুন ২৪/৭",
        emailUs: "ইমেইল সাপোর্ট",
        dashTitle: "এক্সিকিউটিভ ড্যাশবোর্ড",
        dashSub: "রিসোর্ট বুকিং, গেস্ট এবং সার্ভিসসমূহের লাইভ অবস্থা।",
        heroSub: "গ্র্যান্ড প্যালেসে স্বাগতম",
        heroTitle: "আন্তর্জাতিক মানের আতিথেয়তা ও লাক্সারি স্টে",
        heroDesc: "রিয়েল-টাইম গেস্ট বুকিং, লাক্সারি স্যুট, রেস্টুরেন্ট এবং ওয়েলনেস সুবিধা পরিচালনা করুন।",
        statTotalBookings: "মোট বুকিং",
        statRevenue: "মোট আয়",
        statPoolPass: "পুল পাস",
        statDiningOrders: "ডাইনিং অর্ডার",
        recentCheckins: "সাম্প্রতিক চেক-ইন সমূহ",
        tblPhoto: "ছবি",
        tblId: "আইডি",
        tblName: "গেস্টের নাম",
        tblRoom: "রুমের ধরন",
        tblDates: "তারিখ",
        tblBill: "বিল",
        tblStatus: "অবস্থা",
        tblAction: "অ্যাকশন",
        roomsTitle: "রুম ও কাস্টম ছবি",
        roomsSub: "রিসোর্ট রুম গ্যালারি এবং ফটো ইনভেন্টরি।",
        newBookingTitle: "নতুন গেস্ট বুকিং",
        newBookingSub: "রুম রিজার্ভেশন, খাবার ও ফ্যাসিলিটি বুক করুন।",
        roomCat: "রুম ক্যাটাগরি",
        lblCheckIn: "চেক-ইন *",
        lblCheckOut: "চেক-আউট *",
        lblRoomType: "রুম সিলেক্ট করুন *",
        cuisineOpt: "খাবার ও রেস্টুরেন্ট সুবিধা",
        amenitiesOpt: "পুল ও জিম অ্যাক্সেস",
        payOptions: "পেমেন্ট গেটওয়েসমূহ",
        lblGateway: "পেমেন্ট পদ্ধতি বেছে নিন *",
        calcSummary: "রিয়েল-টাইম বিল গণনা",
        invNights: "অবস্থানের সময়কাল:",
        invRoomCharge: "রুম ভাড়া:",
        invAddons: "সার্ভিস চার্জ:",
        invGrandTotal: "সর্বমোট প্রদেয় বিল:",
        btnCompleteBooking: "বুকিং নিশ্চিত করুন",
        btnReset: "রিসেট",
        fdTitle: "ফ্রন্ট ডেস্ক ও রুম ট্র্যাকিং",
        fdSub: "লাইভ চেক-ইন, চেক-আউট ও রুমের বর্তমান অবস্থা ট্র্যাক করুন।",
        hkTitle: "হাউসকেপিং ড্যাশবোর্ড",
        hkSub: "রুম পরিচ্ছন্নতার আপডেট এবং মেইনটেন্যান্স রিকোয়েস্ট।",
        hkClean: "পরিষ্কার ও খালি রুম",
        hkDirty: "পরিষ্কার করা প্রয়োজন (Dirty)",
        hkMaintenance: "রক্ষণাবেক্ষণে আছে (Maintenance)",
        finTitle: "ফাইন্যান্স ও রিপোর্টস",
        finSub: "স্বয়ংক্রিয় রেভিনিউ রিপোর্ট ও ইনভয়েস প্রিন্ট সুবিধা।",
        guestsTitle: "গেস্ট ডিরেক্টরি",
        guestsSub: "সকল রেজিস্টার্ড গেস্ট ও বুকিং রেকর্ড।",
        servicesTitle: "খাবার, পুল ও জিম",
        servicesSub: "ফুড প্যাকেজ ও ফ্যাসিলিটি অ্যাক্সেস সার্ভিস।"
    }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initLiveClock();
    setInterval(initLiveClock, 1000); // Live clock interval update
    
    populateRoomDropdown();
    renderRooms();
    renderServices();
    renderFrontDesk();
    renderHousekeeping();
    renderFinance();
    refreshDashboard();
    calculateBilling();
    
    // Attach Dynamic Billing Change Listeners
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('change', calculateBilling);
        reservationForm.addEventListener('submit', handleBookingSubmit);
    }
});

// Populate Room Options Dynamically for Booking with Status Indicators
function populateRoomDropdown() {
    const select = document.getElementById('roomTypeSelect');
    if (!select) return;

    select.innerHTML = roomList.map(r => {
        const isAvailable = r.status === 'available';
        const statusText = isAvailable ? '' : ` [${r.status.toUpperCase()}]`;
        return `<option value="${r.id}|${r.title}|${r.price}" ${!isAvailable ? 'disabled' : ''}>
            Room ${r.id} - ${r.title} (৳${r.price.toLocaleString()}/night)${statusText}
        </option>`;
    }).join('');
}

// --- BILINGUAL TOGGLE SYSTEM ---
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'bn' : 'en';
    
    const langBtn = document.getElementById('mobileLangToggle');
    if (langBtn) langBtn.textContent = currentLang === 'en' ? '🇧🇩 BN' : '🇬🇧 EN';
    
    const langTxt = document.getElementById('langText');
    if (langTxt) langTxt.textContent = currentLang === 'en' ? 'English / বাংলা' : 'বাংলা / English';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18nData[currentLang] && i18nData[currentLang][key]) {
            el.textContent = i18nData[currentLang][key];
        }
    });

    initLiveClock();
}

// --- ROLE BASED ACCESS CONTROL (RBAC) ---
function switchUserRole(role) {
    currentRole = role;
    const navItems = document.querySelectorAll('.nav-menu .nav-item');
    
    navItems.forEach(item => {
        if (role === 'admin') {
            item.style.display = 'flex';
        } else {
            if (item.classList.contains(`role-${role}`)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        }
    });

    currentUser.role = role.toUpperCase();
    const roleTxt = document.getElementById('sidebarUserRole');
    if (roleTxt) roleTxt.textContent = `Role: ${currentUser.role}`;
    
    // Switch to appropriate tab
    if (role === 'housekeeping') switchTab('housekeeping');
    else if (role === 'finance') switchTab('finance');
    else switchTab('dashboard');
}

// --- CLOCK & NAVIGATION ---
function initLiveClock() {
    const dateEl = document.getElementById('currentDateDisplay');
    if (!dateEl) return;

    const now = new Date();
    dateEl.textContent = now.toLocaleString(currentLang === 'bn' ? 'bn-BD' : 'en-US', { 
        dateStyle: 'medium', 
        timeStyle: 'medium' 
    });
}

function toggleSidebar(forceState) {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (!sidebar) return;

    const isOpen = forceState !== undefined ? forceState : !sidebar.classList.contains('open');
    
    sidebar.classList.toggle('open', isOpen);
    if (overlay) overlay.classList.toggle('active', isOpen);
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-item, .m-nav-item').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) targetTab.classList.add('active');
    toggleSidebar(false);
}

// --- BILLING CALCULATOR & PAYMENTS ---
function calculateBilling() {
    const roomSelect = document.getElementById('roomTypeSelect');
    if (!roomSelect || !roomSelect.value) return;

    const roomVal = roomSelect.value.split('|');
    const roomPrice = parseInt(roomVal[2]) || 800;

    const checkInInput = document.getElementById('checkIn') ? document.getElementById('checkIn').value : '';
    const checkOutInput = document.getElementById('checkOut') ? document.getElementById('checkOut').value : '';

    const checkIn = new Date(checkInInput);
    const checkOut = new Date(checkOutInput);
    
    let nights = 1;
    if (!isNaN(checkIn.getTime()) && !isNaN(checkOut.getTime()) && checkOut > checkIn) {
        nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    }

    let addonsTotal = 0;
    document.querySelectorAll('input[name="foodMenu"]:checked, input[name="amenities"]:checked').forEach(item => {
        addonsTotal += parseInt(item.getAttribute('data-price')) || 0;
    });

    const roomCharge = roomPrice * nights;
    const grandTotal = roomCharge + (addonsTotal * nights);

    const billNights = document.getElementById('billNights');
    const billRoom = document.getElementById('billRoom');
    const billAddons = document.getElementById('billAddons');
    const billTotal = document.getElementById('billTotal');

    if (billNights) billNights.textContent = `${nights} Night(s)`;
    if (billRoom) billRoom.textContent = `৳${roomCharge.toLocaleString()}`;
    if (billAddons) billAddons.textContent = `৳${(addonsTotal * nights).toLocaleString()}`;
    if (billTotal) billTotal.textContent = `৳${grandTotal.toLocaleString()}`;
}

function togglePaymentDetails() {
    const select = document.getElementById('paymentMethodSelect');
    if (!select) return;

    const method = select.value;
    const onlineBox = document.getElementById('onlinePaymentDetails');
    const instructions = document.getElementById('paymentInstructions');

    if (!onlineBox || !instructions) return;

    if (method === 'bkash' || method === 'nagad') {
        onlineBox.style.display = 'block';
        instructions.innerHTML = `Please Pay/Send Money to ${method.toUpperCase()} Number: <strong>+8801723434535</strong>`;
    } else if (method === 'sslcommerz' || method === 'stripe') {
        onlineBox.style.display = 'block';
        instructions.innerHTML = `Redirecting to secure gateway: <strong>${method.toUpperCase()} Online Gateway</strong>`;
    } else {
        onlineBox.style.display = 'none';
    }
}

// --- BOOKING SUBMISSION & ROOM STATUS UPDATES ---
function handleBookingSubmit(event) {
    if (event) event.preventDefault();

    const roomSelect = document.getElementById('roomTypeSelect');
    if (!roomSelect || !roomSelect.value) return;

    const roomVal = roomSelect.value.split('|');
    const roomNo = roomVal[0];
    const roomName = roomVal[1];
    
    const checkIn = (document.getElementById('checkIn') && document.getElementById('checkIn').value) || new Date().toISOString().split('T')[0];
    const checkOut = (document.getElementById('checkOut') && document.getElementById('checkOut').value) || checkIn;
    const payMethod = document.getElementById('paymentMethodSelect') ? document.getElementById('paymentMethodSelect').value : 'CASH';

    const totalBillElem = document.getElementById('billTotal');
    const totalBill = totalBillElem ? parseInt(totalBillElem.textContent.replace(/[^\d]/g, '')) || 0 : 0;

    const guestNameInput = document.getElementById('bookingGuestName');
    const finalGuestName = (guestNameInput && guestNameInput.value.trim()) ? guestNameInput.value.trim() : currentUser.name;

    const newBooking = {
        id: `GP-${Math.floor(1000 + Math.random() * 9000)}`,
        guestName: finalGuestName,
        guestPhoto: currentUser.photo,
        roomNumber: roomNo,
        roomType: roomName,
        checkIn: checkIn,
        checkOut: checkOut,
        totalBill: totalBill,
        paymentMethod: payMethod.toUpperCase(),
        status: 'Checked-In'
    };

    // Update Room Status in inventory
    const targetRoom = roomList.find(r => r.id === roomNo);
    if (targetRoom) targetRoom.status = 'occupied';

    bookings.unshift(newBooking);
    
    // Refresh Dynamic Views
    populateRoomDropdown();
    refreshDashboard();
    renderFrontDesk();
    renderHousekeeping();
    renderFinance();

    alert(currentLang === 'bn' ? '🎉 বুকিং সফলভাবে তৈরি হয়েছে!' : '🎉 Reservation Successfully Created!');
    resetForm();
    switchTab('dashboard');
}

function resetForm() {
    const form = document.getElementById('reservationForm');
    if (form) form.reset();
    calculateBilling();
}

// --- RENDERING MODULES ---
function refreshDashboard() {
    let totalRev = 0;
    bookings.forEach(b => totalRev += b.totalBill);

    const bCount = document.getElementById('statTotalBookings');
    const revCount = document.getElementById('statRevenue');
    const poolCount = document.getElementById('statPoolPass');
    const diningCount = document.getElementById('statDiningOrders');

    if (bCount) bCount.textContent = bookings.length;
    if (revCount) revCount.textContent = `৳${totalRev.toLocaleString()}`;
    if (poolCount) poolCount.textContent = "12";
    if (diningCount) diningCount.textContent = "28";

    renderTables();
}

function renderTables() {
    const dashBody = document.getElementById('dashboardTableBody');
    const fullBody = document.getElementById('fullBookingsTableBody');

    if (!dashBody && !fullBody) return;

    let rowsHTML = bookings.map(b => `
        <tr>
            <td><img src="${b.guestPhoto}" class="table-img" alt="Guest" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(b.guestName)}'"></td>
            <td><strong>${b.id}</strong></td>
            <td>${b.guestName}</td>
            <td>Room ${b.roomNumber} - ${b.roomType}</td>
            <td>${b.checkIn} to ${b.checkOut}</td>
            <td>৳${b.totalBill.toLocaleString()}</td>
            <td><span class="status-badge badge-occupied">${b.status}</span></td>
            <td><button class="btn-secondary-sm" onclick="printInvoice('${b.id}')"><i class="fa-solid fa-print"></i></button></td>
        </tr>
    `).join('');

    if (dashBody) dashBody.innerHTML = rowsHTML;
    if (fullBody) fullBody.innerHTML = rowsHTML;
}

function renderFrontDesk() {
    const grid = document.getElementById('frontDeskRoomGrid');
    if (!grid) return;

    grid.innerHTML = roomList.map(r => `
        <div class="room-status-card ${r.status}">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3>Room ${r.id}</h3>
                <span class="status-badge badge-${r.status}">${r.status}</span>
            </div>
            <p style="font-size:0.8rem; color:var(--text-gray); margin: 6px 0;">${r.title}</p>
            <p style="font-size:0.85rem; font-weight:600; color:var(--gold);">৳${r.price.toLocaleString()} / night</p>
            <div style="margin-top:10px;">
                <select class="custom-select" onchange="updateRoomStatus('${r.id}', this.value)">
                    <option value="available" ${r.status==='available'?'selected':''}>Set Available</option>
                    <option value="occupied" ${r.status==='occupied'?'selected':''}>Set Occupied</option>
                    <option value="dirty" ${r.status==='dirty'?'selected':''}>Set Dirty</option>
                    <option value="maintenance" ${r.status==='maintenance'?'selected':''}>Set Maintenance</option>
                </select>
            </div>
        </div>
    `).join('');
}

function updateRoomStatus(roomId, newStatus) {
    const room = roomList.find(r => r.id === roomId);
    if (room) {
        room.status = newStatus;
        populateRoomDropdown();
        renderFrontDesk();
        renderHousekeeping();
    }
}

function renderHousekeeping() {
    const body = document.getElementById('housekeepingTableBody');
    if (!body) return;

    body.innerHTML = '';
    let clean = 0, dirty = 0, maint = 0;

    roomList.forEach(r => {
        if (r.status === 'available') clean++;
        if (r.status === 'dirty') dirty++;
        if (r.status === 'maintenance') maint++;

        body.innerHTML += `
            <tr>
                <td><strong>Room ${r.id}</strong></td>
                <td>${r.title}</td>
                <td><span class="status-badge badge-${r.status}">${r.status}</span></td>
                <td>
                    ${r.status === 'dirty' ? `<button class="btn-primary" onclick="updateRoomStatus('${r.id}', 'available')"><i class="fa-solid fa-broom"></i> Mark Cleaned</button>` : '—'}
                </td>
            </tr>
        `;
    });

    const cElem = document.getElementById('statCleanRooms');
    const dElem = document.getElementById('statDirtyRooms');
    const mElem = document.getElementById('statMaintRooms');

    if (cElem) cElem.textContent = clean;
    if (dElem) dElem.textContent = dirty;
    if (mElem) mElem.textContent = maint;
}

function renderFinance() {
    const body = document.getElementById('financeTableBody');
    if (!body) return;

    body.innerHTML = '';
    let grandRev = 0;

    bookings.forEach(b => {
        grandRev += b.totalBill;
        body.innerHTML += `
            <tr>
                <td>INV-${b.id}</td>
                <td>${b.guestName}</td>
                <td>Room ${b.roomNumber}</td>
                <td>${b.paymentMethod}</td>
                <td>৳${b.totalBill.toLocaleString()}</td>
                <td><button class="btn-primary" onclick="printInvoice('${b.id}')"><i class="fa-solid fa-file-invoice"></i> Print</button></td>
            </tr>
        `;
    });

    const finRev = document.getElementById('finTotalRev');
    const finInv = document.getElementById('finTotalInvoices');

    if (finRev) finRev.textContent = `৳${grandRev.toLocaleString()}`;
    if (finInv) finInv.textContent = bookings.length;
}

function printInvoice(bookingId) {
    const b = bookings.find(item => item.id === bookingId);
    if (!b) return;

    const modalContent = document.getElementById('modalContent');
    const detailsModal = document.getElementById('detailsModal');

    if (!modalContent || !detailsModal) return;

    modalContent.innerHTML = `
        <div style="text-align:center; padding:10px;">
            <i class="fa-solid fa-crown" style="font-size:2rem; color:var(--gold);"></i>
            <h2 style="font-family:'Playfair Display', serif; color:var(--gold);">GRAND PALACE RESORT & SPA</h2>
            <p style="font-size:0.8rem; color:var(--text-gray);">Official Invoice & Payment Receipt</p>
            <hr class="divider">
            <div style="text-align:left; font-size:0.85rem; margin:15px 0;">
                <p><strong>Invoice No:</strong> INV-${b.id}</p>
                <p><strong>Guest Name:</strong> ${b.guestName}</p>
                <p><strong>Room Reserved:</strong> Room ${b.roomNumber} (${b.roomType})</p>
                <p><strong>Stay Dates:</strong> ${b.checkIn} to ${b.checkOut}</p>
                <p><strong>Payment Gateway:</strong> ${b.paymentMethod}</p>
            </div>
            <div class="invoice-box">
                <div class="invoice-row total-row">
                    <span>Total Amount Paid:</span>
                    <strong>৳${b.totalBill.toLocaleString()}</strong>
                </div>
            </div>
            <button class="btn-block-gold mt-20" onclick="window.print()"><i class="fa-solid fa-print"></i> Print Document</button>
        </div>
    `;
    detailsModal.classList.add('active');
}

function renderRooms() {
    const grid = document.getElementById('roomsCardsGrid');
    if (!grid) return;

    grid.innerHTML = roomList.map(r => `
        <div class="custom-card">
            <img src="${r.img}" alt="${r.title}">
            <div class="card-body">
                <h3>${r.title}</h3>
                <p>${r.desc}</p>
                <strong>৳${r.price.toLocaleString()} / night</strong>
            </div>
        </div>
    `).join('');
}

function renderServices() {
    const grid = document.getElementById('servicesCardsGrid');
    if (!grid) return;

    grid.innerHTML = serviceItems.map(s => `
        <div class="custom-card">
            <div class="card-body">
                <i class="fa-solid ${s.icon}" style="font-size:2rem; color:var(--gold); margin-bottom:10px;"></i>
                <h3>${s.name}</h3>
                <p>Category: ${s.category}</p>
                <strong>৳${s.price.toLocaleString()}</strong>
            </div>
        </div>
    `).join('');
}

// --- AUTHENTICATION & MODALS ---
function handleLoginSubmit(e) {
    if (e) e.preventDefault();
    const emailElem = document.getElementById('loginEmail');
    const passElem = document.getElementById('loginPassword');

    // Admin Credentials Verification
    if (passElem && passElem.value && passElem.value !== 'admin123') {
        alert(currentLang === 'bn' ? 'ভুল পাসওয়ার্ড! (ডিফল্ট: admin123)' : 'Invalid Password! (Default: admin123)');
        return;
    }
    
    currentUser = {
        role: 'ADMINISTRATOR',
        name: 'MD. EMTIAZ HOSSAIN SAMI',
        email: emailElem ? emailElem.value : 'admin@grandpalace.com',
        photo: 'Md. EmTIAZ hOSSAIN sAMI LOGO.png'
    };
    
    document.body.classList.remove('logged-out');
    updateUserUI();
    closeLoginModal();
    switchUserRole('admin');
}

function handleGuestLogin() {
    const fName = document.getElementById('fName') ? document.getElementById('fName').value : 'Guest';
    const lName = document.getElementById('lName') ? document.getElementById('lName').value : 'User';
    const email = document.getElementById('email') ? document.getElementById('email').value : 'guest@resort.com';
    const previewImg = document.getElementById('previewImg') ? document.getElementById('previewImg').src : '';

    currentUser = {
        role: 'GUEST',
        name: `${fName} ${lName}`.trim(),
        email: email,
        photo: previewImg || 'https://ui-avatars.com/api/?name=Guest'
    };
    
    document.body.classList.remove('logged-out');
    updateUserUI();
    closeLoginModal();
    switchUserRole('guest');
}

function logoutUser() {
    document.body.classList.add('logged-out');
    const loginModal = document.getElementById('loginModal');
    if (loginModal) loginModal.classList.add('active');
}

function updateUserUI() {
    const nameElem = document.getElementById('sidebarUserName');
    const roleElem = document.getElementById('sidebarUserRole');
    const sideAvatar = document.getElementById('sidebarAvatar');
    const topAvatar = document.getElementById('topbarAvatar');

    if (nameElem) nameElem.textContent = currentUser.name;
    if (roleElem) roleElem.textContent = `Role: ${currentUser.role}`;
    if (sideAvatar) sideAvatar.src = currentUser.photo;
    if (topAvatar) topAvatar.src = currentUser.photo;
}

function closeLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) loginModal.classList.remove('active');
}

function handleAuthButtonClick() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) loginModal.classList.add('active');
}

function previewUploadImage(e) {
    if (!e || !e.target || !e.target.files) return;
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = document.getElementById('previewImg');
            if (img) img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function updateGuestImageFromUrl() {
    const urlElem = document.getElementById('imgUrlInput');
    const previewImg = document.getElementById('previewImg');
    if (urlElem && previewImg && urlElem.value) {
        previewImg.src = urlElem.value;
    }
}

function closeModal() {
    const detailsModal = document.getElementById('detailsModal');
    if (detailsModal) detailsModal.classList.remove('active');
}

function closeModalOnOutsideClick(e) {
    if (e && e.target && e.target.id === 'detailsModal') closeModal();
}
