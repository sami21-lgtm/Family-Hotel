
const defaultAdminUser = {
    name: "MD. EMTIAZ HOSSAIN SAMI",
    role: "Admin",
    photo: "Md. EmTIAZ hOSSAIN sAMI LOGO.png",
    email: "admin@luxuryresort.com"
};


let currentUser = null;
const storedUser = localStorage.getItem("currentUser");

if (storedUser === null) {
    currentUser = defaultAdminUser;
    localStorage.setItem("currentUser", JSON.stringify(defaultAdminUser));
} else if (storedUser === "LOGGED_OUT") {
    currentUser = null;
} else {
    try {
        currentUser = JSON.parse(storedUser);
    } catch (e) {
        currentUser = defaultAdminUser;
    }
}

let defaultGuestProfile = {
    fName: "Guest",
    lName: "User",
    email: "guest@example.com",
    phone: "+8801700000000",
    photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"
};

// জিরো (0) থেকে শুরু করার জন্য বুকিং লিস্ট ফাঁকা
let defaultBookingsList = [];

// LocalStorage Data Load
let guestProfileData = JSON.parse(localStorage.getItem("guestProfileData")) || defaultGuestProfile;
let bookingsList = JSON.parse(localStorage.getItem("bookingsList")) || defaultBookingsList;

// Room Catalog Data
const roomCatalog = [
    { title: "Single Standard Room", price: 800, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600", desc: "Cozy room with free Wi-Fi and basic amenities." },
    { title: "Single Executive Room", price: 1000, img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600", desc: "Work desk, high-speed internet, and ergonomic chair." },
    { title: "Deluxe Double Room", price: 5000, img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600", desc: "Spacious room with king bed and balcony view." },
    { title: "Super Deluxe Double Room", price: 7500, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600", desc: "Luxury bedding, city view, and complimentary breakfast." },
    { title: "Executive Double Ocean View", price: 10000, img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600", desc: "Panoramic view of the ocean with luxury Jacuzzi." },
    { title: "Royal Family Suite", price: 20000, img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600", desc: "2 Bedrooms, living hall, dining area and private butler." },
    { title: "Presidential VIP Suite", price: 35000, img: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=600", desc: "Top floor penthouse view, private lounge & helicopter pad access." },
    { title: "Royal Palace Villa", price: 50000, img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600", desc: "Private villa with infinity pool, personal chef and garden." }
];

// Services Catalog Data
const serviceCatalog = [
    { 
        title: "Bengali Traditional Feast", 
        category: "Dining", 
        price: 500, 
        icon: "fa-utensils", 
        img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600", 
        desc: "Authentic Kacchi Biryani, Hilsha Fish, Borhani & Sweets." 
    },
    { 
        title: "Authentic Thai Gourmet", 
        category: "Dining", 
        price: 750, 
        icon: "fa-bowl-food", 
        img: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600", 
        desc: "Spicy Tom Yum Goong, Pad Thai, and Mango Sticky Rice." 
    },
    { 
        title: "Continental Buffet", 
        category: "Dining", 
        price: 1200, 
        icon: "fa-concierge-bell", 
        img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600", 
        desc: "Unlimited global cuisines prepared by international chefs." 
    },
    { 
        title: "Morning Swimming Pool Pass", 
        category: "Pool", 
        price: 300, 
        icon: "fa-water", 
        img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600", 
        desc: "Access to Olympic Pool (06:00 AM - 11:00 AM)." 
    },
    { 
        title: "Night Infinity Pool Pass", 
        category: "Pool", 
        price: 500, 
        icon: "fa-person-swimming", 
        img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600", 
        desc: "Access to Rooftop Infinity Pool (04:00 PM - 10:00 PM)." 
    },
    { 
        title: "VIP Fitness & Gym Day Pass", 
        category: "Fitness", 
        price: 400, 
        icon: "fa-dumbbell", 
        img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600", 
        desc: "Full access to modern gym equipment & personal trainer." 
    }
];

/* ==================================================================
   2. INITIALIZATION & LIVE CLOCK
   ================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initClock();
    
    if (currentUser) {
        updateUserUI();
        closeLoginModal();
    } else {
        openLoginModal();
    }

    renderDashboard();
    renderGuestDirectory();
    renderRoomsCard();
    renderServicesCard();
    
    // Default dates in Booking Form
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    
    if (document.getElementById("checkIn")) document.getElementById("checkIn").value = today;
    if (document.getElementById("checkOut")) document.getElementById("checkOut").value = tomorrow;
    
    calculateBilling();
});

function initClock() {
    function updateTime() {
        const now = new Date();
        const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const dateStr = now.toLocaleDateString('en-US', dateOptions);
        const timeStr = now.toLocaleTimeString('en-US', timeOptions);
        
        const clockEl = document.getElementById("currentDateDisplay");
        if (clockEl) {
            clockEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${dateStr} | ${timeStr}`;
        }
    }
    updateTime();
    setInterval(updateTime, 1000);
}

/* ==================================================================
   3. NAVIGATION & SIDEBAR CONTROLS
   ================================================================== */
function switchTab(tabId) {
    const pages = document.querySelectorAll(".tab-page");
    pages.forEach(page => page.classList.remove("active"));
    
    const targetPage = document.getElementById(`tab-${tabId}`);
    if (targetPage) targetPage.classList.add("active");
    
    const navItems = document.querySelectorAll(".nav-item, .m-nav-item");
    navItems.forEach(item => {
        if (item.getAttribute("data-tab") === tabId) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    toggleSidebar(false);
}

function toggleSidebar(forceState) {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    
    if (!sidebar || !overlay) return;

    if (forceState !== undefined) {
        if (forceState) {
            sidebar.classList.add("active");
            overlay.classList.add("active");
        } else {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        }
    } else {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    }
}

/* ==================================================================
   4. AUTHENTICATION & LOGIN/GUEST MODAL
   ================================================================== */
function openLoginModal() {
    const modal = document.getElementById("loginModal");
    if (modal) {
        modal.classList.add("active");
        modal.style.display = "flex";
    }
}

function closeLoginModal() {
    const modal = document.getElementById("loginModal");
    if (modal) {
        modal.classList.remove("active");
        modal.style.display = "none";
    }
}

function previewUploadImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("previewImg").src = e.target.result;
            guestProfileData.photo = e.target.result;
            localStorage.setItem("guestProfileData", JSON.stringify(guestProfileData));
        };
        reader.readAsDataURL(file);
    }
}

function updateGuestImageFromUrl() {
    const urlInput = document.getElementById("imgUrlInput").value.trim();
    if (urlInput) {
        document.getElementById("previewImg").src = urlInput;
        guestProfileData.photo = urlInput;
        localStorage.setItem("guestProfileData", JSON.stringify(guestProfileData));
    }
}

function handleLoginSubmit(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    
    currentUser = {
        name: "MD. EMTIAZ HOSSAIN SAMI",
        role: "Admin",
        photo: "Md. EmTIAZ hOSSAIN sAMI LOGO.png",
        email: email || "admin@luxuryresort.com"
    };
    
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    
    updateUserUI();
    closeLoginModal();
    switchTab("dashboard");
}

// 🟢 গেস্ট প্রবেশের জন্য আপডেট করা ফাংশন (কোনো নেভিগেশন করবে না)
function handleGuestLogin() {
    const fName = document.getElementById("fName")?.value.trim() || "Guest";
    const lName = document.getElementById("lName")?.value.trim() || "User";
    const email = document.getElementById("email")?.value.trim() || "guest@example.com";
    const phone = document.getElementById("phone")?.value.trim() || "+8801700000000";

    guestProfileData.fName = fName;
    guestProfileData.lName = lName;
    guestProfileData.email = email;
    guestProfileData.phone = phone;

    currentUser = {
        name: `${fName} ${lName}`,
        role: "Guest User",
        photo: guestProfileData.photo,
        email: email
    };

    localStorage.setItem("guestProfileData", JSON.stringify(guestProfileData));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    updateUserUI();
    closeLoginModal(); 
    // ❌ কোনো switchTab রাখা হয়নি, ইউজার সরাসরি বর্তমান পেজেই থাকবেন
}

function updateUserUI() {
    if (!currentUser) return;

    const sName = document.getElementById("sidebarUserName");
    const sRole = document.getElementById("sidebarUserRole");
    const sAvatar = document.getElementById("sidebarAvatar");

    if (sName) sName.innerText = currentUser.name;
    if (sRole) sRole.innerText = currentUser.role;
    if (sAvatar) sAvatar.src = currentUser.photo;

    const tAvatar = document.getElementById("topbarAvatar");
    const tAuthText = document.getElementById("topbarAuthText");

    if (tAvatar) tAvatar.src = currentUser.photo;
    if (tAuthText) tAuthText.innerText = "Logout";
}

function handleAuthButtonClick() {
    if (currentUser) {
        if (confirm("Are you sure you want to logout?")) {
            currentUser = null;
            localStorage.setItem("currentUser", "LOGGED_OUT");

            const sName = document.getElementById("sidebarUserName");
            const sRole = document.getElementById("sidebarUserRole");
            const sAvatar = document.getElementById("sidebarAvatar");
            const tAvatar = document.getElementById("topbarAvatar");
            const tAuthText = document.getElementById("topbarAuthText");

            if (sName) sName.innerText = "Guest User";
            if (sRole) sRole.innerText = "Visitor";
            if (sAvatar) sAvatar.src = "https://ui-avatars.com/api/?name=Guest&background=d4af37&color=fff";
            if (tAvatar) tAvatar.src = "https://ui-avatars.com/api/?name=Guest&background=d4af37&color=fff";
            if (tAuthText) tAuthText.innerText = "Login";

            openLoginModal();
        }
    } else {
        openLoginModal();
    }
}

/* ==================================================================
   5. BOOKING FORM & BILLING CALCULATION
   ================================================================== */
function calculateBilling() {
    const checkInVal = document.getElementById("checkIn")?.value;
    const checkOutVal = document.getElementById("checkOut")?.value;
    const roomSelectVal = document.getElementById("roomTypeSelect")?.value;
    
    if (!checkInVal || !checkOutVal || !roomSelectVal) return;

    const startDate = new Date(checkInVal);
    const endDate = new Date(checkOutVal);
    
    let nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    if (nights <= 0) nights = 1;

    const roomPrice = parseInt(roomSelectVal.split("|")[1]) || 800;
    const totalRoomCharge = roomPrice * nights;

    let addonsTotal = 0;
    document.querySelectorAll('input[name="foodMenu"]:checked').forEach(cb => {
        addonsTotal += (parseInt(cb.getAttribute("data-price")) || 0) * nights;
    });

    document.querySelectorAll('input[name="amenities"]:checked').forEach(cb => {
        addonsTotal += (parseInt(cb.getAttribute("data-price")) || 0) * nights;
    });

    const grandTotal = totalRoomCharge + addonsTotal;

    if (document.getElementById("billNights")) document.getElementById("billNights").innerText = `${nights} Night(s)`;
    if (document.getElementById("billRoom")) document.getElementById("billRoom").innerText = `৳${totalRoomCharge.toLocaleString()}`;
    if (document.getElementById("billAddons")) document.getElementById("billAddons").innerText = `৳${addonsTotal.toLocaleString()}`;
    if (document.getElementById("billTotal")) document.getElementById("billTotal").innerText = `৳${grandTotal.toLocaleString()} (Inc. Tax & Service Charge)`;
}

function togglePaymentDetails() {
    const method = document.getElementById("paymentMethodSelect").value;
    const onlineBox = document.getElementById("onlinePaymentDetails");
    const instructions = document.getElementById("paymentInstructions");

    if (method === "bkash" || method === "nagad") {
        onlineBox.style.display = "block";
        instructions.innerHTML = `Please Send Money (৳) to ${method.toUpperCase()} Number: <strong>+8801723434535</strong>`;
    } else if (method === "card") {
        onlineBox.style.display = "block";
        instructions.innerHTML = `Please provide your Card Details / Mobile Wallet reference below:`;
    } else {
        onlineBox.style.display = "none";
    }
}

function handleBookingSubmit(event) {
    event.preventDefault();

    if (!guestProfileData.fName || !guestProfileData.phone) {
        alert("Guest profile is missing! Please login first.");
        openLoginModal();
        return;
    }

    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;
    const roomSelectVal = document.getElementById("roomTypeSelect").value;
    const roomTitle = roomSelectVal.split("|")[0];
    const roomPrice = parseInt(roomSelectVal.split("|")[1]);

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    let nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    if (nights <= 0) nights = 1;

    const foodList = [];
    document.querySelectorAll('input[name="foodMenu"]:checked').forEach(cb => foodList.push(cb.value));

    const amenityList = [];
    document.querySelectorAll('input[name="amenities"]:checked').forEach(cb => amenityList.push(cb.value));

    let addOnPrice = 0;
    document.querySelectorAll('input[name="foodMenu"]:checked, input[name="amenities"]:checked').forEach(cb => {
        addOnPrice += (parseInt(cb.getAttribute("data-price")) || 0) * nights;
    });

    const grandTotal = (roomPrice * nights) + addOnPrice;

    const newBooking = {
        id: "GP-" + Math.floor(1000 + Math.random() * 9000),
        fName: guestProfileData.fName,
        lName: guestProfileData.lName,
        email: guestProfileData.email,
        phone: guestProfileData.phone,
        photo: guestProfileData.photo,
        roomType: roomTitle,
        checkIn: checkIn,
        checkOut: checkOut,
        nights: nights,
        totalBill: grandTotal,
        status: "Confirmed",
        food: foodList,
        amenities: amenityList
    };

    bookingsList.unshift(newBooking);
    localStorage.setItem("bookingsList", JSON.stringify(bookingsList));

    renderDashboard();
    renderGuestDirectory();
    
    alert(`🎉 Reservation Confirmed Successfully!\nBooking ID: ${newBooking.id}\nTotal Bill: ৳${grandTotal.toLocaleString()}`);
    switchTab("dashboard");
}

function resetForm() {
    document.getElementById("reservationForm").reset();
    calculateBilling();
}

/* ==================================================================
   6. RENDERING DASHBOARD & TABLES
   ================================================================== */
function renderDashboard() {
    const totalBookings = bookingsList.length;
    const totalRevenue = bookingsList.reduce((sum, b) => sum + b.totalBill, 0);
    
    let poolCount = 0;
    let diningCount = 0;

    bookingsList.forEach(b => {
        if (b.amenities && b.amenities.some(a => a.toLowerCase().includes("pool"))) poolCount++;
        if (b.food && b.food.length > 0) diningCount++;
    });

    if (document.getElementById("statTotalBookings")) document.getElementById("statTotalBookings").innerText = totalBookings;
    if (document.getElementById("statRevenue")) document.getElementById("statRevenue").innerText = `৳${totalRevenue.toLocaleString()}`;
    if (document.getElementById("statPoolPass")) document.getElementById("statPoolPass").innerText = poolCount;
    if (document.getElementById("statDiningOrders")) document.getElementById("statDiningOrders").innerText = diningCount;

    const tbody = document.getElementById("dashboardTableBody");
    if (!tbody) return;

    if (bookingsList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 20px; color: var(--text-muted);">No recent check-ins found.</td></tr>`;
        return;
    }

    tbody.innerHTML = bookingsList.slice(0, 5).map(b => `
        <tr>
            <td>
                <img src="${b.photo}" alt="${b.fName}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid var(--primary-gold);">
            </td>
            <td><strong>${b.id}</strong></td>
            <td>${b.fName} ${b.lName}</td>
            <td>${b.roomType}</td>
            <td><small>${b.checkIn} to ${b.checkOut}</small></td>
            <td><strong style="color: #10B981;">৳${b.totalBill.toLocaleString()}</strong></td>
            <td><span class="badge-status">${b.status}</span></td>
        </tr>
    `).join('');
}

function renderGuestDirectory() {
    const tbody = document.getElementById("fullBookingsTableBody");
    if (!tbody) return;

    if (bookingsList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 20px; color: var(--text-muted);">No reservations found.</td></tr>`;
        return;
    }

    tbody.innerHTML = bookingsList.map(b => `
        <tr>
            <td>
                <img src="${b.photo}" alt="${b.fName}" style="width: 45px; height: 45px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary-gold);">
            </td>
            <td><strong>${b.id}</strong></td>
            <td>
                <strong>${b.fName} ${b.lName}</strong><br>
                <small style="color: var(--text-muted);">${b.phone} | ${b.email}</small>
            </td>
            <td>${b.roomType}</td>
            <td>${b.checkIn} → ${b.checkOut} (${b.nights} N)</td>
            <td><strong style="color: #10B981;">৳${b.totalBill.toLocaleString()}</strong></td>
            <td>
                <button onclick="viewBookingDetails('${b.id}')" style="padding: 5px 10px; background: rgba(212,175,55,0.2); border: 1px solid #d4af37; color: #d4af37; border-radius: 4px; cursor: pointer; font-size: 0.78rem;">
                    <i class="fa-solid fa-eye"></i> Details
                </button>
            </td>
        </tr>
    `).join('');
}

/* ==================================================================
   7. ROOMS & SERVICES CARDS RENDER
   ================================================================== */
function renderRoomsCard() {
    const grid = document.getElementById("roomsCardsGrid");
    if (!grid) return;

    grid.innerHTML = roomCatalog.map(room => `
        <div class="stat-card" style="flex-direction: column; align-items: flex-start; padding: 0; overflow: hidden; background: var(--bg-card);">
            <img src="${room.img}" alt="${room.title}" style="width: 100%; height: 180px; object-fit: cover;">
            <div style="padding: 16px; width: 100%;">
                <h3 style="font-family: var(--font-serif); font-size: 1.1rem; color: #fff; margin-bottom: 6px;">${room.title}</h3>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">${room.desc}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: var(--primary-gold); font-size: 1rem;">৳${room.price.toLocaleString()} / night</strong>
                    <button onclick="quickBookRoom('${room.title}', ${room.price})" style="padding: 6px 14px; background: #d4af37; color: #000; border: none; font-weight: bold; border-radius: 4px; cursor: pointer;">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderServicesCard() {
    const grid = document.getElementById("servicesCardsGrid");
    if (!grid) return;

    grid.innerHTML = serviceCatalog.map(srv => `
        <div class="stat-card" style="flex-direction: column; align-items: flex-start; padding: 0; overflow: hidden; background: var(--bg-card); border: 1px solid rgba(212,175,55,0.2); border-radius: 8px;">
            <div style="position: relative; width: 100%;">
                <img src="${srv.img}" alt="${srv.title}" style="width: 100%; height: 160px; object-fit: cover;">
                <span style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.75); color: var(--primary-gold); padding: 4px 10px; border-radius: 4px; font-size: 0.7rem; font-weight: bold; border: 1px solid var(--primary-gold);">
                    <i class="fa-solid ${srv.icon}"></i> ${srv.category}
                </span>
            </div>
            <div style="padding: 16px; width: 100%;">
                <h4 style="color: #fff; font-size: 1rem; margin-bottom: 6px;">${srv.title}</h4>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px; line-height: 1.4;">${srv.desc}</p>
                <strong style="color: #10B981; font-size: 0.95rem;">+৳${srv.price.toLocaleString()} / day</strong>
            </div>
        </div>
    `).join('');
}

function quickBookRoom(title, price) {
    switchTab("booking");
    const select = document.getElementById("roomTypeSelect");
    if (select) {
        select.value = `${title}|${price}`;
        calculateBilling();
    }
}

/* ==================================================================
   8. MODAL POPUP HELPERS
   ================================================================== */
function viewBookingDetails(bookingId) {
    const b = bookingsList.find(item => item.id === bookingId);
    if (!b) return;

    const modalContent = document.getElementById("modalContent");
    if (!modalContent) return;

    modalContent.innerHTML = `
        <div style="padding: 24px;">
            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                <img src="${b.photo}" alt="${b.fName}" style="width: 70px; height: 70px; border-radius: 50%; border: 3px solid #d4af37; object-fit: cover;">
                <div>
                    <h2 style="color: #fff; font-family: var(--font-serif);">${b.fName} ${b.lName}</h2>
                    <p style="color: var(--primary-gold); font-size: 0.85rem;">Booking ID: ${b.id}</p>
                </div>
            </div>
            <div style="font-size: 0.88rem; color: #cbd5e1; display: flex; flex-direction: column; gap: 8px;">
                <p><strong>Email:</strong> ${b.email}</p>
                <p><strong>Phone:</strong> ${b.phone}</p>
                <p><strong>Room Category:</strong> ${b.roomType}</p>
                <p><strong>Check-In / Out:</strong> ${b.checkIn} to ${b.checkOut} (${b.nights} Nights)</p>
                <p><strong>Meals Included:</strong> ${b.food && b.food.length > 0 ? b.food.join(', ') : 'None'}</p>
                <p><strong>Amenities:</strong> ${b.amenities && b.amenities.length > 0 ? b.amenities.join(', ') : 'None'}</p>
                <hr style="border-color: var(--border-color); margin: 10px 0;">
                <p style="font-size: 1.1rem; color: #10B981;"><strong>Total Bill Paid:</strong> ৳${b.totalBill.toLocaleString()}</p>
            </div>
        </div>
    `;

    document.getElementById("detailsModal").classList.add("active");
}

function closeModal() {
    const modal = document.getElementById("detailsModal");
    if (modal) modal.classList.remove("active");
}

function closeModalOnOutsideClick(event) {
    if (event.target.id === "detailsModal") {
        closeModal();
    }
}
