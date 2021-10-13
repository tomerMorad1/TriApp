export const BookApiService = {
    getOptions,
}

function getOptions(searchBy = 'hungergames', cb) {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchBy}`)
        .then(res => {
            const fiveOptions = res.data.items.slice(0, 5);
            cb(fiveOptions)
        })
}