import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const randomAnecdoteIndex = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  
  const updateVote = () => {
    const newPoints = [...points]
    if (newPoints[selected] > newPoints[mostVoted]) setMostVoted(selected)

    newPoints[selected] += 1
    setPoints([...newPoints])
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>
        has { points[selected] } votes
      </div>
      <div>
        <button onClick={updateVote}>vote</button>
        <button onClick={randomAnecdoteIndex}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        {anecdotes[mostVoted]}
        <div>
          has { points[mostVoted] } votes
        </div>
      </div>
    </div>
  )
}

export default App
