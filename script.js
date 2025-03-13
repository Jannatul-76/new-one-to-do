
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("task");
    let task = taskInput.value.trim();
    if (task === "") return;
    
    let li = document.createElement("li");
    li.innerHTML = `<input type='checkbox' class='custom-checkbox' onchange='toggleTask(this)'><span>${task}</span> <button class='edit' onclick='editTask(this)'>Edit</button> <button class='delete' onclick='removeTask(this)'>X</button>`;
    document.getElementById("taskList").appendChild(li);
    
    saveTasks();
    taskInput.value = "";
    updateProgress(); // Update progress whenever a new task is added
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
    updateProgress(); // Update progress after a task is removed
}

function toggleTask(checkbox) {
    let taskText = checkbox.nextElementSibling;
    if (checkbox.checked) {
        taskText.classList.add("completed");
    } else {
        taskText.classList.remove("completed");
    }
    saveTasks();
    updateProgress(); // Update progress when a task is checked or unchecked
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        let taskText = li.querySelector("span").textContent.trim();
        let isChecked = li.querySelector(".custom-checkbox").checked;
        tasks.push({ text: taskText, completed: isChecked });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `<input type='checkbox' class='custom-checkbox' ${task.completed ? "checked" : ""} onchange='toggleTask(this)'><span class='${task.completed ? "completed" : ""}'>${task.text}</span> <button class='edit' onclick='editTask(this)'>Edit</button> <button class='delete' onclick='removeTask(this)'>X</button>`;
        document.getElementById("taskList").appendChild(li);
    });
    updateProgress(); // Load progress bar based on stored tasks
}

function editTask(button) {
    let li = button.parentElement;
    let taskText = li.querySelector("span");
    let newTask = prompt("Edit your task:", taskText.textContent);
    if (newTask !== null && newTask.trim() !== "") {
        taskText.textContent = newTask.trim();
        saveTasks();
    }
}

function updateProgress() {
    let totalTasks = document.querySelectorAll("#taskList li").length;
    let completedTasks = document.querySelectorAll("#taskList li .custom-checkbox:checked").length;

    let progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    document.getElementById("progressBar").style.width = progress + "%";
}