import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

const AdminButton = () => {
    const { showModal } = useContext(AppContext);

    const handleAdminLoginClick = () => {
        showModal('adminLogin');
    };

    return (
        <button
            onClick={handleAdminLoginClick}
            className="btn-login"
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                background: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                fontSize: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: '9999'
            }}
        >
            <i className="fas fa-shield-alt"></i>
        </button>
    );
};

export default AdminButton;