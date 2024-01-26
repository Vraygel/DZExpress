const express = require('express')
const { v4: uuid } = require('uuid')

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())


const books = [
    {
      id: uuid(),
      title: "Book 1",
      description: "Description 1",
      authors: "Author 1",
      favorite: "Yes",
      fileCover: "cover1.jpg",
      fileName: "book1.pdf"
    },
  ]

app.post('/api/user/login', (req, res) => {
  res.status(201)
  res.json({ id: 1, mail: "test@mail.ru" })
})

app.get('/api/books', (req, res) => {
  res.json(books)
})

app.get('/api/books/:id', (req, res) => {
  const bookId = req.params.id
  const book = books.find(book => book.id === bookId)
  if (book) {
    res.json(book)
  } else {
    res.status(404)
    res.json({ error: 'Book not found' })
  }
})

app.post('/api/books', (req, res) => {
  const newBook = req.body
  books.push(newBook)
  res.status(201)
  res.json(newBook)
});

app.put('/api/books/:id', (req, res) => {
  const bookId = req.params.id
  const updatedBook = req.body
  const index = books.findIndex(book => book.id === bookId)
  if (index !== -1) {
    books[index] = updatedBook
    res.json(updatedBook)
  } else {
    res.status(404)
  }
});

app.delete('/api/books/:id', (req, res) => {
  const bookId = req.params.id
  const index = books.findIndex(book => book.id === bookId)
  if (index !== -1) {
    const deletedBook = books.splice(index, 1)[0]
    res.json('ok')
  } else {
    res.status(404)
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

