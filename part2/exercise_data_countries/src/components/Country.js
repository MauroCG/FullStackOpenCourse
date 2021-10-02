import { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
    // State for wather data of the city
    const [cityWeather, setCityWeather] = useState({
        temperature: '',
        current: {
            weather_icons: [''],
            weather_descriptions: {
                wind_dir: '',
                wind_speed: ''
            }
        }
    })

    // Getting the weather information of the capital
    useEffect(() => {
        const API_KEY = process.env.REACT_APP_COUNTRIES_API // Gets the weatherstack api key in the file .env
        const city = country.capital
        const request = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`

        axios
          .get(request)
          .then(response => console.log(response.data))
          .catch(error => console.log(error))
      }, [country.capital])

    return (
        <>
            <h2>{country.name}</h2>
            <section>capital {country.capital}</section>
            <section>region {country.region}</section>
            <h3>Weather in {country.capital}</h3>
            <section><b>temperature: </b>{cityWeather.current.temprerature} Celcius</section>
            <img src={cityWeather.current.weather_icons[0]} alt="weather_icon" />
            <section>
                <b>wind: </b>{cityWeather.current.weather_descriptions.wind_speed} mph
                direction {cityWeather.current.weather_descriptions.wind_dir}
            </section>
        </>
    )
}

export default Country