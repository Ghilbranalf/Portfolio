import React, { useEffect, useState, useRef } from 'react';
import './index.css';
import Chatbot from './components/Chatbot';
import ibraviaImg from './assets/ibravia.jpg';
import geefiImg from './assets/geefi.jpg';
import gradiaImg from './assets/gradia.jpg';
import sanggaluriImg from './assets/sanggaluri.jpg';
import baksoPakMulImg from './assets/baksopakmul.jpg';
import dprdImg from './assets/dprd.jpg';
import heritageRoastImg from './assets/heritage-roast.jpg';

const PROJECTS_DATA = [
  {
    id: 'dprd',
    title: 'DPRD Kabupaten Purbalingga',
    tag: 'Government Portal · Public Service',
    badges: [
      { type: 'desktop', icon: 'fas fa-desktop', text: 'Desktop' },
      { type: 'mobile', icon: 'fas fa-landmark', text: 'Government' }
    ],
    desc: 'Portal web resmi Dewan Perwakilan Rakyat Daerah Kabupaten Purbalingga. Menyajikan transparansi informasi publik, agenda dewan, fraksi, komisi, publikasi produk hukum JDIH, serta layanan penyampaian aspirasi masyarakat secara terintegrasi.',
    stack: ['React', 'Tailwind', 'PHP / Laravel', 'MySQL'],
    img: dprdImg,
    fallbackIcon: 'fas fa-landmark',
    liveUrl: 'https://dprd.purbalinggakab.go.id',
    codeUrl: 'https://github.com/Ghilbranalf'
  },
  {
    id: 'heritage',
    title: 'The Heritage & Roast',
    tag: 'Landing Page · F&B / Cafe · Brand Experience',
    badges: [
      { type: 'desktop', icon: 'fas fa-desktop', text: 'Desktop' },
      { type: 'mobile', icon: 'fas fa-coffee', text: 'Cafe & Dining' }
    ],
    desc: 'Landing page modern dan elegan untuk artisan micro-roastery & coffee house. Menampilkan kurasi menu kopi single-origin, reservasi meja instan, storytelling brand premium, serta visual sinematik yang dioptimasi responsif untuk semua perangkat.',
    stack: ['React', 'Tailwind', 'Framer Motion', 'Vercel'],
    img: heritageRoastImg,
    fallbackIcon: 'fas fa-coffee',
    liveUrl: 'https://github.com/Ghilbranalf',
    codeUrl: 'https://github.com/Ghilbranalf'
  },
  {
    id: 'baksopakmul',
    title: 'E-Commerce Bakso Pak Mul',
    tag: 'Web App · E-Commerce',
    badges: [
      { type: 'desktop', icon: 'fas fa-desktop', text: 'Desktop' },
      { type: 'mobile', icon: 'fas fa-mobile-alt', text: 'Mobile' }
    ],
    desc: 'Platform e-commerce penyedia bahan baku bakso & mie ayam. Dilengkapi katalog produk lengkap, sistem transaksi instan, kemitraan grosir, serta pengalaman belanja mobile & desktop yang intuitif.',
    stack: ['Next.js', 'React', 'Tailwind', 'MySQL'],
    img: baksoPakMulImg,
    fallbackIcon: 'fas fa-shopping-cart',
    liveUrl: 'https://github.com/Ghilbranalf',
    codeUrl: 'https://github.com/Ghilbranalf'
  },
  {
    id: 'gradia',
    title: 'Gradia Mobile App',
    tag: 'Mobile Application',
    badges: [
      { type: 'app', icon: 'fas fa-mobile-alt', text: 'Mobile App' }
    ],
    desc: 'Aplikasi mobile berbasis web yang didesain khusus dengan tampilan dan UX native-like. Dioptimasi untuk layar smartphone dengan navigasi intuitif dan performa tinggi menggunakan React.',
    stack: ['React', 'Tailwind', 'PWA', 'Vercel'],
    img: gradiaImg,
    fallbackIcon: 'fas fa-mobile-alt',
    liveUrl: 'https://gradia-three.vercel.app',
    codeUrl: 'https://github.com/Ghilbranalf'
  },
  {
    id: 'geefi',
    title: 'Geefi Residence',
    tag: 'Web App · Real Estate',
    badges: [
      { type: 'desktop', icon: 'fas fa-desktop', text: 'Desktop' },
      { type: 'mobile', icon: 'fas fa-mobile-alt', text: 'Mobile' }
    ],
    desc: 'Website perumahan Geefi yang fully responsive untuk desktop dan mobile. Menampilkan galeri unit, harga, cicilan, dan lokasi properti dengan desain modern yang dioptimasi untuk konversi leads.',
    stack: ['React', 'Tailwind', 'Vercel'],
    img: geefiImg,
    fallbackIcon: 'fas fa-home',
    liveUrl: 'https://geefi-residence.vercel.app',
    codeUrl: 'https://github.com/Ghilbranalf'
  },
  {
    id: 'ibravia',
    title: 'Ibravia Residence',
    tag: 'Company Profile · Dashboard · Real Estate',
    badges: [
      { type: 'desktop', icon: 'fas fa-desktop', text: 'Desktop' },
      { type: 'app', icon: 'fas fa-cog', text: 'Dashboard' }
    ],
    desc: 'Website company profile dan admin dashboard perumahan Ibravia. Menampilkan katalog unit, pencarian properti, serta dashboard internal dengan visualisasi penjualan, manajemen pembeli, dan role-based access control.',
    stack: ['WordPress', 'React', 'PHP', 'MySQL', 'Bootstrap'],
    img: ibraviaImg,
    fallbackIcon: 'fas fa-building',
    liveUrl: 'https://ibravia.com',
    codeUrl: 'https://github.com/Ghilbranalf'
  },
  {
    id: 'sanggaluri',
    title: 'Sanggaluri Portal',
    tag: 'Internal Portal · Management System',
    badges: [
      { type: 'ui', icon: 'fas fa-lock', text: 'Internal Portal' },
      { type: 'desktop', icon: 'fas fa-desktop', text: 'Desktop' }
    ],
    desc: 'Internal portal aman & terpercaya khusus tim manajemen Sanggaluri. Dilengkapi sistem autentikasi terenkripsi untuk mengelola data operasional dan aktivitas perusahaan secara efisien.',
    stack: ['React', 'Tailwind', 'Vercel'],
    img: sanggaluriImg,
    fallbackIcon: 'fas fa-user-shield',
    liveUrl: 'https://dashboard-smms.vercel.app',
    codeUrl: 'https://github.com/Ghilbranalf'
  }
];

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isMounted = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setCardsPerView(1);
      } else if (window.innerWidth <= 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxSlide = Math.max(0, PROJECTS_DATA.length - cardsPerView);

  useEffect(() => {
    setCurrentSlide(prev => Math.min(prev, maxSlide));
  }, [maxSlide]);

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(maxSlide, prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  useEffect(() => {
    // Mencegah glitch render 2x di React Strict Mode
    if (isMounted.current) return;
    isMounted.current = true;

    // ── LOADER (Snappy & Fast) ──
    const hideLoader = () => {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.classList.add('hidden');
        startHeroAnimations();
      }
    };
    setTimeout(hideLoader, 350);

    // ── STARFIELD (Lightweight & Battery-Friendly) ──
    const canvas = document.getElementById('particle-canvas');
    let ctx, W, H, stars = [];
    let starAnimId;
    if (canvas) {
        ctx = canvas.getContext('2d');
        function resizeCanvas() { 
            if(!canvas) return;
            W = canvas.width = window.innerWidth; 
            H = canvas.height = window.innerHeight; 
        }
        resizeCanvas();
        window.addEventListener('resize', () => { resizeCanvas(); initStars(); }, { passive: true });

        function initStars() {
          stars = [];
          // Ringan dan hemat CPU: max 35 bintang
          const count = Math.min(35, Math.max(15, Math.floor((W * H) / 36000)));
          for (let i = 0; i < count; i++) {
              stars.push({
                  x: Math.random() * W, y: Math.random() * H,
                  r: Math.random() * 1.2 + 0.4,
                  baseOp: Math.random() * 0.4 + 0.2,
                  op: 0,
                  twinkleSpeed: Math.random() * 0.015 + 0.005,
                  twinkleOffset: Math.random() * Math.PI * 2,
                  driftX: (Math.random() - 0.5) * 0.04,
                  driftY: (Math.random() - 0.5) * 0.02,
              });
          }
        }
        initStars();

        let time = 0;
        function drawStarfield() {
            if (!ctx) return;
            ctx.clearRect(0, 0, W, H);
            time += 0.016;

            ctx.beginPath();
            stars.forEach((s) => {
                s.x += s.driftX;
                s.y += s.driftY;
                if (s.x < -10) s.x = W + 10;
                if (s.x > W + 10) s.x = -10;
                if (s.y < -10) s.y = H + 10;
                if (s.y > H + 10) s.y = -10;

                const twinkle = Math.sin(time * s.twinkleSpeed * 60 + s.twinkleOffset);
                s.op = Math.max(0.1, Math.min(0.8, s.baseOp + twinkle * 0.2));

                ctx.moveTo(s.x + s.r, s.y);
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            });
            ctx.fillStyle = 'rgba(255,255,255,0.65)';
            ctx.fill();

            if (!document.hidden) {
                starAnimId = requestAnimationFrame(drawStarfield);
            }
        }
        drawStarfield();

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                starAnimId = requestAnimationFrame(drawStarfield);
            }
        });
    }

    // ── NAVBAR (High Performance - zero layout thrashing) ──
    const nav = document.getElementById('navbar');
    const sections = ['home','expertise','skills','about','projects','contact']
        .map(id => ({ id, el: document.getElementById(id) }))
        .filter(s => s.el);
    const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
    let scrollScheduled = false;

    window.addEventListener('scroll', () => {
        if (!scrollScheduled) {
            scrollScheduled = true;
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                if (nav) nav.classList.toggle('scrolled', scrollY > 40);

                let current = '';
                for (let i = 0; i < sections.length; i++) {
                    const el = sections[i].el;
                    if (el && el.offsetTop - 220 <= scrollY) {
                        current = sections[i].id;
                    }
                }
                navLinks.forEach(l => { 
                    l.classList.toggle('active', l.getAttribute('href') === '#' + current); 
                });
                scrollScheduled = false;
            });
        }
    }, { passive: true });

    // ── TYPING ──
    const roles = ['Web & Mobile Developer', 'AI & Machine Learning', 'React & Next.js Specialist', 'Informatika @ Telkom Univ'];
    let ri = 0, ci = 0, del = false;
    let typEl = document.getElementById('typingEl');
    
    function type() {
        if (!typEl) typEl = document.getElementById('typingEl');
        if (!typEl) return;
        
        const word = roles[ri];
        typEl.textContent = (del ? word.slice(0,ci--) : word.slice(0,ci++));
        if (!del && ci > word.length) { del = true; setTimeout(type, 1400); return; }
        if (del && ci < 0) { del = false; ri = (ri+1)%roles.length; ci = 0; }
        setTimeout(type, del ? 55 : 95);
    }

    // ── HERO ANIMATIONS ──
    function startHeroAnimations() {
        const els = [
            {el: document.getElementById('heroBadge'), d: 0},
            {el: document.getElementById('heroTitle'), d: 120},
            {el: document.getElementById('typingEl'), d: 240, cb: type},
            {el: document.getElementById('heroSub'), d: 320},
            {el: document.getElementById('heroActions'), d: 420},
            {el: document.getElementById('heroStats'), d: 500},
            {el: document.getElementById('heroImg'), d: 100},
        ];
        els.forEach(({el,d,cb}) => {
            if (!el) return;
            setTimeout(() => {
                el.style.transition = 'opacity .8s ease, transform .8s ease';
                el.style.opacity = '1'; el.style.transform = 'none';
                if (cb) cb();
            }, d);
        });
    }

    // ── SCROLL REVEAL ──
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

    const svcObs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                setTimeout(() => {
                    e.target.style.transition = 'opacity .7s ease, transform .7s ease, border-color .4s, box-shadow .4s';
                    e.target.style.opacity = '1'; e.target.style.transform = 'none';
                }, Array.from(document.querySelectorAll('.service-card')).indexOf(e.target) * 100);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.service-card').forEach(el => svcObs.observe(el));

    const skillObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const chips = document.querySelectorAll('.skill-chip');
                chips.forEach((c,i) => {
                    setTimeout(() => {
                        c.style.transition = 'opacity .5s ease, transform .5s ease, border-color .3s, box-shadow .3s';
                        c.style.opacity = '1'; c.style.transform = 'none';
                    }, i * 70);
                });
                skillObs.disconnect();
            }
        });
    }, { threshold: 0.1 });
    const firstChip = document.querySelector('.skill-chip');
    if (firstChip) skillObs.observe(firstChip);

    const tlObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const items = document.querySelectorAll('.tl-item');
                items.forEach((it,i) => {
                    setTimeout(() => {
                        it.style.transition = 'opacity .6s ease, transform .6s ease';
                        it.style.opacity = '1'; it.style.transform = 'none';
                    }, i*140);
                });
                tlObs.disconnect();
            }
        });
    }, { threshold: 0.1 });
    const firstTl = document.querySelector('.tl-item');
    if (firstTl) tlObs.observe(firstTl);

    const valObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const cards = document.querySelectorAll('.value-card');
                cards.forEach((c,i) => {
                    setTimeout(() => {
                        c.style.transition = 'opacity .6s ease, transform .6s ease, border-color .3s';
                        c.style.opacity = '1'; c.style.transform = 'none';
                    }, i*120);
                });
                valObs.disconnect();
            }
        });
    }, { threshold: 0.1 });
    const firstVal = document.querySelector('.value-card');
    if (firstVal) valObs.observe(firstVal);

    // Smooth scroll (delegated for all dynamic & static anchor links)
    const handleAnchorClick = (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (!a) return;
        const href = a.getAttribute('href');
        if (!href || href === '#' || href.length < 2) return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => {
        document.removeEventListener('click', handleAnchorClick);
    };

  }, []);

  return (
    <>
      <div id="loader">
          <div className="loader-logo">Ghilbran&nbsp;<span>Portfolio</span></div>
          <div className="loader-bar"><div className="loader-bar-inner"></div></div>
      </div>

      <canvas id="particle-canvas"></canvas>

      {/* CSS SHOOTING STARS */}
      <div className="shooting-stars">
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>

      {/* NAVBAR */}
      <nav id="navbar">
          <div className="nav-inner">
              <a href="#home" className="nav-logo">My<span>Portfolio</span></a>
              <ul className="nav-links">
                  <li><a href="#home" className="active">Home</a></li>
                  <li><a href="#expertise">Services</a></li>
                  <li><a href="#skills">Skills</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#projects">Projects</a></li>
                  <li><a href="#contact" className="nav-cta">Contact</a></li>
              </ul>
              <button className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} id="ham" aria-label="menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  <span></span><span></span><span></span>
              </button>
          </div>
      </nav>
      
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} id="mobileMenu">
          <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#expertise" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          <a href="#skills" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
      </div>

      {/* HERO */}
      <section id="home">
          <div className="container">
              <div className="hero-grid">
                  <div className="hero-left">
                      <div className="hero-badge" id="heroBadge">
                          <span className="dot"></span>
                          Available for Projects
                      </div>
                      <h1 className="hero-title" id="heroTitle">
                          Hello, I'm<br/>
                          <span className="name">Ghilbran Alfaries</span>
                          <span className="name accent-name">Pryma</span>
                      </h1>
                      <p className="typing-line" id="typingEl"></p>
                      <p className="hero-subtitle" id="heroSub">
                          Mahasiswa Teknik Informatika di Universitas Telkom Purwokerto yang berfokus pada pengembangan website modern menggunakan React, Tailwind CSS, dan Java. Membangun platform digital yang efisien, responsif, dan berorientasi solusi.
                      </p>
                      <div className="hero-actions" id="heroActions">
                          <a href="#contact" className="btn btn-primary"><i className="fas fa-paper-plane"></i> Get In Touch</a>
                          <a href="#projects" className="btn btn-ghost"><i className="fas fa-eye"></i> View Work</a>
                      </div>
                      <div className="hero-stats" id="heroStats">
                          <div className="stat"><div className="stat-num">3+</div><div className="stat-label">Years Learning</div></div>
                          <div className="stat" style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: "32px" }}><div className="stat-num">10+</div><div className="stat-label">Projects Done</div></div>
                          <div className="stat" style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: "32px" }}><div className="stat-num">4</div><div className="stat-label">Tech Stacks</div></div>
                      </div>
                  </div>
                  <div className="hero-visual">
                      <div className="hero-img-wrap" id="heroImg">
                          <img src="/images/bran.png" alt="Ghilbran Alfaries Pryma" className="hero-img" decoding="async" fetchpriority="high" onError={(e) => e.target.src='https://ui-avatars.com/api/?name=G+A&background=0d1628&color=2dd4bf&size=400&bold=true&font-size=0.4'} />
                          <div className="hero-badge-float b1">
                              <div className="badge-icon"><i className="fas fa-code"></i></div>
                              <div className="badge-text"><strong>React Developer</strong><span>Frontend & Backend</span></div>
                          </div>
                          <div className="hero-badge-float b2">
                              <div className="badge-icon"><i className="fas fa-graduation-cap"></i></div>
                              <div className="badge-text"><strong>Telkom University</strong><span>Informatika '23</span></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* EXPERTISE */}
      <section id="expertise" className="section-pad">
          <div className="container">
              <div className="section-center reveal">
                  <div className="section-label">Services</div>
                  <h2 className="section-title">What I Do</h2>
                  <p className="section-desc">Tidak hanya fokus pada tampilan, tapi juga performa dan arsitektur. Saya handle proyek dari nol hingga deployment.</p>
              </div>
              <div className="services-grid">
                  <div className="service-card">
                      <div className="svc-icon"><i className="fas fa-layer-group"></i></div>
                      <h4>Frontend Development</h4>
                      <p>Membangun antarmuka web responsif dan interaktif menggunakan React.js dan Tailwind CSS untuk pengalaman pengguna optimal.</p>
                  </div>
                  <div className="service-card">
                      <div className="svc-icon"><i className="fas fa-server"></i></div>
                      <h4>Backend Development</h4>
                      <p>Mengembangkan logika server-side dan manajemen database yang efisien menggunakan Java dan JavaScript/Node.js.</p>
                  </div>
                  <div className="service-card">
                      <div className="svc-icon"><i className="fab fa-wordpress"></i></div>
                      <h4>WordPress Development</h4>
                      <p>Kustomisasi dan pengelolaan CMS berbasis WordPress untuk kebutuhan website bisnis dan konten profesional.</p>
                  </div>
                  <div className="service-card">
                      <div className="svc-icon"><i className="fas fa-laptop-code"></i></div>
                      <h4>Custom Web Solutions</h4>
                      <p>Solusi pengembangan website kustom mulai dari perancangan desain hingga tahap deployment dan maintenance.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section-pad">
          <div className="container">
              <div className="skills-layout">
                  <div>
                      <div className="section-label reveal">Skills</div>
                      <h2 className="section-title reveal">Tech Stack &amp;<br/>Expertise</h2>
                      <p className="section-desc reveal" style={{ marginBottom: 0 }}>Tools dan teknologi yang saya gunakan untuk membangun produk digital berkualitas tinggi.</p>
                      <div style={{ marginTop: "40px" }} className="reveal">
                          <div className="value-card">
                              <div className="val-icon"><i className="fas fa-bolt"></i></div>
                              <div className="val-text"><h6>Fast Learner</h6><p>Selalu mengikuti perkembangan teknologi terbaru dan adaptif terhadap stack baru.</p></div>
                          </div>
                          <div className="value-card">
                              <div className="val-icon"><i className="fas fa-code-branch"></i></div>
                              <div className="val-text"><h6>Clean Architecture</h6><p>Menulis kode yang terstruktur, reusable, dan mudah dipelihara dalam jangka panjang.</p></div>
                          </div>
                      </div>
                  </div>
                  <div className="skills-grid">
                      <div className="skill-chip" style={{ "--clr": "#61dafb" }}>
                          <i className="fab fa-react" style={{ color: "#61dafb" }}></i>
                          <div className="sk-name">React</div><div className="sk-level">Advanced</div>
                      </div>
                      <div className="skill-chip" style={{ "--clr": "#06b6d4" }}>
                          <i className="fas fa-wind" style={{ color: "#06b6d4" }}></i>
                          <div className="sk-name">Tailwind CSS</div><div className="sk-level">Advanced</div>
                      </div>
                      <div className="skill-chip" style={{ "--clr": "#f7df1e" }}>
                          <i className="fab fa-js" style={{ color: "#f7df1e" }}></i>
                          <div className="sk-name">JavaScript</div><div className="sk-level">Advanced</div>
                      </div>
                      <div className="skill-chip" style={{ "--clr": "#007396" }}>
                          <i className="fab fa-java" style={{ color: "#007396" }}></i>
                          <div className="sk-name">Java</div><div className="sk-level">Intermediate</div>
                      </div>
                      <div className="skill-chip" style={{ "--clr": "#000000" }}>
                          <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff", display: "block", marginBottom: "8px" }}>N</span>
                          <div className="sk-name">Next.js</div><div className="sk-level">Intermediate</div>
                      </div>
                      <div className="skill-chip" style={{ "--clr": "#68a063" }}>
                          <i className="fab fa-node-js" style={{ color: "#68a063" }}></i>
                          <div className="sk-name">Express.js</div><div className="sk-level">Intermediate</div>
                      </div>
                      <div className="skill-chip" style={{ "--clr": "#4479a1" }}>
                          <i className="fas fa-database" style={{ color: "#4479a1" }}></i>
                          <div className="sk-name">MySQL</div><div className="sk-level">Intermediate</div>
                      </div>
                      <div className="skill-chip" style={{ "--clr": "#7952b3" }}>
                          <i className="fab fa-bootstrap" style={{ color: "#7952b3" }}></i>
                          <div className="sk-name">Bootstrap</div><div className="sk-level">Advanced</div>
                      </div>
                      <div className="skill-chip" style={{ "--clr": "#e34f26" }}>
                          <i className="fab fa-html5" style={{ color: "#e34f26" }}></i>
                          <div className="sk-name">HTML & CSS</div><div className="sk-level">Advanced</div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-pad">
          <div className="container">
              <div className="about-grid">
                  <div>
                      <div className="section-label reveal">About</div>
                      <h2 className="section-title reveal">Logic & Code to<br/>Build Solutions</h2>
                      <p className="reveal" style={{ color: "var(--muted2)", lineHeight: 1.8, marginBottom: "40px", textAlign: "justify" }}>
                          Sebagai mahasiswa Informatika, saya menggabungkan struktur data yang efisien dengan antarmuka modern. Website bukan sekadar tampilan visual—ia adalah alat yang harus mempermudah pekerjaan manusia.
                      </p>

                      <div className="timeline-section">
                          <div className="timeline-title">Education</div>
                          <div className="timeline">
                              <div className="tl-item">
                                  <div className="tl-date">2020 – 2023</div>
                                  <div className="tl-place">SMA Negeri 1 Bumiayu</div>
                                  <div className="tl-desc">MIPA — Fondasi ilmu sains dan logika.</div>
                              </div>
                              <div className="tl-item">
                                  <div className="tl-date">2023 – Sekarang</div>
                                  <div className="tl-place">Telkom University Purwokerto</div>
                                  <div className="tl-desc">S1 Teknik Informatika — Berfokus pada web development & software engineering.</div>
                              </div>
                          </div>
                      </div>

                      <div className="timeline-section">
                          <div className="timeline-title" style={{ "--c": "var(--accent2)" }}>Experience</div>
                          <div className="timeline" style={{ "--tl": "var(--accent2)" }}>
                              <div className="tl-item exp">
                                  <div className="tl-date">Jan 2026 – Mar 2026</div>
                                  <div className="tl-place">Bikin Kreatif</div>
                                  <div className="tl-desc">Magang — Web Developer intern, membangun dan mengembangkan fitur aplikasi web.</div>
                              </div>
                          </div>
                      </div>

                      <div className="about-values">
                          <div className="value-card">
                              <div className="val-icon"><i className="fas fa-paint-brush"></i></div>
                              <div className="val-text"><h6>Modern Design</h6><p>Implementasi UI/UX terkini dengan React dan Tailwind CSS.</p></div>
                          </div>
                          <div className="value-card">
                              <div className="val-icon"><i className="fas fa-shield-alt"></i></div>
                              <div className="val-text"><h6>Clean Code</h6><p>Standar kode bersih untuk kemudahan pengembangan jangka panjang.</p></div>
                          </div>
                      </div>
                  </div>

                  <div className="about-visual reveal-right">
                      {/* Ambient Glow */}
                      <div className="about-glow-orb"></div>
                      <div className="about-glow-orb orb-secondary"></div>

                      {/* 3D Orbit Container */}
                      <div className="orbit-scene">
                          {/* Central Photo */}
                          <div className="orbit-center">
                              <img src="/images/bran.png" alt="Ghilbran Alfaries Pryma" loading="lazy" decoding="async" onError={(e) => e.target.src='https://ui-avatars.com/api/?name=G+A&background=0d1628&color=2dd4bf&size=400&bold=true&font-size=0.4'} />
                              <div className="orbit-center-glow"></div>
                          </div>

                          {/* Orbit Ring 1 — Inner (slower, smaller) */}
                          <div className="orbit-ring ring-inner">
                              <div className="orbit-icon" style={{"--angle": "0deg", "--clr": "#61dafb"}}><i className="fab fa-react"></i><span>React</span></div>
                              <div className="orbit-icon" style={{"--angle": "90deg", "--clr": "#f7df1e"}}><i className="fab fa-js"></i><span>JS</span></div>
                              <div className="orbit-icon" style={{"--angle": "180deg", "--clr": "#007396"}}><i className="fab fa-java"></i><span>Java</span></div>
                              <div className="orbit-icon" style={{"--angle": "270deg", "--clr": "#06b6d4"}}><i className="fas fa-wind"></i><span>Tailwind</span></div>
                          </div>

                          {/* Orbit Ring 2 — Outer (faster, larger) */}
                          <div className="orbit-ring ring-outer">
                              <div className="orbit-icon" style={{"--angle": "45deg", "--clr": "#ffffff"}}><i className="fab fa-node-js"></i><span>Node</span></div>
                              <div className="orbit-icon" style={{"--angle": "135deg", "--clr": "#4479a1"}}><i className="fas fa-database"></i><span>MySQL</span></div>
                              <div className="orbit-icon" style={{"--angle": "225deg", "--clr": "#e34f26"}}><i className="fab fa-html5"></i><span>HTML</span></div>
                              <div className="orbit-icon" style={{"--angle": "315deg", "--clr": "#7952b3"}}><i className="fab fa-bootstrap"></i><span>Bootstrap</span></div>
                          </div>

                          {/* Decorative orbit paths */}
                          <div className="orbit-path path-inner"></div>
                          <div className="orbit-path path-outer"></div>
                      </div>

                      {/* Fact Cards */}
                      <div className="about-facts">
                          <div className="fact-card reveal">
                              <div className="fact-icon"><i className="fas fa-code"></i></div>
                              <div>
                                  <div className="fact-num">3+</div>
                                  <div className="fact-label">Years of Coding</div>
                              </div>
                          </div>
                          <div className="fact-card reveal">
                              <div className="fact-icon"><i className="fas fa-project-diagram"></i></div>
                              <div>
                                  <div className="fact-num">10+</div>
                                  <div className="fact-label">Projects Completed</div>
                              </div>
                          </div>
                          <div className="fact-card reveal">
                              <div className="fact-icon"><i className="fas fa-briefcase"></i></div>
                              <div>
                                  <div className="fact-num" style={{ color: "var(--accent2)" }}>1</div>
                                  <div className="fact-label">Internship</div>
                              </div>
                          </div>
                          <div className="fact-card reveal">
                              <div className="fact-icon"><i className="fas fa-laptop-code"></i></div>
                              <div>
                                  <div className="fact-num" style={{ color: "var(--accent2)" }}>9+</div>
                                  <div className="fact-label">Tech Skills</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section-pad">
          <div className="container">
              <div className="section-center reveal">
                  <div className="section-label">Work</div>
                  <h2 className="section-title">Featured Projects</h2>
                  <p className="section-desc">Beberapa proyek yang pernah saya kerjakan — dari skala personal hingga kebutuhan klien.</p>
              </div>
              {/* PROJECTS SLIDESHOW */}
              <div className="projects-slider-wrapper reveal">
                  {/* Prev Button */}
                  <button 
                      className="slider-nav-btn prev"
                      onClick={prevSlide}
                      disabled={currentSlide === 0}
                      aria-label="Previous Slide"
                  >
                      <i className="fas fa-chevron-left"></i>
                  </button>

                  {/* Track Container */}
                  <div 
                      className="projects-track-container"
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                  >
                      <div 
                          className="projects-track"
                          style={{
                              transform: `translateX(calc(-${currentSlide} * ((100% + 24px) / ${cardsPerView})))`
                          }}
                      >
                          {PROJECTS_DATA.map((proj) => (
                              <div key={proj.id} className="project-slide-item">
                                  <div className="project-card">
                                      <div className="project-thumb">
                                          <div className="project-screen-wrap img-loading" id={`thumb-${proj.id}`}>
                                              <img 
                                                  src={proj.img}
                                                  alt={proj.title}
                                                  loading="lazy"
                                                  decoding="async"
                                                  onLoad={(e) => e.target.parentElement.classList.remove('img-loading')}
                                                  onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                                              />
                                              <div className="thumb-fallback" style={{ display: 'none', background: 'linear-gradient(135deg,#0a0a0a,#1a1a1a)', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                                                  <i className={proj.fallbackIcon} style={{ color: '#fff', fontSize: '2.5rem' }}></i>
                                                  <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>{proj.title.toUpperCase()}</span>
                                              </div>
                                          </div>
                                          <div className="overlay">
                                              {proj.liveUrl && (
                                                  <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="overlay-btn">
                                                      <i className="fas fa-external-link-alt"></i> Live
                                                  </a>
                                              )}
                                              {proj.codeUrl && (
                                                  <a href={proj.codeUrl} target="_blank" rel="noreferrer" className="overlay-btn">
                                                      <i className="fab fa-github"></i> Code
                                                  </a>
                                              )}
                                          </div>
                                      </div>
                                      <div className="project-body">
                                          <div className="device-badges">
                                              {proj.badges.map((b, idx) => (
                                                  <span key={idx} className={`device-badge ${b.type}`}>
                                                      <i className={b.icon} style={{ fontSize: "0.55rem", marginRight: "3px" }}></i> {b.text}
                                                  </span>
                                              ))}
                                          </div>
                                          <div className="project-tag">{proj.tag}</div>
                                          <h4>{proj.title}</h4>
                                          <p>{proj.desc}</p>
                                          <div className="project-footer">
                                              <div className="project-stack">
                                                  {proj.stack.map((tech, idx) => (
                                                      <span key={idx} className="stack-tag">{tech}</span>
                                                  ))}
                                              </div>
                                              <div className="project-links">
                                                  {proj.liveUrl && (
                                                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="proj-action-link live" title="Live Preview">
                                                          <i className="fas fa-external-link-alt"></i> Live
                                                      </a>
                                                  )}
                                                  {proj.codeUrl && (
                                                      <a href={proj.codeUrl} target="_blank" rel="noreferrer" className="proj-action-link code" title="Source Code">
                                                          <i className="fab fa-github"></i> Code
                                                      </a>
                                                  )}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Next Button */}
                  <button 
                      className="slider-nav-btn next"
                      onClick={nextSlide}
                      disabled={currentSlide >= maxSlide}
                      aria-label="Next Slide"
                  >
                      <i className="fas fa-chevron-right"></i>
                  </button>

                  {/* Slider Controls Bottom (Dots + Prev/Next for mobile) */}
                  <div className="slider-controls-bottom">
                      <button 
                          className="slider-bottom-btn" 
                          onClick={prevSlide} 
                          disabled={currentSlide === 0} 
                          aria-label="Previous Slide"
                      >
                          <i className="fas fa-chevron-left"></i>
                      </button>

                      <div className="slider-pagination-wrap">
                          {Array.from({ length: maxSlide + 1 }).map((_, idx) => (
                              <button
                                  key={idx}
                                  className={`slider-dot ${currentSlide === idx ? 'active' : ''}`}
                                  onClick={() => setCurrentSlide(idx)}
                                  aria-label={`Go to slide ${idx + 1}`}
                              />
                          ))}
                      </div>

                      <button 
                          className="slider-bottom-btn" 
                          onClick={nextSlide} 
                          disabled={currentSlide >= maxSlide} 
                          aria-label="Next Slide"
                      >
                          <i className="fas fa-chevron-right"></i>
                      </button>
                  </div>
              </div>
               <div className="text-center" style={{ marginTop: "40px", textAlign: "center" }}>
                  <a href="https://github.com/Ghilbranalf" target="_blank" rel="noreferrer" className="btn btn-ghost reveal"><i className="fab fa-github"></i> View All on GitHub</a>
              </div>
          </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="section-pad">
          <div className="container">
              <div className="contact-inner reveal">
                  <div className="section-label" style={{ justifyContent: "center" }}>Contact</div>
                  <h2 className="section-title" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>Let's Build Something<br/><span style={{ color: "var(--accent)" }}>Amazing Together</span></h2>
                  <p style={{ color: "var(--muted2)", margin: "16px auto 0", maxWidth: "500px", lineHeight: 1.8 }}>Terbuka untuk proyek freelance, kolaborasi, maupun full-time opportunity. Jangan ragu untuk reach out!</p>
                  <a href="mailto:ghilbranroyale@gmail.com" className="contact-email">ghilbranroyale@gmail.com</a>
                  <div className="contact-info">
                      <div className="contact-info-item"><i className="fas fa-map-marker-alt"></i> Bumiayu, Indonesia</div>
                      <div className="contact-info-item"><i className="fas fa-graduation-cap"></i> Telkom University Purwokerto</div>
                  </div>
                  <div className="social-row">
                      <a href="https://github.com/Ghilbranalf" target="_blank" rel="noreferrer" className="social-btn" title="GitHub"><i className="fab fa-github"></i></a>
                      <a href="https://www.linkedin.com/in/ghilbran-alfaries-pryma-a4ba7b3b6" target="_blank" rel="noreferrer" className="social-btn" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                      <a href="https://www.instagram.com/ghilbrann" target="_blank" rel="noreferrer" className="social-btn" title="Instagram"><i className="fab fa-instagram"></i></a>
                  </div>
              </div>
              <hr className="footer-divider" />
              <p className="footer-copy">© 2026 <span>Ghilbran Alfaries Pryma</span>. All Rights Reserved.</p>
          </div>
      </footer>

      {/* CHATBOT */}
      <Chatbot />
    </>
  );
}

export default App;