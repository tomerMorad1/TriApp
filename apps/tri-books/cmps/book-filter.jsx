export class BookFilter extends React.Component {
    state = {
        filterBy: {
            title: '',
            minPrice: '',
            maxPrice: '',
        },
    };

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        });
    };

    onFilter = (ev) => {
        ev.preventDefault();
        this.props.onSetFilter(this.state.filterBy)
    };

    render() {
        const { title, minPrice, maxPrice } = this.state.filterBy;
        return (
            <form className='book-filter' onSubmit={this.onFilter}>
                <div className='filter'>
                    <label htmlFor='by-title'>
                        <div className='search-filter'>
                            <img src="././img/search-book.png" />
                        </div>
                        By title :
                 </label>
                    <input name='title' id='by-title' type='text'
                        placeholder='Title' value={title} onChange={this.handleChange}
                    />
                </div>
                <div className='filter'>
                    <label htmlFor='min-price'>
                        <div className='search-filter'>
                            <img src='././img/search-book.png' />
                        </div>
                        Min Price :
                 </label>
                    <input name='minPrice' id='min-price' type='number'
                        placeholder='Min Price' value={minPrice} onChange={this.handleChange}
                    />
                </div>
                <div className='filter'>
                    <label htmlFor='max-price'>
                        <div className='search-filter'>
                            <img src='././img/search-book.png' />
                        </div>
                        Max Price :
                 </label>
                    <input name='maxPrice' id='max-price' type='number'
                        placeholder='Max Price' value={maxPrice} onChange={this.handleChange}
                    />
                </div>
            </form>
        );
    }
}
