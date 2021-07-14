const images = [
    "0.jpg",
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg"
]

const clearImages = [
    "clear0.jpg",
    "clear1.jpg",
    "clear2.jpg",
    "clear3.jpg",
    "clear4.jpg"
]

const cloudImages = [
    "cloud0.jpg",
    "cloud1.jpg",
    "cloud2.jpg",
    "cloud3.jpg",
    "cloud4.jpg"
]

const extremeImages = [
    "extreme0.jpg",
    "extreme1.jpg",
    "extreme2.jpg"
]

const hotImages = [
    "hot0.jpg",
    "hot1.jpg",
    "hot2.jpg",
    "hot3.jpg"
]

const rainImages = [
    "rain0.jpg",
    "rain1.jpg",
    "rain2.jpg",
    "rain3.jpg"
]

const snowImages = [
    "snow0.jpg",
    "snow1.jpg",
    "snow2.jpg",
    "snow3.jpg"
]

const randomIdx = Math.floor(Math.random() * images.length);
const img = document.createElement("img");
img.classList.add("background");
img.src = `img/default/${images[randomIdx]}`;
document.body.appendChild(img);
console.log("background.js : ", weather);

// Clouds
// Rain
// Snow
// Extreme
// Clear
// Mist