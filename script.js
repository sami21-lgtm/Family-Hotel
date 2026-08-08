// ==========================================
// GRAND PALACE RESORT & SPA
// COMPLETE UPDATED JAVASCRIPT
// ==========================================


// ==========================================
// 1. GLOBAL STATE & SECURITY
// ==========================================

let currentRole = 'admin';
// Available roles:
// admin, frontdesk, housekeeping, finance, guest

let isStaffAuthenticated = false;

let currentUser = {
    role: 'ADMINISTRATOR',
    name: 'MD. EMTIAZ HOSSAIN SAMI',
    email: 'admin@grandpalace.com',
    avatar: 'Md. EmTIAZ hOSSAIN sAMI LOGO.png'
};


// ==========================================
// ROOMS INVENTORY DATABASE
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
// 2. ACTIVE BOOKINGS REGISTRY
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


// ==========================================
// 3. REGISTERED GUEST DIRECTORY
// ==========================================

let guests = [

    {
        id: "G-101",
        name: "Arif Chowdhury",
        email: "arif@example.com",
        phone: "+8801711112233",
        avatar: "https://ui-avatars.com/api/?name=Arif+Chowdhury&background=c5a880&color=fff"
    },

    {
        id: "G-102",
        name: "Sultana Rahman",
        email: "sultana@example.com",
        phone: "+8801822223344",
        avatar: "https://ui-avatars.com/api/?name=Sultana+Rahman&background=c5a880&color=fff"
    }

];


// ==========================================
// 4. HELPER FUNCTIONS
// ==========================================

// Escape HTML safely
function escapeHTML(str) {

    if (str === null || str === undefined) {
        return '';
    }

    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

}


// ==========================================
// CALCULATE NIGHT COUNT
// ==========================================

function getNightsBetween(checkInStr, checkOutStr) {

    if (!checkInStr || !checkOutStr) {
        return 1;
    }

    const diffTime =
        new Date(checkOutStr) - new Date(checkInStr);

    const diffDays =
        Math.round(diffTime / (1000 * 3600 * 24));

    return diffDays > 0 ? diffDays : 1;
}


// ==========================================
// 5. INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    initClock();

    setupDefaultDates();

    populateRoomDropdown();

    // Initial Render
    renderAll();

    calculateTotal();


    // ==========================================
    // RESERVATION FORM EVENTS
    // ==========================================

    const resForm =
        document.getElementById('reservationForm');

    if (resForm) {

        resForm.addEventListener(
            'change',
            calculateTotal
        );

        resForm.addEventListener(
            'input',
            calculateTotal
        );

    }


    // ==========================================
    // STAFF LOGIN
    // ==========================================

    const staffForm =
        document.getElementById('staffLoginForm');

    if (staffForm) {

        staffForm.addEventListener(
            'submit',
            handleStaffLogin
        );

    }


    const staffLoginBtn =
        document.getElementById('staffLoginSubmitBtn');

    if (staffLoginBtn) {

        staffLoginBtn.addEventListener(
            'click',
            function (e) {

                e.preventDefault();

                handleStaffLogin(e);

            }
        );

    }


    // ==========================================
    // ENTER KEY FOR LOGIN
    // ==========================================

    const staffPassField =
        document.getElementById('loginPasswordInput');

    if (staffPassField) {

        staffPassField.addEventListener(
            'keydown',
            function (e) {

                if (e.key === 'Enter') {

                    e.preventDefault();

                    handleStaffLogin(e);

                }

            }
        );

    }


    // ==========================================
    // INITIAL ROLE SETUP
    // ==========================================

    switchUserRole(currentRole);

});


// ==========================================
// 6. CLOCK
// ==========================================

function initClock() {

    const clockEl =
        document.getElementById('currentDateDisplay');

    const update = () => {

        const now = new Date();

        if (clockEl) {

            clockEl.innerHTML =
                `<i class="fa-regular fa-clock"></i> 
                ${now.toLocaleDateString('en-GB')} | 
                ${now.toLocaleTimeString()}`;

        }

    };

    update();

    setInterval(update, 1000);

}


// ==========================================
// 7. DEFAULT DATES
// ==========================================

function setupDefaultDates() {

    const today =
        new Date().toISOString().split('T')[0];

    const tomorrow =
        new Date(
            Date.now() + 86400000
        ).toISOString().split('T')[0];


    const cIn =
        document.getElementById('checkIn');

    const cOut =
        document.getElementById('checkOut');


    if (cIn) {
        cIn.value = today;
    }

    if (cOut) {
        cOut.value = tomorrow;
    }

}


// ==========================================
// 8. RENDER ALL
// ==========================================

function renderAll() {

    renderDashboard();

    renderRooms();

    renderFrontDesk();

    renderHousekeeping();

    renderFinance();

    renderGuests();

}


// ==========================================
// 9. AUTHENTICATION & ROLE MANAGEMENT
// ==========================================


// ------------------------------------------
// SWITCH AUTH FORM
// ------------------------------------------

function switchAuthForm(type) {

    const guestForm =
        document.getElementById('guestLoginForm');

    const staffForm =
        document.getElementById('staffLoginForm');

    const btnGuest =
        document.getElementById('btnGuestAuth');

    const btnStaff =
        document.getElementById('btnStaffAuth');


    if (type === 'staff') {

        if (guestForm) {
            guestForm.style.display = 'none';
        }

        if (staffForm) {
            staffForm.style.display = 'block';
        }

        if (btnGuest) {
            btnGuest.classList.remove('active');
        }

        if (btnStaff) {
            btnStaff.classList.add('active');
        }

    } else {

        if (guestForm) {
            guestForm.style.display = 'block';
        }

        if (staffForm) {
            staffForm.style.display = 'none';
        }

        if (btnGuest) {
            btnGuest.classList.add('active');
        }

        if (btnStaff) {
            btnStaff.classList.remove('active');
        }

    }

}


// ------------------------------------------
// ADMIN LOGIN
// ------------------------------------------

function handleStaffLogin(event) {

    if (event) {
        event.preventDefault();
    }


    const emailField =
        document.getElementById('loginEmail');

    const passField =
        document.getElementById('loginPasswordInput');


    const email =
        emailField
            ? emailField.value.trim()
            : '';

    const password =
        passField
            ? passField.value.trim()
            : '';


    const ADMIN_EMAIL =
        "admin@grandpalace.com";

    const ADMIN_PASS =
        "admin123";


    if (!email || !password) {

        alert(
            "Please enter both Email and Password!"
        );

        return;
    }


    if (
        email.toLowerCase() ===
        ADMIN_EMAIL.toLowerCase()
        &&
        password === ADMIN_PASS
    ) {

        isStaffAuthenticated = true;

        document.body.classList.remove(
            'logged-out'
        );


        const loginModal =
            document.getElementById('loginModal');

        if (loginModal) {
            loginModal.classList.remove('active');
        }


        currentUser = {

            role: 'ADMINISTRATOR',

            name: 'MD. EMTIAZ HOSSAIN SAMI',

            email: ADMIN_EMAIL,

            avatar: 'Md. EmTIAZ hOSSAIN sAMI LOGO.png'

        };


        switchUserRole('admin');


        const nameEl =
            document.getElementById('sidebarUserName');

        const roleEl =
            document.getElementById('sidebarUserRole');


        if (nameEl) {
            nameEl.innerText =
                "MD. EMTIAZ HOSSAIN SAMI";
        }

        if (roleEl) {
            roleEl.innerText =
                "Role: ADMINISTRATOR";
        }


        alert("Welcome Back, Admin!");

    } else {

        alert(
            "❌ Invalid credentials!\n\n" +
            "Email: admin@grandpalace.com\n" +
            "Password: admin123"
        );

    }

}


// ------------------------------------------
// GUEST LOGIN
// ------------------------------------------

function handleGuestLoginSubmit(event) {

    if (event) {
        event.preventDefault();
    }


    const name =
        document.getElementById(
            'guestAuthName'
        )?.value.trim()
        || "Valued Guest";


    const email =
        document.getElementById(
            'guestAuthEmail'
        )?.value.trim()
        || "";


    const phone =
        document.getElementById(
            'guestAuthPhone'
        )?.value.trim()
        || "";


    const previewImg =
        document.getElementById(
            'guestAuthPreviewImg'
        )?.src;


    currentUser = {

        role: 'GUEST',

        name: name,

        email: email,

        phone: phone,

        avatar:
            previewImg
            ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=c5a880&color=fff`

    };


    document.body.classList.remove(
        'logged-out'
    );


    const loginModal =
        document.getElementById('loginModal');

    if (loginModal) {
        loginModal.classList.remove('active');
    }


    switchUserRole('guest');


    const nameEl =
        document.getElementById('sidebarUserName');

    const roleEl =
        document.getElementById('sidebarUserRole');


    if (nameEl) {
        nameEl.innerText = name;
    }

    if (roleEl) {
        roleEl.innerText = "Role: GUEST";
    }


    alert(
        `🎉 Welcome ${name} to Grand Palace Resort & Spa!`
    );

}


// ==========================================
// ROLE SWITCHER
// ==========================================

function switchUserRole(role) {

    currentRole = role;


    // Role selector
    const selector =
        document.getElementById('roleSelector');

    if (selector) {
        selector.value = role;
    }


    // ==========================================
    // BODY CLASS
    // ==========================================

    if (role === 'guest') {

        document.body.classList.add(
            'role-guest'
        );

    } else {

        document.body.classList.remove(
            'role-guest'
        );

    }


    // ==========================================
    // NAVIGATION FILTERING
    // ==========================================

    document
        .querySelectorAll('.nav-item')
        .forEach(item => {

            if (role === 'admin') {

                item.style.display = 'flex';

            } else if (
                item.classList.contains(
                    `role-${role}`
                )
            ) {

                item.style.display = 'flex';

            } else {

                item.style.display = 'none';

            }

        });


    // ==========================================
    // ADMIN ONLY ELEMENTS
    // ==========================================

    document
        .querySelectorAll('.role-admin-only')
        .forEach(element => {

            if (role === 'admin') {

                element.style.display = '';

            } else {

                element.style.display = 'none';

            }

        });


    // ==========================================
    // ADD NEW ROOM BUTTON
    // ==========================================

    document
        .querySelectorAll(
            '#addNewRoomBtn, .add-new-room-btn'
        )
        .forEach(button => {

            if (role === 'admin') {

                button.style.display = '';

            } else {

                button.style.display = 'none';

            }

        });


    // ==========================================
    // RE-RENDER ROOMS
    // ==========================================

    renderRooms();


    // ==========================================
    // DEFAULT TAB
    // ==========================================

    if (role === 'guest') {

        switchTab('tabRooms');

    } else {

        switchTab('tabDashboard');

    }

}


// ==========================================
// LOGOUT
// ==========================================

function logoutUser() {

    isStaffAuthenticated = false;

    document.body.classList.add(
        'logged-out'
    );


    const loginModal =
        document.getElementById('loginModal');

    if (loginModal) {
        loginModal.classList.add('active');
    }

}


// ==========================================
// 10. NAVIGATION & TAB SWITCHER
// ==========================================

function switchTab(tabId) {

    document
        .querySelectorAll('.tab-page')
        .forEach(page => {

            page.classList.remove('active');

        });


    document
        .querySelectorAll('.nav-item')
        .forEach(nav => {

            nav.classList.remove('active');

        });


    const targetPage =
        document.getElementById(tabId);

    if (targetPage) {

        targetPage.classList.add('active');

    }


    const activeNav =
        document.querySelector(
            `.nav-item[onclick*="${tabId}"]`
        );

    if (activeNav) {

        activeNav.classList.add('active');

    }


    toggleSidebar(false);

}


// ==========================================
// SIDEBAR TOGGLE
// ==========================================

function toggleSidebar(forceState) {

    const sidebar =
        document.getElementById('sidebar');

    const overlay =
        document.getElementById('sidebarOverlay');


    if (!sidebar) {
        return;
    }


    const isOpen =
        forceState !== undefined
            ? forceState
            : !sidebar.classList.contains('open');


    if (isOpen) {

        sidebar.classList.add('open');

        if (overlay) {
            overlay.classList.add('active');
        }

    } else {

        sidebar.classList.remove('open');

        if (overlay) {
            overlay.classList.remove('active');
        }

    }

}


// ==========================================
// 11. BOOKING CALCULATOR
// ==========================================

function populateRoomDropdown() {

    const select =
        document.getElementById(
            'roomTypeSelect'
        );


    if (!select) {
        return;
    }


    select.innerHTML = roomList.map(room => {

        return `
            <option value="${room.id}|${escapeHTML(room.title)}|${room.price}">
                Room ${room.id} - 
                ${escapeHTML(room.title)}
                (৳${room.price.toLocaleString()}/night)
            </option>
        `;

    }).join('');

}


// ==========================================
// CALCULATE TOTAL
// ==========================================

function calculateTotal() {

    const checkIn =
        document.getElementById(
            'checkIn'
        )?.value;


    const checkOut =
        document.getElementById(
            'checkOut'
        )?.value;


    const roomSelect =
        document.getElementById(
            'roomTypeSelect'
        )?.value;


    const nights =
        getNightsBetween(
            checkIn,
            checkOut
        );


    let roomPrice =
        roomSelect
            ? parseFloat(
                roomSelect.split('|')[2]
            ) || 0
            : 0;


    let roomTotal =
        roomPrice * nights;


    let addonsTotal = 0;


    document
        .querySelectorAll(
            'input[name="foodMenu"]:checked, input[name="amenities"]:checked'
        )
        .forEach(cb => {

            addonsTotal +=
                parseFloat(
                    cb.getAttribute(
                        'data-price'
                    )
                ) || 0;

        });


    const grandTotal =
        roomTotal + addonsTotal;


    const billNights =
        document.getElementById(
            'billNights'
        );

    const billRoom =
        document.getElementById(
            'billRoom'
        );

    const billAddons =
        document.getElementById(
            'billAddons'
        );

    const billTotal =
        document.getElementById(
            'billTotal'
        );


    if (billNights) {

        billNights.textContent =
            `${nights} Night(s)`;

    }


    if (billRoom) {

        billRoom.textContent =
            `৳${roomTotal.toLocaleString()}`;

    }


    if (billAddons) {

        billAddons.textContent =
            `৳${addonsTotal.toLocaleString()}`;

    }


    if (billTotal) {

        billTotal.textContent =
            `৳${grandTotal.toLocaleString()}`;

    }


    return grandTotal;

}


// ==========================================
// PAYMENT DETAILS
// ==========================================

function togglePaymentDetails() {

    const method =
        document.getElementById(
            'paymentMethodSelect'
        )?.value;


    const detailsDiv =
        document.getElementById(
            'onlinePaymentDetails'
        );


    const instructions =
        document.getElementById(
            'paymentInstructions'
        );


    if (!detailsDiv || !instructions) {
        return;
    }


    if (method === 'cash') {

        detailsDiv.style.display = 'none';

    } else {

        detailsDiv.style.display = 'block';


        if (method === 'bkash') {

            instructions.innerHTML =
                "<b>bKash Merchant Payment:</b> " +
                "Send money to <code>01700000000</code> " +
                "with your booking ID.";

        }

        else if (method === 'nagad') {

            instructions.innerHTML =
                "<b>Nagad Merchant Payment:</b> " +
                "Send money to <code>01800000000</code>.";

        }

        else {

            instructions.innerHTML =
                "<b>Online Gateway:</b> " +
                "You will be redirected to complete secure card payment.";

        }

    }

}


// ==========================================
// 12. BOOKING SUBMISSION
// ==========================================

function handleBookingSubmit(event) {

    if (event) {
        event.preventDefault();
    }


    const name =
        document.getElementById(
            'bookingGuestName'
        )?.value.trim();


    const email =
        document.getElementById(
            'bookingGuestEmail'
        )?.value.trim();


    const phone =
        document.getElementById(
            'bookingGuestPhone'
        )?.value.trim();


    const checkIn =
        document.getElementById(
            'checkIn'
        )?.value;


    const checkOut =
        document.getElementById(
            'checkOut'
        )?.value;


    const roomSelect =
        document.getElementById(
            'roomTypeSelect'
        )?.value;


    const method =
        document.getElementById(
            'paymentMethodSelect'
        )?.value
        || "CASH";


    const previewImg =
        document.getElementById(
            'previewImg'
        )?.src;


    if (!name) {

        alert("⚠️ Please enter guest name!");

        return;

    }


    if (!roomSelect) {

        alert("⚠️ Please select a room!");

        return;

    }


    const [
        roomId,
        roomTitle
    ] = roomSelect.split('|');


    const room =
        roomList.find(
            r => r.id === roomId
        );


    if (!room) {

        alert("❌ Selected room not found!");

        return;

    }


    // Guest cannot book unavailable rooms
    if (
        currentRole === 'guest'
        &&
        room.status !== 'available'
    ) {

        alert(
            "⚠️ Sorry! This room is currently not available."
        );

        return;

    }


    const grandTotal =
        calculateTotal();


    const newBooking = {

        id:
            `GP-${Math.floor(
                1000 + Math.random() * 9000
            )}`,

        guestName: name,

        guestEmail: email,

        guestPhone: phone,

        roomNumber: roomId,

        roomType: roomTitle,

        checkIn: checkIn,

        checkOut: checkOut,

        totalBill: grandTotal,

        paymentMethod:
            method.toUpperCase(),

        status: "Confirmed",

        avatar:
            previewImg
            ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=c5a880&color=fff`

    };


    bookings.unshift(
        newBooking
    );


    // ==========================================
    // SAVE GUEST TO DIRECTORY
    // ==========================================

    if (
        !guests.some(
            g =>
                g.email.toLowerCase()
                ===
                email.toLowerCase()
        )
    ) {

        guests.push({

            id:
                `G-${Math.floor(
                    100 + Math.random() * 900
                )}`,

            name: name,

            email: email,

            phone: phone,

            avatar: newBooking.avatar

        });

    }


    // ==========================================
    // UPDATE ROOM STATUS
    // ==========================================

    room.status = "occupied";


    // Update UI
    populateRoomDropdown();

    renderAll();


    alert(
        `🎉 Booking Confirmed Successfully!\n\n` +
        `Invoice ID: ${newBooking.id}\n` +
        `Guest: ${name}\n` +
        `Room: ${roomId}\n` +
        `Total: ৳${grandTotal.toLocaleString()}`
    );


    resetForm();


    if (currentRole === 'guest') {

        switchTab('tabRooms');

    } else {

        switchTab('tabDashboard');

    }

}


// ==========================================
// BOOK ROOM DIRECTLY FROM BROWSE ROOMS
// ==========================================

function bookRoomFromBrowse(roomId) {

    const room =
        roomList.find(
            r => r.id === roomId
        );


    if (!room) {

        alert("❌ Room not found!");

        return;

    }


    // Only available room can be booked
    if (room.status !== 'available') {

        alert(
            "⚠️ This room is currently not available."
        );

        return;

    }


    // ==========================================
    // SELECT ROOM IN BOOKING DROPDOWN
    // ==========================================

    const roomSelect =
        document.getElementById(
            'roomTypeSelect'
        );


    if (roomSelect) {

        const targetValue =
            `${room.id}|${room.title}|${room.price}`;


        const optionExists =
            Array.from(
                roomSelect.options
            ).some(
                option =>
                    option.value === targetValue
            );


        if (optionExists) {

            roomSelect.value =
                targetValue;

        }

    }


    // ==========================================
    // AUTO-FILL GUEST INFORMATION
    // ==========================================

    if (currentRole === 'guest') {

        const guestNameField =
            document.getElementById(
                'bookingGuestName'
            );


        const guestEmailField =
            document.getElementById(
                'bookingGuestEmail'
            );


        const guestPhoneField =
            document.getElementById(
                'bookingGuestPhone'
            );


        if (
            guestNameField
            &&
            currentUser.name
        ) {

            guestNameField.value =
                currentUser.name;

        }


        if (
            guestEmailField
            &&
            currentUser.email
        ) {

            guestEmailField.value =
                currentUser.email;

        }


        if (
            guestPhoneField
            &&
            currentUser.phone
        ) {

            guestPhoneField.value =
                currentUser.phone;

        }

    }


    // ==========================================
    // FIND BOOKING TAB
    // ==========================================

    const reservationForm =
        document.getElementById(
            'reservationForm'
        );


    let bookingTabFound = false;


    if (reservationForm) {

        const parentTab =
            reservationForm.closest(
                '.tab-page'
            );


        if (
            parentTab
            &&
            parentTab.id
        ) {

            switchTab(
                parentTab.id
            );

            bookingTabFound = true;

        }

    }


    // ==========================================
    // FALLBACK BOOKING TAB IDs
    // ==========================================

    if (!bookingTabFound) {

        const possibleTabs = [

            'tabReservation',

            'tabBooking',

            'tabNewBooking',

            'tabReservationForm',

            'tabFrontDesk'

        ];


        const availableTab =
            possibleTabs.find(
                id =>
                    document.getElementById(id)
            );


        if (availableTab) {

            switchTab(
                availableTab
            );

        }

    }


    // Recalculate bill
    calculateTotal();


    // Scroll to form
    setTimeout(() => {

        if (reservationForm) {

            reservationForm.scrollIntoView({

                behavior: 'smooth',

                block: 'start'

            });

        }

    }, 150);

}


// ==========================================
// RESET BOOKING FORM
// ==========================================

function resetForm() {

    const form =
        document.getElementById(
            'reservationForm'
        );


    if (form) {

        form.reset();

    }


    setupDefaultDates();

    calculateTotal();

}


// ==========================================
// 13. DASHBOARD
// ==========================================

function renderDashboard() {

    const totalBookingsEl =
        document.getElementById(
            'statTotalBookings'
        );


    const totalRevEl =
        document.getElementById(
            'statRevenue'
        );


    const tbody =
        document.getElementById(
            'dashboardTableBody'
        );


    const totalRev =
        bookings.reduce(
            (sum, booking) =>
                sum + booking.totalBill,
            0
        );


    if (totalBookingsEl) {

        totalBookingsEl.textContent =
            bookings.length;

    }


    if (totalRevEl) {

        totalRevEl.textContent =
            `৳${totalRev.toLocaleString()}`;

    }


    if (tbody) {

        tbody.innerHTML =
            bookings.map(b => {

                return `
                    <tr>

                        <td>
                            <img
                                src="${b.avatar}"
                                class="table-img vibrant-img"
                                style="
                                    width:36px;
                                    height:36px;
                                    border-radius:50%;
                                    object-fit:cover;
                                "
                            >
                        </td>

                        <td>
                            <strong>${escapeHTML(b.id)}</strong>
                        </td>

                        <td>
                            ${escapeHTML(b.guestName)}
                        </td>

                        <td>
                            Room ${escapeHTML(b.roomNumber)}
                            -
                            ${escapeHTML(b.roomType)}
                        </td>

                        <td>
                            <small>
                                ${escapeHTML(b.checkIn)}
                                to
                                ${escapeHTML(b.checkOut)}
                            </small>
                        </td>

                        <td>
                            <strong>
                                ৳${b.totalBill.toLocaleString()}
                            </strong>
                        </td>

                        <td>
                            <span class="badge ${
                                b.status === 'Checked-In'
                                    ? 'badge-success'
                                    : 'badge-gold'
                            }">
                                ${escapeHTML(b.status)}
                            </span>
                        </td>

                        <td>

                            <button
                                class="btn-secondary-sm"
                                onclick="alert('Printing Receipt for ${escapeHTML(b.id)}')"
                            >
                                <i class="fa-solid fa-print"></i>
                            </button>

                        </td>

                    </tr>
                `;

            }).join('');

    }

}


// ==========================================
// 14. BROWSE ROOMS
//
// ADMIN:
//   Add New Room
//   Price
//   Status
//
// GUEST:
//   Booking Only
// ==========================================

function renderRooms() {

    const container =
        document.getElementById(
            'roomsCardsGrid'
        );


    if (!container) {
        return;
    }


    const isAdmin =
        currentRole === 'admin';


    const isGuest =
        currentRole === 'guest';


    container.innerHTML = `

        <div
            style="
                display:grid;
                grid-template-columns:
                    repeat(
                        auto-fill,
                        minmax(280px, 1fr)
                    );
                gap:20px;
                width:100%;
            "
            class="mt-15"
        >

            ${roomList.map(room => {

                // ==========================================
                // STATUS BADGE
                // ==========================================

                let statusClass =
                    'badge-danger';


                if (
                    room.status ===
                    'available'
                ) {

                    statusClass =
                        'badge-success';

                }

                else if (
                    room.status === 'dirty'
                    ||
                    room.status ===
                    'maintenance'
                ) {

                    statusClass =
                        'badge-gold';

                }


                // ==========================================
                // ADMIN CONTROLS
                // ==========================================

                const adminControls =
                    isAdmin
                        ? `

                            <div
                                style="
                                    display:flex;
                                    gap:5px;
                                    align-items:center;
                                "
                            >

                                <button
                                    type="button"
                                    class="btn-secondary-sm"
                                    onclick="editRoomPrice('${room.id}')"
                                >
                                    <i class="fa-solid fa-pen"></i>
                                    Price
                                </button>


                                <button
                                    type="button"
                                    class="btn-secondary-sm"
                                    onclick="toggleRoomStatus('${room.id}')"
                                >
                                    <i class="fa-solid fa-rotate"></i>
                                    Status
                                </button>

                            </div>

                        `
                        : '';


                // ==========================================
                // GUEST BOOKING BUTTON
                // ==========================================

                const guestBookingButton =
                    isGuest
                        ? `

                            <button
                                type="button"
                                class="btn-primary"
                                style="
                                    width:100%;
                                    margin-top:10px;
                                    padding:10px 14px;
                                    border-radius:8px;
                                    border:none;
                                    cursor:pointer;
                                    font-weight:600;
                                "
                                onclick="bookRoomFromBrowse('${room.id}')"
                                ${
                                    room.status !== 'available'
                                        ? 'disabled'
                                        : ''
                                }
                            >

                                <i
                                    class="fa-solid fa-calendar-check"
                                ></i>

                                ${
                                    room.status === 'available'
                                        ? 'Book This Room'
                                        : 'Not Available'
                                }

                            </button>

                        `
                        : '';


                // ==========================================
                // ROOM CARD
                // ==========================================

                return `

                    <div
                        class="room-card"
                        style="
                            background:
                                var(--bg-card);

                            border:
                                1px solid
                                var(--border-color);

                            border-radius:
                                12px;

                            overflow:
                                hidden;
                        "
                    >

                        <!-- IMAGE -->

                        <div
                            class="room-card-img-wrapper"
                        >

                            <img
                                src="${room.img}"
                                class="vibrant-img"
                                style="
                                    width:100%;
                                    height:180px;
                                    object-fit:cover;
                                "
                                alt="Room ${escapeHTML(room.id)}"
                            >

                        </div>


                        <!-- CONTENT -->

                        <div
                            style="
                                padding:15px;
                            "
                        >

                            <!-- ROOM NUMBER + STATUS -->

                            <div
                                style="
                                    display:flex;
                                    justify-content:space-between;
                                    align-items:center;
                                    margin-bottom:8px;
                                "
                            >

                                <h4
                                    style="
                                        color:var(--gold);
                                        margin:0;
                                    "
                                >
                                    Room ${escapeHTML(room.id)}
                                </h4>


                                <span
                                    class="
                                        badge
                                        ${statusClass}
                                    "
                                >
                                    ${room.status.toUpperCase()}
                                </span>

                            </div>


                            <!-- ROOM TITLE -->

                            <h5
                                style="
                                    margin:
                                        0 0 8px 0;
                                "
                            >
                                ${escapeHTML(room.title)}
                            </h5>


                            <!-- DESCRIPTION -->

                            <p
                                style="
                                    color:
                                        var(--text-muted);

                                    font-size:
                                        0.85rem;

                                    margin-bottom:
                                        12px;

                                    min-height:
                                        38px;
                                "
                            >
                                ${escapeHTML(room.desc)}
                            </p>


                            <!-- PRICE + ADMIN CONTROLS -->

                            <div
                                style="
                                    display:flex;
                                    justify-content:
                                        space-between;
                                    align-items:
                                        center;
                                    border-top:
                                        1px solid
                                        var(--border-color);
                                    padding-top:
                                        10px;
                                    gap:10px;
                                    flex-wrap:
                                        wrap;
                                "
                            >

                                <!-- PRICE -->

                                <strong
                                    style="
                                        font-size:
                                            1.1rem;
                                        color:
                                            var(--gold);
                                    "
                                >

                                    ৳${room.price.toLocaleString()}

                                    <small
                                        style="
                                            font-size:
                                                0.75rem;
                                        "
                                    >
                                        /night
                                    </small>

                                </strong>


                                <!-- ADMIN ONLY -->

                                ${adminControls}

                            </div>


                            <!-- GUEST ONLY -->

                            ${guestBookingButton}

                        </div>

                    </div>

                `;

            }).join('')}

        </div>

    `;

}


// ==========================================
// 15. FRONT DESK
// ==========================================

function renderFrontDesk() {

    const container =
        document.getElementById(
            'frontDeskRoomGrid'
        );


    if (!container) {
        return;
    }


    container.innerHTML = `

        <div
            style="
                display:grid;
                grid-template-columns:
                    repeat(
                        auto-fill,
                        minmax(160px, 1fr)
                    );
                gap:15px;
            "
            class="mt-15"
        >

            ${roomList.map(room => {

                let borderColor =
                    '#ed8936';


                if (
                    room.status ===
                    'available'
                ) {

                    borderColor =
                        '#48bb78';

                }

                else if (
                    room.status ===
                    'occupied'
                ) {

                    borderColor =
                        '#f56565';

                }


                return `

                    <div
                        style="
                            padding:15px;
                            border-radius:10px;
                            background:
                                var(--bg-card);
                            border-left:
                                5px solid
                                ${borderColor};
                            border-top:
                                1px solid
                                var(--border-color);
                            border-right:
                                1px solid
                                var(--border-color);
                            border-bottom:
                                1px solid
                                var(--border-color);
                        "
                    >

                        <h3
                            style="
                                margin:0;
                                color:var(--gold);
                            "
                        >
                            Room ${escapeHTML(room.id)}
                        </h3>


                        <p
                            style="
                                font-size:0.8rem;
                                color:
                                    var(--text-muted);
                                margin:
                                    4px 0;
                            "
                        >
                            ${escapeHTML(room.title)}
                        </p>


                        <span
                            class="
                                badge
                                ${
                                    room.status ===
                                    'available'
                                        ? 'badge-success'
                                        : 'badge-danger'
                                }
                            "
                        >
                            ${room.status.toUpperCase()}
                        </span>

                    </div>

                `;

            }).join('')}

        </div>

    `;

}


// ==========================================
// 16. HOUSEKEEPING
// ==========================================

function renderHousekeeping() {

    const cleanEl =
        document.getElementById(
            'statCleanRooms'
        );

    const dirtyEl =
        document.getElementById(
            'statDirtyRooms'
        );

    const maintEl =
        document.getElementById(
            'statMaintRooms'
        );

    const tbody =
        document.getElementById(
            'housekeepingTableBody'
        );


    const cleanCount =
        roomList.filter(
            r => r.status === 'available'
        ).length;


    const dirtyCount =
        roomList.filter(
            r => r.status === 'dirty'
        ).length;


    const maintCount =
        roomList.filter(
            r => r.status === 'maintenance'
        ).length;


    if (cleanEl) {
        cleanEl.textContent =
            cleanCount;
    }


    if (dirtyEl) {
        dirtyEl.textContent =
            dirtyCount;
    }


    if (maintEl) {
        maintEl.textContent =
            maintCount;
    }


    if (tbody) {

        tbody.innerHTML =
            roomList.map(room => {

                return `

                    <tr>

                        <td>
                            <strong>
                                Room ${escapeHTML(room.id)}
                            </strong>
                        </td>

                        <td>
                            ${escapeHTML(room.title)}
                        </td>

                        <td>

                            <span
                                class="
                                    badge
                                    ${
                                        room.status ===
                                        'available'
                                            ? 'badge-success'
                                            : 'badge-gold'
                                    }
                                "
                            >
                                ${room.status.toUpperCase()}
                            </span>

                        </td>

                        <td>

                            <button
                                class="btn-secondary-sm"
                                onclick="toggleRoomStatus('${room.id}')"
                            >

                                <i
                                    class="fa-solid fa-broom"
                                ></i>

                                Change Status

                            </button>

                        </td>

                    </tr>

                `;

            }).join('');

    }

}


// ==========================================
// 17. FINANCE
// ==========================================

function renderFinance() {

    const totalRevEl =
        document.getElementById(
            'finTotalEarnings'
        );


    const pendingEl =
        document.getElementById(
            'finPending'
        );


    const tbody =
        document.getElementById(
            'financeTableBody'
        );


    const totalRev =
        bookings.reduce(
            (sum, booking) =>
                sum + booking.totalBill,
            0
        );


    if (totalRevEl) {

        totalRevEl.textContent =
            `৳${totalRev.toLocaleString()}`;

    }


    if (pendingEl) {

        pendingEl.textContent =
            `৳0`;

    }


    if (tbody) {

        tbody.innerHTML =
            bookings.map(booking => {

                return `

                    <tr>

                        <td>
                            <strong>
                                ${escapeHTML(booking.id)}
                            </strong>
                        </td>

                        <td>
                            ${escapeHTML(booking.guestName)}
                        </td>

                        <td>

                            <span
                                class="badge badge-gold"
                            >
                                ${escapeHTML(
                                    booking.paymentMethod
                                )}
                            </span>

                        </td>

                        <td>

                            <strong
                                style="
                                    color:#48bb78;
                                "
                            >
                                ৳${booking.totalBill.toLocaleString()}
                            </strong>

                        </td>

                        <td>
                            ${escapeHTML(
                                booking.checkIn
                            )}
                        </td>

                        <td>

                            <button
                                class="btn-secondary-sm"
                                onclick="alert('Downloading Receipt PDF...')"
                            >

                                <i
                                    class="fa-solid fa-download"
                                ></i>

                                Receipt

                            </button>

                        </td>

                    </tr>

                `;

            }).join('');

    }

}


// ==========================================
// 18. GUEST DIRECTORY
// ==========================================

function renderGuests() {

    const tbody =
        document.getElementById(
            'guestsTableBody'
        );


    if (!tbody) {
        return;
    }


    tbody.innerHTML =
        guests.map(guest => {

            return `

                <tr>

                    <td>

                        <img
                            src="${guest.avatar}"
                            class="table-img vibrant-img"
                            style="
                                width:36px;
                                height:36px;
                                border-radius:50%;
                                object-fit:cover;
                            "
                        >

                    </td>


                    <td>

                        <strong>
                            ${escapeHTML(guest.name)}
                        </strong>

                    </td>


                    <td>
                        ${escapeHTML(guest.email)}
                    </td>


                    <td>
                        ${escapeHTML(guest.phone)}
                    </td>


                    <td>

                        <button
                            class="btn-secondary-sm"
                            onclick="alert('Viewing guest history for ${escapeHTML(guest.name)}')"
                        >

                            <i
                                class="fa-solid fa-eye"
                            ></i>

                            View

                        </button>

                    </td>

                </tr>

            `;

        }).join('');

}


// ==========================================
// 19. ADMIN INVENTORY MANAGEMENT
// ==========================================


// ------------------------------------------
// ADD NEW ROOM
// ------------------------------------------

function promptAddNewRoom() {

    // Security: Guest cannot add rooms
    if (currentRole !== 'admin') {

        alert(
            "❌ Only Admin can add new rooms."
        );

        return;

    }


    const id =
        prompt(
            "Enter New Room ID (e.g. 701):"
        );


    if (!id) {
        return;
    }


    const cleanId =
        id.trim();


    // Prevent duplicate room ID
    if (
        roomList.some(
            room => room.id === cleanId
        )
    ) {

        alert(
            `❌ Room ${cleanId} already exists!`
        );

        return;

    }


    const title =
        prompt(
            "Enter Room Category Title:"
        );


    if (!title) {
        return;
    }


    const price =
        parseFloat(
            prompt(
                "Enter Room Price per night (BDT):"
            )
        );


    if (isNaN(price) || price < 0) {

        alert(
            "❌ Please enter a valid room price."
        );

        return;

    }


    roomList.push({

        id: cleanId,

        title: title.trim(),

        price: price,

        status: "available",

        img:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500",

        desc:
            "Newly added luxury accommodation."

    });


    populateRoomDropdown();

    renderAll();


    alert(
        `✅ Room ${cleanId} added to resort inventory!`
    );

}


// ------------------------------------------
// EDIT ROOM PRICE
// ------------------------------------------

function editRoomPrice(roomId) {

    // Security
    if (currentRole !== 'admin') {

        alert(
            "❌ Only Admin can edit room price."
        );

        return;

    }


    const room =
        roomList.find(
            r => r.id === roomId
        );


    if (!room) {
        return;
    }


    const newPrice =
        parseFloat(
            prompt(
                `Enter new price for Room ${room.id}:`,
                room.price
            )
        );


    if (
        !isNaN(newPrice)
        &&
        newPrice >= 0
    ) {

        room.price =
            newPrice;


        populateRoomDropdown();

        renderAll();


        alert(
            `✅ Room ${room.id} price updated to ৳${newPrice.toLocaleString()}`
        );

    }

}


// ------------------------------------------
// TOGGLE ROOM STATUS
// ------------------------------------------

function toggleRoomStatus(roomId) {

    const room =
        roomList.find(
            r => r.id === roomId
        );


    if (!room) {
        return;
    }


    // Admin can change status from Browse Rooms
    // Other staff can also use this from housekeeping
    const statuses = [

        'available',

        'occupied',

        'dirty',

        'maintenance'

    ];


    const currentIndex =
        statuses.indexOf(
            room.status
        );


    room.status =
        statuses[
            (currentIndex + 1)
            %
            statuses.length
        ];


    renderAll();

}


// ==========================================
// 20. IMAGE PREVIEW HELPERS
// ==========================================


// ------------------------------------------
// GUEST IMAGE URL
// ------------------------------------------

function updateGuestImageFromUrl() {

    const url =
        document.getElementById(
            'imgUrlInput'
        )?.value;


    const img =
        document.getElementById(
            'previewImg'
        );


    if (
        url
        &&
        img
    ) {

        img.src = url;

    }

}


// ------------------------------------------
// GUEST IMAGE UPLOAD
// ------------------------------------------

function previewUploadImage(event) {

    const file =
        event.target.files[0];


    const img =
        document.getElementById(
            'previewImg'
        );


    if (
        file
        &&
        img
    ) {

        const reader =
            new FileReader();


        reader.onload =
            function (e) {

                img.src =
                    e.target.result;

            };


        reader.readAsDataURL(
            file
        );

    }

}


// ------------------------------------------
// GUEST AUTH IMAGE URL
// ------------------------------------------

function updateGuestAuthImageFromUrl() {

    const url =
        document.getElementById(
            'guestAuthPhotoUrl'
        )?.value;


    const img =
        document.getElementById(
            'guestAuthPreviewImg'
        );


    if (
        url
        &&
        img
    ) {

        img.src = url;

    }

}


// ------------------------------------------
// GUEST AUTH IMAGE UPLOAD
// ------------------------------------------

function previewGuestAuthImage(event) {

    const file =
        event.target.files[0];


    const img =
        document.getElementById(
            'guestAuthPreviewImg'
        );


    if (
        file
        &&
        img
    ) {

        const reader =
            new FileReader();


        reader.onload =
            function (e) {

                img.src =
                    e.target.result;

            };


        reader.readAsDataURL(
            file
        );

    }

}
