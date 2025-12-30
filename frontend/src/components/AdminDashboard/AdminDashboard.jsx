import { useEffect, useState } from 'react';
import { useAdminStore } from '../../store/useAdminStore';

const AdminDashboard = () => {
  const {
    users,
    pagination,
    getAllUsers,
    activateUser,
    deactivateUser,
    loading,
  } = useAdminStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: '',
    userId: null,
    message: '',
  });

  useEffect(() => {
    getAllUsers(currentPage);
  }, [currentPage]);

  const handleActivate = (userId) => {
    setConfirmDialog({
      isOpen: true,
      type: 'activate',
      userId,
      message: 'Are you sure you want to activate this user?',
    });
  };

  const handleDeactivate = (userId) => {
    setConfirmDialog({
      isOpen: true,
      type: 'deactivate',
      userId,
      message: 'Are you sure you want to deactivate this user?',
    });
  };

  const handleConfirm = async () => {
    if (confirmDialog.type === 'activate') {
      await activateUser(confirmDialog.userId, currentPage);
    } else if (confirmDialog.type === 'deactivate') {
      await deactivateUser(confirmDialog.userId, currentPage);
    }
    setConfirmDialog({ isOpen: false, type: '', userId: null, message: '' });
  };

  const handleCancel = () => {
    setConfirmDialog({ isOpen: false, type: '', userId: null, message: '' });
  };

  return (
    <div className='max-w-6xl mx-auto mt-10 p-6 bg-white border rounded'>
      <h2 className='text-xl font-semibold mb-6'>Admin Dashboard</h2>

      <div className='overflow-x-auto'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='border-b text-left'>
              <th className='p-3'>Email</th>
              <th className='p-3'>Full Name</th>
              <th className='p-3'>Role</th>
              <th className='p-3'>Status</th>
              <th className='p-3'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className='border-b'>
                <td className='p-3'>{user.email}</td>
                <td className='p-3'>{user.fullName}</td>
                <td className='p-3 capitalize'>{user.role}</td>
                <td className='p-3 capitalize'>{user.status}</td>
                <td className='p-3'>
                  {user.status === 'active' ? (
                    <button
                      onClick={() => handleDeactivate(user._id)}
                      disabled={loading}
                      className='px-3 py-1 text-sm border rounded hover:bg-gray-100'
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleActivate(user._id)}
                      disabled={loading}
                      className='px-3 py-1 text-sm border rounded hover:bg-gray-100'
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan='5' className='p-4 text-center text-gray-500'>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className='flex justify-center gap-4 mt-6'>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className='px-3 py-1 border rounded disabled:opacity-50'
          >
            Previous
          </button>

          <span className='text-sm'>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <button
            disabled={currentPage === pagination.totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className='px-3 py-1 border rounded disabled:opacity-50'
          >
            Next
          </button>
        </div>
      )}

      {confirmDialog.isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4'>
            <h3 className='text-lg font-semibold mb-4'>Confirm Action</h3>
            <p className='text-gray-600 mb-6'>{confirmDialog.message}</p>
            <div className='flex justify-end gap-3'>
              <button
                onClick={handleCancel}
                className='px-4 py-2 border rounded hover:bg-gray-100'
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className='px-4 py-2 bg-black text-white rounded hover:opacity-90'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
