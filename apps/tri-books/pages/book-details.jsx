import { LongTxt } from '../cmps/book-long-txt.jsx'
import { ReviewAdd } from '../cmps/review-add.jsx'
import { ReviewList } from '../cmps/review-list.jsx'
import { BookService } from '../services/book.service.js';

export class BookDetails extends React.Component {

    state = {
        book: null,
        reviews: [],
    }

    componentDidMount() {
        this.loadBook()
    }

    loadBook = () => {
        const id = this.props.match.params.bookId;
        BookService.getBookById(id)
            .then(book => {
                if (!book) this.onBack();
                this.setState({ book })
            })
    }

    loadReviews = () => {
        const reviews = this.state.book.review;
        this.setState({ reviews })
    }

    onBack = () => {
        this.props.history.push('/book');
    }

    getBookLang = (lang) => {
        switch (lang) {
            case 'he':
                return 'Hebrew';
            case 'en':
                return 'English';
            case 'sp':
                return 'Spanish';
        }
    }

    getPriceClass = (price) => {
        if (price > 150) return 'red'
        if (price < 20) return 'green'
        return ''
    }

    getPageCount = (num) => {
        if (num > 500) return num + ' - Long reading';
        if (num > 200) return num + ' - Decent reading';
        if (num < 100) return num + ' - Light rading';
        return num;
    }

    getPublishYear = (year) => {
        year = +year;
        const currYear = new Date().getFullYear();
        const diff = currYear - year;
        if (diff > 10) return year + ' - a Veteran Book!'
        if (diff < 1) return year + ' - New!'
        return year;
    }

    render() {
        const { book, reviews } = this.state;
        if (!book) return <div>Loading.... Please wait!</div>
        return (
            <main>
                <button className="back-btn" onClick={this.onBack}>Back<br />👈🏻</button>
                <section className="book-details">
                    <div className="details-container">
                        <div className="main-info">
                            <h2>{book.title}</h2>
                            <h3>{book.subtitle}</h3>
                            <h3>{book.authors.length > 1 ? 'Authors' : 'Author'} :
                                {/* {book.authors.join(' ')}</h3> */}
                                {book.authors.map(author => author + ' ')}</h3>
                            <LongTxt text={book.description} />
                        </div>

                        <h3 className="book-price" >Price :
                            <span className={this.getPriceClass(book.listPrice.amount)}>
                                {book.listPrice.amount}{BookService.getPriceCurr(book.listPrice.currencyCode)}</span>
                        </h3>

                        <div className="additional-info">
                            <h3>Pages : {this.getPageCount(book.pageCount)}</h3>
                            <h3>Genre{book.categories.length > 1 && 's'} :
                                {book.categories.map(category => category + ' | ')}</h3>
                            <h3>Book language : {this.getBookLang(book.language)}</h3>
                            <h3>Published : {this.getPublishYear(book.publishedDate)}</h3>
                        </div>
                    </div>
                    <div className="book-img">
                        {book.listPrice.isOnSale && <div className="sale-img">
                            <img src="././img/sale.png" /></div>}
                        <img className="book-image" src={book.thumbnail} />
                    </div>
                </section>
                <section className="reviews">
                    <ReviewAdd bookId={book.id} loadReviews={this.loadReviews} />
                    <ReviewList reviews={reviews} loadReviews={this.loadReviews} />
                </section>
            </main>)
    }
}
