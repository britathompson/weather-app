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
        <span><span class="forecast-temp-high">${Math.round(forecast.main.temp_max)}</span>° | <span class="forecast-temp-low">${Math.round(forecast.main.temp_min)}</span>°</span>
        <br />
        <img class="forecast-icon" src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
              alt="weather icon"/>
      </div>`;
  }
}

function ifError() {
  alert(`Cannot find city. Please check spelling and try again.`);
}

function fetchData(city) {
  let apiKey = '55bf9ac355060024d43ce8b4b16fd6fa';
  let units = 'metric';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showData);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast).catch(ifError);
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
}

function getCurrentPosition(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  navigator.geolocation.getCurrentPosition(fetchCurrentData);

}

function toCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = celsiusTemperature;

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");

  let forecastTempHigh = document.querySelectorAll(".forecast-temp-high");
  forecastTempHigh.forEach(function (item) {
    let currentTempHigh = item.innerHTML;
    let newTempHigh = `${Math.round(((currentTempHigh - 32) * 5) / 9)}`;
    item.innerHTML = newTempHigh;
  });

  let forecastTempLow = document.querySelectorAll(".forecast-temp-low");
  forecastTempLow.forEach(function (item) {
    let currentTempLow = item.innerHTML;
    let newTempLow = `${Math.round(((currentTempLow - 32) * 5) / 9)}`;
    item.innerHTML = newTempLow;
  });

  celsius.removeEventListener('click', toCelsius);
  fahrenheit.addEventListener('click', toFahrenheit);
}


function toFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let changeToFahrenheit = (celsiusTemperature * (9 / 5)) + 32;
  temperature.innerHTML = Math.round(changeToFahrenheit);

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");

  let forecastTempHigh = document.querySelectorAll(".forecast-temp-high");
  forecastTempHigh.forEach(function (item) {
    let currentTempHigh = item.innerHTML;
    let newTempHigh = `${Math.round((currentTempHigh * (9 / 5)) + 32)}`;
    item.innerHTML = newTempHigh;
  });
  
  let forecastTempLow = document.querySelectorAll(".forecast-temp-low");
  forecastTempLow.forEach(function (item) {
    let currentTempLow = item.innerHTML;
    let newTempLow = `${Math.round((currentTempLow * (9 / 5) + 32))}`;
    item.innerHTML = newTempLow;
  });

  celsius.addEventListener('click', toCelsius);
  fahrenheit.removeEventListener('click', toFahrenheit);
}

let celsiusTemperature = null;
// let currentTempHigh = null;
// let currentTempLow = null;

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener('click', toFahrenheit);

let celsius = document.querySelector("#celsius-link")
celsius.addEventListener('click', toCelsius);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener('submit', cityInput);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener('click', getCurrentPosition);

fetchData('New York');