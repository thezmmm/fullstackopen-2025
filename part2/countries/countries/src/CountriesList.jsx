import CountryDetail from "./CountryDetail.jsx";

const CountriesList = ({ countries,setCountries}) => {

    const handleShowCountry = (country) => {
        setCountries([country])
    }

    if(countries.length === 1){
        const country = countries[0]
        console.log(country)
        return <CountryDetail country={country}/>
    }
    if(countries.length > 10) return <p>Too many matches, specify another filter</p>
    if(countries.length <= 10) return (
        <div>
            <ul>
                {countries.map((country) => (
                    <li key={country.cca3}>
                        {country.name.common}
                        <button onClick={()=>handleShowCountry(country)}>show</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CountriesList