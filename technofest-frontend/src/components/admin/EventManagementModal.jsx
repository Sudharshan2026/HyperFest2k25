import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

const EventManagementModal = ({ onSubmit }) => {
    const { modal, closeModal, eventToEdit } = useContext(AppContext);

    const [eventData, setEventData] = useState({
        id: null,
        name: '',
        category: '',
        day: '',
        dept: '',
        time: '',
        venue: '',
        desc: '',
        prize: '',
        capacity: 50,
    });

    // Load eventToEdit data when editing
    useEffect(() => {
        if (eventToEdit) {
            setEventData({
                ...eventToEdit,
            });
        } else {
            setEventData({
                id: null,
                name: '',
                category: '',
                day: '',
                dept: '',
                time: '',
                venue: '',
                desc: '',
                prize: '',
                capacity: 50,
            });
        }
    }, [eventToEdit]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setEventData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Pass to parent for API call
        await onSubmit(eventData);
    };

    if (modal !== 'event') return null;

    return (
        <div className="modal active">
            <div className="modal-content" style={{ maxWidth: '600px' }}>
                <div className="modal-header">
                    <h3>
                        <i className="fas fa-calendar-plus"></i>{' '}
                        {eventToEdit ? 'Edit Event' : 'Add New Event'}
                    </h3>
                    <button type="button" className="close" onClick={closeModal}>
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body">
                    <div className="form-group">
                        <label htmlFor="name">Event Name *</label>
                        <input
                            type="text"
                            id="name"
                            value={eventData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category *</label>
                        <select
                            id="category"
                            value={eventData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="technical">Technical</option>
                            <option value="cultural">Cultural</option>
                            <option value="sports">Sports</option>
                            <option value="workshop">Workshop</option>
                            <option value="ceremony">Ceremony</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dept">Department *</label>
                        <select
                            id="dept"
                            value={eventData.dept}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Department</option>
                            <option value="cse">Computer Science</option>
                            <option value="ece">Electronics</option>
                            <option value="mech">Mechanical</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="day">Day *</label>
                        <select
                            id="day"
                            value={eventData.day}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Day</option>
                            <option value="day1">Day 1 (March 15)</option>
                            <option value="day2">Day 2 (March 16)</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="time">Time *</label>
                        <input
                            type="text"
                            id="time"
                            placeholder="e.g., 10:00 AM - 2:00 PM"
                            value={eventData.time}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="venue">Venue *</label>
                        <input
                            type="text"
                            id="venue"
                            placeholder="e.g., Main Auditorium"
                            value={eventData.venue}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <textarea
                            id="desc"
                            rows="4"
                            placeholder="Brief description of the event..."
                            value={eventData.desc}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="prize">Prize Details</label>
                        <input
                            type="text"
                            id="prize"
                            placeholder="e.g., ₹25,000 or Certificate"
                            value={eventData.prize}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="capacity">Max Participants</label>
                        <input
                            type="number"
                            id="capacity"
                            min="1"
                            value={eventData.capacity}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {eventToEdit ? 'Update Event' : 'Create Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventManagementModal;
