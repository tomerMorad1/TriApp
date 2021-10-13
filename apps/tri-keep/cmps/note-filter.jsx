export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            word: '',
            type: 'all',
        },
    };

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        });
    };

    onFilter = (ev) => {
        ev.preventDefault();
    };

    render() {
        const { word } = this.state.filterBy;
        return (
            <form className='mail-filter flex' onSubmit={this.onFilter}>
                <label htmlFor='by-word' className="flex">
                    <div className="search-img">
                        <img src="././img/search.png" />
                    </div>
                    <input
                        name='word' id='by-word'
                        type='text' placeholder='Search by text' value={word}
                        onChange={this.handleChange}
                    />
                </label>

                <select name="type" onChange={this.handleChange}>
                    <option value="all">All</option>
                    <option value="note-txt">Text</option>
                    <option value="note-img">Imag</option>
                    <option value="note-video">Video</option>
                    <option value="note-todos">Todos</option>
                </select>

            </form>
        );
    }
}