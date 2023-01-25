import { useState } from 'react'
import { Filter } from './Filter'
import { PersonForm } from './PersonForm'
import { Persons } from './Persons'

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
      <Filter value={filter} onChange={onChangeFilter} />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={onAddPerson}
        nameValue={newName}
        nameChange={onChangeName}
        phoneValue={newPhone}
        phoneChange={onChangePhone}
      />
      <h2>Numbers</h2>
      <Persons persons={filterList} />
    </div>
  )
}

export default App