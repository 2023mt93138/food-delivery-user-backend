const { Sequelize } = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize('food_delivery_system', 'root', 'new_password', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
