import React from 'react';
import PropTypes from 'prop-types';

const ContactForm = ({ onSubmit }) => {
    return (
        <form className="contact-form" onSubmit={onSubmit}>
            <h3>Send us a Message</h3>
            <div className="form-group"><label>Name</label><input type="text" required /></div>
            <div className="form-group"><label>Email</label><input type="email" required /></div>
            <div className="form-group"><label>Subject</label><input type="text" required /></div>
            <div className="form-group"><label>Message</label><textarea rows="5" required></textarea></div>
            <button type="submit" className="btn-primary"><i className="fas fa-paper-plane"></i> Send Message</button>
        </form>
    );
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;