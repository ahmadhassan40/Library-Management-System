class User {
    constructor(name, email) {
        if (!name || !email) throw new Error("User must have a name and email.");
        this.name = name;
        this.email = email;
    }
}

module.exports = User;