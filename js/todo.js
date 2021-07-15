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

const EDITING_CLASS = 'editing';
const ACCOMPLISHED_CLASS = "accomplished";
const FAVOURITE_CLASS = "favourite";

const FAVOURITE_TODO_KEY = "favouritetodos";
const TODO_KEY = "todo";
const ACCOMPLISHED_TODO_KEY = "accomplishedtodos";

let FavouriteToDos = [];
let ToDos = [];
let AccomplishedToDos = [];

function ToDo(text) {
    const todo = {};
    const date = new Date();
    todo.id = date.getTime();
    todo.text = text;
    todo.isFavourite = false;
    todo.isAccomplished = false;
    return todo;
}

function handleAccomplishClick(event) {
    const targetList = event.target.parentElement.parentElement;
    console.log(targetList);
    const targetID = targetList.id;
    const text = document.getElementById(`${targetID}`).querySelector('.text');
    const toDoObj = new ToDo(text.innerText);
    toDoObj.id = parseInt(targetID);
    toDoObj.isFavourite = false;
    toDoObj.isAccomplished = true;
    AccomplishedToDos.push(toDoObj);
    ToDos = ToDos.filter((element) => { return element.id !== parseInt(targetID) });
    removeAllToDos();
    paintAllToDos();
    saveToDos();
}

function handleFavouriteClick(event) {
    const targetList = event.target.parentElement.parentElement;
    console.log(targetList);
    const targetID = event.target.parentElement.parentElement.id;
    const text = document.getElementById(`${targetID}`).querySelector('.text');
    const toDoObj = new ToDo(text.innerText);
    toDoObj.id = parseInt(targetID);
    toDoObj.isAccomplished = false;
    if (!targetList.classList.contains(FAVOURITE_CLASS)) {
        toDoObj.isFavourite = true;
        FavouriteToDos.push(toDoObj);
        ToDos = ToDos.filter((element) => {
            return element.id !== parseInt(targetID)
        });
    }
    else {
        toDoObj.isFavourite = false;
        ToDos.push(toDoObj);
        FavouriteToDos = FavouriteToDos.filter((element) => {
                return element.id !== parseInt(targetID)
            });
    }
    removeAllToDos();
    paintAllToDos();
    saveToDos();
}

function removeAllToDos() {
    const ul = document.querySelector("ul#todo-list");
    ul.innerHTML = "";
}

function paintAllToDos() {
    for (let i = AccomplishedToDos.length - 1; i >= 0; i--){
        paintToDo(AccomplishedToDos[i]);
    }
    for (let i = ToDos.length - 1; i >= 0 ; i--){
        paintToDo(ToDos[i]);
    }
    for (let i = FavouriteToDos.length - 1; i >= 0; i--){
        paintToDo(FavouriteToDos[i]);
    }
}

function repaintAllToDos() {
    removeAllToDos();
    paintAllToDos();
}

function saveToDos() {
    const StringifiedFavouriteToDos = JSON.stringify(FavouriteToDos);
    const StringifiedToDos = JSON.stringify(ToDos);
    const StringifiedAccomplishedToDos = JSON.stringify(AccomplishedToDos);
    localStorage.setItem(FAVOURITE_TODO_KEY, StringifiedFavouriteToDos);
    localStorage.setItem(TODO_KEY, StringifiedToDos);
    localStorage.setItem(ACCOMPLISHED_TODO_KEY, StringifiedAccomplishedToDos);
}

function deleteTodo(event) {
    const targetList = event.target.parentElement.parentElement;
    const targetID = targetList.id;
    if (targetList.classList.contains(ACCOMPLISHED_CLASS)) {
        AccomplishedToDos = AccomplishedToDos.filter((element) => {
            return element.id !== parseInt(targetID)
        });
        console.log(AccomplishedToDos);
    }
    else if (targetList.classList.contains(FAVOURITE_CLASS)) {
        FavouriteToDos = FavouriteToDos.filter((element) => {
            return element.id !== parseInt(targetID)
        })
    }
    else {
        ToDos = ToDos.filter((element) => {
            return element.id !== parseInt(targetID)
        });
    }
    targetList.remove();
    saveToDos();
}

function paintToDo(toDoObj) {
    const li = document.createElement("li");
    li.id = toDoObj.id;
    if (toDoObj.isAccomplished === true) {
        li.classList.add(ACCOMPLISHED_CLASS);
    }
    if (toDoObj.isFavourite === true) {
        li.classList.add(FAVOURITE_CLASS);
    }

    const text = document.createElement("span");
    text.classList.add("text");
    text.innerHTML = toDoObj.text;

    const rightHandButtons = document.createElement("span");
    rightHandButtons.classList.add("right-hand-buttons");

    const leftHandButtons = document.createElement("span");
    leftHandButtons.classList.add("left-hand-buttons");

    const favouriteButton = document.createElement("i");
    favouriteButton.id = "todo-favourite-button";
    if (toDoObj.isFavourite === true) {
        favouriteButton.classList.add(fullIconClass);
        li.classList.add(FAVOURITE_CLASS);
    }
    else {
        favouriteButton.classList.add(blankIconClass);
    }
    favouriteButton.classList.add(starIconClass);
    if (toDoObj.isAccomplished !== true) {
        favouriteButton.addEventListener("click", handleFavouriteClick);
    }

    const accomplishedButton = document.createElement("i");
    accomplishedButton.id = "todo-accomplished-button";
    accomplishedButton.classList.add(fullIconClass);
    accomplishedButton.classList.add(checkIconClass);
    accomplishedButton.addEventListener("click", handleAccomplishClick)
   
    const deleteButton = document.createElement("i");
    deleteButton.id = "todo-delete-button";
    deleteButton.classList.add(fullIconClass);
    deleteButton.classList.add(failIconClass);
    deleteButton.addEventListener("click", deleteTodo);

    leftHandButtons.appendChild(favouriteButton);
    li.appendChild(leftHandButtons);
    li.appendChild(text);
    rightHandButtons.appendChild(accomplishedButton);
    rightHandButtons.appendChild(deleteButton);
    li.appendChild(rightHandButtons);
    toDoList.append(li);
}


function handleToDoSubmit(event) {
    event.preventDefault();
    // todo가 너무 많으면 skip
    let todoCount = FavouriteToDos.length + ToDos.length + AccomplishedToDos.length;
    if (todoCount >= 10) {
        const warningMessage = document.querySelector("#todo-form #todo-warning");
        warningMessage.classList.add("fade-in-and-out");
        setTimeout(() => { warningMessage.classList.remove("fade-in-and-out"); }, 2000);
        return;
    }
    const text = toDoInput.value;
    toDoInput.value = "";
    const newToDo = new ToDo(text);
    ToDos.push(newToDo);
    repaintAllToDos();
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedFavouriteToDos = localStorage.getItem(FAVOURITE_TODO_KEY);
const savedToDos = localStorage.getItem(TODO_KEY);
const savedAccomplishedToDos = localStorage.getItem(ACCOMPLISHED_TODO_KEY);
// Load
if (savedFavouriteToDos !== null)
    FavouriteToDos = JSON.parse(savedFavouriteToDos);

if (savedToDos !== null)
    ToDos = JSON.parse(savedToDos);

if (savedAccomplishedToDos !== null)
    AccomplishedToDos = JSON.parse(savedAccomplishedToDos);

paintAllToDos();
