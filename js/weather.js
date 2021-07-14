navigator.geolocation.getCurrentPosition(OnGeoSuccess, OnGeoFail);
const weatherBox = document.querySelector("#weather-box");
const weatherBoxCity = weatherBox.querySelector("#weather-box-city");
const weatherBoxWeather = weatherBox.querySelector("#weather-box-weather");

weatherBoxWeather.innerHTML = "Loading Weather...";

function OnGeoSuccess(geoLocationData) {
    const longitude = geoLocationData.coords.longitude
    const latitude = geoLocationData.coords.latitude
    const API_KEY = "86c28944ecf6f3131633ba60c56380ee";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    fetch(url).then((response) => response.json()).then(data => {
        if (data.cod !== 200) {
            // fetch failed
            weatherBoxWeather.innerHTML = "Failed loading weather.";
        } else {
            // fetch success
            const city = data.name;
            const weather = data.weather[0].main
            const temperature = data.main.temp;
            weatherBoxCity.innerHTML = `@${city}, `;
            weatherBoxWeather.innerHTML = `${temperature}°C ${weather} `;
        }
    });
}

function OnGeoFail(geoLocationData) {
    console.log("No weather for you!");
    weatherBoxWeather.innerHTML = "Weather api fetch failed!";
}