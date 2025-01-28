    const API_KEY = '9d939dc3315f3a5317a68d757f650d71';
    const CITY = 'Kyiv';

    async function fetchWeather() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        document.querySelector('.current-weather h2').textContent = data.name;
        document.querySelector('.current-weather .temperature').textContent = `${Math.round(data.main.temp)}°C`;
        document.querySelector('.current-weather p').textContent = data.weather[0].description;
    }

    async function fetchForecast() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        const forecastContainer = document.querySelector('.forecast-cards');
        forecastContainer.innerHTML = '';

        const dailyForecasts = data.list.filter((_, index) => index % 8 === 0).slice(0, 3);
        dailyForecasts.forEach(forecast => {
            const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
            const temp = `${Math.round(forecast.main.temp)}°C`;
            const description = forecast.weather[0].description;

            const card = document.createElement('div');
            card.className = 'forecast-card';
            card.innerHTML = `
                <h4>${date}</h4>
                <div class="temp">${temp}</div>
                <p>${description}</p>
            `;
            forecastContainer.appendChild(card);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        fetchWeather();
        fetchForecast();
    });