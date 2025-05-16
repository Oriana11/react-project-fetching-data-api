import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './store/actions/postActions';
import './App.css';

const PostCard = ({ post }) => (
  <article className="post-card">
    <div className="post-content">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
    <div className="post-footer">
      <button className="read-more">Read More</button>
    </div>
  </article>
);

const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading posts...</p>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="error-container">
    <h2>Oops!</h2>
    <p>{message}</p>
    <button onClick={() => window.location.reload()}>Try Again</button>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Latest Posts</h1>
        <p className="subtitle">Explore our collection of interesting posts</p>
      </header>
      
      <main className="posts-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2025 Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
