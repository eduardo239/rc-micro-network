import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import { rootDir } from '../server.js';
import { checkFileType } from '../routes/uploadRoutes.js';
import { storage } from '../routes/uploadRoutes.js';
import { upload } from '../routes/uploadRoutes.js';

/**
 * @description   Get all posts
 * @route         GET /api/posts
 * @access        Public
 */
const get_all_posts = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const skip = parseInt(req.query.skip) || 0;

  const posts = await Post.find({}, null, { sort: { createdAt: -1 } })
    .populate('comments', 'content userId postId createdAt userName')
    .limit(limit)
    .skip(skip);

  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(404);
    throw new Error('Posts not found.');
  }
});

/**
 * @description   Get post by id
 * @route         GET /api/posts/:id
 * @access        Public
 */
const get_post_by_id = asyncHandler(async (req, res) => {
  const post = await Post.findById({ _id: req.params.id }, null, {
    sort: { createdAt: -1 },
  }).populate('comments', 'content userId postId createdAt userName');

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found.');
  }
});

/**
 * @description   Create a new post
 * @route         POST /api/posts/
 * @access        Private
 */
const post_new_post = asyncHandler(async (req, res) => {
  const { userId, content, userName } = req.body;

  const post = await Post.create({
    userId,
    image: `http://localhost:5000/uploads/${req.file.filename}`,
    content,
    userName,
  });

  const user = await User.findById(userId);

  if (post && user) {
    user.posts.push(post);
    user.save();
    res.status(200).send(post);
  } else {
    res.status(400);
    throw new Error('Error when creating the post.');
  }

  // if (user) {
  //   if (req.file) {
  //     const avatarUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  //     user.avatar = avatarUrl || user.avatar;
  //     const updatedUser = await user.save();
  //     res.send(avatarUrl);
  //   } else {
  //     res.status(404);
  //     throw new Error('Image not found.');
  //   }
  // } else {
  //   res.status(404);
  //   throw new Error('User not found.');
  // }

  // - - - - - - - - -
  // const { userId, content, userName } = req.body;

  // if (!req.files) {
  //   res.status(400);
  //   throw new Error('File is not found');
  // }

  // const myFile = req.files.file;

  // myFile.mv(`${rootDir}${myFile.name}`, function (err) {
  //   if (err) {
  //     console.log(err);
  //     res.status(400);
  //     throw new Error('Error ocurred');
  //   }
  // });

  // const post = await Post.create({
  //   userId: userId,
  //   image: `http://localhost:5000/public/${myFile.name}`,
  //   content,
  //   userName,
  // });

  // if (post) {
  //   res.status(201).json({
  //     name: myFile.name,
  //     path: `http://localhost:5000/public/${myFile.name}`,
  //   });
  // } else {
  //   res.status(400);
  //   throw new Error('Invalid user data.');
  // }
});

/**
 * @description   Delete post by id
 * @route         DELETE /api/posts/:id
 * @access        Private, OwnUser
 */
const delete_post = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const p = await Post.findById(id);

  const postUser = p.userId;
  const postUserReq = req.user._id;

  if (!postUser || !postUserReq) {
    res.status(404);
    throw new Error('Post not found.');
  }

  if (postUser.equals(postUserReq) || req.user.isAdmin) {
    console.log(3);
    await Post.deleteOne({ _id: id });

    res.status(201).json('Post deleted.');
  } else {
    res.status(401);
    throw new Error('Unauthorized');
  }

  if (!p) {
    res.status(400);
    throw new Error('Post not found');
  }
});

/**
 * @description   Like button
 * @route         DELETE /api/posts/:id/like
 * @access        Private
 */
const post_like = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const post = await Post.findByIdAndUpdate(
    { _id: id },
    { $inc: { likes: 1 } },
    { new: true }
  );

  if (post) {
    res.json(post);
  } else {
    res.status(400);
    throw new Error('Post not found');
  }
});

/**
 * @description   Search in content
 * @route         GET /api/search/:term
 * @access        Private
 */
const post_search = asyncHandler(async (req, res) => {
  const term = req.params.term;

  await Post.search(
    {
      content: '#filmes',
    },
    function (err, results) {
      res.json(results);
      if (results) {
      } else {
        res.status(404);
        throw new Error('Posts not found');
      }
    }
  );
});

/**
 * @description   Get posts by user id
 * @route         GET /api/posts/my/:userId
 * @access        Private/Owner
 */
const get_posts_by_user = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const posts = await Post.find({ userId });

  if (posts) {
    res.json(posts);
  } else {
    res.status(404);
    throw new Error('Posts not found.');
  }
});

export {
  get_post_by_id,
  get_all_posts,
  post_new_post,
  delete_post,
  post_like,
  post_search,
  get_posts_by_user,
};
