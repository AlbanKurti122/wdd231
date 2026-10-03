const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");
const spotlightsContainer = document.querySelector("#spotlights");
const currentWeather = document.querySelector("#current-weather");
const forecastContainer = document.querySelector("#forecast");

// Add your OpenWeatherMap API key here before testing weather data.
const WEATHER_API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
const LATITUDE = 40.7058;
const LONGITUDE = 19.9522;
const levelNames = { 2: "Silver Member", 3: "Gold Member" };

menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const members = await response.json();
        const eligible = members.filter((member) => member.membershipLevel === 2 || member.membershipLevel === 3);
        eligible.sort(() => Math.random() - 0.5);
        displaySpotlights(eligible.slice(0, 3));
    } catch (error) {
        spotlightsContainer.innerHTML = "<p class='error'>Member spotlights could not be loaded.</p>";
        console.error(error);
    }
}

function displaySpotlights(members) {
    spotlightsContainer.innerHTML = members.map((member) => `
        <article class="spotlight-card">
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="150" height="95">
            <h3>${member.name}</h3>
            <p><strong>${levelNames[member.membershipLevel]}</strong></p>
            <p>${member.address}</p><p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
        </article>`).join("");
}

async function loadWeather() {
    const weatherUrl = "https://api.open-meteo.com/v1/forecast" +
        "?latitude=" + LATITUDE +
        "&longitude=" + LONGITUDE +
        "&current=temperature_2m,apparent_temperature,weather_code" +
        "&daily=temperature_2m_max,temperature_2m_min,weather_code" +
        "&forecast_days=3" +
        "&timezone=Europe%2FTirane";

    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error("Weather request failed");

        const data = await response.json();
        const current = data.current;
        const daily = data.daily;

        currentWeather.innerHTML = `
            <p class="current-temp">${Math.round(current.temperature_2m)}°C</p>
            <p>${getWeatherDescription(current.weather_code)}</p>
            <p>Feels like ${Math.round(current.apparent_temperature)}°C</p>
        `;

        forecastContainer.innerHTML = daily.time.map((date, index) => `
            <article>
                <h4>${formatForecastDate(date)}</h4>
                <p>${Math.round(daily.temperature_2m_max[index])}°C / ${Math.round(daily.temperature_2m_min[index])}°C</p>
                <p>${getWeatherDescription(daily.weather_code[index])}</p>
            </article>
        `).join("");
    } catch (error) {
        currentWeather.innerHTML = "<p>Weather data is temporarily unavailable.</p>";
        forecastContainer.innerHTML = "";
        console.error(error);
    }
}

function formatForecastDate(dateString) {
    return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
    });
}

function getWeatherDescription(code) {
    const descriptions = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Rime fog",
        51: "Light drizzle",
        53: "Drizzle",
        55: "Heavy drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        71: "Slight snow",
        73: "Moderate snow",
        75: "Heavy snow",
        80: "Rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        95: "Thunderstorm",
        96: "Thunderstorm with hail",
        99: "Thunderstorm with heavy hail"
    };

    return descriptions[code] || "Unknown weather";
}

loadSpotlights();
loadWeather();
