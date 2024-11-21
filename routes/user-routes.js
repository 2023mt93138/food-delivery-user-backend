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

// Get customer all orders
router.get('/orders', verifyToken, userController.fetchOrdersByCustomerId);

// Get customer order by ID
router.get('/orders/:orderId', verifyToken, userController.fetchOrderById);

// Get customer by ID
router.get('/:customerId', userController.fetchUserById);

module.exports = router;
