import { LongTxt } from "./book-details/LongTxt.jsx";
import { bookService } from "../services/book-service.js";
import { BookReview } from "./book-details/BookReview.jsx";
const { Link } = ReactRouterDOM;

export class BookDetails extends React.Component {
    state = {
        book: null,
        isLongTxtShown: false,
        bookNegsIds: null,
    };

    componentDidMount = () => {
        this.loadBookDetails()
    };

    loadBookDetails = () => {
        const { bookId } = this.props.match.params;
        bookService.getById(bookId).then((book) => {
            this.setState({ book }, ()=> {
                bookService
                    .getNextPrevBook(book.id)
                    .then((bookNegsIds) =>{ 
                        this.setState({bookNegsIds})
                    })
            });
        });
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBookDetails()
        }
    };

    getBookPriceClass = () => {
        let bookPriceClass = "";
        if (this.state.book.listPrice.amount > 150) bookPriceClass = "red";
        else if (this.state.book.listPrice.amount < 20)
            bookPriceClass = "green";
        return bookPriceClass;
    };

    calcBookAge = () => {
        const bookPubDate = this.state.book.publishedDate;
        const thisYear = new Date().getFullYear();
        const diff = thisYear - bookPubDate;
        return diff > 10 ? "Veteran Book" : "New!";
    };

    render() {
        if (!this.state.book) return <div>Loading...</div>;


        return (
            <div className="modal-content">
                <span
                    className="close"
                    onClick={() => {
                        this.props.history.push("/book");
                    }}
                >
                    &times;
                </span>
                <div className="book-title">{this.state.book.title}</div>
                <div className="book-authors">
                    <span>by </span>
                    {this.state.book.authors.map((author, idx) => {
                        return <span key={idx}>{author} </span>;
                    })}
                </div>
                <div className="book-subtitle">{this.state.book.subtitle}</div>
                <div className="book-img">
                    <img
                        className="thumbnail"
                        src={this.state.book.thumbnail}
                    />

                    <div className="for-sale">
                        {this.state.book.listPrice.isOnSale && (
                            <img src="apps\Books\assets\img\for-sale.gif"/>
                        )}
                    </div>
                </div>
                <div className="badges">
                    <div className="date badge">{this.calcBookAge()}</div>
                    <div className="book-pages badge">
                        {this.state.book.pageCount > 500 && (
                            <span>Long Reading</span>
                        )}
                        {this.state.book.pageCount > 200 &&
                            this.state.book.pageCount < 500 && (
                                <span>Decent Reading</span>
                            )}
                        {this.state.book.pageCount < 100 && (
                            <span>Light Reading</span>
                        )}
                    </div>
                    <div className="book-categories">
                        {this.state.book.categories.map((category, idx) => {
                            return (
                                <span className="badge" key={idx}>
                                    {category}{" "}
                                </span>
                            );
                        })}
                    </div>
                </div>
                <div className={`price ${this.getBookPriceClass()}`}>
                    {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: this.state.book.listPrice.currencyCode,
                    }).format(this.state.book.listPrice.amount)}
                </div>

                <div className="description">
                    <LongTxt
                        text={this.state.book.description}
                        isLongTxtShown={this.state.isLongTxtShown}
                    />
                    <span
                        className="read"
                        onClick={() => {
                            this.setState({
                                isLongTxtShown: !this.state.isLongTxtShown,
                            });
                        }}
                    >
                        read {this.state.isLongTxtShown ? "less" : "more"}
                    </span>
                </div>
                <BookReview bookId={this.state.book.id} />
                {this.state.bookNegsIds &&
                <div className="next-prev-book">
                    <Link to={`/book/${this.state.bookNegsIds.prevBookId}`}><button>Previous Book</button></Link>
                    <Link to={`/book/${this.state.bookNegsIds.nextBookId}`}><button>Next Book</button></Link>
                </div>
                }
            </div>
        );
    }
}
