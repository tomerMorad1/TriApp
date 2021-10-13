import { BookApiService } from '../services/api-book-service.js'
import { BookService } from '../services/book.service.js'
import { eventBusService } from '../../../services/event-bus-service.js'
import { utilService } from '../../../services/util.service.js'
import { OptionsList } from './option-list.jsx'

export class BookAdd extends React.Component {

    state = {
        search: '',
        options: []
    }

    getOptionsDebounced = utilService.debounce(BookApiService.getOptions, 1000)

    componentDidMount() {
    }

    setOptions = (options) => {
        this.setState({ options });
    }

    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState({ search: value });
        this.getOptionsDebounced(value, this.setOptions)
        if (!value) this.setState({ options: [], search: '' })
    };

    onAddBook = (book) => {
        const isBookExist = BookService.addBook(book);
        this.props.loadBooks();
        this.setState({ options: [], search: '' })
        if (!isBookExist) eventBusService.emit('user-msg', { txt: `Added '${book.volumeInfo.title}' to the list!`, type: 'success', bookId: book.id })
        else eventBusService.emit('user-msg', { txt: `${book.volumeInfo.title} - already exists in the list!`, type: 'error', bookId: book.id })
    }

    render() {
        const { search, options } = this.state
        return (
            <section className="book-add">
                <label htmlFor="search">Add a new book :
                    <input list="search" type="search" name="search" value={search} onChange={this.handleChange} />
                    {search && <OptionsList onAddBook={this.onAddBook} options={options} />}
                </label>


            </section>
        )
    }
}