import { bookService } from "../services/book-service.js";
import { BookList } from "../cmps/BookList.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookAdd } from "../cmps/BookAdd.jsx";
import { eventBusService } from '../../../services/eventBusService.js'

export class BookApp extends React.Component {
    state = {
        books: [],
        filterBy: { name: "", price: 200 },
        msg: "",
        isMsgShown:false
    };

    componentDidMount = () => {
        this.loadBooks();
        this.unsubscribe = eventBusService.on("showMsg", (msg) => {
            this.setState({ msg,isMsgShown:true });
        });
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    loadBooks = () => {
        bookService.query().then((books) => {
            this.setState({ books });
        });
    };

    onSetFilter = (filterBy) => {
        this.setState({ filterBy });
    };

    getBooksForDisplay = () => {
        const { filterBy } = this.state;
        const FilteredBooks = this.state.books.filter((book) => {
            return book.title
                .toLowerCase()
                .includes(filterBy.name.toLowerCase());
        });
        return FilteredBooks.filter((book) => {
            return book.listPrice.amount <= filterBy.price;
        });
    };

    render() {
        const { msg,isMsgShown } = this.state;
        return (
            <section className="book-app">
                <BookFilter
                    filterBy={this.state.filterBy}
                    onSetFilter={this.onSetFilter}
                />
                <main className="main-view">
                    <ul className="book-list">
                        <BookList books={this.getBooksForDisplay()} />
                    </ul>
                    <BookAdd onAddBook={this.loadBooks} />
                </main>
                {msg&&isMsgShown && (
                    <div className="user-msg">
                        <span className="close" onClick={()=>this.setState({isMsgShown:false})}>&times;</span>
                        {msg}
                    </div>
                )}
            </section>
        );
    }
}
