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