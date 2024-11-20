const express = require('express');
const { verifyToken } = require('../middlewares/auth-middleware');
const userController = require('../controllers/user-controller');
const validate = require('../middlewares/validator');
const { createUserSchema, loginSchema } = require('../validation/user-validation');

const router = express.Router();

// Register a new customer
router.post('/register', validate(createUserSchema), userController.registerUser);

// Login
router.post('/login', validate(loginSchema), userController.loginUser);

// User Profile
router.get('/profile', verifyToken, userController.fetchUserProfile);

module.exports = router;
