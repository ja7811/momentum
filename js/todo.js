const toDoForm = document.querySelector("form#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoButton = toDoForm.querySelector("button");
const toDoList = document.querySelector("ul#todo-list");
const blankIconClass = "far";
const fullIconClass = "fas";
const starIconClass = 'fa-star';
const editIconClass ='fa-edit';
const checkIconClass = 'fa-check';
const failIconClass = 'fa-times';

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
    const targetID = event.target.parentElement.parentElement.id;
    event.target.parentElement.parentElement.remove();
    ToDos = ToDos.filter((element) => { return element.id !== parseInt(targetID) });
    saveToDos();
}

function paintToDo(toDoObj) {
    const li = document.createElement("li");
    li.id = toDoObj.id;
    const text = document.createElement("span");
    text.classList.add("text");
    text.innerHTML = toDoObj.text;
    const rightHandButtons = document.createElement("span");
    rightHandButtons.classList.add("right-hand-buttons");
    const leftHandButtons = document.createElement("span");
    leftHandButtons.classList.add("left-hand-buttons");
    const favouriteButton = document.createElement("i");
    favouriteButton.id = "todo-favourite-button";
    favouriteButton.classList.add(blankIconClass);
    favouriteButton.classList.add(starIconClass);
    // const editButton = document.createElement("i");
    // editButton.id = "todo-edit-button";
    // editButton.classList.add(fullIconClass);
    // editButton.classList.add(editIconClass);
    const accomplishedButton = document.createElement("i");
    accomplishedButton.id = "todo-accomplished-button";
    accomplishedButton.classList.add(fullIconClass);
    accomplishedButton.classList.add(checkIconClass);
    const deleteButton = document.createElement("i");
    deleteButton.id = "todo-delete-button";
    deleteButton.classList.add(fullIconClass);
    deleteButton.classList.add(failIconClass);
    deleteButton.addEventListener("click", deleteTodo);
    leftHandButtons.appendChild(favouriteButton);
    li.appendChild(leftHandButtons);
    li.appendChild(text);
    // rightHandButtons.appendChild(editButton);
    rightHandButtons.appendChild(accomplishedButton);
    rightHandButtons.appendChild(deleteButton);
    li.appendChild(rightHandButtons);
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