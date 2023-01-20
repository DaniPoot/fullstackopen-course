import { useState } from 'react'

const Statistics = (props) => {
  const {good, neutral, bad} = props

  return (
    <div>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {good + neutral + bad}</div>
      <div>average { (good - bad) / (good + neutral + bad) }  </div>
      <div>positive { (good / (good + neutral + bad)) * 100} %</div>
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