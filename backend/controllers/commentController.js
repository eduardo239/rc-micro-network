import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';
import User from '../models/userModel.js';
import PM from '../models/pmModel.js';

/**
 * @description   Post new comment
 * @route         POST /api/comments/:id
 * @access        Protect
 */
const post_new_comment = asyncHandler(async (req, res) => {
  const { content, postId } = req.body;

  const userId = req.user._id;

  const comment = await Comment.create({
    postId,
    userId,
    content,
  });

  const user = await User.findById(userId);
  const post = await Post.findById(postId);

  try {
    user.comments.push(comment);
    user.save();

    post.comments.push(comment);
    post.save();

    res.json(post);
  } catch (error) {
    res.status(400);
    throw new Error('New Comment Error.');
  }
});

/**
 * @description   Get comment by id
 * @route         GET /api/comments/:id
 * @access        Private
 */
// FIXME sem uso no front
const get_comment_by_id = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found.');
  }
  res.json(comment);
});

/**
 * @description   Delete comment by id
 * @route         DELETE /api/comments/:id
 * @access        Private, Admin
 */
const delete_comment_by_id = asyncHandler(async (req, res) => {
  const commentId = req.body.commentId;

  const comment = await Comment.findById(commentId);
  const user = await User.findById(comment.userId);
  const post = await Post.findById(comment.postId);

  user.comments.pull(commentId);
  post.comments.pull(commentId);

  if (comment) {
    await Comment.deleteOne({ _id: commentId });
    res.status(200).send(true);
  } else {
    res.status(404);
    throw new Error('Comment not found.');
  }
});

/**
 * @description   Get all comments
 * @route         GET /api/comments/
 * @access        Admin
 */
const get_all_comments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({});

  if (comments) {
    res.status(200).json(comments);
  } else {
    res.status(404);
    throw new Error('Comments not found.');
  }
});

/**
 * @description   Post new private message
 * @route         POST /api/private/
 * @access        Private
 */
const post_new_pm = asyncHandler(async (req, res) => {
  const { userId, content, destinationId } = req.body;

  const pm = await PM.create({
    userId,
    content,
    destinationId,
  });

  const user = await User.findById(userId);
  const destination = await User.findById(destinationId);

  if (user && destination) {
    user.privateMessages.push(pm);
    user.save();

    destination.privateMessages.push(pm);
    destination.save();

    res.status(200).json(pm);
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

export {
  post_new_comment,
  get_comment_by_id,
  delete_comment_by_id,
  get_all_comments,
  post_new_pm,
};
