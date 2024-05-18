const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs').promises;  // Using the promises API
const path = require('path');

const PORT = 8080;

app.use(cors({ origin: "*" }));
app.use(express.json());  // Middleware to parse JSON bodies

// Function to read books data from JSON file
async function readBooksData() {
    try {
        const data = await fs.readFile(path.resolve(__dirname, 'books.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading books.json:', error);
        throw error;
    }
}

// Function to write books data to JSON file
async function writeBooksData(data) {
    try {
        await fs.writeFile(path.resolve(__dirname, 'books.json'), JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing to books.json:', error);
        throw error;
    }
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server active on port: http://localhost:${PORT}/`);
});

// Route to get all books data
app.get('/dataParam', async (req, res) => {
    try {
        const booksData = await readBooksData();
        res.json(booksData);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Route to add a book
app.post('/addBook', async (req, res) => {
    const newBook = req.body;

    try {
        const booksData = await readBooksData();
        booksData.push(newBook);
        await writeBooksData(booksData);
        res.send('Book added successfully');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Route to delete a book
app.delete('/deleteBook', async (req, res) => {
    const bookToDelete = req.body;
    console.log(bookToDelete);

    try {
        const booksData = await readBooksData();

        const index = booksData.findIndex(book => 
            book.name === bookToDelete.name &&
            book.genre === bookToDelete.genre &&
            book.date === bookToDelete.date &&
            book.author === bookToDelete.author
        );

        if (index !== -1) {
            booksData.splice(index, 1);
            await writeBooksData(booksData);
            console.log('Book deleted successfully');
            res.status(200).send('Book deleted successfully');
        } else {
            console.error('Book not found');
            res.status(404).send('Book not found');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('Internal Server Error');
    }
});
