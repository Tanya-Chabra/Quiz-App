document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    localStorage.setItem("registeredEmail", email);
    localStorage.setItem("registeredPassword", password);

    alert("Registration successful!");
    document.getElementById("registerForm").reset();
    let registerModal = bootstrap.Modal.getInstance(document.getElementById('categoryModal'));
    registerModal.hide();
    let loginModal = new bootstrap.Modal(document.getElementById('HistoryModal'));
    loginModal.show();

});


document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;

    const savedEmail = localStorage.getItem("registeredEmail");
    const savedPassword = localStorage.getItem("registeredPassword");

    if (loginEmail === savedEmail && loginPassword === savedPassword) {
        alert("Login successful! Redirecting to categories...");
        window.location.href = "category.html";

    } else {
        alert("User not registered or incorrect credentials.");
    }

    document.getElementById("loginForm").reset();
});
