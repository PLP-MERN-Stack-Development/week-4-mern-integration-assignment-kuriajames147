import Post from '../models/Post.js';

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
  res.json(posts);
};

export const createPost = async (req, res) => {
  const { title, body } = req.body;
  const image = req.file ? req.file.path : null;

  const post = await Post.create({ title, body, image, author: req.user._id });
  res.status(201).json(post);
};

export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author', 'username').populate({
    path: 'comments',
    populate: { path: 'author', select: 'username' }
  });
  res.json(post);
};

export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });

  post.title = req.body.title;
  post.body = req.body.body;
  if (req.file) post.image = req.file.path;

  await post.save();
  res.json(post);
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });

  await post.remove();
  res.json({ message: 'Post deleted' });
};
