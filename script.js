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

let serviceItems = [
    { 
        id: "s1", 
        name: "Bengali Traditional Feast", 
        price: 500, 
        category: "Dining", 
        icon: "fa-utensils",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop" 
    },
    { 
        id: "s2", 
        name: "Authentic Thai Gourmet", 
        price: 750, 
        category: "Dining", 
        icon: "fa-bowl-rice",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&auto=format&fit=crop" 
    },
    { 
        id: "s3", 
        name: "Continental 5-Star Buffet", 
        price: 1200, 
        category: "Dining", 
        icon: "fa-champagne-glasses",
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=500&auto=format&fit=crop" 
    },
    { 
        id: "s4", 
        name: "Luxury Spa & Body Massage", 
        price: 2500, 
        category: "Spa & Wellness", 
        icon: "fa-spa",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format&fit=crop" 
    },
    { 
        id: "s5", 
        name: "Infinity Swimming Pool Pass", 
        price: 500, 
        category: "Pool Access", 
        icon: "fa-person-swimming",
        image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=500&auto=format&fit=crop" 
    },
    { 
        id: "s6", 
        name: "VIP Fitness & Gym Day Pass", 
        price: 400, 
        category: "Fitness", 
        icon: "fa-dumbbell",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop" 
    }
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
        servicesTitle: "Food, Pool, Gym & Spa",
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
        servicesTitle: "খাবার, পুল, জিম ও স্পা",
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
        if (guestPortalEl) guestPortalEl.style.display = 'none';
        if (staffPortalEl) staffPortalEl.style.display = 'block';

        if (navStaffBtn) navStaffBtn.classList.add('active');
        if (navGuestBtn) navGuestBtn.classList.remove('active');
    }

    // Re-render UI components based on mode (Guest vs Admin)
    renderRooms();
    renderServices();
}

// ==========================================
// 5. ROOMS & INVENTORY MANAGEMENT
// ==========================================
function renderRooms() {
    const container = document.getElementById('roomsContainer');
    if (!container) return;

    if (appMode === 'guest') {
        // GUEST VIEW: Luxury Cards with Image, Description, Price & Online Booking
        container.innerHTML = roomList.map(r => `
            <div class="room-card guest-room-card" style="border:1px solid #e0e0e0; border-radius:12px; overflow:hidden; background:#fff; margin-bottom:20px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
                <img src="${r.img}" alt="${escapeHTML(r.title)}" style="width:100%; height:220px; object-fit:cover;">
                <div style="padding:18px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                        <h3 style="margin:0; font-size:1.2rem; color:#1a1a1a;">${escapeHTML(r.title)}</h3>
                        <span style="background:var(--gold-bg, #fff8e7); color:var(--gold, #d4af37); padding:4px 10px; border-radius:20px; font-weight:bold; font-size:0.85rem;">Room ${r.id}</span>
                    </div>
                    <p style="color:#666; font-size:0.9rem; margin-bottom:12px;">${escapeHTML(r.desc)}</p>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:1.25rem; font-weight:bold; color:#2c3e50;">৳${r.price.toLocaleString()} <small style="font-size:0.8rem; color:#888;">/ night</small></span>
                        ${r.status === 'available' 
                            ? `<button class="btn-primary" onclick="quickGuestBook('${r.id}')" style="padding:8px 16px; background:#d4af37; color:#fff; border:none; border-radius:6px; cursor:pointer;">
                                  ${currentLang === 'bn' ? 'অনলাইন বুকিং' : 'Book Now'}
                              </button>`
                            : `<span style="color:#e74c3c; font-weight:bold; font-size:0.85rem;">
                                  ${currentLang === 'bn' ? 'বুকড / অনুপলব্ধ' : 'Booked / Unavailable'}
                              </span>`
                        }
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        // ADMIN / STAFF VIEW: Status Control, Add/Edit Room & Full Inventory Access
        let adminControls = `
            <div style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; background:#f8f9fa; padding:15px; border-radius:8px;">
                <h4 style="margin:0;">${currentLang === 'bn' ? 'ইনভেন্টরি ও রুম কন্ট্রোল' : 'Inventory & Room Controls'}</h4>
                <button onclick="promptAddNewRoom()" style="background:#27ae60; color:#fff; border:none; padding:8px 15px; border-radius:6px; cursor:pointer;">
                    <i class="fa-solid fa-plus"></i> ${currentLang === 'bn' ? 'নতুন রুম যোগ করুন' : 'Add New Room'}
                </button>
            </div>
        `;

        let roomCards = roomList.map(r => `
            <div class="room-card admin-room-card" style="border:1px solid #ddd; border-radius:8px; padding:15px; margin-bottom:15px; background:#fff; display:flex; gap:15px; align-items:center;">
                <img src="${r.img}" alt="${escapeHTML(r.title)}" style="width:100px; height:80px; object-fit:cover; border-radius:6px;">
                <div style="flex-grow:1;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <strong style="font-size:1.1rem;">Room ${r.id}: ${escapeHTML(r.title)}</strong>
                        <span class="badge badge-${r.status}" style="padding:2px 8px; border-radius:4px; font-size:0.75rem; text-transform:uppercase;">${r.status}</span>
                    </div>
                    <p style="margin:4px 0; color:#555; font-size:0.85rem;">${escapeHTML(r.desc)}</p>
                    <strong>৳${r.price.toLocaleString()} / night</strong>
                </div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                    <button onclick="editRoomPrice('${r.id}')" style="background:#3498db; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer; font-size:0.8rem;">
                        <i class="fa-solid fa-pen"></i> ${currentLang === 'bn' ? 'এডিট করুন' : 'Edit'}
                    </button>
                    <button onclick="toggleRoomStatus('${r.id}')" style="background:#f39c12; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer; font-size:0.8rem;">
                        ${currentLang === 'bn' ? 'স্ট্যাটাস পরিবর্তন' : 'Change Status'}
                    </button>
                </div>
            </div>
        `).join('');

        container.innerHTML = adminControls + roomCards;
    }
}

// Admin Room Control Functions
function promptAddNewRoom() {
    const id = prompt(currentLang === 'bn' ? 'রুম নাম্বার দিন (যেমন: 701):' : 'Enter Room Number (e.g., 701):');
    if (!id) return;
    const title = prompt(currentLang === 'bn' ? 'রুমের নাম:' : 'Room Title:');
    const price = parseInt(prompt(currentLang === 'bn' ? 'রুমের ভাড়া (৳):' : 'Room Price (BDT):'));
    const desc = prompt(currentLang === 'bn' ? 'বিবরণ:' : 'Description:');

    if (id && title && price) {
        roomList.push({
            id: id,
            title: title,
            price: price,
            status: "available",
            img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500",
            desc: desc || "Luxury stay option."
        });
        populateRoomDropdown();
        populateGuestRoomDropdown();
        renderRooms();
        alert(currentLang === 'bn' ? 'নতুন রুম সফলভাবে যুক্ত হয়েছে!' : 'New room added successfully!');
    }
}

function editRoomPrice(roomId) {
    const room = roomList.find(r => r.id === roomId);
    if (!room) return;

    const newPrice = prompt(currentLang === 'bn' ? `বর্তমান দাম ৳${room.price}। নতুন দাম লিখুন:` : `Current price is ৳${room.price}. Enter new price:`, room.price);
    if (newPrice && !isNaN(newPrice)) {
        room.price = parseInt(newPrice);
        populateRoomDropdown();
        populateGuestRoomDropdown();
        renderRooms();
    }
}

function toggleRoomStatus(roomId) {
    const room = roomList.find(r => r.id === roomId);
    if (!room) return;

    const statuses = ['available', 'occupied', 'dirty', 'maintenance'];
    const nextIndex = (statuses.indexOf(room.status) + 1) % statuses.length;
    room.status = statuses[nextIndex];

    populateRoomDropdown();
    populateGuestRoomDropdown();
    renderRooms();
    renderFrontDesk();
    renderHousekeeping();
}

function quickGuestBook(roomId) {
    setAppMode('guest');
    const guestSelect = document.getElementById('guestRoomSelect');
    if (guestSelect) {
        for (let option of guestSelect.options) {
            if (option.value.startsWith(roomId + '|')) {
                guestSelect.value = option.value;
                break;
            }
        }
        calculateGuestBilling();
    }
    const formSection = document.getElementById('guestBookingForm');
    if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// 6. FOOD & FACILITIES (GUEST vs ADMIN - UPDATED WITH IMAGES)
// ==========================================
function renderServices() {
    const container = document.getElementById('servicesContainer');
    if (!container) return;

    if (appMode === 'guest') {
        // GUEST VIEW: Order Food, Book Spa, Gym & Swimming Pool (WITH IMAGES)
        container.innerHTML = `
            <div class="guest-services-wrapper">
                <h3 style="margin-bottom:15px; border-bottom:2px solid var(--gold,#d4af37); padding-bottom:8px;">
                    ${currentLang === 'bn' ? '🍽️ রেস্টুরেন্ট ফুড মেনু ও সার্ভিসেস' : '🍽️ Dining & Room Service'}
                </h3>
                <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:20px; margin-bottom:30px;">
                    ${serviceItems.filter(s => s.category === 'Dining').map(s => `
                        <div style="border:1px solid #e0e0e0; border-radius:12px; background:#fff; text-align:center; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
                            <img src="${s.image}" alt="${escapeHTML(s.name)}" style="width:100%; height:150px; object-fit:cover;">
                            <div style="padding:15px;">
                                <h4 style="margin:5px 0; font-size:1.1rem; color:#2c3e50;">
                                    <i class="fa-solid ${s.icon}" style="color:var(--gold,#d4af37); margin-right:5px;"></i>
                                    ${escapeHTML(s.name)}
                                </h4>
                                <p style="font-weight:bold; color:#27ae60; font-size:1.1rem; margin:8px 0;">৳${s.price.toLocaleString()}</p>
                                <button onclick="orderServiceDirect('${escapeHTML(s.name)}', ${s.price})" style="background:#27ae60; color:#fff; border:none; padding:8px 14px; border-radius:6px; cursor:pointer; width:100%; font-weight:bold;">
                                    ${currentLang === 'bn' ? 'রুমে অর্ডার করুন' : 'Order Room Service'}
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <h3 style="margin-bottom:15px; border-bottom:2px solid var(--gold,#d4af37); padding-bottom:8px;">
                    ${currentLang === 'bn' ? '🧖‍♀️ স্পা, পুল ও জিম সুবিধা' : '🧖‍♀️ Spa, Pool & Wellness Amenities'}
                </h3>
                <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:20px;">
                    ${serviceItems.filter(s => s.category !== 'Dining').map(s => `
                        <div style="border:1px solid #e0e0e0; border-radius:12px; background:#fff; text-align:center; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
                            <img src="${s.image}" alt="${escapeHTML(s.name)}" style="width:100%; height:150px; object-fit:cover;">
                            <div style="padding:15px;">
                                <h4 style="margin:5px 0; font-size:1.1rem; color:#2c3e50;">
                                    <i class="fa-solid ${s.icon}" style="color:#3498db; margin-right:5px;"></i>
                                    ${escapeHTML(s.name)}
                                </h4>
                                <p style="font-size:0.85rem; color:#777; margin-bottom:5px;">Category: ${escapeHTML(s.category)}</p>
                                <p style="font-weight:bold; color:#2c3e50; font-size:1.1rem; margin:8px 0;">৳${s.price.toLocaleString()}</p>
                                <button onclick="orderServiceDirect('${escapeHTML(s.name)}', ${s.price})" style="background:#3498db; color:#fff; border:none; padding:8px 14px; border-radius:6px; cursor:pointer; width:100%; font-weight:bold;">
                                    ${currentLang === 'bn' ? 'স্লট বুক করুন' : 'Book Facility Pass'}
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        // ADMIN VIEW: Update Prices, Add New Categories & Items (WITH THUMBNAIL)
        container.innerHTML = `
            <div class="admin-services-wrapper">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <h3>${currentLang === 'bn' ? 'ফুড ও সার্ভিস ম্যানেজমেন্ট' : 'Food & Facilities Management'}</h3>
                    <button onclick="promptAddNewService()" style="background:#27ae60; color:#fff; border:none; padding:8px 15px; border-radius:6px; cursor:pointer;">
                        <i class="fa-solid fa-plus"></i> ${currentLang === 'bn' ? 'নতুন সার্ভিস যোগ করুন' : 'Add New Service'}
                    </button>
                </div>
                <table style="width:100%; border-collapse:collapse; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
                    <thead>
                        <tr style="background:#2c3e50; color:#fff; text-align:left;">
                            <th style="padding:12px;">Photo</th>
                            <th style="padding:12px;">Item Name</th>
                            <th style="padding:12px;">Category</th>
                            <th style="padding:12px;">Price (BDT)</th>
                            <th style="padding:12px; text-align:right;">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${serviceItems.map(s => `
                            <tr style="border-bottom:1px solid #eee;">
                                <td style="padding:8px 12px;">
                                    <img src="${s.image}" alt="${escapeHTML(s.name)}" style="width:50px; height:40px; object-fit:cover; border-radius:4px;">
                                </td>
                                <td style="padding:12px; font-weight:bold;">
                                    <i class="fa-solid ${s.icon}" style="margin-right:8px; color:var(--gold,#d4af37);"></i>
                                    ${escapeHTML(s.name)}
                                </td>
                                <td style="padding:12px;">${escapeHTML(s.category)}</td>
                                <td style="padding:12px;">৳${s.price.toLocaleString()}</td>
                                <td style="padding:12px; text-align:right;">
                                    <button onclick="editServicePrice('${s.id}')" style="background:#3498db; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">
                                        ${currentLang === 'bn' ? 'মূল্য আপডেট' : 'Update Price'}
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
}

function orderServiceDirect(serviceName, price) {
    alert(currentLang === 'bn' 
        ? `✅ "${serviceName}" (৳${price}) অর্ডার গ্রহণ করা হয়েছে! আপনার রুমে কনফার্মেশন পাঠানো হচ্ছে।` 
        : `✅ Order received for "${serviceName}" (৳${price})! Confirmation has been sent to your room.`);
}

function editServicePrice(serviceId) {
    const item = serviceItems.find(s => s.id === serviceId);
    if (!item) return;

    const newPrice = prompt(currentLang === 'bn' ? `"${item.name}" এর নতুন মূল্য লিখুন:` : `Enter new price for "${item.name}":`, item.price);
    if (newPrice && !isNaN(newPrice)) {
        item.price = parseInt(newPrice);
        renderServices();
        renderGuestServicesOptions();
    }
}

function promptAddNewService() {
    const name = prompt(currentLang === 'bn' ? 'সার্ভিস/ফুড এর নাম:' : 'Service/Food Name:');
    if (!name) return;
    const category = prompt(currentLang === 'bn' ? 'ক্যাটাগরি (Dining/Spa & Wellness/Pool Access/Fitness):' : 'Category (Dining/Spa & Wellness/Pool Access/Fitness):', 'Dining');
    const price = parseInt(prompt(currentLang === 'bn' ? 'মূল্য (৳):' : 'Price (BDT):', '500'));
    const imgUrl = prompt(currentLang === 'bn' ? 'ছবির লিংক (URL):' : 'Image URL:', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500');

    if (name && price) {
        serviceItems.push({
            id: `s${serviceItems.length + 1}`,
            name: name,
            price: price,
            category: category || 'Dining',
            icon: category === 'Dining' ? 'fa-utensils' : 'fa-concierge-bell',
            image: imgUrl || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500'
        });
        renderServices();
        renderGuestServicesOptions();
        alert(currentLang === 'bn' ? 'নতুন সার্ভিস যুক্ত করা হয়েছে!' : 'New service added successfully!');
    }
}

// Populate Dropdowns
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
// 7. GUEST PORTAL CALCULATOR & CHECKOUT (COMPLETED)
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

    let addonsTotal = 0;
    let selectedAddonList = [];
    document.querySelectorAll('.guest-addon-checkbox:checked').forEach(cb => {
        addonsTotal += parseInt(cb.getAttribute('data-price')) || 0;
        selectedAddonList.push(cb.getAttribute('data-name'));
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
        summaryRoomEl.innerHTML = roomId 
            ? `Room ${roomId} - ${roomTitle} (${nights} ${currentLang === 'bn' ? 'রাত' : 'night'}${nights > 1 ? 's' : ''} × ৳${roomPrice.toLocaleString()} = ৳${roomSubtotal.toLocaleString()})` 
            : '-';
    }

    if (summaryAddonsEl) {
        summaryAddonsEl.innerHTML = selectedAddonList.length > 0 
            ? `${selectedAddonList.join(', ')} (× ${nights} ${currentLang === 'bn' ? 'রাত' : 'night'}${nights > 1 ? 's' : ''} = ৳${addonsSubtotal.toLocaleString()})` 
            : (currentLang === 'bn' ? 'কোনো সার্ভিস নির্বাচন করা হয়নি' : 'None selected');
    }

    if (summaryTotalEl) {
        summaryTotalEl.innerHTML = `৳${grandTotal.toLocaleString()}`;
    }
}

function handleGuestBookingSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('guestName')?.value;
    const roomSelect = document.getElementById('guestRoomSelect')?.value;
    const checkIn = document.getElementById('guestCheckIn')?.value;
    const checkOut = document.getElementById('guestCheckOut')?.value;
    const paymentMethod = document.getElementById('guestPaymentMethod')?.value || 'ONLINE';

    if (!name || !roomSelect || !checkIn || !checkOut) {
        alert(currentLang === 'bn' ? 'অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।' : 'Please fill in all required fields.');
        return;
    }

    const [roomId, roomTitle, roomPriceStr] = roomSelect.split('|');
    const roomPrice = parseInt(roomPriceStr) || 0;

    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    let nights = Math.max(1, Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)));

    let addonsTotal = 0;
    document.querySelectorAll('.guest-addon-checkbox:checked').forEach(cb => {
        addonsTotal += parseInt(cb.getAttribute('data-price')) || 0;
    });

    const totalBill = (roomPrice * nights) + (addonsTotal * nights);
    const newBookingId = `GP-${Math.floor(1000 + Math.random() * 9000)}`;

    bookings.push({
        id: newBookingId,
        guestName: name,
        guestPhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
        roomNumber: roomId,
        roomType: roomTitle,
        checkIn: checkIn,
        checkOut: checkOut,
        totalBill: totalBill,
        paymentMethod: paymentMethod,
        status: "Confirmed"
    });

    const targetRoom = roomList.find(r => r.id === roomId);
    if (targetRoom) {
        targetRoom.status = 'occupied';
    }

    populateRoomDropdown();
    populateGuestRoomDropdown();
    renderRooms();
    renderFrontDesk();
    refreshDashboard();

    alert(currentLang === 'bn' 
        ? `🎉 ধন্যবাদ ${name}! আপনার বুকিং সফল হয়েছে। বুকিং আইডি: ${newBookingId}` 
        : `🎉 Thank you ${name}! Booking confirmed. Reservation ID: ${newBookingId}`);

    document.getElementById('guestBookingForm').reset();
    calculateGuestBilling();
}

// ==========================================
// 8. STAFF / ADMIN BILLING & SUBMIT HANDLERS
// ==========================================
function calculateBilling() {
    const roomSelect = document.getElementById('roomTypeSelect');
    if (!roomSelect || !roomSelect.value) return;

    const [roomId, roomTitle, roomPriceStr] = roomSelect.value.split('|');
    const roomPrice = parseInt(roomPriceStr) || 0;

    const checkInVal = document.getElementById('checkIn')?.value || '';
    const checkOutVal = document.getElementById('checkOut')?.value || '';

    let nights = 1;
    if (checkInVal && checkOutVal) {
        const d1 = new Date(checkInVal);
        const d2 = new Date(checkOutVal);
        if (d2 > d1) {
            nights = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
        }
    }

    let addonsTotal = 0;
    document.querySelectorAll('.staff-addon-checkbox:checked').forEach(cb => {
        addonsTotal += parseInt(cb.getAttribute('data-price')) || 0;
    });

    const roomSubtotal = roomPrice * nights;
    const addonsSubtotal = addonsTotal * nights;
    const grandTotal = roomSubtotal + addonsSubtotal;

    const staffRoomEl = document.getElementById('staffSummaryRoom');
    const staffAddonsEl = document.getElementById('staffSummaryAddons');
    const staffTotalEl = document.getElementById('staffSummaryTotal');

    if (staffRoomEl) staffRoomEl.innerText = `৳${roomSubtotal.toLocaleString()} (${nights} nights)`;
    if (staffAddonsEl) staffAddonsEl.innerText = `৳${addonsSubtotal.toLocaleString()}`;
    if (staffTotalEl) staffTotalEl.innerText = `৳${grandTotal.toLocaleString()}`;
}

function handleBookingSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('guestNameInput')?.value || 'Walk-in Guest';
    const roomSelect = document.getElementById('roomTypeSelect')?.value;
    const checkIn = document.getElementById('checkIn')?.value;
    const checkOut = document.getElementById('checkOut')?.value;
    const paymentMethod = document.getElementById('paymentGatewaySelect')?.value || 'CASH';

    if (!roomSelect || !checkIn || !checkOut) return;

    const [roomId, roomTitle, roomPriceStr] = roomSelect.split('|');
    const roomPrice = parseInt(roomPriceStr) || 0;

    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    let nights = Math.max(1, Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)));

    let addonsTotal = 0;
    document.querySelectorAll('.staff-addon-checkbox:checked').forEach(cb => {
        addonsTotal += parseInt(cb.getAttribute('data-price')) || 0;
    });

    const totalBill = (roomPrice * nights) + (addonsTotal * nights);
    const newBookingId = `GP-${Math.floor(1000 + Math.random() * 9000)}`;

    bookings.push({
        id: newBookingId,
        guestName: name,
        guestPhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
        roomNumber: roomId,
        roomType: roomTitle,
        checkIn: checkIn,
        checkOut: checkOut,
        totalBill: totalBill,
        paymentMethod: paymentMethod,
        status: "Checked-In"
    });

    const targetRoom = roomList.find(r => r.id === roomId);
    if (targetRoom) {
        targetRoom.status = 'occupied';
    }

    populateRoomDropdown();
    populateGuestRoomDropdown();
    renderRooms();
    renderFrontDesk();
    refreshDashboard();

    alert(currentLang === 'bn' ? `বুকিং #${newBookingId} তৈরি সম্পন্ন হয়েছে!` : `Booking #${newBookingId} created successfully!`);
    document.getElementById('reservationForm').reset();
    calculateBilling();
}

// ==========================================
// 9. DASHBOARD & TAB RENDERERS
// ==========================================
function refreshDashboard() {
    const statBookings = document.getElementById('statTotalBookings');
    const statRevenue = document.getElementById('statRevenue');
    const tableBody = document.getElementById('recentCheckinsTable');

    if (statBookings) statBookings.innerText = bookings.length;

    const totalRev = bookings.reduce((sum, b) => sum + b.totalBill, 0);
    if (statRevenue) statRevenue.innerText = `৳${totalRev.toLocaleString()}`;

    if (tableBody) {
        tableBody.innerHTML = bookings.slice(-5).reverse().map(b => `
            <tr>
                <td><img src="${b.guestPhoto}" style="width:36px; height:36px; border-radius:50%; object-fit:cover;"></td>
                <td><strong>${b.id}</strong></td>
                <td>${escapeHTML(b.guestName)}</td>
                <td>Room ${b.roomNumber} (${escapeHTML(b.roomType)})</td>
                <td>${b.checkIn} to ${b.checkOut}</td>
                <td style="font-weight:bold;">৳${b.totalBill.toLocaleString()}</td>
                <td><span class="badge badge-${b.status.toLowerCase()}">${b.status}</span></td>
                <td>
                    <button onclick="showBookingDetails('${b.id}')" style="background:#3498db; color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;">
                        Details
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

function renderFrontDesk() {
    const container = document.getElementById('frontDeskContainer');
    if (!container) return;

    container.innerHTML = roomList.map(r => `
        <div style="border:1px solid #ddd; border-radius:8px; padding:12px; background:#fff; text-align:center;">
            <div style="font-weight:bold; font-size:1.1rem; color:#2c3e50;">Room ${r.id}</div>
            <small style="color:#777;">${escapeHTML(r.title)}</small>
            <div style="margin:10px 0;">
                <span class="badge badge-${r.status}" style="padding:4px 10px; border-radius:12px; font-size:0.8rem; text-transform:uppercase;">${r.status}</span>
            </div>
            <button onclick="toggleRoomStatus('${r.id}')" style="background:#f39c12; color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-size:0.75rem;">
                Toggle Status
            </button>
        </div>
    `).join('');
}

function renderHousekeeping() {
    const container = document.getElementById('housekeepingContainer');
    if (!container) return;

    container.innerHTML = roomList.map(r => `
        <div style="border:1px solid #ddd; border-radius:8px; padding:12px; background:#fff; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div>
                <strong>Room ${r.id}</strong> - ${escapeHTML(r.title)}
                <div><span class="badge badge-${r.status}">${r.status}</span></div>
            </div>
            ${r.status === 'dirty' 
                ? `<button onclick="toggleRoomStatus('${r.id}')" style="background:#27ae60; color:#fff; border:none; padding:6px 12px; border-radius:4px; cursor:pointer;">
                      ${i18nData[currentLang].markCleaned}
                   </button>` 
                : `<span style="color:#777; font-size:0.85rem;">No action needed</span>`
            }
        </div>
    `).join('');
}

function renderFinance() {
    const container = document.getElementById('financeContainer');
    if (!container) return;

    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalBill, 0);
    container.innerHTML = `
        <div style="background:#fff; padding:20px; border-radius:8px; border:1px solid #ddd;">
            <h3>${currentLang === 'bn' ? 'আর্থিক বিবরণী' : 'Financial Statement'}</h3>
            <p style="font-size:1.3rem;">Total Accumulated Revenue: <strong>৳${totalRevenue.toLocaleString()}</strong></p>
            <p>Total Confirmed Transactions: <strong>${bookings.length}</strong></p>
        </div>
    `;
}

// ==========================================
// 10. MODAL & UTILITY FUNCTIONS
// ==========================================
function showBookingDetails(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const modal = document.getElementById('detailsModal');
    const content = document.getElementById('modalDetailsContent');

    if (modal && content) {
        content.innerHTML = `
            <h3>Booking Reference: ${booking.id}</h3>
            <hr style="margin:10px 0;">
            <p><strong>Guest Name:</strong> ${escapeHTML(booking.guestName)}</p>
            <p><strong>Room:</strong> ${booking.roomNumber} (${escapeHTML(booking.roomType)})</p>
            <p><strong>Check-In:</strong> ${booking.checkIn}</p>
            <p><strong>Check-Out:</strong> ${booking.checkOut}</p>
            <p><strong>Payment Gateway:</strong> ${booking.paymentMethod}</p>
            <p><strong>Grand Total Bill:</strong> ৳${booking.totalBill.toLocaleString()}</p>
            <p><strong>Status:</strong> ${booking.status}</p>
            <button onclick="printInvoice()" style="background:#27ae60; color:#fff; border:none; padding:8px 16px; border-radius:4px; cursor:pointer; margin-top:10px;">
                <i class="fa-solid fa-print"></i> Print Invoice
            </button>
        `;
        modal.style.display = 'flex';
    }
}

function closeModalOnOutsideClick(e) {
    const modal = document.getElementById('detailsModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
}

function printInvoice() {
    window.print();
}

function initLiveClock() {
    const clockEl = document.getElementById('liveClock');
    if (clockEl) {
        const now = new Date();
        clockEl.innerText = now.toLocaleTimeString();
    }
}

function setLanguage(lang) {
    currentLang = lang;
    renderRooms();
    renderServices();
    renderFrontDesk();
    renderHousekeeping();
    renderFinance();
    refreshDashboard();
}

function setRole(role) {
    currentRole = role;
    const roleBadge = document.getElementById('activeRoleBadge');
    if (roleBadge) roleBadge.innerText = role.toUpperCase();
}
