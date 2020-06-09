//selectors
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const todoButton = document.querySelector(".todo-button");

//Event Listners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", todoClicked);
document.addEventListener("DOMContentLoaded", getTodos);

//Functions

// gets the todos from localstorage and loads it into the todos
function getTodos() {
  let todos = localStorage.getItem("todos");
  if (todos === null || todos.length === 0) {
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      loadTodo(todo);
    });
  }
}

// creates a new todoDiv
function createNewTodo(task) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const completedButton = document.createElement("button");
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const newTodo = document.createElement("li");
  newTodo.innerHTML = task;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  return todoDiv;
}

function addTodo(event) {
  event.preventDefault();
  const task = todoInput.value;
  const todoDiv = createNewTodo(task);

  saveTodo(todoInput.value);
  todoInput.value = "";

  todoList.appendChild(todoDiv);
}

function loadTodo(task) {
  const todoDiv = createNewTodo(task);
  todoList.appendChild(todoDiv);
}

function todoClicked(e) {
  const item = e.target;
  const todo = item.parentElement;
  const task = todo.querySelector(".todo-item").innerHTML;

  if (item.classList[0] === "trash-btn") deleteTodo(todo, task);

  if (item.classList[0] === "complete-btn") completeTodo(task);
}

function deleteTodo(todo, task) {
  deleteTodoFromLocal(task);
  todo.remove();
}

function completeTodo(task) {
  todo.classList.toggle("completed");
}

function saveTodo(task) {
  let todos = JSON.parse(localStorage.getItem("todos"));

  if (!todos) {
    todos = [];
  }

  todos.push(task);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodoFromLocal(todo) {
  console.log(`Deleting ${todo}`);

  let todos = localStorage.getItem("todos");
  if (todos === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.splice(todos.indexOf(todo), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
