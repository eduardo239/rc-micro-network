import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { rootDir } from '../server.js';

/**
 * @description   Get all Comments
 * @route         GET /api/comments
 * @access        Admin
 */
const newPost = asyncHandler(async (req, res) => {
  const { content, rating } = req.body;
  const userId = req.user._id;

  // comment
  const comment = await Comment.create({ userId, content, rating });
  console.log(comment);

  let post = await Post.findById(req.params.id);
  post.replies.push(comment._id);
  post.save();
  res.json(post);
});

/**
 * @description   Get comment by id
 * @route         GET /api/comments/by/:id
 * @access        public
 */
const getById = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found.');
  }
  res.json(comment);
});

/**
 * @description   Delete comment by id
 * @route         GET /api/users/posts/:id
 * @access        Public
 */
const deleteCommentById = asyncHandler(async (req, res) => {
  //  by params //TODO
  console.log(req.params.id);
  const comment = await Comment.findById(req.params.id);

  // TODO: get post by ... and pop() comment

  if (comment) {
    comment.delete();
    res.status(200).json({ ok: 'ok' });
  } else {
    res.status(404);
    throw new Error('Comment not found.');
  }
});

export { newPost, getById, deleteCommentById };
