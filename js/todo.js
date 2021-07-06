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
    const targetID = event.target.parentElement.parentElement.id;
    // const text = document.querySelector(`li#${targetID} span.text`);
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

function removeAllToDos() {
    const ul = document.querySelector("ul#todo-list");
    console.log(ul);
    ul.innerHTML = "";
}

function paintAllToDos() {
    FavouriteToDos.forEach(paintToDo);
    ToDos.forEach(paintToDo);
    AccomplishedToDos.forEach(paintToDo);
}

function handleToDoClick(event) {
    // todo의 text 변경
    console.log(event);
    const li = event.target.parentElement;
    if (li.localName === 'li') {
        editToDo(li)
    } else {
        console.log("complete the log first!");
    }
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
    targetList.remove();
    console.log(targetList);
    console.log("deleting ", targetID);

    if (targetList.classList.contains(ACCOMPLISHED_CLASS)) {
        console.log("deleting accomplished todo");
        AccomplishedToDos = AccomplishedToDos.filter((element) => {
            return element.id !== parseInt(targetID)
        });
        console.log(AccomplishedToDos);
    }
    else if (targetList.classList.contains(FAVOURITE_CLASS)) {
        console.log("deleting favourite todo");
        FavouriteToDos = FavouriteToDos.filter((element) => {
            return element.id !== parseInt(targetID)
        })
    }
    else {
        console.log("deleting normal todo");
        ToDos = ToDos.filter((element) => {
            return element.id !== parseInt(targetID)
        });
    }
    saveToDos();
}

function paintToDo(toDoObj) {
    const li = document.createElement("li");
    li.id = toDoObj.id;
    if (toDoObj.isAccomplished === true) {
        li.classList.add(ACCOMPLISHED_CLASS);
    }

    const text = document.createElement("span");
    text.classList.add("text");
    text.innerHTML = toDoObj.text;
    text.addEventListener("click", handleToDoClick);

    const rightHandButtons = document.createElement("span");
    rightHandButtons.classList.add("right-hand-buttons");

    const leftHandButtons = document.createElement("span");
    leftHandButtons.classList.add("left-hand-buttons");

    const favouriteButton = document.createElement("i");
    favouriteButton.id = "todo-favourite-button";
    if (toDoObj.isAccomplished === true) favouriteButton.classList.add(fullIconClass);
    else favouriteButton.classList.add(blankIconClass);
    favouriteButton.classList.add(starIconClass);

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
    const text = toDoInput.value;
    toDoInput.value = "";
    const newToDo = new ToDo(text);
    paintToDo(newToDo);
    ToDos.push(newToDo);
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
