import { bookService } from "../../services/book-service.js";

export class BookReview extends React.Component {
    state = {
        bookId: null,
        bookReviews: null,
        review: {
            name: "Books Reader",
            rate: 1,
            readAt: "2020-12-22",
            text: "",
        },
    };

    // elInput = React.createRef();

    componentDidMount() {
        // this.elInput.current.focus();
        this.setState({ bookId: this.props.bookId }, () => {
            bookService.getById(this.state.bookId).then((book) => {
                if (book.reviews) this.setState({ bookReviews: book.reviews });
            });
        });
    }

    onSaveReview = (ev) => {
        //on submit
        ev.preventDefault();

        if (this.state.review.rate < 1) {
            alert("must choose valid rate!");
            return;
        }
        bookService.addReview(this.state.review, this.state.bookId);
        const reviews = this.state.bookReviews ? [...this.state.bookReviews, this.state.review] : [this.state.review]
        this.setState({ bookReviews: reviews})

    };

    onInputChange = (ev) => {
        const value =
            ev.target.type === "number" ? +ev.target.value : ev.target.value;
        const reviewCopy = { ...this.state.review };
        reviewCopy[ev.target.name] = value;
        this.setState({
            review: reviewCopy,
        });
    };

    onRemove = (reviewIdx) => {
        bookService.removeReview(this.state.bookId, reviewIdx)
        this.state.bookReviews.splice(reviewIdx, 1)
        this.setState({ bookReviews: this.state.bookReviews})
    }

    render() {
        const { review } = this.state
        return (
            <div className="reviews">
                {this.state.bookReviews && (
                    <div className="review-list">
                        {this.state.bookReviews.map((review, idx) => {
                            return (
                                <div className="review-item" key={idx}>
                                    <span className="reviewer">
                                        Name: {review.name} Date: {review.readAt}
                                        <button onClick={()=>{this.onRemove(idx)}}>X</button>
                                    </span>
                                    <span className="review-rate">
                                       Rate: {review.rate}
                                    </span>
                                    <span className="review-text">
                                        {review.text}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}

                <form className="review-form" onSubmit={this.onSaveReview}>
                    <label htmlFor="name">Your Name:</label>
                    <input
                        value={review.name}
                        // ref={this.elInput}
                        placeholder="Your Name"
                        type="text"
                        name="name"
                        onChange={this.onInputChange}
                    />
                    <label htmlFor="rate">Book Rate:</label>
                    <input
                        value={review.rate}
                        type="number"
                        name="rate"
                        min="1"
                        max="5"
                        onChange={this.onInputChange}
                    />
                    <label htmlFor="date">Reading Date:</label>
                    <input
                        value={review.readAt}
                        type="date"
                        name="readAt"
                        onChange={this.onInputChange}
                    />
                    <label htmlFor="rate">Review:</label>
                    <textarea
                        value={review.text}
                        name="text"
                        rows="4"
                        cols="50"
                        placeholder="Write your review here..."
                        onChange={this.onInputChange}
                    />
                    <br/>
                    <button type="submit">Add Review</button>
                </form>
            </div>
        );
    }
}
