let getData = document.getElementById("dataButton");
let addData = document.getElementById("addButton");
let deleteData = document.getElementById("deleteButton");

async function getBooks() {
    try {
        const response = await fetch('http://localhost:8080/dataParam');
        const data = await response.json(); // Parse response as JSON
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function addBook(newBookData) {
    try {
        // Send a POST request to the server
        const response = await fetch('http://localhost:8080/addBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBookData)
        });

        if (!response.ok) {
            throw new Error('Failed to add book');
        }

        console.log('Book added successfully');
    } catch (error) {
        console.error('Error adding book:', error);
    }
}

async function deleteBook(bookData){
    try {
        // Send a POST request to the server
        const response = await fetch('http://localhost:8080/deleteBook', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });

        if (!response.ok) {
            throw new Error('Failed to delete book');
        }

    } catch (error) {
        console.error('Error deleting book:', error);
    }
}

getData.addEventListener('click', event => {

    getBooks()
        .then(data => {
            document.getElementById("showBooks").innerHTML = formatBooksData(data);
        })
        .catch(error => {
            console.error(error);
        });
    
});

addData.addEventListener('click', event => {
    // add data here
    const name = nameText.value
    var category = categoryText.value
    var date = dateText.value
    var author = authorText.value

    // Here you should make the fetch to the rest api
    const newBookData = { name, category, date, author };
    console.log(newBookData);

    addBook(newBookData); 
});

deleteData.addEventListener('click', event => {
    // delete data here
    const name = nameText.value
    var category = categoryText.value
    var date = dateText.value
    var author = authorText.value

    // Here you should make the fetch to the rest api
    const bookData = { name, category, date, author };
    deleteBook(bookData);
 
});


function formatBooksData(books) {
    return books.map(book => {
        return `
            <div>
                <h2>${book.name}</h2>
                <p>Category: ${book.category}</p>
                <p>Date: ${book.date}</p>
                <p>Author: ${book.author}</p>
            </div>
        `;
    }).join('');
}