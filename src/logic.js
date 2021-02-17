///////////////////////////////////////////////////////////////////////////
// Fetches and displays local day and time, changes time from military to 
// standard, example: 18:45 to 6:45 PM. Uses built-in JS new Date() Function.
function displayDayTime() {
  let now = new Date();
  let militaryHours = now.getHours();
  let rawMinutes = now.getMinutes();
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let today = days[now.getDay()];
  let hours;
  let minutes;
  let toggleAmPm;


  if (militaryHours > 12) {
    hours = militaryHours - 12;
    toggleAmPm = 'PM';
  } else if (militaryHours = 12) {
    hours = militaryHours;
    toggleAmPm = 'PM';
  } else {
    hours = militaryHours;
    toggleAmPm = 'AM';
  }
  if (rawMinutes < 10) {
    minutes = `0${rawMinutes}`;
  } else {
    minutes = rawMinutes;
  }
  let currentDayTime = document.querySelector("#day-time");
  currentDayTime.innerHTML = `${today} ${hours}:${minutes} ${toggleAmPm}`;
}

displayDayTime();
///////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////
// Fetches and displays current temperature, city name, feels-like, humidity,
// wind, and weather-description based on user form input, as well as whatever 
// initial parameter is fed through fetchData upon loading. Uses Axios AJAX 
// method to fetch data Objects.
function showData(response) {
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#current-weather-description").innerHTML = response.data.weather[0].description;
  console.log(response.data);
}

function fetchData(city) {
  let apiKey = '55bf9ac355060024d43ce8b4b16fd6fa';
  let units = 'metric';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showData);
}

function cityInput(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#form-input").value;
  fetchData(inputCity);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener('submit', cityInput);

fetchData('New York');
////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////
// When 'pin' button is clicked, fetches current temperature, city name, 
// feels - like, humidity, wind, and weather-description of users location 
// using built in JS geolocation. Uses Axios AJAX method to fetch data Objects 
// and sends data to function showData (above) to be displayed.
function fetchCurrentData(position) {
  let apiKey = '55bf9ac355060024d43ce8b4b16fd6fa';
  let units = 'metric';
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showData);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(fetchCurrentData);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);
////////////////////////////////////////////////////////////////////////////




// function toFahrenheit(event) {
//   event.preventDefault();
//   let temperature = document.querySelector("#temperature");
//   let changeToFahrenheit = (temperature * (9/5)) + 32;
//   temperature.innerHTML = `${changeToFahrenheit}`;
// }

// function toCelsius(event) {
//   event.preventDefault();
//   let temperature = document.querySelector("#temperature");
//   let changeToCelsius = (temperature - 32) * (5/9);
//   temperature.innerHTML = `${changeToCelsius}`;
// }

// let fahrenheit = document.querySelector("#fahrenheit-link");
// let celsius = document.querySelector("#celsius-link")

// fahrenheit.addEventListener('click', toFahrenheit);
// celsius.addEventListener('click', toCelsius);







