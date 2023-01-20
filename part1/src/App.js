import { useState } from 'react'

const StatisticLine = (props) => {
  const {text, value } = props
  return (
    <div>{text} {value}</div>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props

  if (good === 0 && neutral === 0 && bad === 0) return (
    <div>
      <h1>statistics</h1>
      No feedback given
    </div>
  )

  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} />
      <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} />
      <StatisticLine text="positive" value={((good / (good + neutral + bad)) * 100) + ' %'} />
    </div>
  )
}

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
    >
      { text }
    </button>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const addToGood = () => setGood(good + 1)
  const addToNeutral = () => setNeutral(neutral + 1)
  const addToBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={addToGood} />
      <Button text="neutral" onClick={addToNeutral} />
      <Button text="bad" onClick={addToBad} />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App