import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  // States for countries
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_COUNTRIES_API
    axios
      .get(`http://api.countrylayer.com/v2/all?access_key=${API_KEY}`)
      .then(response => setCountries(response.data))
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      <div>
        Find countries (by name): <input type="search" />
      </div>
      <hr />
      {countries.map(country => <div key={country.alpha3Code}>{country.name}</div>)}
    </>
  );
}

export default App;
