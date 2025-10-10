import axios from "axios";

const api_key = import.meta.env.VITE_API_KEY

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}`

const getWeather = async (country) => {
    const lat = country.latlng[0]
    const lon = country.latlng[1]
    const url = baseUrl+ `&lat=${lat}&lon=${lon}`
    const res = await axios.get(url)
    return res.data
}

export default { getWeather}