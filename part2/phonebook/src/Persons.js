export const Persons = ({ persons, onDeleted }) => {
  return (
    <div>
      {
        persons.map(person => (
          <div key={person.id}> 
            {person.name}: {person.number}
            <button onClick={() => onDeleted(person)} >delete</button>
          </div>
        ))
      }
    </div>
  )
}
