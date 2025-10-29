import React from 'react';
import PropTypes from 'prop-types';

const EventForm = ({ event, onFormChange, onSubmit, onCancel, isEditing }) => {
    return (
        <form id="eventForm" onSubmit={onSubmit}>
            <input type="hidden" id="eventId" value={event.id || ''} />
            <div className="form-group"><label>Event Name *</label><input type="text" id="eventName" value={event.name} onChange={onFormChange} required placeholder="e.g., AI Hackathon" /></div>
            <div className="form-row">
                <div className="form-group"><label>Category *</label><select id="eventCategory" value={event.category} onChange={onFormChange} required><option value="">Select Category</option><option value="technical">Technical</option><option value="cultural">Cultural</option><option value="sports">Sports</option><option value="workshop">Workshop</option><option value="ceremony">Ceremony</option></select></div>
                <div className="form-group"><label>Day *</label><select id="eventDay" value={event.day} onChange={onFormChange} required><option value="">Select Day</option><option value="day1">Day 1 (March 15)</option><option value="day2">Day 2 (March 16)</option></select></div>
            </div>
            <div className="form-row">
                <div className="form-group"><label>Department *</label><select id="eventDept" value={event.dept} onChange={onFormChange} required><option value="">Select Department</option><option value="cse">Computer Science</option><option value="ece">Electronics</option><option value="mech">Mechanical</option><option value="civil">Civil</option><option value="eee">Electrical</option><option value="mba">MBA</option><option value="other">Other</option></select></div>
                <div className="form-group"><label>Time Slot *</label><input type="text" id="eventTime" value={event.time} onChange={onFormChange} required placeholder="e.g., 10:00 AM - 2:00 PM" /></div>
            </div>
            <div className="form-group"><label>Venue *</label><input type="text" id="eventVenue" value={event.venue} onChange={onFormChange} required placeholder="e.g., CS Lab 1, Main Auditorium" /></div>
            <div className="form-group"><label>Description</label><textarea id="eventDesc" rows="3" value={event.description} onChange={onFormChange} placeholder="Brief description of the event..."></textarea></div>
            <div className="form-row">
                <div className="form-group"><label>Prize / Reward</label><input type="text" id="eventPrize" value={event.prize} onChange={onFormChange} placeholder="e.g., ₹25,000 or Certificate" /></div>
                <div className="form-group"><label>Max Participants</label><input type="number" id="eventCapacity" value={event.capacity} onChange={onFormChange} min="1" /></div>
            </div>
            <div className="form-actions"><button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button><button type="submit" className="btn-primary"><i className="fas fa-save"></i> {isEditing ? 'Update Event' : 'Add Event'}</button></div>
        </form>
    );
};

EventForm.propTypes = {
    event: PropTypes.object.isRequired,
    onFormChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
};

export default EventForm;