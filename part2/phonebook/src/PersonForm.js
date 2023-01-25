export const PersonForm = ({ onSubmit, nameValue, phoneValue, nameChange, phoneChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={nameChange} />
      </div>
      <div>
        number: <input value={phoneValue} onChange={phoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
