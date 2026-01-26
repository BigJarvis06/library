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