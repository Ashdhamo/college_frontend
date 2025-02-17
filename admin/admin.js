let searchInput = document.getElementById("searchInput");
let tableBody = document.getElementById("studentTableBody");

window.onload = function () {
    if (!sessionStorage.getItem("loggedInUser")) {
        alert("You are not logged in! Redirecting to login page...");
        window.location.href = "../login/login.html";
        return;
    }

    fetch("http://127.0.0.1:8080/student/student")
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("studentTableBody");
            tableBody.innerHTML = ""; // Clear existing content

            data.forEach(student => {
                let row = document.createElement("tr");
                row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
                row.classList.add("clickable-row");
                row.onclick = () => toggleDetails(row, student);
                tableBody.appendChild(row);
            });
        })
        .catch(console.error);
};

function toggleDetails(row, student) {
    let nextRow = row.nextElementSibling;
    
    // allows toggle on/off info. w/out keeps on duplicating the info when pressed
    if (nextRow && nextRow.classList.contains("details-row")) {
        nextRow.remove();
        return;
    }

    let detailsRow = document.createElement("tr");
    detailsRow.classList.add("details-row");
    detailsRow.innerHTML = `
        <td colspan="2">
            <div class="student-details">
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Major:</strong> ${student.major}</p>
                <p><strong>Year:</strong> ${student.year}</p>
            </div>
        </td>
    `;

    row.after(detailsRow);
}


function fetchStudents(searchQuery) {
    fetch("http://127.0.0.1:8080/student/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: searchQuery })  // Send user input in request body
    })
    .then(response => response.json())
    .then(data => {
        tableBody.innerHTML = ""; 
        data.forEach(student => {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
            row.classList.add("clickable-row");
            row.onclick = () => toggleDetails(row, student);
            tableBody.appendChild(row);
        });
    })
    .catch(console.error);
}


searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim(); 
    fetchStudents(value);  
});



function toggleMenu() {
    document.getElementById("myDropdown")?.classList.toggle("show");
}

// Close dropdown when clicking outside
window.onclick = function (event) {
    if (!event.target.closest(".menu-btn, .dropdown-content")) {
        document.getElementById("myDropdown")?.classList.remove("show");
    }
};


