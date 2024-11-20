const User = require('../models/user-model');
const { hashPassword, comparePassword, generateAuthToken } = require('../utils/auth');

// Register a new User
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, status = 'active' } = req.body;
        const user = await User.findOne({ where: { email }});
        if (user) return res.status(400).json({ message: `${role.toLowerCase()} already exists` });
        const hashedPassword = await hashPassword(password);
        const newCustomer = await User.create({
            name, email, password: hashedPassword, role, status
        });
        
        res.status(201).json({ message: 'User added successfully', user: newCustomer });
    } catch (err) {
        res.status(500).json({ message: 'Error in registration', error: err.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email }});
        if (!user) return res.status(404).json({ message: 'User email not found' });
        const isMatch = comparePassword(password, user.password);
        if (!isMatch) return res.status(404).json({ message: 'Password is incorrect' });
        // Generate a JWT token and send it to the client
        const token = generateAuthToken(user.id);
        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (err) {
        res.status(500).json({ message: 'Error updating User', error: err.message });
    }
};

// User Profile
const fetchUserProfile = (req, res) => {
    req.user = req.user.toJSON();
    delete req.user["password"];
    res.status(200).json({ message: 'Success', user: req.user });
};

module.exports = { 
    registerUser, 
    loginUser,
    fetchUserProfile,
};
