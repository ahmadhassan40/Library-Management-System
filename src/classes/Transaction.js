class Transaction {
    constructor(user, bookTitle, type) {
        this.user = user;
        this.bookTitle = bookTitle;
        this.type = type;  // 'borrow' or 'return'
        this.date = new Date();
    }
}

module.exports = Transaction;