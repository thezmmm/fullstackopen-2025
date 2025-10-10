import {useEffect, useState} from 'react'
import countriesService from "./service/CountriesService.jsx";
import CountriesList from "./CountriesList.jsx";
import Filter from "./Filter.jsx";

function App() {
    const [countries, setCountries] = useState([])

    // useEffect(() => {
    //     const fetchCountries = async () => {
    //         const data = await countriesService.getAll()
    //         setCountries(data)
    //         console.log(data)
    //         console.log(countries)
    //     }
    //     fetchCountries()
    // },[])

    return (
        <div>
            <Filter setCountries={setCountries}/>
            <CountriesList countries={countries} setCountries={setCountries}/>
        </div>
    )
}

export default App
