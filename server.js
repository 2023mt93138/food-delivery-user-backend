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

// Connect to database and start the server
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
