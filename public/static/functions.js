const degreeSymbol = '°';

function fetchweather(){
    if(!navigator.geolocation) {
        const city = prompt("Enter your city")
        fetch(`city/${city}`)
        .then(response => response.json())
        .then(data =>{
            const lat = data.results[0].bounds.northeast.lat;
            const long = data.results[0].bounds.northeast.lng;
            const address = data.results[0].components.city + ", " + data.results[0].components.state;
            document.getElementById("address").innerHTML = address;
            document.getElementById("lat").innerHTML = Math.round(lat * 1000) / 1000 + degreeSymbol;
            document.getElementById("long").innerHTML = Math.round(long * 1000) / 1000 + degreeSymbol;
            fetch(`weather/${lat},${long}`)
                .then(response => response.json())
                .then(data =>{
                console.log(data);
                current(data.current);
                raincheck(data.daily);
            })
        })
      } else {
            navigator.geolocation.getCurrentPosition(getPosition);
            function getPosition(position){
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                document.getElementById("lat").innerHTML = Math.round(lat * 1000) / 1000 + degreeSymbol;
                document.getElementById("long").innerHTML = Math.round(long * 1000) / 1000 + degreeSymbol;
                
                fetch(`city/${lat},${long}`)
                .then(response => response.json())
                .then(data =>{
                    const address = data.results[0].components.city + ", " + data.results[0].components.state;
                    document.getElementById("address").innerHTML = address;
                })
                
                fetch(`weather/${lat},${long}`)
                .then(response => response.json())
                .then(data =>{
                current(data.current);
                raincheck(data.daily);
            })
        }
      }
}

function current(current){
    // time functions 
    let date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    if(hour > 12){
        hour = hour - 12;
    }
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    let time = hour + ":" + minutes;
    document.getElementById("time").innerHTML = time;

    // weather functions
    let temperatureC = current.temp;
    document.getElementById("temperature").innerHTML = Math.round(temperatureC) + "°C";
    let humidity = current.humidity;
    document.getElementById("humidity").innerHTML = humidity + "%"
    let wind_speed = current.wind_speed;
    document.getElementById("wind").innerHTML = wind_speed + " m/s"
    let current_weather = current.weather[0].main;
    let current_weather_description = current.weather[0].description;
    document.getElementById("current").innerHTML = current_weather + ", " + current_weather_description;
}

function raincheck(dayArray){
    var i = 0;
    var state = false;
    var rainDay = 0;
    var raintype = ""
    while (i < 7 && state === false){
        if(dayArray[i].weather[0].main == "Rain"){
            state = true;
            rainDay = i;
            raintype = dayArray[i].weather[0].description;
        }
        i++;
    }
    if(state === true){
        if(rainDay == 0){
            document.getElementById("rainfall-day").innerHTML = "Today!"
            document.getElementById("rain-type").innerHTML = raintype;
        }
        else{
            document.getElementById("rainfall-day").innerHTML = rainDay + " days later";
            document.getElementById("rain-type").innerHTML = raintype;
        }
    }
    else{
        document.getElementById("rain-type").innerHTML = "";
        document.getElementById("rainfall-day").innerHTML = "No rain this week"
    }
}