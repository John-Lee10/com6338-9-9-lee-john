// universal variables
const weatherDiv = document.getElementById('weather')
const form = document.querySelector('form')

//submit
form.onsubmit = async function(e){
    e.preventDefault()
    const searchTerm = this.search.value
    if (!searchTerm) return
    try{
    form.search.value = ""
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=c2b712e4ee8e813074537191b2833cce`)
    if(res.status !== 200) throw new Error('Location not found')
    const weatherData = await res.json()
    renderWeather(weatherData)
    }catch(err){
        weatherDiv.innerHTML = err.message
    }
}

const renderWeather = data => {
    const {name} = data
    //name
    weatherDiv.innerHTML = `<h2>${name + "," + " " + data.sys.country}</h2>`
    //map
    const latitude = data.coord.lat
    const longitude = data.coord.lon
    const mapLink = document.createElement('a')
    mapLink.href = "https://www.google.com/maps/search/?api=1&query=" + latitude + "," + longitude
    mapLink.textContent = "click to view map"
    weatherDiv.appendChild(mapLink)
    //icon
    const img = document.createElement('img')
    img.src = 'https://openweathermap.org/img/wn/'+ data.weather[0].icon +'@2x.png'
    img.alt = name
    weatherDiv.appendChild(img)
    //Weather Condition
    const weatherCondition = document.createElement('p')
    weatherCondition.textContent = data.weather[0].description.toUpperCase()
    weatherDiv.appendChild(weatherCondition)
    //Current Temp
    const currentTemp = document.createElement('p')
    currentTemp.textContent = "Current:" + " " + data.main.temp + "°" + " "+ "F"
    weatherDiv.appendChild(currentTemp)
    //Feels Like
    const feelsLike = document.createElement('p')
    feelsLike.textContent = "Current:" + " " + data.main.feels_like + "°" + " "+ "F"
    weatherDiv.appendChild(feelsLike)
    //Last Updated
    const ms = data.dt * 1000
    const date = new Date(ms)
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })
    const lastUpdated = document.createElement('p')
    lastUpdated.textContent = timeString
    weatherDiv.appendChild(lastUpdated)
}
