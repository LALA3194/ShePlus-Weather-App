let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = "0".concat(currentMinutes);
  }

  let formatDate = `${currentDay} ${currentHour}:${currentMinutes}`;
  return formatDate;
}
let displayDay = document.querySelector("#current-day-time");
displayDay.innerHTML = formatDate(currentTime);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let displayTemperature = document.querySelector("#temperature");
  displayTemperature.innerHTML = temperature;
}

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-form");
  let cityDisplay = document.querySelector("#city-searched");
  cityDisplay.innerHTML = `${cityInput.value}`;
  let apiKey = "25ff250e18c21d3ed78d0fa66517f0aa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let searchedCity = document.querySelector("#search-city");
searchedCity.addEventListener("submit", citySearch);

function showCurrentLocationWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let displayTemperature = document.querySelector("#temperature");
  displayTemperature.innerHTML = temperature;
  let currentCity = document.querySelector("#city-searched");
  currentCity.innerHTML = `${response.data.name}`;
}

function retrievePosition(position) {
  let apiKey = "25ff250e18c21d3ed78d0fa66517f0aa";
  let lan = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lan}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentLocationWeather);
}
navigator.geolocation.getCurrentPosition(retrievePosition);
