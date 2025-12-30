import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5000/api'
      : 'https://mini-user-management-system-l8nf.onrender.com/api',
  withCredentials: true,
});
