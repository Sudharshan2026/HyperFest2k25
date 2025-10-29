import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const EventCard = ({ event }) => {
    const { currentUser, showModal, showAlert } = useContext(AppContext);

    const handleRegister = async () => {
        if (!currentUser) {
            showModal('login');
            return;
        }
        const regId = currentUser.registrationId || localStorage.getItem('registrationId');
        if (!regId) {
            showAlert('Please complete your main registration first.', 'error');
            return;
        }
        try {
            await import('../../api').then(({ api }) => api.registerForEvent(event.id, regId));
            showAlert(`Registered for ${event.name}!`, 'success');
        } catch (e) {
            showAlert('Failed to register for event.', 'error');
        }
    };

    return (
        <motion.div whileHover={{ y: -6 }} className="card-tw overflow-hidden">
            <div className="h-48 bg-gradient-to-tr from-primary/15 to-accent/15 relative">
                {event.image_url ? (
                    <img 
                        src={event.image_url} 
                        alt={event.name} 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-primary/15 to-accent/15" />
                )}
                <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">{event.category}</span>
                <span className="absolute top-3 right-3 bg-slate-800 text-white text-xs font-semibold px-2 py-1 rounded">{event.day === 'day1' ? 'Day 1' : 'Day 2'}</span>
            </div>
            <div className="p-5">
                <h4 className="text-xl font-bold text-slate-900">{event.name}</h4>
                <p className="text-slate-600 mt-2 line-clamp-3">{event.description}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 text-sm text-slate-600">
                    <span className="flex items-center gap-2 font-medium"><FaClock className="text-primary"/> {event.time}</span>
                    <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-primary"/> {event.venue}</span>
                </div>
                <button className="btn-primary-tw w-full mt-4" onClick={handleRegister}>
                    Register
                </button>
            </div>
        </motion.div>
    );
};

EventCard.propTypes = {
    event: PropTypes.object.isRequired,
};

export default EventCard;
