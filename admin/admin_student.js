let searchInput = document.getElementById("searchInput");
let majorInput= document.getElementById("major")
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
                row.innerHTML = `<td>${student.id}</td><td>${student.name}
                    <button class="dropdownStudent" value="${student.id}">
                        <i class='bx bx-dots-horizontal-rounded student-dots'></i> 
                    </button></td>`;
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

function fetchStudents(searchQuery, majorValue) {
    let yearFilter = null; // Default to null if no years are selected
    if (years.length === 1) {
        yearFilter = years[0]; // Send a single number if only one year is selected
    } else if (years.length > 1) {
        yearFilter = years; // Send an array if multiple years are selected
    }
    //console.log(majorValue)
   
    fetch("http://127.0.0.1:8080/student/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ name: searchQuery, year: yearFilter, major: majorValue }), 
    })
    
    .then(response => response.json())
    .then(data => {
        console.log("Filtered Data from API:", JSON.stringify({ name: searchQuery, year: yearFilter, major: majorValue}));

        tableBody.innerHTML = ""; 
        
        data.forEach(student => {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${student.id}</td><td>${student.name}
                                <button class="dropdownStudent" value="${student.id}">
                                <i class='bx bx-dots-horizontal-rounded student-dots'></i> 
                                </button></td>`;
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
                    //console.log(years)
                    let searchQuery = searchInput.value.trim(); 
                    let majorValue = majorInput.value.trim();
                    console.log("name: "+searchQuery+" major: "+ majorValue)
                    fetchStudents(searchQuery, majorValue, years); // Call fetch with the correct arguments
                    
                }
            } else {
                years = years.filter(num => num !== yearValue);
                //console.log(years)
                let searchQuery = searchInput.value.trim(); // Get the current search input value
                fetchStudents(searchQuery, years); // Call fetch with the correct arguments
                
            }
            //console.log(years); // Display the updated array
        });
    }
});

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim(); 
    let majorValue = majorInput.value.trim();
    fetchStudents(value, majorValue);  
});

majorInput.addEventListener("input", (e) => {
    const majorValue = e.target.value.trim();
    //console.log(majorValue);
    let searchQuery = searchInput.value.trim();
    fetchStudents(searchQuery, majorValue); // since fetchStudent has searchQuery, first it is expecting that code. w/out majorValue would go in as null
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

document.querySelector('.addStudent').addEventListener('click', function() {
    console.log('Add student button clicked!');
    let addStudentButton = document.querySelector('.addStudent');
    let newStudent = document.createElement("tr");
    newStudent.innerHTML = `
         <td colspan="2">
             <div class="student-details">
             <h4>Add student</h4>
                 <input id="nameAdded" type="text" placeholder="Name">
                 <input id="majorAdded" type="text" placeholder="Major">
                 <input id="emailAdded" type="text" placeholder="Email">
                <div class="filter-section">
                <p>Year:</p>
                 <select id="yearAdded" required>
                        <option value="" disabled selected>Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                        <option value="5">Other</option>
            </select>
            
             </div>
             <button class="postAddStudent" onclick="#">Add Student</button>
             </div>
         </td>
     `;
    addStudentButton.parentNode.replaceChild(newStudent, addStudentButton);


    document.querySelector('.postAddStudent').addEventListener('click', function() {
        let nameAdded = document.getElementById("nameAdded").value;
        let majorAdded = document.getElementById("majorAdded").value;
        let emailAdded = document.getElementById("emailAdded").value;
        let yearAdded = document.getElementById("yearAdded").value;
    
    
    if (!nameAdded || !majorAdded || !emailAdded || !yearAdded) {
        alert("All fields must be filled out before adding a student.");
        return;
    }
    fetch("http://127.0.0.1:8080/student/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ name: nameAdded, year: yearAdded, major: majorAdded, email: emailAdded }), 
    })
 
    console.log(JSON.stringify({ name: nameAdded, year: yearAdded, major: majorAdded, email: emailAdded }))
    location.reload();

});
});


document.querySelector('.deleteStudent').addEventListener('click', function(event) {
    let dropdown = document.getElementById("studentDropdown");
    let studentId = dropdown.getAttribute("data-student-id");
    console.log("Delete clicked for student ID:", studentId);
    urlDelete = "http://127.0.0.1:8080/student/" + studentId;
    fetch(urlDelete, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(data => {
        console.log("Student deleted successfully:", data);
        location.reload();
    })
    .catch(error => {
        console.error("Error deleting student:", error);
    });
});

document.querySelector('.editStudent').addEventListener('click', function(event) {
    let dropdown = document.getElementById("studentDropdown");
    let studentId = dropdown.getAttribute("data-student-id");
    console.log("Edit clicked for student ID:", studentId);
    
    // Create a new div for editing
    let updatedStudent = document.createElement("div");
    updatedStudent.innerHTML = `
        <div class="student-details">
            <h4>Edit student</h4>
            <input id="nameAdded" type="text" placeholder="Name">
            <input id="majorAdded" type="text" placeholder="Major">
            <input id="emailAdded" type="text" placeholder="Email">
            <div class="filter-section">
                <p>Year:</p>
                <select id="yearAdded" required>
                    <option value="" disabled selected>Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5">Other</option>
                </select>
            </div>
            <button class="postEditStudent">Add Student</button>
        </div>
    `;

    // Replace the edit button with the form
    let editButton = document.querySelector('.editStudent');
    editButton.parentNode.replaceChild(updatedStudent, editButton);

    document.querySelector('.postEditStudent').addEventListener('click', function() {
        let nameAdded = document.getElementById("nameAdded").value;
        let majorAdded = document.getElementById("majorAdded").value;
        let emailAdded = document.getElementById("emailAdded").value;
        let yearAdded = document.getElementById("yearAdded").value;

        let updatedFields = {};
        if (nameAdded) updatedFields.name = nameAdded;
        if (majorAdded) updatedFields.major = majorAdded;
        if (emailAdded) updatedFields.email = emailAdded;
        if (yearAdded) updatedFields.year = yearAdded;

        let urlEdit = "http://127.0.0.1:8080/student/" + studentId;
        
        fetch(urlEdit, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedFields), 
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            location.reload();  // refresh after successful update
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });
});
