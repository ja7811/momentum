const images = [
    "0.jpg",
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg"
]

const randomIdx = Math.floor(Math.random() * images.length);
const img = document.createElement("img");
img.classList.add("background");
img.src = `img/${images[randomIdx]}`;
document.body.appendChild(img);

