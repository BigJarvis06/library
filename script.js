const myLibrary = [];

let myForm;
let cancelButton;
let addBook = document.querySelector('.addBook');
let body = document.body;
let bookCards = document.querySelector('.bookWrapper');

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

function removeBook(id) {
    for (const book of myLibrary) {
        if (book.id === id) {
            const bookIndex = myLibrary.indexOf(book);
            myLibrary.splice(bookIndex, 1);
        }
    }
}

function addBookToLibrary(title, author, pages, status) {
    let newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
}

function displayBooks() {
    const books = document.querySelectorAll('.book');
    books.forEach(book => {
        book.remove();
    })
    for (const book of myLibrary) {
            const currentId = book.id;
            const newDiv = document.createElement('div');
            newDiv.setAttribute('id', currentId);
            newDiv.classList.add('book');
            if (!book.author && !book.pages && !book.status) {
                newDiv.textContent = `${book.title}`;
            } else if (!book.pages && !book.status) {
                newDiv.textContent = `${book.title} by ${book.author}`;
            } else if (!book.author && !book.pages) {
                newDiv.textContent = `${book.title}, ${book.status}`;
            } else if (!book.status && !book.author) {
                newDiv.textContent = `${book.title}, ${book.pages} pages`;
            } else if (!book.pages) {
                newDiv.textContent = `${book.title} by ${book.author}, ${book.status}`;
            } else if (!book.status) {
                newDiv.textContent = `${book.title} by ${book.author}, ${book.pages} pages`;
            } else {
                newDiv.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.status}`;
            }
            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('id', 'deleteButton');
            newDiv.appendChild(deleteButton);
            bookCards.appendChild(newDiv);
    }
}

bookCards.addEventListener('click', function(event) {
    if (event.target.id === "deleteButton") {
        const card = event.target.closest('.book');
        const bookId = card.id;
        removeBook(bookId);
        displayBooks();
    }
})

function toggleHidden(target) {
    target.classList.toggle('hidden');
}

function userAddBook() {
    const books = document.querySelectorAll('.book');
    const hasBooks = document.querySelector('.book');
    if (hasBooks) {
        books.forEach(book => {
            toggleHidden(book);
        }) 
    } 

    toggleHidden(addBook);

    myForm = document.createElement('form');
        myForm.setAttribute('id', 'myForm');

    const titleInput = document.createElement('input');
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('name', 'title');
        titleInput.setAttribute('placeholder', 'Book Title');

    const authorInput = document.createElement('input');
        authorInput.setAttribute('type', 'text');
        authorInput.setAttribute('name', 'author');
        authorInput.setAttribute('placeholder', 'Author');

    const pagesInput = document.createElement('input');
        pagesInput.setAttribute('type', 'number');
        pagesInput.setAttribute('name', 'pageNum');
        pagesInput.setAttribute('placeholder', 'Number of Pages')

    const readInput = document.createElement('input');
        readInput.setAttribute('name', 'readStatus')
        readInput.setAttribute('type', 'checkbox');

    const submit = document.createElement('button');
        submit.setAttribute('type', 'submit');
        submit.textContent = 'Submit';

    cancelButton = document.createElement('button');
        cancelButton.classList.add('cancelButton');
        cancelButton.textContent = 'Cancel';

    myForm.appendChild(titleInput);
    myForm.appendChild(authorInput);
    myForm.appendChild(pagesInput);
    myForm.appendChild(readInput);
    myForm.appendChild(submit);
    myForm.appendChild(cancelButton);
    document.body.appendChild(myForm);

    cancelButton.addEventListener("click", function (event) {
        event.preventDefault();
        if (myForm) {
            myForm.remove();
            if (books) {
                books.forEach(book => {
                    toggleHidden(book);
                }) 
            } 
            toggleHidden(addBook);
        }
    })

    myForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(myForm);
        const dataObj = Object.fromEntries(formData.entries());
        let pageNum = dataObj.pageNum;
        let pagesStr = pageNum.toString();
        let readStatus = dataObj.readStatus;
        if (!readStatus) {
            readStatus = "not read";
        } else {
            readStatus = "read";
        }
        if (!dataObj.title) {
            alert('Please provide a title');
        } else {
        addBookToLibrary(dataObj.title, dataObj.author, pagesStr, readStatus);
        if (myForm) {
            myForm.remove();
            if (books) {
                displayBooks()
            } 
            toggleHidden(addBook);
        }
    }
    })
}

addBook.addEventListener("click", function (event) {
    event.preventDefault();
    userAddBook();
});