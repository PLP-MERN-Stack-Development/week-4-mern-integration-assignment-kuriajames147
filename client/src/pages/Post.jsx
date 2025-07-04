import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/Authcontext';

function PostPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    API.get(`/posts/${id}`).then(res => setPost(res.data));
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    await API.post(`/comments/${id}`, { body: comment });
    setComment('');
    const res = await API.get(`/posts/${id}`);
    setPost(res.data);
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      {post.image && <img src={`http://localhost:5000/${post.image}`} width="300" />}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {user && (
        <form onSubmit={handleComment}>
          <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Write a comment" />
          <button type="submit">Post Comment</button>
        </form>
      )}
      {post.comments.map(c => (
        <p key={c._id}><b>{c.author.username}:</b> {c.body}</p>
      ))}
    </div>
  );
}

export default PostPage;
