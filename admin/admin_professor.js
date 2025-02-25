let salaryAboveCheckBox = document.getElementById("Above");
let salaryBelowCheckBox = document.getElementById("Below");

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

function fetchProfessors(searchQuery,tenureValue, salaryIs, salaryValue, departmentInput) {
console.log(JSON.stringify({ name: searchQuery, tenure: tenureValue, salary: salaryIs, salaryValue: salaryValue, department: departmentInput}));

    fetch("http://127.0.0.1:8080/professor/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ name: searchQuery, tenure: tenureValue, salary: salaryIs, salaryValue: salaryValue, department: departmentInput}), 
    })
    
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
}

let tenureValue = [0,1]; // Initialize tenure variable

function toggleCheckMenu(clickedCheckbox) {
    var tenuredCheckBox = document.getElementById("tenured");
    var notTenuredCheckBox = document.getElementById("notTenured");
    var classAboveCheckBox = document.getElementById("classAbove");
    var classBelowCheckBox = document.getElementById("classBelow");
    var studentAboveCheckBox = document.getElementById("studentAbove");
    var studentBelowCheckBox = document.getElementById("studentBelow");

    if (!tenuredCheckBox.checked && !notTenuredCheckBox.checked) {
         tenureValue = [0, 1]; // Show all if none are selected
    } else if (tenuredCheckBox.checked) {
        tenureValue = 1;
    } else if (notTenuredCheckBox.checked) {
        tenureValue = 0;
    }

    if (clickedCheckbox === classAboveCheckBox) {
        classBelowCheckBox.checked = false;
    } else if (clickedCheckbox === classBelowCheckBox) {
        classAboveCheckBox.checked = false;
    }

    if (clickedCheckbox === studentAboveCheckBox) {
        studentBelowCheckBox.checked = false;
    } else if (clickedCheckbox === studentBelowCheckBox) {
        studentAboveCheckBox.checked = false;
    }

    let salaryValue = salaryInput.value.trim();
    if (salaryValue !== "") {
        salaryValue = parseFloat(salaryValue); // Convert to number
        if (isNaN(salaryValue)) salaryValue = null;
    } else {
        salaryValue = null;
    }
    let salaryIs = null;
    console.log("Salary:", salaryValue, " above:",salaryAboveCheckBox.checked, " b:", salaryBelowCheckBox.checked )

    if (
        (salaryValue !== null && (salaryAboveCheckBox.checked ||  salaryBelowCheckBox.checked)) 
    ){
        if (salaryAboveCheckBox.checked) {
            salaryIs = "greater";
        } else if (salaryBelowCheckBox.checked) {
            salaryIs = "less";
        }  
    }else {
        salaryIs = null;
    }
    fetchProfessors(searchInput.value.trim(), tenureValue, salaryIs, salaryValue, departmentInput.value.trim());
}
window.onload = function () {
        if (!sessionStorage.getItem("loggedInUser")) {
            alert("You are not logged in! Redirecting to login page...");
            window.location.href = "../login/login.html";
            return;}
        toggleCheckMenu()}

searchInput.addEventListener("input", () =>  toggleCheckMenu(searchInput)); //search name
departmentInput.addEventListener("input", () => toggleCheckMenu(departmentInput));

document.addEventListener("DOMContentLoaded", () => {
    let tenuredCheckBox = document.getElementById("tenured");
    let notTenuredCheckBox = document.getElementById("notTenured");
    tenuredCheckBox.addEventListener("change", () =>{
        notTenuredCheckBox.checked = false;
        toggleCheckMenu(tenuredCheckBox)});
    notTenuredCheckBox.addEventListener("change", () => {
        tenuredCheckBox.checked = false;
        toggleCheckMenu(notTenuredCheckBox)});
});

document.addEventListener("DOMContentLoaded", () => {
    salaryInput.addEventListener("input", () => toggleCheckMenu(salaryInput));
    salaryAboveCheckBox.addEventListener("change", () => {
        salaryBelowCheckBox.checked = false;
        toggleCheckMenu(salaryAboveCheckBox)
    });
    salaryBelowCheckBox.addEventListener("change", () => {
        salaryAboveCheckBox.checked = false;
        toggleCheckMenu(salaryBelowCheckBox)});
});

let addProfessorButton = document.querySelector(".addProfessor")
    addProfessorButton.addEventListener("click", () => {
    let replaceButton=document.createElement("div")
    replaceButton.innerHTML = `
        <div class="addProfessorInfo">
        <div><h3>Professor Info</h3></div>
          <div> <input type="text" id="professorName" placeholder="Name" required></div>
          <div><input type="text" id="professorEmail" placeholder="Email" required></div>
          <div><input type="text" id="professorPhone" placeholder="Phone" required></div>
          <div><input type="number" id="professorSalary" placeholder="Salary" required></div>
          <div><input type="text" id="professorDepartment" placeholder="Department" required></div>
          <div> <input type="number" id="professorYearsWorked" placeholder="Years Worked" required></div>
          <div>
          <input type="radio" name="professorTenure" value=1 required> Tenured
          <input type="radio" name="professorTenure" value=0 required> Not Tenure</div>

          <button class="addProfessorButton" id="addProfessorButton">Add Professor</button>
        </div>
    `;
    addProfessorButton.parentNode.replaceChild(replaceButton, addProfessorButton);
})
