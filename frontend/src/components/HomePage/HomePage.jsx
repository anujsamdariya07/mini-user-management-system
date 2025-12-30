import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { authUser } = useAuthStore();

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
            <Link to='/login' className='px-4 py-2 bg-black text-white rounded'>
              Login
            </Link>
            <Link to='/signup' className='px-4 py-2 border rounded'>
              Sign Up
            </Link>
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
          <Link to='/profile' className='px-4 py-2 border rounded'>
            My Profile
          </Link>

          {authUser.role === 'admin' && (
            <Link
              to='/admin'
              className='px-4 py-2 bg-black text-white rounded'
            >
              Admin Dashboard
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
