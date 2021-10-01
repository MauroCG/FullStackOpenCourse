import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  // State for countries
  const [countries, setCountries] = useState([])

  // State for handle the user search and filter the countries
  const [countriesSearch, setCountriesSearch] = useState("")

  useEffect(() => { // Getting all countries data
    const API_KEY = process.env.REACT_APP_COUNTRIES_API // Gets the countrylayer api key in the file .env
    axios
      .get(`http://api.countrylayer.com/v2/all?access_key=${API_KEY}`)
      .then(response => setCountries(response.data))
      .catch(error => console.log(error))
  }, [])

  // Function to handle the change of the countriesSearch
  const handleCountriesSearch = (event) => {
    // The search value can't contain +,* or \ because are special simbols to do the search (in regular expressions)
    if (event.target.value.match(/^.*[+*\\]+$/)) {
      alert(`The symbol ${event.target.value[event.target.value.length-1]} can't be utilized in searches`)
      setCountriesSearch(countriesSearch)
    } else {
      setCountriesSearch(event.target.value)
    }
  }

  // Filtering the search of the user
  const countriesFiltered = countries.filter(country => {
    return country.name.toLowerCase().match(countriesSearch.toLowerCase())
  })


  return (
    <>
      <div>
        Find countries (by name): <input 
          value={countriesSearch}
          onChange={handleCountriesSearch}
          type="search"
        />
      </div>
      <hr />
      <Countries countries={countriesFiltered} />
    </>
  );
}

export default App;
