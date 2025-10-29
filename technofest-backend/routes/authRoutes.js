const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/verify-otp', authController.verifyOTP);
router.post('/google-login', authController.googleLogin);
router.post('/admin/login', authController.adminLogin);

// --- FIX: Add a new protected route to get the user's profile ---
// This will handle GET requests to /api/auth/profile
router.get('/profile', authenticateToken, authController.getProfile);

module.exports = router;