const connection = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads folder exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ========== CONTROLLERS ==========

// ✅ GET all events
exports.getEvents = async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM events ORDER BY id DESC');
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    const events = rows.map(event => ({
      ...event,
      image_url: event.image_url ? `${baseUrl}${event.image_url}` : null
    }));

    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};


// ✅ ADD event (Admin only)
exports.addEvent = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { name, category, day, dept, time, venue, desc, prize, capacity } = req.body;
      const imageFile = req.file ? req.file.filename : null;

      const [result] = await connection.execute(
        'INSERT INTO events (name, category, day, dept, time, venue, `desc`, prize, capacity, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, category, day, dept, time, venue, desc, prize, capacity, imageFile]
      );

      res.status(201).json({ message: 'Event added successfully', id: result.insertId });
    } catch (error) {
      console.error('Error adding event:', error);
      res.status(500).json({ message: 'Failed to add event' });
    }
  }
];


// ✅ UPDATE event (Admin only)
exports.updateEvent = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, day, dept, time, venue, desc, prize, capacity } = req.body;

      let query = 'UPDATE events SET name=?, category=?, day=?, dept=?, time=?, venue=?, `desc`=?, prize=?, capacity=?';
      const params = [name, category, day, dept, time, venue, desc, prize, capacity];

      // If new image uploaded
      if (req.file) {
        query += ', image_url=?';
        params.push(req.file.filename);
      }

      query += ' WHERE id=?';
      params.push(id);

      await connection.execute(query, params);
      res.json({ message: 'Event updated successfully' });
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ message: 'Failed to update event' });
    }
  }
];


// ✅ DELETE event (Admin only)
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete associated image
    const [rows] = await connection.execute('SELECT image_url FROM events WHERE id = ?', [id]);
    if (rows.length && rows[0].image_url) {
      const filePath = path.join(uploadDir, rows[0].image_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await connection.execute('DELETE FROM events WHERE id = ?', [id]);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Failed to delete event' });
  }
};


// ✅ REGISTER for event (Participants)
exports.registerForEvent = async (req, res) => {
  try {
    const { id } = req.params; // event ID
    const userId = req.user.id; // from JWT authentication

    // Check if event exists
    const [event] = await connection.execute('SELECT capacity FROM events WHERE id = ?', [id]);
    if (!event.length) return res.status(404).json({ message: 'Event not found' });

    // Check for existing registration
    const [existing] = await connection.execute(
      'SELECT * FROM registrations WHERE user_id = ? AND event_id = ?',
      [userId, id]
    );
    if (existing.length) return res.status(400).json({ message: 'Already registered for this event' });

    // Insert registration
    await connection.execute('INSERT INTO registrations (user_id, event_id) VALUES (?, ?)', [userId, id]);
    res.status(201).json({ message: 'Successfully registered for event' });
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ message: 'Failed to register for event' });
  }
};
