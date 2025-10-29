import React from 'react';
import PropTypes from 'prop-types';

const RegistrationForm = ({ formData, onFormChange, onPassChange, onSubmit, summary }) => {
    return (
        <form className="registration-form" onSubmit={onSubmit}>
            {/* Personal Information Section */}
            <div className="form-section">
                <h3><i className="fas fa-user"></i> Personal Information</h3>
                <div className="form-row">
                    <div className="form-group"><label>Full Name *</label><input type="text" id="fullName" value={formData.fullName} onChange={onFormChange} required /></div>
                    <div className="form-group"><label>Email *</label><input type="email" id="email" value={formData.email} onChange={onFormChange} required /></div>
                </div>
                {/* ... (rest of personal info fields) ... */}
            </div>

            {/* Pass Selection Section */}
            <div className="form-section">
                <h3><i className="fas fa-ticket-alt"></i> Pass Selection</h3>
                <div className="pass-selection">
                    {/* ... (pass radio buttons) ... */}
                </div>
            </div>
            
            {/* Preferences Section */}
            <div className="form-section">
                <h3><i className="fas fa-cog"></i> Preferences</h3>
                {/* ... (preferences fields) ... */}
            </div>

            {/* Registration Summary */}
            <div className="registration-summary">
                <h3>Registration Summary</h3>
                <div className="summary-details">
                    <div className="summary-item"><span>Pass Type:</span><span id="selectedPass">{summary.selectedPass}</span></div>
                    <div className="summary-item"><span>Amount:</span><span id="totalAmount">{summary.totalAmount}</span></div>
                </div>
            </div>

            <button type="submit" className="btn-primary submit-btn"><i className="fas fa-credit-card"></i> Proceed to Payment</button>
        </form>
    );
};

RegistrationForm.propTypes = {
    formData: PropTypes.object.isRequired,
    onFormChange: PropTypes.func.isRequired,
    onPassChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    summary: PropTypes.object.isRequired,
};

export default RegistrationForm;