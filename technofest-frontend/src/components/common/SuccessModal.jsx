import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

const SuccessModal = () => {
    const { closeModal, successMessage } = useContext(AppContext);

    return (
        <div className="modal active">
            <div className="modal-content success-modal">
                <i className="fas fa-check-circle success-icon"></i>
                <h3 id="successTitle">{successMessage.title}</h3>
                <p id="successMessage">{successMessage.message}</p>
                <button className="btn-primary" onClick={closeModal}>Continue</button>
            </div>
        </div>
    );
};

export default SuccessModal;