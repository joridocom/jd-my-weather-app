// URL of your deployed Python backend service.
// Adjust the URL to match your deployment.
const backendUrl = 'https://your-backend.example.com/temperature';

// Optionally, set parameters for a specific location in Japan.
const params = new URLSearchParams({
  lat: 35.6895,   // Example: Tokyo's latitude
  lon: 139.6917   // Example: Tokyo's longitude
});

// Fetch temperature data from your backend service.
fetch(`${backendUrl}?${params.toString()}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Log the returned data for debugging
    displayTemperature(data);
  })
  .catch(error => {
    console.error('Error fetching temperature data:', error);
    document.getElementById('tempData').innerText = 'Error loading temperature data.';
  });

function displayTemperature(data) {
  const tempDiv = document.getElementById('tempData');
  // Customize the output based on the structure of data returned by get_temperature_data.
  // For example, assume data contains { temperature: 25, unit: '°C' }
  tempDiv.innerHTML = `<p>Current Temperature: ${data.temperature}${data.unit}</p>`;
}
