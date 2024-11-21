import { useState, useEffect, useRef } from 'react';
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

            const landingSection = document.querySelector('.landing-section');
            const obs = new IntersectionObserver(
            function (entries) {
              const ent = entries[0];
              if(ent.isIntersecting === false) {
                document.body.classList.add('changeNavLiColor');
              } else {
                document.body.classList.remove('changeNavLiColor');
              }
            },
            {
              root: null,
              threshold: 0,
              rootMargin: '-96px',
            }
          );
          obs.observe(landingSection);

          //MODAL\\
          const menuLink = document.getElementById('menu-link');
          const modal = document.getElementById('menu-modal');
          const closeButton = modal.querySelector('.close');

          // Open modal when clicking the Menüü link
          menuLink.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.classList.add("no-scroll");
          });

          // Close modal when clicking the close button
          closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.classList.remove("no-scroll");
          });

          // Close modal when clicking outside the modal content
          window.addEventListener('click', (e) => {
            if (e.target === modal) {
              modal.style.display = 'none';
              document.body.classList.remove("no-scroll");
            }
          });
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
              <li><a href="#landing" className="main-nav-link">Esileht</a></li>
              <li><a href="#about" className="main-nav-link">Meie lugu</a></li>
              <li><a href="#menu" className="main-nav-link" id="menu-link">Menüü</a></li>
              <h2 className="heading-secondary">KOHVIK LOHVIK</h2>
              <li><a href="#fb-posts" className="main-nav-link">Postitused</a></li>
              <li><a href="#supporters" className="main-nav-link">Toetajad</a></li>
              <li><a href="#our-values" className="main-nav-link">Väärtused</a></li>
            </ul>
          </nav>
          <button className="btn-mobile-nav" onClick={toggleNav}>
            <ion-icon className="icon-mobile-nav" name={isNavOpen ? "close-outline" : "menu-outline"}></ion-icon>
          </button>
        </div>
      </header>
      <main>
        <section className="landing-section" id="landing">
          <div className="landing">
            <h1 className="heading-primary">Lohviku <span className='headingHighlight'>kogemusõppe</span> akadeemia</h1>
          </div>
        </section>
        <section className='about-us-wrapper' id="about">
          <div className="about-us">
            <div className="about-header">
              <h3 className="heading-tertiary">Meie lugu</h3>
            </div>
            <div className="about-grid">
              <div className="about-text-box">
                <h3 className='about-title'>Kuidas kõik algas?</h3>
                <p className='about-description'>
                MTÜ Teeklubi alustas Elvas raamatulugemise ja teejoomise kultuuri arendamisest, kuid koroonaajal 
                sündis Lohvik – laste oma kohvik. 2020. aasta lõpus loodi koos Elva Vallavalitsusega noorte kogemus - ja äriõppe labor. 
                Nüüd keskendub ühing noorte kaasamisele ja mentorprogrammide kaudu oskuste praktiseerimisele päris ettevõttes.
                </p>
              </div>
              <div className="about-icon-box">
                <span className='about-icon'><i className="fa-regular fa-lightbulb lightbulb-icon"></i></span>
              </div>
              <div className="about-icon-box">
                <span className='about-icon'><i className="fa-solid fa-question question-icon"></i></span>
              </div>
              <div className="about-text-box">
                <h3 className='about-title'>Millega on tegemist?</h3>
                <p className='about-description'>
                Lohvik Kogemusõppe Akadeemia on koolinoortele suunatud unikaalne ärilabor. Programmis õpivad noored ettevõtte loomise ja juhtimise oskusi, luues oma kohviku. 
                Suvehooajal tegutsevad nad toiduhaagisega, tehes ise kõike alates menüüst ja kauba tellimisest kuni toiduvalmistamise ja müügitulemuste analüüsini. 
                Programmi eripära on praktilise kogemuse ja ettevõtlusteadmiste ühendamine.
                </p>
              </div>
              <div className="about-text-box">
                <h3 className='about-title'>Kuidas seni on läinud?</h3>
                <p className='about-description'>
                Noortele suunatud kogemusõppe programm Lohvik – laste oma kohvik, sai alguse 2020. aasta lõpus. Kolme aasta jooksul on programm toonud Elvas Arbi järve äärde noorte juhitud kohviku. 
                2024. aastal muutub Lohvik mobiilseks toiduhaagiseks, jõudes sinna, meid kõige enam oodatakse.
                </p>
              </div>
              <div className="about-icon-box">
                <span className='about-icon'><i className="fa-solid fa-chart-line chart-icon"></i></span>
              </div>
              <div className="about-icon-box">
                <span className='about-icon'><i className="fa-solid fa-bullseye bullseye-icon"></i></span>
              </div>
              <div className="about-text-box">
                <h3 className='about-title'>Tegevuse eesmärk</h3>
                <p className='about-description'>
                Teeklubi MTÜ eesmärk on tõsta teadlikkust noorte kaasamise ja kogemusõppe vajalikkusest, edendada vaimset tervist, sotsiaalseid oskusi ja vaba aja sisustamist. 
                Toetame individuaalset haridust, kasutades uuenduslikke tehnoloogiaid nagu AI. Oleme usaldusväärne partner koolidele ja omavalitsustele, aidates süsteemselt ennetada 
                kogemusõppe probleeme ja suurendada mõju.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section-hero">
          <div className="hero">
            <div id="menu-modal" className="modal">
              <div className="modal-content">
                <span className="close" title='Close'><i class="fa fa-times"></i></span>
                <img src="./menuimg.png" alt="Lohiku Kohviku Menüü" className="menuimg"/>
              </div>
            </div>
            <section className="posts" id="fb-posts">
            <h3 className="heading-tertiary">Postitused</h3>
              {loading ? (
                 <div className="loading-spinner"></div>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.id} className="post">
                    <p className={expandedPosts[post.id]  ? 'expanded' : 'truncated'}>
                      {post.message || post.story}
                    </p>
                    {(post.message || post.story)?.length > 400 && (
                      <div className="show-container">
                        <span className="show-more-btn" onClick={() => toggleExpanded(post.id)}>
                          {expandedPosts[post.id] ? 'Show Less' : 'Show More'}
                        </span>
                      </div>
                    )}
                    {post.image && <img src={post.image} alt="Post image"/>}
                    <div className="post-footer">
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
            </section>
            <section className="section-supporters" id="supporters">
              <h3 className='heading-tertiary'>Lohvik toetajad ja koostööpartnerid läbi aastate</h3>
                <div className="supporter-logos">
                  <img src="kohalik.png" alt="kohalik logo" className="supporter-image" />
                  <img src="noa.png" alt="nõa logo" className="supporter-image" />
                  <img src="pohikool.png" alt="nõo põhikool" className="supporter-image" />
                  <img src="sportland.png" alt="sportland logo" className="supporter-image" />
                  <img src="teamhood.png" alt="teamhood logo" className="supporter-image" />
                  <img src="terminal.png" alt="terminal logo" className="supporter-image" />
                </div>
                <div className="supporter-names">
                  <p>Fifaa</p>
                  <p>Premia</p>
                  <p>Ektaco CompuCach kassasüsteemid</p>
                  <p>A le Coq</p>
                  <p>Coffee People</p>
                  <p>Kaupmees</p>
                  <p>Schneider Electric Eesti</p>
                  <p>Elva Vald</p>
                  <p>KOP Kohalik Omaalgatuse Programm</p>
                  <p>LEADER programm</p>
                </div>
            </section>
            <section className="our-values" id="our-values">
              <h3 className="heading-tertiary">Väärtused</h3>
            </section>
            <div className="footer">
              <div className="footer-content">
                <p className="contacts">
                  <span><i className="fa fa-envelope"></i>kohvik.elva@gmail.com</span>
                  <span><i className="fa fa-map-marker"></i>Nõo, Veski 27-2</span>
                  <span><i className="fa fa-phone"></i>+372 5030353</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
