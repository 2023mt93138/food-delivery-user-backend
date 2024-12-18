const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const secretKey = process.env.JWT_SECRET_KEY;

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;
        const dbUser = await User.findByPk(userId);
        if (!dbUser) return res.status(404).json({ message: 'User not found' });
        if (dbUser?.status?.toLowerCase() !== 'active') return res.status(400).json({ message: 'User is not active' });
        req.user = dbUser;
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).send('Invalid Token');
    }
};

module.exports = { verifyToken };
