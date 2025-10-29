// AdminPage.jsx (Full Updated Code)

import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../api';
import EventManagementModal from '../components/admin/EventManagementModal';
import './AdminPage.css';

const AdminPage = () => {
    const { showPage, showAlert, showModal, setEventToEdit } = useContext(AppContext);
    const { logout, refreshUserData } = useContext(AuthContext);
    const [stats, setStats] = useState({});
    const [registrations, setRegistrations] = useState([]);
    const [events, setEvents] = useState([]);    // Helper to safely get registration ID
    const getRegId = (reg) => reg.registration_id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adminStats = await api.getAdminStats();
                setStats(adminStats);
                const allRegs = await api.getAllRegistrations();
                setRegistrations(allRegs);
                const allEvents = await api.getEvents();
                setEvents(allEvents);
            } catch (error) {
                showAlert('Failed to fetch admin data.', 'error');
            }
        };
        fetchData();
    }, [showAlert]);

    const adminMarkPaid = async (regId) => {
        if (!regId) {
            showAlert('Missing registration ID.', 'error');
            return;
        }

        try {
            // Refactor: Use the api helper for consistency
            await api.adminMarkPaid(regId);

            // Update the local state after successful API call
            const updatedRegs = registrations.map(reg => 
                // Ensure we are comparing the correct ID property
                (reg.registration_id || reg.id) === regId ? { ...reg, payment_status: 'paid' } : reg
            );
            setRegistrations(updatedRegs);
            
            // Refresh the admin stats after successful payment update
            const adminStats = await api.getAdminStats();
            setStats(adminStats);

            // Refresh global user data in case the admin is updating their own status
            if (typeof refreshUserData === 'function') {
                await refreshUserData();
            }

            showAlert('Payment status updated to PAID', 'success');

        } catch (error) {
            console.error('Mark paid error:', error);
            showAlert(error.message || 'Failed to update payment status.', 'error');
        }
    };

    const adminDeleteRegistration = async (regId) => {
        if (!regId) {
            showAlert('Missing registration ID.', 'error');
            return;
        }

        if (!window.confirm('Are you sure you want to delete this registration?')) {
            return;
        }

        try {
            // Refactor: Use the api helper
            await api.adminDeleteRegistration(regId);

            // Remove the deleted registration from local state
            const updatedRegs = registrations.filter(r => 
                (r.registration_id || r.id) !== regId
            );
            setRegistrations(updatedRegs);
            showAlert('Registration deleted successfully', 'success');

        } catch (error) {
            console.error('Delete registration error:', error);
            showAlert(error.message || 'Failed to delete registration.', 'error');
        }
    };
    const handleEventAction = async (eventData) => {
        try {
            if (eventData.id) {
                await api.updateEvent(eventData.id, eventData);
                showAlert('Event updated successfully!', 'success');
            } else {
                await api.addEvent(eventData);
                showAlert('Event added successfully!', 'success');
            }
            const allEvents = await api.getEvents();
            setEvents(allEvents);
            setEventToEdit(null);
            showModal(null);
        } catch (error) {
            showAlert('Failed to save event.', 'error');
        }
    };

    const deleteEvent = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await api.deleteEvent(eventId);
                const allEvents = await api.getEvents();
                setEvents(allEvents);
                showAlert('Event deleted successfully!', 'success');
            } catch (error) {
                showAlert('Failed to delete event.', 'error');
            }
        }
    };
    
    const adminLogout = () => {
        // Clear all auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        
        if (typeof logout === 'function') {
            logout();
        }

        // Force navigation to home page
        window.location.href = '/';
    };

    const downloadEventsCSV = () => {
        if (!events || events.length === 0) {
            showAlert('No events available to download.', 'info');
            return;
        }

        // Define CSV headers
        const headers = ['ID', 'Name', 'Category', 'Day', 'Department', 'Time', 'Venue', 'Description', 'Prize', 'Capacity'];
        
        // Helper to escape CSV data
        const escapeCsv = (field) => {
            if (field === null || field === undefined) return '';
            const str = String(field);
            // Wrap in quotes if it contains a comma, quote, or newline
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
        };

        // Convert event data to CSV rows
        const csvRows = [
            headers.join(','),
            ...events.map(event => [
                event.id, event.name, event.category, event.day, event.dept,
                event.time, event.venue, event.desc, event.prize, event.capacity
            ].map(escapeCsv).join(','))
        ];

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'technofest_events.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showAlert('Events CSV downloaded!', 'success');
    };
    return (
        <>
            <section id="admin" className="py-10 admin-page">
                <div className="admin-container max-w-6xl mx-auto px-6">
                    <div className="admin-header">
                        <div className="admin-title"><i className="fas fa-shield-alt"></i><h2>Super Admin Dashboard</h2></div>
                        <button className="btn-logout" onClick={adminLogout}><i className="fas fa-sign-out-alt"></i> Logout</button>
                    </div>
                    
                    {/* STATS SECTION */}
                    <div className="admin-stats">
                        <div className="admin-stat-card"><div className="stat-icon"><i className="fas fa-users"></i></div><div className="stat-info"><h3>{stats.totalRegistrations}</h3><p>Total Registrations</p></div></div>
                        <div className="admin-stat-card"><div className="stat-icon"><i className="fas fa-ticket-alt"></i></div><div className="stat-info"><h3>{stats.day1Passes}</h3><p>Day 1 Passes</p></div></div>
                        <div className="admin-stat-card"><div className="stat-icon"><i className="fas fa-ticket-alt"></i></div><div className="stat-info"><h3>{stats.day2Passes}</h3><p>Day 2 Passes</p></div></div>
                        <div className="admin-stat-card"><div className="stat-icon"><i className="fas fa-ticket-alt"></i></div><div className="stat-info"><h3>{stats.bothDayPasses}</h3><p>2-Day Passes</p></div></div>
                    </div>
                    
                    <div className="admin-content">
                        
                        {/* EVENT MANAGEMENT SECTION */}
                        <div className="admin-section">
                            <h3><i className="fas fa-calendar-plus"></i> Event Management</h3>
                            <div className="event-management-tools">
                                <button className="btn-primary" onClick={() => {
                                    setEventToEdit(null);
                                    showModal('event');
                                }}>
                                    <i className="fas fa-plus"></i> Add New Event
                                </button>
                                <button className="btn-secondary" onClick={downloadEventsCSV}>
                                    <i className="fas fa-download"></i> Download Events CSV
                                </button>
                            </div>
                            <div className="admin-table-container" style={{ marginTop: '20px' }}>
                                <table className="admin-table">
                                    <thead>
                                        <tr><th>ID</th><th>Name</th><th>Category</th><th>Day</th><th>Dept</th><th>Time</th><th>Venue</th><th>Actions</th></tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(events) && events.length > 0 ? events.map((event, index) => (
                                            <tr key={event.id || index}>
                                                <td>{event.id}</td>
                                                <td>{event.name}</td>
                                                <td><span className="badge">{event.category}</span></td>
                                                <td>{event.day}</td>
                                                <td>{event.dept}</td>
                                                <td>{event.time}</td>
                                                <td>{event.venue}</td>
                                                <td>
                                                    <button className="btn-small" onClick={() => {
                                                        setEventToEdit(event);
                                                        showModal('event');
                                                    }}><i className="fas fa-edit"></i></button>
                                                    <button className="btn-small danger" onClick={() => deleteEvent(event.id)}><i className="fas fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        )) : <tr><td colSpan="8" className="empty-message">No events found.</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* REGISTRATION MANAGEMENT SECTION */}
                        <div className="admin-section">
                            <h3>Complete Registration Management</h3>
                            <div className="admin-table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr><th>Reg ID</th><th>Name</th><th>Email</th><th>Pass Type</th><th>Amount</th><th>Payment Status</th><th>Actions</th></tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(registrations) && registrations.length > 0 ? registrations.map((reg, index) => {
                                            const currentRegId = getRegId(reg); // Use safe ID retrieval
                                            return (
                                            <tr key={reg.registration_id || index}>
    <td>{reg.registration_id}</td>
    <td>{reg.full_name}</td>
    <td>{reg.email}</td>
    <td>{reg.pass_type}</td>
    <td>₹{reg.pass_type === 'both' ? 300 : 200}</td>
    <td className={`status-badge ${reg.payment_status === 'paid' ? 'success' : 'unpaid'}`}>{reg.payment_status}</td>
    <td>
        {reg.payment_status !== 'paid' && (
            <button className="btn-small" onClick={() => adminMarkPaid(reg.registration_id)}>
                Mark Paid
            </button>
        )}
        <button className="btn-small danger" onClick={() => adminDeleteRegistration(reg.registration_id)}>
            Delete
        </button>
    </td>
</tr>
                                            );
                                        }) : <tr><td colSpan="7" className="empty-message">No registrations found.</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* REVENUE ANALYTICS SECTION */}
                        <div className="admin-section">
                            <h3>Revenue Analytics</h3>
                            <div className="revenue-cards">
                                <div className="revenue-card"><h4>Day 1 Revenue</h4><p>₹{stats.revenue1}</p></div>
                                <div className="revenue-card"><h4>Day 2 Revenue</h4><p>₹{stats.revenue2}</p></div>
                                <div className="revenue-card"><h4>2-Day Revenue</h4><p>₹{stats.revenueB}</p></div>
                                <div className="revenue-card total"><h4>Total Revenue</h4><p>₹{stats.revenue}</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <EventManagementModal onSubmit={handleEventAction} />
        </>
    );
};

export default AdminPage;