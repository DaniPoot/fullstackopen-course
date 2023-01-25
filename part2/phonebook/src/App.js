import { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter } from './Filter'
import { PersonForm } from './PersonForm'
import { Persons } from './Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPhone, setNewPhone] = useState('')
  const [newName, setNewName] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log({ response: response.data })
        setPersons(response.data)
      })
  }, [])
  

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
      number: newPhone
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