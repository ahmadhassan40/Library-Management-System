class Library {
    constructor() {
        this.books = [];
        this.transactions = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    getAvailableBooks() {
        return this.books.filter(book => !book.isBorrowed);
    }

    borrowBook(bookTitle, user) {
        const book = this.books.find(b => b.title === bookTitle);
        if (!book) {
            throw new Error("Book not found.");
        }
        if (book.isBorrowed) {
            throw new Error("Book is already borrowed.");
        }
        book.isBorrowed = true; // Mark the book as borrowed
        this.transactions.push({
            user: user,
            bookTitle: book.title,
            type: "borrow",
            date: new Date().toLocaleString()
        });
    }

    returnBook(book, user) {
        const existingBook = this.books.find(b => b.title === book.title);
        if (!existingBook) {
            throw new Error("Book not found.");
        }
        if (!existingBook.isBorrowed) {
            throw new Error("This book was not borrowed.");
        }
        existingBook.isBorrowed = false; // Mark the book as available
        this.transactions.push({
            user: user,
            bookTitle: existingBook.title,
            type: "return",
            date: new Date().toLocaleString()
        });
    }

    getTransactions() {
        return this.transactions;
    }
}

module.exports = Library;
