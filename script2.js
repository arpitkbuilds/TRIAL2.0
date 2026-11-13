// =========================
// StudyPilot - Dashboard Logic + Progress Analyzer
// =========================

// ----- Sample Data -----
const tasks = [
    {
        id: 1,
        title: "Complete Python Practice",
        subject: "Programming",
        time: "10:00 AM",
        priority: "high",
        completed: false
    },
    {
        id: 2,
        title: "Revise Mathematics",
        subject: "Mathematics",
        time: "12:00 PM",
        priority: "medium",
        completed: true
    },
    {
        id: 3,
        title: "Read HTML Notes",
        subject: "Web Development",
        time: "04:00 PM",
        priority: "low",
        completed: false
    },
    {
        id: 4,
        title: "Physics Numericals",
        subject: "Physics",
        time: "06:30 PM",
        priority: "high",
        completed: false
    }
];

const subjects = [
    { name: "Programming", progress: 82, color: "blue" },
    { name: "Mathematics", progress: 68, color: "green" },
    { name: "Web Development", progress: 91, color: "orange" },
    { name: "Physics", progress: 55, color: "purple" },
    { name: "English", progress: 74, color: "pink" }
];


// ----- DOM Elements -----
const taskListEl      = document.getElementById("taskList");
const progressCircle  = document.getElementById("progressCircle");
const progressPercent = document.getElementById("progressPercent");
const progressMessage = document.getElementById("progressMessage");
const subjectBarsEl   = document.getElementById("subjectBars");
const weeklyInsightEl = document.getElementById("weeklyInsight");

const statSubjects  = document.getElementById("statSubjects");
const statCompleted = document.getElementById("statCompleted");
const statPending   = document.getElementById("statPending");
const statProgress  = document.getElementById("statProgress");


// ----- Render Tasks -----
function renderTasks() {
    taskListEl.innerHTML = "";

    tasks.forEach(task => {
        const taskEl = document.createElement("div");
        taskEl.className = "task";
        taskEl.dataset.id = task.id;

        taskEl.innerHTML = `
            <div class="task-check ${task.completed ? "completed" : ""}">
                ${task.completed ? "✓" : ""}
            </div>
            <div class="task-info">
                <h4>${task.title}</h4>
                <p>${task.subject} · ${task.time}</p>
            </div>
            <span class="priority ${task.priority}">${capitalize(task.priority)}</span>
        `;

        taskEl.addEventListener("click", () => toggleTask(task.id));
        taskListEl.appendChild(taskEl);
    });
}


// ----- Toggle Task -----
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        updateStatsAndProgress();
    }
}


// ----- Calculate Overall Progress -----
function calculateOverallProgress() {
    // Weighted: 40% from today's tasks + 60% from subject average
    const completedToday = tasks.filter(t => t.completed).length;
    const taskProgress = tasks.length ? Math.round((completedToday / tasks.length) * 100) : 0;

    const subjectAvg = Math.round(
        subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length
    );

    return Math.round(taskProgress * 0.4 + subjectAvg * 0.6);
}


// ----- Update Stats + Circle + Analyzer -----
function updateStatsAndProgress() {
    const completed = tasks.filter(t => t.completed).length;
    const pending   = tasks.length - completed;
    const overall   = calculateOverallProgress();

    // Top stats
    statSubjects.textContent  = String(subjects.length).padStart(2, "0");
    statCompleted.textContent = String(completed + 10).padStart(2, "0"); // +10 as previous completed
    statPending.textContent   = String(pending).padStart(2, "0");
    statProgress.textContent  = overall + "%";

    // Progress circle
    progressPercent.textContent = overall + "%";
    progressCircle.style.background = `conic-gradient(
        #2563eb 0% ${overall}%,
        #e2e8f0 ${overall}% 100%
    )`;

    // Motivational message
    if (overall >= 85) {
        progressMessage.textContent = "Outstanding! You're in the top performance zone.";
    } else if (overall >= 70) {
        progressMessage.textContent = "Excellent progress! Keep up the consistency.";
    } else if (overall >= 50) {
        progressMessage.textContent = "Good start. Focus on pending high-priority tasks.";
    } else {
        progressMessage.textContent = "Let's push harder today. Small steps count!";
    }

    // Subject bars
    renderSubjectBars();

    // Weekly insight
    renderWeeklyInsight(overall, completed, pending);
}


// ----- Subject Progress Bars -----
function renderSubjectBars() {
    subjectBarsEl.innerHTML = "";

    subjects.forEach(sub => {
        const row = document.createElement("div");
        row.className = "subject-row";

        row.innerHTML = `
            <div class="subject-row-header">
                <span>${sub.name}</span>
                <span>${sub.progress}%</span>
            </div>
            <div class="bar-track">
                <div class="bar-fill ${sub.color}" style="width: ${sub.progress}%"></div>
            </div>
        `;

        subjectBarsEl.appendChild(row);
    });
}


// ----- Weekly Insight (Progress Analyzer text) -----
function renderWeeklyInsight(overall, completed, pending) {
    const weakest = subjects.reduce((min, s) => s.progress < min.progress ? s : min, subjects[0]);
    const strongest = subjects.reduce((max, s) => s.progress > max.progress ? s : max, subjects[0]);

    let advice = "";
    if (pending > 0) {
        advice = `You still have <strong>${pending} pending task(s)</strong> today. Prioritize high-priority ones first.`;
    } else {
        advice = "All today's tasks are done. Great discipline!";
    }

    weeklyInsightEl.innerHTML = `
        <strong>Analyzer Insight:</strong><br>
        Overall score is <strong>${overall}%</strong>. 
        Strongest subject: <strong>${strongest.name}</strong> (${strongest.progress}%). 
        Needs attention: <strong>${weakest.name}</strong> (${weakest.progress}%). 
        ${advice}
    `;
}


// ----- Helpers -----
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


// ----- Event Listeners -----
document.getElementById("exploreTasksBtn").addEventListener("click", () => {
    document.querySelector(".tasks-panel").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("viewAllTasks").addEventListener("click", () => {
    alert("Full task list view coming soon in next version!");
});


// ----- Initialize -----
renderTasks();
updateStatsAndProgress();