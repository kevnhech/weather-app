import "./styles.css";
import clearDay from "./images/clear-day.jpg";
import clearNight from "./images/clear-night.jpg";
import cloudy from "./images/cloudy.jpg";
import fog from "./images/fog.jpg";
import partlyCloudyDay from "./images/partly-cloudy-day.jpg";
import partlyCloudyNight from "./images/partly-cloudy-night.jpg";
import rain from "./images/rain.jpg";
import snow from "./images/snow.jpg";
import wind from "./images/wind.jpg";

async function getWeather(location) {
  const toggle = document.querySelector(".toggle");
  let unit;

  if (toggle.value == "f") {
    unit = "unitGroup=us";
  } else {
    unit = "unitGroup=uk";
  }
  
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?${unit}&key=M946UUHWEQHTTPVLK3GCKTAQ8`, {mode: "cors"});
  const weatherData = await response.json();

  function setBackgroundImage() {
    const image = document.createElement("img");
    if (weatherData.currentConditions.icon == "clear-day") {
      image.src = clearDay;
    } else if (weatherData.currentConditions.icon == "clear-night") {
      image.src = clearNight;
    } else if (weatherData.currentConditions.icon == "cloudy") {
      image.src = cloudy;
    } else if (weatherData.currentConditions.icon == "fog") {
      image.src = fog;
    } else if (weatherData.currentConditions.icon == "partly-cloudy-day") {
      image.src = partlyCloudyDay;
    } else if (weatherData.currentConditions.icon == "partly-cloudy-night") {
      image.src = partlyCloudyNight;
    } else if (weatherData.currentConditions.icon == "rain") {
      image.src = rain;
    } else if (weatherData.currentConditions.icon = "snow") {
      image.src = snow;
    } else if (weatherData.currentConditions.icon == "wind") {
      image.src = wind;
    }
    body.style.backgroundImage = `url(${image.src})`;
  }
  console.log(weatherData.currentConditions.icon);
  const obj = {
    address: weatherData.resolvedAddress.split(",")[0],
    temperature: weatherData.currentConditions.feelslike,
    description: weatherData.currentConditions.conditions,
  };

  // Display weather information on page

  const body = document.querySelector("body");
  const weatherInfo = document.createElement("div");
  weatherInfo.setAttribute("class", "weather-info");
  const address = document.createElement("p");
  const temperature = document.createElement("p");
  const description = document.createElement("p");

  address.textContent = obj.address;

  if (toggle.value == "f") {
    temperature.textContent = `${obj.temperature} F°`;
  } else {
    temperature.textContent = `${obj.temperature} C°`;
  }

  description.textContent = obj.description;

  weatherInfo.appendChild(address);
  weatherInfo.appendChild(temperature);
  weatherInfo.appendChild(description);

  body.appendChild(weatherInfo);
  setBackgroundImage();
}

getWeather("Las Vegas");

const cityInput = document.querySelector("#city");
const toggle = document.querySelector(".toggle");
const submit = document.querySelector(".submit");

toggle.addEventListener("click", function (e) {
  e.preventDefault();
  if (toggle.textContent == "F°") {
    toggle.textContent = "C°"
    toggle.value = "c";
  } else {
    toggle.textContent = "F°";
    toggle.value = "f";
  }
});

submit.addEventListener("click", function (e) {
  e.preventDefault();
  const weatherInfo = document.querySelector(".weather-info");
  weatherInfo.remove();
  getWeather(cityInput.value);
  cityInput.value = "";
});

// fahrenheit = "unitGroup=us&"
// celsius = "unitGroup=uk&"