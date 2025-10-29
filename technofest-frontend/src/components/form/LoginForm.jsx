import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ email, password, onEmailChange, onPasswordChange, onSubmit, isLoading }) => {
    return (
        <form id="loginForm" onSubmit={onSubmit}>
            <div className="form-group">
                <label>Email/Registration ID</label>
                <input type="text" id="loginEmail" required value={email} onChange={onEmailChange} />
            </div>
            <div className="form-group">
                <label>Password (Last 4 digits of your registered phone number)</label>
                <input 
                    type="password" 
                    id="loginPassword" 
                    required 
                    maxLength="4" 
                    value={password} 
                    onChange={onPasswordChange}
                    pattern="[0-9]{4}"
                    placeholder="Enter last 4 digits of your phone"
                />
                <div className="text-xs text-gray-500 mt-1">
                    Example: If your phone is 9876543210, password is 3210
                </div>
            </div>
            <div className="login-actions">
                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? 'Sending OTP...' : (<><i className="fas fa-sign-in-alt"></i> Login</>)}
                </button>
            </div>
            <div className="login-help">
                <p><small>Enter your registered email and use last 4 digits of your phone number as password</small></p>
                <p><small>You will receive an OTP for verification</small></p>
            </div>
        </form>
    );
};

LoginForm.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

LoginForm.defaultProps = {
    isLoading: false,
};

export default LoginForm;
