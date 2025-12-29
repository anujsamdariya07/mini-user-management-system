import User from '../models/userModel.js';

const getAllUsers = async (req, res) => {
  try {
    const page = Number(req.params.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
      },
    });
  } catch (error) {
    console.error('Get all users error:', error);
    return res.status(500).json({ message: 'Server error!' });
  }
};

const activateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    user.status = 'active';
    await user.save();

    return res.status(200).json({
      message: 'User account activated successfully!',
    });
  } catch (error) {
    console.error('Activate user error:', error);
    return res.status(500).json({ message: 'Server error!' });
  }
};

const deactivateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    user.status = 'inactive';
    await user.save();

    return res.status(200).json({
      message: 'User account deactivated successfully!',
    });
  } catch (error) {
    console.error('Deactivate user error:', error);
    return res.status(500).json({ message: 'Server error!' });
  }
};

export { getAllUsers, activateUser, deactivateUser };
