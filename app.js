import { addTask, advanceTask, deleteTask, countByStatus, filterByStatus } from "./model.js";
let tasks = [
    { id: 1, title: "Initialize Git repository & branch", status: "done" },
    { id: 2, title: "Build typed model.ts", status: "done" },
    { id: 3, title: "Build interactive UI in app.ts", status: "in-progress" },
    { id: 4, title: "Deploy to GitHub Pages", status: "todo" }
];
let currentFilter = "all";
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const countAll = document.getElementById("count-all");
const countTodo = document.getElementById("count-todo");
const countInProgress = document.getElementById("count-in-progress");
const countDone = document.getElementById("count-done");
const filterButtons = document.querySelectorAll(".filter-btn");
function render() {
    countAll.textContent = tasks.length.toString();
    countTodo.textContent = countByStatus(tasks, "todo").toString();
    countInProgress.textContent = countByStatus(tasks, "in-progress").toString();
    countDone.textContent = countByStatus(tasks, "done").toString();
    const filteredTasks = currentFilter === "all"
        ? tasks
        : filterByStatus(tasks, currentFilter);
    taskList.innerHTML = "";
    if (filteredTasks.length === 0) {
        emptyState.style.display = "block";
    }
    else {
        emptyState.style.display = "none";
        filteredTasks.forEach((task) => {
            const li = document.createElement("li");
            li.className = `task-item status-${task.status}`;
            li.innerHTML = `
        <div class="task-info">
          <span class="task-title">${escapeHtml(task.title)}</span>
          <span class="badge badge-${task.status}">${formatStatus(task.status)}</span>
        </div>
        <div class="task-actions">
          ${task.status !== "done" ? `<button class="btn-action btn-advance" data-id="${task.id}" title="Advance status">Advance ➔</button>` : ""}
          <button class="btn-action btn-delete" data-id="${task.id}" title="Delete task">🗑️</button>
        </div>
      `;
            taskList.appendChild(li);
        });
    }
}
function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}
function formatStatus(status) {
    if (status === "todo")
        return "To Do";
    if (status === "in-progress")
        return "In Progress";
    return "Done";
}
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (!title)
        return;
    tasks = addTask(tasks, title);
    taskInput.value = "";
    render();
});
taskList.addEventListener("click", (e) => {
    const target = e.target;
    const idStr = target.getAttribute("data-id");
    if (!idStr)
        return;
    const id = parseInt(idStr, 10);
    if (target.classList.contains("btn-advance")) {
        tasks = advanceTask(tasks, id);
        render();
    }
    else if (target.classList.contains("btn-delete")) {
        tasks = deleteTask(tasks, id);
        render();
    }
});
filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filterValue = btn.getAttribute("data-filter");
        if (filterValue === "all" || filterValue === "todo" || filterValue === "in-progress" || filterValue === "done") {
            currentFilter = filterValue;
            render();
        }
    });
});
render();
