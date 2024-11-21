const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secretKey = process.env.JWT_SECRET_KEY;

// Function to hash a password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // Generate salt with a round of 10 (security level)
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
    return hashedPassword;
};

const comparePassword = async (inputPassword, dbPassword) => {
    try {
        const isMatch = await bcrypt.compare(inputPassword, dbPassword);
        return isMatch; // Returns true if the passwords match, false otherwise
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
}

function generateAuthToken(userId) {
    const token = jwt.sign({ userId }, secretKey, {
        expiresIn: '1h'
    });
    return token;
}

module.exports = { hashPassword, comparePassword, generateAuthToken };
