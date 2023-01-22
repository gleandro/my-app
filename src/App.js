import React, { useState, useEffect } from 'react'
import Note from './components/Note';
import notesService from './services/notes';

const App = () => {

    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        notesService.getAll().then(resp => {
            setNotes(resp.concat({
                id: 10000,
                content: 'This note is not saved to server',
                date: '2019-05-30T17:30:31.098Z',
                important: true,
            }))
        })
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
                alert(
                    `the note '${note.content}' was already deleted from server`
                )
                setNotes(notes.filter(n => n.id !== id))
            })
    }


    return (
        <div>
            <h1>Notes</h1>
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
        </div>
    )
}

export default App