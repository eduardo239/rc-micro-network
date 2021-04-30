import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import Jimp from 'jimp';

/**
 * @description   Get all posts
 * @route         GET /api/posts
 * @access        Public
 */
const get_all_posts = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const skip = parseInt(req.query.skip) || 0;

  const posts = await Post.find({}, null, { sort: { createdAt: -1 } })
    .populate('comments', 'content userId postId createdAt')
    .populate('userId', 'imageAvatar name')
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
  })
    .populate({
      path: 'comments',
      populate: {
        path: 'userId',
        select: 'name imageAvatar',
      },
    })
    .populate('userId', 'name imageAvatar');

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
  const { userId, content } = req.body;

  const image = await Jimp.read(
    `http://localhost:5000/uploads/${req.file.filename}`
  );
  await image.resize(600, Jimp.AUTO);
  await image.quality(90);
  await image.write(`backend/uploads/${req.file.filename}`);

  const post = await Post.create({
    userId,
    image: `http://localhost:5000/uploads/${req.file.filename}`,
    content,
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
});

/**
 * @description   Delete post by id
 * @route         DELETE /api/posts/:id
 * @access        Private, OwnUser
 */
const delete_post = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found.');
  }

  const postUserId = post.userId;
  const userId = req.user._id;

  if (!postUserId || !userId) {
    res.status(404);
    throw new Error('Post not found.');
  }

  if (postUserId.equals(userId) || req.user.isAdmin) {
    await Post.deleteOne({ _id: id });

    res.status(201).json('Post deleted.');
  } else {
    res.status(401);
    throw new Error('Unauthorized');
  }

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }
});

/**
 * @description   Like button
 * @route         DELETE /api/posts/like/:id
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

/**
 * @description   Search in post content
 * @route         GET /api/search/:term
 * @access        Private
 */
const search_term = asyncHandler(async (req, res) => {
  const term = req.params.term;

  const search = await Post.find({ content: { $regex: term, $options: 'i' } });

  if (search.length !== 0) {
    res.json(search);
  } else {
    res.status(404);
    throw new Error('Posts not found.');
  }
});

/**
 * @description   Update post content
 * @route         PUT /api/posts/:id
 * @access        Private
 */
const update_post = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    post.content = req.body.content || post.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Post not found.');
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
  search_term,
  update_post,
};
