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
};

function toggleMenu() {
    let dropdown = document.getElementById("myDropdown");

    // Toggle dropdown visibility
    dropdown.classList.toggle("show");

    // Ensure it fully displays all links
    dropdown.style.maxHeight = dropdown.scrollHeight + "px";
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.closest(".menu-btn") && !event.target.closest(".dropdown-content")) {
        document.getElementById("myDropdown").classList.remove("show");
    }
};



document.addEventListener("DOMContentLoaded", function() { //when HTML is loaded, event triggered
    fetch("http://127.0.0.1:8080/student/student", { //add the api
        method: "GET",
        headers: {
            "Content-Type": "application/json" //expect json info
        }
    })
    .then(response => { //after the api responds
        return response.json();//json -> js format
    })
    .then(data => {
        populateStudentTable(data); //puts the data into populateStudentTable below
    })
    .catch(error => {
        console.error("Error fetching student data:", error);
    });
});

// Function to populate the student table with expandable rows
function populateStudentTable(students) {
    const tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML = ""; // Clear existing table rows to avoid dupes

    students.forEach(student => { //loop
        // Create the main row showing only ID and Name
        const row = document.createElement("tr"); //tr is new table row
        row.innerHTML = `
            <td>${student.id}</td>
            <td class="student-name" data-id="${student.id}">${student.name}</td>
        `;
        tableBody.appendChild(row);

        // Create the hidden row with full student details
        const detailsRow = document.createElement("tr");
        detailsRow.classList.add("hidden");
        detailsRow.setAttribute("id", `details-${student.id}`);
        detailsRow.innerHTML = `
            <td colspan="2">
                <strong>Email:</strong> ${student.email}<br>
                <strong>Year:</strong> ${student.year}<br>
                <strong>Major:</strong> ${student.major}
            </td>
        `;
        tableBody.appendChild(detailsRow);
    });

    // Add click event listeners to student names for expanding/collapsing details
    document.querySelectorAll(".student-name").forEach(nameCell => {
        nameCell.addEventListener("click", function() {
            const studentId = this.getAttribute("data-id");
            const detailsRow = document.getElementById(`details-${studentId}`);
            detailsRow.classList.toggle("hidden");
        });
    });
}
