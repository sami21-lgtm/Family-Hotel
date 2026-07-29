// Image preview via file upload
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

// Image preview via URL Input
function updateImageFromUrl() {
    const urlInput = document.getElementById('imgUrlInput').value;
    const preview = document.getElementById('previewImg');
    
    if (urlInput.trim() !== "") {
        preview.src = urlInput; 
    } else {
        alert("Please enter a valid image URL!");
    }
}

// Reset Form & Image
function resetForm() {
    document.getElementById('reservationForm').reset();
    document.getElementById('previewImg').src = "https://via.placeholder.com/180x190?text=Guest+Photo";
}

// Submit Form to Node.js Backend API
document.getElementById('reservationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.innerText = "Processing...";
    saveBtn.disabled = true;

    // Build Form Data payload
    const formData = new FormData(this);

    // Selected Food Packages Collect
    const selectedFoods = [];
    document.querySelectorAll('input[name="foodMenu"]:checked').forEach((checkbox) => {
        selectedFoods.push(checkbox.value);
    });
    formData.append('selectedFoods', JSON.stringify(selectedFoods));

    try {
        // Post Request to Server
        const response = await fetch('http://localhost:5000/api/reservations', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            alert(`🎉 REGISTRATION SUCCESSFUL!\n\nBooking ID: ${result.booking.id}\nGuest: ${result.booking.firstName} ${result.booking.lastName}\nRoom: ${result.booking.roomType}\nMeals: ${selectedFoods.length > 0 ? selectedFoods.join(', ') : 'None'}`);
            resetForm();
        } else {
            alert("❌ Error: " + result.message);
        }
    } catch (error) {
        alert("⚠️ Backend Server connection failed! Please ensure 'node server.js' is running.");
        console.error("Fetch Error:", error);
    } finally {
        saveBtn.innerText = "Complete Booking";
        saveBtn.disabled = false;
    }
});
