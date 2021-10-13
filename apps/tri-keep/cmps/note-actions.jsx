import { ColorInput } from './color-input.jsx'
export class NoteActions extends React.Component {

    state = {
        isPaletteOn: false,
    }

    onOpenPalette = (ev) => {
        ev.stopPropagation();
        this.setState({ isPaletteOn: true })
    }

    render() {
        const { note, onRemoveNote, onChangeColor, onSetNotePin,onDuplicateNote } = this.props;
        const { isPaletteOn } = this.state
        return (
            <section>
                <button onClick={() => {
                    onRemoveNote(note.id)
                }} className="btn-action far fa-trash-alt" ></button>

                <button onClick={(event) => onSetNotePin(event, note.id)} className="btn-action fas fa-thumbtack"></button>

                <button onClick={this.onOpenPalette} className="btn-action fas fa-palette"></button>

                <button onClick={(ev)=>{
                    onDuplicateNote(ev,note)
                }} className="btn-action far fa-copy" ></button>

                {isPaletteOn && <ColorInput onChangeColor={onChangeColor} />}
            </section>
        )
    }
}