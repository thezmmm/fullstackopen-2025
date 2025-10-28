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

        const nameObject = {
            name: newName,
            number: newNumber,
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
                        setNotification({message: error.message, type: 'error'})
                        setTimeout(() => {
                            setNotification({message: null, type: null})
                        }, 5000)
                        }
                    )
                return
            }
        }
        phoneBookService
            .create(nameObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNotification({message: `Added ${nameObject.name}`, type: 'success'})
                setTimeout(() => {
                    setNotification({message: null, type: null})
                }, 5000)
            }).catch(error => {
                const errorMessage = error.response?.data?.error || error.message
                setNotification({message: errorMessage, type: 'error'})
                setTimeout(() => {
                    setNotification({message: null, type: null})
                }, 5000)
            })
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