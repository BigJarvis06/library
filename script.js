const myLibrary = [];

function Book(title, author, pages, status) {
    if (!new.target) {
        throw Error('make sure to use New');
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = crypto.randomUUID();
    this.info = function() {
        console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`)
    }
}

function addBookToLibrary(title, author, pages, status) {
    let newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
}

function displayBooks() {
    for (const book of myLibrary) {
            const newDiv = document.createElement('div');
            newDiv.classList.add('book');
            newDiv.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.status}`;
            const body = document.querySelector('body');
            body.appendChild(newDiv);
    }
}


    
