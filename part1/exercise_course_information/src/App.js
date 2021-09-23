const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  );
}


const Part = ({lesson, content}) => {
  return (
    <p>
      {lesson}: {content}
    </p>
  );
}


const Content = ({lessons, contents}) => {
  const [ lesson1, lesson2, lesson3 ] = lessons
  const [ content1, content2, content3 ] = contents

  return (
    <div>
      <Part lesson={lesson1} content={content1} />
      <Part lesson={lesson2} content={content2} />
      <Part lesson={lesson3} content={content3} />
    </div>
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const lessons = [part1.name, part2.name, part3.name]
  const contents = [part1.exercises, part2.exercises, part3.exercises]

  return (
    <>
      <Header course={course} />
      <Content 
        lessons={lessons}
        contents={contents}  
      />
      <Total exercises={contents} />
    </>
  );
}

export default App;
