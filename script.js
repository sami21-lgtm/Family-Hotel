document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-message');

    // বেসিক ইউজারনেম পাসওয়ার্ড চেক
    if (email.endsWith("@gmail.com") && password === "sami123") {
        alert("Success! Going to Dashboard...");
        window.location.href = "index.html"; // এখানে আপনার ড্যাশবোর্ড পেজের নাম দিন
    } else {
        errorMsg.innerText = "Email must be Gmail and password is 'sami123'";
    }
});
