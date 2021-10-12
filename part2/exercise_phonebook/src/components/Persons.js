import Person from "./Person"
import personsService from '../services/persons'

const Persons = ({ persons, setPersons }) => {
    //Function to handle the deletion of the person and update the state
    const onDeletePerson = personId => {
        personsService
            .deletePerson(personId) //Deleting the person
            .then(response => {
                personsService
                    .getAll() //Updating the persons state
                    .then(personsData => {
                        setPersons(personsData)
                    })
            })
            .catch("Can't felete the specified person")
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