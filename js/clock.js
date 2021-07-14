const clock = document.querySelector('h2#clock');
let hours = '00';
let minutes = '00';


function updateClock() {
    const date = new Date();
    hours = String(date.getHours()).padStart(2, "0");
    minutes = String(date.getMinutes()).padStart(2, "0");
    clock.innerHTML = `${hours}:${minutes}`;
}

updateClock();
setInterval(updateClock, 60000);

// export { hours, minutes };