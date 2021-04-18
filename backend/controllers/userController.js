import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * @description   Auth user and get token
 * @route         POST /api/users/login
 * @access        Public
 */
const auth_user = asyncHandler(async (req, res) => {
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
const get_user_profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
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
const update_user_profile = asyncHandler(async (req, res) => {
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
const post_new_user = asyncHandler(async (req, res) => {
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
 * @description   Get user by id
 * @route         GET /api/profile/:id
 * @access        Public
 */
const get_user_by_id = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      friends: user.friends,
      avatar: user.avatar,
      profileImage: user.profileImage,
    });
  } else {
    res.status(400);
    throw new Error('User not found.');
  }
});

/**
 * @description   Get all users
 * @route         GET /api/users/all
 * @access        Admin
 */
const get_all_users = asyncHandler(async (req, res) => {
  const users = await User.find({}, null, {
    skip: 0,
    limit: 100,
    sort: { createdAt: -1 },
  }).populate('comments');

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(400);
    throw new Error('Users not found.');
  }
});

/**
 * @description   Get all posts by user
 * @route         GET /api/users/posts/:id
 * @access        Public
 */
const get_posts_by_user = asyncHandler(async (req, res) => {
  //  by params //TODO
  console.log(req.params.userId);
  const post = await Post.find({ user: req.params.userId });

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404);
    throw new Error('Posts not found.');
  }
});

/**
 * @description   Add a new user as friend
 * @route         GET /api/users/friend/:friendId
 * @access        Private
 */
const add_friend = asyncHandler(async (req, res) => {
  const friendId = req.params.friendId;
  const userId = req.params.userId;

  const friend = await User.findById(friendId);
  const user = await User.findById(userId);

  const alreadyFriend = await User.find({
    friends: { $elemMatch: { id: friendId } },
  });
  // TODO: check if user already is a friend

  if (friend && user) {
    user.friends.push(friend._id);
    user.save();
  } else {
    res.status(404);
    throw new Error('Error adding user.');
  }
});

/**
 * @description   Delete one user
 * @route         DELETE /api/users/:id
 * @access        Admin
 */
const delete_user = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);
  console.log(user);
  if (user) {
    await User.deleteOne({ _id: id });
    res.send(true);
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

export {
  auth_user,
  get_user_profile,
  post_new_user,
  update_user_profile,
  get_user_by_id,
  get_all_users,
  get_posts_by_user,
  add_friend,
  delete_user,
};
