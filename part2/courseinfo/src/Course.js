const Header = ({ course }) => {
  return (
    <h1>{ course }</h1>
  )
}

const Part = ({ exercise }) => {
  const { name, exercises } = exercise
  return (
    <p>{ name } { exercises } </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {
        parts.map(part => {
          return <Part exercise={part} key={part.name} />
        })
      }
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((prev, part) => prev + part.exercises, 0)

  return <p style={{ fontWeight: 'bold' }}>Number of exercises { total }</p>;
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course