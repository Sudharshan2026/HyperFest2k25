import React, { useContext, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { AuthContext } from '../../contexts/AuthContext'; // Import AuthContext
import { passDetails } from '../../utils/helpers';
import { api } from '../../api';

const PaymentModal = () => {
    const { closeModal, paymentData, showAlert, showSuccessModal, setCurrentUser } = useContext(AppContext);
    const { refreshUserData } = useContext(AuthContext); // Get the refresh function
    const [showUpiForm, setShowUpiForm] = useState(false);
    const [upiId, setUpiId] = useState('');
    const [txnId, setTxnId] = useState('');

    if (!paymentData) return null;

    const { passType, registrationId, openQrScanner } = paymentData;
    const pass = passDetails[passType];
    const amount = pass?.amount || 0;

    const handleQrScan = () => {
        if (openQrScanner) {
            closeModal();
            openQrScanner();
        } else {
            showAlert('QR Scanner functionality not available on this page.', 'error');
        }
    };

    const handlePaymentMethod = (method) => {
        if (method === 'upi') {
            setShowUpiForm(true);
        } else if (method === 'qr_scan') {
            handleQrScan();
        } else {
            simulatePayment(method, null, `SIMULATED-${Date.now()}`); 
        }
    };

    const handleUpiSubmit = async (e) => {
        e.preventDefault();
        if (!upiId || !txnId) {
            showAlert('Please fill all required UPI details', 'error');
            return;
        }
        simulatePayment('upi', upiId, txnId);
    };

    const simulatePayment = async (method, upiId = null, txnId = null) => {
        if ((method === 'upi' || method === 'qr_scan') && !txnId) {
            showAlert('Transaction ID is required for verification.', 'error');
            return;
        }

        try {
            // Send payment data to backend
            const response = await api.processPayment({ 
                registrationId, 
                amount,
                method, 
                upiId, 
                transactionId: txnId 
            });

            // --- FIX: Refresh user data globally ---
            await refreshUserData();
            
            closeModal();
            showSuccessModal('Payment Successful!', `${response.message} Your pass details have been confirmed.`);
        } catch (error) {
            showAlert(error.response?.data?.message || 'Payment processing failed. Please check the Transaction ID.', 'error');
        }
    };

    return (
        <div className="modal active">
            <div className="modal-content">
                <div className="modal-header">
                    <h3><i className="fas fa-credit-card"></i> Payment</h3>
                    <button className="close-btn" onClick={closeModal}>&times;</button>
                </div>
                {!showUpiForm ? (
                    <>
                        <div className="payment-summary">
                            <h4>Payment Summary</h4>
                            <div className="summary-item"><span>Pass Type:</span><span id="paymentPassType">{pass?.name || 'N/A'}</span></div>
                            <div className="summary-item"><span>Amount:</span><span id="paymentAmount">₹{amount || '0'}</span></div>
                            <div className="summary-item"><span>Registration ID:</span><span id="paymentRegId">{registrationId}</span></div>
                        </div>
                        <div className="payment-methods">
                            <h4>Select Payment Method</h4>
                            <div className="payment-options">
                                <button className="payment-option" onClick={() => handlePaymentMethod('upi')}><i className="fas fa-mobile-alt"></i><span>UPI (Manual TXN)</span></button>
                                
                                <button className="payment-option qr-scan-option" onClick={() => handlePaymentMethod('qr_scan')}><i className="fas fa-qrcode"></i><span>Scan QR Code</span></button>
                                
                                <button className="payment-option" onClick={() => handlePaymentMethod('card')}><i className="fas fa-credit-card"></i><span>Card (Simulate)</span></button>
                                <button className="payment-option" onClick={() => handlePaymentMethod('netbanking')}><i className="fas fa-university"></i><span>Net Banking (Simulate)</span></button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="upi-modal">
                        <div className="payment-instructions" style={{ padding: '25px', textAlign: 'left' }}>
                            <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                                <p style={{ margin: '0 0 10px 0' }}><strong>📲 Pay to:</strong></p>
                                <h4 style={{ margin: 0, color: '#2c3e50', fontSize: '1.2em' }}>technofest2025@upi</h4>
                                <p style={{ margin: '10px 0 0 0', fontSize: '0.9em', color: '#7f8c8d' }}>Use any UPI app: GPay, PhonePe, Paytm, BHIM, etc.</p>
                            </div>
                            <form onSubmit={handleUpiSubmit}>
                                <div className="form-group"><label htmlFor="userUPI">Your UPI ID *</label><input type="text" id="userUPI" placeholder="yourname@ybl or mobile@upi" required value={upiId} onChange={e => setUpiId(e.target.value)} /></div>
                                <div className="form-group"><label htmlFor="txnId">Transaction ID *</label><input type="text" id="txnId" placeholder="TXN1234567890" required value={txnId} onChange={e => setTxnId(e.target.value)} /></div>
                                <button className="btn-primary" type="submit" style={{ width: '100%', marginTop: '25px', padding: '14px', fontSize: '18px' }}>
                                    <i className="fas fa-check-circle"></i> Verify & Confirm Payment
                                </button>
                            </form>
                            <div style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '8px', borderLeft: '4px solid #ffc107' }}>
                                <p style={{ margin: 0, fontSize: '0.9em', color: '#856404' }}><i className="fas fa-info-circle"></i> <strong>Note:</strong> Payment must be completed in your UPI app first.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;