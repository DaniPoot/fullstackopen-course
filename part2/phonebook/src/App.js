import { useState, useEffect } from 'react'
import personService from './services/persons'
import { Filter } from './Filter'
import { PersonForm } from './PersonForm'
import { Persons } from './Persons'
import { Notification } from './Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPhone, setNewPhone] = useState('')
  const [newName, setNewName] = useState('')
  const [filter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('')

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

  const setNotification = (message, notificationType) => {
    setMessage(message)
    setType(notificationType)
  }

  const resetNotification = () => {
    setTimeout(() => {
      setMessage(null)
      setType('')
    }, 5000)
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
        setNotification(`Added ${person.name}`, 'success')
        resetNotification()
      })
      .catch(e => {
        const error = e.response.data.error
        setNotification(error, 'error')
        resetNotification()
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
      setNotification(`Information of ${name} has already removed from server`, 'success')
      resetNotification()
    })
    .catch(e => {
      setNotification(`Information of ${name} has already been removed from server`, 'error')
      resetNotification()
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
      setNotification(`Information of ${name} has been updated`, 'success')
      resetNotification()
    })
    .catch(e => {
      const error = e.response.data.error
      // setNotification(`Information of ${name} has already been removed from server`, 'error')
      setNotification(error, 'error')
      resetNotification()
    })
  }


  const filterList = !filter ? persons : persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} />
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