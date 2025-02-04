import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(true);
  const [isNavOpen, setIsnavopen] = useState(false);
  const [posts, setPosts] = useState([]);

  const toggleNav = () => {
    setIsnavopen(!isNavOpen);
  };
  
  useEffect(() => {
    // Define the function to fetch posts and images
        const fetchPostsAndImages = async () => {
            try {
              // Fetch posts with media attachments directly
              const postsResponse = await axios.get("https://fbtest.webcodes.ee/wp-json/token/v1/get-feed");
              const postsData = postsResponse.data.posts;
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
            const headerElement = document.querySelector('.header');
            
            // Function to handle navigation color change
            function handleNavLiColor(entries) {
              const ent = entries[0];
              if (!headerElement.classList.contains('nav-open')) {
                if (ent.isIntersecting === false) {
                  document.body.classList.add('changeNavLiColor');
                } else {
                  document.body.classList.remove('changeNavLiColor');
                }
              }
            }

            // IntersectionObserver setup
            const obs = new IntersectionObserver(handleNavLiColor, {
              root: null,
              threshold: 0,
              rootMargin: '-96px',
            });

            // Observe the landing section
            obs.observe(landingSection);

            // Event listener for nav-open toggle
            const navToggle = document.querySelector('.btn-mobile-nav');
            navToggle.addEventListener('click', () => {
              headerElement.classList.toggle('nav-open');

              // Reset body class when menu opens
              if (headerElement.classList.contains('nav-open')) {
                document.body.classList.remove('changeNavLiColor');
              } else {
                // Reapply class based on intersection observer logic
                const ent = obs.takeRecords()[0] || { isIntersecting: true }; // Ensure valid entry
                if (!ent.isIntersecting) {
                  document.body.classList.add('changeNavLiColor');
                }
              }
            });

          //MENU MODAL\\
          const menuLink = document.getElementById('menu-link');
          const menuModal = document.getElementById('menu-modal');
          const menuCloseButton = menuModal.querySelector('.close');

          // Open modal when clicking the Menüü link
          menuLink.addEventListener('click', (e) => {
            e.preventDefault();
            menuModal.style.display = 'block';
            document.body.classList.add("no-scroll");
          });
          // Close modal when clicking the close button
          menuCloseButton.addEventListener('click', () => {
            menuModal.style.display = 'none';
            document.body.classList.remove("no-scroll");
          });

          //VALUES MODAL\\
          const valuesLink = document.getElementById('valueLink');
          const valuesModal = document.getElementById('values-modal');
          const valuesCloseButton = valuesModal.querySelector('.close');

          valuesLink.addEventListener('click', (e) => {
            e.preventDefault();
            valuesModal.style.display = 'block';
            document.body.classList.add("no-scroll");
          });

          valuesCloseButton.addEventListener('click', () => {
            valuesModal.style.display = 'none';
            document.body.classList.remove('no-scroll');
          });

          window.addEventListener('click', (e) => {
            if (e.target === menuModal) {
              menuModal.style.display = 'none';
              document.body.classList.remove("no-scroll");
            } else if (e.target === valuesModal) {
              valuesModal.style.display = 'none';
              document.body.classList.remove('no-scroll');
            }
          });
    }, []);

  return (
    <>
      <header className={`header ${isNavOpen ? 'nav-open' : ''}`}>
        <a href="#">
          <img src="lohviklogo.webp" alt="site logo" className="logo" />
        </a>
        <nav className="main-nav">
            <ul className="main-nav-list">
              <li><a href="#landing" className="main-nav-link">Esileht</a></li>
              <li><a href="#about" className="main-nav-link">Meie lugu</a></li>
              <li><a href="#menu" className="main-nav-link" id="menu-link">Menüü</a></li>
              <h2 className="heading-secondary">KOHVIK LOHVIK</h2>
              <li><a href="#fb-posts" className="main-nav-link">Postitused</a></li>
              <li><a href="#supporters" className="main-nav-link">Toetajad</a></li>
              <li><a href="#our-values" className="main-nav-link" id="valueLink">Väärtused</a></li>
            </ul>
          </nav>
          <button className="btn-mobile-nav" onClick={toggleNav}>
            <ion-icon className="icon-mobile-nav" name={isNavOpen ? "close-outline" : "menu-outline"}></ion-icon>
          </button>
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
          <section className="hero">
            <div id="menu-modal" className="modal">
              <div className="modal-content">
                <span className="close" title='Close'><i className="fa fa-times"></i></span>
                <img src="./menuimg.webp" alt="Lohiku Kohviku Menüü" className="menuimg"/>
              </div>
            </div>
            <div id="values-modal" className="modal">
              <div className="values-modal-content">
                <h2 className='heading-tertiary'>MTÜ Teeklubi eetilised põhimõtted</h2>
                <p className='modal-subheading'>Demokraatlik juhtimine ja toimimine</p>
                <div className="values-grid">
                  <div className="grid-item">1. MTÜ Teeklubi on selge ja arusaadav missioon. Ühendus 
                    järgib oma missiooni täitmisel põhikirja, sisemisi dokumente ja organisatsiooni toimimisstandardeid.</div>
                  <div className="grid-item">2. MTÜ Teeklubi väljendab ja esindab inimeste erinevaid huvisid ja vajadusi. Ühendus kaasab inimesi 
                    rahvahariduse, osalusdemokraatia, eestkoste ja muude vormide kaudu kodanikuühiskonna edendamisse.</div>
                  <div className="grid-item">3. MTÜ Teeklubi kui ühiskonnaliikmete vabatahtlik ühendus väärtustab oma liikmeid, kindlustab ühenduse demokraatliku 
                    juhtimise, hoiab ühenduse juhtivkogud ja töötajad vastutavana, reageerib nende väärtegudele.</div>
                  <div className="grid-item">4. MTÜ Teeklubi peab inimeste kaasamist ja vabatahtlikku tööd kodanikuühiskonna 
                    alustalaks, väärtustab kodanikke ja nende vabatahtlikku tööd.</div>
                  <div className="grid-item">5. MTÜ Teeklubi püüdleb järjekindlalt oskusliku tegutsemise, professionaalsuse 
                    ja täiuslikkuse poole, et saavutada parimaid töötulemusi.</div>
                  <div className="grid-item">6. MTÜ Teeklubi, saades vahendid oma tegevuseks peamiselt 
                    toetajatelt ja annetajatelt, kasutab saadud vahendeid otstarbekalt ja sihipäraselt.</div>
                </div>
                <p className='modal-subheading'>Kodanikujulgus ja hoolivus</p>
                <div className="values-grid">
                  <div className="grid-item">1. MTÜ Teeklubi ilmutab kodanikujulgust võitluses ühiskonnas esineva ebaõigluse vastu.</div>
                  <div className="grid-item">2. ÜMTÜ Teeklubi ei kasuta ega propageeri vägivalda oma seisukohtade väljendamiseks, eesmärkide ja avalikkuse tähelepanu saavutamiseks.</div>
                </div>
                <p className='modal-subheading'>Vahendite ja vara heaperemehelik ning säästlik kasutamine</p>
                <div className="values-grid">
                  <div className="grid-item">1. MTÜ Teeklubi kasutab loodus-, inim- ja vaimuvara ning ainelisi ja varalisi vahendeid heaperemehelikult ning säästlikult, arvestades tänaste ja tulevaste põlvede vajadustega.</div>
                  <div className="grid-item">2. MTÜ Teeklubi lähtub nii taotleja kui toetajana headest rahastamistavadest, eelarvete põhjendatusest ja läbipaistvusest ning hoidub topeltrahastamisest.</div>
                </div>
                <p className='modal-subheading'>Vastutus ja aruandmiskohustus</p>
                <div className="values-grid">
                  <div className="grid-item">1. MTÜ Teeklubi annab oma tegevusest aru ning vastutab asutajate, liikmete, toetajate, annetajate ja avalikkuse ees.</div>
                  <div className="grid-item">2. MTÜ Teeklubi peab oluliseks aruandevalmidust, mille tagab oskusjuhtimine, sisemine aruandlus ja juhindumine heast raamatupidamistavast.</div>
                  <div className="grid-item">3. MTÜ Teeklubi avalikustab oma tegevuse sisulise ja rahalise aruande vähemalt kord aastas.</div>
                </div>
                <p className='modal-subheading'>Avatus ja läbipaistvus</p>
                <div className="values-grid">
                  <div className="grid-item">1. MTÜ Teeklubi missiooni, liikmeskonna, tegevuse ja rahastamise kohta peab olema avalik ja arusaadav.</div>
                  <div className="grid-item">2. MTÜ Teeklubi suhtleb avatult ja otsekoheselt oma nime all ega tegutse anonüümselt.</div>
                  <div className="grid-item">3. MTÜ Teeklubi on avatud uutele ideedele ja erinevatele seisukohtadele ning koostööle ühiste eesmärkide saavutamiseks.</div>
                </div>
                <p className='modal-subheading'>Sõltumatus ja huvide konflikti vältimine</p>
                <div className="values-grid">
                  <div className="grid-item">1. MTÜ Teeklubi on oma eesmärgiseadmistes, otsustes ja tegevuses sõltumatu ning hoidub sattumast erakonna, avaliku institutsiooni või äriühingu 
                    kontrolli alla, millega ta kaotab oma sõltumatuse ja avalikes huvides tegutsemise võime.</div>
                  <div className="grid-item">2. MTÜ Teeklubi ja seal tegutsevad isikud hoiduvad sattumast huvide konflikti. Huvide konflikti ilmnemisel võtab ühendus tarvitusele vajalikud abinõud selle lõpetamiseks.</div>
                </div>
                <p className='modal-subheading'>Sõnapidamine ja ideede autorluse tunnustamine</p>
                <div className="values-grid">
                  <div className="grid-item">1. MTÜ Teeklubi peab kinni nii kirjalikest lepingutest kui suulistest kokkulepetest.</div>
                  <div className="grid-item">2. MTÜ Teeklubi austab teiste ühenduste ideede ja projektide autorlust.</div>
                </div>
                <p className='modal-subheading'>Sallivus</p>
                <div className="values-grid">
                  <div className="grid-item">1. MTÜ Teeklubi tunnustab mõtteviiside erinevust, ühenduste ja nende eesmärkide mitmekesisust.</div>
                  <div className="grid-item">2. MTÜ Teeklubi ei halvusta ega laima teisi ühendusi, nende seisukohti ja neis tegutsevaid isikuid.</div>
                </div>
                <span className="close" title='Close'><i className="fa fa-times"></i></span>
              </div>
            </div>
            <section className="posts" id="fb-posts">
            <h3 className="heading-tertiary">Postitused</h3>
              {loading ? (
                 <div className="loading-spinner">Loading...</div>
              ) : posts.length > 0 ? (
                  <div className="post-grid">
                    {posts.map((post) => (
                      <div key={post.id} className="post">
                        {post.image && <img src={post.image} alt="Post image"/>}
                        <p className="post-content">
                          {post.message || post.story}
                        </p>
                        <div className="post-footer">
                          <div className="view-facebook">
                            <a href={`https://www.facebook.com/${post.id}`} target="_blank" rel="noopener noreferrer">
                              Loe rohkem...
                            </a>
                          </div>
                          <p className="date">
                            <small>Postitatud: {new Date(post.created_time).toLocaleDateString()}</small>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
              ) : (
                <p className='no-posts'>No posts to display</p>
              )}
            </section>
            <section className="section-supporters" id="supporters">
              <h3 className='heading-tertiary'>Lohvik toetajad ja koostööpartnerid läbi aastate</h3>
                <div className="supporter-logos">
                  <img src="kohalik.webp" alt="kohalik logo" className="supporter-image" />
                  <img src="sportland.webp" alt="sportland logo" className="supporter-image" />
                  <img src="tslogo.webp" alt="tootmissüsteemid" className="tootmissusteemid" />
                  <img src="terminal.webp" alt="terminal logo" className="supporter-image" />
                  <img src="noa.webp" alt="nõa logo" className="supporter-image" />
                  <img src="teamhood.webp" alt="teamhood logo" className="supporter-image" />
                  <img src="pohikool.webp" alt="nõo põhikool" className="supporter-image" />
                </div>
                <div className="supporter-names">
                  <p>KOP Kohalik Omaalgatuse Programm</p>
                  <p>Coffee People</p>
                  <p>Ektaco CompuCach kassasüsteemid</p>
                  <p>LEADER programm</p>
                  <p>Kaupmees</p>
                  <p>Schneider Electric Eesti</p>
                  <p>Elva Vald</p>
                  <p>Premia</p>
                  <p>A le Coq</p>
                  <p>Fifaa</p>
                </div>
            </section>
            <div className="footer">
              <div className="footer-content">
                <p className="contacts">
                  <span><i className="fa fa-envelope"></i>kohvik.elva@gmail.com</span>
                  <span><i className="fa fa-map-marker"></i>Nõo, Veski 27-2</span>
                  <span><i className="fa fa-phone"></i>+372 5030353</span>
                  <span>
                    <a href="/privaatsuspoliitika" className='policy-linik' target='_blank'>Privaatsuspoliitika</a>
                  </span>
                </p>
              </div>
            </div>
          </section>
      </main>
    </>
  );
}

export default App;
