"use strict";

const inputName = document.querySelector("#city");
const searchBtn = document.querySelector(".search-btn");
const cityName = document.querySelector(".city-name");
const icon = document.querySelector("img");
const weather = document.querySelector(".weather-main");
const currTemp = document.querySelector(".current-temp");
const tempMax = document.querySelector(".temp-max");
const tempMin = document.querySelector(".temp-min");
const feelLike = document.querySelector(".feel-like");
const humidity = document.querySelector(".humidity");
const speed = document.querySelector(".speed");
const pressure = document.querySelector(".pressure");

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a08fd4cbe88998e0035009e3e4a5ca60&units=metric`
    );

    const data = await response.json();
    console.log(data);
    cityName.textContent = `${data.name}`;
    icon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    currTemp.textContent = `${data.main.temp.toFixed(1)}℃`;
    weather.textContent = `${data.weather[0].main}`;
    tempMax.textContent = `${data.main.temp_max.toFixed(1)}℃`;
    tempMin.textContent = `${data.main.temp_min.toFixed(1)}℃`;
    feelLike.textContent = `${data.main.feels_like.toFixed(1)}℃`;
    humidity.textContent = `${data.main.humidity}%`;
    speed.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;
    hiddenCard.classList.remove("hidden");
  } catch {
    alert("請用英文重新輸入國家或城市名稱");
  }
}

const hiddenCard = document.querySelector(".hidden");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(inputName.value);
  inputName.value = "";
});
