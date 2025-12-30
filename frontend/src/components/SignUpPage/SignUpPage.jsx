import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Loader } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const { signUp, loading } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword)
      newErrors.confirmPassword = 'Confirm password is required';

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (
      formData.password &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const success = await signUp({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    });

    if (success) {
      navigate('/signin');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md bg-white p-6 rounded border'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Sign Up</h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Full Name</label>
            <input
              type='text'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
              className='w-full border px-3 py-2 rounded'
              placeholder='Enter your full name'
            />
            {errors.fullName && (
              <p className='text-sm text-red-500 mt-1'>{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
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
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full border px-3 py-2 rounded'
              placeholder='Enter password'
            />
            {errors.password && (
              <p className='text-sm text-red-500 mt-1'>{errors.password}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>
              Confirm Password
            </label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='w-full border px-3 py-2 rounded'
              placeholder='Confirm password'
            />
            {errors.confirmPassword && (
              <p className='text-sm text-red-500 mt-1'>
                {errors.confirmPassword}
              </p>
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
                Creating account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className='text-sm text-center mt-4'>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/signin')}
            className='underline cursor-pointer'
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
