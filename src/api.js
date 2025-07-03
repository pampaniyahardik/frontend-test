// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true,
});

// Request Interceptor: Add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Refresh token on 401 error
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and refresh token exists, try to refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh_token")
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh: localStorage.getItem("refresh_token"),
        });

        const newAccessToken = res.data.access;
        localStorage.setItem("access_token", newAccessToken);

        // Update authorization header
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest); // retry the original request
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        // Clear tokens and redirect to login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/"; // 🔐 force re-login
      }
    }

    return Promise.reject(error);
  }
);

export default api;
