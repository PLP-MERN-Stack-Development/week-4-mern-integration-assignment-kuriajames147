import Comment from '../models/comment.js';
import Post from '../models/Post.js';

export const addComment = async (req, res) => {
  const { body } = req.body;
  const postId = req.params.postId;

  const comment = await Comment.create({ body, post: postId, author: req.user._id });

  const post = await Post.findById(postId);
  post.comments.push(comment._id);
  await post.save();

  res.status(201).json(comment);
};
