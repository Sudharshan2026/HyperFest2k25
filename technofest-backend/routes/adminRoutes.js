const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {
  authenticateToken,
  authorizeOrganizer,
  authorizeAdmin
} = require('../middleware/authMiddleware');

// Admin stats
router.get('/stats', authenticateToken, authorizeOrganizer, adminController.getAdminStats);

// Registrations
router.get('/registrations', authenticateToken, authorizeOrganizer, adminController.getAllRegistrations);
router.get('/registrations/:regId', authenticateToken, authorizeOrganizer, adminController.getRegistrationById);
router.delete('/registrations/:regId', authenticateToken, authorizeAdmin, adminController.adminDeleteRegistration);

// Attendance & Certificates
router.post('/attendance', authenticateToken, authorizeOrganizer, adminController.markAttendance);
router.post('/certificate/generate', authenticateToken, authorizeOrganizer, adminController.generateCertificate);

// Payment
router.post('/mark-paid', authenticateToken, authorizeAdmin, adminController.adminMarkPaid);

// Organizer analytics
router.get('/event-stats', authenticateToken, authorizeOrganizer, adminController.getEventRegistrationCounts);
router.get('/dept-stats', authenticateToken, authorizeOrganizer, adminController.getDepartmentEventCounts);

module.exports = router;
