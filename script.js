// Global State & Data Store
let currentUser = { name: "MD. EMTIAZ HOSSAIN SAMI", role: "Admin", isLogged: false };
let bookingsList = [];

document.addEventListener("DOMContentLoaded", () => {
    initLiveClock();
    setDefaultDates();
    calculateBilling();
});

// Tab Switcher Function
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

// Continue as Guest Handler (Directly opens New Guest Booking Tab)
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
    loginModal.classList.remove("active");

    // Automatically switch directly to 'New Guest Booking' tab
    switchTab('booking');
};

// Admin Login Handler
window.handleLoginSubmit = function(event) {
    event.preventDefault();
    currentUser = {
        name: "MD. EMTIAZ HOSSAIN SAMI",
        role: "Admin",
        isLogged: true
    };

    updateUserInterface();

    const loginModal = document.getElementById("loginModal");
    loginModal.classList.remove("active");

    switchTab('dashboard');
};

// Topbar Auth Button Click (Login / Logout Toggle)
window.handleAuthButtonClick = function() {
    const loginModal = document.getElementById("loginModal");
    loginModal.classList.add("active");
};

function updateUserInterface() {
    document.getElementById("sidebarUserName").textContent = currentUser.name;
    document.getElementById("sidebarUserRole").textContent = currentUser.role;
    document.getElementById("topbarAuthText").textContent = currentUser.isLogged ? "Logout" : "Login";
}

// Live Clock Initializer
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

// Form Date Handling & Billing
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

window.calculateBilling = function() {
    const checkInVal = document.getElementById("checkIn").value;
    const checkOutVal = document.getElementById("checkOut").value;
    const roomSelect = document.getElementById("roomTypeSelect");

    if (!checkInVal || !checkOutVal || !roomSelect) return;

    const d1 = new Date(checkInVal);
    const d2 = new Date(checkOutVal);
    let nights = Math.ceil((d2 - d1) / (1000 * 3600 * 24));
    if (nights <= 0) nights = 1;

    const roomPrice = parseInt(roomSelect.value.split('|')[1] || "800", 10);
    const roomTotal = roomPrice * nights;

    let addonsTotal = 0;
    document.querySelectorAll('input[name="foodMenu"]:checked, input[name="amenities"]:checked').forEach(cb => {
        addonsTotal += parseInt(cb.getAttribute("data-price") || "0", 10) * nights;
    });

    const grandTotal = roomTotal + addonsTotal;

    document.getElementById("billNights").textContent = `${nights} Night(s)`;
    document.getElementById("billRoom").textContent = `৳${roomTotal.toLocaleString()}`;
    document.getElementById("billAddons").textContent = `৳${addonsTotal.toLocaleString()}`;
    document.getElementById("billTotal").textContent = `৳${grandTotal.toLocaleString()} (Inc. Tax & Service Charge)`;
};

window.togglePaymentDetails = function() {
    const method = document.getElementById("paymentMethodSelect").value;
    const detailsBox = document.getElementById("onlinePaymentDetails");
    if (detailsBox) {
        detailsBox.style.display = (method === 'bkash' || method === 'nagad') ? 'block' : 'none';
    }
};

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

window.resetForm = function() {
    document.getElementById("reservationForm").reset();
    setDefaultDates();
    calculateBilling();
};

window.toggleSidebar = function(force) {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (!sidebar) return;

    if (typeof force === 'boolean') {
        sidebar.classList.toggle("active", force);
        overlay.classList.toggle("active", force);
    } else {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    }
};

window.closeModal = function() {
    document.getElementById("detailsModal").classList.remove("active");
};

window.closeModalOnOutsideClick = function(event) {
    if (event.target.classList.contains("modal-overlay")) {
        closeModal();
    }
};
