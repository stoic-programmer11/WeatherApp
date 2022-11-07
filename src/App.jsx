import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'

function App() {

  const [weather, setWeather] = useState({})

  const [isCelsius, setIsCelsius] = useState(true)


  // const [icon, setIcon] = useState("")
  // const actIcon = () => {
  //   setIcon(weather.weather?.[0]?.icon)
  // }

  const changeUnit = () => {
    setIsCelsius(!isCelsius)
  }


  useEffect(() => {
    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7269dd58b02ff4d18e17797a07830bf1`)
        .then((res) => setWeather(res.data))
    }
    navigator.geolocation.getCurrentPosition(success);

  }, [])


  console.log(weather);


  return (
    <div className="App">
      <div className='weather-card'>
        <h1>Weather App</h1>
        <h2>{weather.name}{", "} {weather.sys?.country}</h2>
        <div className='info-section'>
          <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`} alt="" className='weather-icon' />

          <div className='info-column'>
            <ul>
              <li className='weather-description'> <b>"{weather.weather?.[0].description}"</b>  </li>
              <li><b> Wind Speed: </b>{weather.wind?.speed} {"m/s"}</li>
              <li><b>Clouds: </b>{weather.clouds?.all}{"%"}</li>
              <li><b>Preassure: </b>{weather.main?.pressure}{" mb"}</li>
            </ul>
          </div>
        </div>
        <p><b>{isCelsius ?
          (weather.main?.temp - 273.15).toFixed(2) :
          ((weather.main?.temp - 273.15) * 9 / 5 + 32).toFixed(2)}
          {isCelsius ? " °C" : " °F"}</b>
        </p>
        <button className='unit-change-button' onClick={changeUnit}> <strong>Degrees °F/°C</strong> </button>
      </div>
    </div>
  )
}

export default App
