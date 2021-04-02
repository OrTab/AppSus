const { Link } = ReactRouterDOM;

export function BookPreview({ book }) {
    function renderPrice() {
        const currCode = book.listPrice.currencyCode
        const number = book.listPrice.amount
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: currCode }).format(number)
    };
    
    return (
        <Link to={`/book/${book.id}`}>
        <div className="book">
            <div className="title">{book.title}</div>
            <div className="price">
                <span>{renderPrice()}</span>
            </div>
        </div>
        </Link>
    );
}
