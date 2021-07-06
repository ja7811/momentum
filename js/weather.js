navigator.geolocation.getCurrentPosition(OnGeoSuccess, OnGeoFail);
const weatherBox = document.querySelector("#weather-box");
const weatherBoxCity = weatherBox.querySelector("#weather-box-city");
const weatherBoxWeather = weatherBox.querySelector("#weather-box-weather");

weatherBoxWeather.innerHTML = "Loading Weather...";

function OnGeoSuccess(geoLocationData) {
    const longitude = geoLocationData.coords.longitude
    const latitude = geoLocationData.coords.latitude
    const API_KEY = "86c28944ecf6f3131633ba60c56380ee";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    fetch(url).then((response) => {
        if (response.cod !== 200) {
            console.log("weather api fetch failed!");
            weatherBoxWeather.innerHTML = "Weather api fetch failed!";
        } else {
            console.log(response);
        }
    });
}

function OnGeoFail(geoLocationData) {
    console.log("No weather for you!");
    weatherBoxWeather.innerHTML = "Weather api fetch failed!";
}

