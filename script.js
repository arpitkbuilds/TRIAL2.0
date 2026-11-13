
// Explore Tasks button
document.querySelector(".primary-btn").addEventListener("click", function () {
    document.querySelector(".tasks-panel").scrollIntoView({
        behavior: "smooth"
    });
});

// View All button
document.querySelector(".text-btn").addEventListener("click", function () {
    alert("More task management features are coming soon!");
});

// Task checkboxes
document.querySelectorAll(".task-check").forEach(function (checkbox) {

    checkbox.addEventListener("click", function () {

        checkbox.classList.toggle("completed");

        if (checkbox.classList.contains("completed")) {
            checkbox.textContent = "✓";
        } else {
            checkbox.textContent = "";
        }

    });

});
