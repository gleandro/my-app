import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const arrayInitial = [
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' }
]

const App = () => {

  const [persons, setPersons] = useState(arrayInitial)


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setfilter] = useState('')

  const addPhone = (event) => {
    event.preventDefault()

    if (persons.find(x => x.name === newName))
      return alert(`${newName} is already added to phonebook`);


    setPersons([...persons, { name: newName, number: newNumber }])
    setNewName('')
    setNewNumber('')
  }

  const changeNewName = (event) => setNewName(event.target.value)
  const changeNewNumber = (event) => setNewNumber(event.target.value)
  const filterPhone = (event) => {
    setfilter(event.target.value)
    setPersons([...arrayInitial.filter(x => x.name.toUpperCase().includes(event.target.value.toUpperCase()) || x.number.toUpperCase().includes(event.target.value.toUpperCase()))])


  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter Phones <input value={filter} onChange={filterPhone} /> </div>
      <form onSubmit={addPhone}>
        <h2>Add a new Phone</h2>
        <div>name: <input value={newName} onChange={changeNewName} /> </div>
        <div>number: <input value={newNumber} onChange={changeNewNumber} /> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {
          persons.map((x, i) => <div key={i}>{x.name} {x.number}</div>)
        }
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);

