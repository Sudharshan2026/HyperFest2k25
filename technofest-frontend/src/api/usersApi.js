import { api } from './index';

export const getUserDetails = (userId) => api.get(`/users/${userId}`);
// Other user-related API calls can be added here