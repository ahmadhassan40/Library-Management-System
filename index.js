const Library = require('./src/classes/Library');
const Book = require('./src/classes/Book');
const User = require('./src/classes/User');

try {
    const library = new Library();

    // Create some books
    const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925);
    const book2 = new Book("1984", "George Orwell", 1949);
    const book3 = new Book("To Kill a Mockingbird", "Harper Lee", 1960);
    const book4 = new Book("Pride and Prejudice", "Jane Austen", 1813);
    const book5 = new Book("The Catcher in the Rye", "J.D. Salinger", 1951);

    // Add books to the library
    library.addBook(book1);
    library.addBook(book2);
    library.addBook(book3);
    library.addBook(book4);
    library.addBook(book5);

    // Display available books before any borrowing
    console.log("\nAvailable books:");
    library.getAvailableBooks().forEach(book => console.log(`${book.title} by ${book.author}`));

    // Create users
    const user1 = new User("Ahmad", "ahmad@gmail.com");
    const user2 = new User("Umer", "umer@gmail.com");

    // User 1 borrows "1984" 
    console.log("\nBorrowed books:");
    library.borrowBook("1984", user1);

    //  User 2 borrows "To Kill a Mockingbird"
    library.borrowBook("To Kill a Mockingbird", user2);

    // Display available books after borrowing
    console.log("\nAvailable books after borrowing:");
    library.getAvailableBooks().forEach(book => console.log(`${book.title} by ${book.author}`));

    // User 1 returns "1984"
    console.log("\nReturned books:");
    library.returnBook(book2, user1);

    // User 2 returns "The Catcher in the Rye"
    library.returnBook(book5, user2);

    // Display available books after returning
    console.log("\nAvailable books after returning:");
    library.getAvailableBooks().forEach(book => console.log(`${book.title} by ${book.author}`));

    // Display transaction logs
    console.log("\nTransaction logs:");
    library.getTransactions().forEach(transaction => {
        console.log(`${transaction.user.name} ${transaction.type}ed "${transaction.bookTitle}" on ${transaction.date}`);
    });

} catch (error) {
    console.error("An error occurred:", error.message);
}
