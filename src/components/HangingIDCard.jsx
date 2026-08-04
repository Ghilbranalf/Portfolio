import React, { useState, useRef } from 'react';

export default function HangingIDCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [transformStyle, setTransformStyle] = useState('');
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-y / rect.height) * 20; // max 20deg tilt
    const rotateY = (x / rect.width) * 20;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
  };

  const handleMouseLeave = () => {
    if (!isFlipped) {
      setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    }
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="hanging-id-wrapper">
      {/* LANYARD STRAP & CLIP */}
      <div className="lanyard-strap">
        <div className="lanyard-ribbon">
          <span>TELKOM UNIVERSITY • INFORMATIKA '23 • TELKOM UNIVERSITY</span>
        </div>
        <div className="lanyard-ring"></div>
        <div className="lanyard-clip"></div>
      </div>

      {/* 3D HANGING ID CARD CONTAINER */}
      <div
        ref={cardRef}
        className={`id-card-container ${isFlipped ? 'flipped' : ''}`}
        style={{ transform: isFlipped ? 'perspective(1000px) rotateY(180deg)' : transformStyle }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        title="Klik untuk membalik ID Card"
      >
        <div className="id-card-inner">
          {/* FRONT SIDE */}
          <div className="id-card-face id-card-front">
            {/* Holographic Gloss Shine Overlay */}
            <div className="hologram-shine"></div>

            {/* Lanyard Slot Hole */}
            <div className="card-lanyard-hole"></div>

            {/* Header / University Logo */}
            <div className="id-card-header">
              <div className="univ-badge">
                <i className="fas fa-university"></i> TELKOM UNIVERSITY
              </div>
              <div className="univ-sub">PURWOKERTO • STUDENT ID</div>
            </div>

            {/* Main Body */}
            <div className="id-card-body">
              {/* Photo Frame */}
              <div className="id-photo-wrap">
                <img
                  src="/images/bran.png"
                  alt="Ghilbran Alfaries"
                  className="id-photo"
                  onError={(e) => {
                    e.target.src = 'https://ui-avatars.com/api/?name=Ghilbran+A&background=0d1628&color=ffffff&size=200&bold=true';
                  }}
                />
                <span className="id-status-dot" title="Status: Active Student"></span>
              </div>

              {/* Info Details */}
              <div className="id-info">
                <h3 className="id-name">Ghilbran Alfaries</h3>
                <span className="id-title">Mahasiswa S1 Informatika</span>

                <div className="id-metrics">
                  <div className="id-metric-item">
                    <span className="metric-label">NIM</span>
                    <strong className="metric-val">2311102267</strong>
                  </div>
                  <div className="id-metric-item">
                    <span className="metric-label">IPK</span>
                    <strong className="metric-val accent-val">3.70</strong>
                  </div>
                  <div className="id-metric-item">
                    <span className="metric-label">ANGKATAN</span>
                    <strong className="metric-val">2023 (Sem 6)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer: Chip + Barcode */}
            <div className="id-card-footer">
              <div className="smart-chip">
                <div className="chip-line"></div>
                <div className="chip-line"></div>
              </div>
              <div className="id-barcode-wrap">
                <div className="barcode-lines">
                  <span></span><span></span><span></span><span></span><span></span>
                  <span></span><span></span><span></span><span></span><span></span>
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
                <span className="barcode-num">2311102267-TELKOM-INF23</span>
              </div>
            </div>

            {/* Click Hint */}
            <div className="flip-hint">
              <i className="fas fa-sync-alt"></i> Klik untuk balik
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="id-card-face id-card-back">
            <div className="hologram-shine"></div>

            {/* Magnetic Stripe */}
            <div className="magnetic-stripe"></div>

            {/* Back Header */}
            <div className="id-card-back-body">
              <div className="back-watermark">
                <i className="fas fa-graduation-cap"></i> KARTU TANDA MAHASISWA
              </div>

              <div className="id-spec-section">
                <h4>FOKUS STUDI &amp; KEAHLIAN</h4>
                <ul className="id-spec-list">
                  <li><i className="fas fa-brain"></i> Machine Learning &amp; NLP</li>
                  <li><i className="fas fa-mobile-alt"></i> Mobile Dev (React Native)</li>
                  <li><i className="fas fa-code"></i> Web Dev (React &amp; Next.js)</li>
                  <li><i className="fab fa-java"></i> Java &amp; Express.js Backend</li>
                </ul>
              </div>

              <div className="id-contact-mini">
                <div className="contact-mini-row">
                  <i className="fab fa-github"></i> github.com/Ghilbranalf
                </div>
                <div className="contact-mini-row">
                  <i className="fas fa-map-marker-alt"></i> Purwokerto, Indonesia
                </div>
              </div>

              {/* Official Stamp Hologram */}
              <div className="official-stamp">
                <div className="stamp-inner">
                  <i className="fas fa-check-circle"></i> VERIFIED STUDENT
                </div>
              </div>
            </div>

            {/* Flip Back Hint */}
            <div className="flip-hint">
              <i className="fas fa-sync-alt"></i> Klik untuk depan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
