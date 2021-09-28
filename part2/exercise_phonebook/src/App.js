import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleChangeNewName = (event) => {
    setNewName(event.target.value)
    //console.log(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }

    const alreadyAdded = persons.some(person => person.name === newPerson.name)
    if (alreadyAdded) {
      alert(`${newPerson.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChangeNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person =>
          <div key={person.name}>{person.name}</div>
        )}
    </div>
  )
}

export default App