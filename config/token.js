const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || require('./secret');

module.exports = class {
    static create(user, expiry) {
        return jwt.sign({user}, secret, { expiresIn: expiry || "10h" });
    }
}