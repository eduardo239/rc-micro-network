import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';

/**
 * @description   Get all Comments
 * @route         GET /api/comments/
 * @access        Admin
 */
const new_comment = asyncHandler(async (req, res) => {
  const { content, rating, postId, userName } = req.body;
  console.log(req.body);
  const userId = req.user._id;

  // comment
  const comment = await Comment.create({
    postId,
    userId,
    content,
    userName,
    rating,
  });

  let post = await Post.findById(postId);
  post.comments.push(comment);
  post.save();
  res.json(post);
});

/**
 * @description   Get comment by id
 * @route         GET /api/comments/:id
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
 * @route         GET /api/comments/:id
 * @access        Public
 */
const deleteCommentById = asyncHandler(async (req, res) => {
  //  by params //TODO
  console.log(req.params.id);
  const comment = await Comment.findById(req.params.id);

  // TODO: get post by ... and pop() comment
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

export { new_comment, getById, deleteCommentById, get_all_comments };
