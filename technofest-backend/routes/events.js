
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticateToken, authorizeOrganizer } = require('../middleware/authMiddleware');

// Public: list events
router.get('/', eventController.getEvents);

// Protected admin/organizer routes
router.post('/', authenticateToken, authorizeOrganizer, eventController.addEvent);
router.put('/:id', authenticateToken, authorizeOrganizer, eventController.updateEvent);
router.delete('/:id', authenticateToken, authorizeOrganizer, eventController.deleteEvent);

// Participant registration (requires auth)
router.post('/:id/register', authenticateToken, eventController.registerForEvent);

module.exports = router;

