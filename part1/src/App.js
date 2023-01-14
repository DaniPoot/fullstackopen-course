const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.exercise}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part exercise={props.exercise1} />
      <Part exercise={props.exercise2} />
      <Part exercise={props.exercise3} />
    </div>
  )
}

const Footer = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />

      <Content 
        exercise1={`${part1} ${exercises1}`}
        exercise2={`${part2} ${exercises2}`}
        exercise3={`${part3} ${exercises3}`}
      />
      <Footer total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
