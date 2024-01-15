"use strict";
const currentDay = document.getElementById("currentDay");
const nextDay = document.getElementById("nextDay");
const thenDay = document.getElementById("thenDay");
const searchInput = document.getElementById("searchInput");
const find = document.getElementById("find");
const date = new Date();

//get the day/ month
const getDayName = function (dateString) {
  const date = new Date(dateString);
  const options = { weekday: "long" };

  return date.toLocaleDateString(undefined, options);
};
const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const displayData = function (location, currnet, forecast) {
  //today
  let todayData = `
<div
  class="my-card-top today p-2 d-flex justify-content-between"
>
  <span class="text-white-50">${getDayName(forecast[0].date)}</span>
  <span class="text-white-50">${date.getDate()}${
    monthsOfYear[date.getMonth()]
  }</span>
</div>
<div class="my-card-body today p-3 py-4">
  <h4 class="my-3 text-white-50 fw-lighter">${location.name}</h4>
  <div
    class="degree mb-3 d-flex align-items-center justify-content-between"
  >
    <h1>${currnet.feelslike_c}°C</h1>
    <img src="https:${currnet.condition.icon}">
  </div>
  <div class="weather-details">
    <span class="d-block mb-2 text-primary">${currnet.condition.text}</span>
    <div class="details d-flex">
      <div>
        <i class="fa fa-umbrella text-white-50"></i>
        <span>percentage</span>
      </div>
      <div class="ps-3">
        <i class="fa fa-wind text-white-50"></i>
        <span class="text-primary">${currnet.wind_kph}</span>
      </div>
      <div class="ps-3">
        <i class="fa fa-compass text-white-50"></i>
        <span>${currnet.wind_dir}</span>
      </div>
    </div>
  </div>
</div>
    `;
  //tomorrow
  let nextDayData = `
<div class="my-card-top tomorrow p-2">
    <span class="text-white-50">${getDayName(forecast[1].date)}</span>
  </div>
  <div
    class="my-card-body tomorrow p-3 py-4 d-flex flex-column justify-content-center"
  >
    <img width="40" src="https:${
      forecast[1].day.condition.icon
    }" class="mx-auto"/>
    <h3>${forecast[1].day.maxtemp_c}°C</h3>
    <h6 class="text-white-50">${forecast[1].day.mintemp_c}°C</h6>

    <span class="text-primary">${forecast[1].day.condition.text}</span>
</div>
    `;
  //after tomorrow
  let thenData = `
  <div class="my-card-top then p-2">
  <span class="text-white-50">${getDayName(forecast[2].date)}</span>
</div>
<div
  class="my-card-body then p-3 py-4 d-flex flex-column justify-content-center"
>
  <img width="40" src="https:${
    forecast[2].day.condition.icon
  }" class="mx-auto"/>
  <h3>${forecast[2].day.maxtemp_c}°C</h3>
  <h6 class="text-white-50">${forecast[2].day.mintemp_c}°C</h6>

  <span class="text-primary">${forecast[2].day.condition.text}</span>
</div>
    `;
  currentDay.innerHTML = todayData;
  nextDay.innerHTML = nextDayData;
  thenDay.innerHTML = thenData;
};

async function getForecasts() {
  //cairo
  let forecast = await (
    await fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=ecd0e20be91a47cb840211646240701&q=cairo&days=7"
    )
  ).json();
  console.log(forecast);
  displayData(
    forecast.location,
    forecast.current,
    forecast.forecast.forecastday
  );
}

//display static data of cairo
getForecasts();

//search
find.addEventListener("click", async function (e) {
  e.preventDefault();

  let searchLocation = searchInput.value.toLowerCase();
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ecd0e20be91a47cb840211646240701&q=${searchLocation}&days=7`
  );
  const finalResponse = await response.json();
  if (response.ok) {
    displayData(
      finalResponse.location,
      finalResponse.current,
      finalResponse.forecast.forecastday
    );
  }
});
