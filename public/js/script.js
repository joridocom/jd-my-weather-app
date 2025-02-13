const weatherData = [
  {
    city: 'Tokyo',
    tempElement: 'tokyo-temp',
    descElement: 'tokyo-desc',
    dayElement: 'tokyo-day',
    nightElement: 'tokyo-night',
    timeElement: 'tokyo-time',
    advisoryElement: 'tokyo-advisory'
  },
  {
    city: 'Nasushiobara',
    tempElement: 'nasu-temp',
    descElement: 'nasu-desc',
    dayElement: 'nasu-day',
    nightElement: 'nasu-night',
    timeElement: 'nasu-time',
    advisoryElement: 'nasu-advisory'
  }
];

function fetchWeather(cityData) {
  // Simulated fetch request (replace with actual API call)
  setTimeout(() => {
    // Simulated response
    const response = {
      temperature: Math.floor(Math.random() * 10) + 25, // Random temperature
      description: 'Partly Cloudy',
      dayTemp: Math.floor(Math.random() * 10) + 30,
      nightTemp: Math.floor(Math.random() * 10) + 20,
      advisory: Math.random() > 0.5 ? 'Dense Fog Advisory' : ''
    };

    // Update the DOM
    document.getElementById(cityData.tempElement).textContent = response.temperature;
    document.getElementById(cityData.descElement).textContent = response.description;
    document.getElementById(cityData.dayElement).textContent = response.dayTemp;
    document.getElementById(cityData.nightElement).textContent = response.nightTemp;
    document.getElementById(cityData.timeElement).textContent = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo' });

    const advisoryElement = document.getElementById(cityData.advisoryElement);
    if (response.advisory) {
      advisoryElement.textContent = response.advisory;
      advisoryElement.classList.remove('hidden');
    } else {
      advisoryElement.classList.add('hidden');
    }
  }, 1000);
}

// Fetch weather for both locations
weatherData.forEach(cityData => fetchWeather(cityData));
