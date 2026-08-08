import React, { useEffect, useState, useRef } from 'react';
import './index.css';
import Chatbot from './components/Chatbot';
import ibraviaImg from './assets/ibravia.jpg';
import geefiImg from './assets/geefi.jpg';
import gradiaImg from './assets/gradia.jpg';
import sanggaluriImg from './assets/sanggaluri.jpg';
import baksoPakMulImg from './assets/baksopakmul.jpg';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    // Mencegah glitch render 2x di React Strict Mode
    if (isMounted.current) return;
    isMounted.current = true;

    // ── LOADER ──
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.classList.add('hidden');
        startHeroAnimations();
      }
    }, 1800);

    // ── CURSOR ──
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    
    const handleMouseMove = (e) => { 
        mx = e.clientX; 
        my = e.clientY; 
        if(cursor) { cursor.style.left = mx+'px'; cursor.style.top = my+'px'; }
    };
    document.addEventListener('mousemove', handleMouseMove);

    let animId;
    function animRing() {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      if (ring) { ring.style.left = rx+'px'; ring.style.top = ry+'px'; }
      animId = requestAnimationFrame(animRing);
    }
    animRing();

    document.querySelectorAll('a, button, .service-card, .skill-chip, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => { 
          if(cursor) { cursor.style.transform='translate(-50%,-50%) scale(2.5)'; cursor.style.opacity='.4'; }
          if(ring) { ring.style.width='60px'; ring.style.height='60px'; }
      });
      el.addEventListener('mouseleave', () => { 
          if(cursor) { cursor.style.transform='translate(-50%,-50%) scale(1)'; cursor.style.opacity='1'; }
          if(ring) { ring.style.width='36px'; ring.style.height='36px'; }
      });
    });

    // ── STARFIELD + CONSTELLATIONS ──
    const canvas = document.getElementById('particle-canvas');
    let ctx, W, H, stars = [], shootingStars = [];
    if (canvas) {
        ctx = canvas.getContext('2d');
        function resizeCanvas() { 
            if(!canvas) return;
            W = canvas.width = window.innerWidth; 
            H = canvas.height = window.innerHeight; 
        }
        resizeCanvas();
        window.addEventListener('resize', () => { resizeCanvas(); initStars(); });

        function initStars() {
          stars = [];
          const count = Math.floor((W * H) / 6000);
          for (let i = 0; i < count; i++) {
              stars.push({
                  x: Math.random() * W, y: Math.random() * H,
                  r: Math.random() * 1.8 + 0.3,
                  baseOp: Math.random() * 0.6 + 0.2,
                  op: 0,
                  twinkleSpeed: Math.random() * 0.02 + 0.005,
                  twinkleOffset: Math.random() * Math.PI * 2,
                  driftX: (Math.random() - 0.5) * 0.08,
                  driftY: (Math.random() - 0.5) * 0.04,
              });
          }
        }
        initStars();

        function spawnShootingStar() {
          shootingStars.push({
            x: Math.random() * W * 0.8,
            y: Math.random() * H * 0.4,
            len: Math.random() * 80 + 60,
            speed: Math.random() * 8 + 6,
            angle: (Math.random() * 20 + 20) * Math.PI / 180,
            op: 1,
            life: 0,
            maxLife: Math.random() * 40 + 30,
          });
        }
        setInterval(spawnShootingStar, Math.random() * 3000 + 3000);
        setTimeout(spawnShootingStar, 2000);

        let time = 0;
        function drawStarfield() {
            if (!ctx) return;
            ctx.clearRect(0, 0, W, H);
            time += 0.016;

            // Draw stars with twinkling
            stars.forEach((s, i) => {
                s.x += s.driftX;
                s.y += s.driftY;
                if (s.x < -10) s.x = W + 10;
                if (s.x > W + 10) s.x = -10;
                if (s.y < -10) s.y = H + 10;
                if (s.y > H + 10) s.y = -10;

                const twinkle = Math.sin(time * s.twinkleSpeed * 60 + s.twinkleOffset);
                s.op = s.baseOp + twinkle * 0.25;
                s.op = Math.max(0.05, Math.min(1, s.op));

                // Star glow
                if (s.r > 1.2) {
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255,255,255,${s.op * 0.08})`;
                    ctx.fill();
                }

                // Star core
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${s.op})`;
                ctx.fill();

                // Constellation lines
                for (let j = i + 1; j < stars.length; j++) {
                    const d = Math.hypot(stars[j].x - s.x, stars[j].y - s.y);
                    if (d < 120) {
                        ctx.beginPath();
                        ctx.moveTo(s.x, s.y);
                        ctx.lineTo(stars[j].x, stars[j].y);
                        ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - d / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            // Draw shooting stars
            shootingStars.forEach((ss, i) => {
                ss.life++;
                ss.x += Math.cos(ss.angle) * ss.speed;
                ss.y += Math.sin(ss.angle) * ss.speed;
                ss.op = 1 - (ss.life / ss.maxLife);

                if (ss.op <= 0) { shootingStars.splice(i, 1); return; }

                const tailX = ss.x - Math.cos(ss.angle) * ss.len;
                const tailY = ss.y - Math.sin(ss.angle) * ss.len;

                const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
                grad.addColorStop(0, `rgba(255,255,255,0)`);
                grad.addColorStop(0.7, `rgba(255,255,255,${ss.op * 0.5})`);
                grad.addColorStop(1, `rgba(255,255,255,${ss.op})`);

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(ss.x, ss.y);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Bright head
                ctx.beginPath();
                ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${ss.op})`;
                ctx.fill();
            });

            requestAnimationFrame(drawStarfield);
        }
        drawStarfield();
    }

    // ── NAVBAR ──
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if(nav) nav.classList.toggle('scrolled', window.scrollY > 40);
        updateActiveNav();
    });

    function updateActiveNav() {
        const sections = ['home','expertise','skills','about','projects','contact'];
        const links = document.querySelectorAll('.nav-links a');
        let current = '';
        sections.forEach(id => { 
            const el = document.getElementById(id); 
            if (el && el.getBoundingClientRect().top < 120) current = id; 
        });
        links.forEach(l => { 
            l.classList.toggle('active', l.getAttribute('href') === '#'+current); 
        });
    }

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

    const projObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const cards = document.querySelectorAll('.project-card');
                cards.forEach((c,i) => {
                    setTimeout(() => {
                        c.style.transition = 'opacity .7s ease, transform .7s ease, border-color .4s, box-shadow .4s';
                        c.style.opacity = '1'; c.style.transform = 'none';
                    }, i*120);
                });
                projObs.disconnect();
            }
        });
    }, { threshold: 0.1 });
    const firstProj = document.querySelector('.project-card');
    if (firstProj) projObs.observe(firstProj);

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });

  }, []);

  return (
    <>
      <div id="loader">
          <div className="loader-logo">Ghilbran&nbsp;<span>Portfolio</span></div>
          <div className="loader-bar"><div className="loader-bar-inner"></div></div>
      </div>

      <div id="cursor"></div>
      <div id="cursor-ring"></div>

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
              <button className="hamburger" id="ham" aria-label="menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
                          <img src="/images/bran.png" alt="Ghilbran Alfaries Pryma" className="hero-img" onError={(e) => e.target.src='https://ui-avatars.com/api/?name=G+A&background=0d1628&color=2dd4bf&size=400&bold=true&font-size=0.4'} />
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
                              <img src="/images/bran.png" alt="Ghilbran Alfaries Pryma" onError={(e) => e.target.src='https://ui-avatars.com/api/?name=G+A&background=0d1628&color=2dd4bf&size=400&bold=true&font-size=0.4'} />
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
              <div className="projects-grid">

                  {/* 1. Ibravia - Company Profile & Admin Dashboard */}
                  <div className="project-card">
                      <div className="project-thumb">
                          <div className="project-screen-wrap img-loading" id="thumb-ibravia">
                              <img src={ibraviaImg} 
                                   alt="Ibravia Company Profile & Dashboard"
                                   style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                                   onLoad={(e) => e.target.parentElement.classList.remove('img-loading')}
                                   onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                              />
                              <div className="thumb-fallback" style={{ display: 'none', background: 'linear-gradient(135deg,#0a0a0a,#1a1a1a)', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                                  <i className="fas fa-building" style={{ color: '#fff', fontSize: '2.5rem' }}></i>
                                  <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>IBRAVIA</span>
                              </div>
                          </div>
                          <div className="overlay">
                              <a href="https://ibravia.com" target="_blank" rel="noreferrer" className="overlay-btn"><i className="fas fa-external-link-alt"></i> Live</a>
                              <a href="https://github.com/Ghilbranalf" target="_blank" rel="noreferrer" className="overlay-btn"><i className="fab fa-github"></i> Code</a>
                          </div>
                      </div>
                      <div className="project-body">
                          <div className="device-badges">
                              <span className="device-badge desktop"><i className="fas fa-desktop" style={{ fontSize: "0.55rem", marginRight: "3px" }}></i> Desktop</span>
                              <span className="device-badge app"><i className="fas fa-cog" style={{ fontSize: "0.55rem", marginRight: "3px" }}></i> Dashboard</span>
                          </div>
                          <div className="project-tag">Company Profile · Dashboard · Real Estate</div>
                          <h4>Ibravia Residence</h4>
                          <p>Website company profile dan admin dashboard perumahan Ibravia. Menampilkan katalog unit, pencarian properti, serta dashboard internal dengan visualisasi penjualan, manajemen pembeli, dan role-based access control.</p>
                          <div className="project-stack">
                              <span className="stack-tag">WordPress</span><span className="stack-tag">React</span><span className="stack-tag">PHP</span><span className="stack-tag">Java</span><span className="stack-tag">MySQL</span><span className="stack-tag">Bootstrap</span>
                          </div>
                      </div>
                  </div>
                  
                  {/* 2. Geefi Residence */}
                  <div className="project-card">
                      <div className="project-thumb">
                          <div className="project-screen-wrap img-loading" id="thumb-geefi">
                              <img src={geefiImg}
                                   alt="Geefi Residence"
                                   style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                                   onLoad={(e) => e.target.parentElement.classList.remove('img-loading')}
                              />
                              <div className="thumb-fallback" style={{ display: 'none', background: 'linear-gradient(135deg,#0a0a0a,#1a1a1a)', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                                  <i className="fas fa-home" style={{ color: '#fff', fontSize: '2.5rem' }}></i>
                                  <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>GEEFI RESIDENCE</span>
                              </div>
                          </div>
                          <div className="overlay">
                              <a href="https://geefi-residence.vercel.app" target="_blank" rel="noreferrer" className="overlay-btn"><i className="fas fa-external-link-alt"></i> Live</a>
                              <a href="https://github.com/Ghilbranalf" target="_blank" rel="noreferrer" className="overlay-btn"><i className="fab fa-github"></i> Code</a>
                          </div>
                      </div>
                      <div className="project-body">
                          <div className="device-badges">
                              <span className="device-badge desktop"><i className="fas fa-desktop" style={{ fontSize: "0.55rem", marginRight: "3px" }}></i> Desktop</span>
                              <span className="device-badge mobile"><i className="fas fa-mobile-alt" style={{ fontSize: "0.55rem", marginRight: "3px" }}></i> Mobile</span>
                          </div>
                          <div className="project-tag">Web App · Real Estate</div>
                          <h4>Geefi Residence</h4>
                          <p>Website perumahan Geefi yang fully responsive untuk desktop dan mobile. Menampilkan galeri unit, harga, cicilan, dan lokasi properti dengan desain modern yang dioptimasi untuk konversi leads.</p>
                          <div className="project-stack">
                              <span className="stack-tag">React</span><span className="stack-tag">Tailwind</span><span className="stack-tag">Vercel</span>
                          </div>
                      </div>
                  </div>

                  {/* 3. Gradia Mobile App */}
                  <div className="project-card">
                      <div className="project-thumb">
                          <div className="project-screen-wrap img-loading" id="thumb-gradia">
                              <img src={gradiaImg}
                                   alt="Gradia Mobile App"
                                   style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                                   onLoad={(e) => e.target.parentElement.classList.remove('img-loading')}
                              />
                              <div className="thumb-fallback" style={{ display: 'none', background: 'linear-gradient(135deg,#0a0a0a,#1a1a1a)', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                                  <i className="fas fa-mobile-alt" style={{ color: '#fff', fontSize: '2.5rem' }}></i>
                                  <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>GRADIA APP</span>
                              </div>
                          </div>
                          <div className="overlay">
                              <a href="https://gradia-three.vercel.app" target="_blank" rel="noreferrer" className="overlay-btn"><i className="fas fa-external-link-alt"></i> Live</a>
                              <a href="https://github.com/Ghilbranalf" target="_blank" rel="noreferrer" className="overlay-btn"><i className="fab fa-github"></i> Code</a>
                          </div>
                      </div>
                      <div className="project-body">
                          <div className="device-badges">
                              <span className="device-badge app"><i className="fas fa-mobile-alt" style={{ fontSize: "0.55rem", marginRight: "3px" }}></i> Mobile App</span>
                          </div>
                          <div className="project-tag">Mobile Application</div>
                          <h4>Gradia Mobile App</h4>
                          <p>Aplikasi mobile berbasis web yang didesain khusus dengan tampilan dan UX native-like. Dioptimasi untuk layar smartphone dengan navigasi intuitif dan performa tinggi menggunakan React.</p>
                          <div className="project-stack">
                              <span className="stack-tag">React</span><span className="stack-tag">Tailwind</span><span className="stack-tag">PWA</span><span className="stack-tag">Vercel</span>
                          </div>
                      </div>
                  </div>

                  {/* 4. Sanggaluri */}
                  <div className="project-card">
                      <div className="project-thumb">
                          <div className="project-screen-wrap img-loading" id="thumb-sanggaluri">
                              <img src={sanggaluriImg}
                                   alt="Sanggaluri Internal Portal"
                                   style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                                   onLoad={(e) => e.target.parentElement.classList.remove('img-loading')}
                              />
                              <div className="thumb-fallback" style={{ display: 'none', background: 'linear-gradient(135deg,#0a0a0a,#1a1a1a)', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                                  <i className="fas fa-user-shield" style={{ color: '#fff', fontSize: '2.5rem' }}></i>
                                  <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>SANGGALURI</span>
                              </div>
                          </div>
                          <div className="overlay">
                              <a href="https://dashboard-smms.vercel.app" target="_blank" rel="noreferrer" className="overlay-btn"><i className="fas fa-external-link-alt"></i> Live</a>
                              <a href="https://github.com/Ghilbranalf" target="_blank" rel="noreferrer" className="overlay-btn"><i className="fab fa-github"></i> Code</a>
                          </div>
                      </div>
                      <div className="project-body">
                          <div className="device-badges">
                              <span className="device-badge ui"><i className="fas fa-lock" style={{ fontSize: "0.55rem", marginRight: "3px" }}></i> Internal Portal</span>
                              <span className="device-badge desktop"><i className="fas fa-desktop" style={{ fontSize: "0.55rem", marginRight: "3px" }}></i> Desktop</span>
                          </div>
                          <div className="project-tag">Internal Portal · Management System</div>
                          <h4>Sanggaluri Portal</h4>
                          <p>Internal portal aman & terpercaya khusus tim manajemen Sanggaluri. Dilengkapi sistem autentikasi terenkripsi untuk mengelola data operasional dan aktivitas perusahaan secara efisien.</p>
                          <div className="project-stack">
                              <span className="stack-tag">React</span><span className="stack-tag">Tailwind</span><span className="stack-tag">Vercel</span>
                          </div>
                      </div>
                  </div>

                  {/* 5. Ecommerce Bakso Pak Mul */}
                  <div className="project-card">
                      <div className="project-thumb">
                          <div className="project-screen-wrap img-loading" id="thumb-baksopakmul">
                              <img src={baksoPakMulImg}
                                   alt="Ecommerce Bakso Pak Mul"
                                   style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                                   onLoad={(e) => e.target.parentElement.classList.remove('img-loading')}
                              />
                              <div className="thumb-fallback" style={{ display: 'none', background: 'linear-gradient(135deg,#0a0a0a,#1a1a1a)', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                                  <i className="fas fa-shopping-cart" style={{ color: "#fff", fontSize: "2.5rem" }}></i>
                                  <span style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 700 }}>BAKSO PAK MUL</span>
                              </div>
                          </div>
                          <div className="overlay">
                              <a href="#" className="overlay-btn"><i className="fas fa-external-link-alt"></i> Live</a>
                              <a href="https://github.com/Ghilbranalf" target="_blank" rel="noreferrer" className="overlay-btn"><i className="fab fa-github"></i> Code</a>
                          </div>
                      </div>
                      <div className="project-body">
                          <div className="device-badges">
                              <span className="device-badge desktop"><i className="fas fa-desktop" style={{ fontSize: "0.55rem", marginRight: "3px" }}></i> Desktop</span>
                              <span className="device-badge mobile"><i className="fas fa-mobile-alt" style={{ fontSize: "0.55rem", marginRight: "3px" }}></i> Mobile</span>
                          </div>
                          <div className="project-tag">Web App · E-Commerce</div>
                          <h4>E-Commerce Bakso Pak Mul</h4>
                          <p>Platform e-commerce penyedia bahan baku bakso & mie ayam. Dilengkapi katalog produk lengkap, sistem transaksi instan, kemitraan grosir, serta pengalaman belanja mobile & desktop yang intuitif.</p>
                          <div className="project-stack">
                              <span className="stack-tag">Next.js</span><span className="stack-tag">React</span><span className="stack-tag">Tailwind</span><span className="stack-tag">MySQL</span>
                          </div>
                      </div>
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