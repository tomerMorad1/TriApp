import { ReviewPreview } from "./review-preview.jsx";


export class ReviewList extends React.Component {

    state = {
        reviews: [],
    }

    componentDidMount() {
        this.props.loadReviews();
    }


    render() {
        const { reviews } = this.props;
        if (!reviews) return <div className="review-list"> No reviews yet.. be the 1st to add a review!</div>
        return (
            <section className="review-list">
                {reviews.map((review, idx) => {
                    return <ReviewPreview review={review} key={idx}/>
                })}

            </section>
        )
    }
}