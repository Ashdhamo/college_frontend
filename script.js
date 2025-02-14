function loginUser() {

    let username = document.getElementById("userName").value.trim();
    let password = document.getElementById("password").value.trim();
    let errorMessage = document.getElementById("error-message");

    if (!username || !password) {
        errorMessage.innerText = "Please enter both username and password.";
        errorMessage.style.color = "red";
        return;
    }

    let user = {
        user_name: username,
        password: password
    };


    fetch("http://127.0.0.1:8080/login/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        console.log("Raw Response:", response);
        return response.json().catch(() => null);
    })
    .then(data => {
        console.log("Response data:", data);

        if (data && data.user && data.user.user_name) {
            sessionStorage.setItem("loggedInUser", JSON.stringify(data.user));
            alert("Login successful! Redirecting...");
            window.location.href = "welcome.html";
        } else {
            errorMessage.innerText = data ? data.error || "Invalid username or password." : "No response from server.";
            errorMessage.style.color = "red";
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        errorMessage.innerText = "Failed to connect to the server. Check if Flask is running.";
        errorMessage.style.color = "red";
    });
}
