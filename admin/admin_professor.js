window.onload = function () {
    if (!sessionStorage.getItem("loggedInUser")) {
        alert("You are not logged in! Redirecting to login page...");
        window.location.href = "../login/login.html";
        return;
    }

    fetch("http://127.0.0.1:8080/professor/professor")
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("studentTableBody");
            tableBody.innerHTML = ""; // Clear existing content

            data.forEach(professor => {
                let row = document.createElement("tr");
                row.innerHTML = `<td>${professor.id}</td><td>${professor.name}
                    <button class="dropdownStudent" value="${professor.id}">
                        <i class='bx bx-dots-horizontal-rounded student-dots'></i>
                    </button></td>`;
                row.classList.add("clickable-row");
                row.onclick = () => toggleDetails(row, professor);
                tableBody.appendChild(row);
            }); 
            
        })
        .catch(console.error);
};


function toggleDetails(row, professor) {
    let nextRow = row.nextElementSibling;
    
    // allows toggle on/off info. w/out keeps on duplicating the info when pressed
    if (nextRow && nextRow.classList.contains("details-row")) {
        nextRow.remove();
        return;
    }
    let tenureText = professor.tenure === 1 ? "Yes" : "No"; 

    let detailsRow = document.createElement("tr");
    detailsRow.classList.add("details-row");
    detailsRow.innerHTML = `
        <td colspan="2">
            <div class="professor-details">
                <p><strong>Email:</strong> ${professor.email}</p>
                <p><strong>Phone:</strong> ${professor.phone}</p>
                <p><strong>Tenure:</strong> ${tenureText}</p>
                <p><strong>Salary:</strong> ${professor.salary}</p>
                <p><strong>Department:</strong> ${professor.department}</p>
                <p><strong>Salary:</strong> ${professor.years_worked}</p>
            </div>
        </td>
    `;

    row.after(detailsRow);
}
