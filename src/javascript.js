// get today date:
let today = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
let hour = today.getHours();
let minutes = today.getMinutes();

let currentTime = document.querySelector("h5");
currentTime.innerHTML = `${day}, ${hour}:${minutes}`;

//form submit city
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector("#current-temp");
  cityTemperature.innerHTML = `${temperature}`;
  let weatherStatus = response.data.weather[0].description;
  let cityWeather = document.querySelector("#current-weather");
  cityWeather.innerHTML = `${weatherStatus}`;

  // por o nome que está no API ( o nome real e não o nome pesquisado )
  document.querySelector("#city").innerHTML = response.data.name;

  let currentLow = Math.round(response.data.main.temp_min);
  let tempLow = document.querySelector("#current-low");
  tempLow.innerHTML = `${currentLow}º`;

  let currentHigh = Math.round(response.data.main.temp_max);
  let tempHigh = document.querySelector("#current-high");
  tempHigh.innerHTML = `${currentHigh}º`;

  document.querySelector("form").reset();
}

function search(city) {
  let apiKey = "e6424ffa0c03cdd742b65ea106e5c912";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function retrieveCity(event) {
  event.preventDefault();
  let city = document.querySelector("#user-city").value;
  search(city);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", retrieveCity);

//Current Location button

function showCurrentCity(event) {
  event.preventDefault();

  function currentPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiKey = "25daabf036ab93dfff641ebe0ef74488";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
  }

  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentLocationButton = document.querySelector("#current-location");

currentLocationButton.addEventListener("click", showCurrentCity);

// load function // display a city by default
search("Sintra");
