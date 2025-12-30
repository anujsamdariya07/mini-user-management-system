import { useAuthStore } from '../../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  if (!authUser) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center bg-white p-8 border rounded'>
          <h1 className='text-2xl font-semibold mb-4'>
            User Management System
          </h1>
          <p className='text-gray-600 mb-6'>
            Please login or sign up to continue.
          </p>

          <div className='flex justify-center gap-4'>
            <span
              onClick={() => navigate('/signin')}
              className='px-4 py-2 bg-black text-white rounded cursor-pointer'
            >
              Login
            </span>
            <span
              onClick={() => navigate('/signup')}
              className='px-4 py-2 border rounded cursor-pointer'
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white p-8 border rounded text-center'>
        <h1 className='text-2xl font-semibold mb-2'>
          Welcome, {authUser.fullName}
        </h1>

        <p className='text-gray-600 mb-4'>
          Role: <span className='capitalize'>{authUser.role}</span>
        </p>

        <div className='flex justify-center gap-4'>
          <span
            onClick={() => navigate('/profile')}
            className='px-4 py-2 border rounded cursor-pointer'
          >
            My Profile
          </span>

          {authUser.role === 'admin' && (
            <span
              onClick={() => navigate('/admin')}
              className='px-4 py-2 bg-black text-white rounded cursor-pointer'
            >
              Admin Dashboard
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
