import React, { useState, useRef, useEffect } from 'react';

const PROFILE_DATA = `
DATA DIRI:
- Nama: Ghilbran Alfaries
- Status: Mahasiswa Informatika, Telkom University Purwokerto, angkatan 2023 (semester 6)
- Student ID: 2311102267
- IPK: 3.70
- Fokus studi: Machine Learning, NLP, Mobile Development, Web Development

TECH STACK:
- Frontend: React.js, React Native, Next.js (App Router), TypeScript, Tailwind CSS
- Backend: Express.js, Supabase, PostgreSQL, MySQL
- Tools & lainnya: Git, WordPress, Postman
- AI/ML: Fine-tuning model (IndoBERT), Hugging Face Trainer API, Random Forest, scikit-learn

PENGALAMAN & PROJECT:
- Internship di Bikin Kreatif ID
- SanggaluriSM — sistem manajemen media sosial, kerja tim bareng Natasya, Rendi, dan Egi (termasuk desain roll-up banner & poster promosi)
- GRADIA — aplikasi mobile React Native untuk manajemen akademik: presensi, penjadwalan, manajemen tugas, kalender interaktif
- Bakso Pak Mul — platform e-commerce Next.js + Supabase untuk supplier bahan bakso, termasuk integrasi payment gateway (Midtrans/iPaymu), sistem ongkir, dan chatbot AI customer service
- Geefi Residence — website properti Next.js untuk PT Abyakta Ageng Propertindo, termasuk chatbot terintegrasi n8n, simulasi KPR, dan berbagai komponen frontend

PROJECT AKADEMIK:
- Fine-tuning IndoBERT untuk klasifikasi sentimen review J&T menggunakan Hugging Face Trainer API
- Klasifikasi honeypot dataset (CUIP-X25) menggunakan Random Forest dengan SMOTE balancing

GITHUB: github.com/Ghilbranalf
`;

const CONTACT_INFO = `
KONTAK:
- GitHub: github.com/Ghilbranalf
- Untuk kontak langsung (email/LinkedIn/WA), arahkan pengunjung ke halaman kontak di portfolio ini (#contact)
`;

const META_ANSWERS = `
JIKA DITANYA "siapa kamu" / "kamu AI ya" / "kamu siapa":
Jawab santai: "Saya asisten AI yang dibuat Ghilbran untuk membantu menjawab pertanyaan seputar profil, skill, dan project-nya. Ada yang mau ditanyakan soal Ghilbran?"

JIKA DITANYA KETERSEDIAAN KERJA/MAGANG/FREELANCE:
Jawab: "Ghilbran saat ini masih aktif kuliah semester 6 (IPK 3.70), tapi terbuka untuk kesempatan magang maupun proyek freelance. Silakan hubungi lewat halaman kontak di portfolio ini ya!"

JIKA DITANYA "Ghilbran orangnya kayak gimana?":
Jawab berdasarkan pola kerja yang terlihat dari project-projectnya: detail-oriented, suka membangun sistem end-to-end (dari database sampai UI), dan senang eksplorasi teknologi baru terutama di bidang AI/ML.
`;

const OUT_OF_SCOPE_KEYWORDS = [
  "presiden", "politik", "resep", "cuaca", "berita hari ini",
  "buatkan program", "buatkan kode", "tulis kode untuk saya",
  "game", "lirik lagu", "cerita dong yang lain",
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: 'Halo! 👋 Saya **Portfolio AI Assistant** milik Ghilbran Alfaries. Ada yang ingin kamu ketahui tentang profil, skill, pengalaman, atau project Ghilbran?',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

const QUICK_QUESTIONS = [
  '🚀 Project Unggulan',
  '💻 Tech Stack & AI/ML',
  '🎓 IPK & Profil',
  '📧 Kontak & Hire'
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const getFallbackReply = (userQuery) => {
    const q = userQuery.toLowerCase();

    if (q.includes('ipk') || q.includes('kuliah') || q.includes('semester') || q.includes('telkom') || q.includes('nim') || q.includes('student id') || q.includes('jurusan')) {
      return `Ghilbran Alfaries adalah mahasiswa S1 Teknik Informatika di **Telkom University Purwokerto** (angkatan 2023, semester 6) dengan **IPK 3.70** (NIM: 2311102267). Fokus studinya meliputi Machine Learning, NLP, Mobile Development, dan Web Development.`;
    }

    if (q.includes('proyek') || q.includes('project') || q.includes('gradia') || q.includes('bakso') || q.includes('geefi') || q.includes('sanggaluri') || q.includes('indobert')) {
      return `Berikut beberapa project unggulan Ghilbran:
• **GRADIA**: Aplikasi mobile React Native untuk manajemen akademik (presensi, penjadwalan, tugas, kalender interaktif).
• **Bakso Pak Mul**: E-commerce Next.js + Supabase untuk supplier bahan bakso (integrasi Midtrans/iPaymu, ongkir, AI chatbot).
• **Geefi Residence**: Website properti Next.js untuk PT Abyakta Ageng Propertindo (chatbot n8n & simulasi KPR).
• **SanggaluriSM**: Sistem manajemen media sosial (dikembangkan bersama tim: Natasya, Rendi, Egi).
• **Fine-tuning IndoBERT**: Klasifikasi sentimen review J&T dengan Hugging Face Trainer API.
• **CUIP-X25 Honeypot**: Klasifikasi honeypot dataset dengan Random Forest & SMOTE.

Cek selengkapnya di [GitHub Ghilbran](https://github.com/Ghilbranalf) atau bagian [Projects](#projects)!`;
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('ai') || q.includes('ml') || q.includes('react') || q.includes('next') || q.includes('bert')) {
      return `Tech Stack & Keahlian Ghilbran:
• **Frontend**: React.js, React Native, Next.js (App Router), TypeScript, Tailwind CSS
• **Backend**: Express.js, Supabase, PostgreSQL, MySQL
• **AI & ML**: Fine-tuning IndoBERT, Hugging Face Trainer API, Random Forest, scikit-learn
• **Tools**: Git, WordPress, Postman

Jelajahi visualisasi lengkapnya di [Skills Section](#skills).`;
    }

    if (q.includes('siapa') || q.includes('profil') || q.includes('orangnya') || q.includes('biodata')) {
      return `**Ghilbran Alfaries** adalah mahasiswa Informatika Telkom University Purwokerto (IPK 3.70) yang detail-oriented, suka membangun sistem end-to-end (dari database hingga UI), dan aktif mengeksplorasi teknologi baru khususnya di bidang AI/ML serta Web & Mobile App Development.`;
    }

    if (q.includes('kontak') || q.includes('hubungi') || q.includes('magang') || q.includes('freelance') || q.includes('hire')) {
      return `Ghilbran saat ini masih aktif kuliah semester 6, namun **terbuka untuk kesempatan magang maupun proyek freelance**.
Kamu bisa melihat portofolio lengkap di [GitHub Ghilbran](https://github.com/Ghilbranalf) atau menghubungi langsung via [Contact Section](#contact).`;
    }

    return `Ghilbran Alfaries adalah mahasiswa Informatika Telkom University Purwokerto (IPK 3.70) yang berfokus pada Machine Learning, NLP, serta Mobile & Web Development.

Project unggulannya antara lain **Bakso Pak Mul** (e-commerce Next.js), **GRADIA** (aplikasi React Native), dan **Fine-tuning IndoBERT**. Cek [GitHub Ghilbran](https://github.com/Ghilbranalf) untuk detail lebih lanjut!`;
  };

  const handleSend = async (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    const msgLower = query.toLowerCase();
    const isOutOfScope = OUT_OF_SCOPE_KEYWORDS.some((k) => msgLower.includes(k));

    if (isOutOfScope) {
      setTimeout(() => {
        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Maaf, saya adalah asisten AI khusus untuk portfolio Ghilbran 🙂. Saya hanya bisa membantu pertanyaan seputar profil, skill, pengalaman, dan project-project Ghilbran. Ada yang mau ditanyakan soal itu?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 500);
      return;
    }

    // Groq API Integration with Fallback
    const apiKey = import.meta.env?.VITE_GROQ_API_KEY || (typeof process !== 'undefined' ? process.env?.GROQ_API_KEY : '') || '';

    if (apiKey) {
      try {
        const historyContext = newMessages.slice(-6).map((h) => ({
          role: h.sender === 'user' ? 'user' : 'assistant',
          content: h.text
        }));

        const systemPrompt = `
Kamu adalah asisten AI yang mewakili Ghilbran Alfaries di website portfolio pribadinya. Tugasmu menjawab pertanyaan pengunjung (recruiter, HR, sesama developer, atau calon klien) seputar profil, skill, pengalaman, dan project Ghilbran.

${PROFILE_DATA}
${CONTACT_INFO}
${META_ANSWERS}

ATURAN PENTING:
1. Jawab LANGSUNG, SPESIFIK, dan berdasarkan data di atas — jangan mengarang informasi yang tidak ada.
2. Kalau ditanya soal project tertentu, jelaskan dengan detail: tech stack yang dipakai, peran Ghilbran, dan tantangannya jika relevan.
3. Gunakan nada percaya diri tapi rendah hati, gaya bahasa santai-profesional (seperti developer muda ngobrol dengan recruiter).
4. Kalau ditanya hal di luar topik profil/skill/project Ghilbran, arahkan sopan kembali ke topik portfolio.
5. Jawaban ringkas dan padat (maksimal 3-4 kalimat), kecuali diminta detail lebih lanjut.
6. Selalu jawab dalam Bahasa Indonesia kecuali pengunjung bertanya dalam Bahasa Inggris.
`;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: systemPrompt },
              ...historyContext
            ],
            temperature: 0.7,
            max_tokens: 500
          })
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data?.choices?.[0]?.message?.content;
          if (replyText) {
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now() + 1,
                sender: 'bot',
                text: replyText,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
            setIsTyping(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Groq API Call error, switching to smart fallback:', err);
      }
    }

    // Smart Local Fallback
    setTimeout(() => {
      const fallbackReply = getFallbackReply(query);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: fallbackReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  const renderFormattedText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const label = linkMatch[1];
        const url = linkMatch[2];
        const isExternal = url.startsWith('http');
        return (
          <a
            key={i}
            href={url}
            target={isExternal ? '_blank' : '_self'}
            rel={isExternal ? 'noreferrer' : ''}
            className="chatbot-link"
            onClick={() => {
              if (!isExternal) setIsOpen(false);
            }}
          >
            {label}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="chatbot-wrapper">
      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar-container">
              <div className="chatbot-avatar">
                <i className="fas fa-robot"></i>
              </div>
              <div className="chatbot-title-info">
                <h4>Ghilbran AI Assistant</h4>
                <span className="chatbot-status">
                  <span className="chatbot-status-dot"></span> Powered by Groq AI
                </span>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button
                className="chatbot-action-btn"
                title="Reset percakapan"
                onClick={handleClearChat}
              >
                <i className="fas fa-redo-alt"></i>
              </button>
              <button
                className="chatbot-action-btn"
                title="Tutup Chat"
                onClick={handleToggle}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="chatbot-body">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chatbot-msg-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="chatbot-msg-avatar">
                    <i className="fas fa-robot"></i>
                  </div>
                )}
                <div className="chatbot-msg-bubble">
                  <div className="chatbot-msg-content">
                    {renderFormattedText(msg.text)}
                  </div>
                  <span className="chatbot-msg-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-msg-row bot-row">
                <div className="chatbot-msg-avatar">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="chatbot-msg-bubble typing-bubble">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestion Pills */}
          <div className="chatbot-suggestions">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                className="suggestion-pill"
                onClick={() => handleSend(q)}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="chatbot-footer">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Tanyakan sesuatu tentang Ghilbran..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="chatbot-send-btn"
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        className={`chatbot-trigger ${isOpen ? 'active' : ''}`}
        onClick={handleToggle}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? (
          <i className="fas fa-times"></i>
        ) : (
          <>
            <i className="fas fa-comments"></i>
            {unreadCount > 0 && <span className="chatbot-unread-badge">{unreadCount}</span>}
          </>
        )}
      </button>
    </div>
  );
}
