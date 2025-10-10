import {useState} from "react";
import countriesService from "./service/CountriesService.jsx";

const Filter = ({setCountries}) => {
    const [value, setValue] = useState('')

    const handleChange = (event) => {
        setValue(event.target.value)
        const fetchCountries = async () => {
            const data = await countriesService.getAll()
            const filteredCountries = data.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
            setCountries(filteredCountries)
        }
        fetchCountries()
    }

    return (
        <div>
            find countries <input value={value} onChange={handleChange}/>
        </div>
    )
}
export default Filter