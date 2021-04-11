import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * @description   Auth user and get token
 * @route         POST /api/users/login
 * @access        Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('Invalid email or password');
  }
});

/**
 * @description   Get user profile
 * @route         GET /api/users/profile
 * @access        Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

/**
 * @description   Update user profile
 * @route         PUT /api/users/profile
 * @access        Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

/**
 * @description   Register a new user
 * @route         POST /api/users
 * @access        Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists.');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }
});

/**
 * @description   Get uer by id
 * @route         GET /api/profile/:id
 * @access        Public
 */
const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const friend = await User.findById(id);

  if (!friend) {
    res.status(400);
    throw new Error('User not found.');
  } else {
    res.status(200).json({
      _id: friend._id,
      name: friend.name,
      email: friend.email,
      isAdmin: friend.isAdmin,
    });
  }
});

/**
 * @description   Get all users
 * @route         GET /api/users/all
 * @access        Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, null, { skip: 0, limit: 10 });

  if (!users) {
    res.status(400);
    throw new Error('Users not found.');
  } else {
    res.status(200).json(users);
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUserById,
  getAllUsers,
};
