function toggleMenu() {
    document.getElementById("myDropdown")?.classList.toggle("show");
}

// Close dropdown when clicking outside
window.onclick = function (event) {
    if (!event.target.closest(".menu-btn, .dropdown-content")) {
        document.getElementById("myDropdown")?.classList.remove("show");
    }
};

function toggleStudentDropdown(event) {
    let dropdown = document.getElementById("studentDropdown");
    let button = event.target.closest(".dropdownStudent");

    let rect = button.getBoundingClientRect();

    dropdown.style.position = "absolute";
    dropdown.style.top = `${rect.bottom + window.scrollY}px`;
    dropdown.style.left = `${rect.left + window.scrollX}px`;

    let studentId = button.getAttribute("value");
    dropdown.setAttribute("data-student-id", studentId);
    console.log("ID:", studentId);
    dropdown.classList.toggle("show");
}

// Attach event listener to dynamically created buttons
document.getElementById("studentTableBody").addEventListener("click", function(event) {
    if (event.target.closest(".dropdownStudent")) {
        toggleStudentDropdown(event);
    }
});




function toggleFilterDropdown() {
    let dropdown = document.getElementById("filterDropdown");
    if (!dropdown) return;

    dropdown.classList.toggle("show");
}

document.getElementById("filter").addEventListener("click", toggleFilterDropdown);