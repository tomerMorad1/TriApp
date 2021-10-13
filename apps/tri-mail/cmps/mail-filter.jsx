import { eventBusService } from "../../../services/event-bus-service.js";
import { MailService } from "../services/mail.service.js";


export class MailFilter extends React.Component {
    state = {
        filterBy: {
            word: '',
            type: 'all',
        },
    };

    inputRef = React.createRef()


    componentDidMount() {
        this.inputRef.current.focus()
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.onFilter()
            eventBusService.emit('set-folder', {})
        });
    };

    onFilter = (ev) => {
        if (ev) ev.preventDefault();
        MailService.setFilter(this.state.filterBy)
    };

    render() {
        const { word } = this.state.filterBy;
        return (
            <form className='mail-filter flex' onSubmit={(event) => this.onFilter(event)}>
                <label htmlFor='by-word' className="flex">
                    <div className="search-img">
                        <img src="././img/search.png" />
                    </div>
                    <input
                        ref={this.inputRef} name='word' id='by-word'
                        type='text' placeholder='Search' value={word}
                        onChange={this.handleChange}
                    />
                </label>

                <select name="type" onChange={this.handleChange}>
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>

            </form>
        );
    }
}
