
// Städte mit ihren Koordinaten und Zeitzonen

const cities = {
  "New York": {
    lat: 40.7128,
    lng: -74.0060,
    timezone: "America/New_York"
  },
  Tokio: {
    lat: 35.6764,
    lng: 139.6503,
    timezone: "Asia/Tokyo"
  },
  Kapstadt: {
    lat: -33.9249,
    lng: 18.4241,
    timezone: "Africa/Johannesburg"
  },
  Zürich: {
    lat: 47.3769,
    lng: 8.5417,
    timezone: "Europe/Zurich"
  },
  Reykjavík: {
    lat: 64.1466,
    lng: -21.9426,
    timezone: "Atlantic/Reykjavik"
  },
  Dubai: {
    lat: 25.2048,
    lng: 55.2708,
    timezone: "Asia/Dubai"
  }
};

 // Html Elemente holen

const buttons = document.querySelectorAll(".city-buttons button");

const cityName = document.getElementById("city-name");
const currentTime = document.getElementById("current-time");
const sunriseTime = document.getElementById("sunrise-time");
const solarNoonTime = document.getElementById("solar-noon-time");
const sunsetTime = document.getElementById("sunset-time");

const card = document.querySelector(".city-card");
const movingSun = document.getElementById("moving-sun");
const citycontainer = document.getElementById("city-container");
const infoButton = document.querySelector(".info-button");
const sunPositionContainer = document.getElementById("sun-position-container");
const sunCity = document.getElementById("sun-city");
const sunPositionIcon = document.getElementById("sun-position-icon");
const sunTitle = document.getElementById("sun-title");

 // Auf Button klicken

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const city = button.textContent.trim();
    sunPositionContainer.style.display = "none";
    loadCityData(city);
    citycontainer.scrollIntoView({
      behavior: "smooth"
    });
  });
});

 // Auf Button - weiter Infos auf City Card klicken

infoButton.addEventListener("click", () => {

  sunPositionContainer.style.display = "block";
  sunPositionContainer.scrollIntoView({
    behavior: "smooth"
  });
});

// API abrufen

async function loadCityData(city) {
  const cityData = cities[city];

  const url = `https://api.sunrise-sunset.org/json?lat=${cityData.lat}&lng=${cityData.lng}&formatted=0`;

  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;
  cityName.textContent = city;
  updateCardStyle(cityData.timezone);
  updateSunPosition(results, cityData.timezone);
  currentTime.textContent =
    `Aktuell ist es in ${city} ${formatTime(new Date(), cityData.timezone)} Uhr`;


  sunriseTime.textContent = formatTime(results.sunrise, cityData.timezone);
  solarNoonTime.textContent = formatTime(results.solar_noon, cityData.timezone);
  sunsetTime.textContent = formatTime(results.sunset, cityData.timezone);
  citycontainer.style.display = "block";
}

function formatTime(time, timezone) {
  return new Date(time).toLocaleTimeString("de-CH", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone
  });
}

//Sonneenstand oder Monst anzeigen und Position der Sonne berechnen

function updateSunPosition(results, timezone) {
  const cityTime = new Date().toLocaleString("en-US", {
    timeZone: timezone
  });

  const cityDate = new Date(cityTime);
  const hour = cityDate.getHours();
  console.log("Stadtzeit:", cityDate);
    console.log("Stunde in Stadt:", hour);

  if (hour >= 7 && hour < 17) {
  sunPositionIcon.src = "Bilder/Sonne_dunkel.png";
  sunPositionIcon.alt = "Sonne";

  sunTitle.innerHTML = `Der aktuelle Sonnenstand in <span id="sun-city">${cityName.textContent}</span>`;
} else {
  sunPositionIcon.src = "Bilder/Mond_dunkel.png";
  sunPositionIcon.alt = "Mond";

  sunTitle.innerHTML = `Der aktuelle Mondstand in <span id="sun-city">${cityName.textContent}</span>`;
}



  // feste Position auf dem Strahl
  movingSun.style.left = "75%";
  movingSun.style.top = "-28px";
}

// Helle oder Dunkle City Card je nach Tageszeit
//   07:00–16:59 = helle Karte
//  17:00–06:59 = dunkle Karte

function updateCardStyle(timezone) {
  const cityTime = new Date().toLocaleString("en-US", {
    timeZone: timezone
  });

  const cityDate = new Date(cityTime);
  const hour = cityDate.getHours();

  console.log("Stunde in Stadt:", hour);

  if (hour >= 7 && hour < 17) {
    card.classList.remove("night-card");
    card.classList.add("day-card");
   sunriseIcon.src = "Bilder/Sonnenaufgang_dunkel.png";
  solarNoonIcon.src = "Bilder/Sonne_dunkel.png";
  sunsetIcon.src = "Bilder/Sonnenuntergang_dunkel.png";

  } else {
    card.classList.remove("day-card");
    card.classList.add("night-card");
        sunriseIcon.src = "Bilder/Sonnenaufgang_hell.png";
        solarNoonIcon.src = "Bilder/Sonne_hell.png";
        sunsetIcon.src = "Bilder/Sonnenuntergang_hell.png";
  }
}

//Bilder/ Symbole der Sonnen holen

const sunriseIcon = document.getElementById("sunrise-icon");
const solarNoonIcon = document.getElementById("solarnoon-icon");
const sunsetIcon = document.getElementById("sunset-icon");