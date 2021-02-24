////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let militaryHours = now.getHours();
  let rawMinutes = now.getMinutes();
  let hours;
  let minutes;

  if (militaryHours > 12) {
    hours = militaryHours - 12;
  } else if (militaryHours = 12) {
    hours = militaryHours;
  } else {
    hours = militaryHours;
  }
  if (rawMinutes < 10) {
    minutes = `0${rawMinutes}`;
  } else {
    minutes = rawMinutes;
  }
  return `${hours}:${minutes}`
}

////////////////////////////////////////////////////////////////////////////
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
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = Math.round(response.data.main.temp);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;


  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
      <div class="col-2">
        <span>
         ${formatHours(forecast.dt * 1000)}
        </span>
        <br />
        <span>
          ${Math.round(forecast.main.temp_max)}° | ${Math.round(forecast.main.temp_min)}° 
        </span>
        <br />
        <img  src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
              alt="weather icon"
        />
      </div>`;
  }
}

function fetchData(city) {
  let apiKey = '55bf9ac355060024d43ce8b4b16fd6fa';
  let units = 'metric';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showData);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
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
currentButton.addEventListener('click', getCurrentPosition);
////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////
// Targets the innerHTML of temperature to convert to fahrenheit when 'F'
// is clicked and back to celsius when 'C' is clicked. Adds/removes default
// link styling on inactive links.
function toCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = celsiusTemperature;

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

function toFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let changeToFahrenheit = (celsiusTemperature * (9 / 5)) + 32;
  temperature.innerHTML = Math.round(changeToFahrenheit);

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener('click', toFahrenheit);

let celsius = document.querySelector("#celsius-link")
celsius.addEventListener('click', toCelsius);
////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////
// function displayNextDay() {
//   let then = new Date();
//   let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   let day = days[then.getDay()];
  
//   let currentDayTime = document.querySelector("#day-time");

// }

// displayNextDay();
////////////////////////////////////////////////////////////////////////////


