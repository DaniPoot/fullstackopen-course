import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newPhone, setNewPhone] = useState('')
  const [newName, setNewName] = useState('')
  const [filter, setNewFilter] = useState('')

  const onChangeName = ({ target }) => {
    const { value } = target
    setNewName(value)
  }

  const onChangePhone = ({ target }) => {
    const { value } = target
    setNewPhone(value)
  }

  const onChangeFilter = ({ target }) => {
    const { value } = target
    setNewFilter(value)
  }

  const onAddPerson = (event) => {
    event.preventDefault()

    const personInTheList = persons.find(person => person.name === newName)
    if (personInTheList) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const person = {
      name: newName,
      phone: newPhone
    }
    setPersons(persons.concat(person))
    setNewName('')
    setNewPhone('')
  }

  const filterList = !filter ? persons : persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={filter} onChange={onChangeFilter} />
      </div>

      <h2>add a new</h2>
      <form onSubmit={onAddPerson}>
        <div>
          name: <input value={newName} onChange={onChangeName} />
        </div>
        <div>
          number: <input value={newPhone} onChange={onChangePhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        filterList.map(person => (
          <div key={person.name}> 
            {person.name}: {person.phone}
          </div>
        ))
      }
    </div>
  )
}

export default App