const search = document.querySelector('.search');
const input = document.querySelector('.search input');
const icon = document.querySelector('.search i');
const info = document.querySelector('.info');
const weatherIcon = document.querySelector('.weather-icon');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.desc');

const apiKey = 'f39412133af70263bacfa937b826adca'
const apiUrlDirect = 'http://api.openweathermap.org/geo/1.0/direct?'
const apiUrlWeather = 'http://api.openweathermap.org/data/2.5/weather?'

var lat = 0;
var lon = 0;


function getWeather(city) 
{
    fetch(apiUrlDirect + 'q=' + city + '&appid=' + apiKey)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            lat = data[0].lat;
            lon = data[0].lon;
            console.log(lat, lon);
        })
        .then(() => {
            fetch(apiUrlWeather + 'lat=' + lat + '&lon=' + lon + '&units=' + 'metric' + '&appid=' + apiKey)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    fillInfo(data);                          
                })
        })
}

function fillInfo(data) 
{
    const iconURL = "http://openweathermap.org/img/wn/";
    weatherIcon.src = iconURL + data.weather[0].icon + "@2x.png";
    roundTemp = Math.round(data.main.temp);
    temp.innerHTML = roundTemp + "°C";
    desc.innerHTML = convertToUpperCase(data.weather[0].description);
    info.style.display = "flex";
}

function convertToUpperCase(str)
{
    const Words = str.split(" ");
    for (let i = 0; i < Words.length; i++) {
        Words[i] = Words[i][0].toUpperCase() + Words[i].substr(1);
    }
    return Words.join(" ");
}

icon.addEventListener('click', () => {
    getWeather(input.value);
})
