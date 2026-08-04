import React, { useState, useRef } from 'react';

export default function StudentCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [transformStyle, setTransformStyle] = useState('');
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-y / rect.height) * 18;
    const rotateY = (x / rect.width) * 18;

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
    <div
      ref={cardRef}
      className={`student-id-card ${isFlipped ? 'flipped' : ''}`}
      style={{ transform: isFlipped ? 'perspective(1000px) rotateY(180deg)' : transformStyle }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      title="Klik untuk membalik Kartu Mahasiswa"
    >
      <div className="student-card-inner">
        {/* FRONT SIDE */}
        <div className="student-card-face card-front">
          <div className="card-hologram-glare"></div>

          {/* Header */}
          <div className="student-card-header">
            <div className="univ-brand">
              <i className="fas fa-university"></i> TELKOM UNIVERSITY
            </div>
            <span className="univ-tag">PURWOKERTO • STUDENT ID</span>
          </div>

          {/* Body */}
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

          {/* Footer */}
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
            <i className="fas fa-sync-alt"></i> Klik untuk membalik kartu
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
            <i className="fas fa-sync-alt"></i> Klik untuk membalik kartu
          </div>
        </div>
      </div>
    </div>
  );
}
