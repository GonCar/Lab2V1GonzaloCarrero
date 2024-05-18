const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./books.db')

let sql = "";

let booksArray = [
    { name: "The Hobbit", date: 1937, genre: "Fantasy", author: "J.R.R. Tolkien" },
    { name: "War and Peace", date: 1865, genre: "Philosophy", author: "Leo Tolstoy" },
    { name: "IT", date: 1986, genre: "Horror", author: "Stephen King" },
    { name: "The Great Gatsby", date: 1925, genre: "Drama", author: "F. Scott Fitzgerald" }

];

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS books (bookId INTEGER PRIMARY KEY, name TEXT, genre TEXT, date INTEGER, author TEXT)');
    /*
    booksArray.forEach(book => {
        db.run('INSERT OR IGNORE INTO books (name, genre, date, author) VALUES (?, ?, ?, ?)',
            [book.name, book.genre, book.date, book.author],
            function(err) {
                if (err) {
                    console.error('Error inserting data:', err.message);
                }
            }
        );
    });*/
});

const getBooks = (callback) => {
    db.all('SELECT * FROM books', (err, rows) => {
        if (err) {
            console.error('Error retrieving books:', err.message);
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to get a book by its name
const getBookByName = (name, callback) => {
    db.get('SELECT * FROM books WHERE name = ?', [name], (err, row) => {
        if (err) {
            console.error('Error retrieving book:', err.message);
            callback(err, null);
        } else {
            callback(null, row);
        }
    });
};

module.exports= {
    db,
    getBooks,
    getBookByName
}