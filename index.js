const readline = require('readline');
const fs = require('fs');
const Library = require('./src/classes/Library');
const Book = require('./src/classes/Book');
const User = require('./src/classes/User');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const library = new Library();

// Pre-defined books for the library
const preDefinedBooks = [
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925),
    new Book("1984", "George Orwell", 1949),
    new Book("To Kill a Mockingbird", "Harper Lee", 1960),
    new Book("Pride and Prejudice", "Jane Austen", 1813),
    new Book("The Catcher in the Rye", "J.D. Salinger", 1951),
];

// Add predefined books to the library
preDefinedBooks.forEach(book => library.addBook(book));

const usersFilePath = './users.json';
let users = new Map(); // Store users in memory

// Load existing users from the JSON file
function loadUsers() {
    if (fs.existsSync(usersFilePath)) {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        const userData = JSON.parse(data);
        userData.forEach(user => {
            const loadedUser = new User(user.name, user.email);
            users.set(user.name, loadedUser);
        });
    }
}

function saveUser(user) {
    const userData = Array.from(users.values()).map(u => ({
        name: u.name,
        email: u.email
    }));

    fs.writeFileSync(usersFilePath, JSON.stringify(userData, null, 2), 'utf8');
}

function showAvailableBooks() {
    console.log("\nAvailable books:");
    library.getAvailableBooks().forEach(book => console.log(`${book.title} by ${book.author}`));
}

function showTransactionLogs() {
    console.log("\nTransaction logs:");
    const transactions = library.getTransactions();
    if (transactions.length === 0) {
        console.log("No transactions have occurred yet.");
    } else {
        transactions.forEach(transaction => {
            console.log(`${transaction.user.name} ${transaction.type}ed "${transaction.bookTitle}" on ${transaction.date}`);
        });
    }
}

function showMenu() {
    showAvailableBooks();
    
    console.log("\nOptions:");
    console.log("1. Borrow a book");
    console.log("2. Return a book");
    console.log("3. Exit");
}

function handleUserInput() {
    rl.question("Are you registered? (yes/no): ", (response) => {
        if (response.toLowerCase() === 'yes') {
            rl.question("Enter your name: ", (name) => {
                if (!users.has(name)) {
                    console.log("User not found. Please register first.");
                    handleUserInput();
                } else {
                    showMenuOptions(name);
                }
            });
        } else {
            registerUser();
        }
    });
}

function registerUser() {
    rl.question("Enter your name: ", (name) => {
        rl.question("Enter your email: ", (email) => {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                console.log("Invalid email format. Please try again.");
                registerUser();
                return;
            }
            // Store user
            const user = new User(name, email);
            users.set(name, user);
            saveUser(user); // Save user to the JSON file
            console.log(`Registered successfully as ${name}.`);
            showMenuOptions(name);
        });
    });
}

function showMenuOptions(name) {
    showMenu();
    
    rl.question("Choose an option (1/2/3): ", (option) => {
        switch (option) {
            case '1':
                rl.question("Enter the title of the book to borrow: ", (bookTitle) => {
                    try {
                        library.borrowBook(bookTitle, users.get(name));
                        showMenuOptions(name); // Show menu again after borrowing
                    } catch (error) {
                        console.error(error.message);
                        showMenuOptions(name); // Show menu again on error
                    }
                });
                break;

            case '2':
                rl.question("Enter the title of the book to return: ", (bookTitle) => {
                    const book = new Book(bookTitle, "Unknown"); // Create a book instance to return
                    try {
                        library.returnBook(book, users.get(name));
                        showMenuOptions(name); // Show menu again after returning
                    } catch (error) {
                        console.error(error.message);
                        showMenuOptions(name); // Show menu again on error
                    }
                });
                break;

            case '3':
                // Display available books and transaction logs before exiting
                console.log("\nExiting...");
                showAvailableBooks();
                showTransactionLogs();
                rl.close(); // Close the readline interface
                break;

            default:
                console.log("Invalid option. Please try again.");
                showMenuOptions(name);
                break;
        }
    });
}

// Load users when starting the application
loadUsers();

// Start the application
handleUserInput();
