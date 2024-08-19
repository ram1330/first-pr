const state = {
  defaultCity: [],
  weatherData: []
};

const weatherIconImg = document.querySelector(".weatherIconImg");
const mainDegree = document.querySelector(".mainDegree");
const cityName = document.querySelector(".searchInput").value;
const locationName = document.querySelector(".cityName");
const date = document.querySelector(".date");
const humidity = document.querySelector(".humidityValue");
const visiblity = document.querySelector(".visiblityValue");
const pressure = document.querySelector(".pressureValue");
const wind = document.querySelector(".windValue");

const searchInputForm = document.querySelector(".searchInputWrapper");
const searchInput = document.querySelector(".searchInput");

getDefaultWeather();

async function getDefaultWeather() {
  try {
    const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=dd9dfa69e5c245919df134131242007&q=Bishkek&aqi=yes`);
    const data = await res.json();
    state.defaultCity.push(data);
    render(state.defaultCity);
  } catch (error) {
    console.error("Our error: ", error);
  };
};

function render(weatherArr) {
  mainDegree.innerHTML = "";
  weatherArr.forEach(el => {
    weatherIconImg.src = `${el.current.condition.icon}`

    date.textContent = el.location.localtime;

    mainDegree.textContent = `${Math.round(el.current.temp_c)}°C`;
    const mainDegreeIcon = document.createElement("img");
    mainDegreeIcon.src = `${el.current.condition.icon}`;
    mainDegreeIcon.style.marginLeft = "20px";
    mainDegree.append(mainDegreeIcon);

    locationName.textContent = el.location.name;

    humidity.textContent = `${el.current.humidity}%`

    visiblity.textContent = `${el.current.vis_km}km`
    visiblity.style.textTransform = "lowerCase";

    pressure.textContent = `${el.current.pressure_mb}hPa`;
    pressure.style.textTransform = "lowerCase";

    wind.textContent = `${el.current.wind_kph}kph`
    wind.style.textTransform = "lowerCase";
  });
};


async function getWeather(city) {
  try {
    const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=dd9dfa69e5c245919df134131242007&q=${city}&aqi=yes`);
    const data = await res.json();
    console.log(data);
    state.weatherData.push(data);
    render(state.weatherData);
  } catch (error) {
    console.error("Error in searching: ", error);
  };
};


// =========================================================================

searchInputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = searchInput.value;
  getWeather(inputValue);
  searchInput.value = "";
})