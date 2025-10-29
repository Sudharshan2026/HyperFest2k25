import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { verifyOTP } from '../../api/authApi';
import { useAuth } from '../../hooks/useAuth'; 

const OTPModal = ({ isOpen, onClose, userId, email, onVerificationSuccess }) => {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login: authContextLogin } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (otp.length !== 6) {
            setError('Please enter the 6-digit OTP.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await verifyOTP({ userId, otp });
            
            const { token, user } = response.data;
            
            // First update auth context
            authContextLogin(token, user); 

            // Call the success callback and close modal
            onVerificationSuccess(user); 
            onClose();
            
            // Force a page refresh to ensure all data is properly loaded
            window.location.href = '/myaccount';

        } catch (err) {
            setError(err.response?.data?.message || 'Verification failed. Please check your OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Two-Factor Authentication">
            <div className="p-4 text-center">
                <div className="text-xl text-blue-600 mb-4">🔐 Login Verification</div>
                <p className="text-gray-700 mb-4">
                    A 6-digit OTP has been sent to <span className="font-semibold text-gray-900">{email}</span>.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                            placeholder="Enter 6-digit OTP"
                            maxLength="6"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center text-xl tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {error && <div className="text-red-500 mb-3">{error}</div>}
                    <Button 
                        type="submit" 
                        disabled={isLoading || otp.length !== 6} 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150"
                    >
                        {isLoading ? 'Verifying...' : 'Verify & Login'}
                    </Button>
                </form>
                <p className="text-xs text-gray-500 mt-4">
                    The OTP is valid for 10 minutes.
                </p>
            </div>
        </Modal>
    );
};

export default OTPModal;
