const cityNameEl = document.querySelector("#city-name")
const todayTempEl = document.querySelector("#today-temp")
const todayHumidEl = document.querySelector("#today-humid")
const todayWindEl = document.querySelector("#today-wind")
const todayUvEl = document.querySelector("#today-uv")
//note: this api key is disabled.  generate a new one before resuming
const apiKey = "45eaf3a8deab03958024ee73f2ab65e0"
const uvWarnEl = document.querySelector("#uvWarn")
const curWatherIconEl = document.querySelector('#headIcon')
const fiveDayEl = document.querySelector("#forcast")
//const submitEl = document.querySelector("#search")
const cityForm = document.querySelector("#city-search")
const cityEl = document.querySelector("#city")
var city 

let currentDate = function(epoch) {
    let date = new Date(parseInt(epoch) *1000)
    console.log(date)
    let currentday = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
    return currentday
}

let longLat= function(cityName){
    {let currentEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
        console.log(currentEndpoint)
        fetch(currentEndpoint).then(function(response){
            if (response.ok){
                response.json().then(function(data){
                    
                    city = data.name
                    getWeather(data.coord)
                });
            }
        });
    };
};

/* take coords from lonLat to get onecall data */
let getWeather = function(coords){
    let currentEndpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`
    console.log(currentEndpoint)
    fetch(currentEndpoint).then(function(response){
        if (response.ok){
            response.json().then(function(data){
            
                createForcast(data.daily)
                createToday(data.current)
            });
        }
    });
};


let createForcast = function(data){
for (let i = 1; i < 6; i ++){
let dayWrapperEl = document.createElement("div")
let weatherListEl = document.createElement("ul")
dayWrapperEl.classList.add("forcast-block")
let dateEl = document.createElement("li")
let imgWrapperel = document.createElement("li")
let weatherIcon=document.createElement("img")
let tempEl = document.createElement("li")
let windEl = document.createElement("li")
weatherListEl.classList.add("noList")
let humidityEl = document.createElement("li")
dateEl.textContent = currentDate(data[i].dt)
console.log("daily weather icon " + getIcon(data[i].weather[0].icon))
weatherIcon.setAttribute("src", getIcon(data[i].weather[0].icon))
imgWrapperel.appendChild(weatherIcon)
tempEl.textContent = `Temp: ${data[i].temp.day}° F`
windEl.textContent=`Wind: ${data[i].wind_speed} MPH`
humidityEl.textContent=`Humidity: ${data[i].humidity}%`
weatherListEl.appendChild(dateEl)
weatherListEl.appendChild(imgWrapperel)
weatherListEl.appendChild(tempEl)
weatherListEl.appendChild(windEl)
weatherListEl.appendChild(humidityEl)
dayWrapperEl.appendChild(weatherListEl)
fiveDayEl.appendChild(dayWrapperEl)

}}

let getIcon = function(iconId){
    return `http://openweathermap.org/img/wn/${iconId}@2x.png`
}

let createToday = function(data){
    let currentday = currentDate(data.dt) 
    cityNameEl.textContent=city + ' ' + currentday 
    curWatherIconEl.setAttribute("src", getIcon(data.weather[0].icon))
   
    todayTempEl.textContent= data.temp + "° F"
    todayHumidEl.textContent= data.humidity + "%"
    todayWindEl.textContent= data.wind_speed +" MPH"
    todayUvEl.textContent=data.uvi
    uvfloat= parseFloat(data.uvi)
    if (uvfloat < 3.0){
        todayUvEl.classList.add("good")
    } 
    else if (uvfloat >=3.0 && uvfloat < 6){
        todayUvEl.classList.add("okay")
    }
    else if (uvfloat > 6.0){
        todayUvEl.classList.add("bad")
    };
   
    }

let cityHandler = function(event){
    event.preventDefault();
    let clearBlock = document.getElementById("forcast")
    while(clearBlock.firstChild){
        clearBlock.removeChild(clearBlock.lastChild)
    }
    longLat(cityEl.value)
    
}  

cityForm.addEventListener("submit",cityHandler)


/* cannot get uvi with city weather, so pull lon/lat to pass into onecall */


