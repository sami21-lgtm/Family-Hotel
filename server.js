const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); 

let bookings = [];
let roomPhotos = {};

app.get('/api/bookings', (req, res) => {
    res.json({
        success: true,
        count: bookings.length,
        data: bookings
    });
});

app.post('/api/bookings', (req, res) => {
    const { guestName, roomType, guestPhoto, totalBill } = req.body;

    if (!guestName || !roomType) {
        return res.status(400).json({ success: false, message: 'নাম এবং রুম টাইপ আবশ্যক!' });
    }

    const newBooking = {
        id: Date.now(),
        guestName,
        roomType,
        guestPhoto: guestPhoto || null,
        totalBill: totalBill || 0,
        createdAt: new Date().toLocaleString()
    };

    bookings.push(newBooking);

    res.status(201).json({
        success: true,
        message: 'বুকিং এবং ছবি সার্ভারে সফলভাবে সেভ হয়েছে!',
        data: newBooking
    });
});

app.post('/api/rooms/photo', (req, res) => {
    const { roomId, photoBase64 } = req.body;

    if (!roomId || !photoBase64) {
        return res.status(400).json({ success: false, message: 'রুম আইডি ও ছবি প্রয়োজন!' });
    }

    roomPhotos[roomId] = photoBase64;
    
    res.json({
        success: true,
        message: `Room ${roomId}-এর ছবি আপডেট করা হয়েছে!`
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
