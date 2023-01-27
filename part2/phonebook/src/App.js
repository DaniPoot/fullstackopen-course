import { useState, useEffect } from 'react'
import personService from './services/persons'
import { Filter } from './Filter'
import { PersonForm } from './PersonForm'
import { Persons } from './Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPhone, setNewPhone] = useState('')
  const [newName, setNewName] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
   personService.getAll()
    .then(initalPersons => {
      setPersons(initalPersons)
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

    const person = {
      name: newName,
      number: newPhone
    }
    const personInTheList = persons.find(person => person.name === newName)
    if (!personInTheList) {
      personService.create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    } else {
      onUpdated({ ...person, id: personInTheList.id })
    }
    
    setNewName('')
    setNewPhone('')
  }
  
  const onDeletedPerson = ({ name, id }) => {
    const onDeletedPerson = window.confirm(`Delted ${name} ?`)
    if (!onDeletedPerson) return

    personService.deleteById(id)
    .then(deleteResponse => {
      const filterPerson = persons.filter(person => person.id !== id)
      setPersons(filterPerson)
    })
  }

  const onUpdated = (person) => {
    const { name, id, number } = person
    const onUpdatedPerson = window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)
    if (!onUpdatedPerson) return

    personService.update(id, person)
    .then(updateResponse => {
      const filterPerson = persons.map(person => {
        if (person.id === id) {
          return {
            ...person,
            number
          }
        }
        return person
      })
      setPersons(filterPerson)
    })
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
      <Persons
        persons={filterList}
        onDeleted={onDeletedPerson}
      />
    </div>
  )
}

export default App