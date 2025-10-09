import phoneBookService from "./service/phoneBookService.jsx";

const Persons = ({personsToShow, setPersons}) => {
    const handleDelete = (id,name) => {
        if (window.confirm("Delete "+name+"?")) {
            phoneBookService.deletePerson(id)
                .then(() => {
                    setPersons(personsToShow.filter(person => person.id !== id));
                })
                .catch(error => {
                    console.error("There was an error deleting the person!", error);
                });
            console.log(`Deleted person with id: ${id}`); // Placeholder for actual delete logic
        }
    }

    return (
        <div>
            {personsToShow.
            map(person =>
                <div key={person.id}>
                    <span>{person.name} {person.number}</span>
                    <button onClick={() => handleDelete(person.id,person.name)}>delete</button>
                </div>
            )}
        </div>
    );
}

export default Persons;