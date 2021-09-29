import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  // State variable to show the persons saved in the phonebook
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  // State variables to manage the add person form and the search filter
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ showSearch, setShowSearch ] = useState(false)

  const handleChangeNewName = (event) => { // Updates newName
    setNewName(event.target.value)
    //console.log(event.target.value)
  }

  const handleChangeNewNumber = (event) => { // Updates newNumber
    setNewNumber(event.target.value)
  }

  const handleChangeSearch = (event) => { // Updates search and showSearch
    setSearch(event.target.value)  
    setShowSearch(event.target.value) // If the search value is different from empty then show the filtered search results
  }

  const addPerson = (event) => { // Adds the new person data to the phonebook
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const alreadyAddedName = persons.some(person => person.name === newPerson.name) // To check if already exists the person name
    const alreadyAddedNumber = persons.some(person => person.number === newPerson.number) // To check if already exists the person number

    if (alreadyAddedName) {
      alert(`${newPerson.name} is already added to phonebook`)
    } else if (alreadyAddedNumber) {
      alert(`${newPerson.number} is already added to phonebook`)
    }
    else { // If the name and number doesn't exists yet agregates the person and clears the inputs
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = showSearch // Filtered search results
    // Filters the user's input, uncase sensitive (converts all to lower case for that)
    ? persons.filter(person => person.name.toLowerCase().match(search.toLowerCase()))
    : persons // If user's input is empty then show all the phonebook data

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter 
          text={"filter shown with"}
          value={search}
          handler={handleChangeSearch}
        />
      <h3>Add a new</h3>
      <PersonForm
        inputTexts={["name", "number"]}
        values={[newName, newNumber]}
        handlers={[handleChangeNewName, handleChangeNewNumber]}
        onSubmit={addPerson}
      />
      <h3>Numbers</h3>
        <Persons persons={personsToShow} />
    </div>
  )
}

export default App