import React, { useState, useRef, useEffect } from 'react';

const PROFILE_DATA = `
DATA DIRI:
- Nama Lengkap: Ghilbran Alfaries Pryma
- Status: Mahasiswa S1 Teknik Informatika, Fakultas Informatika, Telkom University Purwokerto, angkatan 2023 (semester 6 aktif)
- Student ID / NIM: 2311102267
- IPK: 3.70 / 4.00
- Domisili / Lokasi: Asal Bumiayu (Brebes) & beraktivitas perkuliahan di Purwokerto, Jawa Tengah, Indonesia
- Karakter & Pola Kerja: Detail-oriented, tekun, terbiasa merancang arsitektur sistem end-to-end (dari perancangan database, backend API, hingga interaksi UI frontend berkecepatan tinggi), serta senang mengeksplorasi teknologi modern AI/ML.

TECH STACK:
- Frontend: React.js, Next.js (App Router), TypeScript, JavaScript (ES6+), Tailwind CSS, HTML5, CSS3, PWA
- Backend: Express.js (Node.js), Supabase, PHP / Laravel, RESTful API
- Database: MySQL, PostgreSQL
- Mobile: React Native, Expo, Progressive Web Apps (PWA)
- AI & Machine Learning: Python, IndoBERT fine-tuning, Hugging Face Trainer API, PyTorch, Random Forest, SMOTE, scikit-learn
- Tools & Dev: Git, GitHub, Vercel, Postman, Figma, WordPress

FEATURED PROJECTS:
1. Web DPRD Kabupaten Purbalingga:
   - Deskripsi: Portal web resmi Dewan Perwakilan Rakyat Daerah Kabupaten Purbalingga sebagai pusat keterbukaan informasi publik, agenda dewan, fraksi, komisi, publikasi produk hukum JDIH, serta kanal aspirasi masyarakat terintegrasi.
   - Stack: React, Tailwind CSS, PHP / Laravel, MySQL.
   - Tautan: https://dprd.purbalinggakab.go.id

2. E-Commerce Bakso Pak Mul:
   - Deskripsi: Platform e-commerce penyedia bahan baku bakso & mie ayam (B2B & B2C) dengan katalog produk, transaksi checkout instan, kemitraan grosir, payment gateway otomatis (Midtrans/iPaymu), hitung ongkir otomatis, dan chatbot AI customer service.
   - Stack: Next.js (App Router), React, Supabase, Tailwind CSS, MySQL.

3. GRADIA Mobile App:
   - Deskripsi: Aplikasi mobile berbasis web (PWA) untuk manajemen akademik mahasiswa: presensi digital, jadwal kuliah, pelacak tugas & deadline, serta kalender interaktif native-like.
   - Stack: React, Tailwind CSS, PWA, Vercel.
   - Live Demo: https://gradia-three.vercel.app

4. Ibravia Residence:
   - Deskripsi: Website company profile dan admin dashboard perumahan real estate: katalog unit properti, visualisasi grafik penjualan, manajemen konsumen, dan role-based access control (RBAC).
   - Stack: WordPress, React, PHP, Java, MySQL, Bootstrap.
   - Tautan: https://ibravia.com

5. Geefi Residence:
   - Deskripsi: Website properti modern untuk PT Abyakta Ageng Propertindo: galeri unit, simulasi KPR, optimasi konversi leads, dan integrasi chatbot n8n.
   - Stack: React, Tailwind CSS, Vercel.
   - Live Demo: https://geefi-residence.vercel.app

6. Sanggaluri Portal / SanggaluriSM:
   - Deskripsi: Sistem manajemen media sosial & portal internal operasional terenkripsi khusus tim manajemen Sanggaluri (dikerjakan kolaboratif bersama Natasya, Rendi, dan Egi).
   - Stack: React, Tailwind CSS, Vercel.
   - Live Demo: https://dashboard-smms.vercel.app

RISET AKADEMIK & AI/ML:
- Fine-tuning IndoBERT untuk analisis sentimen review logistik J&T menggunakan Hugging Face Trainer API & PyTorch.
- Klasifikasi dataset ancaman honeypot (CUIP-X25) menggunakan algoritma Random Forest dengan penyeimbangan kelas SMOTE.
- Internship / Magang di Bikin Kreatif ID.

KONTAK RESMI:
- Email: ghilbranroyale@gmail.com
- GitHub: https://github.com/Ghilbranalf
- LinkedIn: https://www.linkedin.com/in/ghilbran-alfaries-pryma-a4ba7b3b6
- Instagram: https://www.instagram.com/ghilbrann
- Ketersediaan: Terbuka untuk magang (internship), proyek freelance, dan kerja remote / kolaborasi.
`;

const OUT_OF_SCOPE_KEYWORDS = [
  "presiden", "politik uang", "resep masakan", "ramalan cuaca", "berita gosip",
  "buatkan puisi cinta", "tulis lirik lagu", "cheat game", "judi", "slot"
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: 'Halo! Saya **AI Assistant** milik Ghilbran Alfaries. Ada yang ingin Anda ketahui seputar keahlian teknis, 6 proyek unggulan (seperti Web DPRD Purbalingga & GRADIA), profil akademik, atau tawaran kerja sama?',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

const QUICK_QUESTIONS = [
  'Proyek DPRD Purbalingga',
  'Project Unggulan',
  'Tech Stack & Keahlian',
  'IPK & Profil',
  'Tawaran Kerja & Kontak'
];

/**
 * Intelligent Rule-Based Response Engine
 * Mampu memahami konteks pertanyaan spesifik tanpa menghasilkan jawaban template kaku.
 */
function getSmartReply(userQuery) {
  const raw = userQuery.trim();
  const q = raw.toLowerCase();

  // 1. CEK BAHASA INGGRIS
  const isEnglish = /\b(who are you|tell me about|what are your|skills|projects|show me|how to contact|can you build|hire you|resume|cv)\b/i.test(q);
  if (isEnglish) {
    if (/\b(skill|stack|technolog)\b/i.test(q)) {
      return `Here is a summary of Ghilbran's technical skills:
• **Frontend**: React.js, Next.js (App Router), TypeScript, Tailwind CSS, PWA
• **Backend**: Express.js, Supabase, PHP / Laravel, RESTful APIs
• **Database**: MySQL, PostgreSQL
• **AI / Machine Learning**: Python, IndoBERT fine-tuning, Hugging Face, Random Forest, scikit-learn
• **Mobile**: React Native, Progressive Web Apps
Feel free to check out the [Skills Section](#skills) for more details!`;
    }
    if (/\b(project|portfolio|work|built)\b/i.test(q)) {
      return `Ghilbran has developed several standout projects:
• **DPRD Purbalingga Web Portal**: Official regional parliamentary portal with public transparency & legislative services.
• **Bakso Pak Mul**: Fullstack E-Commerce with Next.js, Supabase, automated payments, and AI customer service.
• **GRADIA Mobile App**: Academic management app for students (attendance, schedule, tasks) built with React PWA.
• **Ibravia Residence**: Real estate company profile & sales analytics dashboard.
• **Geefi Residence**: Modern property web app with KPR mortgage simulation.
Explore them all in the [Featured Projects](#projects) section or on [GitHub](https://github.com/Ghilbranalf)!`;
    }
    if (/\b(contact|email|hire|freelance|reach)\b/i.test(q)) {
      return `You can reach out to Ghilbran directly:
• **Email**: [ghilbranroyale@gmail.com](mailto:ghilbranroyale@gmail.com)
• **LinkedIn**: [Ghilbran's LinkedIn](https://www.linkedin.com/in/ghilbran-alfaries-pryma-a4ba7b3b6)
• **GitHub**: [github.com/Ghilbranalf](https://github.com/Ghilbranalf)
• Ghilbran is currently open to **internships, freelance projects, and remote opportunities**!`;
    }
    return `Hello! **Ghilbran Alfaries Pryma** is a Software Developer and Computer Science undergraduate at **Telkom University Purwokerto** (GPA: 3.70 / 4.00, 6th semester).
He specializes in **React/Next.js Web Development**, **Mobile Apps (React Native)**, and applied **AI/NLP**.
What specific information would you like to know about his projects or experience?`;
  }

  // 2. SALAM & SAPAAN
  if (/^(halo|hai|hi|hello|hei|pagi|siang|sore|malam|assalamu|tes|test|ping)$/i.test(q) ||
      /^(halo|hai|pagi|siang|sore|malam|assalamu).*?(ai|bot|ghilbran|min)/i.test(q)) {
    return `Halo! Senang menyapa Anda. Saya asisten cerdas yang siap membantu menjawab pertanyaan seputar portofolio Ghilbran Alfaries.
Ada yang bisa saya bantu jelaskan?
• **Proyek Terbaru**: Seperti Web DPRD Kabupaten Purbalingga atau E-Commerce Bakso Pak Mul.
• **Tech Stack**: Penguasaan React, Next.js, React Native, Supabase, hingga AI/ML.
• **Latar Belakang**: Profil kuliah, IPK, dan pengalaman Ghilbran.
• **Kolaborasi**: Peluang proyek freelance, magang (internship), atau kontak langsung.`;
  }

  // 3. APRESIASI & UCAPAN TERIMA KASIH
  if (/\b(makasih|terima kasih|thanks|thank you|tengkyu|keren|mantap|hebat|sip|bagus|top|jos)\b/i.test(q)) {
    return `Sama-sama! Senang bisa memberikan informasi yang bermanfaat untuk Anda.
Jika Anda tertarik untuk berkolaborasi, mendiskusikan ide proyek, atau membutuhkan pengembang web/mobile, jangan ragu untuk menghubungi Ghilbran melalui [Contact Section](#contact) ya!`;
  }

  // 4. IDENTITAS BOT & KAPABILITAS
  if (/\b(kamu siapa|siapa kamu|kamu bot|kamu ai|bisa apa|fitur apa|fungsi kamu|kamu bisa apa)\b/i.test(q)) {
    return `Saya adalah **Portfolio AI Assistant** resmi milik Ghilbran Alfaries.
Tugas saya adalah membantu pengunjung (recruiter, klien, atau sesama developer) untuk:
• Memberikan penjelasan mendalam mengenai proyek-proyek yang pernah dibangun Ghilbran.
• Menerangkan kecakapan teknis (Frontend, Backend, Mobile, dan AI/Machine Learning).
• Menyajikan data akademik (IPK 3.70, Telkom University Purwokerto) dan riwayat magang.
• Menghubungkan Anda ke saluran kontak Ghilbran untuk kebutuhan kerja sama atau freelance.`;
  }

  // 5. PROYEK SPESIFIK: DPRD KABUPATEN PURBALINGGA
  if (/\b(dprd|purbalingga|dewan perwakilan|pemerintahan|dprd purbalingga|jdih)\b/i.test(q)) {
    return `**Web DPRD Kabupaten Purbalingga** adalah portal web institusional resmi Dewan Perwakilan Rakyat Daerah Kabupaten Purbalingga:
• **Tujuan & Fungsi**: Memperkuat transparansi publik terhadap kegiatan legislatif daerah, publikasi agenda rapat paripurna dewan, struktur fraksi & komisi, database regulasi daerah (JDIH), serta saluran e-aspirasi interaktif masyarakat.
• **Tech Stack**: React, Tailwind CSS, PHP / Laravel, dan MySQL.
• **Karakter Desain**: Tampilan antarmuka berstandar pemerintahan modern yang responsif, aman, dan mudah diakses dari perangkat desktop maupun smartphone.
• **Tautan**: Kunjungi [Website DPRD Purbalingga](https://dprd.purbalinggakab.go.id) atau cek kartu proyeknya di [Featured Projects](#projects).`;
  }

  // 6. PROYEK SPESIFIK: BAKSO PAK MUL
  if (/\b(bakso|pak mul|mie ayam|e-commerce|ecommerce|toko online|midtrans|ipaymu|ongkir)\b/i.test(q)) {
    return `**E-Commerce Bakso Pak Mul** adalah platform belanja online grosir & eceran untuk penyedia bahan baku bakso & mie ayam:
• **Fitur Unggulan**: Katalog produk terstruktur, pemesanan kilat, sistem kemitraan grosir, integrasi payment gateway otomatis (Midtrans/iPaymu), hitung tarif ongkir instan, serta chatbot AI customer support.
• **Tech Stack**: Next.js (App Router), React, Supabase, Tailwind CSS, dan MySQL.
• **Tautan Kode**: Anda dapat melihat repositorinya di [GitHub Ghilbran](https://github.com/Ghilbranalf).`;
  }

  // 7. PROYEK SPESIFIK: GRADIA MOBILE APP
  if (/\b(gradia|mobile app|aplikasi mobile|akademik|presensi|jadwal kuliah)\b/i.test(q)) {
    return `**GRADIA Mobile App** adalah aplikasi manajemen kegiatan akademik kampus yang dioptimasi khusus untuk layar smartphone:
• **Fitur Utama**: Presensi digital interaktif, penjadwalan mata kuliah real-time, task management dengan deadline tracker, serta kalender kegiatan terpadu.
• **Tech Stack**: React, Tailwind CSS, PWA (Progressive Web App), dan dideploy di Vercel.
• **Live Demo**: Coba aplikasinya secara langsung di [GRADIA Live App](https://gradia-three.vercel.app).`;
  }

  // 8. PROYEK SPESIFIK: IBRAVIA RESIDENCE
  if (/\b(ibravia|perumahan ibravia|dashboard ibravia|residence)\b/i.test(q)) {
    return `**Ibravia Residence** adalah platform company profile dan sistem manajemen internal perumahan real estate:
• **Fitur Utama**: Katalog unit hunian lengkap dengan spesifikasi arsitektur, visualisasi data grafik penjualan, pencatatan prospek pembeli, dan role-based access control (RBAC).
• **Tech Stack**: WordPress, React, PHP, Java, MySQL, dan Bootstrap.
• **Tautan**: Akses websitenya di [Ibravia Residence](https://ibravia.com).`;
  }

  // 9. PROYEK SPESIFIK: GEEFI RESIDENCE
  if (/\b(geefi|pt abyakta|simulasi kpr|leads properti)\b/i.test(q)) {
    return `**Geefi Residence** adalah website promosi perumahan modern untuk PT Abyakta Ageng Propertindo:
• **Fitur Utama**: Galeri tipe rumah interaktif, kalkulator simulasi cicilan KPR, optimasi konversi leads pelanggan, dan chatbot otomatis terhubung n8n.
• **Tech Stack**: React, Tailwind CSS, dan Vercel.
• **Live Demo**: Akses langsung di [Geefi Residence Live](https://geefi-residence.vercel.app).`;
  }

  // 10. PROYEK SPESIFIK: SANGGALURI
  if (/\b(sanggaluri|sanggalurism|portal internal|manajemen media sosial)\b/i.test(q)) {
    return `**Sanggaluri Portal (SanggaluriSM)** adalah portal internal aman dan sistem manajemen operasional tim media sosial Sanggaluri:
• **Fitur Utama**: Sistem login terenkripsi, manajemen penjadwalan konten promosi, serta dashboard monitoring aktivitas tim (dikerjakan kolaboratif bersama tim: Natasya, Rendi, dan Egi).
• **Tech Stack**: React, Tailwind CSS, dan Vercel.
• **Live Demo**: Buka sistemnya di [Sanggaluri Portal](https://dashboard-smms.vercel.app).`;
  }

  // 11. RISET AI / ML / NLP (INDOBERT & HONEYPOT)
  if (/\b(indobert|bert|nlp|sentiment|sentimen|j&t|honeypot|cuip|random forest|smote|hugging face|machine learning|ai)\b/i.test(q)) {
    return `Ghilbran aktif meneliti dan mengimplementasikan model **Artificial Intelligence & Machine Learning**:
• **Fine-tuning IndoBERT**: Model Transformer bahasa Indonesia yang dilatih untuk klasifikasi sentimen ulasan pengiriman logistik J&T menggunakan Hugging Face Trainer API & PyTorch.
• **Klasifikasi Honeypot CUIP-X25**: Pendeteksian pola serangan pada dataset honeypot menggunakan Random Forest dengan penyeimbangan data teknik SMOTE.
• **Perangkat & Lib**: Python, PyTorch, Hugging Face Transformers, scikit-learn, Pandas, dan NumPy.`;
  }

  // 12. PERTANYAAN TENTANG SEMUA PROYEK (ALL PROJECTS)
  if (/\b(proyek|project|portofolio|portfolio|karya|hasil kerja|bikin apa|buat apa)\b/i.test(q)) {
    return `Berikut adalah **6 Featured Projects** yang pernah dibangun oleh Ghilbran Alfaries:
1. **Web DPRD Kabupaten Purbalingga**: Portal web resmi transparansi kegiatan dewan & kanal e-aspirasi publik.
2. **E-Commerce Bakso Pak Mul**: Toko online bahan baku bakso (Next.js, Supabase, Midtrans, AI chatbot).
3. **GRADIA Mobile App**: Aplikasi mobile manajemen akademik & presensi (React, PWA).
4. **Ibravia Residence**: Company profile properti & admin sales dashboard (WordPress, React, MySQL).
5. **Geefi Residence**: Website perumahan interaktif dengan kalkulator simulasi KPR (React, Tailwind).
6. **Sanggaluri Portal**: Sistem internal portal & manajemen media sosial terenkripsi (React).
Lihat kartu proyek lengkapnya di bagian [Featured Projects](#projects)!`;
  }

  // 13. SPESIFIKASI SKILL: FRONTEND / REACT / NEXT.JS
  if (/\b(react|next|next\.js|nextjs|frontend|front-end|tailwind|typescript|javascript|css|html)\b/i.test(q)) {
    return `Di bidang **Frontend Web Development**, React & Next.js merupakan keahlian utama Ghilbran:
• **Core Frameworks**: React.js, Next.js (App Router), TypeScript, dan JavaScript modern (ES6+).
• **UI & Styling**: Tailwind CSS, CSS modern, optimasi rendering performa (60 FPS), dan desain responsif di semua ukuran layar.
• **Arsitektur**: Custom React Hooks, state management, integrasi REST API, dan PWA (Progressive Web Apps).
• **Portofolio Nyata**: Diterapkan langsung pada **Web DPRD Purbalingga**, **GRADIA**, **Bakso Pak Mul**, dan portofolio interaktif ini.`;
  }

  // 14. SPESIFIKASI SKILL: BACKEND & DATABASE
  if (/\b(backend|back-end|database|basis data|sql|mysql|postgres|postgresql|supabase|express|node|nodejs|php|laravel|rest api|api)\b/i.test(q)) {
    return `Di bidang **Backend & Database Architecture**, keahlian Ghilbran mencakup:
• **Server & Runtime**: Express.js (Node.js), PHP / Laravel, dan perancangan RESTful API aman.
• **BaaS & Cloud**: Supabase (Autentikasi JWT, Database Realtime, Storage bucket) dan integrasi Firebase.
• **Database**: MySQL dan PostgreSQL dengan perancangan skema relasional, optimasi query, dan proteksi role-based access.
• **API Testing**: Pengujian endpoint menyeluruh menggunakan Postman.`;
  }

  // 15. SPESIFIKASI SKILL: MOBILE APP
  if (/\b(mobile|android|ios|react native|smartphone|aplikasi hp|expo|pwa)\b/i.test(q)) {
    return `Untuk pengembangan **Mobile Apps**, Ghilbran memiliki pengalaman dalam:
• **React Native & Expo**: Membangun aplikasi mobile lintas platform (Android & iOS) dengan performa andal dan antarmuka ramah pengguna.
• **Progressive Web Apps (PWA)**: Mengembangkan aplikasi web yang dapat di-install langsung di layar beranda smartphone dengan sensasi UX native.
• Contoh nyata yang telah dibangun adalah aplikasi **GRADIA Mobile App**.`;
  }

  // 16. TECH STACK LENGKAP
  if (/\b(skill|skills|keahlian|kemampuan|tech stack|teknologi|bahasa pemrograman|stack)\b/i.test(q)) {
    return `Ringkasan **Tech Stack & Keahlian Teknis** Ghilbran Alfaries:
• **Frontend**: React.js, Next.js (App Router), TypeScript, Tailwind CSS, PWA
• **Backend**: Express.js, Supabase, PHP / Laravel, RESTful API
• **Database**: PostgreSQL, MySQL
• **AI & Machine Learning**: Python, IndoBERT (Hugging Face), Random Forest, scikit-learn, SMOTE
• **Mobile**: React Native, Progressive Web Apps
• **Tools**: Git, GitHub, Postman, Vercel, WordPress
Kunjungi bagian [Skills](#skills) untuk melihat bagan visual interaktifnya!`;
  }

  // 17. LAYANAN & JASA PEMBUATAN SOFTWARE
  if (/\b(bisa buat|bisa bikin|bikinin|jasa|layanan|service|services|bantu tugas|joki|buat web|bikin website|bikin aplikasi)\b/i.test(q)) {
    return `Ghilbran melayani pengembangan software secara profesional dan terukur:
• **Website Development**: Pembuatan Company Profile institusi/bisnis, Portal Berita/Organisasi, E-Commerce, Landing Page konversi tinggi, dan Admin Dashboard.
• **Mobile App Development**: Pembuatan aplikasi smartphone menggunakan React Native atau Progressive Web App (PWA).
• **Integrasi AI & Automasi**: Integrasi AI chatbot cerdas, sistem pemrosesan teks (NLP), dan alur kerja terotomasi.
• **Optimasi Performa**: Mengoptimasi website yang lambat agar cepat, responsif, dan SEO-friendly.
Tertarik mendiskusikan kebutuhan Anda? Mari terhubung melalui form di [Contact Section](#contact)!`;
  }

  // 18. KETERSEDIAAN MAGANG / FREELANCE / KERJA SAMA
  if (/\b(magang|intern|internship|freelance|kerja sama|hire|lowongan|rekrut|part-time|part time|remote|open to work|bisa kerja)\b/i.test(q)) {
    return `Ghilbran saat ini masih aktif kuliah di semester 6 (IPK 3.70) di Telkom University Purwokerto, dan **sangat terbuka untuk**:
• Peluang **Magang / Internship** (bidang Frontend Developer, Fullstack Developer, atau AI/Data Science).
• Proyek **Freelance** (pembuatan website, aplikasi mobile, atau sistem manajemen).
• Pekerjaan **Remote / Kolaborasi Tim**.
Silakan kirimkan tawaran atau jadwalkan diskusi melalui email **ghilbranroyale@gmail.com** atau langsung kirim pesan lewat [Contact Section](#contact).`;
  }

  // 19. PENDIDIKAN, KAMPUS & IPK
  if (/\b(kuliah|kampus|universitas|telkom|semester|ipk|gpa|nim|jurusan|prodi|pendidikan|kuliah di mana)\b/i.test(q)) {
    return `Data Akademik & Pendidikan Ghilbran Alfaries:
• **Kampus**: Telkom University Purwokerto
• **Program Studi**: S1 Teknik Informatika (Fakultas Informatika)
• **Angkatan & Semester**: Angkatan 2023 (saat ini semester 6 aktif)
• **Indeks Prestasi Kumulatif (IPK)**: **3.70 / 4.00**
• **Student ID / NIM**: 2311102267
• **Fokus Akademik**: Machine Learning, Natural Language Processing, serta Web & Mobile Application Development.`;
  }

  // 20. BIODATA, LOKASI & PROFIL
  if (/\b(biodata|profil|tentang ghilbran|siapa ghilbran|orangnya|asal|tinggal|domisili|umur|hobi)\b/i.test(q)) {
    return `**Ghilbran Alfaries Pryma** adalah seorang Software Developer & Mahasiswa Informatika:
• **Domisili**: Berasal dari **Bumiayu, Brebes** dan beraktivitas kuliah di **Purwokerto, Jawa Tengah**.
• **Etos Kerja**: Detail-oriented, tekun, dan memiliki pemahaman sistem yang komprehensif (dari perancangan database backend hingga UI animasi interaktif).
• **Visi**: Mengembangkan aplikasi praktis yang menggabungkan kemudahan teknologi web modern dengan kecerdasan buatan (AI) untuk memecahkan masalah nyata.`;
  }

  // 21. INFORMASI KONTAK & MEDIA SOSIAL
  if (/\b(kontak|hubungi|email|nomor|no wa|whatsapp|linkedin|instagram|sosmed|github|reach out)\b/i.test(q)) {
    return `Anda dapat terhubung langsung dengan Ghilbran melalui kontak berikut:
• **Email**: [ghilbranroyale@gmail.com](mailto:ghilbranroyale@gmail.com)
• **LinkedIn**: [Profil LinkedIn Ghilbran](https://www.linkedin.com/in/ghilbran-alfaries-pryma-a4ba7b3b6)
• **GitHub**: [github.com/Ghilbranalf](https://github.com/Ghilbranalf)
• **Instagram**: [@ghilbrann](https://www.instagram.com/ghilbrann)
• Anda juga bisa mengirim pesan langsung melalui [Form Kontak Portofolio](#contact).`;
  }

  // 22. DYNAMIC CONTEXTUAL FALLBACK
  // Menangkap kata kunci penting dari pertanyaan user dan menjawab secara spesifik & solutif
  const words = raw.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);
  const keywordPreview = words.slice(0, 3).join(' ');

  return `Terkait pertanyaan Anda mengenai **"${keywordPreview || raw}"**:
Ghilbran Alfaries adalah Web & Mobile Developer sekaligus mahasiswa Informatika Telkom University Purwokerto (IPK 3.70).

Informasi relevan yang dapat Anda ketahui:
• **6 Proyek Unggulan**: Web DPRD Kabupaten Purbalingga, Bakso Pak Mul E-Commerce, GRADIA Mobile App, Ibravia Residence, Geefi Residence, dan Sanggaluri Portal.
• **Keahlian Teknis**: React, Next.js (App Router), TypeScript, React Native, Tailwind CSS, Supabase, dan riset AI/NLP (IndoBERT).
• **Ketersediaan Kerja**: Terbuka untuk magang (internship), proyek freelance web/mobile, dan kerja remote.

Ingin informasi lebih mendalam mengenai salah satu poin di atas? Silakan tanyakan langsung atau klik salah satu tombol saran di bawah!`;
}

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
          text: 'Maaf, saya adalah asisten AI khusus portofolio Ghilbran Alfaries. Saya hanya menjawab pertanyaan seputar keahlian coding, proyek yang dibangun, latar belakang akademik, dan peluang kerja sama. Ada yang ingin Anda ketahui seputar hal tersebut?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 400);
      return;
    }

    // Cek apakah ada Groq API Key
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

ATURAN PENTING:
1. Jawab LANGSUNG, SPESIFIK, dan cerdas berdasarkan data di atas. Jangan mengarang informasi fiktif.
2. Gunakan format Markdown yang rapi: gunakan list poin (bullet points '•') jika menyebutkan beberapa skill/project agar mudah dibaca.
3. Berikan jawaban yang natural, komunikatif, profesional, dan to-the-point.
4. Jangan memberikan jawaban template berulang jika pengguna bertanya topik spesifik.
5. SANGAT PENTING: DILARANG MENGGUNAKAN EMOJI DALAM BENTUK APAPUN. Tuliskan jawaban profesional murni.
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
            temperature: 0.6,
            max_tokens: 450
          })
        });

        if (response.ok) {
          const data = await response.json();
          const rawReplyText = data?.choices?.[0]?.message?.content;
          if (rawReplyText) {
            const cleanReplyText = rawReplyText.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}]/gu, '').trim();
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now() + 1,
                sender: 'bot',
                text: cleanReplyText,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
            setIsTyping(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Groq API error, beralih ke Smart Engine lokal:', err);
      }
    }

    // Menggunakan Intelligent Engine Lokal yang Cepat & Akurat
    setTimeout(() => {
      const smartReply = getSmartReply(query);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: smartReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  const renderInlineText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="chatbot-strong">{part.slice(2, -2)}</strong>;
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
            className="chatbot-link-pill"
            onClick={() => {
              if (!isExternal) setIsOpen(false);
            }}
          >
            {label}
            <i className={isExternal ? "fas fa-external-link-alt" : "fas fa-chevron-right"} style={{ fontSize: '0.65rem', marginLeft: '4px' }}></i>
          </a>
        );
      }
      return part;
    });
  };

  const renderFormattedMessage = (content) => {
    if (!content) return null;
    const lines = content.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
    
    const blocks = [];
    let currentList = null;

    lines.forEach((line) => {
      const isBullet = line.startsWith('•') || line.startsWith('- ') || line.startsWith('* ');
      const isNumbered = /^\d+\.\s/.test(line);

      if (isBullet || isNumbered) {
        const cleanText = line.replace(/^(•|-|\*|\d+\.)\s*/, '');
        if (!currentList || currentList.type !== (isNumbered ? 'ol' : 'ul')) {
          currentList = { type: isNumbered ? 'ol' : 'ul', items: [] };
          blocks.push(currentList);
        }
        currentList.items.push(cleanText);
      } else {
        currentList = null;
        blocks.push({ type: 'p', text: line });
      }
    });

    return (
      <div className="chatbot-formatted-body">
        {blocks.map((block, idx) => {
          if (block.type === 'p') {
            return (
              <p key={idx} className="chatbot-paragraph">
                {renderInlineText(block.text)}
              </p>
            );
          }
          if (block.type === 'ul' || block.type === 'ol') {
            const Tag = block.type;
            return (
              <Tag key={idx} className={`chatbot-list ${block.type}-list`}>
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="chatbot-list-item">
                    {block.type === 'ul' && <span className="chatbot-bullet-dot"></span>}
                    <div className="chatbot-list-content">{renderInlineText(item)}</div>
                  </li>
                ))}
              </Tag>
            );
          }
          return null;
        })}
      </div>
    );
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
                  <span className="chatbot-status-dot"></span> Active Assistant
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
                    {renderFormattedMessage(msg.text)}
                  </div>
                  <div className="chatbot-msg-footer">
                    <span className="chatbot-msg-time">{msg.time}</span>
                  </div>
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
              placeholder="Tanyakan proyek, skill, kontak Ghilbran..."
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
