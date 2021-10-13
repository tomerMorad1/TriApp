import { NoteTxt } from './note-txt.jsx'
import { NoteImg } from './note-img.jsx'
import { NoteTodos } from './note-todos.jsx'
import { NoteVideo } from './note-video.jsx'


export class NotePreview extends React.Component {



    render() {


        const DynamicCmp = (props) => {
            const { note, onRemoveNote, onSetNotePin,onDuplicateNote } = props;
            switch (note.type) {
                case 'note-txt':
                    return <NoteTxt onRemoveNote={onRemoveNote} onDuplicateNote={onDuplicateNote} note={note} onSetNotePin={onSetNotePin} />
                case 'note-img':
                    return <NoteImg onRemoveNote={onRemoveNote} onDuplicateNote={onDuplicateNote} note={note} onSetNotePin={onSetNotePin} />
                case 'note-todos':
                    return <NoteTodos onRemoveNote={onRemoveNote} onDuplicateNote={onDuplicateNote} note={note} onSetNotePin={onSetNotePin} />
                case 'note-video':
                    return <NoteVideo onRemoveNote={onRemoveNote} onDuplicateNote={onDuplicateNote} note={note} onSetNotePin={onSetNotePin} />
            }
        }


        const { note, onRemoveNote, onSetNotePin,onDuplicateNote } = this.props;
        return (
            <React.Fragment>
                <DynamicCmp onRemoveNote={onRemoveNote} note={note} onDuplicateNote={onDuplicateNote}  onSetNotePin={onSetNotePin} />
            </React.Fragment>
        )
    }

}