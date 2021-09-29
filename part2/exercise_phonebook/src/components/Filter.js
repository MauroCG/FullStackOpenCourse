const Filter = ({ text, value, handler }) => {
    return (
        <div>
            {text}: <input
                type="search"
                value={value}
                onChange={handler}
            />
        </div>
    )
}

export default Filter