// api.js
const API_BASE = 'http://localhost:5000/api'; // Adjust to your backend URL

export const api = {
  // ADMIN STATS
  getAdminStats: async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/stats`);
      if (!res.ok) throw new Error('Failed to fetch admin stats');
      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // ALL REGISTRATIONS
  getAllRegistrations: async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/registrations`);
      if (!res.ok) throw new Error('Failed to fetch registrations');
      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // MARK REGISTRATION AS PAID
  adminMarkPaid: async (registrationId) => {
    try {
      const res = await fetch(`${API_BASE}/admin/registrations/${registrationId}/mark-paid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error('Failed to mark as paid');
      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // DELETE REGISTRATION
  adminDeleteRegistration: async (registrationId) => {
    try {
      const res = await fetch(`${API_BASE}/admin/registrations/${registrationId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error('Failed to delete registration');
      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // EVENTS
// EVENTS
getEvents: async () => {
  try {
    const res = await fetch(`${API_BASE}/events`);
    if (!res.ok) throw new Error('Failed to fetch events');
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
},

addEvent: async (formData) => {
  try {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      body: formData // ✅ FormData (no JSON headers)
    });
    if (!res.ok) throw new Error('Failed to add event');
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
},

updateEvent: async (eventId, formData) => {
  try {
    const res = await fetch(`${API_BASE}/events/${eventId}`, {
      method: 'PUT',
      body: formData // ✅ FormData (no JSON headers)
    });
    if (!res.ok) throw new Error('Failed to update event');
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
},

deleteEvent: async (eventId) => {
  try {
    const res = await fetch(`${API_BASE}/events/${eventId}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete event');
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
},

  // ORGANIZER/EVENT STATS
  getEventCounts: async () => {
    try {
      // This endpoint is defined in adminRoutes.js
      const res = await fetch(`${API_BASE}/admin/event-stats`);
      if (!res.ok) throw new Error('Failed to fetch event counts');
      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
};