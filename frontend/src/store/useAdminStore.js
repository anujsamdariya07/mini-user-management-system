import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAdminStore = create((set) => ({
  users: [],
  pagination: null,
  loading: false,

  getAllUsers: async (page = 1) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/admin/users/${page}`);

      set({
        users: res.data.users,
        pagination: res.data.pagination,
      });

      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch users!';
      toast.error(message);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  activateUser: async (userId, page = 1) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.patch(`/admin/users/${userId}/activate`);

      toast.success(res.data.message);

      await axiosInstance.get(`/admin/users/${page}`).then((res) =>
        set({
          users: res.data.users,
          pagination: res.data.pagination,
        })
      );

      return true;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to activate user!';
      toast.error(message);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deactivateUser: async (userId, page = 1) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.patch(
        `/admin/users/${userId}/deactivate`
      );

      toast.success(res.data.message);

      await axiosInstance.get(`/admin/users/${page}`).then((res) =>
        set({
          users: res.data.users,
          pagination: res.data.pagination,
        })
      );

      return true;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to deactivate user!';
      toast.error(message);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  clearAdminData: () => set({ users: [], pagination: null }),
}));
