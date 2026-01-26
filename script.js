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

function toggleHidden(target) {
    target.classList.toggle('hidden');
}

function userAddBook() {
    const books = document.querySelectorAll('.book');
    if (books) {
        books.forEach(book => {
            toggleHidden(book);
        }) 
    } else {
    
    }
    const addBook = document.querySelector('.addBook');
    toggleHidden(addBook);

    const newForm = document.createElement('form');
        newForm.setAttribute('id', 'myForm');

    const titleInput = document.createElement('input');
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('name', 'title');
        titleInput.setAttribute('placeholder', 'Book Title');

    const authorInput = document.createElement('input');
        authorInput.setAttribute('type', 'text');
        authorInput.setAttribute('name', 'author');
        authorInput.setAttribute('placeholder', 'Author');

    const pagesInput = document.createElement('input');
        pagesInput.setAttribute('type', 'text');
        pagesInput.setAttribute('name', 'pageNum');
        pagesInput.setAttribute('placeholder', 'Number of Pages')

    const readInput = document.createElement('input');
        readInput.setAttribute('name', 'readStatus')
        readInput.setAttribute('type', 'checkbox');

    const submit = document.createElement('button');
        submit.setAttribute('type', 'submit');
        submit.textContent = 'Submit';

    const cancel = document.createElement('button');
        cancel.classList.add('cancelButton');
        cancel.textContent = 'Cancel';

    newForm.appendChild(titleInput);
    newForm.appendChild(authorInput);
    newForm.appendChild(pagesInput);
    newForm.appendChild(readInput);
    newForm.appendChild(submit);
    newForm.appendChild(cancel);
    document.body.appendChild(newForm);
}
    
