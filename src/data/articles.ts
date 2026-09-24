export interface Article {
  id: string
  cat: { EN: string; ID: string }
  date: string
  img: string
  title: { EN: string; ID: string }
  excerpt: { EN: string; ID: string }
  body: { EN: string; ID: string }
  related: string[]
}

export const ARTICLES: Article[] = [
  {
    id: 'fiber-optic-indonesia',
    cat: { EN: 'Technology', ID: 'Teknologi' },
    date: '14 Mar 2024',
    img: 'https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=1200&h=700&fit=crop&auto=format',
    title: { EN: 'Advancing Fiber Optic Infrastructure in Indonesia\'s Growing Digital Economy', ID: 'Memajukan Infrastruktur Fiber Optik di Ekonomi Digital Indonesia yang Berkembang' },
    excerpt: { EN: 'Fiber optic technology continues to reshape enterprise and government connectivity infrastructure across the archipelago.', ID: 'Teknologi fiber optik terus membentuk kembali infrastruktur konektivitas enterprise dan pemerintah di seluruh nusantara.' },
    body: {
      EN: `Indonesia's digital economy is expanding rapidly, driven by a growing middle class, increasing smartphone penetration, and the government's ambitious digital transformation programs. At the core of this transformation is fiber optic infrastructure — the backbone that enables high-speed, reliable broadband for businesses, government agencies, and households across the archipelago.

Fiber optic networks offer significant advantages over legacy copper and wireless solutions: higher bandwidth capacity, lower latency, and far greater resistance to interference and signal degradation over long distances. For an archipelago nation with more than 17,000 islands, the challenge is not just technical but logistical — building resilient fiber networks that can serve urban centers and regional areas alike.

Enterprise and government adoption has accelerated significantly. Large enterprises in sectors from banking to manufacturing are upgrading their campus and WAN infrastructure to fiber optic backbones to support cloud workloads, IoT deployments, and real-time data analytics. Government agencies are similarly investing in fiber connectivity to power e-government platforms, digital services, and administrative networks.

For technology and connectivity companies like Digital Multi Sinergy, this growth represents both a responsibility and an opportunity. By providing quality passive and active fiber optic products, field tools, and implementation services, DMS supports the broader ecosystem of contractors, integrators, and operators who are building Indonesia's digital infrastructure.

The demand for FTTx components — patchcords, ODPs, splitters, joint closures, and drop cables — continues to grow steadily. At the same time, demand for active equipment like ONTs and OLTs is rising alongside the expansion of ISP and telco networks into new residential and commercial areas.

Digital Multi Sinergy remains committed to supplying products that meet international quality standards and to supporting implementation teams with the right tools and technical knowledge to build networks that last.`,
      ID: `Ekonomi digital Indonesia berkembang pesat, didorong oleh kelas menengah yang berkembang, penetrasi smartphone yang meningkat, dan program transformasi digital ambisius pemerintah. Inti dari transformasi ini adalah infrastruktur fiber optik — tulang punggung yang memungkinkan broadband berkecepatan tinggi dan andal untuk bisnis, instansi pemerintah, dan rumah tangga di seluruh nusantara.

Jaringan fiber optik menawarkan keunggulan signifikan dibandingkan solusi tembaga dan nirkabel: kapasitas bandwidth lebih tinggi, latensi lebih rendah, dan ketahanan yang jauh lebih besar terhadap gangguan dan degradasi sinyal pada jarak jauh. Bagi negara kepulauan dengan lebih dari 17.000 pulau, tantangannya bukan hanya teknis tetapi juga logistik — membangun jaringan fiber yang tangguh yang dapat melayani pusat perkotaan dan daerah regional.

Adopsi enterprise dan pemerintah telah meningkat secara signifikan. Perusahaan besar di sektor perbankan hingga manufaktur meningkatkan infrastruktur kampus dan WAN mereka ke backbone fiber optik untuk mendukung beban kerja cloud, deployment IoT, dan analitik data real-time.

Bagi perusahaan teknologi dan konektivitas seperti Digital Multi Sinergy, pertumbuhan ini merupakan tanggung jawab sekaligus peluang. Dengan menyediakan produk fiber optik pasif dan aktif berkualitas, alat lapangan, dan layanan implementasi, DMS mendukung ekosistem kontraktor, integrator, dan operator yang lebih luas yang membangun infrastruktur digital Indonesia.`,
    },
    related: ['fttx-tools', 'partnership-2024'],
  },
  {
    id: 'fttx-tools',
    cat: { EN: 'Products', ID: 'Produk' },
    date: '28 Feb 2024',
    img: 'https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?w=1200&h=700&fit=crop&auto=format',
    title: { EN: 'New FTTx Tool Series Now Available for Network Deployment Projects', ID: 'Seri Alat FTTx Baru Kini Tersedia untuk Proyek Deployment Jaringan' },
    excerpt: { EN: 'DMS expands its FTTx portfolio with advanced tools designed for faster, more accurate field installation.', ID: 'DMS memperluas portofolio FTTx dengan alat canggih untuk instalasi lapangan yang lebih cepat dan akurat.' },
    body: {
      EN: `Field installation quality is one of the most critical factors determining the long-term performance of a fiber optic network. The quality of the splice, the cleanliness of the connector end-face, and the accuracy of network testing all depend on the tools used by field technicians.

Digital Multi Sinergy is pleased to announce the expansion of its FTTx tools portfolio with a new series of fusion splicers and OTDRs designed for modern FTTH and access network deployment. The new series focuses on three core improvements: speed, accuracy, and durability.

The new fusion splicer models feature active core alignment technology that delivers typical splice losses below 0.02 dB for single-mode fiber. Splice cycles have been optimized to under 7 seconds, and heat shrink protection completes in under 15 seconds — a significant time saving on large-scale deployment projects.

The updated OTDR lineup covers a full range of test distances from short-range FTTH access testing to long-haul backbone verification, with models available for 1310 nm, 1550 nm, and 1625 nm wavelengths. Built-in PON power meter and visual fault locator capabilities make these units versatile for both deployment acceptance testing and maintenance troubleshooting.

Both product lines are built for demanding field environments, with IP52-rated protection, drop-test-certified housings, and battery life of 200+ splices or 8+ OTDR test hours per charge.

These new tools are available through Digital Multi Sinergy for immediate delivery. Contact our team for technical specifications, pricing, and demonstration arrangements.`,
      ID: `Kualitas instalasi lapangan adalah salah satu faktor paling kritis yang menentukan performa jangka panjang jaringan fiber optik. Kualitas splice, kebersihan end-face konektor, dan akurasi pengujian jaringan semuanya bergantung pada alat yang digunakan oleh teknisi lapangan.

Digital Multi Sinergy dengan bangga mengumumkan perluasan portofolio alat FTTx dengan serangkaian fusion splicer dan OTDR baru yang dirancang untuk deployment FTTH dan jaringan akses modern. Seri baru ini berfokus pada tiga peningkatan inti: kecepatan, akurasi, dan ketahanan.

Model fusion splicer baru menampilkan teknologi core alignment aktif yang memberikan splice loss tipikal di bawah 0,02 dB untuk fiber single-mode. Siklus splice telah dioptimalkan menjadi di bawah 7 detik, dan proteksi heat shrink selesai dalam waktu di bawah 15 detik — penghematan waktu yang signifikan pada proyek deployment berskala besar.

Alat-alat baru ini tersedia melalui Digital Multi Sinergy untuk pengiriman segera. Hubungi tim kami untuk spesifikasi teknis, harga, dan pengaturan demonstrasi.`,
    },
    related: ['fiber-optic-indonesia', 'partnership-2024'],
  },
  {
    id: 'partnership-2024',
    cat: { EN: 'Company News', ID: 'Berita Perusahaan' },
    date: '15 Jan 2024',
    img: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=1200&h=700&fit=crop&auto=format',
    title: { EN: 'Digital Multi Sinergy Strengthens Partnership Ecosystem for 2024', ID: 'Digital Multi Sinergy Perkuat Ekosistem Kemitraan untuk 2024' },
    excerpt: { EN: 'Expanding technology partnerships to deliver broader connectivity solutions across Indonesia.', ID: 'Memperluas kemitraan teknologi untuk memberikan solusi konektivitas yang lebih luas di Indonesia.' },
    body: {
      EN: `As the connectivity and technology landscape in Indonesia continues to evolve, Digital Multi Sinergy is doubling down on its partnership ecosystem to deliver broader, deeper solutions to clients across the country.

In the coming year, DMS is expanding formal technology partnerships with leading manufacturers in fiber optic passive components, active network equipment, FTTx deployment tools, and software platforms. These partnerships ensure that DMS clients have access to the latest product generations, technical support channels, and competitive pricing.

Beyond product partnerships, DMS is also strengthening its network of certified installation partners — field teams and system integrators who are trained and equipped to deploy DMS products to professional standards across Indonesia's diverse geographic and infrastructure conditions.

The company is investing in technical training programs for both internal engineers and partner field teams, covering fusion splicing, OTDR testing, GPON network configuration, and IT solution deployment. These programs are designed to raise the overall quality of fiber optic implementation across the partner network.

For clients, this means broader geographic coverage, faster project mobilization, and confidence in implementation quality — regardless of project location.

Digital Multi Sinergy welcomes inquiries from prospective technology partners, distribution partners, and certified installation partners. Contact our business development team to discuss partnership opportunities.`,
      ID: `Seiring lanskap konektivitas dan teknologi di Indonesia terus berkembang, Digital Multi Sinergy menggandakan ekosistem kemitraannya untuk memberikan solusi yang lebih luas dan mendalam kepada klien di seluruh negeri.

Pada tahun mendatang, DMS memperluas kemitraan teknologi formal dengan produsen terkemuka dalam komponen pasif fiber optik, peralatan jaringan aktif, alat deployment FTTx, dan platform perangkat lunak. Kemitraan ini memastikan klien DMS memiliki akses ke generasi produk terbaru, saluran dukungan teknis, dan harga yang kompetitif.

Di luar kemitraan produk, DMS juga memperkuat jaringan mitra instalasi bersertifikat — tim lapangan dan integrator sistem yang terlatih dan dilengkapi untuk menerapkan produk DMS sesuai standar profesional di seluruh Indonesia.

Digital Multi Sinergy menyambut pertanyaan dari calon mitra teknologi, mitra distribusi, dan mitra instalasi bersertifikat. Hubungi tim pengembangan bisnis kami untuk mendiskusikan peluang kemitraan.`,
    },
    related: ['fiber-optic-indonesia', 'fttx-tools'],
  },
  {
    id: 'fttx-broadband',
    cat: { EN: 'Industry', ID: 'Industri' },
    date: '10 Dec 2023',
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=700&fit=crop&auto=format',
    title: { EN: 'The Role of FTTx in Indonesia\'s National Broadband Plan', ID: 'Peran FTTx dalam Rencana Pitalebar Nasional Indonesia' },
    excerpt: { EN: 'How fiber-to-the-x technology is accelerating universal broadband access across the country.', ID: 'Bagaimana teknologi fiber-to-the-x mempercepat akses broadband universal di seluruh negeri.' },
    body: {
      EN: `Indonesia's National Broadband Plan sets ambitious targets for universal high-speed internet access. Achieving these targets requires deploying fiber optic networks to homes, businesses, and government facilities across the archipelago at scale.

FTTx — Fiber to the Home (FTTH), Fiber to the Building (FTTB), and Fiber to the Cabinet (FTTC) — represents the gold standard for last-mile broadband delivery. Unlike cable or DSL, fiber delivers symmetrical speeds that scale to meet future demand without requiring copper replacement.

The major Indonesian telecommunications operators and ISPs are all investing heavily in FTTx rollout. The combination of government incentives, falling equipment costs, and rising consumer demand for streaming, gaming, and remote work has created a favorable deployment environment.

Key components of any FTTx deployment include the ODN (Optical Distribution Network) — passive infrastructure from the OLT to the subscriber's ONT — and the active network equipment that manages traffic and QoS. Both segments represent significant and sustained demand for quality components and tools.

For companies involved in FTTx supply and implementation, this is a decade-long growth opportunity.`,
      ID: `Rencana Pitalebar Nasional Indonesia menetapkan target ambisius untuk akses internet berkecepatan tinggi universal. Mencapai target ini memerlukan deployment jaringan fiber optik ke rumah, bisnis, dan fasilitas pemerintah di seluruh nusantara dalam skala besar.

FTTx — Fiber to the Home (FTTH), Fiber to the Building (FTTB), dan Fiber to the Cabinet (FTTC) — merupakan standar emas untuk pengiriman broadband last-mile. Tidak seperti kabel atau DSL, fiber memberikan kecepatan simetris yang dapat diskalakan untuk memenuhi permintaan masa depan tanpa memerlukan penggantian tembaga.

Operator telekomunikasi dan ISP Indonesia besar semuanya berinvestasi besar-besaran dalam rollout FTTx. Kombinasi insentif pemerintah, biaya peralatan yang turun, dan permintaan konsumen yang meningkat untuk streaming, gaming, dan kerja jarak jauh telah menciptakan lingkungan deployment yang menguntungkan.`,
    },
    related: ['fiber-optic-indonesia', 'fttx-tools'],
  },
  {
    id: 'enterprise-network',
    cat: { EN: 'Projects', ID: 'Proyek' },
    date: '22 Nov 2023',
    img: 'https://images.unsplash.com/photo-1762163516269-3c143e04175c?w=1200&h=700&fit=crop&auto=format',
    title: { EN: 'Case Study: Enterprise Campus Network Deployment', ID: 'Studi Kasus: Deployment Jaringan Kampus Enterprise' },
    excerpt: { EN: 'Inside a large-scale enterprise network project — scope, challenges, and outcomes.', ID: 'Di balik proyek jaringan enterprise berskala besar — cakupan, tantangan, dan hasil.' },
    body: {
      EN: `Enterprise campus networks are increasingly fiber-first. The shift from traditional copper-based structured cabling to fiber optic distribution has been driven by bandwidth demands that copper simply cannot keep pace with — particularly as enterprises adopt cloud-first strategies, video-intensive collaboration platforms, and high-density Wi-Fi 6 deployments.

A recent enterprise campus network deployment carried out using Digital Multi Sinergy products illustrates the scope and complexity of modern enterprise network projects. The project involved a multi-building campus with approximately 2,000 end users and covered structured cabling, fiber optic backbone infrastructure, active network equipment, and a centralized network management system.

The passive infrastructure used LC and SC APC patchcords for all fiber terminations, with ODPs at each building distribution node and OTBs at floor-level sub-distribution points. The active layer deployed GPON OLT equipment at the central equipment room, with ONTs serving each floor switch cluster.

The result was a network capable of delivering multi-gigabit per second capacity to each building, with centralized visibility and management from a single NMS console. The project was completed on schedule and passed all acceptance test criteria including OTDR trace verification on all fiber routes.

This type of deployment represents the quality standard that Digital Multi Sinergy's products and implementation support are designed to achieve.`,
      ID: `Jaringan kampus enterprise semakin mengutamakan fiber. Pergeseran dari kabel terstruktur berbasis tembaga tradisional ke distribusi fiber optik didorong oleh tuntutan bandwidth yang tidak dapat diimbangi tembaga — khususnya saat enterprise mengadopsi strategi cloud-first, platform kolaborasi intensif video, dan deployment Wi-Fi 6 kepadatan tinggi.

Deployment jaringan kampus enterprise terkini menggunakan produk Digital Multi Sinergy mengilustrasikan cakupan dan kompleksitas proyek jaringan enterprise modern. Proyek ini melibatkan kampus multi-gedung dengan sekitar 2.000 pengguna akhir dan mencakup kabel terstruktur, infrastruktur backbone fiber optik, peralatan jaringan aktif, dan sistem manajemen jaringan terpusat.

Hasilnya adalah jaringan yang mampu memberikan kapasitas multi-gigabit per detik ke setiap gedung, dengan visibilitas dan manajemen terpusat dari satu konsol NMS. Proyek selesai tepat waktu dan lulus semua kriteria acceptance test.`,
    },
    related: ['fiber-optic-indonesia', 'partnership-2024'],
  },
  {
    id: 'ai-network',
    cat: { EN: 'Technology', ID: 'Teknologi' },
    date: '05 Oct 2023',
    img: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=1200&h=700&fit=crop&auto=format',
    title: { EN: 'AI-Driven Network Monitoring: What Changes for Operators', ID: 'Pemantauan Jaringan Berbasis AI: Apa yang Berubah bagi Operator' },
    excerpt: { EN: 'Artificial intelligence is transforming how network operators detect, diagnose and resolve infrastructure issues.', ID: 'Kecerdasan buatan mengubah cara operator mendeteksi dan menyelesaikan masalah infrastruktur.' },
    body: {
      EN: `Network operations have traditionally been reactive — operators wait for alarms, diagnose the cause, and dispatch a response. Artificial intelligence is fundamentally changing this model by enabling predictive, proactive network management.

AI-driven monitoring systems analyze streams of telemetry data from network devices — traffic patterns, error rates, optical power levels, temperature — and use machine learning models to detect patterns that precede failures. This allows operators to address degrading links or devices before they cause outages.

For fiber optic networks specifically, AI can correlate optical power degradation trends from OLT and ONT OMCI data with environmental factors such as temperature cycles or physical plant events, flagging potential fiber damage or connector degradation before signal loss reaches customer-impacting levels.

For ISPs managing thousands of ONT devices, AI-driven anomaly detection can automatically identify subscribers with degrading optical budgets — a proactive support model that reduces churn and truck rolls.

Digital Multi Sinergy's AI Analytics Platform is designed for exactly this use case. By connecting to NMS data streams, OLT management APIs, and subscriber databases, the platform delivers actionable predictions with sufficient lead time for preventive action.

The shift from reactive to predictive network operations represents a significant improvement in network reliability and a reduction in operational costs — outcomes that matter to every telecommunications and enterprise network operator.`,
      ID: `Operasi jaringan secara tradisional bersifat reaktif — operator menunggu alarm, mendiagnosis penyebab, dan mengirimkan respons. Kecerdasan buatan secara fundamental mengubah model ini dengan memungkinkan manajemen jaringan prediktif dan proaktif.

Sistem pemantauan berbasis AI menganalisis aliran data telemetri dari perangkat jaringan dan menggunakan model machine learning untuk mendeteksi pola yang mendahului kegagalan. Ini memungkinkan operator untuk mengatasi link atau perangkat yang memburuk sebelum menyebabkan gangguan.

Platform AI Analytics DMS dirancang untuk kasus penggunaan ini. Dengan menghubungkan ke aliran data NMS, API manajemen OLT, dan database pelanggan, platform memberikan prediksi yang dapat ditindaklanjuti dengan waktu tunggu yang cukup untuk tindakan pencegahan.`,
    },
    related: ['enterprise-network', 'fttx-tools'],
  },
]

export const ARTICLE_MAP: Record<string, Article> = Object.fromEntries(ARTICLES.map((a) => [a.id, a]))
