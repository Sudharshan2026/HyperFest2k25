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