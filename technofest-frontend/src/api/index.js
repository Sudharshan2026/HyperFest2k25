// frontend/api/index.js (Full Updated Code)

import apiClient from '../services/apiClient';
import axios from 'axios';
const API_BASE_URL = 'http://localhost:5000/api';

const getAuth = async (endpoint) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        const error = new Error("Authentication required.");
        error.response = { status: 401, data: { message: "Authentication token missing." } };
        throw error;
    }
    
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const postAuth = async (endpoint, data) => {
    const response = await apiClient.post(endpoint, data);
    return response.data;
};

export const api = {
    getAdminStats: async () => {
        return getAuth('/admin/stats');
    },
    getAllRegistrations: async () => {
        return getAuth('/admin/registrations');
    },
    getEventCounts: async () => {
        return getAuth('/admin/event-stats');
    },
    getDeptCounts: async () => {
        return getAuth('/admin/dept-stats');
    },

    markAttendance: async (registrationId, day) => {
        const token = localStorage.getItem('authToken');
        const response = await axios.put(
            `${API_BASE_URL}/registrations/attendance/${registrationId}`,
            { day: day },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    },

    adminMarkPaid: async (regId) => {
    const response = await apiClient.post('/admin/mark-paid', { registrationId: regId });
    return response.data;
},
    
    adminLogin: async (username, password, type) => {
        const response = await apiClient.post('/auth/admin/login', { username, password, type });
        const { token, user } = response.data;
        localStorage.setItem('authToken', token);
        return user;
    },

    register: async (formData) => {
        const response = await apiClient.post('/registrations/register', formData);
        return response.data;
    },
    processPayment: async (paymentDetails) => { 
        const response = await apiClient.post('/registrations/payment', {
            registrationId: paymentDetails.registrationId,
            amount: paymentDetails.amount,
            method: paymentDetails.method, 
            transactionId: paymentDetails.transactionId,
            upiId: paymentDetails.upiId, 
        });
        return response.data;
    },
    
    getRegistrationById: async (regId) => {
        const response = await apiClient.get(`/registrations/id/${regId}`);
        return response.data;
    },
    generateCertificate: async (regId) => {
        const response = await apiClient.post(`/registrations/certificate/${regId}`);
        return response.data;
    },
    
    adminDeleteRegistration: async (regId) => {
        const response = await apiClient.delete(`/admin/registrations/${regId}`);
        return response.data;
    },
    getEvents: async () => {
        const response = await apiClient.get('/events');
        return response.data;
    },
    addEvent: async (event) => {
        const response = await apiClient.post('/events', event);
        return response.data;
    },
    updateEvent: async (eventId, event) => {
        const response = await apiClient.put(`/events/${eventId}`, event);
        return response.data;
    },
    deleteEvent: async (eventId) => {
        const response = await apiClient.delete(`/events/${eventId}`);
        return response.data;
    },
    registerForEvent: async (eventId, registrationId) => {
        const response = await apiClient.post(`/events/${eventId}/register`, { registrationId });
        return response.data;
    },
    getCertificates: async () => {
        return [];
    },
    getSchedule: async () => {
        const response = await apiClient.get('/events');
        return response.data;
    },
    getProfile: async () => {
        // FIX: Changed endpoint from /auth/me to /auth/profile
        return getAuth('/auth/profile'); 
    },
    getGallery: async () => {
        return [
            { id: 1, src: 'https://images.unsplash.com/photo-1517519014922-8fc06f3cbf34?q=80&w=1080&fit=crop', title: 'Opening Night', cat: 'events' },
            { id: 2, src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1080&fit=crop', title: 'Battle of Bands', cat: 'performances' },
            { id: 3, src: 'https://images.unsplash.com/photo-1472653816316-3ad6f10a6592?q=80&w=1080&fit=crop', title: 'Robotics Demo', cat: 'workshops' },
            { id: 4, src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1080&fit=crop', title: 'Hackathon', cat: 'events' },
            { id: 5, src: 'https://images.unsplash.com/photo-1482440308425-276ad0f28b19?q=80&w=1080&fit=crop', title: 'Awards Night', cat: 'awards' },
            { id: 6, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1080&fit=crop', title: 'Keynote', cat: 'performances' },
        ];
    },
};