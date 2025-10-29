import React from 'react';
import PropTypes from 'prop-types';

const EventManagement = ({ events, onAddEvent, onEditEvent, onDeleteEvent }) => {
    return (
        <div className="admin-section">
            <h3><i className="fas fa-calendar-plus"></i> Event Management</h3>
            <div className="event-management-tools">
                <button className="btn-primary" onClick={onAddEvent}><i className="fas fa-plus"></i> Add New Event</button>
            </div>
            <div className="admin-table-container" style={{ marginTop: '20px' }}>
                <table className="admin-table">
                    <thead>
                        <tr><th>ID</th><th>Name</th><th>Category</th><th>Day</th><th>Dept</th><th>Time</th><th>Venue</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {Array.isArray(events) && events.map(event => (
                            <tr key={event.id}>
                                <td>{event.id}</td>
                                <td>{event.name}</td>
                                <td><span className="badge">{event.category}</span></td>
                                <td>{event.day}</td>
                                <td>{event.dept}</td>
                                <td>{event.time}</td>
                                <td>{event.venue}</td>
                                <td>
                                    <button className="btn-small" onClick={() => onEditEvent(event)}><i className="fas fa-edit"></i></button>
                                    <button className="btn-small danger" onClick={() => onDeleteEvent(event.id)}><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

EventManagement.propTypes = {
    events: PropTypes.array.isRequired,
    onAddEvent: PropTypes.func.isRequired,
    onEditEvent: PropTypes.func.isRequired,
    onDeleteEvent: PropTypes.func.isRequired,
};

export default EventManagement;