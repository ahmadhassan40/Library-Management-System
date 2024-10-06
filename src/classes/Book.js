class Book {
    constructor(title, author, year) {
        if (!title || !author) throw new Error("Book must have a title and author.");
        this.title = title;
        this.author = author;
        this.year = year;
    }
}

module.exports = Book;