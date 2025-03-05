let searchInput = document.getElementById("searchInput");


window.onload = function () {
    if (!sessionStorage.getItem("loggedInUser")) {
        alert("You are not logged in! Redirecting to login page...");
        window.location.href = "../login/login.html";
        return;
    }

    fetchClasses();
};

function fetchClasses() {
    fetch("http://127.0.0.1:8080/classes/")
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("classTableBody");
            tableBody.innerHTML = ""; 

            data.forEach(cls => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${cls.class_id}</td>
                    <td>${cls.class_name}
                        <button class="dropdownStudent" value="${cls.class_id}">
                        <i class='bx bx-dots-horizontal-rounded student-dots'></i>  
                        </button>
                    </td>`;
                row.classList.add("clickable-row");
                row.onclick = () => toggleDetails(row, cls);
                tableBody.appendChild(row);
            });
        })
        .catch(console.error);
}

function toggleDetails(row, cls) {
    let nextRow = row.nextElementSibling;
    
    // Allows toggle on/off info without duplication
    if (nextRow && nextRow.classList.contains("details-row")) {
        nextRow.remove();
        return;
    }

    let detailsRow = document.createElement("tr");
    detailsRow.classList.add("details-row");
    detailsRow.innerHTML = `
    <td colspan="2">
        <div class="class-details">
            <p><strong>Professor ID:</strong> ${cls.professorID}</p>
            <p><strong>Start Date:</strong> ${cls.start_date}</p>
            <p><strong>End Date:</strong> ${cls.end_date}</p>
            <p><strong>Seats:</strong> ${cls.seats}</p>
            <p><strong>Units:</strong> ${cls.units}</p>
            <p><strong>Schedule:</strong></p>
            <table class="schedule-table">
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    ${cls.schedule.map(sch => `
                        <tr>
                            <td>${sch.class_day}</td>
                            <td>${sch.start_time}</td>
                            <td>${sch.end_time}</td>
                        </tr>`).join('')}
                </tbody>
            </table>
        </div>
    </td>
`;


    row.after(detailsRow);
}

function formatSchedule(schedule) {
    return schedule.map(sch => `${sch.class_day}: ${sch.start_time} - ${sch.end_time}`).join("<br>");
}


function fetchClasses(searchQuery) {
    fetch("http://127.0.0.1:8080/classes/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ class_name: searchQuery }) 
    })
    .then(response => response.json())
    .then(data => {
        console.log("Filtered Data from API:", JSON.stringify({ class_name: searchQuery }));

        let tableBody = document.getElementById("classTableBody");
        tableBody.innerHTML = ""; 
        
        data.forEach(cls => { 
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${cls.class_id}</td>
                <td>${cls.class_name}
                    <button class="dropdownStudent" value="${cls.class_id}">
                        <i class='bx bx-dots-horizontal-rounded student-dots'></i> 
                    </button>
                </td>`;
            row.classList.add("clickable-row");
            row.onclick = () => toggleDetails(row, cls);
            tableBody.appendChild(row);
        });
    })
    .catch(console.error);
}

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim(); 
    console.log(value)
    fetchClasses(value);  
});
