import express from 'express';
import connection from '../db.js'; // adjust path as needed

const router = express.Router();

// ✅ Get all registrations (for admin panel)
router.get('/registrations', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM registrations');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch registrations' });
  }
});

// ✅ Mark registration as paid
router.post('/mark-paid', async (req, res) => {
  try {
    const { registrationId } = req.body;

    if (!registrationId) {
      return res.status(400).json({ message: 'registrationId is required' });
    }

    const [existing] = await connection.execute(
      'SELECT * FROM registrations WHERE id = ?',
      [registrationId]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    await connection.execute(
      'UPDATE registrations SET isPaid = ? WHERE id = ?',
      [1, registrationId]
    );

    res.json({ message: 'Payment marked as paid successfully', registrationId });
  } catch (err) {
    console.error('Error in mark-paid:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ✅ Delete registration (optional)
router.delete('/registrations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await connection.execute('DELETE FROM registrations WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete registration' });
  }
});

export default router;
