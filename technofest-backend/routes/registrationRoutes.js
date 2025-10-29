const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationsController');
const adminController = require('../controllers/adminController'); // Used for markAttendance handler
const connection = require('../db'); // Required for the direct attendance logic

// ===============================================
// FIX: Attendance Route
// Handles PUT /api/registrations/attendance/:regId
// ===============================================

// Option 1 (Cleanest): Call a controller function (RECOMMENDED)
// router.put('/attendance/:regId', adminController.markAttendance); 

// Option 2 (Quick Fix): Embed the logic directly (WHAT WE WILL DO)
router.put('/attendance/:registrationId', async (req, res) => {
    // You should typically add authMiddleware here to secure this route

    const { registrationId } = req.params;
    const { day } = req.body; // Expects 'day1' or 'day2'

    // Determine which column to update in the database
    const attendanceField = day === 'day1' ? 'day1_attendance' : day === 'day2' ? 'day2_attendance' : null;

    if (!attendanceField) {
        return res.status(400).json({ message: 'Invalid attendance day specified. Must be day1 or day2.' });
    }

    try {
        // Update the attendance field to 'Present'
        const [result] = await connection.execute(
            `UPDATE registrations SET ${attendanceField} = 'Present' WHERE registration_id = ?`,
            [registrationId]
        );

        if (result.affectedRows === 0) {
            // No row matched the registrationId
            return res.status(404).json({ message: 'Registration ID not found.' });
        }
        
        // Success response
        res.status(200).json({ message: `${day} attendance successfully marked as Present.` });

    } catch (err) {
        console.error(`Error marking ${day} attendance for ${registrationId}:`, err);
        res.status(500).json({ message: 'Failed to update attendance in database.' });
    }
});

// ... (Keep existing imports: express, router, controllers, connection, etc.)

// ... (Existing routes: router.post('/register', ...), router.put('/attendance/:registrationId', ...), etc.)

// ===============================================
// FIX: ADD THE MISSING CERTIFICATE GENERATION ROUTE
// Handles POST /api/registrations/certificate/:regId
// ===============================================
router.post('/certificate/:regId', async (req, res) => {
    const { regId } = req.params;
    
    // --- TEMPORARY SUCCESS LOGIC (Replace with your actual controller/logic) ---
    // In a real app, you would verify eligibility (payment/attendance) here
    // and then call a service to generate and potentially email the certificate.
    
    try {
        // Example check: Assume participant must be present for Day 1 and Day 2
        const [rows] = await connection.execute(
            `SELECT pass_type, payment_status, day1_attendance, day2_attendance FROM registrations WHERE registration_id = ?`,
            [regId]
        );

        const participant = rows[0];

        if (!participant) {
            return res.status(404).json({ message: 'Registration not found.' });
        }

        // --- FIX: Correct eligibility logic based on pass type ---
        const isPaid = participant.payment_status === 'paid';
        const { pass_type, day1_attendance, day2_attendance } = participant;

        const isEligible = isPaid && (
            (pass_type === 'day1' && day1_attendance === 'Present') ||
            (pass_type === 'day2' && day2_attendance === 'Present') ||
            (pass_type === 'both' && day1_attendance === 'Present' && day2_attendance === 'Present')
        );

        if (!isEligible) {
            // Return 403 Forbidden if the participant does not meet the criteria
            return res.status(403).json({ message: 'Participant not eligible (Payment or Attendance incomplete).' });
        }
        
        // If eligible, proceed to generation logic here
        // Your actual code would call a function like certificateService.generate(regId);

        // Success response
        res.status(200).json({ message: `Certificate generation initiated for ${regId}.` });
    } catch (err) {
        console.error('Certificate generation error:', err);
        res.status(500).json({ message: 'Internal server error during certificate process.' });
    }
});
// ------------------------------------------------------------------

// ... (Existing module.exports = router;)
// ===============================================
// Existing Routes
// ===============================================

// Registration endpoint
router.post('/register', registrationController.registerUser);

// Payment endpoint
router.post('/payment', registrationController.processPayment);

// Public lookup by registration ID (used by frontend)
router.get('/id/:regId', registrationController.getRegistrationById);

module.exports = router;