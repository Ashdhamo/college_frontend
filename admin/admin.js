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
    
    // If next row is already a details row, remove it
    if (nextRow && nextRow.classList.contains("details-row")) {
        nextRow.remove();
        return;
    }

    // Otherwise, create a new details row
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

function toggleMenu() {
    document.getElementById("myDropdown")?.classList.toggle("show");
}

// Close dropdown when clicking outside
window.onclick = function (event) {
    if (!event.target.closest(".menu-btn, .dropdown-content")) {
        document.getElementById("myDropdown")?.classList.remove("show");
    }
};
