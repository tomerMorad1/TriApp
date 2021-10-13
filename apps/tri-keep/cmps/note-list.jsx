import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes, pinnedNotes, onRemoveNote, onSetNotePin, onDuplicateNote }) {

    return (
        <section className="note-list flex">
            <section className="pinned-note-list">
                {pinnedNotes.map(note => <NotePreview onDuplicateNote={onDuplicateNote} onRemoveNote={onRemoveNote} key={note.id}
                    note={note} onSetNotePin={onSetNotePin} />)}
                    {/* {pinnedNotes.length && <img src="../../../img/pinned.png"/>} */}
            </section>
            <section className="unpinned-note-list ">
                {notes.map(note => <NotePreview onDuplicateNote={onDuplicateNote} onRemoveNote={onRemoveNote} key={note.id}
                    note={note} onSetNotePin={onSetNotePin} />)}
            </section>
        </section>
    )
}