class Transaction {
    constructor(user, book, type) {  // Store full book object instead of just title
        this.user = user;
        this.book = book; // Store the full book object
        this.type = type;  // 'borrow' or 'return'
        this.date = new Date();
    }
}

module.exports = Transaction;
