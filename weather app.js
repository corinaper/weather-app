const apiKey = "d2b66fe3b5b42aa0e212a443b6368c7f";
const form = document.querySelector("form");
const button = document.querySelector("button");
const input = document.querySelector("input");

weatherDisplay(geoplugin_city());

form.addEventListener("submit", e => {
    e.preventDefault();
    weatherDisplay(input.value);
})

function weatherDisplay(city){  
const msg = document.querySelector(".msg");
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
fetch(url)
.then(response => response.json())
.then(data => {
  let { sys, main, name, weather, timezone } = data;
  
  const container = document.querySelector(".container");
  let mainWeather = weather[0]["main"]; 
  const localTime = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000 + (timezone*1000)).getHours();
  let localTimeMinutes = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000 + (timezone*1000)).getMinutes();
  if (localTimeMinutes.length<2){localTimeMinutes="0"+new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000 + (timezone*1000)).getMinutes()};
  const sunRise = new Date(new Date(sys.sunrise*1000).getTime()+ new Date().getTimezoneOffset() * 60000 + (timezone*1000)).getHours();
  const sunSet = new Date(new Date(sys.sunset*1000).getTime()+ new Date().getTimezoneOffset() * 60000 + (timezone*1000)).getHours();
  


//   Remove all classes from previous inputs
  if ((container.classList.contains("day")) || (container.classList.contains("night"))){
    container.classList.remove("day") || container.classList.remove("night")
  };

  if ((container.classList.contains("rain")) || (container.classList.contains("drizzle")) || (container.classList.contains("snow")) || (container.classList.contains("clear")) || (container.classList.contains("thunderstorm")) || (container.classList.contains("atmosphere")) || (container.classList.contains("clouds"))){
    container.classList.remove("rain") || container.classList.remove("drizzle") || container.classList.remove("snow") || container.classList.remove("clear") || container.classList.remove("thunderstorm") || container.classList.remove("atmosphere") || container.classList.remove("clouds")
  };
  
//   Add weather info
  const weatherSection = document.querySelector(".weather-section");
  const markup = `
    <div class="weatherBlock1">
    <h2 class="degrees">${Math.round(main.temp)}<sup>°C</sup></h2>
    <h2 class="weather-info">
      ${weather[0]["description"]}
    </h2>
    </div>
    <div class="weatherBlock2">
    <h2 class="time">${localTime}:${localTimeMinutes}</h2>
    <h2 class="city" data-name="${name}">
      <span>${name}</span>
    </h2>
    </div>
  `;
  weatherSection.innerHTML = markup;
  

// Add new classes
  if ((localTime>=sunRise) && (localTime<=sunSet)){
    container.classList.add("day")
  } else if (((localTime<sunRise) || (localTime>sunSet))){
    container.classList.add("night")
  };

  if (mainWeather == "Rain") {
    container.classList.add("rain")
  } else if (mainWeather == "Drizzle"){
    container.classList.add("drizzle") 
  } else if (mainWeather == "Snow"){
    container.classList.add("snow") 
  } else if (mainWeather == "Clear"){
    container.classList.add("clear") 
  } else if (mainWeather == "Thunderstorm"){
    container.classList.add("thunderstorm") 
  } else if (mainWeather == "Atmosphere"){
    container.classList.add("atmosphere")
} else if (mainWeather == "Clouds"){
    container.classList.add("clouds")
};

}) 
.catch(() => {
    msg.textContent = "Please search for a valid city 😩";
  });

form.reset();
msg.textContent = "";
}