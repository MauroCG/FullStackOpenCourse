import Person from "./Person"

const Persons = ({ persons }) => {
    return (
        <div>
            {persons.map(person => // Renders each person of the array
                <Person
                    key={person.name}
                    name={person.name}
                    number={person.number}
                />
            )}
        </div>
    )
}

export default Persons