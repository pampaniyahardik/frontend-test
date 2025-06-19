// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pampaniyahardik.pythonanywhere.com/api/',
  withCredentials: true,  // important for session!
});

export default api;
