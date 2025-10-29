const connection = require('../config/db');

exports.getEvents = async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM events ORDER BY day, time');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching events.' });
    }
};

exports.addEvent = async (req, res) => {
    const { name, category, day, dept, time, venue, desc, prize, capacity } = req.body;
    try {
        // Adjust the SQL and fields as per your DB schema
        const [result] = await connection.execute(
            'INSERT INTO events (name, category, day, dept, time, venue, description, prize, capacity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, category, day, dept, time, venue, desc, prize, capacity]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add event' });
    }
};

exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, category, day, dept, time, venue, description, prize, capacity } = req.body;
    try {
        await connection.execute(
            'UPDATE events SET name = ?, category = ?, day = ?, dept = ?, time = ?, venue = ?, description = ?, prize = ?, capacity = ? WHERE id = ?',
            [name, category, day, dept, time, venue, description, prize, capacity, id]
        );
        res.status(200).json({ message: 'Event updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating event.' });
    }
};

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        await connection.execute('DELETE FROM events WHERE id = ?', [id]);
        res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while deleting event.' });
    }
};

exports.getAllEvents = (req, res) => {
    res.json({ message: 'All events endpoint works!' });
};

// Register a user (by registrationId) for a specific event
exports.registerForEvent = async (req, res) => {
    const { id } = req.params; // event id
    const { registrationId } = req.body;
    try {
        // Verify event exists
        const [events] = await connection.execute('SELECT id FROM events WHERE id = ?', [id]);
        if (!events[0]) return res.status(404).json({ message: 'Event not found' });

        // Verify registration belongs to the requesting user
        const [regs] = await connection.execute(
            'SELECT r.registration_id, r.user_id FROM registrations r WHERE r.registration_id = ?',
            [registrationId]
        );
        if (!regs[0]) return res.status(400).json({ message: 'Invalid registrationId' });

        // Optional: ensure token user matches registration user
        if (req.user?.id) {
            const [users] = await connection.execute('SELECT id FROM users WHERE id = ?', [regs[0].user_id]);
            if (!users[0]) return res.status(400).json({ message: 'User mismatch' });
        }

        // Insert link (ignore duplicates)
        await connection.execute(
            'INSERT IGNORE INTO event_registrations (event_id, registration_id) VALUES (?, ?)',
            [id, registrationId]
        );
        res.status(201).json({ message: 'Registered for event' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while registering for event.' });
    }
};
