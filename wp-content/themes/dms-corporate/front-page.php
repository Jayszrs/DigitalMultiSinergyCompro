<?php
get_header();
$products_url = get_post_type_archive_link('dms_product') ?: home_url('/products/');
$contact_url = home_url('/contact-us/');
$about_url = home_url('/about-us/');
$services = [
    ['Passive', 'hero-fiber.webp', dms_t('Komponen Pasif', 'Passive Components'), dms_t('Patchcord, kabel drop, ODP, splitter, closure, dan infrastruktur pasif fiber optik untuk jaringan FTTx dan enterprise.', 'Patchcords, drop cables, ODPs, splitters, closures, and passive fiber infrastructure for FTTx and enterprise networks.')],
    ['Active', 'service-active.webp', dms_t('Peralatan Jaringan Aktif', 'Active Network Equipment'), dms_t('ONT, OLT, switch, dan perangkat aktif untuk implementasi broadband GPON dan XGS-PON modern.', 'ONTs, OLTs, switches, and active devices for modern GPON and XGS-PON broadband deployments.')],
    ['FTTx Tools', 'service-fttx.webp', dms_t('Alat & Peralatan FTTx', 'FTTx Tools & Equipment'), dms_t('Splicer, OTDR, power meter, dan alat khusus untuk instalasi fiber optik yang cepat dan akurat.', 'Splicers, OTDRs, power meters, and specialist tools for fast, accurate fiber installation.')],
    ['Software', 'service-software.webp', dms_t('Solusi Perangkat Lunak & IT', 'Software & IT Solutions'), dms_t('Pengembangan perangkat lunak, sistem manajemen jaringan, solusi infrastruktur IT, dan transformasi digital.', 'Software development, network management systems, IT infrastructure, and digital transformation.')],
    ['IT & AI', 'service-ai.webp', dms_t('Solusi AI & Kecerdasan', 'AI & Intelligence Solutions'), dms_t('Platform AI, analitik prediktif, dan otomasi cerdas untuk operasi telekomunikasi dan enterprise.', 'AI platforms, predictive analytics, and intelligent automation for telecommunications and enterprise operations.')],
];
$capabilities = [
    dms_t('Infrastruktur Fiber Optik', 'Fiber Optic Infrastructure'), dms_t('Jaringan & Konektivitas', 'Network & Connectivity'),
    dms_t('Produk Telekomunikasi', 'Telecommunications Products'), dms_t('Deployment FTTx', 'FTTx Deployment'),
    dms_t('Pengembangan Perangkat Lunak', 'Software Development'), dms_t('Solusi IT', 'IT Solutions'),
    dms_t('Kecerdasan Buatan', 'Artificial Intelligence'), dms_t('Implementasi Proyek', 'Project Implementation'),
];
$implementations = [
    ['implementation-fiber.webp', dms_t('Telekomunikasi', 'Telecommunications'), dms_t('Infrastruktur Fiber Optik', 'Fiber Optic Infrastructure'), dms_t('Implementasi Backbone Fiber Optik', 'Fiber Optic Backbone Implementation'), dms_t('Deployment backbone end-to-end untuk operator telekomunikasi, termasuk splicing, pengujian, dan dokumentasi.', 'End-to-end backbone deployment for a telecommunications operator, including splicing, testing, and documentation.')],
    ['implementation-enterprise.webp', 'Enterprise', dms_t('Solusi IT', 'IT Solutions'), dms_t('Modernisasi Jaringan Enterprise', 'Enterprise Network Modernization'), dms_t('Implementasi jaringan dengan kabel terstruktur, perangkat aktif, dan platform manajemen terintegrasi.', 'Network implementation with structured cabling, active equipment, and an integrated management platform.')],
    ['implementation-digital.webp', dms_t('Pemerintah', 'Government'), dms_t('Perangkat Lunak & AI', 'Software & AI'), dms_t('Transformasi Platform Digital', 'Digital Platform Transformation'), dms_t('Platform digital terintegrasi dengan analitik berbasis AI dan otomasi proses operasional.', 'An integrated digital platform with AI-driven analytics and operational process automation.')],
];
?>
<section class="hero-home">
    <div class="hero-home__media" data-parallax="0.12"><img src="<?php echo esc_url(dms_asset('images/hero-fiber.webp')); ?>" alt="" width="1920" height="1200" fetchpriority="high"><span></span></div>
    <div class="hero-home__orbits" aria-hidden="true"><i></i><i></i><b></b></div>
    <div class="container hero-home__content">
        <span class="eyebrow eyebrow--center">Digital Multi Sinergy</span>
        <h1><?php if (dms_lang() === 'en') : ?>Technology &amp; Connectivity <span>Solutions</span> Built for Tomorrow.<?php else : ?>Solusi Teknologi &amp;<br>Konektivitas untuk <span>Masa Depan.</span><?php endif; ?></h1>
        <p><?php echo esc_html(dms_t('Menyediakan konektivitas, telekomunikasi, IT, dan solusi teknologi yang andal melalui produk berkualitas dan implementasi profesional.', 'Delivering reliable connectivity, telecommunications, IT and technology solutions through quality products and professional implementation.')); ?></p>
        <div class="button-row button-row--center">
            <a class="button" href="<?php echo esc_url($contact_url); ?>"><?php echo esc_html(dms_t('Konsultasi Gratis Tersedia', 'Free Consultation Available')); ?><span>→</span></a>
            <a class="button button--ghost" href="<?php echo esc_url($products_url); ?>"><?php echo esc_html(dms_t('Jelajahi Produk', 'Explore Products')); ?></a>
        </div>
    </div>
    <a class="scroll-cue" href="#products" aria-label="<?php echo esc_attr(dms_t('Gulir ke produk', 'Scroll to products')); ?>">↓</a>
</section>
<div class="wave wave--dark-to-white" aria-hidden="true"><svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0 20c360 70 720-20 1080 25 170 22 285-8 360-22v57H0Z"/></svg></div>

<section class="section section--products" id="products">
    <div class="container section-heading section-heading--center" data-reveal>
        <span class="eyebrow eyebrow--dark eyebrow--center"><?php echo esc_html(dms_t('Produk Kami', 'Our Products')); ?></span>
        <h2><?php echo esc_html(dms_t('Solusi untuk infrastruktur konektivitas modern.', 'Solutions for modern connectivity infrastructure.')); ?></h2>
    </div>
    <div class="container service-grid" data-stagger>
        <?php foreach ($services as $index => [$slug, $image, $title, $copy]) : ?>
            <a class="service-card" href="<?php echo esc_url(add_query_arg('product_cat', sanitize_title($slug), $products_url)); ?>">
                <div class="service-card__media"><img src="<?php echo esc_url(dms_asset('images/' . $image)); ?>" alt="<?php echo esc_attr($title); ?>" loading="lazy" width="700" height="480"><span><?php echo esc_html(sprintf('%02d', $index + 1)); ?></span></div>
                <div class="service-card__body"><h3><?php echo esc_html($title); ?></h3><p><?php echo esc_html($copy); ?></p><strong><?php echo esc_html(dms_t('Pelajari Lebih Lanjut', 'Learn More')); ?> <i>→</i></strong></div>
            </a>
        <?php endforeach; ?>
    </div>
</section>

<div class="wave wave--white-to-dark" aria-hidden="true"><svg viewBox="0 0 1440 64" preserveAspectRatio="none"><path d="M0 28c430 42 960-24 1440 5v31H0Z"/></svg></div>
<section class="home-cta section--dark">
    <div class="home-cta__orbit" aria-hidden="true"></div>
    <div class="container" data-reveal>
        <h2><?php echo esc_html(dms_t('Mari bangun solusi teknologi yang tepat bersama.', "Let's build the right technology solution together.")); ?></h2>
        <p><?php echo esc_html(dms_t('Bicarakan proyek konektivitas, infrastruktur, atau digital Anda berikutnya bersama tim kami.', 'Talk with our team about your next connectivity, infrastructure or digital project.')); ?></p>
        <a class="button button--orange" href="<?php echo esc_url($contact_url); ?>"><?php echo esc_html(dms_t('Konsultasi Gratis Tersedia', 'Free Consultation Available')); ?><span>→</span></a>
    </div>
</section>
<div class="wave wave--dark-to-white wave--reverse" aria-hidden="true"><svg viewBox="0 0 1440 64" preserveAspectRatio="none"><path d="M0 30c430-30 930 35 1440 0v34H0Z"/></svg></div>

<section class="section capabilities-home">
    <div class="container capabilities-home__grid">
        <div data-reveal>
            <span class="eyebrow eyebrow--dark"><?php echo esc_html(dms_t('Kemampuan', 'Capabilities')); ?></span>
            <h2><?php echo esc_html(dms_t('Dari infrastruktur ke solusi digital cerdas.', 'From infrastructure to intelligent digital solutions.')); ?></h2>
            <div class="capability-chips">
                <?php foreach ($capabilities as $item) : ?><span><i></i><?php echo esc_html($item); ?></span><?php endforeach; ?>
            </div>
            <a class="text-link" href="<?php echo esc_url($about_url); ?>"><?php echo esc_html(dms_t('Lebih lanjut tentang DMS', 'More about DMS')); ?> <span>→</span></a>
        </div>
        <div class="capabilities-home__visual" data-reveal>
            <img src="<?php echo esc_url(dms_asset('images/service-active.webp')); ?>" alt="<?php echo esc_attr(dms_t('Kemampuan solusi DMS', 'DMS solution capability')); ?>" loading="lazy" width="900" height="1120">
            <div><strong>XX+</strong><span><?php echo esc_html(dms_t('Proyek Diimplementasikan', 'Projects Implemented')); ?></span></div>
        </div>
    </div>
</section>

<div class="wave wave--white-to-soft" aria-hidden="true"><svg viewBox="0 0 1440 70" preserveAspectRatio="none"><path d="M0 20c360 50 720-10 1080 30 170 18 285-15 360-30v50H0Z"/></svg></div>
<section class="section section--soft implementations">
    <div class="container section-heading" data-reveal><span class="eyebrow eyebrow--dark"><?php echo esc_html(dms_t('Teknologi dalam Aksi', 'Technology in Action')); ?></span><h2><?php echo esc_html(dms_t('Teknologi dalam Aksi', 'Technology in Action')); ?></h2></div>
    <div class="container implementation-list" data-stagger>
        <?php foreach ($implementations as $index => [$image, $industry, $category, $title, $copy]) : ?>
            <article class="implementation-card <?php echo $index % 2 ? 'implementation-card--reverse' : ''; ?>">
                <div class="implementation-card__media"><img src="<?php echo esc_url(dms_asset('images/' . $image)); ?>" alt="<?php echo esc_attr($title); ?>" loading="lazy" width="1200" height="820"><span><?php echo esc_html($industry); ?></span></div>
                <div class="implementation-card__body"><b><?php echo esc_html(sprintf('%02d', $index + 1)); ?></b><small><?php echo esc_html($category); ?></small><h3><?php echo esc_html($title); ?></h3><p><?php echo esc_html($copy); ?></p></div>
            </article>
        <?php endforeach; ?>
    </div>
</section>

<div class="wave wave--soft-to-dark" aria-hidden="true"><svg viewBox="0 0 1440 70" preserveAspectRatio="none"><path d="M0 35c350-36 690 40 1060-2 190-22 290 15 380 2v35H0Z"/></svg></div>
<section class="section section--dark why-home">
    <div class="container section-heading section-heading--center" data-reveal><span class="eyebrow eyebrow--center"><?php echo esc_html(dms_t('Mengapa Memilih DMS', 'Why Choose DMS')); ?></span><h2><?php echo esc_html(dms_t('Mengapa Digital Multi Sinergy.', 'Why Digital Multi Sinergy.')); ?></h2></div>
    <div class="container pillars" data-stagger>
        <article><span>◈</span><h3><?php echo esc_html(dms_t('Solusi Andal', 'Reliable Solutions')); ?></h3><p><?php echo esc_html(dms_t('Produk dan solusi terbukti yang menjawab kebutuhan infrastruktur telekomunikasi dan enterprise modern.', 'Proven products and solutions that answer modern telecommunications and enterprise infrastructure needs.')); ?></p></article>
        <article><span>◉</span><h3><?php echo esc_html(dms_t('Keahlian Teknis', 'Technical Expertise')); ?></h3><p><?php echo esc_html(dms_t('Pengetahuan produk mendalam dengan pengalaman deployment fiber optik, jaringan, dan solusi IT.', 'Deep product knowledge with hands-on fiber optic, network, and IT deployment experience.')); ?></p></article>
        <article><span>◆</span><h3><?php echo esc_html(dms_t('Fokus Implementasi', 'Implementation Focus')); ?></h3><p><?php echo esc_html(dms_t('Solusi lengkap dari konsultasi, instalasi, commissioning, hingga dukungan teknis berkelanjutan.', 'Complete solutions from consultation and installation to commissioning and ongoing technical support.')); ?></p></article>
    </div>
</section>

<div class="wave wave--dark-to-white" aria-hidden="true"><svg viewBox="0 0 1440 70" preserveAspectRatio="none"><path d="M0 30c460 50 940-35 1440 2v38H0Z"/></svg></div>
<section class="partners">
    <div class="container" data-reveal><span class="eyebrow eyebrow--dark eyebrow--center"><?php echo esc_html(dms_t('Ekosistem Teknologi Terpercaya', 'Trusted Technology Ecosystem')); ?></span><h2><?php echo esc_html(dms_t('Mitra teknologi & sertifikasi', 'Technology partners & certifications')); ?></h2><div class="partner-list"><?php foreach (['Telco Partner 01','Enterprise Client 02','Gov. Agency 03','ISP Partner 04','Tech Vendor 05','Infrastructure Co. 06'] as $partner) : ?><span><?php echo esc_html($partner); ?></span><?php endforeach; ?></div></div>
</section>

<div class="wave wave--white-to-soft" aria-hidden="true"><svg viewBox="0 0 1440 70" preserveAspectRatio="none"><path d="M0 20c360 50 720-10 1080 30 170 18 285-15 360-30v50H0Z"/></svg></div>
<section class="section section--soft latest-news">
    <div class="container section-heading section-heading--inline" data-reveal><div><span class="eyebrow eyebrow--dark"><?php echo esc_html(dms_t('Wawasan & Pembaruan', 'Insights & Updates')); ?></span><h2><?php echo esc_html(dms_t('Berita Terbaru', 'Latest News')); ?></h2></div><a class="text-link" href="<?php echo esc_url(home_url('/news/')); ?>"><?php echo esc_html(dms_t('Semua Artikel', 'All Articles')); ?> <span>→</span></a></div>
    <div class="container news-grid" data-stagger>
        <?php $news = new WP_Query(['post_type' => 'post', 'posts_per_page' => 3]); if ($news->have_posts()) : while ($news->have_posts()) : $news->the_post(); ?>
            <article class="news-card"><a class="news-card__media" href="<?php the_permalink(); ?>"><?php dms_image_or_placeholder(get_the_ID(), 'large'); ?></a><div class="news-card__body"><div class="news-card__meta"><span><?php $cats = get_the_category(); echo esc_html($cats ? $cats[0]->name : dms_t('Berita', 'News')); ?></span><time><?php echo esc_html(get_the_date()); ?></time></div><h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3><p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 18)); ?></p><a class="text-link" href="<?php the_permalink(); ?>"><?php echo esc_html(dms_t('Baca Artikel', 'Read Article')); ?> <span>→</span></a></div></article>
        <?php endwhile; wp_reset_postdata(); else : ?><p><?php echo esc_html(dms_t('Belum ada artikel.', 'No articles yet.')); ?></p><?php endif; ?>
    </div>
</section>
<?php get_footer(); ?>
