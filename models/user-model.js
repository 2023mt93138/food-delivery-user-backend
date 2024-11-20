const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { 
        type: DataTypes.ENUM,
        values: ['customer'],
        allowNull: false
    },
    status: { 
        type: DataTypes.ENUM,
        values: ['active', 'inactive'],
        defaultValue: 'active',
        allowNull: false
    }
}, {
    timestamps: true,
    freezeTableName: true  // Prevent Sequelize from pluralizing the table name
});

module.exports = User;