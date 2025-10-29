import { api } from './index';

export const registerUser = (formData) => api.post('/registrations/register', formData);
export const processPayment = (paymentData) => api.post('/registrations/payment', paymentData);
export const getRegistrationByEmail = (email) => api.get(`/registrations/${email}`);