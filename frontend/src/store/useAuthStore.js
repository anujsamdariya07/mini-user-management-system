import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  authUser: null,
  loading: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null });
      if (error.response?.data?.inactive) {
        try {
          await axiosInstance.post('/auth/signout');
          toast.error('Your account has been deactivated!');
        } catch (signOutError) {
          toast.error(
            signOutError.response?.data?.message ||
              'Error during sign out process!'
          );
        }
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (userData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post('/auth/signup', userData);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Sign Up failed! Please try again.';
      toast.error(message);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (credentials) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post('/auth/signin', credentials);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Sign In failed! Please try again.';
      toast.error(message);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post('/auth/signout');
      set({ authUser: null });
      toast.success(res.data.message);
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Sign Out failed! Please try again.';
      toast.error(message);
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
