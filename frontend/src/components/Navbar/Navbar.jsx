import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useUserStore } from '../../store/useUserStore';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser, signOut } = useAuthStore();
  const { clearUserProfile } = useUserStore();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    const success = await signOut();
    if (success) {
      clearUserProfile();
      navigate('/login');
    }
  };

  return (
    <nav className='w-full border-b bg-white px-4 sm:px-6 py-3'>
      <div className='flex items-center justify-between'>
        <span
          onClick={() => navigate('/')}
          className='font-semibold text-lg cursor-pointer'
        >
          User Management System
        </span>

        <div className='hidden sm:flex items-center gap-6'>
          {authUser && (
            <>
              <span
                onClick={() => navigate('/profile')}
                className='text-sm hover:font-semibold cursor-pointer'
              >
                Profile
              </span>

              {authUser.role === 'admin' && (
                <span
                  onClick={() => navigate('/admin')}
                  className='text-sm hover:font-semibold cursor-pointer'
                >
                  Admin Dashboard
                </span>
              )}
            </>
          )}

          {authUser ? (
            <div className='flex items-center gap-4'>
              <div className='text-sm text-right'>
                <p className='font-medium'>{authUser.fullName}</p>
                <p className='text-xs text-gray-500 capitalize'>
                  {authUser.role}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className='text-sm border px-3 py-1 rounded hover:bg-gray-100 flex justify-center items-center'
              >
                Logout
              </button>
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <Link
                to='/signin'
                className='text-sm border px-3 py-1 rounded hover:bg-gray-100'
              >
                Sign In
              </Link>
              <Link
                to='/signup'
                className='text-sm border px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700'
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='sm:hidden text-2xl'
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className='sm:hidden mt-4 border-t pt-4 space-y-3'>
          {authUser ? (
            <>
              <div className='text-sm'>
                <p className='font-medium'>{authUser.fullName}</p>
                <p className='text-xs text-gray-500 capitalize'>
                  {authUser.role}
                </p>
              </div>

              <span
                onClick={() => {
                  navigate('/profile');
                  setMenuOpen(false);
                }}
                className='block text-sm cursor-pointer'
              >
                Profile
              </span>

              {authUser.role === 'admin' && (
                <span
                  onClick={() => {
                    navigate('/admin');
                    setMenuOpen(false);
                  }}
                  className='block text-sm cursor-pointer'
                >
                  Admin Dashboard
                </span>
              )}

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className='text-sm border px-3 py-1 rounded w-full text-left'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to='/signin'
                onClick={() => setMenuOpen(false)}
                className='block text-sm border px-3 py-2 rounded'
              >
                Sign In
              </Link>
              <Link
                to='/signup'
                onClick={() => setMenuOpen(false)}
                className='block text-sm border px-3 py-2 rounded bg-blue-600 text-white'
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
