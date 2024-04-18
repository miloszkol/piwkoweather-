const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const searchInput = document.querySelector('.search');
const searchButton = document.querySelector('.search-button');
const apiKey = "b2cbe267c4846b4053f2c825d9173374";
const base = "https://api.openweathermap.org/data/2.5/";
const locationEl = document.querySelector('.location');
const currentWeatherEl = document.querySelector('.current-weather-location');
const tempEl = document.querySelector('.temp');
const forecastEl = document.querySelector('.forecast');
const descEl = document.querySelector('.description');
const selectPlEl = document.querySelector('.select-pl');
const selectEnEl = document.querySelector('.select-en');
const searchPlEl = document.querySelector('.search-pl');
const searchEnEl = document.querySelector('.search-en');
const forecastText = document.querySelector('.forecast-text');

let currentLang = 0;
selectPlEl.addEventListener('click', function langPl() {
    if (currentLang === 0){
        return;
    }
    else if (currentLang === 1){
        currentLang = 0;
        if (locationEl.innerHTML === "<i class='fas fa-location-arrow'></i> Nie podano lokalizacji!)"){
            return;
        }
        else{
            currentLang = 0
            if (searchValue !==''){
                fetchWeather();
                getCurrentWeather();
                getForecast();
            }
        };
    };
        locationEl.style.color = 'white'
        currentWeatherEl.textContent = 'Pogoda dla: brak lokalizacji';
        searchEnEl.textContent = '';
        tempEl.innerHTML = `-`;
        descEl.innerHTML = ``;
        locationEl.innerHTML = `<i class='fas fa-location-arrow'></i> Nie podano lokalizacji!`;
        forecastText.textContent = 'Prognoza na następne dni';
        searchInput.placeholder = 'Wprowadź lokalizację';
        document.title = 'Sigma Weather - pogoda dla prawdziwych sigm';
        forecastEl.innerHTML = `
        <div class="empty-forecast"><p>-</p></div>
        <div class="empty-forecast"><p>-</p></div>
        <div class="empty-forecast"><p>-</p></div>
        <div class="empty-forecast"><p>-</p></div>`;
});
selectEnEl.addEventListener('click', function langEn() {
    if (currentLang === 1){
        return;
    }
    else if (currentLang === 0){
        currentLang = 1;
        if (locationEl.innerHTML === "<i class='fas fa-location-arrow'></i> No location given!"){
            return;
        }
        else{
            currentLang = 1;
            if (searchValue !==''){
                fetchWeather();
                getCurrentWeather();
                getForecast();
            }
        };
        locationEl.style.color = 'white'
        searchPlEl.textContent = '';
        searchEnEl.textContent = 'Weather for: no location';
        tempEl.innerHTML = `-`;
        descEl.innerHTML = ``;
        locationEl.innerHTML = `<i class='fas fa-location-arrow'></i> No location given!`};
        forecastText.textContent = 'Forecast for the upcoming days';
        searchInput.placeholder = 'Enter location';
        document.title = 'Sigma Weather - weather for real sigmas';
        forecastEl.innerHTML = `
        <div class="empty-forecast"><p>-</p></div>
        <div class="empty-forecast"><p>-</p></div>
        <div class="empty-forecast"><p>-</p></div>
        <div class="empty-forecast"><p>-</p></div>`;
});

const days = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
const daysEng = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
const monthsEng = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();

    if (currentLang === 0) {
        timeEl.innerHTML = (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes);
        dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];
    } else if (currentLang === 1) {
        timeEl.innerHTML = (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes);
        dateEl.innerHTML = daysEng[day] + ', ' + date + ' ' + monthsEng[month];
    }
}, 100);

let searchValue = '';
let url = '';
let forecastUrl = '';

function fetchWeather() {
    const searchInput = document.querySelector('.search');
    searchValue = searchInput.value.trim();
    console.log(searchValue);
    url = base+'weather?q='+searchValue+'&appid='+apiKey+'&units=metric&lang=pl';
    urlEn = base+'weather?q='+searchValue+'&appid='+apiKey+'&units=metric&lang=en';
    forecastUrl = base+'forecast?q='+searchValue+'&appid='+apiKey+'&units=metric&lang=pl';
    forecastUrlEn = base+'forecast?q='+searchValue+'&appid='+apiKey+'&units=metric&lang=en';
    console.log(url);
};

searchButton.addEventListener('click', () =>
{
    fetchWeather();
});
searchInput.addEventListener('keypress', (event) =>
{
    if (event.key === "Enter") 
    {
        fetchWeather();
    }
});

function getCurrentWeather() {
    if (currentLang === 0) {
        fetch(url).then(res => res.json()).then(data =>{
            if (searchValue === ''){
                locationEl.innerHTML = `<i class='fas fa-location-arrow'></i> Wprowadź lokalizację!`;
                locationEl.style.color = '#ee6b6e';
                tempEl.textContent = '-';
                descEl.textContent = '';
                forecastEl.innerHTML = `
                <div class="empty-forecast"><p>-</p></div>
                <div class="empty-forecast"><p>-</p></div>
                <div class="empty-forecast"><p>-</p></div>
                <div class="empty-forecast"><p>-</p></div>`;
                currentWeatherEl.textContent = 'Pogoda dla: brak lokalizacji';
            }
            else if (data.cod = 404){
                locationEl.innerHTML = `<i class='fas fa-location-arrow'></i> Nie znaleziono lokalizacji!`;
                locationEl.style.color = '#ee6b6e';
                tempEl.textContent = '-';
                descEl.textContent = '';
                currentWeatherEl.textContent = 'Pogoda dla: brak lokalizacji';
                forecastEl.innerHTML = `
                <div class="empty-forecast"><p>-</p></div>
                <div class="empty-forecast"><p>-</p></div>
                <div class="empty-forecast"><p>-</p></div>
                <div class="empty-forecast"><p>-</p></div>`;
            }
            console.log(data);
            searchEnEl.textContent = ''
            const comma = ', ';
            let icon = data.weather['0'].icon;
            let temperature = data.main.temp;
            let desc = data.weather['0'].description;
            locationEl.innerHTML = `<i class='fas fa-location-arrow'></i> ${data.name}${comma}${data.sys.country}`;
            locationEl.style.color = 'white'
            currentWeatherEl.innerHTML = `Pogoda dla: ${data.name}${comma}${data.sys.country}<img class="weather-img" src="https://openweathermap.org/img/wn/${icon}@4x.png">`;
            tempEl.innerHTML = `${Math.round(temperature)} °C`;
            descEl.innerHTML = `${desc}`;
        });
    } else if (currentLang === 1) {
        fetch(urlEn).then(res => res.json()).then(data =>{
            if (searchValue === ''){
                locationEl.innerHTML = `<i class='fas fa-location-arrow'></i> Enter location!`;
                locationEl.style.color = '#ee6b6e';
                tempEl.textContent = '-';
                descEl.textContent = '';
                forecastEl.innerHTML = `
                <div class="empty-forecast"><p>-</p></div>
                <div class="empty-forecast"><p>-</p></div>
                <div class="empty-forecast"><p>-</p></div>
                <div class="empty-forecast"><p>-</p></div>`;
                currentWeatherEl.textContent = 'Weather for: no location';
            }
            else if (data.cod = 404){
                locationEl.innerHTML = `<i class='fas fa-location-arrow'></i> Location not found!`;
                locationEl.style.color = '#ee6b6e';
                tempEl.textContent = '-';
                descEl.textContent = '';
                currentWeatherEl.textContent = 'Weather for: no location';
                forecastEl.innerHTML = `
                <div class="empty-forecast"><p>-</p></div>
                <div class="empty-forecast"><p>-</p></div>
                <div class="empty-forecast"><p>-</p></div>
                <div class="empty-forecast"><p>-</p></div>`;
            }
            console.log(data);
            searchEnEl.textContent = ''
            const comma = ', ';
            let icon = data.weather['0'].icon;
            let temperature = data.main.temp;
            let desc = data.weather['0'].description;
            locationEl.innerHTML = `<i class='fas fa-location-arrow'></i> ${data.name}${comma}${data.sys.country}`;
            locationEl.style.color = 'white'
            currentWeatherEl.innerHTML = `Weather for: ${data.name}${comma}${data.sys.country}<img class="weather-img" src="https://openweathermap.org/img/wn/${icon}@4x.png">`;
            tempEl.innerHTML = `${Math.round(temperature)} °C`;
            descEl.innerHTML = `${desc}`;
        });
    };
};

searchButton.addEventListener('click', () =>
{
    getCurrentWeather();
});
searchInput.addEventListener('keypress', (event) =>
{
    if (event.key === "Enter") 
    {
        getCurrentWeather();
    }
});

function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    return formattedDate;
};

function getForecast() {
    if (currentLang === 0) {
        fetch(forecastUrl).then(resForecast => resForecast.json()).then(data =>{
            let forecastFirst = data.list['8'];
            let forecastSecond = data.list['16'];
            let forecastThird = data.list['24'];
            let forecastFourth = data.list['32'];
            let dateFirst = formatDate(forecastFirst.dt_txt);
            let dateSecond = formatDate(forecastSecond.dt_txt);
            let dateThird = formatDate(forecastThird.dt_txt);
            let dateFourth = formatDate(forecastFourth.dt_txt);
            let iconFirst = forecastFirst.weather['0'].icon;
            let iconSecond = forecastSecond.weather['0'].icon;
            let iconThird = forecastThird.weather['0'].icon;
            let iconFourth = forecastFourth.weather['0'].icon;
            let tempFirst = Math.round(forecastFirst.main.temp);
            let tempSecond = Math.round(forecastSecond.main.temp);
            let tempThird = Math.round(forecastThird.main.temp);
            let tempFourth = Math.round(forecastFourth.main.temp);
            let descFirst = forecastFirst.weather['0'].description;
            let descSecond = forecastSecond.weather['0'].description;
            let descThird = forecastThird.weather['0'].description;
            let descFourth = forecastFourth.weather['0'].description;
            console.log(data);
            console.log(forecastFirst);
            console.log(forecastSecond);
            console.log(forecastThird);
            console.log(forecastFourth);
            console.log(dateFirst);
            console.log(dateSecond);
            console.log(dateThird);
            console.log(dateFourth);
            forecastEl.innerHTML = `            
            <div class="forecast1">
                <p>${dateFirst}</p>
                <img class="weather-img" src="https://openweathermap.org/img/wn/${iconFirst}@2x.png">
                <p class="forecast-temp">${tempFirst} °C</p>
                <p class="forecast-description">${descFirst}</p>
            </div>
            <div class="forecast2">
                <p>${dateSecond}</p>
                <img class="weather-img" src="https://openweathermap.org/img/wn/${iconSecond}@2x.png">
                <p class="forecast-temp">${tempSecond} °C</p>
                <p class="forecast-description">${descSecond}</p>
            </div>
            <div class="forecast3">
                <p>${dateThird}</p>
                <img class="weather-img" src="https://openweathermap.org/img/wn/${iconThird}@2x.png">
                <p class="forecast-temp">${tempThird} °C</p>
                <p class="forecast-description">${descThird}</p>
            </div>
            <div class="forecast4">
                <p>${dateFourth}</p>
                <img class="weather-img" src="https://openweathermap.org/img/wn/${iconFourth}@2x.png">
                <p class="forecast-temp">${tempFourth} °C</p>
                <p class="forecast-description">${descFourth}</p>
            </div>`;
        });
    }
    else if (currentLang === 1) {
        fetch(forecastUrlEn).then(resForecast => resForecast.json()).then(data =>{
            let forecastFirst = data.list['8'];
            let forecastSecond = data.list['16'];
            let forecastThird = data.list['24'];
            let forecastFourth = data.list['32'];
            let dateFirst = formatDate(forecastFirst.dt_txt);
            let dateSecond = formatDate(forecastSecond.dt_txt);
            let dateThird = formatDate(forecastThird.dt_txt);
            let dateFourth = formatDate(forecastFourth.dt_txt);
            let iconFirst = forecastFirst.weather['0'].icon;
            let iconSecond = forecastSecond.weather['0'].icon;
            let iconThird = forecastThird.weather['0'].icon;
            let iconFourth = forecastFourth.weather['0'].icon;
            let tempFirst = Math.round(forecastFirst.main.temp);
            let tempSecond = Math.round(forecastSecond.main.temp);
            let tempThird = Math.round(forecastThird.main.temp);
            let tempFourth = Math.round(forecastFourth.main.temp);
            let descFirst = forecastFirst.weather['0'].description;
            let descSecond = forecastSecond.weather['0'].description;
            let descThird = forecastThird.weather['0'].description;
            let descFourth = forecastFourth.weather['0'].description;
            console.log(data);
            console.log(forecastFirst);
            console.log(forecastSecond);
            console.log(forecastThird);
            console.log(forecastFourth);
            console.log(dateFirst);
            console.log(dateSecond);
            console.log(dateThird);
            console.log(dateFourth);
            forecastEl.innerHTML = `            
            <div class="forecast1">
                <p>${dateFirst}</p>
                <img class="weather-img" src="https://openweathermap.org/img/wn/${iconFirst}@2x.png">
                <p class="forecast-temp">${tempFirst} °C</p>
                <p class="forecast-description">${descFirst}</p>
            </div>
            <div class="forecast2">
                <p>${dateSecond}</p>
                <img class="weather-img" src="https://openweathermap.org/img/wn/${iconSecond}@2x.png">
                <p class="forecast-temp">${tempSecond} °C</p>
                <p class="forecast-description">${descSecond}</p>
            </div>
            <div class="forecast3">
                <p>${dateThird}</p>
                <img class="weather-img" src="https://openweathermap.org/img/wn/${iconThird}@2x.png">
                <p class="forecast-temp">${tempThird} °C</p>
                <p class="forecast-description">${descThird}</p>
            </div>
            <div class="forecast4">
                <p>${dateFourth}</p>
                <img class="weather-img" src="https://openweathermap.org/img/wn/${iconFourth}@2x.png">
                <p class="forecast-temp">${tempFourth} °C</p>
                <p class="forecast-description">${descFourth}</p>
            </div>`;
        });
    };
};

searchButton.addEventListener('click', () =>
{
    getForecast();
});
searchInput.addEventListener('keypress', (event) =>
{
    if (event.key === "Enter") 
    {
        getForecast();
    }
});
