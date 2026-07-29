/ ROOM DATA STORAGE & DEFAULT PHOTOS
let defaultRooms = [
    {
        id: 'room-1',
        title: 'Single Bed Room',
        price: 80,
        desc: 'Cozy room with premium single bedding, high-speed WiFi, mini-bar, and balcony.',
        photo: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'room-2',
        title: 'Standard Double Bed Room',
        price: 140,
        desc: 'Spacious double bed with plush duvet, city view, Smart TV, and complimentary breakfast.',
        photo: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'room-3',
        title: 'Deluxe Double Room',
        price: 220,
        desc: 'Luxury double bed with ocean view, Jacuzzi bath, executive lounge access & 24/7 room service.',
        photo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'room-4',
        title: 'Ultra-Luxurious Presidential Suite',
        price: 550,
        desc: 'Panoramic master suite with private butler, living room, marble bathroom, and VIP airport pickup.',
        photo: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'room-5',
        title: 'Royal Villa with Private Pool',
        price: 1000,
        desc: 'Exclusive private villa featuring personal infinity pool, garden lounge, and dedicated chef.',
        photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80'
    }
];

let defaultServices = [
    {
        id: 'srv-1',
        title: '🇧🇩 Traditional Bengali Feast',
        category: 'Bangla Cuisine',
        time: 'Lunch & Dinner Slots',
        desc: 'Kacchi Biryani, Hilsha fry, traditional Vorta items, and authentic Rasgulla sweets.',
        photo: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'srv-2',
        title: '🇹🇭 Authentic Thai Cuisine',
        category: 'Thai Gourmet',
        time: 'All Day Dining',
        desc: 'Fresh Tom Yum soup, Pad Thai noodles, Green Curry, and Mango Sticky Rice.',
        photo: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'srv-3',
        title: '🇪🇸 Spanish Tapas & Paella',
        category: 'Spanish Special',
        time: 'Dinner Special',
        desc: 'Traditional Seafood Paella, Patatas Bravas, Sangria, and Fresh Spanish Churros.',
        photo: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'srv-4',
        title: '🌐 Continental 5-Star Buffet',
        category: 'Global Buffet',
        time: 'Breakfast, Lunch & Dinner',
        desc: 'International live kitchen, steaks, pasta, fresh pastries, and unlimited mocktails.',
        photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'srv-5',
        title: '🏊‍♂️ Temperature Controlled Swimming Pool',
        category: 'Pool Facility',
        time: 'Morning: 06-11 AM | Night: 04-10 PM',
        desc: 'Luxury heated pool with loungers, towel service, and pool bar refreshments.',
        photo: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'srv-6',
        title: '🏋️‍♂️ VIP TechnoGym Fitness Center',
        category: 'Gym Facility',
        time: 'Morning: 06-11 AM | Evening: 04-09 PM',
        desc: 'State-of-the-art cardiovascular equipment, weights, and personal training slots.',
        photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80'
    }
];

// INITIALIZE STATE
let roomsData = JSON.parse(localStorage.getItem('gp_rooms_data')) || defaultRooms;
let servicesData = JSON.parse(localStorage.getItem('gp_services_data')) || defaultServices;
let reservations = JSON.parse(localStorage.getItem('gp_hotel_reservations_v3')) || [];
let currentGuestPhotoBase64 = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('currentDateDisplay').innerText = new Date().toDateString();
    
    // Set default check-in and check-out dates
    document.getElementById('checkIn').valueAsDate = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('checkOut').valueAsDate = tomorrow;

    renderRoomCards();
    renderServicesCards();
    updateDashboard();
    calculateBilling();
});

// LOGIN SYSTEM
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('loginModal').classList.add('hidden');
    document.getElementById('appContainer').classList.remove('hidden');
});

function logout() {
    document.getElementById('appContainer').classList.add('hidden');
    document.getElementById('loginModal').classList.remove('hidden');
}

// MOBILE SIDEBAR TOGGLE
function toggleMobileSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('open');
}

// TAB SWITCHING
function switchTab(tabName) {
    document.querySelectorAll('.tab-page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.m-nav-item').forEach(item => item.classList.remove('active'));

    document.getElementById(`tab-${tabName}`).classList.add('active');

    // Highlight desktop nav
    const desktopItem = document.querySelector(`.nav-item[onclick="switchTab('${tabName}')"]`);
    if (desktopItem) desktopItem.classList.add('active');

    // Highlight mobile bottom nav
    const mobileItem = document.querySelector(`.m-nav-item[onclick="switchTab('${tabName}')"]`);
    if (mobileItem) mobileItem.classList.add('active');

    // Close mobile menu if open
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('open');

    if (tabName === 'dashboard') updateDashboard();
    if (tabName === 'guests') renderFullBookingsTable();
}

// GUEST PHOTO UPLOAD HANDLING
function handleGuestPhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentGuestPhotoBase64 = e.target.result;
            document.getElementById('previewImg').src = currentGuestPhotoBase64;
        };
        reader.readAsDataURL(file);
    }
}

function updateGuestImageFromUrl() {
    const url = document.getElementById('imgUrlInput').value.trim();
    if (url) {
        currentGuestPhotoBase64 = url;
        document.getElementById('previewImg').src = url;
    } else {
        alert("Please enter a valid image URL.");
    }
}

// RENDER ROOM CARDS WITH CUSTOM PHOTO UPLOAD
function renderRoomCards() {
    const container = document.getElementById('roomsCardsGrid');
    container.innerHTML = '';

    roomsData.forEach((room, index) => {
        container.innerHTML += `
            <div class="item-card">
                <div class="card-image-box">
                    <img id="roomImg-${index}" src="${room.photo}" alt="${room.title}">
                    <span class="badge-price">$${room.price} / night</span>
                </div>
                <div class="card-content">
                    <div>
                        <h3>${room.title}</h3>
                        <p>${room.desc}</p>
                    </div>
                    <div class="photo-change-btn-wrapper">
                        <label class="btn-file-upload" style="width:100%;">
                            <i class="fa-solid fa-camera"></i> Change Room Photo
                            <input type="file" accept="image/*" onchange="changeItemPhoto(event, 'room', ${index})">
                        </label>
                    </div>
                </div>
            </div>
        `;
    });
}

// RENDER SERVICES & MENU CARDS WITH CUSTOM PHOTO UPLOAD
function renderServicesCards() {
    const container = document.getElementById('servicesCardsGrid');
    container.innerHTML = '';

    servicesData.forEach((srv, index) => {
        container.innerHTML += `
            <div class="item-card">
                <div class="card-image-box">
                    <img id="srvImg-${index}" src="${srv.photo}" alt="${srv.title}">
                    <span class="badge-price">${srv.category}</span>
                </div>
                <div class="card-content">
                    <div>
                        <h3>${srv.title}</h3>
                        <p><strong><i class="fa-solid fa-clock"></i> Timing:</strong> ${srv.time}</p>
                        <p>${srv.desc}</p>
                    </div>
                    <div class="photo-change-btn-wrapper">
                        <label class="btn-file-upload" style="width:100%;">
                            <i class="fa-solid fa-camera"></i> Change Photo
                            <input type="file" accept="image/*" onchange="changeItemPhoto(event, 'service', ${index})">
                        </label>
                    </div>
                </div>
            </div>
        `;
    });
}

// GENERIC PHOTO CHANGE HANDLER (SAVED TO LOCALSTORAGE)
function changeItemPhoto(event, type, index) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Img = e.target.result;
            if (type === 'room') {
                roomsData[index].photo = base64Img;
                localStorage.setItem('gp_rooms_data', JSON.stringify(roomsData));
                document.getElementById(`roomImg-${index}`).src = base64Img;
            } else if (type === 'service') {
                servicesData[index].photo = base64Img;
                localStorage.setItem('gp_services_data', JSON.stringify(servicesData));
                document.getElementById(`srvImg-${index}`).src = base64Img;
            }
            alert('📷 Image updated and saved permanently!');
        };
        reader.readAsDataURL(file);
    }
}

// CALCULATE BILLING
function calculateBilling() {
    const checkIn = new Date(document.getElementById('checkIn').value);
    const checkOut = new Date(document.getElementById('checkOut').value);
    
    let nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    if (isNaN(nights) || nights < 1) nights = 1;

    const roomPrice = parseInt(document.getElementById('roomTypeSelect').value.split('|')[1]) || 0;
    const roomSubtotal = roomPrice * nights;

    let servicesSubtotal = 0;
    document.querySelectorAll('input[name="foodMenu"]:checked, input[name="amenities"]:checked').forEach(cb => {
        servicesSubtotal += (parseInt(cb.dataset.price) || 0) * nights;
    });

    const total = roomSubtotal + servicesSubtotal;

    document.getElementById('billNights').innerText = `${nights} Night(s)`;
    document.getElementById('billRoom').innerText = `$${roomSubtotal}`;
    document.getElementById('billServices').innerText = `$${servicesSubtotal}`;
    document.getElementById('billTotal').innerText = `$${total}`;

    return { nights, roomSubtotal, servicesSubtotal, total };
}

// FORM RESERVATION SUBMISSION
document.getElementById('reservationForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const billing = calculateBilling();
    const roomCategory = document.getElementById('roomTypeSelect').value.split('|')[0];

    const selectedServices = [];
    document.querySelectorAll('input[name="foodMenu"]:checked, input[name="amenities"]:checked').forEach(cb => {
        selectedServices.push(cb.value);
    });

    const newBooking = {
        id: 'GP-' + Math.floor(100000 + Math.random() * 900000),
        guestName: `${document.getElementById('fName').value} ${document.getElementById('lName').value}`,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        room: roomCategory,
        checkIn: document.getElementById('checkIn').value,
        checkOut: document.getElementById('checkOut').value,
        nights: billing.nights,
        services: selectedServices,
        totalBill: billing.total,
        photo: currentGuestPhotoBase64
    };

    reservations.unshift(newBooking);
    localStorage.setItem('gp_hotel_reservations_v3', JSON.stringify(reservations));

    alert(`🎉 Reservation Confirmed!
Booking ID: ${newBooking.id}
Guest: ${newBooking.guestName}
Total Bill: $${newBooking.totalBill}`);
    resetForm();
    switchTab('dashboard');
});

function resetForm() {
    document.getElementById('reservationForm').reset();
    currentGuestPhotoBase64 = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';
    document.getElementById('previewImg').src = currentGuestPhotoBase64;
    calculateBilling();
}

// DASHBOARD UPDATES
function updateDashboard() {
    document.getElementById('statTotalBookings').innerText = reservations.length;
    
    let totalRevenue = reservations.reduce((acc, curr) => acc + curr.totalBill, 0);
    document.getElementById('statRevenue').innerText = `$${totalRevenue}`;

    let poolCount = reservations.filter(r => r.services.some(s => s.includes('Pool'))).length;
    document.getElementById('statPoolPass').innerText = poolCount;

    let diningCount = reservations.filter(r => r.services.some(s => s.includes('Bengali') || s.includes('Thai') || s.includes('Spanish') || s.includes('Continental'))).length;
    document.getElementById('statDiningOrders').innerText = diningCount;

    const tbody = document.getElementById('dashboardTableBody');
    tbody.innerHTML = '';

    reservations.slice(0, 5).forEach(res => {
        tbody.innerHTML += `
            <tr>
                <td><img src="${res.photo}" class="table-avatar" alt="Guest"></td>
                <td><strong>${res.id}</strong></td>
                <td>${res.guestName}</td>
                <td>${res.room}</td>
                <td>${res.checkIn} to ${res.checkOut}</td>
                <td><strong style="color: var(--accent-gold);">$${res.totalBill}</strong></td>
                <td><button class="action-btn-del" onclick="deleteBooking('${res.id}')"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        `;
    });
}

// RENDER FULL GUEST TABLE
function renderFullBookingsTable(filteredData = null) {
    const tbody = document.getElementById('fullBookingsTableBody');
    tbody.innerHTML = '';

    const list = filteredData || reservations;

    if (list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: var(--text-muted); padding: 30px;">No reservation records found.</td></tr>';
        return;
    }

    list.forEach(res => {
        tbody.innerHTML += `
            <tr>
                <td><img src="${res.photo}" class="table-avatar" alt="Guest"></td>
                <td><strong>${res.id}</strong></td>
                <td>
                    <strong>${res.guestName}</strong><br>
                    <small style="color: var(--text-muted);">${res.phone} | ${res.email}</small>
                </td>
                <td>${res.room} (${res.nights} Night)</td>
                <td><small>${res.services.join('<br>') || 'Room Only'}</small></td>
                <td><strong style="color: var(--accent-gold);">$${res.totalBill}</strong></td>
                <td><button class="action-btn-del" onclick="deleteBooking('${res.id}')"><i class="fa-solid fa-trash"></i> Delete</button></td>
            </tr>
        `;
    });
}

// SEARCH GUESTS
function searchGuests() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = reservations.filter(res => 
        res.guestName.toLowerCase().includes(query) ||
        res.id.toLowerCase().includes(query) ||
        res.room.toLowerCase().includes(query) ||
        res.phone.includes(query)
    );
    renderFullBookingsTable(filtered);
}

// DELETE BOOKING
function deleteBooking(id) {
    if (confirm("Are you sure you want to cancel this reservation?")) {
        reservations = reservations.filter(r => r.id !== id);
        localStorage.setItem('gp_hotel_reservations_v3', JSON.stringify(reservations));
        updateDashboard();
        renderFullBookingsTable();
    }
}
