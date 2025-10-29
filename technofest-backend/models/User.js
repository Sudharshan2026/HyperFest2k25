// technofest-backend/models/User.js

// This file would typically define the schema for an ORM like Sequelize or Mongoose.
// Since the controller is using raw MySQL and the 'users' table, 
// the main change is ensuring the database schema is updated.

// If you were using Sequelize, it might look like this:

/*
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming db.js exports a Sequelize instance

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    // ... other fields
    phone_number: { type: DataTypes.STRING }, 
    otp: { type: DataTypes.STRING(6), allowNull: true },
    otp_expires_at: { type: DataTypes.DATE, allowNull: true }
}, {
    tableName: 'users',
    timestamps: false 
});

module.exports = User;
*/

// Since you are using raw SQL, we will just export the table name for consistency:
module.exports = {
    tableName: 'users'
};