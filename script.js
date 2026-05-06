const textBox = document.getElementById("textBox");
const searchBtn = document.getElementById("btn");
let location1 = document.getElementById("location");
const apiKey = "edb38b2af3a0eef8f2645a44050d7b75";
const selectUnit = document.getElementById("units");
const tempText = document.getElementById("temp");
const precipText = document.getElementById("precip");
const cloudText = document.getElementById("cloudCover");
const windSpeedText = document.getElementById("windSpeed");
const windDirectionText = document.getElementById("windDirection");
const uvIndexText = document.getElementById("uvIndex");
const timeText = document.getElementById("time");
const timezoneText = document.getElementById("timezone");
const sunriseText = document.getElementById("sunrise");
const sunsetText = document.getElementById("sunset");
const feelsLikeText = document.getElementById("feelsLike");
const iconDiv = document.getElementById("icons");
const unsplashApiKey = "ftCy_G7nvMsPqatLLSTjhDYBnjdiPSalnxXVoG5Xq7M"
const cityImg = document.getElementById("cityImg");

searchBtn.addEventListener('click', () => {
  let city = textBox.value;
  location1.textContent = textBox.value;
  const unit = selectUnit.value;
  if (textBox.value === "") {
    alert("Please Provide a Location");
  }
  else{
    getWeather(city,unit);
    getImages(city);
  }

});

async function getWeather(loc,unit) {
  try {
    const result = await fetch(`https://api.weatherstack.com/current?access_key=${apiKey}&query=${loc}&units=${unit}`)
    const weather = await result.json()
    console.log(weather);
    let tempunit=""
    let windUnit = ""
    if (selectUnit.value === "" || selectUnit.value === "m"){
      tempunit = "C"
      windUnit = "km/h"
    }
    else if (selectUnit.value ==="s") {
      tempunit = "K"
      windUnit = "km/h"
    }
    else if (selectUnit.value ==="f") {
      tempunit = "F"
      windUnit = "mi/h"
    }

    tempText.textContent = `${weather.current.temperature}°${tempunit}`;
    precipText.textContent = weather.current.precip;
    cloudText.textContent = weather.current.cloudcover;
    windSpeedText.textContent = `${weather.current.wind_speed} ${windUnit}`;
    windDirectionText.textContent = `Wind Direction: ${weather.current.wind_dir}`;
    uvIndexText.textContent = weather.current.uv_index;
    timeText.textContent = weather.location.localtime;
    timezoneText.textContent = `Time Zone: ${weather.location.timezone_id}`;
    sunriseText.textContent = `Sunrise: ${weather.current.astro.sunrise}`;
    sunsetText.textContent = `Sunset: ${weather.current.astro.sunset}`;
    feelsLikeText.textContent = `Feels Like: ${weather.current.feelslike}°${tempunit}`
    console.log(weather.current.weather_icons);
    const newIcon = document.createElement("img");
    newIcon.src = weather.current.weather_icons;
    while (iconDiv.childElementCount !== 0){
      iconDiv.childNodes[0].remove();
    }
    iconDiv.appendChild(newIcon);
  } catch(error) {
    console.log(error)
  }
}

// getBtn.addEventListener('click', () => {
  // let city = textBox.value;
  // getImages(city);
// })

async function getImages(loc) {
  try {
    while(cityImg.childElementCount !== 0) {
      cityImg.childNodes[0].remove();
    }
    const result = await fetch(`https://api.unsplash.com/search/photos?client_id=${unsplashApiKey}&query=${loc}`);
    const image = await result.json()
    console.log(image);
    const newCityImg = document.createElement("img");
    newCityImg.src = image.results[0].urls.full;
    cityImg.appendChild(newCityImg);
  } catch(error) {
    console.log(error);
  }

}