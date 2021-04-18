import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';
import User from '../models/userModel.js';

/**
 * @description   Post new comment
 * @route         POST /api/comments/:id
 * @access        Protect
 */
const post_new_comment = asyncHandler(async (req, res) => {
  const { content, postId, userName } = req.body;
  console.log(req.body); // FIXME userName undefined old comments

  const userId = req.user._id;

  const comment = await Comment.create({
    postId,
    userId,
    content,
    userName,
  });

  const user = await User.findById(userId);
  console.log(user);
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
 * @route         GET /api/comments/:id
 * @access        Private, Admin
 */
const delete_comment_by_id = asyncHandler(async (req, res) => {
  //  by params //TODO
  const comment = await Comment.findById(req.params.id);

  // FIXME: get post by ... and pop() comment
  const post = await Post.findById();

  if (comment) {
    comment.delete();
    res.status(200).json({ ok: 'ok' });
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

export {
  post_new_comment,
  get_comment_by_id,
  delete_comment_by_id,
  get_all_comments,
};
