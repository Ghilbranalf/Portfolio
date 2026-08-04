import React, { useState, useRef } from 'react';

export default function IsometricTechStack() {
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const [rotate, setRotate] = useState({ rx: 52, rz: -35 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rx = 52 - (y / rect.height) * 15;
    const rz = -35 + (x / rect.width) * 15;
    setRotate({ rx, rz });
  };

  const handleMouseLeave = () => {
    setHoveredLayer(null);
    setRotate({ rx: 52, rz: -35 });
  };

  return (
    <div
      ref={containerRef}
      className="iso-stack-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="iso-stack-title-badge">
        <i className="fas fa-cubes"></i> 3D ISOMETRIC TECH ARCHITECTURE
      </div>

      {/* 3D Isometric Viewport */}
      <div className="iso-viewport">
        <div
          className={`iso-scene ${hoveredLayer !== null ? 'expanded' : ''}`}
          style={{ transform: `rotateX(${rotate.rx}deg) rotateZ(${rotate.rz}deg)` }}
        >
          {/* Vertical Connecting Lines */}
          <div className="iso-connector-line c1"></div>
          <div className="iso-connector-line c2"></div>
          <div className="iso-connector-line c3"></div>
          <div className="iso-connector-line c4"></div>

          {/* LAYER 1 (TOP: FRONTEND & UI) */}
          <div
            className={`iso-layer layer-top ${hoveredLayer === 1 ? 'active' : ''}`}
            onMouseEnter={() => setHoveredLayer(1)}
          >
            <div className="layer-glass-top"></div>
            <div className="layer-content">
              <div className="layer-header">
                <span className="layer-num">LAYER 01</span>
                <span className="layer-tag font-tag">FRONTEND &amp; UI</span>
              </div>
              <h4 className="layer-title">React.js &amp; Next.js App Router</h4>
              <div className="layer-tech-pills">
                <span><i className="fab fa-react"></i> React</span>
                <span><i className="fab fa-css3-alt"></i> Tailwind</span>
                <span><i className="fab fa-js"></i> TypeScript</span>
              </div>
            </div>
            <div className="layer-glow cyan-glow"></div>
          </div>

          {/* LAYER 2 (MIDDLE: BACKEND & AI) */}
          <div
            className={`iso-layer layer-middle ${hoveredLayer === 2 ? 'active' : ''}`}
            onMouseEnter={() => setHoveredLayer(2)}
          >
            <div className="layer-glass-top"></div>
            <div className="layer-content">
              <div className="layer-header">
                <span className="layer-num">LAYER 02</span>
                <span className="layer-tag ai-tag">BACKEND &amp; AI ENGINE</span>
              </div>
              <h4 className="layer-title">Express.js &amp; IndoBERT Fine-Tuning</h4>
              <div className="layer-tech-pills">
                <span><i className="fas fa-brain"></i> IndoBERT</span>
                <span><i className="fab fa-node-js"></i> Express</span>
                <span><i className="fab fa-java"></i> Java</span>
              </div>
            </div>
            <div className="layer-glow purple-glow"></div>
          </div>

          {/* LAYER 3 (BASE: DATABASE & CLOUD) */}
          <div
            className={`iso-layer layer-base ${hoveredLayer === 3 ? 'active' : ''}`}
            onMouseEnter={() => setHoveredLayer(3)}
          >
            <div className="layer-glass-top"></div>
            <div className="layer-content">
              <div className="layer-header">
                <span className="layer-num">LAYER 03</span>
                <span className="layer-tag db-tag">DATA &amp; INFRASTRUCTURE</span>
              </div>
              <h4 className="layer-title">PostgreSQL, Supabase &amp; Git</h4>
              <div className="layer-tech-pills">
                <span><i className="fas fa-database"></i> PostgreSQL</span>
                <span><i className="fas fa-bolt"></i> Supabase</span>
                <span><i className="fab fa-git-alt"></i> Git</span>
              </div>
            </div>
            <div className="layer-glow deep-purple-glow"></div>
          </div>
        </div>
      </div>

      <div className="iso-hint">
        <i className="fas fa-mouse-pointer"></i> Arahkan kursor untuk meregangkan Layer 3D
      </div>
    </div>
  );
}
