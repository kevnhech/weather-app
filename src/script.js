import "./styles.css";

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
  console.log(weatherData);

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