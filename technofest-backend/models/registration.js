import express from 'express';
import connection from '../db.js';

const router = express.Router();

// ✅ Get all registrations
router.get('/', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM registrations');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// ✅ Delete a registration
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await connection.execute('DELETE FROM registrations WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete registration' });
  }
});

export default router;
