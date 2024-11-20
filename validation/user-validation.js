const Joi = require('joi');

// Schema for creating a user
const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('customer').required(),
    status: Joi.string().valid('active', 'inactive').default('active')
});

// Schema for updating a user
const loginSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6),
});

module.exports = { createUserSchema, loginSchema };
