import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/person';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const App = () => {

  const MySwal = withReactContent(Swal)

  const [persons, setPersons] = useState([])
  const [personsFilter, setPersonsFilter] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setfilter] = useState('')

  useEffect(() => {
    console.log("tetetet")
    personsService.getAll().then(resp => {
      setPersonsFilter(resp)
      setPersons(resp)      
    })
  }, [])

  const addPhone = (event) => {
    event.preventDefault()
    let person = persons.find(x => x.name === newName)
    if (person)
      return MySwal.fire({
        title: `Are you sure delete ${person.name}?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          personsService.update(person.id, { ...person, number: newNumber }).then(resp => {
            const data = personsFilter.map(x => x.id === person.id ? resp : x)
            setPersonsFilter(data)
            setPersons(data)
            setNewName('')
            setNewNumber('')
            MySwal.fire('Changed!')
          })
        }
      })

    personsService.create({ name: newName, number: newNumber }).then(resp => {
      const data = persons.concat(resp)
      setPersonsFilter(data)
      setPersons(data)
      setNewName('')
      setNewNumber('')
    })

  }

  const changeNewName = (event) => setNewName(event.target.value)
  const changeNewNumber = (event) => setNewNumber(event.target.value)
  const filterPhone = (event) => {
    setfilter(event.target.value)
    setPersonsFilter([...persons.filter(x => x.name.toUpperCase().includes(event.target.value.toUpperCase()) || x.number.toUpperCase().includes(event.target.value.toUpperCase()))])
  }


  const deletePerson = ({ id: idPerson, name }) => {

    MySwal.fire({
      title: `Are you sure delete ${name}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        personsService.deletePerson(idPerson).then(resp => {
          const data = personsFilter.filter(x => x.id !== idPerson)
          setPersonsFilter(data)
          setPersons(data)
          MySwal.fire('Deleted!', 'Your file has been deleted.', 'success')
        })
      }
    })


  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterPhone={filterPhone} />

      <h3>Add a new Phone</h3>
      <PersonForm addPhone={addPhone} newName={newName} newNumber={newNumber} changeNewName={changeNewName} changeNewNumber={changeNewNumber} />

      <h3>Numbers</h3>
      <Persons array={personsFilter} deletePerson={deletePerson} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);

