import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const getMyProfile = async (req, res) => {
  try {
    return res.status(200).json({
      user: {
        id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        role: req.user.role,
        status: req.user.status,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error!' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format!' });
    }

    const existingUser = await User.findOne({
      email,
      _id: { $ne: req.user._id },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use!' });
    }

    req.user.fullName = fullName;
    req.user.email = email;

    await req.user.save();

    return res.status(200).json({
      message: 'Profile updated successfully!',
      user: {
        id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        role: req.user.role,
        status: req.user.status,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error!' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Current password is incorrect!' });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character!',
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return res.status(200).json({ message: 'Password updated successfully!' });
  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({ message: 'Server error!' });
  }
};

export { getMyProfile, updateProfile, changePassword };
