import { useState } from 'react'

const PersonForm = ({persons,setPersons}) => {

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
            id: persons.length + 1,
        }
        if (persons.some(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }
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