const jwt = require('jsonwebtoken');
const connection = require('../config/db');
const { sendOtpEmail } = require('../services/emailService');
const { OAuth2Client } = require('google-auth-library');

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Verify Google OAuth is properly configured
if (!process.env.GOOGLE_CLIENT_ID) {
    console.error('GOOGLE_CLIENT_ID is not set in environment variables');
}

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to handle Google Sign-In (NEW OAUTH LOGIC)
exports.googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { email, name } = payload;

        let [userRows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        let user = userRows[0];

        if (!user) {
            // Create a new user record for the OAuth user
            const [result] = await connection.execute(
                'INSERT INTO users (email, full_name, role, is_oauth_user) VALUES (?, ?, ?, 1)',
                [email, name, 'student']
            );

            [userRows] = await connection.execute('SELECT * FROM users WHERE id = ?', [result.insertId]);
            user = userRows[0];
        }

        const authToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        const { otp: _, otp_expires_at: __, phone_number: ___, ...userWithoutSecrets } = user;

        res.status(200).json({ 
            token: authToken, 
            user: userWithoutSecrets,
            message: 'Login via Google successful.'
        });

    } catch (error) {
        console.error('Google OAuth Error:', error);
        res.status(401).json({ message: 'Google authentication failed.' });
    }
};

// User Login with phone digits
exports.login = async (req, res) => {
    const { email, phone_last_digits } = req.body;
    try {
        // Get user by email
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(401).json({ message: 'User not found. Please register first.' });
        }

        // Check if phone number matches
        if (!user.phone_number || user.phone_number.slice(-4) !== phone_last_digits) {
            return res.status(401).json({ message: 'Invalid login credentials.' });
        }

        // Check payment status
        if (user.is_paid !== 1) { 
             return res.status(403).json({ 
                 message: 'Payment not completed. Please complete your registration payment to log in.' 
             });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

    // Fetch the complete user profile using internal helper (avoid calling handler with fake res)
    const fullUserProfile = await getUserProfileById(user.id);

    res.status(200).json({ token, user: fullUserProfile, message: 'Login successful' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login initialization.' });
    }
};

// Step 2: Verify OTP and grant token
exports.verifyOTP = async (req, res) => {
    const { userId, otp } = req.body;
    try {
        const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [userId]);
        const user = rows[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.otp !== otp || new Date(user.otp_expires_at) < new Date()) {
            await connection.execute('UPDATE users SET otp = NULL, otp_expires_at = NULL WHERE id = ?', [userId]);
            return res.status(401).json({ message: 'Invalid or expired OTP.' });
        }

        await connection.execute('UPDATE users SET otp = NULL, otp_expires_at = NULL WHERE id = ?', [userId]);

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        const { otp: _, otp_expires_at: __, ...userWithoutOtp } = user;

        res.status(200).json({ token, user: userWithoutOtp });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during OTP verification.' });
    }
};

// Admin Login (No changes)
exports.adminLogin = async (req, res) => {
    const { username, password, type } = req.body;
    
    const adminCredentials = {
        organizer: { username: 'organizer', password: 'org123' },
        super: { username: 'admin', password: 'admin123' }
    };

    if (adminCredentials[type] && adminCredentials[type].username === username && adminCredentials[type].password === password) {
        const token = jwt.sign({ username, role: type }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { username, role: type } });
    } else {
        res.status(401).json({ message: 'Invalid admin credentials.' });
    }
};

// Internal helper: fetch user profile by user ID
const getUserProfileById = async (userId) => {
    // Use registrations.id for ordering to avoid dependency on a possibly-missing timestamp column
    const [rows] = await connection.execute(
        `SELECT u.id, u.full_name, u.email, u.phone_number, u.role, u.department, r.registration_id, r.pass_type, r.payment_status 
             FROM users u 
             LEFT JOIN registrations r ON u.id = r.user_id 
             WHERE u.id = ? 
             ORDER BY r.id DESC LIMIT 1`,
        [userId]
    );
    return rows[0] || null;
};

// Express handler: get current user's profile
exports.getProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const user = await getUserProfileById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error while fetching profile.' });
    }
};