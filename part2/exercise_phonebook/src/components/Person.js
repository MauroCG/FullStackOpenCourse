const Person = ({ name, number, deletePerson }) => {
    //Function to confirm the action of the user
    const confirmDelete = () => {
        if (window.confirm(`Delete ${name}?`)) {
            deletePerson()
        }
    }
    
    return (
        <div>
            {name} {number} <button onClick={confirmDelete}>delete</button>
        </div>
    )
}

export default Person