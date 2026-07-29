let reservationDatabase = JSON.parse(localStorage.getItem('hotel_reservations')) || [];

function previewFile() {
    const preview = document.getElementById('previewImg');
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onloadend = function () {
            preview.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
}

function updateImageFromUrl() {
    const urlInput = document.getElementById('imgUrlInput').value;
    const preview = document.getElementById('previewImg');

    if (urlInput.trim() !== "") {
        preview.src = urlInput;
    } else {
        alert("⚠️ Please enter a valid image URL!");
    }
}

function resetForm() {
    document.getElementById('reservationForm').reset();
    document.getElementById('previewImg').src = "https://via.placeholder.com/180x190?text=Guest+Photo";
}

document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const saveBtn = document.getElementById('saveBtn');
    saveBtn.innerText = "Saving...";
    saveBtn.disabled = true;

    const selectedFoods = [];
    document.querySelectorAll('input[name="foodMenu"]:checked').forEach((checkbox) => {
        selectedFoods.push(checkbox.value);
    });

    const newReservation = {
        id: 'GPH-' + Math.floor(100000 + Math.random() * 900000),
        firstName: document.getElementById('fName').value,
        lastName: document.getElementById('lName').value,
        middleName: document.getElementById('mName').value || '',
        address: document.getElementById('address').value,
        contact: document.getElementById('contact').value,
        email: document.getElementById('guestEmail').value,
        roomType: document.getElementById('roomType').value,
        foodPackages: selectedFoods,
        photoUrl: document.getElementById('previewImg').src,
        registeredAt: new Date().toLocaleString()
    };

    reservationDatabase.push(newReservation);
    localStorage.setItem('hotel_reservations', JSON.stringify(reservationDatabase));

    console.log("Updated Reservation Database:", reservationDatabase);

    alert(`🎉 REGISTRATION SUCCESSFUL!\n\nBooking ID: ${newReservation.id}\nGuest: ${newReservation.firstName} ${newReservation.lastName}\nRoom: ${newReservation.roomType}\nMeals: ${selectedFoods.length > 0 ? selectedFoods.join(', ') : 'None'}`);

    resetForm();
    saveBtn.innerText = "Complete Booking";
    saveBtn.disabled = false;
});
