import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'


const App = () => {
  // State variable to show the persons saved in the phonebook
  const [ persons, setPersons ] = useState([])

  // Getting the initial data of the phonebook from the server
  useEffect(() => {
    //console.log("Getting the phonebook data")
    personsService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
      })
  }, [])

  // State variables to manage the add person form and the search filter
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ showSearch, setShowSearch ] = useState(false)

  // State variable to handle the shown of notifications
  const [ notificationMessage, setNotificationMessage ] = useState({type: null, message: null})

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

    if (alreadyAddedName && !alreadyAddedNumber) { //Check if the person is already added and the new number doesn´t exists
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const oldPerson = persons.find(person => { //Getting the person id to update the old number
          return person.name === newPerson.name
        })

        personsService
          .updatePerson(oldPerson.id, newPerson)
          .then(updatedPerson => {
            setNotificationMessage({
              type: 'success',
              message: `The number of ${updatedPerson.name} was updated successfully`
            })
            setTimeout(() => {
              setNotificationMessage({type: null, message: null})
            }, 5000)

            setPersons(persons.map(person => person.name !== updatedPerson.name ? person : updatedPerson))
          })
          .catch(error => {
            const index = error.response.data.error.indexOf("`") // Get the correspond index to show a better error message than the backend sends
            setNotificationMessage({
              type: 'error',
              message: error.response.data.error.slice(index)
            })
            setTimeout(() => {
              setNotificationMessage({type: null, message: null})
            }, 5000)

            personsService
              .getAll()
              .then(personsData => {
                setPersons(personsData)
              })
          })
      }
    } else if (alreadyAddedNumber) {
      alert(`${newPerson.number} is already added to phonebook`)
    }
    else { // If the name and number doesn't exists yet agregates the person and clears the inputs
      personsService
        .addPerson(newPerson)
        .then(addedPerson => {
          setNotificationMessage({
            type: 'success',
            message: `Added ${addedPerson.name}`
          })
          setTimeout(() => {
            setNotificationMessage({type: null, message: null})
          }, 5000)

          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          //console.log(error.response.data.error)
            const index = error.response.data.error.indexOf("`") // Get the correspond index to show a better error message than the backend sends
            setNotificationMessage({
              type: 'error',
              message: error.response.data.error.slice(index)
            })
            setTimeout(() => {
              setNotificationMessage({type: null, message: null})
            }, 5000)
        })
    }
  }

  const personsToShow = showSearch // Filtered search results
    // Filters the user's input, uncase sensitive (converts all to lower case for that)
    ? persons.filter(person => person.name.toLowerCase().match(search.toLowerCase()))
    : persons // If user's input is empty then show all the phonebook data

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification className={notificationMessage.type} message={notificationMessage.message} />
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
        <Persons persons={personsToShow} setPersons={setPersons} setNotificationMessage={setNotificationMessage} />
    </div>
  )
}

export default App