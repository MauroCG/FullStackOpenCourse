const PersonForm = ({ inputTexts, values, handlers, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            {inputTexts.map((text, i) => { // Renders all necessary inputs for the given state variables vaalues
                return (
                    <div key={i}>
                        {text}: <input value={values[i]} onChange={handlers[i]} />
                    </div>
                )
            })}
            <button type="submit">add</button>
        </form>
    )
}

export default PersonForm