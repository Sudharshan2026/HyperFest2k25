const jwt = require('jsonwebtoken');

// Middleware to authenticate the JWT token
const authenticateToken = (req, res, next) => {
    // Get the authorization header from the request
    const authHeader = req.headers['authorization'];
    // The token is typically in the format "Bearer TOKEN"
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        // If no token is provided, deny access
        return res.status(401).json({ message: 'Authentication token missing.' });
    }

    // Verify the token using the secret key from the .env file
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // If the token is invalid or expired, deny access
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }
        // If the token is valid, attach the user payload to the request
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
};

// Middleware to authorize an admin role
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'super') {
        return res.status(403).json({ message: 'Access denied. Super Admin privileges required.' });
    }
    next();
};

// Middleware to authorize an organizer or super admin
const authorizeOrganizer = (req, res, next) => {
    if (req.user.role !== 'organizer' && req.user.role !== 'super') {
        return res.status(403).json({ message: 'Access denied. Organizer or Super Admin privileges required.' });
    }
    next();
};

module.exports = {
    authenticateToken,
    authorizeAdmin,
    authorizeOrganizer
};