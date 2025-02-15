document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll("ul input[type='checkbox']");
    const uncheckAll = document.getElementById("uncheck-all");

    // Function to save checkbox state
    function saveState() {
        checkboxes.forEach((checkbox, index) => {
            localStorage.setItem(`todo-${index}`, checkbox.checked ? "checked" : "unchecked");
        });
    }

    // Load saved checkbox states
    checkboxes.forEach((checkbox, index) => {
        const savedState = localStorage.getItem(`todo-${index}`);
        if (savedState === "checked") {
            checkbox.checked = true;
            checkbox.parentElement.style.textDecoration = "line-through";
        }

        checkbox.addEventListener("change", function () {
            if (this.checked) {
                this.parentElement.style.textDecoration = "line-through";
            } else {
                this.parentElement.style.textDecoration = "none";
            }
            saveState();
        });
    });

    // Uncheck all checkboxes when "uncheck all" checkbox is clicked
    uncheckAll.addEventListener("change", function () {
        checkboxes.forEach((checkbox, index) => {
            checkbox.checked = false;
            checkbox.parentElement.style.textDecoration = "none";
            localStorage.setItem(`todo-${index}`, "unchecked");
        });

        // Ensure the "uncheck all" checkbox is unchecked again
        this.checked = false;
    });
});
