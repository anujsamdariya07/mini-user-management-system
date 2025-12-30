import { useEffect, useState } from 'react';
import { useUserStore } from '../../store/useUserStore';
import { Loader } from 'lucide-react';

const ProfilePage = () => {
  const {
    updatingUser,
    updatingPassword,
    userProfile,
    getMyProfile,
    updateProfile,
    changePassword,
  } = useUserStore();

  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getMyProfile();
  }, []);

  useEffect(() => {
    if (userProfile) {
      setProfileData({
        fullName: userProfile.fullName,
        email: userProfile.email,
      });
    }
  }, [userProfile]);

  const validateProfile = () => {
    const newErrors = {};

    if (!profileData.fullName) newErrors.fullName = 'Full name is required';

    if (!profileData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email))
      newErrors.email = 'Invalid email format';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSave = async () => {
    if (!validateProfile()) return;
    await updateProfile(profileData);
  };

  const handleProfileCancel = () => {
    if (userProfile) {
      setProfileData({
        fullName: userProfile.fullName,
        email: userProfile.email,
      });
    }
    setErrors({});
  };

  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setErrors({
        password: 'Both password fields are required',
      });
      return;
    }

    const success = await changePassword(passwordData);
    if (success) {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
      });
      setErrors({});
    }
  };

  if (!userProfile) return null;

  return (
    <div className='max-w-xl mx-auto mt-10 p-6 border rounded bg-white'>
      <h2 className='text-xl font-semibold mb-6'>My Profile</h2>

      <div className='mb-6'>
        <p className='text-sm text-gray-600'>
          Role: <span className='capitalize'>{userProfile.role}</span>
        </p>
        <p className='text-sm text-gray-600'>
          Status: <span className='capitalize'>{userProfile.status}</span>
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleProfileSave();
        }}
        className='space-y-4'
      >
        <h3 className='font-medium'>Edit Profile</h3>

        <div>
          <label className='block text-sm mb-1'>Full Name</label>
          <input
            type='text'
            value={profileData.fullName}
            onChange={(e) =>
              setProfileData({ ...profileData, fullName: e.target.value })
            }
            className='w-full border px-3 py-2 rounded'
          />
          {errors.fullName && (
            <p className='text-sm text-red-500 mt-1'>{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className='block text-sm mb-1'>Email</label>
          <input
            type='email'
            value={profileData.email}
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
            className='w-full border px-3 py-2 rounded'
          />
          {errors.email && (
            <p className='text-sm text-red-500 mt-1'>{errors.email}</p>
          )}
        </div>

        <div className='flex gap-3'>
          <button
            type='submit'
            disabled={updatingUser}
            className='px-4 py-2 bg-black text-white rounded flex items-center gap-2 disabled:opacity-50'
          >
            {updatingUser ? (
              <>
                <Loader className='animate-spin' size={16} />
                Saving...
              </>
            ) : (
              'Save'
            )}
          </button>

          <button
            onClick={handleProfileCancel}
            className='px-4 py-2 border rounded'
          >
            Cancel
          </button>
        </div>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePasswordChange();
        }}
        className='mt-8 space-y-4'
      >
        <h3 className='font-medium'>Change Password</h3>

        <div>
          <label className='block text-sm mb-1'>Current Password</label>
          <input
            type='password'
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword: e.target.value,
              })
            }
            className='w-full border px-3 py-2 rounded'
          />
        </div>

        <div>
          <label className='block text-sm mb-1'>New Password</label>
          <input
            type='password'
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                newPassword: e.target.value,
              })
            }
            className='w-full border px-3 py-2 rounded'
          />
        </div>

        {errors.password && (
          <p className='text-sm text-red-500'>{errors.password}</p>
        )}

        <button
          type='submit'
          disabled={updatingPassword}
          className='px-4 py-2 bg-black text-white rounded flex items-center gap-2 disabled:opacity-50'
        >
          {updatingPassword ? (
            <>
              <Loader className='animate-spin' size={16} />
              Updating...
            </>
          ) : (
            'Update Password'
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
