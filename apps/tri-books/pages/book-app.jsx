import { BookService } from '../services/book.service.js'
import { BookList } from '../cmps/book-list.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'
import { BookAdd } from '../cmps/book-add.jsx'

export class BookApp extends React.Component {

    state = {
        books: [],
        filterBy: '',
    }

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        BookService.query(this.state.filterBy)
            .then(books => this.setState({ books }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks);
    };

    render() {
        const { books } = this.state;
        if (!books) return <div>Loading...</div>
        return (
            <section className="book-app main-layout">
                <BookFilter onSetFilter={this.onSetFilter} />
                <BookAdd loadBooks={this.loadBooks} />
                <BookList books={books} />
            </section>)
    }
}