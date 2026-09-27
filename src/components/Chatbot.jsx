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
 * Intelligent Rule-Based Response Engine (Human-Like & Context-Rich)
 * Menjelaskan esensi dan inti setiap proyek secara natural, mengalir, dan layaknya asisten manusia.
 */
function getSmartReply(userQuery) {
  const raw = userQuery.trim();
  const q = raw.toLowerCase();

  // 1. CEK BAHASA INGGRIS
  const isEnglish = /\b(who are you|tell me about|what are your|skills|projects|show me|how to contact|can you build|hire you|resume|cv)\b/i.test(q);
  if (isEnglish) {
    if (/\b(dprd|purbalingga)\b/i.test(q)) {
      return `**Web DPRD Kabupaten Purbalingga** is the official institutional web portal for the regional parliament of Purbalingga Regency.
**What is its core purpose?**
• It serves as a public transparency hub where citizens can openly monitor legislative schedules, assembly sessions, commission agendas, and download legal decrees (JDIH).
• It also features an interactive **e-aspirasi** portal, allowing residents to submit official complaints or proposals directly online.
• Built with **React and Tailwind CSS** for a fast, mobile-friendly interface, backed by **PHP / Laravel and MySQL** for high security and reliability.
Check it out at the [Official DPRD Purbalingga Portal](https://dprd.purbalinggakab.go.id)!`;
    }
    if (/\b(gradia)\b/i.test(q)) {
      return `**GRADIA** is a mobile academic companion web app (PWA) crafted specifically to solve common student hassles: overlapping lecture schedules, missed attendance, and forgotten assignment deadlines.
**What does it do?**
• **Schedule & Attendance**: Organizes weekly class timetables, lecture rooms, and tracks semester attendance so students don't breach minimum limits.
• **Task & Deadline Tracker**: An intuitive to-do list that highlights assignments by upcoming urgency.
• Built with **React and Tailwind CSS** as an installable Progressive Web App (PWA) that feels just like a native mobile app without draining phone storage.
Try the [Live Demo of GRADIA](https://gradia-three.vercel.app)!`;
    }
    if (/\b(skill|stack|technolog)\b/i.test(q)) {
      return `Here is a clear snapshot of Ghilbran's tech stack:
• **Frontend**: React.js, Next.js (App Router), TypeScript, Tailwind CSS, PWA
• **Backend**: Express.js, Supabase, PHP / Laravel, RESTful APIs
• **Database**: MySQL, PostgreSQL
• **AI / Machine Learning**: Python, IndoBERT fine-tuning, Hugging Face, Random Forest, scikit-learn
• **Mobile**: React Native, Progressive Web Apps
Feel free to check out the [Skills Section](#skills) for more details!`;
    }
    if (/\b(project|portfolio|work|built)\b/i.test(q)) {
      return `Ghilbran has engineered 6 key real-world projects:
1. **Web DPRD Kabupaten Purbalingga**: Regional parliament portal for public transparency & e-aspirasi services.
2. **Bakso Pak Mul E-Commerce**: Online B2B/B2C raw food ingredient platform with automated payments & AI support.
3. **GRADIA Mobile App**: Academic schedule, attendance, and task organizer for university students.
4. **Ibravia Residence**: Real estate showcase website coupled with an internal sales analytics dashboard.
5. **Geefi Residence**: Modern property marketing platform featuring real-time KPR mortgage calculation.
6. **Sanggaluri Portal**: Secure operational portal and social media scheduling workflow for internal teams.
Explore them all in the [Featured Projects](#projects) section or on [GitHub](https://github.com/Ghilbranalf)!`;
    }
    if (/\b(contact|email|hire|freelance|reach)\b/i.test(q)) {
      return `You can connect directly with Ghilbran:
• **Email**: [ghilbranroyale@gmail.com](mailto:ghilbranroyale@gmail.com)
• **LinkedIn**: [Ghilbran's LinkedIn](https://www.linkedin.com/in/ghilbran-alfaries-pryma-a4ba7b3b6)
• **GitHub**: [github.com/Ghilbranalf](https://github.com/Ghilbranalf)
• Ghilbran is currently a 6th-semester CS undergrad (GPA 3.70) actively open to **internships, freelance web/mobile projects, and remote collaborations**!`;
    }
    return `Hello! **Ghilbran Alfaries Pryma** is a Software Developer and Computer Science undergraduate at **Telkom University Purwokerto** (GPA: 3.70 / 4.00, 6th semester).
He specializes in **React/Next.js Web Development**, **Mobile Apps (React Native)**, and applied **AI/NLP**.
What specific project or skill would you like to know more about?`;
  }

  // 2. SALAM & SAPAAN HANGAT
  if (/^(halo|hai|hi|hello|hei|pagi|siang|sore|malam|assalamu|tes|test|ping)$/i.test(q) ||
      /^(halo|hai|pagi|siang|sore|malam|assalamu).*?(ai|bot|ghilbran|min)/i.test(q)) {
    return `Halo! Salam kenal. Saya asisten AI portofolio yang siap nemenin Anda menjelajahi karya-karya Ghilbran Alfaries.
Ada yang bikin Anda penasaran?
• **Mau tahu inti proyek tertentu?** Misalnya *"Web DPRD Purbalingga itu web apa?"*, *"GRADIA buat apa sih?"*, atau *"Gimana sistem E-Commerce Bakso Pak Mul?"*.
• **Penasaran keahlian teknis?** Bisa tanyakan seputar React, Next.js, React Native, Supabase, atau riset AI/NLP.
• **Mau ajak kerja sama?** Bisa cek ketersediaan magang (internship) atau proyek freelance Ghilbran.`;
  }

  // 3. APRESIASI & UCAPAN TERIMA KASIH
  if (/\b(makasih|terima kasih|thanks|thank you|tengkyu|keren|mantap|hebat|sip|bagus|top|jos|rapi)\b/i.test(q)) {
    return `Sama-sama! Senang banget bisa bantu ngejelasin karya-karya Ghilbran.
Kalo Anda punya ide proyek yang mau diwujudkan atau tertarik mengajak Ghilbran berkolaborasi, silakan langsung hubungi lewat [Contact Section](#contact) ya!`;
  }

  // 4. IDENTITAS BOT & KAPABILITAS
  if (/\b(kamu siapa|siapa kamu|kamu bot|kamu ai|bisa apa|fitur apa|fungsi kamu|kamu bisa apa|ngapain aja)\b/i.test(q)) {
    return `Saya adalah **AI Assistant portofolio resmi** milik Ghilbran Alfaries.
Saya di sini bukan cuma buat jawab template kaku, tapi siap menceritakan secara mendalam:
• **Inti dan latar belakang setiap proyek**: Mulai dari Web DPRD Purbalingga, GRADIA, Bakso Pak Mul, sampai riset AI IndoBERT.
• **Kemampuan teknis**: Kenapa Ghilbran memilih stack tertentu (seperti React, Next.js, atau Supabase) dan bagaimana cara kerjanya.
• **Profil & Akademik**: Riwayat kuliah di Telkom University Purwokerto (IPK 3.70) dan domisili.
• **Informasi Kontak & Hiring**: Buat Anda yang butuh jasa pembuatan web, aplikasi mobile, atau mencari talenta magang.`;
  }

  // 5. PROYEK SPESIFIK: DPRD KABUPATEN PURBALINGGA
  if (/\b(dprd|purbalingga|dewan perwakilan|pemerintahan|dprd purbalingga|jdih)\b/i.test(q)) {
    return `Jadi intinya, **Web DPRD Kabupaten Purbalingga** adalah portal web resmi lembaga legislatif daerah (DPRD Purbalingga) yang dibangun sebagai jembatan keterbukaan informasi publik antara wakil rakyat dan masyarakat luas.

**Apa saja fungsi utamanya?**
• **Transparansi Kinerja Dewan**: Warga bisa memantau jadwal rapat paripurna, susunan fraksi & komisi dewan, hingga keputusan-keputusan penting daerah secara terbuka dan akuntabel.
• **Kanal E-Aspirasi Publik**: Masyarakat tidak perlu repot datang ke gedung dewan untuk menyampaikan aspirasi atau aduan; mereka bisa mengirimkannya langsung secara online lewat sistem ini.
• **Integrasi Regulasi JDIH**: Menjadi pusat arsip digital resmi untuk Peraturan Daerah (Perda) dan produk hukum lainnya yang bisa diunduh langsung oleh masyarakat.
• **Arsitektur Teknis**: Ditenagai oleh **React & Tailwind CSS** di sisi frontend agar tampilannya modern, cepat, dan responsif di smartphone maupun komputer, serta backend berbasis **PHP / Laravel & MySQL** untuk keamanan data instansi pemerintahan.

Anda bisa mengunjungi langsung portalnya di [Website Resmi DPRD Purbalingga](https://dprd.purbalinggakab.go.id) atau cek preview-nya di [Featured Projects](#projects)!`;
  }

  // 6. PROYEK SPESIFIK: GRADIA MOBILE APP
  if (/\b(gradia|aplikasi gradia|jadwal|akademik|presensi|jadwal kuliah|tugas)\b/i.test(q)) {
    return `Nah, intinya **GRADIA Mobile App** itu aplikasi web mobile (PWA) yang dibuat Ghilbran khusus untuk memecahkan masalah klasik mahasiswa: jadwal kuliah yang sering bentrok, lupa presensi, atau deadline tugas kuliah yang terlewat.

**Apa saja yang bisa dilakukan di GRADIA?**
• **Pencatatan & Manajemen Jadwal**: Menata jam mata kuliah, ruang kelas, dan dosen pengampu secara rapi dan otomatis.
• **Presensi Kehadiran Digital**: Memudahkan mahasiswa memantau rekam jejak kehadiran per mata kuliah agar tidak terkena batas minimal absen perkuliahan.
• **Pelacak Tugas & Deadline**: Sistem to-do list akademik yang memprioritaskan tugas mana yang tenggat waktunya paling mendesak.
• **Kalender Akademik Interaktif**: Tampilan kalender intuitif yang langsung menampilkan agenda perkuliahan hari ini dan minggu depan.
• **Teknologi**: Dibangun menggunakan **React & Tailwind CSS** dengan standar **Progressive Web App (PWA)** sehingga bisa di-*install* langsung ke layar smartphone layaknya aplikasi native tanpa memakan memori HP.

Anda bisa langsung coba demonya di smartphone Anda lewat [Live Demo GRADIA](https://gradia-three.vercel.app)!`;
  }

  // 7. PROYEK SPESIFIK: BAKSO PAK MUL
  if (/\b(bakso|pak mul|mie ayam|e-commerce|ecommerce|toko online|midtrans|ipaymu|ongkir)\b/i.test(q)) {
    return `Kalo **E-Commerce Bakso Pak Mul**, intinya adalah platform toko online B2B dan B2C yang mendigitalisasi rantai pasok pedagang bakso dan mie ayam.

**Apa masalah yang diselesaikan?**
• Sebelumnya, pedagang bakso harus belanja bahan baku (daging sapi giling, bumbu racikan, mie basah) secara manual setiap subuh. Platform ini memungkinkan mitra pedagang dan UMKM memesan stok bahan baku kapan saja langsung dari HP mereka.
• **Fitur Transaksi Lengkap**: Terintegrasi payment gateway instan (**Midtrans & iPaymu**), kalkulator ongkir otomatis berdasarkan lokasi pengiriman, sistem pemesanan grosir dengan harga khusus mitra, serta asisten AI customer service untuk tanya jawab pesanan.
• **Teknologi**: Menggunakan **Next.js (App Router)** dan **React** untuk performa SEO dan SSR yang kencang, database **Supabase & MySQL**, serta styling modern dengan **Tailwind CSS**.

Kodenya juga bisa Anda lihat langsung di [GitHub Ghilbran](https://github.com/Ghilbranalf)!`;
  }

  // 8. PROYEK SPESIFIK: GEEFI RESIDENCE
  if (/\b(geefi|pt abyakta|simulasi kpr|leads properti|perumahan geefi)\b/i.test(q)) {
    return `Inti dari proyek **Geefi Residence** adalah website pemasaran perumahan modern untuk developer **PT Abyakta Ageng Propertindo**, yang dirancang untuk memaksimalkan konversi calon pembeli rumah menjadi *leads* yang siap survei ke lokasi.

**Fitur unggulannya:**
• **Showcase Unit Interaktif**: Menampilkan visualisasi tipe rumah, denah ruangan, spesifikasi bangunan, dan fasilitas kawasan perumahan secara estetik.
• **Kalkulator Simulasi KPR**: Pengunjung bisa langsung menghitung perkiraan uang muka (DP), jangka waktu tenor, dan cicilan bulanan yang pas dengan kantong mereka sebelum membeli.
• **Otomasi Chatbot n8n**: Terhubung ke sistem otomatisasi n8n untuk menangani pertanyaan calon pembeli dan otomatis meneruskan data kontak peminat ke tim marketing via WhatsApp.
• **Teknologi**: Dibangun menggunakan **React & Tailwind CSS**, dideploy di Vercel dengan performa loading super cepat.

Bisa dicoba langsung di [Live Site Geefi Residence](https://geefi-residence.vercel.app)!`;
  }

  // 9. PROYEK SPESIFIK: IBRAVIA RESIDENCE
  if (/\b(ibravia|perumahan ibravia|dashboard ibravia|residence)\b/i.test(q)) {
    return `Intinya, **Ibravia Residence** adalah sistem ganda untuk kawasan perumahan real estate: di bagian depan berupa *company profile* elegan untuk calon pembeli, dan di bagian belakang berupa *admin dashboard* komprehensif untuk tim manajemen perumahan.

**Fungsi utamanya:**
• **Katalog & Pencarian Properti**: Memudahkan calon penghuni menelusuri ketersediaan blok dan kavling rumah yang masih *available*.
• **Admin Sales Dashboard**: Tim sales dan manajemen bisa melihat visualisasi grafik performa penjualan, mencatat data prospek pembeli, serta membagi hak akses staf dengan sistem *Role-Based Access Control* (RBAC).
• **Teknologi**: Memadukan CMS **WordPress**, komponen interaktif **React**, backend **PHP & Java**, database **MySQL**, dan **Bootstrap**.

Detail websitenya dapat diakses di [Ibravia Residence](https://ibravia.com)!`;
  }

  // 10. PROYEK SPESIFIK: SANGGALURI
  if (/\b(sanggaluri|sanggalurism|portal internal|manajemen media sosial)\b/i.test(q)) {
    return `Untuk **Sanggaluri Portal (SanggaluriSM)**, intinya adalah sistem internal portal manajemen terenkripsi untuk tim operasional Sanggaluri dalam mengelola konten promosi dan operasional internal.

**Peran & Fungsinya:**
• Sistem ini menyelesaikan kendala koordinasi promosi: tim bisa menjadwalkan postingan media sosial, mengarsipkan aset desain (seperti roll-up banner dan poster), dan memantau status publikasi di satu dasbor terpusat.
• Proyek ini dikerjakan secara kolaboratif bersama rekan tim (Natasya, Rendi, dan Egi), di mana Ghilbran memegang peranan penting di perancangan antarmuka dan integrasi logika sistem.
• **Teknologi**: Dikembangkan menggunakan **React**, **Tailwind CSS**, dan di-host di Vercel.

Demonya bisa dicek di [Dashboard Sanggaluri](https://dashboard-smms.vercel.app)!`;
  }

  // 11. RISET AI / ML / NLP (INDOBERT & HONEYPOT)
  if (/\b(indobert|bert|nlp|sentiment|sentimen|j&t|honeypot|cuip|random forest|smote|hugging face|machine learning|ai)\b/i.test(q)) {
    return `Di bidang Artificial Intelligence & Machine Learning, intinya Ghilbran tidak hanya bikin tampilan web, tapi juga punya pemahaman mendalam tentang **Natural Language Processing (NLP)** dan **Keamanan Siber**:

• **Fine-tuning IndoBERT**: Ghilbran melatih ulang model Transformer bahasa Indonesia (IndoBERT) menggunakan Hugging Face Trainer API & PyTorch agar komputer bisa membaca ribuan ulasan pelanggan ekspedisi J&T dan otomatis memilah mana ulasan yang positif, netral, atau komplain/negatif.
• **Deteksi Serangan Honeypot**: Melatih model **Random Forest** untuk mendeteksi anomali serangan siber pada dataset *honeypot* (CUIP-X25), lengkap dengan teknik **SMOTE** untuk mengatasi data serangan yang tidak seimbang (*imbalanced dataset*).
• **Perangkat & Lib**: Python, PyTorch, Hugging Face Transformers, scikit-learn, Pandas, dan NumPy.`;
  }

  // 12. PERTANYAAN TENTANG SEMUA PROYEK (ALL PROJECTS)
  if (/\b(proyek|project|portofolio|portfolio|karya|hasil kerja|bikin apa|buat apa|udah bikin apa|pernah buat apa)\b/i.test(q)) {
    return `Kalo dirangkum, Ghilbran punya **6 proyek unggulan** yang memecahkan masalah nyata di berbagai sektor:

1. **Web DPRD Kabupaten Purbalingga**: Portal resmi pemerintahan daerah untuk transparansi legislasi dan kanal e-aspirasi warga secara online.
2. **E-Commerce Bakso Pak Mul**: Toko online rantai pasok bahan baku bakso & mie ayam dengan pembayaran otomatis dan AI CS.
3. **GRADIA Mobile App**: Aplikasi web mobile untuk mahasiswa mengatur jadwal kuliah, presensi kehadiran, dan pelacak deadline tugas.
4. **Ibravia Residence**: Platform company profile perumahan yang dipadukan dengan admin dashboard monitoring penjualan rumah.
5. **Geefi Residence**: Website pemasaran properti interaktif dengan kalkulator simulasi cicilan KPR dan chatbot n8n.
6. **Sanggaluri Portal**: Sistem dashboard internal aman untuk koordinasi tim media sosial dan promosi.

Mau saya ceritakan lebih dalam tentang salah satu proyek di atas? Atau Anda bisa langsung jelajahi di bagian [Featured Projects](#projects)!`;
  }

  // 13. SPESIFIKASI SKILL: FRONTEND / REACT / NEXT.JS
  if (/\b(react|next|next\.js|nextjs|frontend|front-end|tailwind|typescript|javascript|css|html)\b/i.test(q)) {
    return `Bisa banget! Untuk urusan **Frontend**, React.js dan Next.js itu justru makanan sehari-hari Ghilbran.

Ghilbran terbiasa membangun web yang bukan cuma estetik, tapi juga kencang dan terstruktur rapi:
• **React & Next.js (App Router)**: Mahir mengelola state yang kompleks, custom hooks, Server-Side Rendering (SSR), hingga arsitektur komponen modular.
• **Tailwind CSS & Animasi**: Bikin tampilan modern yang responsif di segala ukuran layar tanpa bikin web jadi berat (seperti optimasi performa 60 FPS di portofolio ini).
• **PWA (Progressive Web Apps)**: Bisa bikin website yang bisa di-install langsung ke smartphone layaknya aplikasi native (seperti di proyek **GRADIA**).
• Mau bikin web portal, e-commerce, atau dashboard analitik? Ghilbran sudah berpengalaman menggarap semuanya!`;
  }

  // 14. SPESIFIKASI SKILL: BACKEND & DATABASE
  if (/\b(backend|back-end|database|basis data|sql|mysql|postgres|postgresql|supabase|express|node|nodejs|php|laravel|rest api|api)\b/i.test(q)) {
    return `Di sisi **Backend & Database Architecture**, Ghilbran terbiasa merancang sistem yang aman dan efisien:
• **Server & Framework**: Membangun RESTful API dengan **Express.js (Node.js)** maupun **PHP / Laravel** yang terstruktur.
• **BaaS & Cloud**: Sangat familier dengan **Supabase** (Autentikasi token JWT, Database Realtime, dan Storage bucket) seperti yang diterapkan di platform E-Commerce Bakso Pak Mul.
• **Database**: Perancangan skema relasional di **MySQL** dan **PostgreSQL**, optimasi query, indexing, dan proteksi role-based access.
• **Testing**: Pengujian endpoint API secara menyeluruh menggunakan Postman.`;
  }

  // 15. SPESIFIKASI SKILL: MOBILE APP
  if (/\b(mobile|android|ios|react native|smartphone|aplikasi hp|expo|pwa)\b/i.test(q)) {
    return `Untuk urusan **Mobile Development**, Ghilbran punya dua pendekatan fleksibel:
• **React Native & Expo**: Membangun aplikasi mobile lintas platform (Android & iOS) dengan performa tinggi dan tampilan antarmuka yang intuitif.
• **Progressive Web Apps (PWA)**: Solusi cerdas mengubah web app menjadi aplikasi yang bisa dipasang di smartphone tanpa perlu download dari PlayStore/AppStore, sangat hemat memori (seperti di proyek **GRADIA Mobile App**).
Kalo Anda butuh aplikasi untuk manajemen tim, pencatatan jadwal, atau katalog produk di HP, Ghilbran siap bantu bangun!`;
  }

  // 16. TECH STACK LENGKAP
  if (/\b(skill|skills|keahlian|kemampuan|tech stack|teknologi|bahasa pemrograman|stack)\b/i.test(q)) {
    return `Ringkasan **Tech Stack & Keahlian Utama** Ghilbran Alfaries:
• **Frontend**: React.js, Next.js (App Router), TypeScript, Tailwind CSS, PWA
• **Backend**: Express.js, Supabase, PHP / Laravel, RESTful API
• **Database**: PostgreSQL, MySQL
• **AI & Machine Learning**: Python, IndoBERT (Hugging Face), Random Forest, scikit-learn, SMOTE
• **Mobile**: React Native, Progressive Web Apps
• **Tools**: Git, GitHub, Postman, Vercel, WordPress
Kunjungi bagian [Skills](#skills) untuk melihat bagan visual keahlian lengkapnya!`;
  }

  // 17. LAYANAN & JASA PEMBUATAN SOFTWARE
  if (/\b(bisa buat|bisa bikin|bikinin|jasa|layanan|service|services|bantu tugas|joki|buat web|bikin website|bikin aplikasi)\b/i.test(q)) {
    return `Tentu bisa banget! Ghilbran membuka jasa pembuatan website dan aplikasi mobile untuk kebutuhan personal, UMKM, instansi, hingga perusahaan.

**Solusi yang bisa dibantu Ghilbran:**
• **Company Profile & Portal Resmi**: Seperti portal instansi atau profil bisnis yang elegan dan profesional (contohnya Web DPRD Purbalingga atau Ibravia).
• **E-Commerce & Toko Online**: Sistem katalog lengkap dengan checkout otomatis dan integrasi payment gateway (seperti Bakso Pak Mul).
• **Admin Dashboard & Sistem Manajemen**: Dashboard pemantau data, grafik penjualan, atau sistem internal tim.
• **Aplikasi Mobile (PWA & React Native)**: Aplikasi mobile praktis yang ringan dan mudah digunakan (seperti GRADIA).
• **Integrasi Chatbot & AI**: Memasang asisten virtual cerdas di website Anda.

Kalo Anda punya ide atau proyek yang mau dibuat, mari bicarakan langsung lewat form di [Contact Section](#contact) atau email ke **ghilbranroyale@gmail.com**!`;
  }

  // 18. KETERSEDIAAN MAGANG / FREELANCE / KERJA SAMA
  if (/\b(magang|intern|internship|freelance|kerja sama|hire|lowongan|rekrut|part-time|part time|remote|open to work|bisa kerja)\b/i.test(q)) {
    return `Kabar baiknya, saat ini Ghilbran **sangat terbuka untuk kesempatan Magang (Internship), proyek Freelance, maupun tawaran kerja Remote / Part-time**!

Sekilas tentang Ghilbran:
• Mahasiswa aktif S1 Teknik Informatika di **Telkom University Purwokerto** semester 6 dengan **IPK 3.70**.
• Terbiasa kerja mandiri maupun dalam tim dengan alur kerja modern (Git/GitHub, REST API, agile).
• Punya portofolio nyata yang bisa diverifikasi langsung di live website maupun GitHub.

Jika kantor atau tim Anda sedang mencari talenta pengembang web/mobile yang tekun dan cepat belajar, silakan langsung hubungi lewat email di **ghilbranroyale@gmail.com** atau tinggalkan pesan di [Halaman Kontak](#contact)!`;
  }

  // 19. PENDIDIKAN, KAMPUS & IPK
  if (/\b(kuliah|kampus|universitas|telkom|semester|ipk|gpa|nim|jurusan|prodi|pendidikan|kuliah di mana)\b/i.test(q)) {
    return `Data Akademik & Pendidikan Ghilbran Alfaries:
• **Kampus**: Telkom University Purwokerto
• **Program Studi**: S1 Teknik Informatika (Fakultas Informatika)
• **Angkatan & Semester**: Angkatan 2023 (saat ini semester 6 aktif)
• **Indeks Prestasi Kumulatif (IPK)**: **3.70 / 4.00**
• **Student ID / NIM**: 2311102267
• **Fokus Studi**: Machine Learning, Natural Language Processing, serta Web & Mobile Application Development.`;
  }

  // 20. BIODATA, LOKASI & PROFIL
  if (/\b(biodata|profil|tentang ghilbran|siapa ghilbran|orangnya|asal|tinggal|domisili|umur|hobi)\b/i.test(q)) {
    return `**Ghilbran Alfaries Pryma** adalah seorang Software Developer & Mahasiswa Informatika:
• **Domisili**: Berasal dari **Bumiayu, Brebes** dan beraktivitas kuliah di **Purwokerto, Jawa Tengah**.
• **Pendekatan Kerja**: Detail-oriented, tekun, dan punya pemahaman sistem hulu-ke-hilir (dari perancangan database backend hingga UI animasi interaktif).
• **Minat Utama**: Menggabungkan rekayasa web modern (React/Next.js) dengan kecerdasan buatan (AI/ML) untuk menciptakan produk digital yang solutif bagi pengguna nyata.`;
  }

  // 21. INFORMASI KONTAK & MEDIA SOSIAL
  if (/\b(kontak|hubungi|email|nomor|no wa|whatsapp|linkedin|instagram|sosmed|github|reach out)\b/i.test(q)) {
    return `Anda dapat terhubung langsung dengan Ghilbran melalui kontak berikut:
• **Email**: [ghilbranroyale@gmail.com](mailto:ghilbranroyale@gmail.com)
• **LinkedIn**: [Profil LinkedIn Ghilbran](https://www.linkedin.com/in/ghilbran-alfaries-pryma-a4ba7b3b6)
• **GitHub**: [github.com/Ghilbranalf](https://github.com/Ghilbranalf)
• **Instagram**: [@ghilbrann](https://www.instagram.com/ghilbrann)
• Anda juga bisa mengirim pesan langsung melalui form di [Contact Section](#contact).`;
  }

  // 22. DYNAMIC CONTEXTUAL FALLBACK (HUMAN-LIKE)
  const words = raw.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);
  const keywordPreview = words.slice(0, 3).join(' ');

  return `Menarik sekali pertanyaan Anda tentang **"${keywordPreview || raw}"**!

Sebagai gambaran ringkas, Ghilbran Alfaries adalah Web & Mobile Developer sekaligus mahasiswa Informatika Telkom University Purwokerto (IPK 3.70). 

Beberapa topik utama yang paling sering ditanyakan dan bisa saya jelaskan secara rinci:
• **Inti Proyek Nyata**: Web DPRD Purbalingga (portal transparansi & e-aspirasi dewan), GRADIA (pencatatan jadwal & presensi mobile), atau Bakso Pak Mul (e-commerce grosir dengan AI CS).
• **Tech Stack**: Penguasaan React, Next.js, React Native, Supabase, Tailwind, hingga model AI/NLP IndoBERT.
• **Kerja Sama**: Peluang proyek freelance, magang (internship), atau kerja remote.

Kira-kira ada bagian dari topik di atas yang ingin Anda ketahui lebih mendalam? Silakan tanyakan ya!`;
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
