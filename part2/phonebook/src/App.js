import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const onChangeName = ({ target }) => {
    const { value } = target
    setNewName(value)
  }

  const onAddPerson = (event) => {
    event.preventDefault()

    const personInTheList = persons.find(person => person.name === newName)
    console.log({ personInTheList })
    if (personInTheList) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const person = {
      name: newName
    }
    setPersons(persons.concat(person))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onAddPerson}>
        <div>
          name: <input value={newName} onChange={onChangeName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => <div key={person.name}> {person.name} </div>)
      }
    </div>
  )
}

export default App