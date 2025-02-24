// public/js/script.js
document.addEventListener('DOMContentLoaded', () => {
  // Set the title
  document.getElementById('app-title').textContent = 'Weather Information';

  // Set the refresh button text
  document.getElementById('refresh-btn').textContent = 'Refresh Weather';
});

// 1. Define translation dictionaries for English and Japanese.
const translations = {
  en: {
    title: 'Weather Information',
    time: 'Time',
    humidity: 'Humidity',
    refresh: 'Refresh Data',
    clear: 'Sunny',
    cloudy: 'Cloudy',
    rain: 'Rain',
    snow: 'Snow',
    partlyCloudy: 'Partly Cloudy',
  },
  ja: {
    title: '天気情報',
    time: '時間',
    humidity: '湿度',
    refresh: 'データ更新',
    clear: '晴れ',
    cloudy: '曇り',
    rain: '雨',
    snow: '雪',
    partlyCloudy: '晴れ時々曇り',
  },
};

// 2. Detect the user's language: if it starts with "ja", use Japanese.
const userLang = navigator.language.startsWith('ja') ? 'ja' : 'en';
const texts = translations[userLang];

// 3. Set static text using the selected language.
document.getElementById('app-title').innerText = texts.title;
document.getElementById('refresh-btn').innerText = texts.refresh;

// Updated fetchWeatherData() using data/locations.json
function fetchWeatherData() {
  // 1. Fetch the JSON file containing city information.
  return fetch('./data/locations.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json();
    })
    .then((cities) => {
      // 2. For each location in the JSON, generate random weather data.
      const now = new Date().toLocaleTimeString();
      return cities.map((city) => ({
        city: city.name, // e.g., "Tokyo"
        lat: city.lat, // e.g., 35.6895
        lon: city.lon, // e.g., 139.6917
        timestamp: now,
        temperature: Math.floor(Math.random() * 15) + 15, // 15°C–29°C
        humidity: Math.floor(Math.random() * 30) + 50, // 50%–79%
        weather: randomWeather(), // Uses your existing randomWeather() function
      }));
    })
    .catch((error) => {
      // Handle errors (e.g., file not found, network issues)
      console.error('Error fetching location data:', error);
      // Return an empty array or some fallback so the rest of the code can handle it
      return [];
    });
}

// Randomly choose a weather condition (using localized strings).
function randomWeather() {
  const conditions = [
    texts.clear,
    texts.cloudy,
    texts.rain,
    texts.snow,
    texts.partlyCloudy,
  ];
  return conditions[Math.floor(Math.random() * conditions.length)];
}

// Returns an inline SVG icon based on the (English) weather condition.
function getWeatherIcon(condition) {
  let conditionKey;
  if (
    condition === translations.en.clear ||
    condition === translations.ja.clear
  ) {
    conditionKey = 'Sunny';
  } else if (
    condition === translations.en.cloudy ||
    condition === translations.ja.cloudy
  ) {
    conditionKey = 'Cloudy';
  } else if (
    condition === translations.en.rain ||
    condition === translations.ja.rain
  ) {
    conditionKey = 'Rain';
  } else if (
    condition === translations.en.snow ||
    condition === translations.ja.snow
  ) {
    conditionKey = 'Snow';
  } else if (
    condition === translations.en.partlyCloudy ||
    condition === translations.ja.partlyCloudy
  ) {
    conditionKey = 'PartlyCloudy';
  } else {
    conditionKey = '';
  }

  switch (conditionKey) {
    case 'Sunny':
      return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 text-yellow-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <g stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <!-- Vertical rays -->
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <!-- Horizontal rays -->
          <path d="M2 12h2" />
          <path d="M20 12h2" />

          <!-- Top-left diagonal (backslash slope) -->
          <path d="M5.636 5.636 l1.414 1.414" />
          <!-- Top-right diagonal (/ slope) -->
          <path d="M18.364 5.636 l-1.414 1.414" />
          <!-- Bottom-left diagonal (/ slope) -->
          <path d="M5.636 18.364 l1.414 -1.414" />
          <!-- Bottom-right diagonal (backslash slope) -->
          <path d="M16.95 16.95 l1.414 1.414" />

          <!-- Circle in the center -->
          <circle cx="12" cy="12" r="4" />
        </g>
      </svg>`;
    case 'Cloudy':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M3 15a4 4 0 014-4h1a5 5 0 015-5 5 5 0 015 5h1a4 4 0 010 8H7a4 4 0 01-4-4z" />
        </svg>`;
    case 'Rain':
      return `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <!-- Cloud -->
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="
              M3 15
              a4 4 0 0 1 4-4
              h1
              a5 5 0 0 1 9.9-.58
              3 3 0 0 1 1.1 5.58
              H4
              z
            "
          />
          
          <!-- Angled rain slashes -->
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="
              M8 17 l1 2
              M12 17 l1 2
              M16 17 l1 2
            "
          />
        </svg>`;
    case 'Snow':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <defs>
            <!-- Define one snowflake arm: a main ray with two side branches -->
            <g id="snowflake-arm">
              <!-- Main ray from the center outward -->
              <line x1="0" y1="0" x2="0" y2="-8" />
              <!-- Left branch -->
              <line x1="0" y1="-5" x2="-1.5" y2="-4" />
              <!-- Right branch -->
              <line x1="0" y1="-5" x2="1.5" y2="-4" />
            </g>
          </defs>
          <g stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <!-- Place the arms around the center (12,12) by rotating each copy -->
            <g transform="translate(12,12)">
              <use href="#snowflake-arm" transform="rotate(0)" />
              <use href="#snowflake-arm" transform="rotate(60)" />
              <use href="#snowflake-arm" transform="rotate(120)" />
              <use href="#snowflake-arm" transform="rotate(180)" />
              <use href="#snowflake-arm" transform="rotate(240)" />
              <use href="#snowflake-arm" transform="rotate(300)" />
            </g>
            <!-- Optional: a small circle at the center for added detail -->
            <circle cx="12" cy="12" r="1" fill="currentColor" />
          </g>
        </svg>`;
    case 'PartlyCloudy':
      return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 text-yellow-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <g stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <!-- Small sun on the top-left (circle + short rays) -->
          <circle cx="8" cy="8" r="3" fill="currentColor" stroke="none" />
          <path d="M8 1v2" />
          <path d="M8 13v2" />
          <path d="M1 8h2" />
          <path d="M13 8h2" />

          <!-- Cloud overlapping the bottom-right side of the sun -->
          <path
            stroke="currentColor"
            fill="none"
            d="
              M9 12
              a3 3 0 0 1 3-3
              h1
              a4 4 0 0 1 7.92-.46
              3 3 0 0 1 1.08 5.46
              H9
              z
            "
          />
        </g>
      </svg>`;
    default:
      return '';
  }
}

// Render weather data into the DOM with prominent temperature and icon display.
function renderWeather(data) {
  const container = document.getElementById('weather-container');
  container.innerHTML = ''; // Clear existing data

  data.forEach((cityData) => {
    const card = document.createElement('div');
    card.className =
      'bg-white shadow-lg rounded-lg p-6 flex flex-col items-center flex-1';

    card.innerHTML = `
      <h2 class="text-2xl font-bold mb-1">${cityData.city}</h2>
      <p class="text-sm text-gray-500 mb-4">${texts.time}: ${cityData.timestamp}</p>
      <div class="flex items-center justify-center mb-4">
        <div class="text-6xl font-extrabold">${cityData.temperature}&deg;C</div>
        <div class="ml-6">
          ${getWeatherIcon(cityData.weather)}
        </div>
      </div>
      <div class="text-2xl font-semibold text-gray-700 mb-2">${cityData.weather}</div>
      <p class="text-lg">${texts.humidity}: <span class="font-bold">${cityData.humidity}%</span></p>
    `;
    container.appendChild(card);
  });
}

// Load data and render it.
async function loadData() {
  const data = await fetchWeatherData();
  renderWeather(data);
}

// Refresh button click handler.
document.getElementById('refresh-btn').addEventListener('click', loadData);

// Load initial data on page load.
loadData();
