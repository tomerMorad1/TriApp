
export function ReviewPreview({ review }) {
    return (
        <div className="review">
            <h3>Name : {review.fullName}</h3>
            <h4>Rating : {'⭐'.repeat(review.rate)}</h4>
            <p>"{review.txt}"</p>
            <small>Date : {review.readAt}</small>
            <hr />
        </div>
    )
}