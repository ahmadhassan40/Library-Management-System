const Transaction = require('./Transaction');

class Library {
    constructor() {
        this.books = [];     // List of available books
        this.transactions = [];
    }
    addBook(book) {  
        this.books.push(book);     // Initially, the book is also available
    }

    borrowBook(bookTitle, user) {
        const bookIndex = this.books.findIndex(book => book.title === bookTitle);
        if (bookIndex === -1) throw new Error(`"${bookTitle}" is not available.`);

        const book = this.books[bookIndex]; 
        this.transactions.push(new Transaction(user, bookTitle, 'borrow'));
        this.books.splice(bookIndex, 1); // Remove from available books after borrowing
        console.log(`${user.name} borrowed "${bookTitle}"`);
    }

    returnBook(book, user) {
        this.books.push(book); // Add back to available books
        this.transactions.push(new Transaction(user, book.title, 'return'));
        console.log(`${user.name} returned "${book.title}"`);
    }

    getAvailableBooks() {
        return this.books;
    }

    getTransactions() {
        return this.transactions;
    }
}

module.exports = Library;