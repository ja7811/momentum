const loginForm = document.querySelector("form#login-form");
const greeting = document.querySelector("#greeting");
const CLASS_MAKE_HIDDEN = "hidden";


function handleLogin(event) {
    const username = loginForm.querySelector("input").value;
    event.preventDefault();
    loginForm.classList.add(CLASS_MAKE_HIDDEN);
    localStorage.setItem("username", username);
    paintGreeting(username)
}

function paintGreeting(username) {
    greeting.classList.remove(CLASS_MAKE_HIDDEN);
    greeting.innerHTML = `Hello, ${username}!`;
    document.querySelector("h2#clock").classList.remove(CLASS_MAKE_HIDDEN);
    document.querySelector("form#todo-form").classList.remove(CLASS_MAKE_HIDDEN);
    document.querySelector("ul#todo-list").classList.remove(CLASS_MAKE_HIDDEN);
}


const savedUsername = localStorage.getItem("username");

if (savedUsername === null) {
    loginForm.classList.remove(CLASS_MAKE_HIDDEN);
    loginForm.addEventListener("submit", handleLogin);
} else {
    paintGreeting(savedUsername);
}