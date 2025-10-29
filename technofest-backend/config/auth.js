// This file can be used to manage authentication-related constants.
// For this project, the JWT secret is stored in the .env file for security.

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    JWT_SECRET
};