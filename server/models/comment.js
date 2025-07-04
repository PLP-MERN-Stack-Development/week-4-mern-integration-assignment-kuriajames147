import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
