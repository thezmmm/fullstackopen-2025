import {useState} from "react";

const Filter = ({persons, setPersonsToShow}) => {
    const [filterText, setFilterText] = useState('')

    const handleFilterChange = (event) => {
        const text = event.target.value
        setFilterText(text)
        setPersonsToShow(
            persons.filter(person => person.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    return (
        <div>
            filter shown with <input value={filterText} onChange={handleFilterChange}/>
        </div>
    )
}

export default Filter