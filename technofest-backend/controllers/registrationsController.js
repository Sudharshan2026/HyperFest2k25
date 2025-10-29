const connection = require('../config/db');

// NOTE: This assumes your connection object has access to a connection pool 
// that supports standard transaction methods (getConnection, beginTransaction, commit, rollback, release).

exports.registerUser = async (req, res) => {
    const { fullName, email, phone, role, department, year, college, emergencyContact, passType, mealPref, tshirtSize, needAccommodation, needTransport } = req.body;

    try {
        let [userRows] = await connection.execute('SELECT id FROM users WHERE email = ?', [email]);
        let userId;

        if (userRows.length === 0) {
            const [userResult] = await connection.execute(
                'INSERT INTO users (full_name, email, phone_number, role, department, year_of_study, college, emergency_contact) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [fullName, email, phone, role, department, year, college, emergencyContact]
            );
            userId = userResult.insertId;
        } else {
            userId = userRows[0].id;
        }

        const regId = `TF25${Math.floor(10000 + Math.random() * 90000)}`;

        await connection.execute(
            `INSERT INTO registrations
            (registration_id, user_id, pass_type, meal_pref, tshirt_size, need_accommodation, need_transport, payment_status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [regId, userId, passType, mealPref, tshirtSize, needAccommodation ? 1 : 0, needTransport ? 1 : 0, 'pending']
        );

        res.status(201).json({ message: 'Registration created successfully.', registrationId: regId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

exports.getRegistrationById = async (req, res) => {
    const { regId } = req.params; 
    
    const isEmail = regId.includes('@');
    const isRegId = regId.toUpperCase().startsWith('TF25');
    
    let whereClause = '';

    if (isEmail) {
        whereClause = 'u.email = ?';
    } else if (isRegId || regId.length > 5) {
        whereClause = 'r.registration_id = ?';
    } else {
        return res.status(400).json({ message: 'Please enter a full Registration ID or Email.' });
    }

    try {
        const [rows] = await connection.execute(
            `SELECT 
                r.*, 
                u.full_name, 
                u.email, 
                u.phone_number, 
                u.role, 
                u.department 
            FROM registrations r 
            JOIN users u ON r.user_id = u.id 
            WHERE ${whereClause}`,
            [regId]
        );
        
        const participant = rows[0];

        if (!participant) {
            return res.status(404).json({ message: 'Participant not found.' });
        }
        
        res.status(200).json(participant);

    } catch (error) {
        console.error("Error in getRegistrationById/Email:", error);
        res.status(500).json({ message: 'Server error while fetching registration details.' });
    }
};

exports.processPayment = async (req, res) => {
    const { registrationId, method, amount, transactionId, upiId } = req.body;
    let connectionInUse = null;

    try {
        if (!registrationId || !amount || !method || !transactionId) {
            return res.status(400).json({ message: 'Missing required payment fields (ID, amount, method, or transactionId).' });
        }
        
        const finalUpiId = method === 'qr_scan' ? null : upiId || null;

        // --- Start Transaction for Atomicity ---
        connectionInUse = await connection.getConnection(); 
        await connectionInUse.beginTransaction();

        // 1. Update registration payment status
        await connectionInUse.execute(
            'UPDATE registrations SET payment_status = ? WHERE registration_id = ?',
            ['paid', registrationId]
        );

        // 2. Insert payment log
        await connectionInUse.execute(
            'INSERT INTO payments (registration_id, amount, method, transaction_id, upi_id) VALUES (?, ?, ?, ?, ?)',
            [registrationId, amount, method, transactionId, finalUpiId]
        );
        
        // 3. Update user's is_paid status and fetch updated record
        const [regRows] = await connectionInUse.execute('SELECT user_id FROM registrations WHERE registration_id = ?', [registrationId]);
        let updatedUser = null;

        if (regRows.length > 0) {
             const userId = regRows[0].user_id;
             await connectionInUse.execute('UPDATE users SET is_paid = 1 WHERE id = ?', [userId]);

             // Fetch the UPDATED user record
             const [userRows] = await connectionInUse.execute('SELECT id, email, full_name, is_paid FROM users WHERE id = ?', [userId]);
             updatedUser = userRows[0];
        }

        // Commit the transaction only if all queries succeeded
        await connectionInUse.commit();
        
        // --- End Transaction ---
        
        // Send success message AND the updated user data
        res.status(200).json({ 
            message: 'Payment successful! Your registration is confirmed.',
            user: updatedUser ? { 
                id: updatedUser.id, 
                email: updatedUser.email, 
                fullName: updatedUser.full_name,
                isPaid: updatedUser.is_paid,
            } : null
        });

    } catch (error) {
        if (connectionInUse) {
            await connectionInUse.rollback(); // Rollback on any failure
        }
        console.error("CRITICAL PAYMENT PROCESSING ERROR:", error);
        
        // Return a clear error message
        const dbErrorMessage = error.sqlMessage || error.message; 
        res.status(500).json({ message: `Payment failed due to server error: ${dbErrorMessage}` });
    } finally {
        if (connectionInUse) {
            connectionInUse.release(); // Release the connection
        }
    }
};