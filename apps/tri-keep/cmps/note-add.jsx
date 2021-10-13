export class NoteAdd extends React.Component {

    state = {
        inputInfo: {
            type: 'note-txt',
            placeholder: 'Write a note...',
            txt: '',
        }
    }


    handleChange = (ev) => {
        const field = ev.target.name;
        const val = ev.target.value;
        this.setState({ txt: val });
        this.setState({ inputInfo: { ...this.state.inputInfo, [field]: val } })
    }



    refArea = React.createRef()

    componentDidMount() {
        this.refArea.current.focus()
    }

    componentDidMount() {
        this.refArea.current.focus()
    }

    onSelectInput = (selectedType) => {
        if (selectedType === 'note-txt') this.onChangeInput('Write a note...', selectedType)
        else if (selectedType === 'note-img') this.onChangeInput('Paste Image Link...', selectedType)
        else if (selectedType === 'note-video') this.onChangeInput('Paste video Link...', selectedType)
        else if (selectedType === 'note-todos') this.onChangeInput('Write todos seperated by comma...', selectedType)
        this.refArea.current.focus()
    }


    onChangeInput = (placeholder, type) => {
        const { txt } = this.state.inputInfo
        const userSelect = { placeholder, type, txt }
        this.setState({ inputInfo: userSelect })
    }


    render() {
        const { inputInfo } = this.state;
        const { placeholder, txt } = this.state.inputInfo
        const { onAddNote } = this.props;
        return (
            <div className="note-add">
                <div className="txt-container" >
                    <label htmlFor="note-txt"></label>
                    <textarea ref={this.refArea} type="textarea" id="note-txt" name='txt'
                        value={txt} placeholder={placeholder} onChange={this.handleChange} />
                    <button className={"add-btn"} onClick={() => {
                        onAddNote(inputInfo)
                    }} > <img src="./././img/add.png" /></button>
                    <div className={`flex fonts-container `} >
                        <p onClick={() => {
                            this.onSelectInput('note-txt')
                        }} title="Text" className={`fas fa-pencil-alt ${inputInfo.type === 'note-txt' ? 'btn-chosen' : ''} `}></p>
                        <p onClick={() => {
                            this.onSelectInput('note-img')
                        }} title="Imag" className={`fas fa-imag ${inputInfo.type === 'note-img' ? 'btn-chosen' : ''} `}></p>
                        <p onClick={() => {
                            this.onSelectInput('note-video')
                        }} title="Video" className={`far fa-file-video ${inputInfo.type === 'note-video' ? 'btn-chosen' : ''} `}></p>
                        <p onClick={() => {
                            this.onSelectInput('note-todos')
                        }} title="List" className={`fas fa-list ${inputInfo.type === 'note-todos' ? 'btn-chosen' : ''} `}></p>
                    </div>

                </div>
            </div>
        )
    }
}
