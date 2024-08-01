const getResponse = (type) => (response)=> {
    if(response.ok){
        switch(type){
            case 'url':
                return response.url;
            default:
                return  response.json()   
        } 
    }else{
        throw Error();
    }
}

//reset function
const resetInnerHtml = (el) => {
    el.innerHTML = ''
}

//element show function
const showElement = (el) => { 
    el.classList.replace('d-none', 'd-block')
}

//element hide function
const hideElement = (el) => { 
    if(el.classList.contains('d-block')) {
        el.classList.replace('d-block', 'd-none');
    } else if(!el.classList.contains('d-none')) {
        el.classList.add('d-none')
    }
}


//main function
function getWeather() {
    const userInput = document.getElementById('user-input');
    const errorMessageWrapper = document.getElementById('error');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherTempElement = document.getElementById('weather-temp');
    const weatherCityElement = document.getElementById('weather-city');
    const weatherDescriptionElement = document.getElementById('weather-discription');
    const humidityIconElement = document.getElementById('weather-humidity-icon');
    const humidityInfoElement = document.getElementById('weater-humidity-info');
    const windIconElement = document.getElementById('weather-wind-icon');
    const windInfoElement = document.getElementById('weater-wind-info');
    const errorMessage = 'This field is required.';
    const cityName = userInput.value;


    // Input Validation part
    if(!cityName){
        errorMessageWrapper.innerHTML = errorMessage;
        return
    }

    // Reset all added classes and text content
    const reset = () => {
        resetInnerHtml(errorMessageWrapper);
        resetInnerHtml(weatherTempElement);
        resetInnerHtml(weatherCityElement);
        resetInnerHtml(weatherDescriptionElement);
        resetInnerHtml(humidityInfoElement);
        resetInnerHtml(windInfoElement);
        hideElement(weatherIcon);
        hideElement(humidityIconElement);
        hideElement(windIconElement);

    }


    const displayWeather = (data) => {
        // Temperature part
        const temperature = Math.round(data.main.temp - 273.15)
        weatherTempElement.innerHTML = `${temperature}&deg;C`;
        weatherCityElement.innerHTML = data.name;
        weatherDescriptionElement.innerText = data.weather[0].description;

        // Humidity part
        showElement(humidityIconElement);
        humidityInfoElement.innerHTML = `${data.main.humidity}%`;


        // Wind part
        showElement(windIconElement);
        windInfoElement.innerHTML = `${Math.round(data.wind.speed)} m/s`;
    }

    reset();



    //Request to get date from API
    const apiKey ="";
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then(getResponse('json'))
    .then((data)=> {
        displayWeather(data);
        const icon = data.weather[0].icon;

        return fetch(`https://openweathermap.org/img/wn/${icon}@4x.png`);
    })
    .then((getResponse('url')))
    .then((iconUrl) => {
         weatherIcon.setAttribute('src', iconUrl);
         showElement(weatherIcon);
    })
    .catch((e)=>{
        const newError = "Invalid input! Try again.";
        errorMessageWrapper.innerHTML = newError;
        console.error(e);
    })
}


