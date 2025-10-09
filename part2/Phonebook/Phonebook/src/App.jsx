import {useEffect, useState} from 'react'
import Filter from "./Filter.jsx";
import PersonForm from "./PersonForm.jsx";
import Persons from "./Persons.jsx";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([])

    useEffect(
        () => {
            axios.get('http://localhost:3001/persons').then(response => {
                // console.log(response.data)
                setPersons(response.data)
                }
            )
        },[])

    useEffect(() => {
        setPersonsToShow(persons)
    }, [persons])

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