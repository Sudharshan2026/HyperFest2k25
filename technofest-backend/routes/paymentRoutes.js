const express = require('express');
const router = express.Router();
const connection = require('../db');

router.post('/complete', async (req, res) => {
    const { registrationId, paymentMethod } = req.body;
    if (!registrationId || !paymentMethod) {
        return res.status(400).json({ error: 'Missing registrationId or paymentMethod' });
    }
    try {
        await connection.execute(
            'UPDATE registrations SET paymentStatus = ?, paymentMethod = ? WHERE registrationId = ?',
            ['paid', paymentMethod, registrationId]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Payment processing failed' });
    }
});

module.exports = router;

