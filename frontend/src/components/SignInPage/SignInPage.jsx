import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Loader } from 'lucide-react';

const SignInPage = () => {
  const navigate = useNavigate();
  const { signIn, loading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const success = await signIn({ email, password });
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md bg-white p-6 rounded border'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Login</h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full border px-3 py-2 rounded'
              placeholder='Enter your email'
            />
            {errors.email && (
              <p className='text-sm text-red-500 mt-1'>{errors.email}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full border px-3 py-2 rounded'
              placeholder='Enter your password'
            />
            {errors.password && (
              <p className='text-sm text-red-500 mt-1'>{errors.password}</p>
            )}
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-black text-white py-2 rounded hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2'
          >
            {loading ? (
              <>
                <Loader className='animate-spin' size={18} />
                Signing in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className='text-sm text-center mt-4'>
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className='underline cursor-pointer'
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
