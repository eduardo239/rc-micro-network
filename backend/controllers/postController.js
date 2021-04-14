import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

import { rootDir } from '../server.js';

/**
 * @description   Get all posts
 * @route         GET /api/posts
 * @access        Public
 */
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}, null, { sort: { createdAt: -1 } }).populate(
    'comments',
    'content userId postId createdAt'
  );

  if (!posts) {
    res.status(404);
    throw new Error('Posts not found.');
  }
  res.status(200).json(posts);
});

/**
 * @description   Get post by id
 * @route         GET /api/posts/:id
 * @access        Public
 */
const getPostById = asyncHandler(async (req, res) => {
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
const createNewPost = asyncHandler(async (req, res) => {
  const { userId, content } = req.body;

  if (!req.files) {
    res.status(400);
    throw new Error('file is not found');
  }

  const myFile = req.files.file;

  myFile.mv(`${rootDir}${myFile.name}`, function (err) {
    if (err) {
      console.log(err);
      res.status(400);
      throw new Error('Error ocurred');
    }
  });

  const post = await Post.create({
    userId: userId,
    image: `http://localhost:5000/public/${myFile.name}`,
    content,
  });

  if (post) {
    res.status(201).json({
      name: myFile.name,
      path: `http://localhost:5000/public/${myFile.name}`,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }
});

/**
 * @description   Delete post by id
 * @route         DELETE /api/posts/:id
 * @access        Private, OwnUser
 */
const deletePost = asyncHandler(async (req, res) => {
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

  res.json(post);
  if (!p) {
    res.status(400);
    throw new Error('Post not found');
  }
});

/**
 * @description   Search in content
 * @route         GET /api/search/:term
 * @access        Private
 */
const search_post = asyncHandler(async (req, res) => {
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

export {
  getPostById,
  getPosts,
  createNewPost,
  deletePost,
  post_like,
  search_post,
};
