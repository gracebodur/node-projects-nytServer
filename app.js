const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(morgan('common')) //common format?
    const books = require('./books-data.js') //require the array of books

app.get('/books', (req, res) => {
    const { search = " ", sort} = req.query

    if (sort) {
        if(!['title', 'rank'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of the title or rank')
        }
    }

    let results = books
        .filter(book =>
            book
                .title
                .toLowerCase()
                .includes(search.toLowerCase()))

    if(sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a [sort] < b[sort] ? -1 : 0
        })
    }
    res
        // .json(books) //return the entire list of books first
        .json(results)
})

app.listen(8000, () => {
    console.log('Server started on PORT 8000')
})