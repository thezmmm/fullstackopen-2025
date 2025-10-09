import { useState } from 'react'
import Filter from "./Filter.jsx";
import PersonForm from "./PersonForm.jsx";
import Persons from "./Persons.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    const [personsToShow, setPersonsToShow] = useState(persons)

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter persons={persons} setPersonsToShow={setPersonsToShow}/>
            <h3>add a new</h3>
            <PersonForm persons={persons} setPersons={setPersons}/>
            <h3>Numbers</h3>
            <Persons personsToShow={personsToShow}/>
        </div>
    )
}

export default App