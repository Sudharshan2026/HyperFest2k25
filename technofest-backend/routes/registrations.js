// backend/routes/registrations.js (UPDATED TO COMMONJS)
const express = require('express');
const connection = require('../db'); // your database connection (use require)

const router = express.Router();

// Register new user (POST /api/registrations)
router.post('/', async (req, res) => {
    try {
        const { fullName, email, phone, role, department, year, college, emergencyContact, passType, mealPref, tshirtSize, needAccommodation, needTransport } = req.body;

        const [result] = await connection.execute(
            `INSERT INTO registrations 
             (full_name, email, phone, role, department, year, college, emergency_contact, pass_type, meal_pref, tshirt_size, need_accommodation, need_transport) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [fullName, email, phone, role, department, year, college, emergencyContact, passType, mealPref, tshirtSize, needAccommodation, needTransport]
        );

        res.status(201).json({ id: result.insertId, ...req.body });

    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Failed to register' });
    }
});

// MARK ATTENDANCE ROUTE
// Handles PUT /api/registrations/attendance/:registrationId
router.put('/attendance/:registrationId', /* require('../middleware/authMiddleware'), */ async (req, res) => {
    const { registrationId } = req.params;
    const { day } = req.body; 

    const attendanceField = day === 'day1' ? 'day1_attendance' : day === 'day2' ? 'day2_attendance' : null;

    if (!attendanceField) {
        return res.status(400).json({ message: 'Invalid attendance day specified. Must be day1 or day2.' });
    }

    try {
        const [result] = await connection.execute(
            `UPDATE registrations SET ${attendanceField} = 'Present' WHERE registration_id = ?`,
            [registrationId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registration ID not found.' });
        }
        
        res.status(200).json({ message: `${day} attendance successfully marked as Present.` });

    } catch (err) {
        console.error(`Error marking ${day} attendance for ${registrationId}:`, err);
        res.status(500).json({ message: 'Failed to update attendance in database.' });
    }
});

// EXPORT USING COMMONJS SYNTAX
module.exports = router;