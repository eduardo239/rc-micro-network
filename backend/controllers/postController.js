import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { rootDir } from '../server.js';

/**
 * @description   Fetch all posts
 * @route         GET /api/posts
 * @access        Public
 */
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}, null, { sort: { createdAt: -1 } });
  res.json(posts);
});

/**
 * @description   Fetch a single post
 * @route         GET /api/posts/:id
 * @access        Public
 */
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found.');
  }
});

/**
 * @description   Create a nwe post
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
    user: userId,
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

  console.log(id);

  if (!id) {
    res.status(400);
    throw new Error('Post not found');
  }

  const p = await Post.findById(id);

  const postUser = p?.user;
  const postUserReq = req?.user?._id;

  if (!postUser || !postUserReq) {
    res.status(404);
    throw new Error('Post not found.');
  }

  if (postUser.equals(postUserReq) || req.user.isAdmin) {
    const post = await Post.deleteOne({ _id: id });

    res.status(201).json('Post deleted.');
  } else {
    res.status(401);
    throw new Error('Unauthorized');
  }
});

export { getPostById, getPosts, createNewPost, deletePost };
