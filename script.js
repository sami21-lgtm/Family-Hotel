import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getFirestore, collection, addDoc, onSnapshot, 
    deleteDoc, doc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCjHk05Mjd1hwizLr08SAFHs867BBRbtf8",
    authDomain: "grand-palace-hotel-dac38.firebaseapp.com",
    projectId: "grand-palace-hotel-dac38",
    storageBucket: "grand-palace-hotel-dac38.firebasestorage.app",
    messagingSenderId: "49149127790",
    appId: "1:49149127790:web:130fcb29b6819e9297ca7f",
    measurementId: "G-N5GVZK1HQ5"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TAX_RATE = 0.15;           // 15% VAT
const SERVICE_CHARGE_RATE = 0.10; // 10% Hotel Service Charge

// ALL 8 ROOMS DATABASE (WITH DETAILED SPECS)
let roomsDatabase = [
    {
        id: 'single-std',
        title: 'Single Standard Room',
        price: 800,
        badge: 'AVAILABLE',
        size: '250 Sq Ft / 23 m²',
        capacity: '1 Adult',
        bed: '1 Single Bed',
        view: 'City & Garden View',
        img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600',
        desc: 'Designed for solo travelers seeking peace and comfort. Includes ultra-fast Wi-Fi, air conditioning, smart LED TV, modern work desk, and an attached balcony.',
        amenities: ['1 Single Plush Bed', 'Free High-Speed Wi-Fi & AC', '43-inch Smart TV', 'City View Balcony', 'Daily Housekeeping']
    },
    {
        id: 'single-exec',
        title: 'Single Executive Room',
        price: 1000,
        badge: 'AVAILABLE',
        size: '320 Sq Ft / 30 m²',
        capacity: '1 Adult',
        bed: '1 Executive Single Bed',
        view: 'Skyline View',
        img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600',
        desc: 'Ideal choice for business executives and solo travelers. Offers an ergonomic work desk, private mini-bar, personal espresso coffee machine, and express room service.',
        amenities: ['Executive Single Bed', 'Ergonomic Work Desk & Mini-Bar', 'Balcony & Espresso Coffee Maker', 'Complimentary Breakfast Pack']
    },
    {
        id: 'deluxe-double',
        title: 'Deluxe Double Room',
        price: 5000,
        badge: 'AVAILABLE',
        size: '450 Sq Ft / 42 m²',
        capacity: '2 Adults, 1 Child',
        bed: '1 King Size Double Bed',
        view: 'Pool & City View',
        img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600',
        desc: 'Spacious double room with a luxurious King-size orthopedic mattress. Equipped with cozy sofa seating, rain shower bath, and scenic balcony views.',
        amenities: ['1 King Size Orthopedic Bed', 'Pool & City View Balcony', 'Complimentary Buffet Breakfast', 'Luxury Washroom with Rain Shower']
    },
    {
        id: 'super-deluxe',
        title: 'Super Deluxe Double Room',
        price: 7500,
        badge: 'AVAILABLE',
        size: '550 Sq Ft / 51 m²',
        capacity: '2 Adults, 2 Children',
        bed: '1 Super King Bed',
        view: 'Panoramic Resort View',
        img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600',
        desc: 'Decorated with rich wooden interiors and warm lighting. Features a private lounge area, mini-refrigerator, 55-inch TV, and premium toiletries.',
        amenities: ['Super King Bed with Plush Duvet', 'Sofa Lounge & Dining Corner', '55-inch 4K Smart TV', '24-Hour Express Room Service']
    },
    {
        id: 'exec-ocean',
        title: 'Executive Double Ocean View',
        price: 10000,
        badge: 'AVAILABLE',
        size: '650 Sq Ft / 60 m²',
        capacity: '2 Adults',
        bed: '1 Royal King Bed',
        view: '180° Ocean Sunset View',
        img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600',
        desc: 'Enjoy breathtaking ocean views straight from your bed or private balcony Jacuzzi. Comes with exclusive Executive Club Lounge access.',
        amenities: ['Panoramic Ocean View Balcony', 'Private Jacuzzi Hot Tub', 'Executive Club Lounge Access', 'Dedicated 24/7 Butler Service']
    },
    {
        id: 'royal-family',
        title: 'Royal Family Suite',
        price: 20000,
        badge: 'AVAILABLE',
        size: '950 Sq Ft / 88 m²',
        capacity: '4 Adults, 2 Children',
        bed: '2 King Beds',
        view: 'Resort & Ocean View',
        img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600',
        desc: 'A spacious multi-room family suite featuring two separate master bedrooms, an interconnected living room, dining space, and VIP kids corner.',
        amenities: ['2 Separate Master Bedrooms', 'Living Lounge & Dining Space', 'Welcome Fruit & Snack Basket', 'Free Access to Kids Play Zone']
    },
    {
        id: 'presidential-vip',
        title: 'Ultra-Luxurious Presidential VIP Suite',
        price: 35000,
        badge: 'AVAILABLE',
        size: '1400 Sq Ft / 130 m²',
        capacity: '3 Adults',
        bed: '1 Emperor Size Bed',
        view: '360° Panoramic View',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
        desc: 'Designed for VIP dignitaries. Features private butler service, Italian marble bath, private conference corner, and complimentary airport limousine transfer.',
        amenities: ['24/7 Personal Butler', 'Italian Marble Bathroom & Jacuzzi', 'VIP Airport Limousine Transfer', 'Private Lounge & Bar Access']
    },
    {
        id: 'palace-villa',
        title: 'Royal Palace Villa with Private Pool',
        price: 50000,
        badge: 'AVAILABLE',
        size: '2200 Sq Ft / 204 m²',
        capacity: '6 Guests',
        bed: '3 Super King Beds',
        view: 'Private Beach & Pool',
        img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600',
        desc: 'An ultra-exclusive private villa with a dedicated temperature-controlled infinity pool, private garden, open dining patio, and personal chef on call.',
        amenities: ['Private Heated Infinity Pool', 'Open Garden & Barbecue Patio', 'Dedicated Personal Chef & Maid', 'Unlimited Thai Spa & Gym Access']
    }
];

// ALL 8 SERVICES DATABASE (INCLUDES FITNESS GYM & SPA)
let servicesDatabase = [
    {
        id: 'serv-1',
        title: 'Traditional Royal Bengali Feast',
        badge: 'Bengali Cuisine',
        timing: 'Lunch: 12:30 PM - 3:30 PM | Dinner: 8:00 PM - 11:00 PM',
        img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
        desc: 'Authentic Bengali royal dining featuring slow-cooked Mutton Kacchi Biryani, Sorshe Ilish, Mezban Beef, 10+ varieties of fresh Bharta, and Mishti Doi.',
        specialties: ['Traditional Mutton Kacchi Biryani', 'Fresh Mustard Hilsa (Sorshe Ilish)', 'Assorted Bharta & Special Roast', 'Traditional Bangladeshi Sweet Platter']
    },
    {
        id: 'serv-2',
        title: 'Authentic Thai Gourmet',
        badge: 'Thai Cuisine',
        timing: 'All Day: 08:00 AM - 11:00 PM',
        img: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600',
        desc: 'Prepared by master Thai chefs using fresh herbs. Features spicy Tom Yum Prawn Soup, Seafood Pad Thai, Green Curry, and Sticky Mango Rice.',
        specialties: ['Spicy Tom Yum Goong Soup', 'Seafood Pad Thai Noodles', 'Thai Green Chicken Curry', 'Mango Sticky Rice Dessert']
    },
    {
        id: 'serv-3',
        title: 'Royal Indian Breakfast & Snacks',
        badge: 'Indian Gourmet',
        timing: 'Breakfast: 6:30 AM - 10:30 AM | Snacks: 5:00 PM - 8:00 PM',
        img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600',
        desc: 'Hot Crispy Masala Dosa, Chole Bhature, Hyderabadi Dum Biryani, and Karak Masala Chai served in traditional copper tableware.',
        specialties: ['South Indian Crispy Masala Dosa', 'Hot Puri Bhaji & Shahi Samosa', 'Hyderabadi Chicken Dum Biryani', 'Karak Masala Chai & Gulab Jamun']
    },
    {
        id: 'serv-4',
        title: 'Continental 5-Star Buffet',
        badge: 'Global Buffet',
        timing: 'Breakfast, Lunch & Dinner Slots',
        img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
        desc: 'An international buffet spread featuring live grill counters, European pasta bars, sushi stations, and unlimited mocktail fountains.',
        specialties: ['Live Grilled Steak & Italian Pasta', 'Fresh Seafood & Sushi Corner', 'European Pastry & Dessert Bar', 'Unlimited Mocktails & Fresh Juices']
    },
    {
        id: 'serv-5',
        title: 'VIP TechnoGym & Fitness Center',
        badge: 'Fitness & Gym',
        timing: 'Open Daily: 06:00 AM – 10:00 PM',
        img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600',
        desc: 'Fully equipped with modern TechnoGym cardio machinery, heavy weightlifting zones, personal trainers, and protein smoothie bar.',
        specialties: ['TechnoGym Treadmills & Ellipticals', 'Free Heavy Weights & Squat Racks', 'Certified Personal Fitness Trainers', 'Complimentary Protein Shake Bar']
    },
    {
        id: 'serv-6',
        title: 'Thai Wellness Spa & Sauna Bath',
        badge: 'Spa & Relaxation',
        timing: 'Open Daily: 09:00 AM – 09:00 PM',
        img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600',
        desc: 'Rejuvenate your body and mind with authentic Thai oil massage, herbal steam baths, sauna rooms, and soothing aroma therapy.',
        specialties: ['Authentic Thai Full-Body Therapy', 'Herbal Steam Room & Dry Sauna', 'Jacuzzi Hydrotherapy Bath', 'Organic Herbal Tea Refreshments']
    },
    {
        id: 'serv-7',
        title: 'Heated Infinity Pool & Sunset Lounge',
        badge: 'Leisure Pool',
        timing: '06:00 AM – 10:00 PM',
        img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600',
        desc: 'Temperature-controlled rooftop infinity pool offering breathtaking views, poolside sunbeds, and fresh mocktail service.',
        specialties: ['Temperature-Controlled Water', 'Poolside Sun Loungers & Towels', 'Underwater Lighting & Music', 'Pool Bar Mocktails & Finger Foods']
    },
    {
        id: 'serv-8',
        title: 'VIP Nightlife & Live Acoustic DJ Lounge',
        badge: 'Entertainment',
        timing: 'Night: 07:00 PM – 02:00 AM',
        img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600',
        desc: 'Open-air live band performances, DJ light shows, acoustic music sessions, and signature gourmet barbecue snacks.',
        specialties: ['Live Acoustic Band & DJ Performance', 'Open-Air Barbecue Grill', 'VIP Lounge Cabana Seating', 'Signature Mocktails & Snacks']
    }
];

// RESERVATIONS DATABASE (START EMPTY FOR CLEAN GUEST DIRECTORY)
let reservations = [];
let selectedRoomForModal = '';
let uploadedGuestPhoto = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100';

// ==================================================================
// 2. LIVE BANGLADESH CLOCK & TOAST NOTIFICATIONS
// ==================================================================
function startClock() {
    function updateClock() {
        const now = new Date();
        const timeOptions = { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const dateOptions = { timeZone: 'Asia/Dhaka', month: 'short', day: 'numeric', year: 'numeric' };
        
        const timeStr = now.toLocaleTimeString('en-US', timeOptions);
        const dateStr = now.toLocaleDateString('en-US', dateOptions);
        
        const clockEl = document.getElementById('currentDateDisplay');
        if (clockEl) {
            clockEl.innerHTML = `<i class="fa-solid fa-clock" style="color: #d4af37; margin-right: 5px;"></i> ${timeStr} | <small>${dateStr} (BST)</small>`;
        }
    }
    updateClock();
    setInterval(updateClock, 1000);
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 99999;
        padding: 14px 24px; border-radius: 10px; color: #fff;
        font-weight: 600; font-size: 0.88rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        background: ${type === 'success' ? '#10B981' : type === 'warning' ? '#F59E0B' : '#EF4444'};
        opacity: 0; transform: translateY(-20px); transition: all 0.3s ease;
    `;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '1'; toast.style.transform = 'translateY(0)'; }, 50);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ==================================================================
// 3. FIRESTORE SYNC & INITIALIZATION
// ==================================================================
function initRealtimeSync() {
    onSnapshot(collection(db, "reservations"), (snapshot) => {
        reservations = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
        renderTables();
    }, (error) => {
        console.warn("Firestore offline mode:", error.message);
        renderTables();
    });
}

window.addEventListener('DOMContentLoaded', () => {
    startClock();
    renderRooms();
    renderServices();
    renderTables();
    setTodayDates();
    calcTotal();
    initRealtimeSync();

    const bookingForm = document.getElementById('reservationForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
});

// ==================================================================
// 4. NAVIGATION & SIDEBAR
// ==================================================================
function switchTab(tabId) {
    document.querySelectorAll('.tab-page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.m-nav-item').forEach(item => item.classList.remove('active'));

    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) targetTab.classList.add('active');

    const navIndex = ['dashboard', 'rooms', 'booking', 'guests', 'services'].indexOf(tabId);
    if (navIndex !== -1) {
        const navItems = document.querySelectorAll('.nav-item');
        const mNavItems = document.querySelectorAll('.m-nav-item');
        if (navItems[navIndex]) navItems[navIndex].classList.add('active');
        if (mNavItems[navIndex]) mNavItems[navIndex].classList.add('active');
    }
    toggleSidebar(false);
}

function toggleSidebar(forceState) {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (!sidebar || !overlay) return;

    if (typeof forceState === 'boolean') {
        sidebar.classList.toggle('active', forceState);
        overlay.classList.toggle('active', forceState);
    } else {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

// ==================================================================
// 5. RENDERING ROOMS & SERVICES
// ==================================================================
function renderRooms() {
    const grid = document.getElementById('roomsCardsGrid');
    if (!grid) return;
    grid.innerHTML = roomsDatabase.map(room => `
        <div class="room-card">
            <div class="room-card-img-wrap">
                <img src="${room.img}" class="room-card-img" alt="${room.title}">
                <span class="card-top-tag">${room.badge}</span>
                <div class="card-price-overlay">৳${room.price.toLocaleString()} / night</div>
            </div>
            <div class="room-card-body">
                <div>
                    <h3 class="room-card-title">${room.title}</h3>
                    <p class="room-card-desc">${room.desc.substring(0, 80)}...</p>
                </div>
                <button class="btn-primary-block" onclick="openRoomModal('${room.id}')">
                    <i class="fa-solid fa-circle-info"></i> View Details
                </button>
            </div>
        </div>
    `).join('');
}

function renderServices() {
    const grid = document.getElementById('servicesCardsGrid');
    if (!grid) return;
    grid.innerHTML = servicesDatabase.map(serv => `
        <div class="room-card">
            <div class="room-card-img-wrap">
                <img src="${serv.img}" class="room-card-img" alt="${serv.title}">
                <span class="card-top-tag" style="background:#3B82F6;">${serv.badge}</span>
            </div>
            <div class="room-card-body">
                <div>
                    <h3 class="room-card-title">${serv.title}</h3>
                    <small style="color:#d4af37; font-size:0.75rem; margin-bottom:8px; display:block;">
                        <i class="fa-solid fa-clock"></i> ${serv.timing.substring(0, 35)}...
                    </small>
                    <p class="room-card-desc">${serv.desc.substring(0, 80)}...</p>
                </div>
                <button class="btn-primary-block" style="background:var(--bg-card-light); color:#fff;" onclick="openServiceModal('${serv.id}')">
                    <i class="fa-solid fa-list-check"></i> View Specialties
                </button>
            </div>
        </div>
    `).join('');
}

// ==================================================================
// 6. MODAL POPUPS (ROOM & SERVICE DETAILS)
// ==================================================================
function openRoomModal(roomId) {
    const room = roomsDatabase.find(r => r.id === roomId);
    if (!room) return;

    selectedRoomForModal = `${room.title}|${room.price}`;
    document.getElementById('modalRoomTitle').innerText = room.title;
    document.getElementById('modalRoomBadge').innerText = room.badge;
    document.getElementById('modalRoomPrice').innerHTML = `৳${room.price.toLocaleString()} <span style="font-size:0.8rem; font-weight:normal; color:#94a3b8;">/ night</span>`;
    document.getElementById('modalRoomImg').src = room.img;
    document.getElementById('modalRoomDesc').innerText = room.desc;
    document.getElementById('modalRoomSize').innerText = room.size;
    document.getElementById('modalRoomCapacity').innerText = room.capacity;
    document.getElementById('modalRoomBed').innerText = room.bed;
    document.getElementById('modalRoomView').innerText = room.view;

    const amenitiesList = document.getElementById('modalRoomAmenities');
    if (amenitiesList) {
        amenitiesList.innerHTML = room.amenities.map(a => `<li><i class="fa-solid fa-check-circle"></i> ${a}</li>`).join('');
    }

    document.getElementById('roomModal').classList.add('active');
}

function closeRoomModal() {
    document.getElementById('roomModal').classList.remove('active');
}

function bookFromModal() {
    closeRoomModal();
    switchTab('booking');
    const select = document.getElementById('roomTypeSelect');
    if (select) {
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value.startsWith(selectedRoomForModal.split('|')[0])) {
                select.selectedIndex = i;
                break;
            }
        }
    }
    calcTotal();
}

function openServiceModal(servId) {
    const serv = servicesDatabase.find(s => s.id === servId);
    if (!serv) return;

    document.getElementById('modalServiceTitle').innerText = serv.title;
    document.getElementById('modalServiceBadge').innerText = serv.badge;
    document.getElementById('modalServiceTiming').innerHTML = `<i class="fa-solid fa-clock"></i> ${serv.timing}`;
    document.getElementById('modalServiceImg').src = serv.img;
    document.getElementById('modalServiceDesc').innerText = serv.desc;

    const specsList = document.getElementById('modalServiceSpecialties');
    if (specsList) {
        specsList.innerHTML = serv.specialties.map(s => `<li><i class="fa-solid fa-star"></i> ${s}</li>`).join('');
    }

    document.getElementById('serviceModal').classList.add('active');
}

function closeServiceModal() {
    document.getElementById('serviceModal').classList.remove('active');
}

// ==================================================================
// 7. PHOTO PREVIEW & IMAGE HANDLERS
// ==================================================================
function previewUploadImage(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            uploadedGuestPhoto = event.target.result;
            document.getElementById('previewImg').src = uploadedGuestPhoto;
        };
        reader.readAsDataURL(file);
    }
}

function updateGuestImageFromUrl() {
    const urlInput = document.getElementById('imgUrlInput');
    const url = urlInput ? urlInput.value.trim() : '';
    if (url) {
        uploadedGuestPhoto = url;
        document.getElementById('previewImg').src = url;
        showToast("Guest profile image updated!");
    } else {
        showToast("Please paste a valid image URL", "error");
    }
}

// ==================================================================
// 8. BILLING & BOOKING SUBMISSION
// ==================================================================
function setTodayDates() {
    const checkInEl = document.getElementById('checkIn');
    const checkOutEl = document.getElementById('checkOut');
    if (checkInEl) checkInEl.valueAsDate = new Date();
    if (checkOutEl) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        checkOutEl.valueAsDate = tomorrow;
    }
}

function calcTotal() {
    const checkInVal = document.getElementById('checkIn')?.value;
    const checkOutVal = document.getElementById('checkOut')?.value;
    const d1 = checkInVal ? new Date(checkInVal) : new Date();
    const d2 = checkOutVal ? new Date(checkOutVal) : new Date();
    let nights = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    if (isNaN(nights) || nights < 1) nights = 1;

    const selectEl = document.getElementById('roomTypeSelect');
    const roomVal = selectEl ? selectEl.value : 'Single Standard Room|800';
    const roomPrice = parseInt(roomVal.split('|')[1]) || 800;

    let addOnPrice = 0;
    document.querySelectorAll('input[name="foodMenu"]:checked, input[name="amenities"]:checked').forEach(cb => {
        const p = cb.getAttribute('data-price');
        if (p) addOnPrice += parseInt(p);
    });

    const roomSubtotal = roomPrice * nights;
    const servicesSubtotal = addOnPrice * nights;
    const subtotal = roomSubtotal + servicesSubtotal;
    const vat = subtotal * TAX_RATE;
    const serviceCharge = subtotal * SERVICE_CHARGE_RATE;
    const grandTotal = Math.round(subtotal + vat + serviceCharge);

    if (document.getElementById('billNights')) document.getElementById('billNights').innerText = `${nights} Night(s)`;
    if (document.getElementById('billRoom')) document.getElementById('billRoom').innerText = `৳${roomSubtotal.toLocaleString()}`;
    if (document.getElementById('billAddons')) document.getElementById('billAddons').innerText = `৳${servicesSubtotal.toLocaleString()}`;
    if (document.getElementById('billTotal')) document.getElementById('billTotal').innerText = `৳${grandTotal.toLocaleString()} (Inc. VAT & Service)`;

    return { nights, grandTotal };
}

async function handleBookingSubmit(e) {
    e.preventDefault();
    const fname = document.getElementById('fName').value.trim();
    const lname = document.getElementById('lName').value.trim();
    const selectEl = document.getElementById('roomTypeSelect');
    const roomVal = selectEl ? selectEl.value.split('|')[0] : 'Single Standard Room';
    const inDate = document.getElementById('checkIn').value;
    const outDate = document.getElementById('checkOut').value;
    const billing = calcTotal();

    const newBooking = {
        id: `GP-${Math.floor(100000 + Math.random() * 900000)}`,
        name: `${fname} ${lname}`,
        room: roomVal,
        dates: `${inDate} to ${outDate}`,
        bill: `৳${billing.grandTotal.toLocaleString()}`,
        img: uploadedGuestPhoto,
        status: 'Confirmed',
        createdAt: new Date().toISOString()
    };

    try {
        await addDoc(collection(db, "reservations"), newBooking);
        showToast(`🎉 Reservation ${newBooking.id} Completed Successfully!`);
    } catch (err) {
        showToast("Saved locally (Offline Mode)", "warning");
        reservations.unshift(newBooking);
        renderTables();
    }

    document.getElementById('reservationForm').reset();
    uploadedGuestPhoto = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100';
    document.getElementById('previewImg').src = uploadedGuestPhoto;
    setTodayDates();
    calcTotal();
    switchTab('guests');
}

// ==================================================================
// 9. GUEST DIRECTORY RENDER & SEARCH
// ==================================================================
function renderTables() {
    const dashBody = document.getElementById('dashboardTableBody');
    const guestBody = document.getElementById('fullBookingsTableBody');
    const totalStat = document.getElementById('statTotalBookings');
    const revenueStat = document.getElementById('statRevenue');

    if (totalStat) totalStat.innerText = reservations.length;

    let totalRev = 0;
    reservations.forEach(r => {
        const num = parseInt((r.bill || '').replace(/[^0-9]/g, '')) || 0;
        totalRev += num;
    });
    if (revenueStat) revenueStat.innerText = `৳${totalRev.toLocaleString()}`;

    if (reservations.length === 0) {
        const emptyRow = `<tr><td colspan="7" style="text-align:center; padding:25px; color:#94a3b8;"><i class="fa-solid fa-folder-open" style="font-size:1.5rem; margin-bottom:8px; display:block; color:#d4af37;"></i>No guest reservations recorded yet.</td></tr>`;
        if (dashBody) dashBody.innerHTML = emptyRow;
        if (guestBody) guestBody.innerHTML = emptyRow;
        return;
    }

    const rows = reservations.map(g => `
        <tr>
            <td><img src="${g.img}" class="guest-avatar-td" alt="${g.name}" style="width:38px; height:38px; border-radius:50%; object-fit:cover; border:2px solid #d4af37;"></td>
            <td><strong style="color:#d4af37;">${g.id}</strong></td>
            <td>${g.name}</td>
            <td>${g.room}</td>
            <td>${g.dates}</td>
            <td><strong style="color:#10B981;">${g.bill}</strong></td>
            <td>
                ${g.docId ? `<button onclick="deleteBooking('${g.docId}')" style="background:rgba(239,68,68,0.2); color:#ef4444; border:1px solid rgba(239,68,68,0.4); padding:5px 10px; border-radius:4px; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>` : ''}
            </td>
        </tr>
    `).join('');

    if (dashBody) dashBody.innerHTML = rows;
    if (guestBody) guestBody.innerHTML = rows;
}

function searchGuests() {
    const query = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const filtered = reservations.filter(g => 
        g.name.toLowerCase().includes(query) || 
        g.room.toLowerCase().includes(query) || 
        g.id.toLowerCase().includes(query)
    );

    const guestBody = document.getElementById('fullBookingsTableBody');
    if (guestBody) {
        if (filtered.length === 0) {
            guestBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px; color:#94a3b8;">No matching guest records found.</td></tr>`;
            return;
        }
        guestBody.innerHTML = filtered.map(g => `
            <tr>
                <td><img src="${g.img}" class="guest-avatar-td" alt="${g.name}" style="width:38px; height:38px; border-radius:50%; object-fit:cover; border:2px solid #d4af37;"></td>
                <td><strong style="color:#d4af37;">${g.id}</strong></td>
                <td>${g.name}</td>
                <td>${g.room}</td>
                <td>${g.dates}</td>
                <td><strong style="color:#10B981;">${g.bill}</strong></td>
                <td>
                    ${g.docId ? `<button onclick="deleteBooking('${g.docId}')" style="background:rgba(239,68,68,0.2); color:#ef4444; border:1px solid rgba(239,68,68,0.4); padding:5px 10px; border-radius:4px; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>` : ''}
                </td>
            </tr>
        `).join('');
    }
}

async function deleteBooking(docId) {
    if (confirm("Are you sure you want to delete this reservation?")) {
        try {
            await deleteDoc(doc(db, "reservations", docId));
            showToast("Reservation record deleted!");
        } catch (err) {
            showToast("Error deleting: " + err.message, "error");
        }
    }
}

// Global Exports
window.switchTab = switchTab;
window.toggleSidebar = toggleSidebar;
window.openRoomModal = openRoomModal;
window.closeRoomModal = closeRoomModal;
window.bookFromModal = bookFromModal;
window.openServiceModal = openServiceModal;
window.closeServiceModal = closeServiceModal;
window.previewUploadImage = previewUploadImage;
window.updateGuestImageFromUrl = updateGuestImageFromUrl;
window.calcTotal = calcTotal;
window.searchGuests = searchGuests;
window.deleteBooking = deleteBooking;
