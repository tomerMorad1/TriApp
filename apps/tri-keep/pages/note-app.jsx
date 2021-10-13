import { NoteAdd } from '../cmps/note-add.jsx'
import { NoteList } from '../cmps/note-list.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'
import { NoteService } from '../services/note.service.js'

export class NoteApp extends React.Component {

    state = {
        notes: [],
        pinnedNotes: [],
    }

    componentDidMount() {
        this.loadNotes();
        this.loadPinnedNotes();
    }

    componentWillUnmount() {
        this.setState({ notes: [], filterBy: null })
    }

    loadNotes = (filterBy) => {
        NoteService.query(false, filterBy)
            .then((notes) => { this.setState({ notes }) })
    }

    loadPinnedNotes = (filterBy) => {
        NoteService.query(true, filterBy)
            .then((pinnedNotes) => this.setState({ pinnedNotes }))
    }

    onRemoveNote = (noteId) => {
        NoteService.removeNote(noteId)
            .then((notes) => {
                {
                    this.loadPinnedNotes();
                    this.loadNotes();
                }
            })
    }

    onSetNotePin = (ev, noteId) => {
        ev.stopPropagation();
        NoteService.setNotePin(noteId)
            .then(() => {
                this.loadNotes();
                this.loadPinnedNotes();
            })
    }

    onDuplicateNote = (ev, note) => {
        ev.stopPropagation();
        NoteService.duplicateNote(note)
            .then(() => {
                this.loadNotes();
                this.loadPinnedNotes();
            })
    }

    onAddNote = (inputInfo) => {
        if (!inputInfo.txt) return;
        NoteService.addNote(inputInfo)
            .then((notes) => { this.setState({ notes }) })
        inputInfo.txt = '';
    }

    onSetFilter = (filterBy) => {
        this.loadNotes(filterBy)
        this.loadPinnedNotes(filterBy)
    }

    render() {
        const { notes, pinnedNotes } = this.state;
        return (
            <section className="note-app">
                <NoteFilter onSetFilter={this.onSetFilter} />
                <NoteAdd notes={notes} onAddNote={this.onAddNote} />
                <NoteList notes={notes}
                    pinnedNotes={pinnedNotes}
                    onRemoveNote={this.onRemoveNote}
                    onSetNotePin={this.onSetNotePin}
                    onDuplicateNote={this.onDuplicateNote} />
            </section>
        )
    }
}