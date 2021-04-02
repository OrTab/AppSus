import { googleService } from "../services/google-book-service.js";
import { storageService } from "../services/storageService.js";
import { bookService } from "../services/book-service.js";
import { eventBusService } from '../../../services/eventBusService.js';

export class BookAdd extends React.Component {
    state = {
        results: "",
        keyword: "",
    };

    componentDidMount = () => {
        // this.setState({ results: storageService.load("searchResults") }, ()=>{console.log(this.state.results);});
    };

    handleChange = (ev) => {
        this.setState({ keyword: ev.target.value }, () => {
            googleService
                .getGoogleBooks(this.state.keyword)
                .then((res) => {
                    this.setState({ results: res.items });
                })
                .catch((err) => console.log(err));
        });
    };

    onBookAdd = (googleBook) => {
        bookService
            .addGoogleBook(googleBook)
            .then((title) => eventBusService.emit('showMsg', `${title} is saved!`));
        this.props.onAddBook();
        
    };

    render() {
        const { results } = this.state;
        return (
            <div className="add-book">
                <h2>Search New Book</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Search"
                    onChange={this.handleChange}
                />
                {this.state.results && (
                    <ul className="search-results">
                        <h4>Search results for "{this.state.keyword}":</h4>
                        {results.map((item) => {
                            return (
                                <li key={item.id}>
                                    <span>
                                        {item.volumeInfo.title.substring(0, 30)}
                                    </span>
                                    <img
                                        onClick={() => {
                                            this.onBookAdd(item);
                                        }}
                                        src="apps\Books\assets\img\addicon.png"
                                        width="20"
                                        title="add book"
                                    />
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        );
    }
}
