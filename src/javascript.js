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

let hours = today.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector("h5");
currentTime.innerHTML = `${day}, ${hours}:${minutes}`;

// Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ``;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
        <div class="row">
                <div class="col-4">
                  <p class="forecastday">${formatDay(forecastDay.dt)}</p>
                </div>
                <div class="col-4 d-flex justify-content-center">
                  
                    <img
                      src="https://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png"
                      alt=""
                      width=30px
                      height=30px"
                    />
                  
                </div>
                <div class="col-4 d-flex justify-content-end">
                  <p class="prev">
                    ${Math.round(forecastDay.temp.max)}º<span
                      >${Math.round(forecastDay.temp.min)}º</span
                    >
                  </p>
                </div>
          </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  //let apiKey = "0c9ac0512a8f2f0eb68c9e1d3b11f81d";
  let apiKey = "25daabf036ab93dfff641ebe0ef74488";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiKey);
}
//form submit city
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector("#current-temp");
  cityTemperature.innerHTML = `${temperature}`;
  let weatherStatus = response.data.weather[0].description;
  let cityWeather = document.querySelector("#current-weather");
  cityWeather.innerHTML = `${weatherStatus}`;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  // por o nome que está no API ( o nome real e não o nome pesquisado )
  document.querySelector("#city").innerHTML = response.data.name;

  let currentLow = Math.round(response.data.main.temp_min);
  let tempLow = document.querySelector("#current-low");
  tempLow.innerHTML = `${currentLow}º`;

  let currentHigh = Math.round(response.data.main.temp_max);
  let tempHigh = document.querySelector("#current-high");
  tempHigh.innerHTML = `${currentHigh}º`;

  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.coord);
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
