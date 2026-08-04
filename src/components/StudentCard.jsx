import React, { useState, useRef, useEffect } from 'react';

export default function StudentCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const dragStartRef = useRef({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Mouse move tilt effect when not dragging
  const handleMouseMove = (e) => {
    if (!cardRef.current || isFlipped || isDragging) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-y / rect.height) * 16;
    const rotateY = (x / rect.width) * 16;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    if (!isFlipped && !isDragging) {
      setTilt({ rotateX: 0, rotateY: 0 });
    }
  };

  // Drag logic (Elastic Rubber Pull)
  const handleMouseDown = (e) => {
    // Only drag on left click or touch
    if (e.button !== undefined && e.button !== 0) return;
    setIsDragging(true);
    setIsBouncing(false);
    dragStartRef.current = {
      x: e.clientX || e.touches?.[0]?.clientX || 0,
      y: e.clientY || e.touches?.[0]?.clientY || 0,
      initialOffsetX: offset.x,
      initialOffsetY: offset.y
    };
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
      const clientY = e.clientY || e.touches?.[0]?.clientY || 0;

      const rawDx = clientX - dragStartRef.current.x;
      const rawDy = clientY - dragStartRef.current.y;

      // Rubbery non-linear resistance (elastic damping)
      const dampenedX = Math.sign(rawDx) * Math.pow(Math.abs(rawDx), 0.82) * 1.5;
      const dampenedY = Math.sign(rawDy) * Math.pow(Math.abs(rawDy), 0.85) * 1.6;

      setOffset({
        x: dragStartRef.current.initialOffsetX + dampenedX,
        y: Math.max(-20, dragStartRef.current.initialOffsetY + dampenedY) // allow pulling down, restrict pulling too far up
      });

      // Tilt while dragging
      setTilt({
        rotateX: Math.min(25, Math.max(-25, dampenedY * 0.15)),
        rotateY: Math.min(25, Math.max(-25, -dampenedX * 0.2))
      });
    };

    const handleGlobalMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      setIsBouncing(true);

      // Reset position back to 0,0 with spring bounce
      setOffset({ x: 0, y: 0 });
      setTilt({ rotateX: 0, rotateY: 0 });

      setTimeout(() => {
        setIsBouncing(false);
      }, 1200);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchmove', handleGlobalMouseMove);
      window.addEventListener('touchend', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalMouseMove);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging]);

  const handleCardClick = (e) => {
    // If user dragged more than 5px, don't trigger flip
    if (Math.abs(offset.x) > 6 || Math.abs(offset.y) > 6) return;
    setIsFlipped(!isFlipped);
  };

  // Dynamic SVG Elastic Strap String
  const anchorX = 135;
  const anchorY = 0;
  const cardTopX = anchorX + offset.x;
  const cardTopY = 110 + offset.y;
  const controlX = anchorX + offset.x * 0.4;
  const controlY = (cardTopY) / 2 + offset.y * 0.2;

  const svgPath = `M ${anchorX} ${anchorY} Q ${controlX} ${controlY} ${cardTopX} ${cardTopY}`;

  const transformString = isFlipped
    ? `translate3d(${offset.x}px, ${offset.y}px, 0px) rotateY(180deg)`
    : `translate3d(${offset.x}px, ${offset.y}px, 0px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`;

  return (
    <div className="absolute-hanging-container">
      {/* Dynamic Elastic Ribbon String */}
      <svg className="elastic-lanyard-svg" width="270" height={Math.max(120, cardTopY + 20)}>
        <defs>
          <linearGradient id="lanyardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
          <filter id="stringGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer glow stroke */}
        <path
          d={svgPath}
          fill="none"
          stroke="rgba(45, 212, 191, 0.4)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Inner solid ribbon */}
        <path
          d={svgPath}
          fill="none"
          stroke="url(#lanyardGrad)"
          strokeWidth="3"
          strokeDasharray="6 3"
          strokeLinecap="round"
          filter="url(#stringGlow)"
        />
        {/* Top Anchor Loop */}
        <circle cx={anchorX} cy={anchorY + 4} r="5" fill="#2dd4bf" stroke="#ffffff" strokeWidth="1.5" />
      </svg>

      {/* 3D HANGING CARD */}
      <div
        ref={cardRef}
        className={`student-id-card absolute-hanging ${isFlipped ? 'flipped' : ''} ${isDragging ? 'dragging' : ''} ${isBouncing ? 'rubber-bounce' : ''}`}
        style={{ transform: transformString }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        title="Tarik untuk meregangkan karet • Klik untuk membalik kartu"
      >
        <div className="card-top-clip">
          <div className="clip-ring"></div>
          <div className="clip-holder"></div>
        </div>

        <div className="student-card-inner">
          {/* FRONT SIDE */}
          <div className="student-card-face card-front">
            <div className="card-hologram-glare"></div>

            <div className="student-card-header">
              <div className="univ-brand">
                <i className="fas fa-university"></i> TELKOM UNIVERSITY
              </div>
              <span className="univ-tag">PURWOKERTO • STUDENT ID</span>
            </div>

            <div className="student-card-body">
              <div className="student-avatar-wrap">
                <img
                  src="/images/bran.png"
                  alt="Ghilbran Alfaries"
                  className="student-avatar"
                  onError={(e) => {
                    e.target.src = 'https://ui-avatars.com/api/?name=Ghilbran+A&background=0d1628&color=ffffff&size=200&bold=true';
                  }}
                />
                <span className="student-status-dot" title="Active Student"></span>
              </div>

              <div className="student-details">
                <h3 className="student-name">Ghilbran Alfaries</h3>
                <span className="student-role">Mahasiswa S1 Teknik Informatika</span>

                <div className="student-metrics-grid">
                  <div className="metric-box">
                    <span className="metric-lbl">NIM</span>
                    <strong className="metric-val">2311102267</strong>
                  </div>
                  <div className="metric-box">
                    <span className="metric-lbl">IPK</span>
                    <strong className="metric-val highlight-val">3.70</strong>
                  </div>
                  <div className="metric-box">
                    <span className="metric-lbl">ANGKATAN</span>
                    <strong className="metric-val">2023 (Sem 6)</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="student-card-footer">
              <div className="ic-chip">
                <div className="chip-pattern"></div>
              </div>
              <div className="barcode-box">
                <div className="barcode-stripes">
                  <span></span><span></span><span></span><span></span><span></span>
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
                <span className="barcode-text">2311102267-TELKOM-INF23</span>
              </div>
            </div>

            <div className="card-flip-prompt">
              <i className="fas fa-hand-rock"></i> Tarik / Klik Balik 🔄
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="student-card-face card-back">
            <div className="card-hologram-glare"></div>
            <div className="mag-stripe"></div>

            <div className="student-card-back-content">
              <div className="back-header">
                <i className="fas fa-shield-alt"></i> KARTU TANDA MAHASISWA RESMI
              </div>

              <div className="back-spec-box">
                <h5>FOKUS &amp; KEAHLIAN</h5>
                <ul>
                  <li><i className="fas fa-brain"></i> Machine Learning &amp; NLP</li>
                  <li><i className="fas fa-mobile-alt"></i> Mobile Dev (React Native)</li>
                  <li><i className="fas fa-code"></i> Web Dev (React &amp; Next.js)</li>
                  <li><i className="fab fa-java"></i> Java &amp; Express.js Backend</li>
                </ul>
              </div>

              <div className="back-contact-box">
                <div><i className="fab fa-github"></i> github.com/Ghilbranalf</div>
                <div><i className="fas fa-map-marker-alt"></i> Purwokerto, Indonesia</div>
              </div>

              <div className="official-seal">
                <span><i className="fas fa-check-circle"></i> VERIFIED STUDENT</span>
              </div>
            </div>

            <div className="card-flip-prompt">
              <i className="fas fa-hand-rock"></i> Tarik / Klik Balik 🔄
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
