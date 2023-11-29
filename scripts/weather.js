document.addEventListener("DOMContentLoaded", function() {
    // OpenWeatherMap API key and endpoint
    const apiKey = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Carlsbad,us&appid=" + apiKey;

    // Fetch weather data from OpenWeather API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Update weather information on the page
            document.getElementById("temperature").innerText = "Temperature: " + data.main.temp + "°C";
            document.getElementById("condition").innerText = "Condition: " + data.weather[0].description;
            document.getElementById("humidity").innerText = "Humidity: " + data.main.humidity + "%";
        })
        .catch(error => console.error("Error fetching weather data:", error));
});