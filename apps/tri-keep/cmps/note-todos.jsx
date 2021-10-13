import { NoteService } from '../services/note.service.js'
import { NoteActions } from './note-actions.jsx'

export class NoteTodos extends React.Component {

    state = {
        isContentEditable: false,
        isHover: false,
        color: '',
        todos: [],
        isDone: false,
    }


    contentRef = React.createRef()

    componentDidMount() {
        const { backgroundColor } = this.props.note.style;
        const { isPinned,info } = this.props.note;
        const {isDone} =this.props.note
        this.setState({ color: backgroundColor, isPinned })
        this.setState({ todos:info.todos})
        this.setState({isDone})
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
        // NoteService.saveTxt(this.props.note.id, innerText)
    }


    onAllTodosDone = (ev) => {
        ev.stopPropagation();
        const noteId = this.props.note.id
        const {isDone} = this.state;
        this.setState({ isDone:!isDone})
        NoteService.allTodosDone(noteId)
    }

    onTodoDone = (ev,todoId) => {
        ev.stopPropagation();
        const {todos} = this.state;
        const noteId = this.props.note.id
        const todoIdx = todos.findIndex(todo => todo.id === todoId)
        const todosCopy = [...this.state.todos]
        if (todosCopy[todoIdx].doneAt) todosCopy[todoIdx].doneAt = null
        else todosCopy[todoIdx].doneAt = Date.now();
        this.setState({ todos: todosCopy });
        NoteService.todoDone(noteId,todos,todoIdx)
    }
   

render() {
    const { note, onRemoveNote, onSetNotePin,onDuplicateNote } = this.props;
    const { isContentEditable, isHover, color,isDone } = this.state;
    const {info} = this.props.note;
    return (
        <section className="note-container"
            onMouseEnter={() => this.setState({ isHover: true })}
            onMouseLeave={() => this.setState({ isHover: false })}>
            <div onClick={this.onUnEdit} className={(isContentEditable) ? 'screen' : ''}></div>
            <blockquote style={{ backgroundColor: color }}
                className={`${note.type}  ${(isContentEditable) ? 'editable' : ''}`}
                onClick={this.onSetEdit} ref={this.contentRef} contentEditable={isContentEditable}
                suppressContentEditableWarning={true}>


                <h3 className={(isDone)? 'line-through' : ''} >{info.txt}
                 <button onClick={this.onAllTodosDone} className={(isDone)? 'far fa-check-square' : 'far fa-square'} ></button> </h3>
                {info.todos.map((todo)  =>{
                    return <div key={todo.id} >
                        <p className={(todo.doneAt || isDone)? 'line-through' : ''}  >{todo.txt} 
                        <button onClick={(ev)=>{
                            this.onTodoDone(ev,todo.id);
                        }} className={(todo.doneAt || isDone)? 'far fa-check-square' : 'far fa-square'} ></button> </p>
                    </div>
                })}
                 {/* {note.isPinned && <p className="btn-action fas fa-thumbtack pinned-note"></p>} */}
                {isHover && <NoteActions onDuplicateNote={onDuplicateNote} onSetNotePin={onSetNotePin} onChangeColor={this.onChangeColor} note={note} onRemoveNote={onRemoveNote} />}
            </blockquote>
        </section>

    )
}
}
