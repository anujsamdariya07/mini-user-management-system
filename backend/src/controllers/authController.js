import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Please enter a valid email address!',
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character!',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      status: 'active',
    });

    await newUser.save();

    generateToken(newUser._id, res);

    return res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
      },
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    return res
      .status(500)
      .json({ message: 'Server error! Please try again later!' });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and Password are required!' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password!' });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      message: 'Login successful!',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error('SignIn Error:', error);
    return res
      .status(500)
      .json({ message: 'Server error! Please try again later!' });
  }
};

const check = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated!' });
    }

    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    return res.status(200).json({
      message: 'Authenticated user retrieved successfully!',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error('Error in checkAuth controller:', error.message);
    return res.status(500).json({ message: 'Internal Server Error!' });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0),
    });

    return res.status(200).json({ message: 'Logged Out Successfully!' });
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

export { signUp, signIn, check, logout };
