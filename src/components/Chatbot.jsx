import React, { useState, useRef, useEffect } from 'react';

const SYSTEM_PROMPT = `Kamu adalah asisten AI pribadi di website portofolio Ghilbran Alfaries Pryma.

BATASAN TOPIK (STRICT GUARDRAILS - SANGAT PENTING):
1. Ruang lingkup kamu HANYA seputar Ghilbran Alfaries Pryma dalam ranah profesional dan akademik: profil biodata profesional, latar belakang pendidikan, keahlian coding/teknologi, 6 proyek portofolio unggulannya, riset AI/ML, kontak, serta peluang kerja sama (freelance, magang, full-time).
2. DILARANG KERAS menjawab hal pribadi/privasi, percintaan/asmara, keluarga, atau hal sensitif Ghilbran (misalnya: "siapa pacar Ghilbran", "apakah sudah punya pacar", "mantan", "nikah", "agama", "gaji/penghasilan pribadi"). Jika ditanya hal tersebut, tolaklah dengan sopan: "Hal tersebut merupakan privasi pribadi Ghilbran. Sebagai asisten portofolio, saya fokus membantu informasi seputar proyek coding, keahlian teknis, dan peluang kerja sama profesional Ghilbran."
3. DILARANG KERAS menjawab pertanyaan pengetahuan umum di luar Ghilbran (seperti tokoh politik, presiden, pemilu, artis/selebriti, sejarah umum, resep masakan, cuaca, sains/matematika umum, coding umum di luar proyek Ghilbran, dll).
4. JANGAN PERNAH menyamakan orang/tokoh lain dengan Ghilbran (misalnya jika ditanya "siapa Prabowo", JANGAN SEKALI-KALI menjawab dengan profil Ghilbran!).
5. JIKA pengguna menanyakan apapun di luar topik profesional Ghilbran atau portofolionya (misalnya "siapa prabowo", "resep nasi goreng", "jelaskan fisika kuantum"), kamu WAJIB MENOLAK secara sopan dan singkat dalam 1-2 kalimat.
   Format penolakan: "Maaf, saya asisten khusus portofolio Ghilbran Alfaries Pryma. Saya hanya dapat menjawab pertanyaan seputar keahlian, proyek, dan profil Ghilbran. Ada yang ingin Anda tanyakan seputar portofolio Ghilbran?"

Profil Ghilbran:
- Mahasiswa S1 Teknik Informatika di Telkom University Purwokerto (semester 6, IPK 3.70).
- Fokus: Web Development (React, Next.js, Tailwind), Mobile Apps (React Native, PWA), dan AI/ML (IndoBERT, NLP, Random Forest).
- Domisili: Bumiayu & Purwokerto, Jawa Tengah.
- Email: ghilbranroyale@gmail.com, GitHub: https://github.com/Ghilbranalf, LinkedIn: https://www.linkedin.com/in/ghilbran-alfaries-pryma-a4ba7b3b6.

Daftar 6 Proyek Unggulan & Inti Masalah yang Diselesaikan:
1. Web DPRD Kabupaten Purbalingga (React, Tailwind CSS, PHP / Laravel, MySQL):
   - Inti: Portal resmi lembaga legislatif daerah untuk keterbukaan informasi publik dan wadah aspirasi warga. Fungsinya agar masyarakat bisa memantau agenda rapat paripurna dewan, regulasi hukum (JDIH), serta mengirimkan aspirasi/keluhan secara online tanpa harus datang langsung ke gedung dewan.
2. GRADIA Mobile App (React, Tailwind CSS, PWA, Vercel):
   - Inti: Aplikasi web mobile untuk memecahkan kendala perkuliahan mahasiswa: pencatatan jadwal kuliah agar tidak bentrok, monitoring rekam jejak presensi kehadiran agar tidak kena sanksi absen, serta to-do list pelacak deadline tugas.
3. E-Commerce Bakso Pak Mul (Next.js App Router, Supabase, Tailwind, MySQL):
   - Inti: Toko online rantai pasok bahan baku bakso & mie ayam untuk mitra UMKM dan pedagang, dilengkapi sistem pembayaran otomatis (Midtrans/iPaymu), hitung ongkir otomatis, dan AI chatbot customer service.
4. Ibravia Residence (WordPress, React, PHP, MySQL, Bootstrap):
   - Inti: Sistem ganda company profile perumahan untuk calon pembeli dan admin dashboard internal untuk tim sales memantau performa penjualan dan database pembeli.
5. Geefi Residence (React, Tailwind, Vercel, n8n):
   - Inti: Website pemasaran perumahan modern untuk PT Abyakta Ageng Propertindo dengan fitur kalkulator simulasi cicilan KPR dan chatbot n8n untuk konversi leads.
6. Sanggaluri Portal / SanggaluriSM (React, Tailwind, Vercel):
   - Inti: Portal internal terenkripsi tim kerja Sanggaluri untuk manajemen konten media sosial dan koordinasi operasional tim (dikerjakan kolaboratif bersama Natasya, Rendi, dan Egi).

Riset AI/ML:
- Fine-tuning model IndoBERT untuk analisis sentimen review logistik J&T menggunakan Hugging Face Trainer API & PyTorch.
- Deteksi ancaman honeypot (CUIP-X25) dengan Random Forest & SMOTE balancing.

Aturan Komunikasi:
- Berbicaralah seperti manusia sungguhan yang cerdas, santai, ramah, dan profesional (bukan bot kaku).
- JANGAN PERNAH membuat daftar menu FAQ berulang yang kaku dengan tanda bintang atau contoh pertanyaan.
- Jawablah secara langsung dan to-the-point sesuai pertanyaan user.
- Jika disapa 'halo' / 'hai', cukup jawab ramah dan tanyakan apa yang ingin diketahui secara natural (1 kalimat santai: "Halo! Ada yang bisa saya bantu tentang portofolio atau proyek Ghilbran?").
- Jika ditanya tentang proyek, ceritakan inti fungsinya dengan jelas dan mudah dipahami layaknya bercerita ke teman atau klien.
- Dilarang keras menggunakan emoji berlebihan.`;

const OUT_OF_SCOPE_KEYWORDS = [
  "presiden", "politik", "pemilu", "pilpres", "partai", "kabinet", "menteri",
  "prabowo", "jokowi", "gibran rakabuming", "ganjar", "anies", "megawati",
  "dpr ri", "pemerintah pusat",
  "resep masakan", "resep", "cara masak", "ramalan cuaca", "cuaca", "berita gosip", "gosip",
  "puisi", "lirik lagu", "chord gitar", "cheat game", "judi", "slot", "togel",
  "crypto", "bitcoin", "saham", "pr sekolah", "rumus fisika", "tugas kimia"
];

const PERSONAL_KEYWORDS = [
  "pacar", "gebetan", "mantan", "jodoh", "nikah", "menikah", "istri", "suami", "jomblo", "single",
  "selingkuh", "kencan", "cinta", "crush", "agama", "suku", "gaji", "penghasilan", "rekening", "saldo", "pinjaman", "utang"
];

const PERSONAL_REPLY = 'Hal tersebut merupakan ranah privasi pribadi Ghilbran. Sebagai asisten portofolio profesional, saya berfokus membantu informasi seputar proyek coding, keahlian teknis, dan peluang kerja sama dengan Ghilbran. Ada yang ingin Anda tanyakan seputar portofolio Ghilbran?';

const isAskingOtherPerson = (text) => {
  const q = text.toLowerCase();
  if (/\b(siapa|tentang)\b/i.test(q)) {
    const isAboutOwnerOrProject = /\b(ghilbran|alfaries|kamu|anda|bot|ai|lu|lo|dirimu|author|developer|pembuat|pemilik|pengembang|portfolio|portofolio|dprd|gradia|bakso|pak mul|ibravia|geefi|sanggaluri|indobert|honeypot)\b/i.test(q);
    return !isAboutOwnerOrProject;
  }
  return false;
};

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: 'Halo! Ada yang bisa saya bantu tentang portofolio atau proyek Ghilbran?',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

/**
 * Smart Fallback Engine (jika koneksi offline)
 * Didesain berbicara secara manusiawi tanpa menu FAQ template yang kaku.
 */
function getSmartFallbackReply(userQuery) {
  const raw = userQuery.trim();
  const q = raw.toLowerCase();

  // Cek privasi / hal pribadi / asmara
  if (PERSONAL_KEYWORDS.some((k) => q.includes(k))) {
    return PERSONAL_REPLY;
  }

  // Cek jika pertanyaan mengarah ke orang/topik luar
  if (isAskingOtherPerson(q) || OUT_OF_SCOPE_KEYWORDS.some((k) => q.includes(k))) {
    return 'Maaf, saya asisten khusus portofolio Ghilbran Alfaries Pryma. Saya hanya dapat menjawab pertanyaan seputar keahlian, proyek, latar belakang akademik, dan peluang kerja sama dengan Ghilbran. Ada yang ingin Anda tanyakan terkait portofolio Ghilbran?';
  }

  // Salam sederhana layaknya manusia
  if (/^(halo|hai|hi|hello|hei|pagi|siang|sore|malam|assalamu|tes|test|ping)$/i.test(q) ||
      /^(halo|hai|pagi|siang|sore|malam|assalamu).*?(ai|bot|ghilbran|min)/i.test(q)) {
    return 'Halo! Ada yang bisa saya bantu tentang proyek atau profil Ghilbran?';
  }

  // Apresiasi
  if (/\b(makasih|terima kasih|thanks|thank you|tengkyu|keren|mantap|hebat|sip|bagus|top|jos)\b/i.test(q)) {
    return 'Sama-sama! Senang bisa membantu Anda. Jika tertarik untuk berkolaborasi atau mengajak Ghilbran diskusi proyek, silakan hubungi langsung lewat halaman kontak ya!';
  }

  // Identitas bot
  if (/\b(kamu siapa|siapa kamu|kamu bot|kamu ai|bisa apa|fungsi kamu|kamu bisa apa)\b/i.test(q)) {
    return 'Saya asisten AI portofolio resmi Ghilbran Alfaries. Tugas saya membantu Anda memahami karya-karya proyek Ghilbran, keahlian teknisnya di Web/Mobile dan AI, hingga peluang kerja sama seperti magang atau freelance.';
  }

  // Siapa Ghilbran / Profil Ghilbran
  if (/\b(siapa ghilbran|tentang ghilbran|profil ghilbran|biodata ghilbran|ghilbran itu siapa|pembuat web|developer web|pembuat website|developer website|pemilik website)\b/i.test(q) ||
      /\b(tentang kamu|profil kamu|siapa anda|siapa yang buat)\b/i.test(q)) {
    return `Ghilbran Alfaries Pryma adalah Web & Mobile Developer sekaligus mahasiswa Teknik Informatika di Telkom University Purwokerto (semester 6, IPK 3.70). Ia berfokus pada pengembangan aplikasi web modern (React, Next.js), mobile app, serta riset AI/NLP. Beberapa karya unggulannya antara lain Web DPRD Purbalingga, GRADIA Mobile App, dan E-Commerce Bakso Pak Mul. Ada hal spesifik seputar proyek atau keterampilannya yang ingin Anda tanyakan?`;
  }

  // Web DPRD Purbalingga
  if (/\b(dprd|purbalingga|dewan perwakilan|pemerintahan|jdih)\b/i.test(q)) {
    return `Web DPRD Kabupaten Purbalingga adalah portal resmi lembaga legislatif daerah yang dibuat untuk transparansi publik dan layanan aspirasi warga.

Intinya, lewat website ini masyarakat bisa memantau jadwal sidang dewan, regulasi perda (JDIH), serta mengirim aspirasi atau keluhan secara online langsung ke dewan tanpa harus datang ke gedung DPRD. 

Website ini dibangun menggunakan **React dan Tailwind CSS** di bagian frontend agar cepat dan ramah HP, serta backend **PHP / Laravel dan MySQL**.`;
  }

  // GRADIA
  if (/\b(gradia|jadwal|akademik|presensi|jadwal kuliah|tugas)\b/i.test(q)) {
    return `GRADIA adalah aplikasi web mobile (PWA) yang dibuat Ghilbran khusus untuk mempermudah mahasiswa mengatur aktivitas kuliah mereka.

Inti fungsinya ada tiga:
• **Pencatatan Jadwal Kuliah**: Menata mata kuliah, jam kelas, dan ruangan agar tidak bentrok.
• **Monitoring Presensi**: Memantau rekam kehadiran mahasiswa per semester agar terhindar dari sanksi absensi.
• **Pelacak Deadline Tugas**: To-do list pintar yang mengingatkan tugas-tugas kuliah yang mendekati tenggat waktu.

Aplikasi ini dibangun dengan **React dan Tailwind CSS** dan bisa di-install langsung di HP layaknya aplikasi native.`;
  }

  // Bakso Pak Mul
  if (/\b(bakso|pak mul|mie ayam|e-commerce|ecommerce|toko online|midtrans|ipaymu|ongkir)\b/i.test(q)) {
    return `E-Commerce Bakso Pak Mul adalah platform toko online rantai pasok bahan baku bakso dan mie ayam untuk para pedagang dan mitra UMKM.

Intinya, platform ini menyelesaikan kendala belanja bahan baku manual setiap subuh. Mitra bisa memesan daging giling, mie, dan bumbu secara grosir langsung dari HP dengan pembayaran otomatis (**Midtrans/iPaymu**), hitung ongkir otomatis, dan bantuan chatbot customer service. Proyek ini dibangun menggunakan **Next.js (App Router), Supabase, dan Tailwind CSS**.`;
  }

  // Geefi Residence
  if (/\b(geefi|pt abyakta|simulasi kpr|leads properti|perumahan geefi)\b/i.test(q)) {
    return `Geefi Residence adalah website pemasaran perumahan modern untuk developer PT Abyakta Ageng Propertindo.

Inti fungsinya membantu calon pembeli melihat tipe-tipe rumah, menghitung simulasi cicilan KPR bulanan sesuai budget, dan langsung terhubung dengan tim pemasaran via integrasi chatbot otomatis n8n. Dibangun dengan **React dan Tailwind CSS**.`;
  }

  // Ibravia Residence
  if (/\b(ibravia|perumahan ibravia|dashboard ibravia|residence)\b/i.test(q)) {
    return `Ibravia Residence adalah platform terpadu untuk perumahan real estate yang memadukan company profile elegan untuk calon pembeli dan admin dashboard internal bagi tim manajemen untuk memantau grafik penjualan dan prospek pembeli rumah. Ditenagai oleh **WordPress, React, PHP, dan MySQL**.`;
  }

  // Sanggaluri
  if (/\b(sanggaluri|sanggalurism|portal internal)\b/i.test(q)) {
    return `Sanggaluri Portal adalah sistem internal aman untuk tim operasional Sanggaluri dalam mengelola alur kerja konten promosi media sosial dan koordinasi tim secara terpusat. Proyek ini dibangun kolaboratif menggunakan **React dan Tailwind CSS**.`;
  }

  // AI & ML
  if (/\b(indobert|bert|nlp|sentiment|sentimen|j&t|honeypot|cuip|random forest|machine learning|ai)\b/i.test(q)) {
    return `Di bidang AI & Machine Learning, Ghilbran fokus pada NLP dan Keamanan Siber:
• **Fine-tuning IndoBERT**: Melatih model bahasa IndoBERT untuk mengklasifikasikan sentimen ribuan ulasan ekspedisi J&T (Hugging Face & PyTorch).
• **Deteksi Honeypot (CUIP-X25)**: Menggunakan algoritma Random Forest dan teknik SMOTE untuk mendeteksi anomali serangan siber pada jaringan honeypot.`;
  }

  // Semua Proyek
  if (/\b(proyek|project|portofolio|portfolio|karya|hasil kerja|udah bikin apa|pernah buat apa)\b/i.test(q)) {
    return `Ghilbran memiliki 6 proyek unggulan yang memecahkan masalah nyata:
1. **Web DPRD Kabupaten Purbalingga**: Portal resmi legislatif daerah untuk transparansi publik dan e-aspirasi.
2. **E-Commerce Bakso Pak Mul**: Toko online rantai pasok bahan baku bakso & mie ayam dengan transaksi otomatis.
3. **GRADIA Mobile App**: Aplikasi mobile mahasiswa untuk mencatat jadwal kuliah, presensi, dan deadline tugas.
4. **Ibravia Residence**: Platform perumahan terintegrasi dashboard monitoring penjualan.
5. **Geefi Residence**: Website pemasaran properti dengan kalkulator simulasi KPR.
6. **Sanggaluri Portal**: Sistem manajemen internal alur promosi media sosial tim.

Anda bisa melihat detail tiap proyek di bagian [Featured Projects](#projects)!`;
  }

  // Skill & Keahlian
  if (/\b(skill|keahlian|kemampuan|tech stack|teknologi|tools|bahasa pemrograman|coding)\b/i.test(q)) {
    return `Ghilbran menguasai berbagai teknologi pengembangan modern:
• **Frontend**: React.js, Next.js, Tailwind CSS, JavaScript (ES6+), HTML5/CSS3.
• **Mobile**: React Native, Progressive Web Apps (PWA).
• **Backend & Database**: Node.js (Express), PHP (Laravel), MySQL, PostgreSQL, Supabase.
• **AI & Machine Learning**: Python, PyTorch, Hugging Face (IndoBERT), Scikit-Learn (Random Forest).
• **Tools**: Git, GitHub, Postman, Vercel, Figma.`;
  }

  // Pengalaman / Karir
  if (/\b(pengalaman|experience|karir|riwayat kerja|prestasi)\b/i.test(q)) {
    return `Ghilbran berpengalaman mengembangkan berbagai sistem perangkat lunak, mulai dari portal pemerintahan (Web DPRD Purbalingga), e-commerce B2B/B2C (Bakso Pak Mul), web app produktivitas (GRADIA), hingga platform pemasaran properti (Ibravia & Geefi Residence), serta riset AI/NLP dan keamanan siber.`;
  }

  // React & Frontend
  if (/\b(react|next|next\.js|nextjs|frontend|tailwind|typescript|javascript)\b/i.test(q)) {
    return `Bisa banget! React.js dan Next.js adalah spesialisasi utama Ghilbran di sisi frontend. Ghilbran terbiasa membangun antarmuka web yang kencang, responsif, dan rapi menggunakan arsitektur komponen modular dan styling Tailwind CSS, seperti yang diterapkan di Web DPRD Purbalingga, Bakso Pak Mul, dan GRADIA.`;
  }

  // Backend & Database
  if (/\b(backend|database|mysql|postgres|supabase|express|node|php|laravel|api)\b/i.test(q)) {
    return `Untuk backend dan database, Ghilbran berpengalaman menggunakan Express.js (Node.js), PHP / Laravel, serta BaaS Supabase. Untuk database, Ghilbran menguasai perancangan skema relasional di MySQL dan PostgreSQL beserta pengujian API menggunakan Postman.`;
  }

  // Jasa / Pembuatan Website
  if (/\b(bisa buat|bisa bikin|bikinin|jasa|layanan|bantu tugas|joki|buat web|bikin website|bikin aplikasi)\b/i.test(q)) {
    return `Tentu bisa! Ghilbran menyediakan jasa pembuatan software seperti Website Company Profile instansi/bisnis, E-Commerce, Admin Dashboard, Aplikasi Mobile (PWA & React Native), hingga integrasi Chatbot cerdas. Silakan hubungi langsung lewat form di [Contact Section](#contact) atau email ke ghilbranroyale@gmail.com!`;
  }

  // Magang / Freelance
  if (/\b(magang|intern|internship|freelance|kerja sama|hire|lowongan|remote|open to work)\b/i.test(q)) {
    return `Ghilbran saat ini mahasiswa aktif semester 6 (IPK 3.70) di Telkom University Purwokerto, dan sangat terbuka untuk kesempatan Magang (Internship), proyek Freelance, maupun tawaran kerja Remote. Anda bisa menghubungi langsung melalui email ghilbranroyale@gmail.com atau form kontak di website ini!`;
  }

  // Pendidikan & Profil
  if (/\b(kuliah|kampus|telkom|semester|ipk|nim|jurusan|biodata|profil|asal|domisili)\b/i.test(q)) {
    return `Ghilbran Alfaries Pryma adalah mahasiswa S1 Teknik Informatika di Telkom University Purwokerto (angkatan 2023, semester 6) dengan IPK 3.70. Berasal dari Bumiayu dan aktif berkuliah di Purwokerto, Ghilbran memiliki passion besar di bidang Web Development modern, Mobile App, dan AI/NLP.`;
  }

  // Kontak
  if (/\b(kontak|hubungi|email|whatsapp|wa|linkedin|instagram|github)\b/i.test(q)) {
    return `Anda bisa menghubungi Ghilbran melalui:
• Email: ghilbranroyale@gmail.com
• LinkedIn: [Profil LinkedIn Ghilbran](https://www.linkedin.com/in/ghilbran-alfaries-pryma-a4ba7b3b6)
• GitHub: [github.com/Ghilbranalf](https://github.com/Ghilbranalf)
• Instagram: @ghilbrann
• Atau tinggalkan pesan di bagian [Contact Section](#contact)!`;
  }

  // Default jika pertanyaan di luar lingkup atau tidak terdeteksi
  return 'Maaf, saya asisten khusus portofolio Ghilbran Alfaries Pryma. Saya hanya dapat menjawab pertanyaan seputar proyek, keahlian coding, latar belakang akademik, dan peluang kerja sama dengan Ghilbran. Ada hal seputar portofolio Ghilbran yang ingin Anda tanyakan?';
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

    // 1. Cek hal pribadi / privasi / asmara
    if (PERSONAL_KEYWORDS.some((k) => msgLower.includes(k))) {
      setTimeout(() => {
        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          text: PERSONAL_REPLY,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 350);
      return;
    }

    // 2. Cek out of scope (orang luar, politik, umum)
    const isOutOfScope = isAskingOtherPerson(msgLower) || OUT_OF_SCOPE_KEYWORDS.some((k) => msgLower.includes(k));

    if (isOutOfScope) {
      setTimeout(() => {
        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Maaf, saya asisten khusus portofolio Ghilbran Alfaries Pryma. Saya hanya menjawab pertanyaan seputar proyek, skill coding, latar belakang akademik, dan peluang kerja sama dengan Ghilbran. Ada yang ingin ditanyakan seputar hal tersebut?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 350);
      return;
    }

    // Call Real AI LLM for natural, human-like answers
    try {
      const historyContext = newMessages.slice(-6).map((h) => ({
        role: h.sender === 'user' ? 'user' : 'assistant',
        content: h.text
      }));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8500);

      const response = await fetch('https://text.pollinations.ai/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...historyContext
          ],
          model: 'openai'
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const rawReply = data?.choices?.[0]?.message?.content;
        if (rawReply) {
          const cleanReply = rawReply
            .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}]/gu, '')
            .trim();
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: 'bot',
              text: cleanReply,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
          setIsTyping(false);
          return;
        }
      }
    } catch (err) {
      console.warn('AI Network Call error, falling back to smart engine:', err);
    }

    // Smart Local Fallback
    setTimeout(() => {
      const fallbackReply = getSmartFallbackReply(query);
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
                  <span className="chatbot-status-dot"></span> Online &amp; Siap Bantu
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

          {/* Input Footer */}
          <div className="chatbot-footer">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Tulis pertanyaan Anda di sini..."
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
