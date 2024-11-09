import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(true);
  const [isNavOpen, setIsnavopen] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [posts, setPosts] = useState([]);  

  const toggleNav = () => {
    setIsnavopen(!isNavOpen);
  };

  const toggleExpanded = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };
  
  useEffect(() => {
    // Define the function to fetch posts and images
        const fetchPostsAndImages = async () => {
          const accessToken = 'access-token';
            try {
              // Fetch posts with media attachments directly
              const postsResponse = await axios.get(`https://graph.facebook.com/me/feed?fields=id,message,attachments,created_time&access_token=${accessToken}`);
              const postsData = postsResponse.data.data;

              // Map over posts and get images directly from attachments
              const postsWithImages = postsData.map(post => {
                const image = post.attachments?.data[0]?.media?.image?.src || null;
                return { ...post, image };
              });
                    setPosts(postsWithImages);
              } catch (error) {
                    console.error('Error fetching posts and images:', error);
              } finally {
                    setLoading(false);
              }
          };
            fetchPostsAndImages();
    }, []);

  return (
    <>
      <header className={`header ${isNavOpen ? 'nav-open' : ''}`}>
        <a href="#">
          <img src="lohviklogo.png" alt="site logo" className="logo" />
        </a>
        <div className="nav-wrapper">
          <nav className="main-nav">
            <ul className="main-nav-list">
              <li><a href="" className="main-nav-link">Esileht</a></li>
              <li><a href="" className="main-nav-link">Menüü</a></li>
              <h2 className="nav-title">KOHVIK LOHVIK</h2>
              <li><a href="" className="main-nav-link">Meie lugu</a></li>
              <li><a href="" className="main-nav-link">Väärtused</a></li>
            </ul>
          </nav>
          <button className="btn-mobile-nav" onClick={toggleNav}>
            <ion-icon className="icon-mobile-nav" name={isNavOpen ? "close-outline" : "menu-outline"}></ion-icon>
          </button>
        </div>
      </header>
      <main>
        <section className="landing-section">
          <div className="landing">
            <h1 className="langing-message">Lohviku kogemusõppe akadeemia</h1>
          </div>
        </section>
        <section className="section-hero">
          <div className="hero">
            <h2 className="post-heading">Postitused</h2>
            <div className="posts">
              {loading ? (
                 <div className="loading-spinner"></div>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.id} className="post">
                    <p className={expandedPosts[post.id]  ? 'expanded' : 'truncated'}>
                      {post.message || post.story}
                    </p>
                    {(post.message || post.story)?.length > 400 && (
                      <span className="show-more-btn" onClick={() => toggleExpanded(post.id)}>
                        {expandedPosts[post.id] ? 'Show Less' : 'Show More'}
                      </span>
                    )}
                    {post.image && <img src={post.image} alt="Post image"/>}
                    <div className="footer">
                      <div className="view-facebook">
                        <a href={`https://www.facebook.com/${post.id}`} target="_blank" rel="noopener noreferrer">
                          View on Facebook
                        </a>
                      </div>
                      <p className="date">
                        <small>Posted on: {new Date(post.created_time).toLocaleDateString()}</small>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className='no-posts'>No posts to display</p>
              )}
            </div>
            <div className="carousel-section">Carousel</div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
