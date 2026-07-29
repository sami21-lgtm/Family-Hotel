import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getFirestore, collection, addDoc, onSnapshot, 
    deleteDoc, doc, setDoc, updateDoc 
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
// 2. SYSTEM & FINANCIAL CONSTANTS
// ==================================================================
const TAX_RATE = 0.15;           // 15% VAT
const SERVICE_CHARGE_RATE = 0.10; // 10% Hotel Service Charge

// ALL 8 ROOMS DATABASE
let roomsDatabase = [
    {
        id: 'single-std',
        title: 'Single Standard Room',
        price: 800,
        badge: 'AVAILABLE',
        img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600',
        desc: 'Designed for solo travelers in a peaceful environment. Features high-speed Wi-Fi, AC, smart TV, and a balcony with a city view.',
        amenities: ['1 Single Bed', 'Free High-Speed Wi-Fi & AC', '43-inch Smart TV', 'City View Balcony']
    },
    {
        id: 'single-exec',
        title: 'Single Executive Room',
        price: 1000,
        badge: 'AVAILABLE',
        img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600',
        desc: 'An ideal room for business or executive stays. Features a work desk, mini-bar, balcony, and a personal coffee maker.',
        amenities: ['1 Executive Single Bed', 'Work Desk & Mini-Bar', 'Balcony View & Coffee Maker', 'Free Breakfast Pack']
    },
    {
        id: 'deluxe-double',
        title: 'Deluxe Double Room',
        price: 5000,
        badge: 'AVAILABLE',
        img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600',
        desc: 'Spacious double bed with a premium mattress and beautiful city views. Extremely comfortable for couples.',
        amenities: ['1 Double King Bed', 'City View & Sofa Seating', 'Complimentary Buffet Breakfast', 'Private Luxury Washroom']
    },
    {
        id: 'super-deluxe',
        title: 'Super Deluxe Double Room',
        price: 7500,
        badge: 'AVAILABLE',
        img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600',
        desc: 'Decorated with premium interiors, this Super Deluxe Double Room features sofa seating and modern bathroom fittings.',
        amenities: ['Premium Bed with Plush Duvet', 'Sofa Seating & Dining Corner', 'Smart TV & Free Wi-Fi', '24-Hour Room Service']
    },
    {
        id: 'exec-ocean',
        title: 'Executive Double Ocean View',
        price: 10000,
        badge: 'AVAILABLE',
        img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600',
        desc: 'Enjoy panoramic ocean views right from your balcony. Includes a private jacuzzi and executive lounge access.',
        amenities: ['Panoramic Ocean View Balcony', 'Private Jacuzzi Bathtub', 'Executive Lounge Access', '24/7 Dedicated Service']
    },
    {
        id: 'royal-family',
        title: 'Royal Family Suite',
        price: 20000,
        badge: 'AVAILABLE',
        img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600',
        desc: 'A spacious multi-room suite perfect for the entire family. Features a master bedroom and a separate dining lounge.',
        amenities: ['Multi-Room Family Suite', 'Master Bedroom & Dining Lounge', 'VIP Snack Box', 'Free Kids Play Zone Access']
    },
    {
        id: 'presidential-vip',
        title: 'Ultra-Luxurious Presidential VIP Suite',
        price: 35000,
        badge: 'AVAILABLE',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
        desc: 'Offers a royal experience with a personal butler, living room, luxury marble bathroom, and limousine pickup service.',
        amenities: ['24/7 Personal Butler', 'Marble Luxury Bathroom', 'VIP Limousine Airport Pickup', 'Private Lounge & Dining']
    },
    {
        id: 'palace-villa',
        title: 'Royal Palace Villa with Private Pool',
        price: 50000,
        badge: 'AVAILABLE',
        img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600',
        desc: 'An exclusive villa featuring its own private infinity pool, open garden lounge, and a dedicated personal chef.',
        amenities: ['Private Infinity Pool', 'Open Garden Lounge', 'Dedicated Personal Chef', 'Private Spa Access']
    }
];

// ALL 8 SERVICES DATABASE
let servicesDatabase = [
    {
        id: 'serv-1',
        title: 'Traditional Royal Bengali Feast',
        badge: 'Bengali Cuisine',
        timing: 'Lunch & Dinner Slots',
        img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
        desc: 'Try our Royal Bengali Dining to taste authentic Kacchi Biryani, Mustard Hilsa, assorted Bhartas, and traditional sweets.',
        specialties: ['Mutton Kacchi Biryani & Mezban Beef', 'Fresh Fried Mustard Hilsa', '10+ Varieties of Bharta & Sweets', 'Lunch: 12:30 PM - 3:30 PM & Dinner: 8:00 PM - 11:00 PM']
    },
    {
        id: 'serv-2',
        title: 'Authentic Thai Gourmet',
        badge: 'Thai Cuisine',
        timing: 'All Day Dining',
        img: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600',
        desc: 'Original Tom Yum Soup, Seafood Pad Thai, and signature Mango Sticky Rice prepared by authentic Thai chefs.',
        specialties: ['Spicy Prawn Tom Yum Soup', 'Seafood Pad Thai Noodles', 'Green Curry & Mango Sticky Rice', 'Available: 8:00 AM - 11:00 PM']
    },
    {
        id: 'serv-3',
        title: 'Royal Indian Breakfast & Snacks',
        badge: 'Indian Gourmet',
        timing: 'Morning & Evening',
        img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600',
        desc: 'Crispy Masala Dosa and Puri Bhaji for morning breakfast, alongside Hyderabadi Biryani and hot Masala Chai for the evening.',
        specialties: ['South Indian Crispy Masala Dosa', 'Hot Puri Bhaji & Shahi Samosa', 'Hyderabadi Chicken Dum Biryani', 'Morning: 6:30 AM - 10:30 AM & Evening: 5:00 PM - 8:00 PM']
    },
    {
        id: 'serv-4',
        title: 'Continental 5-Star Buffet',
        badge: 'Global Buffet',
        timing: 'Breakfast, Lunch & Dinner',
        img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
        desc: 'International-grade live kitchen serving steaks, Italian pasta, European pastries, and an unlimited mocktail corner.',
        specialties: ['Live Grill Steak & Italian Pasta', 'International Pastry & Dessert Bar', 'Unlimited Fresh Juices & Mocktails', 'Breakfast, Lunch & Dinner Slots']
    },
    {
        id: 'serv-5',
        title: 'VIP Nightlife & Live DJ Party Lounge',
        badge: 'Entertainment',
        timing: 'Night: 09:00 PM – 03:00 AM',
        img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600',
        desc: 'Experience laser light shows, high-energy music, and signature mocktails in our VIP DJ Lounge.',
        specialties: ['International DJ Performances', 'Signature Mocktails & Finger Food', 'VIP Lounge Seating', 'Night: 09:00 PM - 03:00 AM']
    },
    {
        id: 'serv-6',
        title: 'Live Acoustic Concert & Stage Show',
        badge: 'Entertainment',
        timing: 'Evening: 07:00 PM – 10:00 PM',
        img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600',
        desc: 'Open-air live band performances and cultural evenings paired with a live barbecue dinner.',
        specialties: ['Live Acoustic Band Music', 'Open-Air Barbecue Dinner', 'Cultural Performances', 'Evening: 07:00 PM - 10:00 PM']
    },
    {
        id: 'serv-7',
        title: 'Heated Infinity Pool & Sunset Lounge',
        badge: 'Leisure',
        timing: '06:00 AM – 10:00 PM',
        img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600',
        desc: 'Temperature-controlled infinity pool offering stunning sunset views, complete with pool-bar access.',
        specialties: ['Temperature-Controlled Water', 'Sun Lounger & Fresh Juice Bar', 'Free Swimming Kit & Towel', '06:00 AM - 10:00 PM']
    },
    {
        id: 'serv-8',
        title: 'VIP TechnoGym & Thai Wellness Spa',
        badge: 'Fitness & Spa',
        timing: '06:00 AM – 09:00 PM',
        img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600',
        desc: 'Health center offering authentic Thai massage, steam bath, sauna, and modern cardio fitness equipment.',
        specialties: ['Authentic Thai Therapists Spa', 'Steam Bath, Sauna & Jacuzzi', 'TechnoGym Cardio Equipment', '06:00 AM - 09:00 PM']
    }
];

let reservations = [
    { id: 'GP-101', name: 'Tanvir Ahmed', room: 'Deluxe Double Room', dates: '2026-08-01 to 2026-08-03', bill: '৳10,000', status: 'Confirmed', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
    { id: 'GP-102', name: 'Nusrat Jahan', room: 'Executive Double Ocean View', dates: '2026-08-05 to 2026-08-07', bill: '৳25,800', status: 'Confirmed', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100' }
];

let selectedRoomForModal = '';
let uploadedGuestPhoto = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100';

// ==================================================================
// 3. LIVE BANGLADESH CLOCK & TOAST NOTIFICATIONS
// ==================================================================
function startClock() {
    function updateClock() {
        const now = new Date();
        const timeOptions = { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const dateOptions = { timeZone: 'Asia/Dhaka', month: 'short', day: 'numeric', year: 'numeric' };
        
        const timeStr = now.toLocaleTimeString('en-US', timeOptions);
        const dateStr = now.toLocaleDateString('en-US', dateOptions);
        
        const clockEl = document.getElementById('liveClock') || document.getElementById('currentDateDisplay');
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
    }, (error) => {
        console.warn("Firestore offline, loading local data:", error.message);
    });

    onSnapshot(collection(db, "rooms"), (snapshot) => {
        snapshot.docs.forEach(docSnap => {
            const data = docSnap.data();
            const room = roomsDatabase.find(r => r.id === docSnap.id);
            if (room && data.badge) room.badge = data.badge;
        });
        renderRooms();
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

    const bookingForm = document.getElementById('bookingForm') || document.getElementById('reservationForm');
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
// 6. PHOTO PREVIEW & IMAGE URL HANDLERS
// ==================================================================
function previewUploadImage(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            uploadedGuestPhoto = event.target.result;
            const preview = document.getElementById('guestImgPreview') || document.getElementById('previewImg');
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
        const preview = document.getElementById('guestImgPreview') || document.getElementById('previewImg');
        if (preview) preview.src = url;
        showToast("Profile image loaded!");
    } else {
        showToast("Please enter a valid image URL", "error");
    }
}

// ==================================================================
// 7. RENDERING ROOMS & SERVICES (WITH VIEW BUTTONS)
// ==================================================================
function renderRooms() {
    const grid = document.getElementById('roomsCardsGrid');
    if (!grid) return;
    grid.innerHTML = roomsDatabase.map(room => `
        <div class="room-card">
            <div class="room-card-img-wrap" style="position:relative;">
                <img src="${room.img}" class="room-card-img" alt="${room.title}" style="width:100%; height:200px; object-fit:cover;">
                <span class="card-top-tag" style="position:absolute; top:10px; left:10px; background:#10B981; color:#fff; padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:bold;">${room.badge}</span>
                <div class="card-price-overlay" style="position:absolute; bottom:10px; right:10px; background:rgba(0,0,0,0.8); color:#d4af37; padding:4px 10px; border-radius:6px; font-weight:bold;">৳${room.price.toLocaleString()} / night</div>
            </div>
            <div class="room-card-body" style="padding:15px;">
                <h3 class="room-card-title">${room.title}</h3>
                <p class="room-card-desc" style="font-size:0.85rem; color:#64748b;">${room.desc.substring(0, 85)}...</p>
                <button class="btn-secondary" onclick="openRoomModal('${room.id}')" style="width:100%; padding:8px; background:#d4af37; color:#000; border:none; border-radius:6px; font-weight:bold; cursor:pointer;">
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
            <div class="room-card-img-wrap" style="position:relative;">
                <img src="${serv.img}" class="room-card-img" alt="${serv.title}" style="width:100%; height:180px; object-fit:cover;">
                <span class="card-top-tag timing-tag" style="position:absolute; top:10px; right:10px; background:#3B82F6; color:#fff; padding:4px 8px; border-radius:4px; font-size:0.75rem;">${serv.badge}</span>
            </div>
            <div class="room-card-body" style="padding:15px;">
                <h3 class="room-card-title">${serv.title}</h3>
                <small style="color:#d4af37; font-size:0.75rem; margin-bottom:8px; display:block;"><i class="fa-solid fa-clock"></i> ${serv.timing}</small>
                <p class="room-card-desc" style="font-size:0.85rem; color:#64748b;">${serv.desc.substring(0, 85)}...</p>
                <button class="btn-secondary" onclick="openServiceModal('${serv.id}')" style="width:100%; padding:8px; background:#0f172a; color:#fff; border:none; border-radius:6px; font-weight:bold; cursor:pointer;">
                    <i class="fa-solid fa-list-check"></i> View Specialties
                </button>
            </div>
        </div>
    `).join('');
}

// ==================================================================
// 8. MODAL CONTROLLERS
// ==================================================================
function openRoomModal(roomId) {
    const room = roomsDatabase.find(r => r.id === roomId);
    if (!room) return;

    selectedRoomForModal = `${room.title}|${room.price}`;

    if (document.getElementById('modalRoomTitle')) document.getElementById('modalRoomTitle').innerText = room.title;
    if (document.getElementById('modalRoomBadge')) document.getElementById('modalRoomBadge').innerText = room.badge;
    if (document.getElementById('modalRoomPrice')) document.getElementById('modalRoomPrice').innerHTML = `৳${room.price.toLocaleString()} <span>/ night</span>`;
    if (document.getElementById('modalRoomImg')) document.getElementById('modalRoomImg').src = room.img;
    if (document.getElementById('modalRoomDesc')) document.getElementById('modalRoomDesc').innerText = room.desc;

    const amenitiesList = document.getElementById('modalRoomAmenities');
    if (amenitiesList) {
        amenitiesList.innerHTML = room.amenities.map(a => `<li><i class="fa-solid fa-check-circle"></i> ${a}</li>`).join('');
    }

    const modal = document.getElementById('roomModal');
    if (modal) modal.classList.add('active');
}

function closeRoomModal() {
    const modal = document.getElementById('roomModal');
    if (modal) modal.classList.remove('active');
}

function bookFromModal() {
    closeRoomModal();
    switchTab('booking');
    const select = document.getElementById('roomSelect') || document.getElementById('roomTypeSelect');
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

    if (document.getElementById('modalServiceTitle')) document.getElementById('modalServiceTitle').innerText = serv.title;
    if (document.getElementById('modalServiceBadge')) document.getElementById('modalServiceBadge').innerText = serv.badge;
    if (document.getElementById('modalServiceTiming')) document.getElementById('modalServiceTiming').innerHTML = `<i class="fa-solid fa-clock"></i> ${serv.timing}`;
    if (document.getElementById('modalServiceImg')) document.getElementById('modalServiceImg').src = serv.img;
    if (document.getElementById('modalServiceDesc')) document.getElementById('modalServiceDesc').innerText = serv.desc;

    const specsList = document.getElementById('modalServiceSpecialties');
    if (specsList) {
        specsList.innerHTML = serv.specialties.map(s => `<li><i class="fa-solid fa-star"></i> ${s}</li>`).join('');
    }

    const modal = document.getElementById('serviceModal');
    if (modal) modal.classList.add('active');
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    if (modal) modal.classList.remove('active');
}

// ==================================================================
// 9. DYNAMIC BILLING & FORM SUBMISSION
// ==================================================================
function setTodayDates() {
    const checkInEl = document.getElementById('checkInDate') || document.getElementById('checkIn');
    const checkOutEl = document.getElementById('checkOutDate') || document.getElementById('checkOut');
    
    if (checkInEl) checkInEl.valueAsDate = new Date();
    if (checkOutEl) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        checkOutEl.valueAsDate = tomorrow;
    }
}

function calcTotal() {
    const checkInVal = document.getElementById('checkInDate')?.value || document.getElementById('checkIn')?.value;
    const checkOutVal = document.getElementById('checkOutDate')?.value || document.getElementById('checkOut')?.value;

    const d1 = checkInVal ? new Date(checkInVal) : new Date();
    const d2 = checkOutVal ? new Date(checkOutVal) : new Date();

    let nights = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    if (isNaN(nights) || nights < 1) nights = 1;

    const selectEl = document.getElementById('roomSelect') || document.getElementById('roomTypeSelect');
    const roomVal = selectEl ? selectEl.value : 'Single Standard Room|800';
    const roomPrice = parseInt(roomVal.split('|')[1]) || 800;

    let addOnPrice = 0;
    document.querySelectorAll('input[name="foodMenu"]:checked, input[name="poolGym"]:checked, input[name="amenities"]:checked').forEach(cb => {
        const p = cb.getAttribute('data-price') || cb.dataset.price;
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
    if (document.getElementById('billTotal')) document.getElementById('billTotal').innerText = `৳${grandTotal.toLocaleString()} (Inc. VAT & Service Charge)`;

    return { nights, roomSubtotal, servicesSubtotal, grandTotal };
}

async function handleBookingSubmit(e) {
    e.preventDefault();

    const fNameEl = document.getElementById('guestFName') || document.getElementById('fName');
    const lNameEl = document.getElementById('guestLName') || document.getElementById('lName');
    const selectEl = document.getElementById('roomSelect') || document.getElementById('roomTypeSelect');
    const inDateEl = document.getElementById('checkInDate') || document.getElementById('checkIn');
    const outDateEl = document.getElementById('checkOutDate') || document.getElementById('checkOut');

    const fname = fNameEl ? fNameEl.value : 'Guest';
    const lname = lNameEl ? lNameEl.value : '';
    const roomVal = selectEl ? selectEl.value.split('|')[0] : 'Single Standard Room';
    const inDate = inDateEl ? inDateEl.value : new Date().toISOString().split('T')[0];
    const outDate = outDateEl ? outDateEl.value : new Date().toISOString().split('T')[0];

    const billing = calcTotal();

    const newBooking = {
        id: `GP-${Math.floor(100000 + Math.random() * 900000)}`,
        name: `${fname} ${lname}`.trim(),
        guestName: `${fname} ${lname}`.trim(),
        room: roomVal,
        dates: `${inDate} to ${outDate}`,
        checkIn: inDate,
        checkOut: outDate,
        nights: billing.nights,
        bill: `৳${billing.grandTotal.toLocaleString()}`,
        totalBill: billing.grandTotal,
        img: uploadedGuestPhoto,
        photo: uploadedGuestPhoto,
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
    }

    const bookingForm = document.getElementById('bookingForm') || document.getElementById('reservationForm');
    if (bookingForm) bookingForm.reset();

    uploadedGuestPhoto = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100';
    const preview = document.getElementById('guestImgPreview') || document.getElementById('previewImg');
    if (preview) preview.src = uploadedGuestPhoto;

    setTodayDates();
    calcTotal();
    switchTab('guests');
}

// ==================================================================
// 10. DIRECTORY TABLES & SEARCH
// ==================================================================
function renderTables() {
    const dashBody = document.getElementById('dashboardTableBody');
    const guestBody = document.getElementById('guestDirectoryTableBody') || document.getElementById('fullBookingsTableBody');

    const totalStat = document.getElementById('statTotalBookings');
    if (totalStat) totalStat.innerText = reservations.length;

    const rows = reservations.map(g => {
        const docId = g.docId || '';
        return `
            <tr>
                <td><img src="${g.img || g.photo}" class="guest-avatar-td" alt="${g.name || g.guestName}" style="width:38px; height:38px; border-radius:50%; object-fit:cover;"></td>
                <td><strong style="color:#d4af37;">${g.id}</strong></td>
                <td>${g.name || g.guestName}</td>
                <td>${g.room}</td>
                <td>${g.dates || (g.checkIn + ' to ' + g.checkOut)}</td>
                <td><strong style="color:#10B981;">${g.bill || ('৳' + (g.totalBill || 0).toLocaleString())}</strong></td>
                ${docId ? `<td><button onclick="deleteBooking('${docId}')" style="background:#ef4444; color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;"><i class="fa-solid fa-trash"></i></button></td>` : ''}
            </tr>
        `;
    }).join('');

    if (dashBody) dashBody.innerHTML = rows;
    if (guestBody) guestBody.innerHTML = rows;
}

function searchGuests() {
    const queryEl = document.getElementById('searchInput');
    if (!queryEl) return;
    const query = queryEl.value.toLowerCase();

    const filtered = reservations.filter(g => {
        const name = (g.name || g.guestName || '').toLowerCase();
        const room = (g.room || '').toLowerCase();
        const id = (g.id || '').toLowerCase();
        return name.includes(query) || room.includes(query) || id.includes(query);
    });

    const guestBody = document.getElementById('guestDirectoryTableBody') || document.getElementById('fullBookingsTableBody');
    if (guestBody) {
        guestBody.innerHTML = filtered.map(g => `
            <tr>
                <td><img src="${g.img || g.photo}" class="guest-avatar-td" alt="${g.name || g.guestName}" style="width:38px; height:38px; border-radius:50%; object-fit:cover;"></td>
                <td><strong style="color:#d4af37;">${g.id}</strong></td>
                <td>${g.name || g.guestName}</td>
                <td>${g.room}</td>
                <td>${g.dates || (g.checkIn + ' to ' + g.checkOut)}</td>
                <td><strong style="color:#10B981;">${g.bill || ('৳' + (g.totalBill || 0).toLocaleString())}</strong></td>
                ${g.docId ? `<td><button onclick="deleteBooking('${g.docId}')" style="background:#ef4444; color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;"><i class="fa-solid fa-trash"></i></button></td>` : ''}
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
            showToast("Failed to delete record: " + err.message, "error");
        }
    }
}

// ==================================================================
// 11. GLOBAL EVENT BINDINGS
// ==================================================================
window.switchTab = switchTab;
window.toggleSidebar = toggleSidebar;
window.previewUploadImage = previewUploadImage;
window.updateGuestImageFromUrl = updateGuestImageFromUrl;
window.openRoomModal = openRoomModal;
window.closeRoomModal = closeRoomModal;
window.bookFromModal = bookFromModal;
window.openServiceModal = openServiceModal;
window.closeServiceModal = closeServiceModal;
window.calcTotal = calcTotal;
window.calculateBilling = calcTotal;
window.handleBookingSubmit = handleBookingSubmit;
window.searchGuests = searchGuests;
window.deleteBooking = deleteBooking;
