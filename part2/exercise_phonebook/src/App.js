import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ showSearch, setShowSearch ] = useState(false)

  const handleChangeNewName = (event) => {
    setNewName(event.target.value)
    //console.log(event.target.value)
  }

  const handleChangeNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeSearch = (event) => {
    setSearch(event.target.value)  
    setShowSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const alreadyAddedName = persons.some(person => person.name === newPerson.name)
    const alreadyAddedNumber = persons.some(person => person.number === newPerson.number)

    if (alreadyAddedName) {
      alert(`${newPerson.name} is already added to phonebook`)
    } else if (alreadyAddedNumber) {
      alert(`${newPerson.number} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = showSearch
    ? persons.filter(person => person.name.toLowerCase().match(search.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
        filter shown with <input type="search" value={search} onChange={handleChangeSearch} />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChangeNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {personsToShow.map(person =>
          <div key={person.name}>
          {person.name} {person.number}
        </div>
        )}
    </div>
  )
}

export default App