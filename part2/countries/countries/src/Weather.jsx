import {useEffect, useState} from "react";
import weatherService from "./service/WeatherService.jsx";

const Weather = ({ country }) => {

    const [weather, setWeather] = useState(null)

    useEffect(() => {
      const fetchWeather = async () => {
            const data = await weatherService.getWeather(country)
            setWeather(data)
            console.log(data)
      }
      fetchWeather()
    },[country])

    const kelvinToCelsius = (kelvin) => {
        if (!kelvin) return null
        return (kelvin - 273.15).toFixed(2)
    }

    const temp = kelvinToCelsius(weather?.main?.temp)
    const wind = weather?.wind?.speed
    const iconUrl = `https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`

    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature: {temp} °C</p>
            <img src={iconUrl} alt="Weather icon" />
            <p>Wind: {wind} m/s</p>
        </div>
    )
}

export default Weather