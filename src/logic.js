function displayDayTime(timestamp) {
  let now = new Date();
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let today = days[now.getDay()];

  return `${today} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let militaryHours = now.getHours();
  let rawMinutes = now.getMinutes();
  let hours;
  let minutes;

  if (militaryHours > 12) {
    hours = militaryHours - 12;
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

function showData(response) {
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round((response.data.wind.speed) * 18 / 5);
  document.querySelector("#current-weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#day-time").innerHTML = displayDayTime(response.data.dt * 1000);
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
        <span>${formatHours(forecast.dt * 1000)}</span>
        <br />
        <span>${Math.round(forecast.main.temp_max)}° | ${Math.round(forecast.main.temp_min)}°</span>
        <br />
        <img class="forecast-icon" src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
              alt="weather icon"/>
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

function fetchCurrentData(position) {
  let apiKey = '55bf9ac355060024d43ce8b4b16fd6fa';
  let units = 'metric';
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showData);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
  console.log(fetchCurrentData);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(fetchCurrentData);
}

// function searchCurrentPosition(position) {
//   let latitude = position.coords.latitude;
//   let longitude = position.coords.longitude;
//   let units = `metric`;
//   let apiKey = '55bf9ac355060024d43ce8b4b16fd6fa';
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
//   axios.get(apiUrl).then(showWeather);
//   apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
//   axios.get(apiUrl).then(displayForecast);
//   console.log()
// }

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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener('submit', cityInput);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener('click', getCurrentPosition);

fetchData('New York');