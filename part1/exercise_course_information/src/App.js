const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  );
}


/*
const Content = ({lessons, contents}) => {
  return (
    lessons.map(lesson => {
      return (
        <p>
          { lesson }: { contents[lessons.indexOf(lesson)] }
        </p>
      )
    })
  );
} 
*/
const Content = ({lesson, content}) => {
  return (
    <p>
      {lesson}: {content}
    </p>
  );
}


const Total = ({exercises}) => {
  let total = 0

  exercises.map(exercise => {
    total += exercise
    return 0
  })

  return (
    <p>Number of exercises: {total}</p>
  );
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  //const lessons = [part1, part2, part3]
  //const contents = [exercises1, exercises2, exercises3]

  return (
    <>
      <Header course={course} />
      {/*
      <Content 
        lessons={lessons}
        contents={contents}  
      />
      */}
      <Content lesson={part1} content={exercises1} />
      <Content lesson={part2} content={exercises2} />
      <Content lesson={part3} content={exercises3} />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </>
  );
}

export default App;
