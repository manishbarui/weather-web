document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('searchCity').value;
    getWeather(city);
});

function getWeather(city) {
    const apiKey = '6ae5fe72c30bb6c5aa2fa468ebdff6aa';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const location = `${data.name}, ${data.sys.country}`;
            const temp = `${Math.round(data.main.temp)}°C`;
            const feelsLike = `Feels like ${Math.round(data.main.feels_like)}°C`;
            const weatherCondition = `${data.weather[0].description}.`;
            const wind = `${data.wind.speed}m/s ${getDirection(data.wind.deg)}`;
            const pressure = `${data.main.pressure}hPa`;
            const humidity = `${data.main.humidity}%`;
            const dewPoint = `${Math.round(data.main.temp - ((100 - data.main.humidity) / 5))}°C`;
            const visibility = `${data.visibility / 1000}km`;

            document.getElementById('location').textContent = location;
            document.getElementById('weather-condition').textContent = `${feelsLike} ${weatherCondition}`;
            document.querySelector('.temp').textContent = temp;
            document.getElementById('wind').textContent = wind;
            document.getElementById('pressure').textContent = pressure;
            document.getElementById('humidity').textContent = humidity;
            document.getElementById('dewPoint').textContent = dewPoint;
            document.getElementById('visibility').textContent = visibility;
        })
        .catch(err => alert('City not found.'));
}

function getDirection(deg) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const value = Math.floor((deg / 45) + 0.5);
    return directions[value % 8];
}