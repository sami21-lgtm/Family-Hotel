import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getFirestore, collection, addDoc, onSnapshot, 
    deleteDoc, doc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ==================================================================
// 1. FIREBASE CONFIGURATION
// ==================================================================
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

// ==================================================================
// 2. SYSTEM CONSTANTS & COMPLETE DATABASE
// ==================================================================
const TAX_RATE = 0.15;
const SERVICE_CHARGE_RATE = 0.10;

// ROOMS DATABASE WITH FULL DETAILS
const roomsDatabase = [
    {
        id: 'single-std',
        title: 'Single Standard Room',
        price: 800,
        badge: 'AVAILABLE',
        img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600',
        desc: 'Designed for solo travelers seeking peace, efficiency, and dynamic luxury. Features ultra-fast Wi-Fi, air conditioning, smart LED TV, and private city view balcony.',
        amenities: ['1 Ergonomic Single Bed', 'Free Ultra-Fast Wi-Fi & AC', '43-inch Smart LED TV', 'City View Balcony', '24/7 Room Service & Security']
    },
    {
        id: 'single-exec',
        title: 'Single Executive Room',
        price: 1000,
        badge: 'AVAILABLE',
        img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600',
        desc: 'Ideal choice for business executives and corporate guests. Offers an ergonomic work desk, private mini-bar, balcony, and personal Espresso coffee machine.',
        amenities: ['1 Executive Single Bed', 'Work Desk & Mini-Bar', 'Private Espresso Coffee Machine', 'Complimentary Breakfast Pack', 'Express Laundry Service']
    },
    {
        id: 'deluxe-double',
        title: 'Deluxe Double Room',
        price: 5000,
        badge: 'AVAILABLE',
        img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600',
        desc: 'Spacious double room with a luxurious King-size orthopedic mattress. Equipped with sofa seating, city views, and private luxury bath amenities.',
        amenities: ['1 King-Size Orthopedic Bed', 'Scenic City View & Lounge Chair', 'Complimentary Buffet Breakfast', 'Private Luxury Washroom & Rain Shower', 'Smart Keyless Access']
    },
    {
        id: 'super-deluxe',
        title: 'Super Deluxe Double Room',
        price: 7500,
        badge: 'AVAILABLE',
        img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600',
        desc: 'Decorated with rich wooden interiors and warm mood lighting. Features a private lounge, 55-inch Smart TV, and premium organic toiletries.',
        amenities: ['Super King Plush Bed', 'Sofa Seating & Private Lounge', '55-inch UHD Smart TV', 'Organic Bath & Body Amenities', '24-Hour Butler Support']
    },
    {
        id: 'exec-ocean',
        title: 'Executive Double Ocean View',
        price: 10000,
        badge: 'AVAILABLE',
        img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600',
        desc: 'Enjoy breathtaking ocean views straight from your bed or private balcony Jacuzzi. Includes exclusive VIP lounge access and complimentary evening cocktails.',
        amenities: ['Panoramic Ocean View Balcony', 'Private Balcony Jacuzzi', 'VIP Executive Lounge Access', 'Evening High Tea & Cocktails', 'Free Airport Shuttle Service']
    },
    {
        id: 'royal-family',
        title: 'Royal Family Suite',
        price: 20000,
        badge: 'AVAILABLE',
        img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600',
        desc: 'A spacious multi-room family suite featuring two separate master bedrooms, an interconnected living space, and private kids entertainment hub.',
        amenities: ['2 Master Bedrooms & 2 Baths', 'Interconnected Living & Dining Area', 'Complimentary VIP Snack Box', 'Free Kids Play Zone Access', 'Dedicated Family Concierge']
    },
    {
        id: 'presidential-vip',
        title: 'Ultra-Luxurious Presidential VIP Suite',
        price: 35000,
        badge: 'AVAILABLE',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
        desc: 'Designed for VIP dignitaries and luxury enthusiasts. Features private butler service, Italian marble bathroom with Jacuzzi, and private airport limousine transfer.',
        amenities: ['24/7 Dedicated Personal Butler', 'Italian Marble Bath & Jacuzzi', 'VIP Airport Limousine Transfer', 'Private Dining Room & Meeting Lounge', 'Helipad Access Option']
    },
    {
        id: 'palace-villa',
        title: 'Royal Palace Villa with Private Pool',
        price: 50000,
        badge: 'AVAILABLE',
        img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600',
        desc: 'An ultra-exclusive private villa with a dedicated temperature-controlled infinity pool, private tropical garden, and custom personal chef service.',
        amenities: ['Private Infinity Pool & Spa', 'Tropical Garden & Sun Deck', 'Dedicated 24/7 Personal Chef', 'Unlimited Spa & Sauna Access', 'Full Privacy Guard Service']
    }
];

// SERVICES DATABASE WITH FULL DETAILS
const servicesDatabase = [
    {
        id: 'serv-1',
        title: 'Traditional Royal Bengali Feast',
        badge: 'Bengali Cuisine',
        timing: 'Lunch: 12:30 PM - 3:30 PM | Dinner: 8:00 PM - 11:00 PM',
        img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
        desc: 'Authentic Bengali royal dining featuring slow-cooked Mutton Kacchi Biryani, Sorshe Ilish (Mustard Hilsa), assorted traditional Bhartas, and authentic sweets.',
        specialties: ['Mutton Kacchi Biryani & Mezban Beef', 'Fresh Fried Mustard Hilsa (Sorshe Ilish)', '10+ Traditional Village Bharta Items', 'Traditional Mishti Doi & Rosogolla']
    },
    {
        id: 'serv-2',
        title: 'Authentic Thai Gourmet',
        badge: 'Thai Cuisine',
        timing: 'All Day: 08:00 AM - 11:00 PM',
        img: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600',
        desc: 'Prepared by master Thai chefs using fresh herbs. Features spicy Tom Yum Prawn Soup, Seafood Pad Thai, Green Curry, and fresh Mango Sticky Rice.',
        specialties: ['Spicy Jumbo Prawn Tom Yum Soup', 'Seafood Pad Thai Noodles', 'Thai Green & Red Curry with Jasmine Rice', 'Fresh Mango Sticky Rice & Coconut Drink']
    },
    {
        id: 'serv-3',
        title: 'Royal Indian Breakfast & Snacks',
        badge: 'Indian Gourmet',
        timing: 'Breakfast: 6:30 AM - 10:30 AM | Evening: 5:00 PM - 8:00 PM',
        img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600',
        desc: 'Hot Crispy Masala Dosa, Chole Bhature, Hyderabadi Dum Biryani, and Karak Masala Tea served fresh at live cooking counters.',
        specialties: ['South Indian Crispy Masala Dosa & Sambar', 'Punjabi Chole Bhature & Shahi Samosa', 'Hyderabadi Dum Biryani', 'Karak Clay-Pot Masala Tea']
    },
    {
        id: 'serv-4',
        title: 'Continental 5-Star Buffet',
        badge: 'Global Buffet',
        timing: 'Breakfast, Lunch & Dinner Slots',
        img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
        desc: 'An international buffet spread featuring live grill counters, European pasta bars, sushi stations, and an unlimited pastry & mocktail corner.',
        specialties: ['Live Grilled Steak & Italian Pasta Bar', 'Fresh Japanese Sushi & Seafood Station', 'European Pastry & Artisan Dessert Counter', 'Unlimited Exotic Fruit Juices & Mocktails']
    },
    {
        id: 'serv-5',
        title: 'VIP Nightlife & Live Acoustic DJ Lounge',
        badge: 'Entertainment',
        timing: 'Night: 07:00 PM - 02:00 AM',
        img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600',
        desc: 'Open-air live band performances, DJ light shows, acoustic music sessions, and signature mocktails for an unforgettable night.',
        specialties: ['International DJ & Live Acoustic Performers', 'State-of-the-Art Laser Light Show', 'Exclusive VIP Sofa Lounge', 'Signature Resort Mocktails & Finger Food']
    },
    {
        id: 'serv-6',
        title: 'Live Acoustic Concert & Stage Show',
        badge: 'Entertainment',
        timing: 'Evening: 07:00 PM – 10:00 PM',
        img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600',
        desc: 'Open-air live acoustic band performances and cultural dance shows paired with a live open barbecue grill dinner.',
        specialties: ['Live Acoustic Guitar & Violin Performances', 'Open-Air Barbecue Grill Dinner', 'Cultural Dance Shows', 'Sunset Evening Vibe']
    },
    {
        id: 'serv-7',
        title: 'Heated Infinity Pool & Sunset Lounge',
        badge: 'Leisure Pool',
        timing: 'Open Daily: 06:00 AM – 10:00 PM',
        img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600',
        desc: 'Temperature-controlled rooftop infinity pool offering breathtaking sunset views, pool bar cocktails, and fresh towel services.',
        specialties: ['Temperature-Controlled Warm Water', 'Sun Lounger Deck & Juice Bar', 'Complimentary Swimming Goggles & Towel', 'Kid-Safe Shallow Pool Area']
    },
    {
        id: 'serv-8',
        title: 'Thai Wellness Spa & Sauna Bath',
        badge: 'Spa & Relaxation',
        timing: 'Open Daily: 09:00 AM – 09:00 PM',
        img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600',
        desc: 'Rejuvenate your body and mind with authentic Thai oil massages, herbal steam baths, hot stone therapy, and Jacuzzi sessions.',
        specialties: ['Certified Thai Massage Therapists', 'Herbal Steam Bath & Sauna Rooms', 'Hot Stone & Aromatherapy', 'Private Couple Spa Rooms']
    }
];

let reservations = [
    { id: 'GP-101', name: 'Tanvir Ahmed', room: 'Deluxe Double Room', dates: '2026-08-01 to 2026-08-03', bill: '৳10,000', status: 'Confirmed', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
    { id: 'GP-102', name: 'Nusrat Jahan', room: 'Executive Double Ocean View', dates: '2026-08-05 to 2026-08-07', bill: '৳25,800', status: 'Confirmed', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100' }
];

let uploadedGuestPhoto = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400';

// ==================================================================
// 3. LIVE CLOCK & TOAST NOTIFICATIONS
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
        position: fixed; top: 20px; right: 20px; z-index: 9999;
        padding: 14px 24px; border-radius: 10px; color: #fff;
        font-weight: 600; font-family: system-ui, -apple-system, sans-serif;
        box-shadow: 0 10px 25px rgba(0,0,0,0.25);
        background: ${type === 'success' ? '#10B981' : type === 'warning' ? '#F59E0B' : '#EF4444'};
        opacity: 0; transform: translateY(-20px); transition: all 0.3s ease;
    `;
    toast.innerText = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 50);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ==================================================================
// 4. REALTIME FIRESTORE SYNC
// ==================================================================
function initRealtimeSync() {
    onSnapshot(collection(db, "reservations"), (snapshot) => {
        if (!snapshot.empty) {
            reservations = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
        }
        renderTables();
        updateDashboardStats();
    }, (error) => {
        console.warn("Firestore offline, using local memory data:", error.message);
        renderTables();
        updateDashboardStats();
    });
}

// ==================================================================
// 5. INITIALIZATION & TAB SWITCHING
// ==================================================================
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
// 6. PHOTO PREVIEW & IMAGE HANDLERS
// ==================================================================
function previewUploadImage(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            uploadedGuestPhoto = event.target.result;
            const preview = document.getElementById('previewImg');
            if (preview) preview.src = uploadedGuestPhoto;
        };
        reader.readAsDataURL(file);
    }
}

function updateGuestImageFromUrl() {
    const urlInput = document.getElementById('imgUrlInput');
    const url = urlInput ? urlInput.value.trim() : '';
    if (url) {
        uploadedGuestPhoto = url;
        const preview = document.getElementById('previewImg');
        if (preview) preview.src = url;
        showToast("Profile image loaded!");
    } else {
        showToast("Please enter a valid image URL", "error");
    }
}

// ==================================================================
// 7. RENDERING ROOMS & SERVICES WITH MODAL TRIGGERS
// ==================================================================
function renderRooms() {
    const grid = document.getElementById('roomsCardsGrid');
    if (!grid) return;
    grid.innerHTML = roomsDatabase.map(room => `
        <div class="room-card">
            <div style="position:relative;">
                <img src="${room.img}" alt="${room.title}" style="width:100%; height:190px; object-fit:cover;">
                <span style="position:absolute; top:10px; left:10px; background:#10B981; color:#fff; padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:bold;">${room.badge}</span>
                <div style="position:absolute; bottom:10px; right:10px; background:rgba(0,0,0,0.85); color:#d4af37; padding:4px 10px; border-radius:6px; font-weight:bold;">৳${room.price.toLocaleString()} / night</div>
            </div>
            <div style="padding:15px; display:flex; flex-direction:column; justify-content:space-between; flex-grow:1;">
                <div>
                    <h3 style="font-size:1.05rem; color:#fff; margin-bottom:6px;">${room.title}</h3>
                    <p style="font-size:0.82rem; color:#94a3b8; margin-bottom:12px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${room.desc}</p>
                </div>
                <button class="btn-primary-block" onclick="openRoomModal('${room.id}')">
                    <i class="fa-solid fa-eye"></i> View Details
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
            <div style="position:relative;">
                <img src="${serv.img}" alt="${serv.title}" style="width:100%; height:180px; object-fit:cover;">
                <span style="position:absolute; top:10px; right:10px; background:#3B82F6; color:#fff; padding:4px 8px; border-radius:4px; font-size:0.75rem;">${serv.badge}</span>
            </div>
            <div style="padding:15px; display:flex; flex-direction:column; justify-content:space-between; flex-grow:1;">
                <div>
                    <h3 style="font-size:1.05rem; color:#fff; margin-bottom:4px;">${serv.title}</h3>
                    <small style="color:#d4af37; font-size:0.75rem; margin-bottom:8px; display:block;"><i class="fa-solid fa-clock"></i> ${serv.timing.split('|')[0]}</small>
                    <p style="font-size:0.82rem; color:#94a3b8; margin-bottom:10px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${serv.desc}</p>
                </div>
                <button class="btn-primary-block" onclick="openServiceModal('${serv.id}')">
                    <i class="fa-solid fa-list-check"></i> View Specialties
                </button>
            </div>
        </div>
    `).join('');
}

// ==================================================================
// 8. POPUP MODAL LOGIC (ROOM & SERVICE DETAILS)
// ==================================================================
function openRoomModal(roomId) {
    const room = roomsDatabase.find(r => r.id === roomId);
    if (!room) return;
    
    const content = document.getElementById('modalContent');
    content.innerHTML = `
        <div style="position:relative;">
            <img src="${room.img}" alt="${room.title}" style="width:100%; height:260px; object-fit:cover; border-top-left-radius:var(--radius-lg); border-top-right-radius:var(--radius-lg);">
            <span style="position:absolute; bottom:15px; left:15px; background:var(--primary-gold); color:#000; font-weight:bold; padding:6px 14px; border-radius:20px; font-size:0.9rem;">
                ৳${room.price.toLocaleString()} / night
            </span>
            <span style="position:absolute; top:15px; left:15px; background:#10B981; color:#fff; font-weight:bold; padding:4px 10px; border-radius:6px; font-size:0.75rem;">
                ${room.badge}
            </span>
        </div>
        <div style="padding:25px;">
            <h2 style="font-family:'Playfair Display', serif; color:#fff; font-size:1.6rem; margin-bottom:10px;">${room.title}</h2>
            <p style="color:var(--text-muted); font-size:0.9rem; line-height:1.6; margin-bottom:20px;">${room.desc}</p>
            
            <h4 style="color:var(--primary-gold); font-size:1rem; margin-bottom:12px; font-family:'Playfair Display', serif;"><i class="fa-solid fa-star"></i> Included Amenities & Features:</h4>
            <ul style="list-style:none; padding:0; display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:25px;">
                ${room.amenities.map(a => `<li style="color:#e2e8f0; font-size:0.85rem; display:flex; align-items:center; gap:8px;"><i class="fa-solid fa-circle-check" style="color:var(--primary-gold);"></i> ${a}</li>`).join('')}
            </ul>
            
            <button class="btn-primary-block" onclick="selectRoomAndBook('${room.title}|${room.price}')">
                <i class="fa-solid fa-calendar-check"></i> Book This Room Now
            </button>
        </div>
    `;
    document.getElementById('detailsModal')?.classList.add('active');
}

function openServiceModal(servId) {
    const serv = servicesDatabase.find(s => s.id === servId);
    if (!serv) return;

    const content = document.getElementById('modalContent');
    content.innerHTML = `
        <div style="position:relative;">
            <img src="${serv.img}" alt="${serv.title}" style="width:100%; height:260px; object-fit:cover; border-top-left-radius:var(--radius-lg); border-top-right-radius:var(--radius-lg);">
            <span style="position:absolute; bottom:15px; left:15px; background:var(--blue-accent); color:#fff; font-weight:bold; padding:6px 14px; border-radius:20px; font-size:0.85rem;">
                ${serv.badge}
            </span>
        </div>
        <div style="padding:25px;">
            <h2 style="font-family:'Playfair Display', serif; color:#fff; font-size:1.6rem; margin-bottom:8px;">${serv.title}</h2>
            <p style="color:var(--primary-gold); font-size:0.85rem; font-weight:500; margin-bottom:15px;"><i class="fa-solid fa-clock"></i> Timings: ${serv.timing}</p>
            <p style="color:var(--text-muted); font-size:0.9rem; line-height:1.6; margin-bottom:20px;">${serv.desc}</p>

            <h4 style="color:var(--primary-gold); font-size:1rem; margin-bottom:12px; font-family:'Playfair Display', serif;"><i class="fa-solid fa-utensils"></i> Menu & Facility Highlights:</h4>
            <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:10px; margin-bottom:25px;">
                ${serv.specialties.map(s => `<li style="color:#e2e8f0; font-size:0.85rem; display:flex; align-items:center; gap:10px;"><i class="fa-solid fa-fire-flame-curved" style="color:var(--primary-gold);"></i> ${s}</li>`).join('')}
            </ul>

            <button class="btn-primary-block" onclick="closeModal(); switchTab('booking');">
                <i class="fa-solid fa-calendar-plus"></i> Go To Booking & Order Services
            </button>
        </div>
    `;
    document.getElementById('detailsModal')?.classList.add('active');
}

function closeModal() {
    document.getElementById('detailsModal')?.classList.remove('active');
}

function closeModalOnOutsideClick(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
}

function selectRoomAndBook(roomValue) {
    closeModal();
    switchTab('booking');
    const select = document.getElementById('roomTypeSelect');
    if (select) {
        select.value = roomValue;
        calcTotal();
    }
}

// ==================================================================
// 9. DYNAMIC BILLING & FORM SUBMISSION
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
        const price = cb.getAttribute('data-price');
        if (price) addOnPrice += parseInt(price);
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
    if (document.getElementById('billTotal')) document.getElementById('billTotal').innerText = `৳${grandTotal.toLocaleString()} (Inc. VAT & Service Charge)`;

    return { nights, roomSubtotal, servicesSubtotal, grandTotal };
}

async function handleBookingSubmit(e) {
    e.preventDefault();
    const fName = document.getElementById('fName')?.value || 'Guest';
    const lName = document.getElementById('lName')?.value || '';
    const roomSelect = document.getElementById('roomTypeSelect');
    const roomVal = roomSelect ? roomSelect.value.split('|')[0] : 'Single Standard Room';
    const checkIn = document.getElementById('checkIn')?.value || new Date().toISOString().split('T')[0];
    const checkOut = document.getElementById('checkOut')?.value || new Date().toISOString().split('T')[0];

    const billing = calcTotal();

    const newBooking = {
        id: `GP-${Math.floor(100000 + Math.random() * 900000)}`,
        name: `${fName} ${lName}`.trim(),
        room: roomVal,
        dates: `${checkIn} to ${checkOut}`,
        bill: `৳${billing.grandTotal.toLocaleString()}`,
        totalBill: billing.grandTotal,
        img: uploadedGuestPhoto,
        status: 'Confirmed',
        createdAt: new Date().toISOString()
    };

    try {
        await addDoc(collection(db, "reservations"), newBooking);
        showToast(`🎉 Reservation ${newBooking.id} Completed Successfully!`);
    } catch (err) {
        showToast("Saved locally (Firestore Offline)", "warning");
        reservations.unshift(newBooking);
        renderTables();
        updateDashboardStats();
    }

    resetForm();
    switchTab('guests');
}

function resetForm() {
    const form = document.getElementById('reservationForm');
    if (form) form.reset();
    uploadedGuestPhoto = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400';
    const preview = document.getElementById('previewImg');
    if (preview) preview.src = uploadedGuestPhoto;
    setTodayDates();
    calcTotal();
}

// ==================================================================
// 10. DIRECTORY TABLES, STATS & SEARCH
// ==================================================================
function updateDashboardStats() {
    const totalStat = document.getElementById('statTotalBookings');
    const revenueStat = document.getElementById('statRevenue');
    
    if (totalStat) totalStat.innerText = reservations.length;
    if (revenueStat) {
        const totalRevenue = reservations.reduce((acc, curr) => {
            const billNum = parseInt((curr.bill || '0').replace(/[^0-9]/g, '')) || 0;
            return acc + billNum;
        }, 0);
        revenueStat.innerText = `৳${totalRevenue.toLocaleString()}`;
    }
}

function renderTables() {
    const dashBody = document.getElementById('dashboardTableBody');
    const guestBody = document.getElementById('fullBookingsTableBody');

    const rows = reservations.map(g => {
        const docId = g.docId || '';
        return `
            <tr>
                <td><img src="${g.img}" class="guest-avatar-td" alt="${g.name}"></td>
                <td><strong style="color:#d4af37;">${g.id}</strong></td>
                <td>${g.name}</td>
                <td>${g.room}</td>
                <td>${g.dates}</td>
                <td><strong style="color:#10B981;">${g.bill}</strong></td>
                <td>
                    ${docId ? `<button onclick="deleteBooking('${docId}')" style="background:#ef4444; color:#fff; border:none; padding:6px 10px; border-radius:4px; cursor:pointer;"><i class="fa-solid fa-trash"></i> Delete</button>` : `<span style="color:#94a3b8; font-size:0.75rem;">Default</span>`}
                </td>
            </tr>
        `;
    }).join('');

    if (dashBody) dashBody.innerHTML = rows;
    if (guestBody) guestBody.innerHTML = rows;
}

function searchGuests() {
    const query = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const filtered = reservations.filter(g => 
        (g.name || '').toLowerCase().includes(query) || 
        (g.room || '').toLowerCase().includes(query) || 
        (g.id || '').toLowerCase().includes(query)
    );

    const guestBody = document.getElementById('fullBookingsTableBody');
    if (guestBody) {
        guestBody.innerHTML = filtered.map(g => `
            <tr>
                <td><img src="${g.img}" class="guest-avatar-td" alt="${g.name}"></td>
                <td><strong style="color:#d4af37;">${g.id}</strong></td>
                <td>${g.name}</td>
                <td>${g.room}</td>
                <td>${g.dates}</td>
                <td><strong style="color:#10B981;">${g.bill}</strong></td>
                <td>
                    ${g.docId ? `<button onclick="deleteBooking('${g.docId}')" style="background:#ef4444; color:#fff; border:none; padding:6px 10px; border-radius:4px; cursor:pointer;"><i class="fa-solid fa-trash"></i> Delete</button>` : ''}
                </td>
            </tr>
        `).join('');
    }
}

async function deleteBooking(docId) {
    if (confirm("Are you sure you want to delete this reservation?")) {
        try {
            await deleteDoc(doc(db, "reservations", docId));
            showToast("Reservation deleted!");
        } catch (err) {
            showToast("Failed to delete: " + err.message, "error");
        }
    }
}

// ==================================================================
// 11. GLOBAL WINDOW BINDINGS
// ==================================================================
window.switchTab = switchTab;
window.toggleSidebar = toggleSidebar;
window.previewUploadImage = previewUploadImage;
window.updateGuestImageFromUrl = updateGuestImageFromUrl;
window.calculateBilling = calcTotal;
window.resetForm = resetForm;
window.searchGuests = searchGuests;
window.deleteBooking = deleteBooking;
window.openRoomModal = openRoomModal;
window.openServiceModal = openServiceModal;
window.closeModal = closeModal;
window.closeModalOnOutsideClick = closeModalOnOutsideClick;
window.selectRoomAndBook = selectRoomAndBook;
