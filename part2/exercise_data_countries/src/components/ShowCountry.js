const ShowCountry = ({ onClick, value }) => {
    return (
        <div>
            <button style={{margin: ".2em"}} onClick={onClick} value={value}>
                show
            </button>
        </div>
    )
}

export default ShowCountry