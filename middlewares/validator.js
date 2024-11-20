const Joi = require('joi');

// Function to validate the request body with the Joi schema
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({
                message: 'Validation error',
                errors: errorMessages
            });
        }
        next();
    };
};

module.exports = validate;
