const Country = ({ country }) => {
    return (
        <>
            <h2>{country.name}</h2>
            <section>capital {country.capital}</section>
            <section>region {country.region}</section>
        </>
    )
}

export default Country