

// Function to fetch weather data from OpenWeatherMap API
async function getWeatherData() {
  // Use the OpenWeatherMap API key
  const apiKey = 'a210d786daa3fb047488bb9d19cf6fb5';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Convert Kelvin to Fahrenheit
    const tempFahrenheit = (data.main.temp - 273.15) * 9/5 + 32;

    // Populate current weather details
    document.getElementById('weather-details').innerHTML = `
      <p>Temperature: ${tempFahrenheit.toFixed(0)}°F</p>
      <p>Condition: ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
    `;

    // Fetch and display forecast for 9:00 AM for the next three days
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Carlsbad&appid=${apiKey}`);
    const forecastData = await forecastResponse.json();
    const forecastDetails = document.getElementById('forecast-details');

    for (let i = 0; i < 24; i += 8) {
      // Convert Kelvin to Fahrenheit for forecast data
      const forecastTempFahrenheit = (forecastData.list[i].main.temp - 273.15) * 9/5 + 32;

      forecastDetails.innerHTML += `
        <p>${forecastData.list[i].dt_txt}: ${forecastTempFahrenheit.toFixed(0)}°F, ${forecastData.list[i].weather[0].description}</p>
      `;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

  // Function to retrieve and display local drink submission information
  function getDrinkSubmissionInfo() {
    // You can use local storage or another method to store and retrieve this information
    const drinkSubmissions = localStorage.getItem('drinkSubmissions') || 0;
    document.getElementById('drink-submission-info').textContent = `You've submitted ${drinkSubmissions} specialty drinks.`;
  }
  
  // Event listener for the menu icon
  document.querySelector('.menu-icon').addEventListener('click', () => {
    // Toggle the visibility of the navigation menu
    document.querySelector('.nav-list').classList.toggle('show');
  });
  
  // Call functions to fetch data and display information
  getWeatherData();
  getDrinkSubmissionInfo();
  // Add this function to fetch fruit data from fruit.json
  async function getFruitData() {
    try {
        const response = await fetch('./fruit.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching fruit data:', error);
    }
}
  
  // Update the function to populate the form select options
  async function populateFruitOptions() {
    const fruitData = await getFruitData();
    const selectElement = document.getElementById('fruit-selection');

    fruitData.forEach(fruit => {
        const option = document.createElement('option');
        option.value = fruit.name;
        option.textContent = fruit.name;
        selectElement.appendChild(option);
    });
}
  // Update the event listener for form submission
  document.getElementById('order-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    // Collect form data
    const formData = new FormData(event.target);
  
    // Build order object
    const order = {
      firstName: formData.get('first-name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      fruits: [
        formData.get('fruit1'),
        formData.get('fruit2'),
        formData.get('fruit3'),
      ],
      specialInstructions: formData.get('special-instructions'),
    };
  
    // Save order details in localStorage for order-confirmation page to access
    localStorage.setItem('orderDetails', JSON.stringify(order));
  
    // Navigate to order confirmation page
    window.location.href = 'order-confirmation.html';
  });
  
  // Add this function to display order details on order-confirmation.html
  function displayOrderDetails() {
    const orderDetailsContainer = document.getElementById('order-details');
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
  
    // Display order details on the page
    orderDetailsContainer.innerHTML = `
      <p><strong>Name:</strong> ${orderDetails.firstName}</p>
      <p><strong>Email:</strong> ${orderDetails.email}</p>
      <p><strong>Phone:</strong> ${orderDetails.phone}</p>
      <p><strong>Fruits:</strong> ${orderDetails.fruits.join(', ')}</p>
      <p><strong>Special Instructions:</strong> ${orderDetails.specialInstructions}</p>
    `;
  }
  
  // Populate fruit options when the page loads
  populateFruitOptions();
  
  // Update this function to display order details on order-confirmation.html
  displayOrderDetails();
  // Function to display last modified date in the footer
function displayLastModifiedDate() {
    const lastModifiedContainer = document.getElementById('last-modified');
    const lastModifiedDate = new Date(document.lastModified).toLocaleString();
    lastModifiedContainer.textContent = `Last Modified: ${lastModifiedDate}`;
  }
  
  // Call the function to display last modified date when the page loads
  displayLastModifiedDate();