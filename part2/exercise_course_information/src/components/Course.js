import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ course }) => {
    return (
        <div>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            {/** For the sum of exercises is sent only the array of them */}
            <Total exercises={course.parts.map(part => part.exercises)} />
        </div>
    )
}

export default Course