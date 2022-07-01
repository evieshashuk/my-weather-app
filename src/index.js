let now = new Date();
let dayTime = document.querySelector("#time");

let hours = now.getHours();
if (hours < 10) {
  hours = "0" + hours;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = week[now.getDay()];
dayTime.innerHTML = `${weekDay}, ${hours}:${minutes} `;

// Search

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchCityInput");
  let units = "metric";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

let search = document.querySelector("#searchcityButton");
search.addEventListener("click", searchCity);

let temperature = null;
let currentTemperature = null;

// Wreather
function showWeather(response) {
  let city = document.querySelector("#currentCity");
  let cityName = response.data.name;
  city.innerHTML = `Today in ` + cityName;

  let temperatureElement = document.querySelector("#temperature");
  temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = temperature + `°`;

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `Humidity: ` + humidity + `%`;

  let windElement = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind: ` + wind + ` km/h`;

  let clouds = response.data.weather[0].description;
  let cloudsElement = document.querySelector("#clouds");
  cloudsElement.innerHTML = clouds;

  let feelingElement = document.querySelector("#feels-like");
  let feelsLike = Math.round(response.data.main.feels_like);
  feelingElement.innerHTML = `Feels like: ` + feelsLike + `°`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

// Current location
function locationButton(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  function showTemperature(position) {
    let temperatureCur = document.querySelector("#temperature");
    currentTemperature = Math.round(position.data.main.temp);
    temperatureCur.innerHTML = currentTemperature;

    let city = document.querySelector("#currentCity");
    let cityName = position.data.name;
    city.innerHTML = `Today in ` + cityName;

    let feelingElement = document.querySelector("#feels-like");
    let feelsLike = Math.round(position.data.main.feels_like);
    feelingElement.innerHTML = `Feels like: ` + feelsLike + `°`;

    let humidity = position.data.main.humidity;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ` + humidity + `%`;

    let windElement = document.querySelector("#wind");
    let wind = position.data.wind.speed;
    windElement.innerHTML = `Wind: ` + wind + `km/h`;

    let cloudsElement = document.querySelector("#clouds");
    let clouds = position.data.weather[0].description;
    cloudsElement.innerHTML = clouds;

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${position.data.weather[0].icon}@2x.png`
    );
  }
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locationButton);
}
let locationCurrent = document.querySelector("#searchCurrentLocation");
locationCurrent.addEventListener("click", getCurrentPosition);

//convert C to F

function showFarenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let farenheitTemperature = (temperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature) + `°`;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(temperature) + `°`;
}

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", showFarenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

let farenheitLinkCur = document.querySelector("#farenheit");
farenheitLinkCur.addEventListener("click", showFarenheitTempCur);

function showFarenheitTempCur(event) {
  event.preventDefault();
  let temperatureElementCur = document.querySelector("#temperature");
  temperatureElementCu.innerHTML = Math.round(farenheitTemperature) + `°`;
}
