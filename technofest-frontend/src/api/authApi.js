import apiClient from '../services/apiClient';

// Login with email and phone digits
export const login = (credentials) => apiClient.post('/auth/login', credentials);

// Get user details by email for verification
export const getUserByEmail = (email) => apiClient.get(`/users/email/${email}`);

// Admin login
export const adminLogin = (credentials) => apiClient.post('/auth/admin/login', credentials);