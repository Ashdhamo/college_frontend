
fetch('http://127.0.0.1:8080/student/search'{
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
})

        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = ""; // Clear existing content

            user=data.map(student => {
                let row = document.createElement("tr");
                row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
                row.classList.add("clickable-row");
                row.onclick = () => toggleDetails(row, student);
                tableBody.appendChild(row);
            });
        })
        .catch(console.error);
};

