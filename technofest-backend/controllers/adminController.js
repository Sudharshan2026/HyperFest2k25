const connection = require('../config/db');

exports.getAdminStats = async (req, res) => {
    try {
        const [totalRegistrations] = await connection.execute('SELECT COUNT(*) AS count FROM registrations');
        const [paidCount] = await connection.execute("SELECT COUNT(*) AS count FROM registrations WHERE payment_status = 'paid'");
        const [arrivedCount] = await connection.execute("SELECT COUNT(*) AS count FROM registrations WHERE day1_attendance = 'Present' OR day2_attendance = 'Present'");
        const [bothDayPasses] = await connection.execute("SELECT COUNT(*) AS count, SUM(p.amount) as revenue FROM registrations r LEFT JOIN payments p ON r.registration_id = p.registration_id WHERE r.pass_type = 'both' AND r.payment_status = 'paid'");
        const [day1Passes] = await connection.execute("SELECT COUNT(*) AS count, SUM(p.amount) as revenue FROM registrations r LEFT JOIN payments p ON r.registration_id = p.registration_id WHERE r.pass_type = 'day1' AND r.payment_status = 'paid'");
        const [day2Passes] = await connection.execute("SELECT COUNT(*) AS count, SUM(p.amount) as revenue FROM registrations r LEFT JOIN payments p ON r.registration_id = p.registration_id WHERE r.pass_type = 'day2' AND r.payment_status = 'paid'");
        const [revenue] = await connection.execute('SELECT SUM(amount) AS total_revenue FROM payments');

        res.status(200).json({
            totalRegistrations: totalRegistrations[0].count,
            paidCount: paidCount[0].count,
            arrivedCount: arrivedCount[0].count,
            bothDayPasses: bothDayPasses[0].count,
            day1Passes: day1Passes[0].count,
            day2Passes: day2Passes[0].count,
            revenue: revenue[0].total_revenue || 0,
            revenue1: day1Passes[0].revenue || 0,
            revenue2: day2Passes[0].revenue || 0,
            revenueB: bothDayPasses[0].revenue || 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching admin stats.' });
    }
};

exports.getEventRegistrationCounts = async (req, res) => {
    try {
        const [rows] = await connection.execute(`
            SELECT
                e.id,
                e.name,
                e.dept,
                COUNT(er.id) AS registrations
            FROM events e
            LEFT JOIN event_registrations er ON e.id = er.event_id
            GROUP BY e.id, e.name, e.dept
            ORDER BY registrations DESC, e.name ASC
        `);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching event registration counts.' });
    }
};

exports.getDepartmentEventCounts = async (req, res) => {
    try {
        const [rows] = await connection.execute(`
            SELECT COALESCE(e.dept, 'na') AS dept,
                   COUNT(DISTINCT e.id) AS eventsCount,
                   COUNT(er.id) AS registrations
            FROM events e
            LEFT JOIN event_registrations er ON er.event_id = e.id
            GROUP BY COALESCE(e.dept, 'na')
            ORDER BY registrations DESC
        `);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching department counts.' });
    }
};

exports.getAllRegistrations = async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT r.*, u.full_name, u.email, u.department FROM registrations r JOIN users u ON r.user_id = u.id');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching registrations.' });
    }
};

exports.getRegistrationById = async (req, res) => {
    const { regId } = req.params;
    try {
        const [rows] = await connection.execute(
            'SELECT r.*, u.full_name, u.email, u.phone_number, u.role, u.department FROM registrations r JOIN users u ON r.user_id = u.id WHERE r.registration_id = ?',
            [regId]
        );
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching participant details.' });
    }
};

// CORRECTED: Fixes the syntax error and handles attendance update.
exports.markAttendance = async (req, res) => {
    const { regId } = req.params; 
    const { day } = req.body; 
    
    // Validate inputs
    if (!regId || !day || (day !== 'day1' && day !== 'day2')) {
        return res.status(400).json({ message: 'Invalid registration ID or day parameter.' });
    }
    
    // Map day to the correct database column name
    const column = `${day}_attendance`; 

    try {
        const [result] = await connection.execute(
            `UPDATE registrations SET ${column} = 'Present' WHERE registration_id = ?`,
            [regId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registration not found or attendance already marked.' });
        }
        
        res.status(200).json({ message: `Attendance marked for ${day}.` });
    } catch (error) {
        console.error("CRITICAL SQL ERROR MARKING ATTENDANCE:", error);
        res.status(500).json({ message: 'Server error while updating attendance status. Check server console for details.' });
    }
};

exports.generateCertificate = async (req, res) => {
    const { regId } = req.body;
    try {
        const [regRows] = await connection.execute('SELECT * FROM registrations WHERE registration_id = ? AND payment_status = "paid" AND (day1_attendance = "Present" OR day2_attendance = "Present")', [regId]);
        const registration = regRows[0];

        if (!registration) {
            return res.status(400).json({ message: 'Participant not eligible for a certificate.' });
        }

        const [userRows] = await connection.execute('SELECT full_name FROM users WHERE id = ?', [registration.user_id]);
        const participantName = userRows[0].full_name;

        const [certRows] = await connection.execute('SELECT * FROM certificates WHERE reg_id = ?', [regId]);
        if (certRows.length > 0) {
            return res.status(409).json({ message: 'Certificate already exists for this registration.' });
        }

        await connection.execute('INSERT INTO certificates (reg_id, participant_name, event_name) VALUES (?, ?, ?)', [regId, participantName, 'TechnoFest 2025']);
        res.status(201).json({ message: 'Certificate generated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while generating certificate.' });
    }
};

exports.adminMarkPaid = async (req, res) => {
    try {
        const { registrationId } = req.body;

        if (!registrationId) {
            return res.status(400).json({ message: 'registrationId is required' });
        }

        // First, check if the registration exists
        const [checkReg] = await connection.execute(
            'SELECT * FROM registrations WHERE registration_id = ?',
            [registrationId]
        );

        if (checkReg.length === 0) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        // Update registration payment status
        const [updateResult] = await connection.execute(
            "UPDATE registrations SET payment_status = 'paid' WHERE registration_id = ?",
            [registrationId]
        );

        // Update user payment status
        const userId = checkReg[0].user_id;
        await connection.execute(
            'UPDATE users SET is_paid = 1 WHERE id = ?',
            [userId]
        );

        // Insert into payments table
        const amount = checkReg[0].pass_type === 'both' ? 300 : 200;
        await connection.execute(
            'INSERT INTO payments (registration_id, amount, payment_method, status) VALUES (?, ?, ?, ?)',
            [registrationId, amount, 'admin_marked', 'completed']
        );

        res.status(200).json({ 
            message: 'Payment marked as paid successfully',
            registration: {
                ...checkReg[0],
                payment_status: 'paid'
            }
        });
    } catch (error) {
        console.error('Error in adminMarkPaid:', error);
        res.status(500).json({ 
            message: 'Internal Server Error',
            error: error.message 
        });
    }
};

exports.adminDeleteRegistration = async (req, res) => {
    const { regId } = req.params;
    try {
        await connection.execute('DELETE FROM registrations WHERE registration_id = ?', [regId]);
        res.status(200).json({ message: 'Registration deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};