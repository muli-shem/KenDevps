import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaHome, FaSearch, FaBell, FaEnvelope, FaUser, FaPlusCircle } from 'react-icons/fa';
import { fetchPosts, addPost } from '../Dashboard/postSlice';
import { RootState, store } from '../../app/store';
import '../../sytles/Contact.scss';

const Dashboard = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { posts, status, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddPost = () => {
    const content = prompt('Enter your post content:');
    if (content) {
      dispatch(addPost(content));
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <ul>
          <li><FaHome /> <span>Home</span></li>
          <li><FaSearch /> <span>Explore</span></li>
          <li><FaBell /> <span>Notifications</span></li>
          <li><FaEnvelope /> <span>Messages</span></li>
          <li><FaUser /> <span>Profile</span></li>
          <li onClick={handleAddPost}><FaPlusCircle /> <span>Post</span></li>
        </ul>
      </nav>
      <main className="main-content">
        <header>
          <h1>AfriVoice Hub</h1>
        </header>
        <section className="posts">
          {status === 'loading' && <p>Loading posts...</p>}
          {status === 'failed' && <p>Error: {error}</p>}
          {status === 'succeeded' && (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <p>{post.content}</p>
                  <small>By {post.author} on {new Date(post.timestamp).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;