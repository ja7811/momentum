const toDoForm = document.querySelector("form#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoButton = toDoForm.querySelector("button");
const toDoList = document.querySelector("ul#todo-list");


let ToDos = [];

function ToDo(text) {
    const todo = {};
    const date = new Date();
    todo.id = date.getTime();
    todo.text = text;
    todo.isFavourite = false;
    todo.isAccomplished = false;
    return todo;
}

function saveToDos() {
    const StringifiedToDos = JSON.stringify(ToDos);
    localStorage.setItem("todo", StringifiedToDos);
}

function deleteTodo(event) {
    const targetID = event.target.parentElement.id;
    event.target.parentElement.remove();
    ToDos = ToDos.filter((element) => { return element.id !== parseInt(targetID) });
    saveToDos();
}

function paintToDo(toDoObj) {
    const li = document.createElement("li");
    li.className = "each-todo";
    li.id = toDoObj.id;
    const text = document.createElement("span");
    text.innerHTML = toDoObj.text;
    const favouriteButton = document.createElement("button");
    favouriteButton.id = "todo-favourite-button";
    favouriteButton.innerHTML = "❤";
    const editButton = document.createElement("button");
    editButton.id = "todo-edit-button";
    editButton.innerHTML = "❗";
    const accomplishedButton = document.createElement("button");
    accomplishedButton.id = "todo-accomplished-button";
    accomplishedButton.innerHTML = "⭕";
    const deleteButton = document.createElement("button");
    deleteButton.id = "todo-delete-button";
    deleteButton.innerText = "❌";
    deleteButton.addEventListener("click", deleteTodo);
    li.appendChild(favouriteButton);
    li.appendChild(text);
    li.appendChild(editButton);
    li.appendChild(accomplishedButton);
    li.appendChild(deleteButton);
    toDoList.append(li);
}


function handleToDoSubmit(event) {
    event.preventDefault();
    const text = toDoInput.value;
    toDoInput.value = "";
    const newToDo = new ToDo(text);
    paintToDo(newToDo);
    ToDos.push(newToDo);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const SavedToDos = localStorage.getItem("todo");
if (SavedToDos !== null) {
    // Load
    ToDos = JSON.parse(SavedToDos);
    ToDos.forEach(paintToDo);
}