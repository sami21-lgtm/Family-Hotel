// ==========================================
// 1. GLOBAL APPLICATION STATE & TRANSLATIONS
// ==========================================
let appMode = 'guest'; // Modes: 'guest' or 'staff'
let currentLang = 'en'; // 'en' or 'bn'
let currentRole = 'admin'; // 'admin', 'frontdesk', 'housekeeping', 'finance', 'guest'

let currentUser = {
    role: 'ADMINISTRATOR',
    name: 'MD. EMTIAZ HOSSAIN SAMI',
    email: 'admin@grandpalace.com',
    photo: 'Md. EmTIAZ hOSSAIN sAMI LOGO.png'
};

// Rooms Database with Room Status Tracking (available, occupied, dirty, maintenance)
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
        guestPortalTab: "Guest Booking Portal",
        staffPortalTab: "Staff/Admin Panel",
        activeRole: "Active System Role:",
        navDashboard: "Dashboard",
        navRooms: "Rooms & Inventory",
        navBooking: "New Booking",
        navFrontDesk: "Front Desk Status",
        navHousekeeping: "Housekeeping",
        navFinance: "Finance & Reports",
        navGuests: "Guest Directory",
        navServices: "Food & Facilities",
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
        lblCheckIn: "Check-In *",
        lblCheckOut: "Check-Out *",
        lblRoomType: "Select Room *",
        cuisineOpt: "Cuisine & Services",
        amenitiesOpt: "Pool & Gym Access",
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
        servicesSub: "Manage dining packages and facility access.",
        markCleaned: "Mark Cleaned"
    },
    bn: {
        brand: "গ্র্যান্ড প্যালেস",
        subbrand: "রিসোর্ট ও স্পা",
        guestPortalTab: "গেস্ট বুকিং পোর্টাল",
        staffPortalTab: "স্টাফ / অ্যাডমিন প্যানেল",
        activeRole: "সক্রিয় সিস্টেম রোল:",
        navDashboard: "ড্যাশবোর্ড",
        navRooms: "রুম ও ইনভেন্টরি",
        navBooking: "নতুন বুকিং",
        navFrontDesk: "ফ্রন্ট ডেস্ক স্ট্যাটাস",
        navHousekeeping: "হাউসকেপিং",
        navFinance: "ফাইন্যান্স ও রিপোর্ট",
        navGuests: "গেস্ট তালিকা",
        navServices: "খাবার ও সার্ভিস",
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
        lblCheckIn: "চেক-ইন *",
        lblCheckOut: "চেক-আউট *",
        lblRoomType: "রুম সিলেক্ট করুন *",
        cuisineOpt: "খাবার ও রেস্টুরেন্ট সুবিধা",
        amenitiesOpt: "পুল ও জিম অ্যাক্সেস",
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
        servicesSub: "ফুড প্যাকেজ ও ফ্যাসিলিটি অ্যাক্সেস সার্ভিস।",
        markCleaned: "পরিষ্কার চিহ্নিত করুন"
    }
};

// ==========================================
// 2. HELPER UTILS
// ==========================================
function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ==========================================
// 3. INITIALIZATION & APPLICATION SETUP
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initLiveClock();
    setInterval(initLiveClock, 1000);

    // Initial Population & Renders
    populateRoomDropdown();
    populateGuestRoomDropdown();
    renderGuestServicesOptions();
    renderRooms();
    renderServices();
    renderFrontDesk();
    renderHousekeeping();
    renderFinance();
    refreshDashboard();

    // Set Default Dates for Staff & Guest Forms
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    if (document.getElementById('checkIn')) document.getElementById('checkIn').value = today;
    if (document.getElementById('checkOut')) document.getElementById('checkOut').value = tomorrow;
    if (document.getElementById('guestCheckIn')) document.getElementById('guestCheckIn').value = today;
    if (document.getElementById('guestCheckOut')) document.getElementById('guestCheckOut').value = tomorrow;

    // Calculate Initial Billing Statements
    calculateBilling();
    calculateGuestBilling();

    // Event Listeners for Staff Reservation Form
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('change', calculateBilling);
        reservationForm.addEventListener('input', calculateBilling);
        reservationForm.addEventListener('submit', handleBookingSubmit);
    }

    // Event Listeners for Public Guest Booking Form
    const guestBookingForm = document.getElementById('guestBookingForm');
    if (guestBookingForm) {
        guestBookingForm.addEventListener('change', calculateGuestBilling);
        guestBookingForm.addEventListener('input', calculateGuestBilling);
        guestBookingForm.addEventListener('submit', handleGuestBookingSubmit);
    }

    // Modal Background Overlay Close Setup
    const modal = document.getElementById('detailsModal');
    if (modal) {
        modal.addEventListener('click', closeModalOnOutsideClick);
    }
});

// ==========================================
// 4. PORTAL & VIEW SWITCHER (GUEST vs STAFF)
// ==========================================
function setAppMode(mode) {
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
        // Staff/Admin Mode
        if (guestPortalEl) guestPortalEl.style.display = 'none';
        if (staffPortalEl) staffPortalEl.style.display = 'block';

        if (navStaffBtn) navStaffBtn.classList.add('active');
        if (navGuestBtn) navGuestBtn.classList.remove('active');
    }
}

// Populate Room Dropdown for Staff Panel
function populateRoomDropdown() {
    const select = document.getElementById('roomTypeSelect');
    if (!select) return;

    select.innerHTML = roomList.map(r => {
        const isAvailable = r.status === 'available';
        const statusText = isAvailable ? '' : ` [${r.status.toUpperCase()}]`;
        return `<option value="${r.id}|${escapeHTML(r.title)}|${r.price}" ${!isAvailable ? 'disabled' : ''}>
            Room ${r.id} - ${escapeHTML(r.title)} (৳${r.price.toLocaleString()}/night)${statusText}
        </option>`;
    }).join('');
}

// Populate Room Dropdown for Guest Portal
function populateGuestRoomDropdown() {
    const select = document.getElementById('guestRoomSelect');
    if (!select) return;

    const availableRooms = roomList.filter(r => r.status === 'available');

    if (availableRooms.length === 0) {
        select.innerHTML = `<option value="">${currentLang === 'bn' ? 'কোনো রুম খালি নেই' : 'No Rooms Currently Available'}</option>`;
        return;
    }

    select.innerHTML = availableRooms.map(r => `
        <option value="${r.id}|${escapeHTML(r.title)}|${r.price}">
            Room ${r.id} - ${escapeHTML(r.title)} (৳${r.price.toLocaleString()}/night)
        </option>
    `).join('');
}

// Render Food, Gym & Pool Checkboxes for Guest Form
function renderGuestServicesOptions() {
    const container = document.getElementById('guestServicesContainer');
    if (!container) return;

    container.innerHTML = serviceItems.map((s) => `
        <label class="service-checkbox-card" style="display:flex; align-items:center; gap:10px; padding:10px; border:1px solid var(--border,#ddd); border-radius:8px; margin-bottom:8px; cursor:pointer;">
            <input type="checkbox" class="guest-addon-checkbox" data-price="${s.price}" data-name="${escapeHTML(s.name)}" onchange="calculateGuestBilling()">
            <i class="fa-solid ${s.icon}" style="color:var(--gold,#d4af37);"></i>
            <div style="flex-grow:1;">
                <strong>${escapeHTML(s.name)}</strong>
                <small style="display:block; color:#666;">Category: ${escapeHTML(s.category)}</small>
            </div>
            <span style="font-weight:bold; color:var(--gold,#d4af37);">৳${s.price.toLocaleString()}</span>
        </label>
    `).join('');
}

// ==========================================
// 5. GUEST PORTAL CALCULATOR & CHECKOUT
// ==========================================
function calculateGuestBilling() {
    const roomSelect = document.getElementById('guestRoomSelect');
    if (!roomSelect || !roomSelect.value) {
        updateGuestSummaryUI(0, 0, 1, []);
        return;
    }

    const [roomId, roomTitle, roomPriceStr] = roomSelect.value.split('|');
    const roomPrice = parseInt(roomPriceStr) || 0;

    const checkInVal = document.getElementById('guestCheckIn')?.value || '';
    const checkOutVal = document.getElementById('guestCheckOut')?.value || '';

    let nights = 1;
    if (checkInVal && checkOutVal) {
        const d1 = new Date(checkInVal);
        const d2 = new Date(checkOutVal);
        if (d2 > d1) {
            nights = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
        }
    }

    // Addons calculation
    let addonsTotal = 0;
    let selectedAddonList = [];

    document.querySelectorAll('.guest-addon-checkbox:checked').forEach(cb => {
        const price = parseInt(cb.getAttribute('data-price')) || 0;
        const name = cb.getAttribute('data-name') || '';
        addonsTotal += price;
        selectedAddonList.push(`${name} (৳${price.toLocaleString()})`);
    });

    const roomSubtotal = roomPrice * nights;
    const addonsSubtotal = addonsTotal * nights;
    const grandTotal = roomSubtotal + addonsSubtotal;

    updateGuestSummaryUI(roomSubtotal, addonsSubtotal, nights, selectedAddonList, roomTitle, roomId, roomPrice, grandTotal);
}

function updateGuestSummaryUI(roomSubtotal, addonsSubtotal, nights, selectedAddonList, roomTitle = '', roomId = '', roomPrice = 0, grandTotal = 0) {
    const summaryRoomEl = document.getElementById('summaryRoomDetails');
    const summaryAddonsEl = document.getElementById('summaryAddonsDetails');
    const summaryTotalEl = document.getElementById('summaryGrandTotal');

    if (summaryRoomEl) {
        summaryRoomEl.innerHTML = roomTitle 
            ? `<strong>${escapeHTML(roomTitle)}</strong> (Room ${roomId})<br>৳${roomPrice.toLocaleString()} × ${nights} Night(s) = <strong>৳${roomSubtotal.toLocaleString()}</strong>`
            : '<em>Select a room to view details.</em>';
    }

    if (summaryAddonsEl) {
        summaryAddonsEl.innerHTML = selectedAddonList.length > 0 
            ? selectedAddonList.join('<br>') + `<br><strong style="color:var(--gold,#d4af37);">Addons Total: ৳${addonsSubtotal.toLocaleString()}</strong>`
            : '<em>No additional food/gym/pool services selected.</em>';
    }

    if (summaryTotalEl) {
        summaryTotalEl.textContent = `৳${grandTotal.toLocaleString()}`;
    }
}

function handleGuestBookingSubmit(e) {
    if (e) e.preventDefault();

    const nameInput = document.getElementById('guestInputName')?.value || '';
    const phoneInput = document.getElementById('guestInputPhone')?.value || '';
    const emailInput = document.getElementById('guestInputEmail')?.value || '';
    const payMethod = document.getElementById('guestPaymentMethod')?.value || 'CASH';

    const roomSelect = document.getElementById('guestRoomSelect');
    if (!nameInput || !phoneInput || !roomSelect || !roomSelect.value) {
        alert(currentLang === 'bn' ? '⚠️ অনুগ্রহ করে আপনার নাম, ফোন নম্বর এবং রুম নির্বাচন করুন।' : '⚠️ Please enter your name, phone, and select a room.');
        return;
    }

    const [roomId, roomTitle] = roomSelect.value.split('|');
    const totalBillText = document.getElementById('summaryGrandTotal')?.textContent || '0';
    const totalBill = parseInt(totalBillText.replace(/[^\d]/g, '')) || 0;

    const formattedName = escapeHTML(nameInput);

    const newBooking = {
        id: `GP-${Math.floor(1000 + Math.random() * 9000)}`,
        guestName: formattedName,
        guestPhone: escapeHTML(phoneInput),
        guestEmail: escapeHTML(emailInput),
        guestPhoto: `https://ui-avatars.com/api/?name=${encodeURIComponent(formattedName)}&background=d4af37&color=fff`,
        roomNumber: roomId,
        roomType: roomTitle,
        checkIn: document.getElementById('guestCheckIn')?.value || new Date().toISOString().split('T')[0],
        checkOut: document.getElementById('guestCheckOut')?.value || new Date().toISOString().split('T')[0],
        totalBill: totalBill,
        paymentMethod: payMethod.toUpperCase(),
        status: 'Confirmed'
    };

    // Update Room Status in Master Database
    const targetRoom = roomList.find(r => r.id === roomId);
    if (targetRoom) targetRoom.status = 'occupied';

    // Store in Master Bookings List
    bookings.unshift(newBooking);

    // Refresh UI Components Across Application
    populateRoomDropdown();
    populateGuestRoomDropdown();
    refreshDashboard();
    renderFrontDesk();
    renderHousekeeping();
    renderFinance();

    // Show Printable Receipt Modal directly to Guest
    printInvoice(newBooking.id);

    // Reset Guest Form
    document.getElementById('guestBookingForm')?.reset();
    calculateGuestBilling();

    alert(currentLang === 'bn' ? '🎉 ধন্যবাদ! আপনার রুম বুকিং নিশ্চিত হয়েছে।' : '🎉 Thank you! Your booking is confirmed.');
}

// ==========================================
// 6. AUTHENTICATION & LOGIN MODAL HANDLERS
// ==========================================
function switchAuthForm(type) {
    const staffForm = document.getElementById('staffLoginForm');
    const guestForm = document.getElementById('guestLoginForm');
    const btnStaff = document.getElementById('btnStaffAuth');
    const btnGuest = document.getElementById('btnGuestAuth');

    if (type === 'staff') {
        if (staffForm) staffForm.style.display = 'block';
        if (guestForm) guestForm.style.display = 'none';
        if (btnStaff) btnStaff.classList.add('active');
        if (btnGuest) btnGuest.classList.remove('active');
    } else {
        if (staffForm) staffForm.style.display = 'none';
        if (guestForm) guestForm.style.display = 'block';
        if (btnGuest) btnGuest.classList.add('active');
        if (btnStaff) btnStaff.classList.remove('active');
    }
}

function handleLoginSubmit(e) {
    if (e) e.preventDefault();
    const email = document.getElementById('loginEmail')?.value;
    
    currentUser = {
        role: 'ADMINISTRATOR',
        name: email ? email.split('@')[0].toUpperCase() : 'STAFF ADMIN',
        email: email || 'admin@grandpalace.com',
        photo: 'Md. EmTIAZ hOSSAIN sAMI LOGO.png'
    };

    updateProfileUI();
    document.body.classList.remove('logged-out');
    document.getElementById('loginModal')?.classList.remove('active');
    setAppMode('staff');
    switchUserRole('admin');
}

function handleGuestLoginSubmit(e) {
    if (e) e.preventDefault();
    
    const name = document.getElementById('guestAuthName')?.value.trim();
    const email = document.getElementById('guestAuthEmail')?.value.trim();
    const phone = document.getElementById('guestAuthPhone')?.value.trim();
    const photoPreview = document.getElementById('guestAuthPreviewImg')?.src;

    currentUser = {
        role: 'GUEST',
        name: name || 'Valued Guest',
        email: email || 'guest@example.com',
        phone: phone || '',
        photo: photoPreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Guest')}`
    };

    // Auto-fill into Guest Booking Form
    if (document.getElementById('guestInputName')) document.getElementById('guestInputName').value = currentUser.name;
    if (document.getElementById('guestInputEmail')) document.getElementById('guestInputEmail').value = currentUser.email;
    if (document.getElementById('guestInputPhone')) document.getElementById('guestInputPhone').value = currentUser.phone;

    updateProfileUI();
    document.body.classList.remove('logged-out');
    document.getElementById('loginModal')?.classList.remove('active');
    
    setAppMode('guest');
}

function updateProfileUI() {
    const nameEl = document.getElementById('sidebarUserName');
    const roleEl = document.getElementById('sidebarUserRole');
    const sideAvatar = document.getElementById('sidebarAvatar');
    const topAvatar = document.getElementById('topbarAvatar');

    if (nameEl) nameEl.textContent = currentUser.name;
    if (roleEl) roleEl.textContent = `Role: ${currentUser.role}`;
    if (sideAvatar) sideAvatar.src = currentUser.photo;
    if (topAvatar) topAvatar.src = currentUser.photo;
}

function logoutUser() {
    document.body.classList.add('logged-out');
    document.getElementById('loginModal')?.classList.add('active');
}

// ==========================================
// 7. IMAGE PREVIEW UTILS
// ==========================================
function updateGuestAuthImageFromUrl() {
    const url = document.getElementById('guestAuthPhotoUrl')?.value;
    const img = document.getElementById('guestAuthPreviewImg');
    if (url && img) img.src = url;
}

function previewGuestAuthImage(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            const img = document.getElementById('guestAuthPreviewImg');
            if (img) img.src = evt.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function updateGuestImageFromUrl() {
    const url = document.getElementById('imgUrlInput')?.value;
    const img = document.getElementById('previewImg');
    if (url && img) img.src = url;
}

function previewUploadImage(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            const img = document.getElementById('previewImg');
            if (img) img.src = evt.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// ==========================================
// 8. BILINGUAL TOGGLE SYSTEM
// ==========================================
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
    refreshDashboard();
    renderFrontDesk();
    renderHousekeeping();
    renderFinance();
    populateGuestRoomDropdown();
}

// ==========================================
// 9. ROLE BASED ACCESS CONTROL (RBAC)
// ==========================================
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

    if (role === 'housekeeping') switchTab('housekeeping');
    else if (role === 'finance') switchTab('finance');
    else switchTab('dashboard');
}

// ==========================================
// 10. CLOCK & NAVIGATION UTILS
// ==========================================
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

// ==========================================
// 11. STAFF BILLING CALCULATOR & PAYMENTS
// ==========================================
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

    if (billNights) billNights.textContent = `${nights} ${currentLang === 'bn' ? 'রাত' : 'Night(s)'}`;
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

// ==========================================
// 12. STAFF BOOKING SUBMISSION & UPDATES
// ==========================================
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
    const rawGuestName = (guestNameInput && guestNameInput.value.trim()) ? guestNameInput.value.trim() : currentUser.name;
    const finalGuestName = escapeHTML(rawGuestName);

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

    const targetRoom = roomList.find(r => r.id === roomNo);
    if (targetRoom) targetRoom.status = 'occupied';

    bookings.unshift(newBooking);

    populateRoomDropdown();
    populateGuestRoomDropdown();
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

// ==========================================
// 13. DASHBOARD & PANEL RENDERING MODULES
// ==========================================
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
            <td>Room ${b.roomNumber} - ${escapeHTML(b.roomType)}</td>
            <td>${b.checkIn} to ${b.checkOut}</td>
            <td>৳${b.totalBill.toLocaleString()}</td>
            <td><span class="status-badge badge-occupied">${b.status}</span></td>
            <td><button class="btn-secondary-sm" onclick="printInvoice('${b.id}')"><i class="fa-solid fa-print"></i></button></td>
        </tr>
    `).join('');

    if (dashBody) dashBody.innerHTML = rowsHTML;
    if (fullBody) fullBody.innerHTML = rowsHTML;
}

function renderRooms() {
    const grid = document.getElementById('roomsCardsGrid');
    if (!grid) return;

    grid.innerHTML = `<div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">` +
    roomList.map(r => `
        <div class="stat-card" style="flex-direction: column; align-items: flex-start; gap: 10px;">
            <img src="${r.img}" style="width:100%; height:160px; object-fit:cover; border-radius:8px;" alt="${escapeHTML(r.title)}">
            <div>
                <h4 style="color:var(--gold,#d4af37);">Room ${r.id} - ${escapeHTML(r.title)}</h4>
                <p style="font-size:0.85rem; color:var(--text-main); margin: 4px 0;">${escapeHTML(r.desc)}</p>
                <p style="font-weight:bold;">৳${r.price.toLocaleString()} / night</p>
                <span class="status-badge badge-${r.status}" style="margin-top:5px;">${r.status}</span>
            </div>
        </div>
    `).join('') + `</div>`;
}

function renderServices() {
    const grid = document.getElementById('servicesCardsGrid');
    if (!grid) return;

    grid.innerHTML = `<div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">` +
    serviceItems.map(s => `
        <div class="stat-card">
            <div class="stat-info">
                <h3>${escapeHTML(s.name)}</h3>
                <p style="font-size:0.8rem; color:var(--text-gray);">${s.category}</p>
                <div class="stat-value" style="font-size:1.2rem; color:var(--gold,#d4af37);">৳${s.price.toLocaleString()}</div>
            </div>
            <div class="stat-icon"><i class="fa-solid ${s.icon}"></i></div>
        </div>
    `).join('') + `</div>`;
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
            <p style="font-size:0.8rem; color:var(--text-gray); margin: 6px 0;">${escapeHTML(r.title)}</p>
            <p style="font-size:0.85rem; font-weight:600; color:var(--gold);">৳${r.price.toLocaleString()} / night</p>
            <div style="margin-top:10px;">
                <select class="custom-select" onchange="updateRoomStatus('${r.id}', this.value)">
                    <option value="available" ${r.status === 'available' ? 'selected' : ''}>Set Available</option>
                    <option value="occupied" ${r.status === 'occupied' ? 'selected' : ''}>Set Occupied</option>
                    <option value="dirty" ${r.status === 'dirty' ? 'selected' : ''}>Set Dirty</option>
                    <option value="maintenance" ${r.status === 'maintenance' ? 'selected' : ''}>Set Maintenance</option>
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
        populateGuestRoomDropdown();
        renderFrontDesk();
        renderHousekeeping();
    }
}

function renderHousekeeping() {
    const body = document.getElementById('housekeepingTableBody');
    if (!body) return;

    let clean = 0, dirty = 0, maint = 0;

    const rowsHTML = roomList.map(r => {
        if (r.status === 'available') clean++;
        if (r.status === 'dirty') dirty++;
        if (r.status === 'maintenance') maint++;

        const cleanBtnText = i18nData[currentLang]?.markCleaned || "Mark Cleaned";

        return `
            <tr>
                <td><strong>Room ${r.id}</strong></td>
                <td>${escapeHTML(r.title)}</td>
                <td><span class="status-badge badge-${r.status}">${r.status.toUpperCase()}</span></td>
                <td>
                    ${r.status === 'dirty' ? `<button class="btn-secondary-sm" onclick="updateRoomStatus('${r.id}', 'available')"><i class="fa-solid fa-broom"></i> ${cleanBtnText}</button>` : '<em>N/A</em>'}
                </td>
            </tr>
        `;
    }).join('');

    body.innerHTML = rowsHTML;

    if (document.getElementById('statCleanRooms')) document.getElementById('statCleanRooms').textContent = clean;
    if (document.getElementById('statDirtyRooms')) document.getElementById('statDirtyRooms').textContent = dirty;
    if (document.getElementById('statMaintRooms')) document.getElementById('statMaintRooms').textContent = maint;
}

function renderFinance() {
    const body = document.getElementById('financeTableBody');
    if (!body) return;

    let totalRev = 0;
    const rowsHTML = bookings.map((b, index) => {
        totalRev += b.totalBill;
        return `
            <tr>
                <td>INV-${1000 + index}</td>
                <td>${b.guestName}</td>
                <td>Room ${b.roomNumber}</td>
                <td><span class="status-badge">${b.paymentMethod}</span></td>
                <td><strong>৳${b.totalBill.toLocaleString()}</strong></td>
                <td><button class="btn-secondary-sm" onclick="printInvoice('${b.id}')"><i class="fa-solid fa-file-invoice"></i> Print</button></td>
            </tr>
        `;
    }).join('');

    body.innerHTML = rowsHTML;
    if (document.getElementById('finTotalRev')) document.getElementById('finTotalRev').textContent = `৳${totalRev.toLocaleString()}`;
    if (document.getElementById('finTotalInvoices')) document.getElementById('finTotalInvoices').textContent = bookings.length;
}

// ==========================================
// 14. PRINT INVOICE & MODAL SYSTEM
// ==========================================
function printInvoice(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const modal = document.getElementById('detailsModal');
    const content = document.getElementById('modalContent');
    if (!modal || !content) return;

    content.innerHTML = `
        <div style="padding: 20px; font-family: sans-serif; color: #333;">
            <div style="text-align: center; border-bottom: 2px dashed #d4af37; padding-bottom: 15px; margin-bottom: 15px;">
                <h2 style="color: #d4af37; margin: 0;">GRAND PALACE</h2>
                <p style="margin: 0; font-size: 0.85rem;">RESORT & SPA - RECEIPT & INVOICE</p>
                <p style="margin: 5px 0 0; font-size: 0.8rem; color: #666;">Booking ID: ${booking.id}</p>
            </div>

            <div style="display: flex; gap: 15px; align-items: center; margin-bottom: 15px;">
                <img src="${booking.guestPhoto}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 1px solid #d4af37;" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(booking.guestName)}'">
                <div>
                    <h4 style="margin:0;">Guest: ${booking.guestName}</h4>
                    <p style="margin:0; font-size: 0.85rem; color: #666;">Room: ${booking.roomNumber} - ${booking.roomType}</p>
                </div>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 0.9rem;">
                <tr><td style="padding: 4px 0;">Check-In:</td><td style="text-align: right; font-weight: bold;">${booking.checkIn}</td></tr>
                <tr><td style="padding: 4px 0;">Check-Out:</td><td style="text-align: right; font-weight: bold;">${booking.checkOut}</td></tr>
                <tr><td style="padding: 4px 0;">Gateway:</td><td style="text-align: right; font-weight: bold;">${booking.paymentMethod}</td></tr>
                <tr style="border-top: 1px solid #ddd; font-size: 1.1rem;"><td style="padding: 8px 0; color: #d4af37;">Total Paid:</td><td style="text-align: right; font-weight: bold; color: #d4af37;">৳${booking.totalBill.toLocaleString()}</td></tr>
            </table>

            <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
                <button class="btn-primary" onclick="window.print()"><i class="fa-solid fa-print"></i> Print Receipt</button>
                <button class="btn-secondary-sm" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('detailsModal');
    if (modal) modal.classList.remove('active');
}

function closeModalOnOutsideClick(e) {
    if (e.target.id === 'detailsModal') closeModal();
}
