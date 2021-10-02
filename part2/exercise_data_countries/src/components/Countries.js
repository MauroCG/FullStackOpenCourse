import Country from "./Country"
import ShowCountry from "./ShowCountry"


const Countries = ({ countries, showCountry }) => {
    // Function to handle the button showCountry
    const handleShowCountry = (event) => {
        showCountry(event.target.value) // showCountry is the function to set the state of countriesSearch
    }
    // Many countries to show
    if (countries.length > 10) {
        return <div>To many matches, specify another filter</div>
    }

    // There isn't any match
    if (countries.length === 0) {
        return <div>There isn't any match to show</div>
    }

    // Between 2 and 10 matches
    if (countries.length >= 2) {
        return (
            <>
                {countries.map(country => {
                    return (
                        <div key={country.alpha3Code} style={{display: "flex"}}>
                            {country.name}
                            <ShowCountry value={country.name} onClick={handleShowCountry} />
                        </div>
                    )
                })}
            </>
        )
    }

    // Only 1 country matched
    return (
        <div>
            <Country country={countries[0]} />
        </div>
    )
}

export default Countries