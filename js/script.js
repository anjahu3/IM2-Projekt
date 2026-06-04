
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
const sunSvgImage = document.getElementById("sun-svg-image");
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

// Sonnenstand oder Mondstand anzeigen

function updateSunPosition(results, timezone) {
  const cityTime = new Date().toLocaleString("en-US", {
    timeZone: timezone
  });

  const cityDate = new Date(cityTime);
  const hour = cityDate.getHours();
  const minutes = cityDate.getMinutes();

  const currentHour = hour + minutes / 60;

  // 00:00 = 0%, 06:00 = 25%, 12:00 = 50%, 18:00 = 75%
  const percent = currentHour / 24; // 0..1

  // Try to position the sun using the actual SVG path so it always follows the curve
  const svg = document.querySelector('.curve-svg');
  const path = svg && svg.querySelector('path');

  if (svg && path && typeof path.getTotalLength === 'function' && sunSvgImage) {
    const total = path.getTotalLength();
    const point = path.getPointAtLength(total * percent);

    // Place the SVG image using SVG coordinates (viewBox units match path coords)
    const imgW = 80; // Fixed width in SVG units
    const imgH = 80; // Fixed height in SVG units

    sunSvgImage.setAttribute('x', point.x - imgW / 2);
    sunSvgImage.setAttribute('y', point.y - imgH / 2);
  } else if (svg && path && movingSun) {
    // Fallback: map SVG to container pixels and position the HTML element
    const total = path.getTotalLength();
    const point = path.getPointAtLength(total * percent);

    const svgRect = svg.getBoundingClientRect();
    const parent = document.querySelector('.sun-curve');
    const parentRect = parent.getBoundingClientRect();

    const viewBox = svg.viewBox.baseVal;
    const vbX = viewBox.x || 0;
    const vbY = viewBox.y || 0;
    const vbW = viewBox.width || svgRect.width;
    const vbH = viewBox.height || svgRect.height;

    const scaleX = svgRect.width / vbW;
    const scaleY = svgRect.height / vbH;

    const leftPx = (point.x - vbX) * scaleX + svgRect.left - parentRect.left;
    const topPx = (point.y - vbY) * scaleY + svgRect.top - parentRect.top;

    const sunEl = movingSun;
    const sunW = sunEl.offsetWidth || 55;
    const sunH = sunEl.offsetHeight || 55;

    sunEl.style.left = `${leftPx - sunW / 2}px`;
    sunEl.style.top = `${topPx - sunH / 2}px`;
  } else {
    // Last-resort fallback: simple sine curve using percentages
    if (movingSun) {
      const curveHeight = Math.sin(percent * Math.PI) * 160;
      movingSun.style.left = `${percent * 100}%`;
      movingSun.style.top = `${220 - curveHeight}px`;
    }
  }

  if (hour >= 6 && hour < 18) {
    if (sunSvgImage) {
      sunSvgImage.setAttribute('href', 'Bilder/Sonne_dunkel.png');
      sunSvgImage.setAttribute('aria-label', 'Sonne');
    } else if (sunPositionIcon) {
      sunPositionIcon.src = "Bilder/Sonne_dunkel.png";
      sunPositionIcon.alt = "Sonne";
    }

    sunTitle.innerHTML =
      `Der aktuelle Sonnenstand in <span id="sun-city">${cityName.textContent}</span>`;
  } else {
    if (sunSvgImage) {
      sunSvgImage.setAttribute('href', 'Bilder/Mond_dunkel_2.png');
      sunSvgImage.setAttribute('aria-label', 'Mond');
    } else if (sunPositionIcon) {
      sunPositionIcon.src = "Bilder/Mond_dunkel_2.png";
      sunPositionIcon.alt = "Mond";
    }

    sunTitle.innerHTML =
      `Der aktuelle Mondstand in <span id="sun-city">${cityName.textContent}</span>`;
  }
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