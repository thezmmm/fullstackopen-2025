import { useState } from 'react'
import phoneBookService from "./service/phoneBookService.jsx";

const PersonForm = ({persons,setPersons,setNotification}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNewNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()
        const usedIds = persons.map(p => Number(p.id))
        let newId = 1
        while (usedIds.includes(newId)) {
            newId += 1
        }
        const nameObject = {
            name: newName,
            number: newNumber,
            id: String(newId),
        }
        // if (persons.some(person => person.name === newName)) {
        //     alert(`${newName} is already added to phonebook`)
        //     return
        // }
        if (persons.some(person => person.name === newName)){
            if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
                nameObject.id = persons.find(p => p.name === newName).id
                phoneBookService
                    .update(nameObject.id, nameObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== nameObject.id ? p : returnedPerson))
                    })
                    .catch(error => {
                        setNotification({message: `Information of ${nameObject.name} has already been removed from server`, type: 'error'})
                        setTimeout(() => {
                            setNotification({message: null, type: null})
                        }, 5000)
                        setPersons(persons.filter(p => p.id !== nameObject.id))
                        }
                    )
                return
            }
        }
        setNotification({message: `Added ${nameObject.name}`, type: 'success'})
        setTimeout(() => {
            setNotification({message: null, type: null})
        }, 5000)
        phoneBookService.create(nameObject)
        setPersons(persons.concat(nameObject))
    }

    return (
        <form onSubmit={addName}>
            <div>
                name: <input value = {newName} onChange={handleNewNameChange}/>
                number: <input value = {newNumber} onChange={handleNewNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm