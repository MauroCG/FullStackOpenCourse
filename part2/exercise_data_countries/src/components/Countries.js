import Country from "./Country"

const Countries = ({ countries }) => {
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
                {countries.map(country => <div key={country.alpha3Code}>{country.name}</div>)}
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