import React from 'react';
import PropTypes from 'prop-types';

const AdminDashboard = ({ stats, registrations, onMarkPaid, onDeleteRegistration }) => {
    return (
        <div className="admin-container">
            <div className="admin-stats">
                <div className="admin-stat-card"><div className="stat-icon"><i className="fas fa-users"></i></div><div className="stat-info"><h3>{stats.totalRegistrations}</h3><p>Total Registrations</p></div></div>
                <div className="admin-stat-card"><div className="stat-icon"><i className="fas fa-ticket-alt"></i></div><div className="stat-info"><h3>{stats.day1Passes}</h3><p>Day 1 Passes</p></div></div>
                <div className="admin-stat-card"><div className="stat-icon"><i className="fas fa-ticket-alt"></i></div><div className="stat-info"><h3>{stats.day2Passes}</h3><p>Day 2 Passes</p></div></div>
                <div className="admin-stat-card"><div className="stat-icon"><i className="fas fa-ticket-alt"></i></div><div className="stat-info"><h3>{stats.bothDayPasses}</h3><p>2-Day Passes</p></div></div>
            </div>
            
            <div className="admin-section">
                <h3>Complete Registration Management</h3>
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr><th>Reg ID</th><th>Name</th><th>Email</th><th>Pass Type</th><th>Amount</th><th>Payment Status</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {registrations.map(reg => (
                                <tr key={reg.registrationId}>
                                    <td>{reg.registrationId}</td>
                                    <td>{reg.fullName}</td>
                                    <td>{reg.email}</td>
                                    <td>{reg.passType}</td>
                                    <td>₹{reg.passType === 'both' ? 300 : 200}</td>
                                    <td className={`status-badge ${reg.paymentStatus === 'paid' ? 'success' : 'unpaid'}`}>{reg.paymentStatus}</td>
                                    <td>
                                        {reg.paymentStatus !== 'paid' && <button className="btn-small" onClick={() => onMarkPaid(reg.registrationId)}>Mark Paid</button>}
                                        <button className="btn-small danger" onClick={() => onDeleteRegistration(reg.registrationId)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

AdminDashboard.propTypes = {
    stats: PropTypes.object.isRequired,
    registrations: PropTypes.array.isRequired,
    onMarkPaid: PropTypes.func.isRequired,
    onDeleteRegistration: PropTypes.func.isRequired,
};

export default AdminDashboard;