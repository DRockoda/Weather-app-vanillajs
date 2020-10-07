// key = 883f601bde079378c66873c5e2cabc60
// api = api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

const weatherApi = {
    key: "883f601bde079378c66873c5e2cabc60",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather?"
}

const searchInputBox = document.getElementById('input-box');

searchInputBox.addEventListener('keypress',(event) => {

    if (event.keyCode === 13){
        getWeatherReport(searchInputBox.value)
    }
});

function getWeatherReport(city){

    fetch(`${weatherApi.baseUrl}q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather =>{
        return weather.json();
    }).then(showWeatherReport)
    .catch(error => alert('try again'));
}


function showWeatherReport(weather){
    
    let city = document.getElementById('city');
    city.textContent = `${weather.name},${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML=`${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);


    if(weatherType.textContent == 'Clear'){
        document.body.style.backgroundImage = "url(img/Clear.jpg)";
        document.getElementById("icon").className = "fas fa-sun";
    }
    else if(weatherType.textContent == 'Clouds'){
        document.body.style.backgroundImage = "url(img/Clouds.jpg)";
        document.getElementById("icon").className = "fas fa-cloud-sun";
    }
    else if(weatherType.textContent == 'Rain'){
        document.body.style.backgroundImage = "url(img/Rain.jpg)";
        document.getElementById("icon").className = "fas fa-cloud-showers-heavy";
    }
    else if(weatherType.textContent == 'Snow'){
        document.body.style.backgroundImage = "url(img/Snow.jpg)";
        document.getElementById("icon").className = "fas fa-snowflake";
    }
    else if(weatherType.textContent == 'Thunderstorm'){
        document.body.style.backgroundImage = "url(img/Thunderstorm.jpg)";
        document.getElementById("icon").className = "fas fa-bolt";
    }
    else if(weatherType.textContent == 'Haze'){
        document.body.style.backgroundImage = "url(img/Haze.jpg)";
        document.getElementById("icon").className = "	fas fa-smog";
    }
    else if(weatherType.textContent == 'Mist'){
        document.body.style.backgroundImage = "url(img/Mist.jpg)";
        document.getElementById("icon").className = "	fas fa-smog";
    }
    else {
        document.body.style.backgroundImage = "url(img/Other.jpg)";
        document.getElementById("icon").className = "fas fa-temperature-high";
    }

}

function dateManage(x){

    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let year = x.getFullYear();
    let month = months[x.getMonth()];
    let date = x.getDate();
    let day = days[x.getDay()];
    return `${date} ${month} (${day}), ${year}`;
}

$(document).ready(function(){

    $('html').ripples({
        dropRadius: 30,
        perturbance: 0.1
      });

});