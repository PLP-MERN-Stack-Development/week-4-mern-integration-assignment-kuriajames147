import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [form, setForm] = useState({ title: '', body: '' });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', form.title);
    data.append('body', form.body);
    if (image) data.append('image', image);

    await API.post('/posts', data);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="Body" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} />
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button type="submit">Post</button>
    </form>
  );
}

export default CreatePost;
