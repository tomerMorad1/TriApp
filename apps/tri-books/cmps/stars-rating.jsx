export class StarsRating extends React.Component {
    state = {
        rating: "",
        hover: "",
    };

    setRating = (ev, idx) => {
        ev.preventDefault();
        this.setState({ rating: idx });
        this.props.onSaveRate(idx);
    };

    setHover = (idx) => {
        this.setState({ hover: idx });
    };

    render() {
        const { hover, rating } = this.state;
        return (
            <div className="star-rating">
                {[...Array(5)].map((star, idx) => {
                    idx += 1;
                    return (
                        <button
                            key={idx}
                            className={idx <= (hover || rating) ? "on" : "off"}
                            onClick={(event) => this.setRating(event, idx)}
                            onMouseEnter={() => this.setHover(idx)}
                            onMouseLeave={() => this.setHover(rating)}>
                            <span className="star">&#9733;</span>
                        </button>
                    );
                })}
            </div>
        );
    }
}