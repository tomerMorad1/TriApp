import { BookService } from "../services/book.service.js"

const { Link } = ReactRouterDOM;

export function BookPreview({ book }) {

    return (
        <Link to={`/book/${book.id}`}>
            <div className="book-preview" >

                <h2>{book.title}</h2>
                {/* <h3>{book.subtitle}</h3> */}
                <h3>Price : {book.listPrice.amount} {BookService.getPriceCurr(book.listPrice.currencyCode)}</h3>
                <h3>Published : {+book.publishedDate}</h3>
                <div className="book-img">
                    {book.listPrice.isOnSale && <div className="sale-img"><img src="../../img/sale.png" /></div>}
                    <img src={book.thumbnail} />
                </div>
            </div>
        </Link>
    )
}
