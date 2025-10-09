import {useEffect, useState} from 'react'
import Filter from "./Filter.jsx";
import PersonForm from "./PersonForm.jsx";
import Persons from "./Persons.jsx";
import axios from "axios";
import phoneBookService from "./service/phoneBookService.jsx";

const App = () => {
    const [persons, setPersons] = useState([])

    useEffect(
        () => {
            phoneBookService.getAll().then(data => {
                // console.log(response.data)
                setPersons(data)
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
            <Persons personsToShow={personsToShow} setPersons={setPersons}/>
        </div>
    )
}

export default App