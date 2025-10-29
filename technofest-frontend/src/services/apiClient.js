// src/services/apiClient.js
import axios from "axios";

// Base API URL
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: attach auth token & tenant ID
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  const tenant = localStorage.getItem("currentTenant");
  if (tenant) {
    try {
      const t = JSON.parse(tenant);
      config.headers["X-Tenant-ID"] = t.id || t.tenantId || t.slug;
    } catch {
      // ignore parse errors
    }
  }

  return config;
});

// Response interceptor: handle 401 & refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken });
          localStorage.setItem("authToken", data.accessToken);
          axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
          return axios(originalRequest);
        } catch {
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;