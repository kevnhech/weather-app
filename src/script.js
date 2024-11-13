import "./styles.css";

async function getWeather(location) {
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=M946UUHWEQHTTPVLK3GCKTAQ8`, {mode: "cors"});
  const weatherData = await response.json();

  const obj = {
    address: weatherData.resolvedAddress.split(",")[0],
    temperature: weatherData.currentConditions.feelslike,
    description: weatherData.currentConditions.conditions,
  };

  const body = document.querySelector("body");

  const weatherInfo = document.createElement("div");
  weatherInfo.setAttribute("class", "weather-info");

  const address = document.createElement("p");
  const temperature = document.createElement("p");
  const description = document.createElement("p");

  address.textContent = obj.address;
  temperature.textContent = `${obj.temperature} F°`;
  description.textContent = obj.description;

  weatherInfo.appendChild(address);
  weatherInfo.appendChild(temperature);
  weatherInfo.appendChild(description);

  body.appendChild(weatherInfo);
}

getWeather("Las Vegas");

const cityInput = document.querySelector("#city");
const button = document.querySelector("button");

button.addEventListener("click", function (e) {
  // remove the div from the body first, then append a new div
  e.preventDefault();
  const weatherInfo = document.querySelector(".weather-info");
  weatherInfo.remove();
  getWeather(cityInput.value);
  cityInput.value = "";
});