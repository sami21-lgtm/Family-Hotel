// ==================================================================
// GRAND PALACE RESORT & SPA - COMPLETE JAVASCRIPT SYSTEM
// ==================================================================

// 1. GLOBAL STATE & DATA STORE
let currentUser = {
    name: "MD. EMTIAZ HOSSAIN SAMI",
    role: "Admin",
    isLogged: false
};

let bookingsList = [];

// Rooms Inventory Data
const roomsData = [
    { id: 1, name: "Single Standard Room", price: 800, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500", desc: "Cozy single bed with essential amenities and high-speed Wi-Fi." },
    { id: 2, name: "Single Executive Room", price: 1000, img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500", desc: "Modern executive room designed for solo luxury travelers." },
    { id: 3, name: "Deluxe Double Room", price: 5000, img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500", desc: "Spacious double bed suite with modern interior and balcony view." },
    { id: 4, name: "Super Deluxe Double Room", price: 7500, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500", desc: "Premium furnishings with garden view and luxury bath space." },
    { id: 5, name: "Executive Double Ocean View", price: 10000, img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500", desc: "Breathtaking ocean views, private terrace, and king bed." },
    { id: 6, name: "Royal Family Suite", price: 20000, img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500", desc: "Two bedrooms, private living room, and high-end dining area." },
    { id: 7, name: "Presidential VIP Suite", price: 35000, img: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=500", desc: "Ultra-luxury suite with personal butler service and jacuzzi." },
    { id: 8, name: "Royal Palace Villa", price: 50000, img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500", desc: "Private villa featuring a dedicated private infinity pool and lawn." }
];

// Services Inventory Data
const servicesData = [
    { title: "Bengali Traditional Feast", type: "Food", price: 500, desc: "Kacchi Biryani, Hilsha Fish Curry, Roast & Special Sweets.", icon: "fa-utensils" },
    { title: "Authentic Thai Gourmet", type: "Food", price: 750, desc: "Tom Yum Soup, Pad Thai, Green Curry & Mango Sticky Rice.", icon: "fa-bowl-rice" },
    { title: "Continental 5-Star Buffet", type: "Food", price: 1200, desc: "Unlimited live stations with international dining options.", icon: "fa-drumstick-bite" },
    { title: "Morning Pool Pass", type: "Amenity", price: 300, desc: "Fresh morning access to pool from 06:00 AM to 11:00 AM.", icon: "fa-water" },
    { title: "Night Infinity Pool Pass", type: "Amenity", price: 500, desc: "Atmospheric night swimming access from 04:00 PM to 10:00 PM.", icon: "fa-person-swimming" },
    { title: "VIP Gym & Fitness Pass", type: "Amenity", price: 400, desc: "Full access to cardio & weight room with personal trainer.", icon: "fa-dumbbell" }
];

// 2. INITIALIZATION ON DOM LOAD
document.addEventListener("DOMContentLoaded", () => {
    initLiveClock();
    setDefaultDates();
    calculateBilling();
    renderRooms();
    renderServices();
    updateDashboardTable();
    updateGuestDirectoryTable();
});

// 3. TAB SWITCHER FUNCTION
window.switchTab = function(tabId) {
    const pages = document.querySelectorAll(".tab-page");
    pages.forEach(page => page.classList.remove("active"));

    const targetPage = document.getElementById(`tab-${tabId}`);
    if (targetPage) {
        targetPage.classList.add("active");
    }

    // Update Nav Active States
    document.querySelectorAll(".nav-item, .m-nav-item").forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("data-tab") === tabId) {
            item.classList.add("active");
        }
    });

    toggleSidebar(false);
};

// 4. AUTHENTICATION & LOGIN HANDLERS
window.handleGuestLogin = function() {
    const inputName = document.getElementById("guestInputName").value.trim();
    const guestName = inputName !== "" ? inputName : "Sami";

    currentUser = {
        name: guestName,
        role: "Guest User",
        isLogged: true
    };

    updateUserInterface();

    // Hide Login Modal
    const loginModal = document.getElementById("loginModal");
    if (loginModal) loginModal.classList.remove("active");

    // Automatically switch directly to 'New Guest Booking' tab
    switchTab('booking');
};

window.handleLoginSubmit = function(event) {
    event.preventDefault();
    currentUser = {
        name: "MD. EMTIAZ HOSSAIN SAMI",
        role: "Admin",
        isLogged: true
    };

    updateUserInterface();

    const loginModal = document.getElementById("loginModal");
    if (loginModal) loginModal.classList.remove("active");

    switchTab('dashboard');
};

window.handleAuthButtonClick = function() {
    const loginModal = document.getElementById("loginModal");
    if (loginModal) loginModal.classList.add("active");
};

function updateUserInterface() {
    const nameEl = document.getElementById("sidebarUserName");
    const roleEl = document.getElementById("sidebarUserRole");
    const btnText = document.getElementById("topbarAuthText");

    if (nameEl) nameEl.textContent = currentUser.name;
    if (roleEl) roleEl.textContent = currentUser.role;
    if (btnText) btnText.textContent = currentUser.isLogged ? "Logout" : "Login";
}

// 5. LIVE CLOCK & DEFAULT DATES
function initLiveClock() {
    const dateEl = document.getElementById("currentDateDisplay");
    function updateClock() {
        const now = new Date();
        if (dateEl) {
            dateEl.textContent = now.toLocaleString("en-US", {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
    }
    updateClock();
    setInterval(updateClock, 1000);
}

function setDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toISOString().split('T')[0];

    const checkInInput = document.getElementById("checkIn");
    const checkOutInput = document.getElementById("checkOut");

    if (checkInInput) checkInInput.value = today;
    if (checkOutInput) checkOutInput.value = tomorrow;
}

// 6. BILLING & INVOICE CALCULATION
window.calculateBilling = function() {
    const checkInVal = document.getElementById("checkIn")?.value;
    const checkOutVal = document.getElementById("checkOut")?.value;
    const roomSelect = document.getElementById("roomTypeSelect");

    if (!checkInVal || !checkOutVal || !roomSelect) return;

    const d1 = new Date(checkInVal);
    const d2 = new Date(checkOutVal);
    let nights = Math.ceil((d2 - d1) / (1000 * 3600 * 24));
    if (isNaN(nights) || nights <= 0) nights = 1;

    const roomPrice = parseInt(roomSelect.value.split('|')[1] || "800", 10);
    const roomTotal = roomPrice * nights;

    let addonsTotal = 0;
    document.querySelectorAll('input[name="foodMenu"]:checked, input[name="amenities"]:checked').forEach(cb => {
        addonsTotal += parseInt(cb.getAttribute("data-price") || "0", 10) * nights;
    });

    const grandTotal = roomTotal + addonsTotal;

    const billNights = document.getElementById("billNights");
    const billRoom = document.getElementById("billRoom");
    const billAddons = document.getElementById("billAddons");
    const billTotal = document.getElementById("billTotal");

    if (billNights) billNights.textContent = `${nights} Night(s)`;
    if (billRoom) billRoom.textContent = `৳${roomTotal.toLocaleString()}`;
    if (billAddons) billAddons.textContent = `৳${addonsTotal.toLocaleString()}`;
    if (billTotal) billTotal.textContent = `৳${grandTotal.toLocaleString()} (Inc. Tax & Service Charge)`;
};

window.togglePaymentDetails = function() {
    const method = document.getElementById("paymentMethodSelect")?.value;
    const detailsBox = document.getElementById("onlinePaymentDetails");
    if (detailsBox) {
        detailsBox.style.display = (method === 'bkash' || method === 'nagad') ? 'block' : 'none';
    }
};

// 7. IMAGE HANDLING
window.previewUploadImage = function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("previewImg").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

window.updateGuestImageFromUrl = function() {
    const url = document.getElementById("imgUrlInput").value.trim();
    if (url) {
        document.getElementById("previewImg").src = url;
    }
};

// 8. BOOKING FORM SUBMISSION & DATA HANDLING
window.handleBookingSubmit = function(event) {
    event.preventDefault();

    const fName = document.getElementById("fName").value.trim();
    const lName = document.getElementById("lName").value.trim();
    const roomSelect = document.getElementById("roomTypeSelect").value;
    const roomName = roomSelect.split('|')[0];
    const totalBill = document.getElementById("billTotal").textContent;
    const photoSrc = document.getElementById("previewImg").src;

    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;

    const newBooking = {
        id: "GP-" + Math.floor(10000 + Math.random() * 90000),
        guestName: `${fName} ${lName}`,
        roomName: roomName,
        dates: `${checkIn} to ${checkOut}`,
        bill: totalBill,
        photo: photoSrc,
        status: "Confirmed"
    };

    bookingsList.unshift(newBooking);
    updateDashboardTable();
    updateGuestDirectoryTable();

    alert(`🎉 Booking Successful!\nBooking ID: ${newBooking.id}\nGuest: ${newBooking.guestName}`);
    resetForm();
    switchTab('dashboard');
};

window.resetForm = function() {
    const form = document.getElementById("reservationForm");
    if (form) form.reset();
    document.getElementById("previewImg").src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400";
    setDefaultDates();
    calculateBilling();
};

// 9. TABLE RENDERERS
function updateDashboardTable() {
    const tbody = document.getElementById("dashboardTableBody");
    if (!tbody) return;

    if (bookingsList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px; color: var(--text-muted);">No recent check-ins recorded yet.</td></tr>`;
        document.getElementById("statTotalBookings").textContent = "0";
        document.getElementById("statRevenue").textContent = "৳0";
        return;
    }

    let totalRev = 0;
    tbody.innerHTML = bookingsList.map(b => {
        const numBill = parseInt(b.bill.replace(/[^0-9]/g, '') || "0", 10);
        totalRev += numBill;

        return `
            <tr>
                <td><img src="${b.photo}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:1px solid #d4af37;"></td>
                <td><strong style="color:var(--primary-gold);">${b.id}</strong></td>
                <td>${b.guestName}</td>
                <td>${b.roomName}</td>
                <td>${b.dates}</td>
                <td style="color:#10B981;font-weight:600;">${b.bill}</td>
                <td><span style="background:rgba(16,185,129,0.2);color:#10B981;padding:4px 10px;border-radius:20px;font-size:0.75rem;font-weight:600;">${b.status}</span></td>
            </tr>
        `;
    }).join('');

    document.getElementById("statTotalBookings").textContent = bookingsList.length;
    document.getElementById("statRevenue").textContent = `৳${totalRev.toLocaleString()}`;
}

function updateGuestDirectoryTable() {
    const tbody = document.getElementById("fullBookingsTableBody");
    if (!tbody) return;

    if (bookingsList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px; color: var(--text-muted);">No active guests registered in directory.</td></tr>`;
        return;
    }

    tbody.innerHTML = bookingsList.map(b => `
        <tr>
            <td><img src="${b.photo}" style="width:42px;height:42px;border-radius:50%;object-fit:cover;border:1px solid #d4af37;"></td>
            <td><strong style="color:var(--primary-gold);">${b.id}</strong></td>
            <td><strong>${b.guestName}</strong></td>
            <td>${b.roomName}</td>
            <td>${b.dates}</td>
            <td style="color:#10B981;font-weight:600;">${b.bill}</td>
            <td>
                <button style="padding:6px 12px;background:rgba(239,68,68,0.2);color:#ef4444;border:1px solid rgba(239,68,68,0.5);border-radius:6px;cursor:pointer;font-weight:600;font-size:0.75rem;" onclick="deleteBooking('${b.id}')">
                    <i class="fa-solid fa-trash"></i> Cancel
                </button>
            </td>
        </tr>
    `).join('');
}

window.deleteBooking = function(id) {
    if (confirm("Are you sure you want to delete/cancel this booking?")) {
        bookingsList = bookingsList.filter(b => b.id !== id);
        updateDashboardTable();
        updateGuestDirectoryTable();
    }
};

// 10. CARDS RENDERERS (ROOMS & SERVICES)
function renderRooms() {
    const grid = document.getElementById("roomsCardsGrid");
    if (!grid) return;

    grid.innerHTML = roomsData.map(room => `
        <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); overflow:hidden; transition:all 0.3s ease;">
            <img src="${room.img}" alt="${room.name}" style="width:100%; height:180px; object-fit:cover;">
            <div style="padding:18px;">
                <h3 style="color:#fff; font-family:var(--font-serif); font-size:1.1rem; margin-bottom:6px;">${room.name}</h3>
                <p style="color:var(--text-muted); font-size:0.8rem; margin-bottom:12px; min-height:40px;">${room.desc}</p>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="color:var(--primary-gold); font-weight:700; font-size:1rem;">৳${room.price.toLocaleString()} <small style="font-weight:400; font-size:0.7rem; color:var(--text-muted);">/ night</small></span>
                    <button style="padding:6px 14px; background:var(--primary-gold); color:#000; border:none; border-radius:6px; font-weight:600; font-size:0.8rem; cursor:pointer;" onclick="quickBookRoom('${room.name}|${room.price}')">Book Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderServices() {
    const grid = document.getElementById("servicesCardsGrid");
    if (!grid) return;

    grid.innerHTML = servicesData.map(serv => `
        <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:20px; transition:all 0.3s ease;">
            <div style="width:45px; height:45px; border-radius:10px; background:rgba(212,175,55,0.15); color:var(--primary-gold); display:flex; align-items:center; justify-content:center; font-size:1.2rem; margin-bottom:12px;">
                <i class="fa-solid ${serv.icon}"></i>
            </div>
            <h3 style="color:#fff; font-size:1.05rem; margin-bottom:6px;">${serv.title}</h3>
            <p style="color:var(--text-muted); font-size:0.82rem; margin-bottom:14px; min-height:38px;">${serv.desc}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.05); padding-top:10px;">
                <span style="color:#10B981; font-weight:700;">+৳${serv.price} <small style="color:var(--text-muted);">/ day</small></span>
                <span style="font-size:0.72rem; padding:3px 8px; background:rgba(212,175,55,0.1); color:var(--primary-gold); border-radius:4px; font-weight:600;">${serv.type}</span>
            </div>
        </div>
    `).join('');
}

window.quickBookRoom = function(roomVal) {
    const select = document.getElementById("roomTypeSelect");
    if (select) {
        select.value = roomVal;
        calculateBilling();
    }
    switchTab('booking');
};

// 11. SIDEBAR & MODAL CONTROLS
window.toggleSidebar = function(force) {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (!sidebar) return;

    if (typeof force === 'boolean') {
        sidebar.classList.toggle("active", force);
        if (overlay) overlay.classList.toggle("active", force);
    } else {
        sidebar.classList.toggle("active");
        if (overlay) overlay.classList.toggle("active");
    }
};

window.closeModal = function() {
    const modal = document.getElementById("detailsModal");
    if (modal) modal.classList.remove("active");
};

window.closeModalOnOutsideClick = function(event) {
    if (event.target.classList.contains("modal-overlay")) {
        closeModal();
    }
};
