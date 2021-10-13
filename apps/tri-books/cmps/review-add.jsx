import { BookService } from '../services/book.service.js'
import { StarsRating } from './stars-rating.jsx';

export class ReviewAdd extends React.Component {

    state = {
        isAdd: false,
        review: {
            fullName: '',
            rate: 1,
            readAt: new Date().toISOString().split('T')[0],
            txt: '',
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        this.setState((prevState) => ({ review: { ...prevState.review, [field]: value } }));
    };

    saveReview = (ev, bookId) => {
        ev.preventDefault();
        const { fullName, rate, readAt, txt } = this.state.review
        BookService.addReview(fullName, rate, readAt, txt, bookId)
        this.onToggleAddReview();
        this.props.loadReviews();
    }

    onSaveRate = (rate) => {
        this.state.review.rate = rate;
    }

    onToggleAddReview = () => {
        this.setState({ isAdd: !this.state.isAdd })
    }

    render() {
        const { fullName, rate, readAt, txt } = this.state.review
        const { isAdd } = this.state
        return (
            <section className="review-add">
                {!isAdd && <React.Fragment>
                    <h1> Add a new review : </h1>
                    <div className="add-btn" onClick={this.onToggleAddReview}> + </div>
                </React.Fragment>}
                {isAdd && <React.Fragment>
                    <button className="form-btn" onClick={this.onToggleAddReview} >Back</button>
                    <form >
                        <label htmlFor="fullName">Full Name : </label>
                        <input type="text" name="fullName" id="fullName" placeholder="Enter Full Name" value={fullName} onChange={this.handleChange} />

                        <label>Rate this book :</label>
                        <StarsRating rate={rate} onSaveRate={this.onSaveRate} />

                        <label htmlFor="read-at">Read at :</label>
                        <input type="date" name="read-at" id="read-at" value={readAt} onChange={this.handleChange} />

                        <label htmlFor="txt">Your Review : </label>
                        <textarea name="txt" id="txt" placeholder="Enter your review here" value={txt} onChange={this.handleChange} />

                        <button className="form-btn" onClick={(event) => this.saveReview(event, this.props.bookId)}>Add Review</button>
                    </form>
                </React.Fragment>}
            </section>
        )
    }
}