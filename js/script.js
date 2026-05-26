
const cities = {
  "New York": {
    lat: 40.7128,
    lng: -74.0060
  },

  Tokio: {
    lat: 35.6764,
    lng: 139.6503
  },

  Kapstadt: {
    lat: -33.9249,
    lng: 18.4241
  },

  Zürich: {
    lat: 47.3769,
    lng: 8.5417
  },

  Reykjavík: {
    lat: 64.1466,
    lng: -21.9426
  },

  Dubai: {
    lat: 25.2048,
    lng: 55.2708
  }
};

const buttons = document.querySelectorAll(".city-buttons button");

const cityName = document.getElementById("city-name");
const currentTime = document.getElementById("current-time");
const sunriseTime = document.getElementById("sunrise-time");
const solarNoonTime = document.getElementById("solar-noon-time");
const sunsetTime = document.getElementById("sunset-time");
const card = document.querySelector(".city-card");
const movingSun = document.getElementById("moving-sun");


buttons.forEach(button => {

  button.addEventListener("click", () => {
    const city = button.textContent;
    console.log(city);

  });

});