import { BookPreview } from "./BookPreview.jsx";
export function BookList({books}) {
    return books.map((book) => {
        return (
            <li className="book-item" key={book.id}>
                <BookPreview book={book} />
            </li>
        )
    });
}
