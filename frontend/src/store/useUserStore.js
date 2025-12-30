import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useUserStore = create((set) => ({
  userProfile: null,
  loading: false,
  updatingUser: false,
  updatingPassword: false,

  getMyProfile: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get('/users/me');
      set({ userProfile: res.data.user });
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to fetch profile!';
      toast.error(message);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (profileData) => {
    set({ updatingUser: true });
    try {
      const res = await axiosInstance.put('/users/me', profileData);
      set({ userProfile: res.data.user });
      toast.success(res.data.message);
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed!';
      toast.error(message);
      return false;
    } finally {
      set({ updatingUser: false });
    }
  },

  changePassword: async (passwordData) => {
    set({ updatingPassword: true });
    try {
      const res = await axiosInstance.put('/users/me/password', passwordData);
      toast.success(res.data.message);
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Password update failed!';
      toast.error(message);
      return false;
    } finally {
      set({ updatingPassword: false });
    }
  },

  clearUserProfile: () => set({ userProfile: null }),
}));
