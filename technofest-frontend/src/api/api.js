import express from 'express';
import connection from '../db.js'; // adjust path to your DB connection file

const router = express.Router();

// ✅ Get all events
router.get('/', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM events');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// ✅ Add new event
router.post('/', async (req, res) => {
  try {
    const { name, category, day, dept, time, venue, desc, prize, capacity } = req.body;

    const [result] = await connection.execute(
      'INSERT INTO events (name, category, day, dept, time, venue, description, prize, capacity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, category, day, dept, time, venue, desc, prize, capacity]
    );

    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add event' });
  }
});

// ✅ Update event
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, day, dept, time, venue, desc, prize, capacity } = req.body;

    await connection.execute(
      'UPDATE events SET name=?, category=?, day=?, dept=?, time=?, venue=?, description=?, prize=?, capacity=? WHERE id=?',
      [name, category, day, dept, time, venue, desc, prize, capacity, id]
    );

    res.json({ id, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// ✅ Delete event
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await connection.execute('DELETE FROM events WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

export default router;
