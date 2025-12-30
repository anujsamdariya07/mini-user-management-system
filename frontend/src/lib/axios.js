import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://mini-user-management-system-l8nf.onrender.com/api',
  withCredentials: true,
});
