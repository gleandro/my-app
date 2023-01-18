import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {

  const [persons, setPersons] = useState([])
  const [personsFilter, setPersonsFilter] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setfilter] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(res => {
      setPersons(res.data)
      setPersonsFilter(res.data)
    })
  }, [])

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
    setPersonsFilter([...persons.filter(x => x.name.toUpperCase().includes(event.target.value.toUpperCase()) || x.number.toUpperCase().includes(event.target.value.toUpperCase()))])
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterPhone={filterPhone} />

      <h3>Add a new Phone</h3>
      <PersonForm addPhone={addPhone} newName={newName} newNumber={newNumber} changeNewName={changeNewName} changeNewNumber={changeNewNumber} />

      <h3>Numbers</h3>
      <Persons array={personsFilter} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);

