const connection = require('../config/db');

exports.registerUser = async (req, res) => {
    const { fullName, email, phone, role, department, year, college, emergencyContact, passType, mealPref, tshirtSize, needAccommodation, needTransport } = req.body;
    
    try {
        // First, check if user exists in the 'users' table
        let [userRows] = await connection.execute('SELECT id FROM users WHERE email = ?', [email]);
        let userId;

        if (userRows.length === 0) {
            // User does not exist, so create a new user record
            const [userResult] = await connection.execute(
                'INSERT INTO users (full_name, email, phone_number, role, department, year_of_study, college, emergency_contact) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [fullName, email, phone, role, department, year, college, emergencyContact]
            );
            userId = userResult.insertId;
        } else {
            userId = userRows[0].id;
        }

        // Generate a unique registration ID
        const regId = `TF25${Math.floor(10000 + Math.random() * 90000)}`;

        // Create the registration record
        const [regResult] = await connection.execute(
            'INSERT INTO registrations (registration_id, user_id, pass_type, meal_pref, tshirt_size, need_accommodation, need_transport) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [regId, userId, passType, mealPref, tshirtSize, needAccommodation, needTransport]
        );

        res.status(201).json({ message: 'Registration created successfully.', registrationId: regId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

exports.processPayment = async (req, res) => {
    const { registrationId, method, amount, transactionId, upiId } = req.body;
    
    try {
        // Update registration payment status
        await connection.execute('UPDATE registrations SET payment_status = ? WHERE registration_id = ?', ['paid', registrationId]);

        // Insert payment log
        await connection.execute(
            'INSERT INTO payments (registration_id, amount, method, transaction_id, upi_id) VALUES (?, ?, ?, ?, ?)',
            [registrationId, amount, method, transactionId, upiId]
        );

        res.status(200).json({ message: 'Payment processed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during payment processing.' });
    }
};

exports.getRegistrationByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const [rows] = await connection.execute(
            'SELECT r.*, u.full_name, u.email, u.phone_number, u.role FROM registrations r JOIN users u ON r.user_id = u.id WHERE u.email = ?',
            [email]
        );
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Example placeholder controller

exports.getAllRegistrations = (req, res) => {
    res.json({ message: 'All registrations endpoint works!' });
};

// Add your actual registration logic here as needed