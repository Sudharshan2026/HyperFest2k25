import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import PropTypes from 'prop-types';

const Alert = ({ message, type }) => {
    const { showAlert } = useContext(AppContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            showAlert(null);
        }, 4000);
        return () => clearTimeout(timer);
    }, [message, showAlert]);

    if (!message) return null;

    return (
        <div className={`alert alert-${type}`}>
            <i className={`fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}`}></i>
            <span>{message}</span>
        </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['info', 'success', 'error']).isRequired,
};

export default Alert;