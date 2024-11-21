require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sequelize = require('./config/database');
const userRoutes = require('./routes/user-routes');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(morgan('dev')); // Logging requests
app.use(bodyParser.json()); // Parse JSON requests

// Set up routes
app.use('/api/v1/user', userRoutes);

// Swagger UI for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Catch-all route for undefined routes (404 error handler)
app.all('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found',
        error: `The requested route ${req.originalUrl} does not exist on this server.`,
    });
});

// Global error handler (optional for handling server errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message,
    });
});

// Connect to database and start the server
sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});
