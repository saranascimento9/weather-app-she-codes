// get today date:
let today = new Date;

let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = days[today.getDay()];
let hour = today.getHours();
let minutes = today.getMinutes();

let currentTime = document.querySelector("h5");
currentTime.innerHTML = `${day}, ${hour}:${minutes}`



//form submit city
function showTemperature(response){
  let temperature = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector("#current-temp");
  cityTemperature.innerHTML=`${temperature}`;
 let weatherStatus = response.data.weather[0].description;
let cityWeather = document.querySelector("#current-weather");
cityWeather.innerHTML=`${weatherStatus}`;

// por o nome que está no API ( o nome real e não o nome pesquisado )
document.querySelector("#city").innerHTML = response.data.name;


let currentLow = Math.round(response.data.main.temp_min);
let tempLow = document.querySelector("#current-low");
tempLow.innerHTML=`${currentLow}º`;

let currentHigh = Math.round(response.data.main.temp_max);
let tempHigh = document.querySelector("#current-high");
tempHigh.innerHTML=`${currentHigh}º`;

 document.querySelector("form").reset();

}

function search(city){
let apiKey = "e6424ffa0c03cdd742b65ea106e5c912";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
 axios.get(apiUrl).then(showTemperature);
}


function retrieveCity(event){
  event.preventDefault();
  let city = document.querySelector("#user-city").value;
 // let displayCity = document.querySelector("#city");
  //displayCity.innerHTML = `${userCity.value}`;
  //userCity.reset();
  search(city);

}



let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", retrieveCity);




//search("Sintra");


//function displayCity (event){
 // event.preventDefault();
 // let userCity = document.querySelector("#user-city");
 //let displayCity = document.querySelector("#city");
 //displayCity.innerHTML = `${userCity.value}`;
 //} 


//let cityForm = document.querySelector("#city-form");
//cityForm.addEventListener("submit", displayCity);


// Toggle between Celsius & Fahrenheit

/*function changeFahrenheit(event){
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "66";
}

function changeCelsius(event){
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "18";
}

let fahrenheitUnit = document.querySelector("#fahrenheit");

fahrenheitUnit.addEventListener("click", changeFahrenheit);


let celsiusUnit = document.querySelector("#celsius");

celsiusUnit.addEventListener("click", changeCelsius);
*/



//Current Location button 


function showCurrentCity(event){
  event.preventDefault();

/*   function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let title = document.querySelector("#current-temp");
    title.innerHTML = `${temperature}`;


    let weatherStatus = response.data.weather[0].description;
    let cityWeather = document.querySelector("#current-weather");
    cityWeather.innerHTML=`${weatherStatus}`;

    let currentLow = Math.round(response.data.main.temp_min);
    let tempLow = document.querySelector("#current-low");
    tempLow.innerHTML=`${currentLow}º`;

    let currentHigh = Math.round(response.data.main.temp_max);
    let tempHigh = document.querySelector("#current-high");
    tempHigh.innerHTML=`${currentHigh}º`;


    let currentCityName = response.data.name;
    let displayCity = document.querySelector("#city");
    displayCity.innerHTML = `${currentCityName}`;

  } */

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