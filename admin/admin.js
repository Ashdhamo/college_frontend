let searchInput = document.getElementById("searchInput");
let tableBody = document.getElementById("studentTableBody");

years=[]

const yearCheckboxes = ["year1", "year2", "year3", "year4", "year5"];


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
    let yearFilter = null; // Default to null if no years are selected
    if (years.length === 1) {
        yearFilter = years[0]; // Send a single number if only one year is selected
    } else if (years.length > 1) {
        yearFilter = years; // Send an array if multiple years are selected
    }

    fetch("http://127.0.0.1:8080/student/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: searchQuery, year: yearFilter }) 
    })
   
    .then(response => response.json())
    .then(data => {
        console.log("Filtered Data from API:", JSON.stringify({ name: searchQuery, year: yearFilter }));
        console.log("API Response:", data); // Debugging: Ensure API is returning filtered results

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

yearCheckboxes.forEach(id => {
    let checkbox = document.getElementById(id);
    
    if (checkbox) { // Ensure element exists
        checkbox.addEventListener("click", (e)=> {
            let yearValue = parseInt(checkbox.value); // Ensure it retrieves a number
            
            if (checkbox.checked) {
                if (!years.includes(yearValue)) {
                    years.push(yearValue);
                    console.log(years)
                    let searchQuery = searchInput.value.trim(); // Get the current search input value
                    fetchStudents(searchQuery, years); // Call fetch with the correct arguments
                    
                }
            } else {
                years = years.filter(num => num !== yearValue);
                console.log(years)
                let searchQuery = searchInput.value.trim(); // Get the current search input value
                fetchStudents(searchQuery, years); // Call fetch with the correct arguments
                
            }
            console.log(years); // Display the updated array
        });
    }
});

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim(); 
    fetchStudents(value);  
});

function toggleGPAmenu(clickedCheckbox) {
    var higherCheckBox = document.getElementById("higherGPA");
    var lowerCheckBox = document.getElementById("lowerGPA");

    // Uncheck the other checkbox when one is selected
    if (clickedCheckbox === higherCheckBox) {
        lowerCheckBox.checked = false;
    } else if (clickedCheckbox === lowerCheckBox) {
        higherCheckBox.checked = false;
    }
}


function toggleMenu() {
    document.getElementById("myDropdown")?.classList.toggle("show");
}
function toggleFilterMenu() {
    document.getElementById("filterDropdown")?.classList.toggle("show");
}

// Close dropdown when clicking outside
window.onclick = function (event) {
    if (!event.target.closest(".menu-btn, .dropdown-content")) {
        document.getElementById("myDropdown")?.classList.remove("show");
    }
};


