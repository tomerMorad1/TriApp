import { NoteService } from '../services/note.service.js'
import { NoteActions } from './note-actions.jsx'

export class NoteTxt extends React.Component {


    state = {
        isContentEditable: false,
        isHover: false,
        color: '',
    }

    contentRef = React.createRef()

    componentDidMount() {
        const { backgroundColor } = this.props.note.style;
        const { isPinned } = this.props.note;
        this.setState({ color: backgroundColor, isPinned })
    }

    onChangeColor = (ev, color) => {
        const { note } = this.props
        ev.stopPropagation();
        NoteService.setColor(note.id, color)
        this.setState({ color })

    }

    onSetEdit = () => {
        this.setState({ isContentEditable: true });
    }

    onUnEdit = () => {
        const { innerText } = this.contentRef.current;
        this.setState({ isContentEditable: false })
        NoteService.saveTxt(this.props.note.id, innerText)
    }



    render() {
        const { note, onRemoveNote, onSetNotePin,onDuplicateNote } = this.props;
        const { isContentEditable, isHover, color } = this.state;
        return (
            <section className="note-container"
                onMouseEnter={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })}>
                <div onClick={this.onUnEdit} className={(isContentEditable) ? 'screen' : ''}></div>
                <blockquote style={{ backgroundColor: color }}
                    className={`${note.type}  ${(isContentEditable) ? 'editable' : ''}`}
                    onClick={this.onSetEdit} ref={this.contentRef} contentEditable={isContentEditable}
                    suppressContentEditableWarning={true}>
                    <h1>{note.info.txt}</h1>
                    {/* {note.isPinned && <p className="btn-action fas fa-thumbtack pinned-note"></p>} */}
                    {isHover && <NoteActions onDuplicateNote={onDuplicateNote} onSetNotePin={onSetNotePin} onChangeColor={this.onChangeColor} note={note} onRemoveNote={onRemoveNote} />}
                </blockquote>
            </section>

        )
    }


}