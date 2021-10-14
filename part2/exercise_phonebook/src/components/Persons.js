import Person from "./Person"
import personsService from '../services/persons'

const Persons = ({ persons, setPersons, setNotificationMessage }) => {
    //Function to handle the deletion of the person and update the state
    const onDeletePerson = personId => {
        const personDeleted = persons.find(person => person.id === personId)

        personsService
            .deletePerson(personId) //Deleting the person
            .then(response => {
                setNotificationMessage({
                    type: 'success',
                    message: `${personDeleted.name} deleted successfully`
                })
                setTimeout(() => {
                    setNotificationMessage({type: null, message: null})
                }, 5000)

                personsService
                    .getAll() //Updating the persons state
                    .then(personsData => {
                        setPersons(personsData)
                    })
            })
            .catch(error => {
                setNotificationMessage({
                    type: 'error',
                    message: `Information of ${personDeleted.name} was alreeady been removed from server`
                })
                setTimeout(() => {
                    setNotificationMessage({type: null, message: null})
                }, 5000)

                personsService
                    .getAll() //Updating the persons state
                    .then(personsData => {
                        setPersons(personsData)
                    })
            })
    }

    return (
        <div>
            {persons.map(person => // Renders each person of the array
                <Person
                    key={person.id}
                    name={person.name}
                    number={person.number}
                    deletePerson={() => onDeletePerson(person.id)}
                />
            )}
        </div>
    )
}

export default Persons