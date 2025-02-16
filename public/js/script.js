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
    title: "Weather Information",
    time: "Time",
    humidity: "Humidity",
    refresh: "Refresh Data",
    clear: "Clear",
    cloudy: "Cloudy",
    rain: "Rain",
    snow: "Snow"
  },
  ja: {
    title: "天気情報",
    time: "時間",
    humidity: "湿度",
    refresh: "データ更新",
    clear: "晴れ",
    cloudy: "曇り",
    rain: "雨",
    snow: "雪"
  }
};

// 2. Detect the user's language: if it starts with "ja", use Japanese.
const userLang = navigator.language.startsWith('ja') ? 'ja' : 'en';
const texts = translations[userLang];

// 3. Set static text using the selected language.
document.getElementById("app-title").innerText = texts.title;
document.getElementById("refresh-btn").innerText = texts.refresh;

// Function to simulate fetching weather data from an API.
function fetchWeatherData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date().toLocaleTimeString();
      resolve([
        {
          city: 'Tokyo',
          timestamp: now,
          temperature: Math.floor(Math.random() * 15) + 15, // 15°C to 29°C
          humidity: Math.floor(Math.random() * 30) + 50,    // 50% to 79%
          weather: randomWeather()
        },
        {
          city: 'Nasushiobara',
          timestamp: now,
          temperature: Math.floor(Math.random() * 15) + 15,
          humidity: Math.floor(Math.random() * 30) + 50,
          weather: randomWeather()
        }
      ]);
    }, 500); // Simulated network delay.
  });
}

// Randomly choose a weather condition (using localized strings).
function randomWeather() {
  const conditions = [texts.clear, texts.cloudy, texts.rain, texts.snow];
  return conditions[Math.floor(Math.random() * conditions.length)];
}

// Returns an inline SVG icon based on the (English) weather condition.
function getWeatherIcon(condition) {
  let conditionKey;
  if (condition === translations.en.clear || condition === translations.ja.clear) {
    conditionKey = 'Clear';
  } else if (condition === translations.en.cloudy || condition === translations.ja.cloudy) {
    conditionKey = 'Cloudy';
  } else if (condition === translations.en.rain || condition === translations.ja.rain) {
    conditionKey = 'Rain';
  } else if (condition === translations.en.snow || condition === translations.ja.snow) {
    conditionKey = 'Snow';
  } else {
    conditionKey = '';
  }
  
  switch (conditionKey) {
    case 'Clear':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M18.364 18.364l-1.414-1.414M6.05 6.05L4.636 7.464M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>`;
    case 'Cloudy':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M3 15a4 4 0 014-4h1a5 5 0 015-5 5 5 0 015 5h1a4 4 0 010 8H7a4 4 0 01-4-4z" />
        </svg>`;
    case 'Rain':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M4 16v-1a4 4 0 014-4h4a4 4 0 014 4v1M8 16v4M12 16v4M16 16v4" />
        </svg>`;
    case 'Snow':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M8 4V2m8 2V2m-9 16h10m-9-2h10m-9-2h10M8 22v-2m8 2v-2M6 12H4m16 0h-2M6 8l-1.5-1.5m13 0L18 8M6 16l-1.5 1.5m13-1.5L18 16" />
        </svg>`;
    default:
      return '';
  }
}

// Render weather data into the DOM with prominent temperature and icon display.
function renderWeather(data) {
  const container = document.getElementById('weather-container');
  container.innerHTML = ''; // Clear existing data

  data.forEach(cityData => {
    const card = document.createElement('div');
    card.className = 'bg-white shadow-lg rounded-lg p-6 flex flex-col items-center flex-1';

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
