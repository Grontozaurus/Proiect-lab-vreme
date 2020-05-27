const api = {
    key: "5c09bd182a5cd41076750a14670bf37f",
    base: "https://api.openweathermap.org/data/2.5/",
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);


function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);

    }
}

function getResults (query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
        
    }).then(displayResults);
}

function displayResults (weather){
    console.log(weather);
    let city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&#176C</span>`;

    let humidity = document.querySelector('.humidity')
    humidity.innerHTML = `${Math.round(weather.main.humidity)}<span> % humidity</span>`;
    
    let wind = document.querySelector('.wind')
    wind.innerHTML = `${Math.round(weather.wind.speed)}<span> km/h</span>`;

    let weather_el = document.querySelector('.weather');
    weather_el.innerText = weather.weather[0].main;

}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", " Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}