const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const taskCount = document.getElementById("task-count");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.getElementById("clear-completed");


let todos = JSON.parse(localStorage.getItem("todos")) || [];


let currentFilter = "all";

function saveTodos() {
localStorage.setItem("todos", JSON.stringify(todos));
}

todoForm.addEventListener("submit", function (event) {
event.preventDefault();

const taskText = todoInput.value.trim();

if (taskText === "") {
    return;
}

const newTodo = {
    id: Date.now(),
    text: taskText,
    completed: false
};

todos.push(newTodo);

saveTodos();
renderTodos();

todoInput.value = "";
todoInput.focus();


});


function renderTodos() {
todoList.innerHTML = "";


const filteredTodos = todos.filter(function (todo) {
    if (currentFilter === "pending") {
        return !todo.completed;
    }

    if (currentFilter === "completed") {
        return todo.completed;
    }

    return true;
});


if (filteredTodos.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "empty-message";

    if (currentFilter === "pending") {
        emptyMessage.textContent = "No pending tasks!";
    } else if (currentFilter === "completed") {
        emptyMessage.textContent = "No completed tasks!";
    } else {
        emptyMessage.textContent = "No tasks yet. Add one!";
    }

    todoList.appendChild(emptyMessage);
}


filteredTodos.forEach(function (todo) {
    const li = document.createElement("li");
    li.className = "todo-item";

    if (todo.completed) {
        li.classList.add("completed");
    }


    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", "Mark task as completed");

    checkbox.addEventListener("change", function () {
        toggleTodo(todo.id);
    });


    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;

  
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("aria-label", "Delete task");

    deleteBtn.addEventListener("click", function () {
        deleteTodo(todo.id);
    });

    li.append(checkbox, span, deleteBtn);
    todoList.appendChild(li);
});


const pendingCount = todos.filter(function (todo) {
    return !todo.completed;
}).length;

taskCount.textContent =
    `${pendingCount} ${pendingCount === 1 ? "task" : "tasks"} left`;

}

function toggleTodo(id) {
todos = todos.map(function (todo) {
if (todo.id === id) {
return {
...todo,
completed: !todo.completed
};
}

    return todo;
});

saveTodos();
renderTodos();

}


function deleteTodo(id) {
todos = todos.filter(function (todo) {
return todo.id !== id;
});


saveTodos();
renderTodos();


}


filterButtons.forEach(function (button) {
button.addEventListener("click", function () {
currentFilter = button.dataset.filter;



    filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    renderTodos();
});

});

clearCompletedBtn.addEventListener("click", function () {
todos = todos.filter(function (todo) {
return !todo.completed;
});

saveTodos();
renderTodos();


});


renderTodos();
