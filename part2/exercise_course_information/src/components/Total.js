const Total = ({ exercises }) => {
    // Get the sum of all exercises
    const totalExercises = exercises.reduce((prev, current) =>
        prev + current
    )
    console.log(exercises, totalExercises)

    return (
        <b><p>total of {totalExercises} exercises</p></b>
    )
}

export default Total