const cityNameEl = document.querySelector("#city-name")
const todayTempEl = document.querySelector("#today-temp")
const todayHumidEl = document.querySelector("#today-humid")
const todayWindEl = document.querySelector("#today-wind")
const todayUvEl = document.querySelector("#today-uv")
const apiKey = "45eaf3a8deab03958024ee73f2ab65e0"
const uvWarnEl = document.querySelector("#uvWarn")
const fiveDayEl = document.querySelector("forcast")
var city 

/* take coords from lonLat to get onecall data */
let getToday = function(coords){
    let currentEndpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`
    console.log(currentEndpoint)
    fetch(currentEndpoint).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data)

                createToday(data.current)
            });
        }
    });
};

let createToday = function(data){
    let date = new Date(parseInt(data.dt) *1000)
    let currentday = `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}` 
    cityNameEl.textContent=city + ' ' + currentday 
    
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

/* cannot get uvi with city weather, so pull lon/lat to pass into onecall */
let longLat= function(cityName){
    {let currentEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
        console.log(currentEndpoint)
        fetch(currentEndpoint).then(function(response){
            if (response.ok){
                response.json().then(function(data){
                    console.log(data.coord)
                    city = data.name
                    getToday(data.coord)
                });
            }
        });
    };
};
longLat("hartford")

