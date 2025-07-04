import { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get('/posts').then(res => setPosts(res.data));
  }, []);

  return (
    <div>
      <h1>Recent Posts</h1>
      {posts.map(post => (
        <div key={post._id}>
          <Link to={`/post/${post._id}`}>
            <h2>{post.title}</h2>
            {post.image && <img src={`http://localhost:5000/${post.image}`} width="200" />}
            <p>by {post.author.username}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
