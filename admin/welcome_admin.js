window.onload = function() {
    let userData = sessionStorage.getItem("loggedInUser");

    if (!userData) {
        alert("You are not logged in! Redirecting to login page...");
        window.location.href = "../login/login.html";
        return;
    }

    let user = JSON.parse(userData);
    document.getElementById("userName").innerText = user.user_name;
    document.getElementById("email").innerText = user.email;
    document.getElementById("position").innerText = user.position;
    document.getElementById("userId").innerText = user.id;

    fetchStudentData();
};


// Toggle dropdown menu
function toggleMenu() {
    let dropdown = document.getElementById("myDropdown");
    dropdown.classList.toggle("show");
    dropdown.style.maxHeight = dropdown.scrollHeight + "px";
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.closest(".menu-btn") && !event.target.closest(".dropdown-content")) {
        document.getElementById("myDropdown").classList.remove("show");
    }
};
