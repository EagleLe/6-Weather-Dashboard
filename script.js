let APIKey = 'a197130c61659a67b04b4e96ad8d285e';


const searchForm = document.getElementById('searchForm')
const searchBtn = document.getElementById('searchBtn')
const searchResults = document.getElementById('searchResults')
const searchResultsBtn = document.getElementById('searchResultsBtn')


const weatherCard = document.getElementById('weatherCard')
const cityWeather = document.getElementById('cityWeather')
const tempWeather = document.getElementById('tempWeather')
const humidityWeather = document.getElementById('humidityWeather')
const windWeather = document.getElementById('windWeather')
const UVIndexWeather = document.getElementById('UVIndexWeather')
const days = document.getElementById('days')
const eachDay = document.getElementById('eachDay')

const eachDayTemp = document.getElementById('eachDayTemp')
const eachDayHumidity = document.getElementById('eachDayHumidity')
const eachDayWind = document.getElementById('eachDayWind')

let cityName =null;
if(JSON.parse(localStorage.getItem('All cities')))
  cityNames=JSON.parse(localStorage.getItem('All cities'))
else
  cityNames = []
  searchBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    cityName = document.querySelector('#citySearch').value;
    console.log(cityName);
    if(cityName){
      cityNames.push(cityName)
      localStorage.setItem('All cities', JSON.stringify(cityNames)); 
      cityBtns();  
    }

    function cityBtns(){
        searchResults.innerHTML=""
        for (var i = 0; i < cityNames.length; i ++) {
          let newCityBtn =  document.createElement("button")
          newCityBtn.setAttribute("type", "button")
          newCityBtn.setAttribute("class","btn btn-primary m-1 cityBtn");
          newCityBtn.innerText = cityNames[i]
          searchResults.prepend(newCityBtn)
        }
      
          }