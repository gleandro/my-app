import React, { useState, useEffect } from 'react'
import Note from './components/Note';
import notesService from './services/notes';
import './index.css'

const App = () => {

    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        notesService.getAll().then(resp => setNotes(resp.concat({
            "id": 1000,
            "content": "FAKE",
            "date": "2019-05-30T17:30:31.098Z",
            "important": false
        })))
    }, [])

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date(),
            important: Math.random() < 0.5,
        }
        notesService.create(noteObject).then(resp => {
            setNotes(notes.concat(resp))
            setNewNote('')
        })
    }

    const handleNoteChange = (event) => setNewNote(event.target.value)
    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }
        notesService.update(id, changedNote).then(resp => setNotes(notes.map(note => note.id !== id ? note : resp)))
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const Notification = ({ message }) => {
        if (message === null)
            return null

        return (
            <div className="error">
                {message}
            </div>
        )
    }

    const Footer = () => {
        const footerStyle = {
            color: 'green',
            fontStyle: 'italic',
            fontSize: 16
        }
        return (
            <div style={footerStyle}>
                <br />
                <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
            </div>
        )
    }


    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
            <Footer />
        </div>
    )
}

export default App