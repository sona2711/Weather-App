// f8d9b2288b40bfb3f9bcc617bee55f80 API
function getWeather() {
    const userInput = document.getElementById('user-input');
    const errorMessageWrapper = document.getElementById('error');
    const weatherIcon = document.getElementById('weather-icon');
    const errorMessage = "This field is required.";
    const cityName = userInput.value;
    // userInput.value =""
    if(!cityName){
        errorMessageWrapper.innerHTML = errorMessage;
    }
    errorMessageWrapper.innerHTML = "";

    const apiKey ="f8d9b2288b40bfb3f9bcc617bee55f80";
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then((response) => {
        console.log(response)
        if(response.ok){
            return response.json()
            
        }else{
             throw Error()
        }
    })
    .then((data)=> {
        console.log(data)
        const icon = data.weather[0].icon
        console.log(icon)

        return fetch(`https://openweathermap.org/img/wn/${icon}@4x.png`);
    })
    .then((response) => {
        if(response.ok){
            return response.url
        }else{
            throw Error()
        }
    })
    .then((iconUrl) => {
         weatherIcon.setAttribute('src', iconUrl);
         weatherIcon.setAttribute('alt', 'Weather icon');
    })
    .catch((e)=>{
        const newError = "Invalid input! Try again.";
        errorMessageWrapper.innerHTML = newError;
        console.error(e);
    })
}


