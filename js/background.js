const defaultImages = [
    "0.jpg",
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg"
];

const clearImages = [
    "Clear0.jpg",
    "Clear1.jpg",
    "Clear2.jpg",
    "Clear3.jpg",
    "Clear4.jpg"
];
const cloudImages = [
    "Cloud0.jpg",
    "Cloud1.jpg",
    "Cloud2.jpg",
    "Cloud3.jpg",
    "Cloud4.jpg"
];

const thunderStormImages = [
    "Thunderstorm0.jpg",
    "Thunderstorm1.jpg",
    "Thunderstorm2.jpg"
];

const hotImages = [
    "Hot0.jpg",
    "Hot1.jpg",
    "Hot2.jpg",
    "Hot3.jpg"
];

const rainImages = [
    "Rain0.jpg",
    "Rain1.jpg",
    "Rain2.jpg",
    "Rain3.jpg"
];

const snowImages = [
    "Snow0.jpg",
    "Snow1.jpg",
    "Snow2.jpg",
    "Snow3.jpg"
];

const mistImages = [
    "Mist0.jpg",
    "Mist1.jpg",
    "Mist2.jpg"
];

const arrayOfImages = [
    defaultImages,
    clearImages,
    cloudImages,
    thunderStormImages,
    hotImages,
    rainImages,
    snowImages,
    mistImages
];

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function setBackgroundByWeather(weather, temperature) {
    console.log("setBackgroundByWeather called : ", weather, temperature);
    const weatherDirPath = 'img/weather';
    const defaultDirPath = 'img/default';
    let imagePath, idx;
    if (temperature > 33) {
        const idx = getRandomNumber(hotImages.length);
        imagePath = `${weatherDirPath}/${hotImages[idx]}`;
    }
    else {
        switch (weather) {
            case 'Clouds':
                idx = getRandomNumber(cloudImages.length);
                imagePath = `${weatherDirPath}/${cloudImages[idx]}`;
                break;
            case 'Rain':
                idx = getRandomNumber(rainImages.length);
                imagePath = `${weatherDirPath}/${rainImages[idx]}`;
                break;
            case 'Snow':
                idx = getRandomNumber(snowImages.length);
                imagePath = `${weatherDirPath}/${snowImages[idx]}`;
                break;
            case 'Clear':
                idx = getRandomNumber(clearImages.length);
                imagePath = `${weatherDirPath}/${clearImages[idx]}`;
                break;
            case 'Mist':
                idx = getRandomNumber(mistImages.length);
                imagePath = `${weatherDirPath}/${mistImages[idx]}`;
                break;
            case 'Thunderstorm':
                idx = getRandomNumber(thunderStormImages.length);
                imagePath = `${weatherDirPath}/${thunderStormImages[idx]}`;
                break;
            default:
                // default의 경우, 랜덤한 이미지를 고른다
                
                // 이미지의 총 개수를 구해 imageCount에 저장한다.
                // 그 과정에서, 이미지의 카테고리 별 개수를 imageCountSumArray에 저장한다
                let imageCount = 0;
                let imageCountSumArray = [0];
                arrayOfImages.forEach((images) => {
                    imageCount += images.length;
                    imageCountSumArray.push(imageCount);
                });

                // imageCount 이하의 랜덤한 값을 고른다
                const imagePicker = getRandomNumber(imageCount);

                // imagePicker의 값에 따라 이미지의 index를 정한다
                let imageArrayIdx, imageIdx;
                for (let i = 0; i < imageCountSumArray.length; i++) {
                    if (imageCountSumArray[i] <= imagePicker
                        && imagePicker < imageCountSumArray[i + 1]) {
                        imageArrayIdx = i;
                        imageIdx = imagePicker - imageCountSumArray[i];
                        break;
                    }
                }

                // 정해진 index에 따라 imagePath를 만들어준다
                if (imagePicker < defaultImages.length) {
                    imagePath = `${defaultDirPath}/${arrayOfImages[imageArrayIdx][imageIdx]}`;
                }
                else {
                    imagePath = `${weatherDirPath}/${arrayOfImages[imageArrayIdx][imageIdx]}`;
                }
        }
    }
    img.src = imagePath;
    console.log(imagePath); // test
}

const randomIdx = Math.floor(Math.random() * defaultImages.length);
const img = document.createElement("img");
img.classList.add("background");
// img.src = `img/default/${defaultImages[randomIdx]}`;
document.body.appendChild(img);