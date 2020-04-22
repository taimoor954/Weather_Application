var fetchNotification = document.querySelector('.Notification');
var fetchWeatherIcon = document.querySelector('.imageDiv');
var fetchTemperatureValue = document.querySelector('.temperatureValue');
var fetchTemperatureDescription = document.querySelector('.temperatureDescription');
var fetchLocation = document.querySelector('.location');

// console.log(fetchTemperatureDescription);

var weather = {
    temperature : {
        value : 18,
        unit : 'celcius'
    }
  , 
  desc: 'few Clouds',
  icon : " ",
  city : "Karachi",
  continent : ' '  
};
var Kelvin = 273;
// console.log(weather);

var ApiKey = "c10b6215a98ebda3e68e429ef3498b97";
if ('geolocation' in navigator)
{
     navigator.geolocation.getCurrentPosition(setPostion, error)

}
else{

fetchNotification.innerHTML ="Browser Doesnt support Navigator"
}
function setPostion(position)
{

    console.log(position);
    var latitiude = position.coords.latitude;
    var longitude = position.coords.longitude;
    // console.log(latitiude);
    // console.log(longitude);
    // 
    getWeather(longitude,latitiude);
    
}
function error(Showerror)
{

fetchNotification.innerHTML = ` ${Showerror.message}`
}
function getWeather(longitude,latitiude)
{
    var Apilinker = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitiude}&lon=${longitude}&appid=${ApiKey}`

    fetch(Apilinker)
    .then(function(response)
    {
        var data = response.json();
        return data;

    })
    .then(function(data)
    {
        console.log(data);
            weather.temperature.value = Math.floor(data.current.temp - Kelvin);
            // weather.description = data.weather[0].description;
                weather.desc = data.current.weather[0].description;
                var spliting = data.timezone.split("/");
                weather.city = spliting[1];
                weather.continent= spliting[0];
                 weather.icon = data.current.weather[0].icon;
                console.log(weather.icon);
     })
     .then(function()
     {
        displayFunction();
     });
    
}
function displayFunction(){
fetchTemperatureValue.innerHTML = `${weather.temperature.value}°<span>C</span>`
fetchTemperatureDescription.innerHTML =  `${weather.desc} `;
fetchLocation.innerHTML =  `${weather.city }/${weather.continent}  `
fetchWeatherIcon.style.background = `url(./Images/${weather.icon}.png)`;
fetchWeatherIcon.style.color = 'white';    
}