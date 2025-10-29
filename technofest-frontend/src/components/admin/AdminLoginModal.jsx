import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import { api } from '../../api';

const AdminLoginModal = () => {
    const { closeModal, showAlert, adminType, setAdminType } = useContext(AppContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await api.adminLogin(username, password, adminType);
            closeModal();
            showAlert('Logged in successfully!', 'success');
            if (user.role === 'super') {
                navigate('/admin');
            } else if (user.role === 'organizer') {
                navigate('/organizer');
            }
        } catch (error) {
            showAlert(error.message, 'error');
        }
    };

    return (
        <div className="modal active">
            <div className="modal-content admin-login">
                <div className="admin-login-header">
                    <i className="fas fa-shield-alt"></i>
                    <h3>Admin Access</h3>
                </div>
                {!adminType ? (
                    <div className="admin-type-selection">
                        <button className="admin-type-btn" onClick={() => setAdminType('organizer')}>
                            <i className="fas fa-users-cog"></i>
                            <span>Organizer Login</span>
                        </button>
                        <button className="admin-type-btn" onClick={() => setAdminType('super')}>
                            <i className="fas fa-shield-alt"></i>
                            <span>Super Admin Login</span>
                        </button>
                    </div>
                ) : (
                    <form id="adminLoginForm" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" id="adminUsername" required value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" id="adminPassword" required value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="admin-login-actions">
                            <button type="submit" className="btn-primary">
                                <i className="fas fa-sign-in-alt"></i> Login
                            </button>
                            <button type="button" className="btn-secondary" onClick={closeModal}>
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminLoginModal;