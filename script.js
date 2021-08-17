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
    onsole.log(cityName);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`).then((response)=>{
      return response.json();
    }).then(data=>{
        console.log(data);
        let lat = data.coord.lat
        let lon = data.coord.lon
        temp = data.main.temp
        wind = data.wind.speed
        humidity = data.main.humidity
        let date = new Date().toLocaleDateString()
        console.log(date);
  
        console.log(cityWeather.innerText);
        cityWeather.innerText = `${cityName}  ${date}`
        tempWeather.innerText = `Temprature: ${temp} F`
        humidityWeather.innerText = `Humidity: ${humidity} %`
        windWeather.innerText = `wind: ${wind} MPH`
        
        fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&APPID=${APIKey}`).then(response=>{
          return response.json();
        }).then(data=>{
            console.log(data);
            let uvi = data.value;
  
            UVIndexWeather.innerText= `UVI: ${uvi}`;
            
            if (uvi <= 4) {
              colorSet = "green";
            } else if (uvi >= 4 && uvi <= 7) {
              colorSet = "yellow";
            } else if (uvi > 7) {
              colorSet = "red";
            } 
            UVIndexWeather.style.backgroundColor = colorSet
          }).catch(e=>console.error(e))
  
  
    }).catch(e=>console.error(e ))
    
      console.log(cityName);
  
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`).then(response=>{
      return response.json();
    }).then((data)=>{
      let flag=false;
  
    
      console.log(data);
      for (let i = 0; i < data.list.length; i=i+8) {
        let dateDay = data.list[i].dt_txt;
        dateDay = dateDay.slice(0,10)
        
        let tempDay = data.list[i].main.temp;
        let humidityDay = data.list[i].main.humidity;
        let windDay = data.list[i].wind.speed
  
        let testDiv = document.createElement('div')
        testDiv.classList.add('eachDayCard')
        if(flag==true){
          days.removeChild(testDiv)
        }
        testDiv.innerHTML = `    
        <h5 class="text-white m-2 p-1">Date: ${dateDay}</h5>
        <h5 class="text-white m-2 p-1">Temp: ${tempDay}F</h5>
        <h5 class="text-white m-2 p-1">Humidity: ${humidityDay}%</h5>
        <h5 class="text-white m-2 p-1">Wind: ${windDay}MPH</h5>
        
        `
        days.prepend(testDiv)
        
      }
    }).finally(()=>{
      flag=true;
  
    })
  })
  
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