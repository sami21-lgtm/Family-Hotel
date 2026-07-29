import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ------------------------------------------------------------------
// 1. FIREBASE CONFIGURATION
// ------------------------------------------------------------------
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

// ------------------------------------------------------------------
// 2. FINANCIAL & SYSTEM CONSTANTS
// ------------------------------------------------------------------
const TAX_RATE = 0.15;           // 15% VAT/Tax
const SERVICE_CHARGE_RATE = 0.10; // 10% Hotel Service Charge

// ৮টি ভিন্ন ভিন্ন ভ্যারাইটি ও বাজেট ফ্রেন্ডলি থেকে VIP প্রাইসিং রেঞ্জ (800 - 50,000)
let defaultRooms = [
    { id: 'room-1', title: 'Single Standard Room', price: 800, desc: 'Compact single room with high-speed WiFi, smart TV, air conditioning, and city view.', photo: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format&fit=crop&q=80', status: 'Available' },
    { id: 'room-2', title: 'Single Executive Room', price: 1000, desc: 'Cozy executive single bed with work desk, mini-bar, Smart TV, and balcony view.', photo: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop&q=80', status: 'Available' },
    { id: 'room-3', title: 'Deluxe Double Room', price: 5000, desc: 'Spacious double bed with plush duvet, city view, Smart TV, and complimentary breakfast.', photo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80', status: 'Available' },
    { id: 'room-4', title: 'Super Deluxe Double Room', price: 7500, desc: 'Premium double room with sofa seating, luxury bathroom, free high-speed WiFi & breakfast.', photo: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&auto=format&fit=crop&q=80', status: 'Available' },
    { id: 'room-5', title: 'Executive Double Ocean View', price: 10000, desc: 'Luxury double bed with panoramic ocean view, Jacuzzi bath, executive lounge access & 24/7 room service.', photo: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&auto=format&fit=crop&q=80', status: 'Available' },
    { id: 'room-6', title: 'Royal Family Suite', price: 20000, desc: 'Large multi-room suite suitable for families with master bedroom, dining lounge, and VIP amenities.', photo: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&auto=format&fit=crop&q=80', status: 'Available' },
    { id: 'room-7', title: 'Ultra-Luxurious Presidential VIP Suite', price: 35000, desc: 'Master suite with private butler, living room, marble bathroom, and VIP airport pickup.', photo: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&auto=format&fit=crop&q=80', status: 'Available' },
    { id: 'room-8', title: 'Royal Palace Villa with Private Pool', price: 50000, desc: 'Exclusive private villa featuring personal infinity pool, garden lounge, and dedicated private chef.', photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80', status: 'Available' }
];

let defaultServices = [
    { id: 'srv-1', title: '🇧🇩 Traditional Royal Bengali Feast', category: 'Bangla Cuisine', time: 'Lunch & Dinner Slots', desc: 'Kacchi Biryani, Hilsha fry, traditional Vorta items, and authentic Sweets.', photo: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80' },
    { id: 'srv-2', title: '🇹🇭 Authentic Thai Gourmet', category: 'Thai Cuisine', time: 'All Day Dining', desc: 'Fresh Tom Yum soup, Pad Thai noodles, Green Curry, and Mango Sticky Rice.', photo: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&auto=format&fit=crop&q=80' },
    { id: 'srv-3', title: '🇮🇳 Royal Indian Breakfast & Evening Snacks', category: 'Indian Gourmet', time: 'Morning Breakfast & Evening Snacks', desc: 'Crispy Masala Dosa, Puri Bhaji, Samosas, Hyderabadi Biryani, and Masala Chai.', photo: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80' },
    { id: 'srv-4', title: '🌐 Continental 5-Star Buffet', category: 'Global Buffet', time: 'Breakfast, Lunch & Dinner', desc: 'International live kitchen, steaks, pasta, fresh pastries, and unlimited mocktails.', photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80' },
    { id: 'srv-5', title: '🎧 VIP Nightlife & Live DJ Party Lounge', category: 'Entertainment', time: 'Night: 09:00 PM - 03:00 AM', desc: 'High-energy DJ performance, laser light show, signature mocktails & VIP lounge access.', photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80' },
    { id: 'srv-6', title: '🎭 Live Acoustic Concert & Stage Show', category: 'Entertainment', time: 'Evening: 07:00 PM - 10:00 PM', desc: 'Live music band, cultural acoustic sessions, BBQ dinner & open-air stage performance.', photo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80' },
    { id: 'srv-7', title: '🏊‍♂️ Heated Infinity Pool & Sunset Lounge', category: 'Wellness & Leisure', time: '06:00 AM - 10:00 PM', desc: 'Temperature-controlled pool with sunset views, sun loungers & pool bar refreshments.', photo: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&auto=format&fit=crop&q=80' },
    { id: 'srv-8', title: '🏋️‍♂️ VIP TechnoGym & Thai Wellness Spa', category: 'Fitness & Spa', time: '06:00 AM - 09:00 PM', desc: 'Modern fitness cardio center, authentic Thai massage, sauna, steam bath & Jacuzzi.', photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80' }
];

let roomsData = [...defaultRooms];
let servicesData = [...defaultServices];
let reservations = [];
let currentGuestPhotoBase64 = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';

// ------------------------------------------------------------------
// 3. LIVE INTERNATIONAL DIGITAL CLOCK FUNCTION
// ------------------------------------------------------------------
function startLiveClock() {
    function updateClock() {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const timeStr = now.toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' }); // 24-Hour International UTC Format
        
        const clockEl = document.getElementById('currentDateDisplay');
        if (clockEl) {
            clockEl.innerHTML = `<i class="fa-solid fa-globe" style="color: #d4af37; margin-right: 5px;"></i> <strong>${timeStr} UTC</strong> | <small>${dateStr}</small>`;
        }
    }
    updateClock();
    setInterval(updateClock, 1000); // রিয়েল-টাইম সেকেন্ড কাউন্টডাউন
}

// ------------------------------------------------------------------
// 4. CUSTOM MODERN TOAST NOTIFICATION SYSTEM
// ------------------------------------------------------------------
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 9999;
        padding: 14px 24px; border-radius: 10px; color: #fff;
        font-weight: 600; font-family: sans-serif;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
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

// ------------------------------------------------------------------
// 5. REAL-TIME FIRESTORE DATA SYNC
// ------------------------------------------------------------------
function initRealtimeSync() {
    onSnapshot(collection(db, "reservations"), (snapshot) => {
        reservations = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
        updateDashboard();
        renderFullBookingsTable();
    }, (error) => {
        showToast("Database Sync Error: " + error.message, "error");
    });

    onSnapshot(collection(db, "rooms"), (snapshot) => {
        snapshot.docs.forEach(docSnap => {
            const data = docSnap.data();
            const room = roomsData.find(r => r.id === docSnap.id);
            if (room) {
                if (data.photo) room.photo = data.photo;
                if (data.status) room.status = data.status;
            }
        });
        renderRoomCards();
    });

    onSnapshot(collection(db, "services"), (snapshot) => {
        snapshot.docs.forEach(docSnap => {
            const data = docSnap.data();
            const srv = servicesData.find(s => s.id === docSnap.id);
            if (srv && data.photo) srv.photo = data.photo;
        });
        renderServicesCards();
    });
}

// ------------------------------------------------------------------
// 6. INITIALIZATION & NAVIGATION
// ------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    startLiveClock(); // লাইভ ঘড়ি স্টার্ট
    
    const checkInEl = document.getElementById('checkIn');
    const checkOutEl = document.getElementById('checkOut');
    if (checkInEl) checkInEl.valueAsDate = new Date();
    if (checkOutEl) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        checkOutEl.valueAsDate = tomorrow;
    }

    renderRoomCards();
    renderServicesCards();
    initRealtimeSync();
    calculateBilling();
});

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const loginModal = document.getElementById('loginModal');
        const appContainer = document.getElementById('appContainer');
        if (loginModal) loginModal.style.display = 'none';
        if (appContainer) appContainer.style.display = 'flex';
        showToast("Welcome back, MD. EMTIAZ HOSSAIN SAMI!");
    });
}

function logout() {
    const loginModal = document.getElementById('loginModal');
    const appContainer = document.getElementById('appContainer');
    if (appContainer) appContainer.style.display = 'none';
    if (loginModal) loginModal.style.display = 'flex';
    showToast("Logged out successfully", "warning");
}

function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.m-nav-item').forEach(item => item.classList.remove('active'));

    const activeTab = document.getElementById(`tab-${tabName}`);
    if (activeTab) activeTab.classList.add('active');

    const desktopItem = document.querySelector(`.nav-item[onclick="switchTab('${tabName}')"]`);
    if (desktopItem) desktopItem.classList.add('active');

    const mobileItem = document.querySelector(`.m-nav-item[onclick="switchTab('${tabName}')"]`);
    if (mobileItem) mobileItem.classList.add('active');

    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('open');

    if (tabName === 'dashboard') updateDashboard();
    if (tabName === 'guests') renderFullBookingsTable();
}

// ------------------------------------------------------------------
// 7. PHOTO HANDLERS
// ------------------------------------------------------------------
function handleGuestPhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentGuestPhotoBase64 = e.target.result;
            const preview = document.getElementById('previewImg');
            if (preview) preview.src = currentGuestPhotoBase64;
        };
        reader.readAsDataURL(file);
    }
}

function updateGuestImageFromUrl() {
    const urlInput = document.getElementById('imgUrlInput');
    const url = urlInput ? urlInput.value.trim() : '';
    if (url) {
        currentGuestPhotoBase64 = url;
        const preview = document.getElementById('previewImg');
        if (preview) preview.src = url;
        showToast("Profile image loaded!");
    } else {
        showToast("Please enter a valid image URL", "error");
    }
}

async function changeItemPhoto(event, type, index) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async function(e) {
            const base64Img = e.target.result;
            try {
                if (type === 'room') {
                    roomsData[index].photo = base64Img;
                    await setDoc(doc(db, "rooms", roomsData[index].id), { photo: base64Img }, { merge: true });
                } else if (type === 'service') {
                    servicesData[index].photo = base64Img;
                    await setDoc(doc(db, "services", servicesData[index].id), { photo: base64Img }, { merge: true });
                }
                showToast("📷 Image updated & synced globally!");
            } catch (err) {
                showToast("Failed to save image: " + err.message, "error");
            }
        };
        reader.readAsDataURL(file);
    }
}

// ------------------------------------------------------------------
// 8. ROOMS & SERVICES RENDERING
// ------------------------------------------------------------------
function renderRoomCards() {
    const container = document.getElementById('roomsCardsGrid');
    if (!container) return;
    container.innerHTML = '';

    roomsData.forEach((room, index) => {
        const isOccupied = room.status === 'Occupied';
        const badgeColor = isOccupied ? '#EF4444' : '#10B981';

        container.innerHTML += `
            <div class="item-card">
                <div class="card-image-box" style="position: relative; overflow: hidden; border-radius: 10px;">
                    <img id="roomImg-${index}" src="${room.photo}" alt="${room.title}" style="width:100%; height: 200px; object-fit: cover;">
                    <span class="badge-price" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.85); color: #d4af37; padding: 4px 10px; border-radius: 6px; font-weight: bold;">৳${room.price.toLocaleString()} / night</span>
                    <span style="position: absolute; top: 10px; left: 10px; background: ${badgeColor}; color: #fff; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: bold;">
                        ${room.status || 'Available'}
                    </span>
                </div>
                <div class="card-content" style="padding: 15px 0;">
                    <div>
                        <h3 style="margin: 0 0 5px;">${room.title}</h3>
                        <p style="font-size: 0.85rem; color: #64748b; margin: 0;">${room.desc}</p>
                    </div>
                    <div style="margin-top: 15px; display: flex; gap: 8px;">
                        <button onclick="toggleRoomStatus('${room.id}', '${isOccupied ? 'Available' : 'Occupied'}')" 
                                style="flex:1; padding: 8px; border-radius: 6px; border: none; background: #3B82F6; color:#fff; font-size:0.8rem; cursor:pointer;">
                            Mark ${isOccupied ? 'Available' : 'Occupied'}
                        </button>
                        <label class="btn-file-upload" style="flex:1; text-align:center; padding: 8px; background: #e2e8f0; border-radius: 6px; cursor: pointer; font-size: 0.8rem; color:#333;">
                            <i class="fa-solid fa-camera"></i> Change Photo
                            <input type="file" accept="image/*" style="display:none;" onchange="changeItemPhoto(event, 'room', ${index})">
                        </label>
                    </div>
                </div>
            </div>
        `;
    });
}

async function toggleRoomStatus(roomId, newStatus) {
    try {
        await setDoc(doc(db, "rooms", roomId), { status: newStatus }, { merge: true });
        showToast(`Room status changed to ${newStatus}`);
    } catch (err) {
        showToast("Error updating room status: " + err.message, "error");
    }
}

function renderServicesCards() {
    const container = document.getElementById('servicesCardsGrid');
    if (!container) return;
    container.innerHTML = '';

    servicesData.forEach((srv, index) => {
        container.innerHTML += `
            <div class="item-card">
                <div class="card-image-box" style="position: relative; overflow: hidden; border-radius: 10px;">
                    <img id="srvImg-${index}" src="${srv.photo}" alt="${srv.title}" style="width:100%; height: 180px; object-fit: cover;">
                    <span class="badge-price" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); color: #fff; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem;">${srv.category}</span>
                </div>
                <div class="card-content" style="padding: 15px 0;">
                    <div>
                        <h3 style="margin: 0 0 5px;">${srv.title}</h3>
                        <p style="font-size:0.8rem; color:#10b981; font-weight:600; margin: 0 0 5px;"><i class="fa-solid fa-clock"></i> Timing: ${srv.time}</p>
                        <p style="font-size:0.85rem; color:#64748b; margin:0;">${srv.desc}</p>
                    </div>
                    <div style="margin-top: 15px;">
                        <label class="btn-file-upload" style="display:block; text-align:center; padding: 8px; background: #e2e8f0; border-radius: 6px; cursor: pointer; font-size: 0.8rem; color:#333;">
                            <i class="fa-solid fa-camera"></i> Change Service Photo
                            <input type="file" accept="image/*" style="display:none;" onchange="changeItemPhoto(event, 'service', ${index})">
                        </label>
                    </div>
                </div>
            </div>
        `;
    });
}

// ------------------------------------------------------------------
// 9. PROFESSIONAL BILLING & TAX CALCULATOR
// ------------------------------------------------------------------
function calculateBilling() {
    const checkInVal = document.getElementById('checkIn')?.value;
    const checkOutVal = document.getElementById('checkOut')?.value;
    
    const checkIn = checkInVal ? new Date(checkInVal) : new Date();
    const checkOut = checkOutVal ? new Date(checkOutVal) : new Date();
    
    let nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    if (isNaN(nights) || nights < 1) nights = 1;

    const roomTypeSelect = document.getElementById('roomTypeSelect');
    const roomPrice = roomTypeSelect ? parseInt(roomTypeSelect.value.split('|')[1]) || 0 : 800;
    const roomSubtotal = roomPrice * nights;

    let servicesSubtotal = 0;
    document.querySelectorAll('input[name="foodMenu"]:checked, input[name="amenities"]:checked').forEach(cb => {
        servicesSubtotal += (parseInt(cb.dataset.price) || 0) * nights;
    });

    const subtotal = roomSubtotal + servicesSubtotal;
    const vatAmount = subtotal * TAX_RATE;
    const serviceCharge = subtotal * SERVICE_CHARGE_RATE;
    const grandTotal = Math.round(subtotal + vatAmount + serviceCharge);

    if (document.getElementById('billNights')) document.getElementById('billNights').innerText = `${nights} Night(s)`;
    if (document.getElementById('billRoom')) document.getElementById('billRoom').innerText = `৳${roomSubtotal.toLocaleString()}`;
    if (document.getElementById('billServices')) document.getElementById('billServices').innerText = `৳${servicesSubtotal.toLocaleString()}`;
    if (document.getElementById('billTotal')) document.getElementById('billTotal').innerText = `৳${grandTotal.toLocaleString()} (Inc. 15% VAT & 10% Service Charge)`;

    return { nights, roomSubtotal, servicesSubtotal, vatAmount, serviceCharge, grandTotal };
}

// ------------------------------------------------------------------
// 10. RESERVATION FORM SUBMISSION
// ------------------------------------------------------------------
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = e.target.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        const billing = calculateBilling();
        const roomTypeSelect = document.getElementById('roomTypeSelect');
        const roomCategory = roomTypeSelect ? roomTypeSelect.value.split('|')[0] : 'Single Standard Room';

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
            roomSubtotal: billing.roomSubtotal,
            servicesSubtotal: billing.servicesSubtotal,
            vatAmount: billing.vatAmount,
            serviceCharge: billing.serviceCharge,
            totalBill: billing.grandTotal,
            status: 'Confirmed',
            photo: currentGuestPhotoBase64,
            createdAt: new Date().toISOString()
        };

        try {
            await addDoc(collection(db, "reservations"), newBooking);
            showToast(`🎉 Reservation ${newBooking.id} Confirmed!`);
            resetForm();
            switchTab('dashboard');
        } catch (error) {
            showToast("Error creating booking: " + error.message, "error");
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}

function resetForm() {
    const form = document.getElementById('reservationForm');
    if (form) form.reset();
    currentGuestPhotoBase64 = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';
    const preview = document.getElementById('previewImg');
    if (preview) preview.src = currentGuestPhotoBase64;
    
    const checkInEl = document.getElementById('checkIn');
    const checkOutEl = document.getElementById('checkOut');
    if (checkInEl) checkInEl.valueAsDate = new Date();
    if (checkOutEl) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        checkOutEl.valueAsDate = tomorrow;
    }
    
    calculateBilling();
}

// ------------------------------------------------------------------
// 11. DASHBOARD & BOOKING LIFECYCLE MANAGEMENT
// ------------------------------------------------------------------
function updateDashboard() {
    const totalBookingsEl = document.getElementById('statTotalBookings');
    if (!totalBookingsEl) return;

    totalBookingsEl.innerText = reservations.length;
    
    let totalRevenue = reservations
        .filter(r => r.status !== 'Cancelled')
        .reduce((acc, curr) => acc + (curr.totalBill || 0), 0);
    
    if (document.getElementById('statRevenue')) {
        document.getElementById('statRevenue').innerText = `৳${totalRevenue.toLocaleString()}`;
    }

    let entertainmentCount = reservations.filter(r => r.services && r.services.some(s => s.includes('DJ') || s.includes('Concert') || s.includes('Pool'))).length;
    if (document.getElementById('statPoolPass')) {
        document.getElementById('statPoolPass').innerText = entertainmentCount;
    }

    let diningCount = reservations.filter(r => r.services && r.services.some(s => s.includes('Bengali') || s.includes('Thai') || s.includes('Indian') || s.includes('Continental') || s.includes('Feast'))).length;
    if (document.getElementById('statDiningOrders')) {
        document.getElementById('statDiningOrders').innerText = diningCount;
    }

    const tbody = document.getElementById('dashboardTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (reservations.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 20px; color:#94a3b8;">No recent check-ins recorded.</td></tr>';
        return;
    }

    reservations.slice(0, 5).forEach(res => {
        tbody.innerHTML += `
            <tr>
                <td><img src="${res.photo}" class="table-avatar" alt="Guest" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover;"></td>
                <td><strong>${res.id}</strong></td>
                <td>${res.guestName}</td>
                <td>${res.room}</td>
                <td>
                    <small style="color: #64748b; display:block;">${res.checkIn} to ${res.checkOut}</small>
                    ${getStatusBadgeHTML(res.status)}
                </td>
                <td><strong style="color: #d4af37;">৳${(res.totalBill || 0).toLocaleString()}</strong></td>
                <td><button class="action-btn-del" onclick="deleteBooking('${res.docId}')" style="background:#ef4444; color:#fff; border:none; padding: 5px 10px; border-radius: 6px; cursor:pointer;"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        `;
    });
}

function renderFullBookingsTable(filteredData = null) {
    const tbody = document.getElementById('fullBookingsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const list = filteredData || reservations;

    if (list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #94a3b8; padding: 30px;">No reservation records found.</td></tr>';
        return;
    }

    list.forEach(res => {
        const servicesText = res.services && res.services.length > 0 ? res.services.join(', ') : 'No extra services';

        tbody.innerHTML += `
            <tr>
                <td><img src="${res.photo}" class="table-avatar" alt="Guest" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;"></td>
                <td><strong>${res.id}</strong></td>
                <td>
                    <strong>${res.guestName}</strong><br>
                    <small style="color: #64748b;">${res.phone} | ${res.email}</small>
                </td>
                <td>${res.room} (${res.nights} Night)</td>
                <td>
                    <div style="margin-bottom: 5px;">
                        <select onchange="updateBookingStatus('${res.docId}', this.value)" style="padding:4px 8px; border-radius:6px; font-weight:bold; border: 1px solid #cbd5e1; background:#0f172a; color:#fff;">
                            <option value="Confirmed" ${res.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                            <option value="Checked-In" ${res.status === 'Checked-In' ? 'selected' : ''}>Checked-In</option>
                            <option value="Checked-Out" ${res.status === 'Checked-Out' ? 'selected' : ''}>Checked-Out</option>
                            <option value="Cancelled" ${res.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                    </div>
                    <small style="color: #64748b; display: block; max-width: 220px; white-space: normal;">${servicesText}</small>
                </td>
                <td><strong style="color: #d4af37;">৳${(res.totalBill || 0).toLocaleString()}</strong></td>
                <td><button class="action-btn-del" onclick="deleteBooking('${res.docId}')" style="background:#ef4444; color:#fff; border:none; padding: 6px 12px; border-radius: 6px; cursor:pointer;"><i class="fa-solid fa-trash"></i> Delete</button></td>
            </tr>
        `;
    });
}

function getStatusBadgeHTML(status) {
    let color = '#3B82F6';
    if (status === 'Checked-In') color = '#10B981';
    if (status === 'Checked-Out') color = '#6B7280';
    if (status === 'Cancelled') color = '#EF4444';

    return `<span style="background:${color}; color:#fff; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; display:inline-block; margin-top:2px;">${status || 'Confirmed'}</span>`;
}

async function updateBookingStatus(docId, newStatus) {
    try {
        await updateDoc(doc(db, "reservations", docId), { status: newStatus });
        showToast(`Status updated to ${newStatus}`);
    } catch (err) {
        showToast("Failed to update status: " + err.message, "error");
    }
}

function searchGuests() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    const query = input.value.toLowerCase();
    
    const filtered = reservations.filter(res => 
        (res.guestName && res.guestName.toLowerCase().includes(query)) ||
        (res.id && res.id.toLowerCase().includes(query)) ||
        (res.room && res.room.toLowerCase().includes(query)) ||
        (res.phone && res.phone.includes(query))
    );
    renderFullBookingsTable(filtered);
}

async function deleteBooking(docId) {
    if (confirm("Are you sure you want to permanently delete this reservation record?")) {
        try {
            await deleteDoc(doc(db, "reservations", docId));
            showToast("Reservation deleted successfully!");
        } catch (err) {
            showToast("Error deleting record: " + err.message, "error");
        }
    }
}

// ------------------------------------------------------------------
// GLOBAL EXPOSURE FOR HTML INLINE EVENTS
// ------------------------------------------------------------------
window.logout = logout;
window.toggleMobileSidebar = toggleMobileSidebar;
window.switchTab = switchTab;
window.handleGuestPhotoUpload = handleGuestPhotoUpload;
window.updateGuestImageFromUrl = updateGuestImageFromUrl;
window.changeItemPhoto = changeItemPhoto;
window.calculateBilling = calculateBilling;
window.resetForm = resetForm;
window.searchGuests = searchGuests;
window.deleteBooking = deleteBooking;
window.toggleRoomStatus = toggleRoomStatus;
window.updateBookingStatus = updateBookingStatus;
