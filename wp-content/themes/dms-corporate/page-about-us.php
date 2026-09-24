<?php get_header(); ?>
<section class="page-hero section--dark compact-hero">
    <div class="container page-hero__grid">
        <div data-reveal><span class="eyebrow"><?php echo esc_html(dms_t('Tentang Digital Multi Sinergy', 'About Digital Multi Sinergy')); ?></span><h1><?php echo esc_html(dms_t('Teknologi, konektivitas, dan implementasi yang bekerja bersama.', 'Technology, connectivity and implementation working together.')); ?></h1><p><?php echo esc_html(dms_t('Kami membantu organisasi membangun fondasi teknologi yang andal, siap tumbuh, dan relevan untuk masa depan.', 'We help organizations build reliable, scalable technology foundations for what comes next.')); ?></p></div>
        <div class="page-hero__symbol" data-reveal><img src="<?php echo esc_url(dms_logo_url()); ?>" alt="" width="320" height="320"></div>
    </div>
</section>
<div class="wave wave--dark-to-white" aria-hidden="true"><svg viewBox="0 0 1440 70" preserveAspectRatio="none"><path d="M0 30c430 42 960-24 1440 5v35H0Z"/></svg></div>
<section class="section">
    <div class="container content-grid">
        <div data-reveal><span class="eyebrow eyebrow--dark"><?php echo esc_html(dms_t('Profil Perusahaan', 'Company Overview')); ?></span><h2><?php echo esc_html(dms_t('Dibangun untuk organisasi yang membutuhkan teknologi bekerja di dunia nyata.', 'Built for organizations that need technology to work in the real world.')); ?></h2></div>
        <div class="prose" data-reveal><?php while (have_posts()) : the_post(); the_content(); endwhile; ?><p><?php echo esc_html(dms_t('Digital Multi Sinergy menyediakan produk, solusi, dan dukungan implementasi di bidang telekomunikasi, konektivitas, IT, perangkat lunak, dan kecerdasan buatan.', 'Digital Multi Sinergy provides products, solutions and implementation support across telecommunications, connectivity, IT, software and artificial intelligence.')); ?></p><p><?php echo esc_html(dms_t('Kami menggabungkan pemahaman teknis, pemilihan produk yang tepat, serta eksekusi lapangan untuk memberikan hasil yang dapat diandalkan.', 'We combine technical understanding, appropriate product selection, and field execution to deliver dependable outcomes.')); ?></p></div>
    </div>
</section>
<section class="section section--soft"><div class="container three-grid" data-stagger>
    <article class="info-card"><span class="meta">01</span><h3><?php echo esc_html(dms_t('Kemampuan', 'Capabilities')); ?></h3><p><?php echo esc_html(dms_t('Produk, solusi, dan implementasi terpadu di bidang konektivitas dan teknologi.', 'Integrated products, solutions and implementation across connectivity and technology.')); ?></p></article>
    <article class="info-card"><span class="meta">02</span><h3><?php echo esc_html(dms_t('Prinsip Kerja', 'Working Principle')); ?></h3><p><?php echo esc_html(dms_t('Jelas dalam perencanaan, disiplin dalam implementasi, dan bertanggung jawab pada hasil.', 'Clear in planning, disciplined in implementation, and accountable for outcomes.')); ?></p></article>
    <article class="info-card"><span class="meta">03</span><h3><?php echo esc_html(dms_t('Industri', 'Industries')); ?></h3><p><?php echo esc_html(dms_t('Telekomunikasi, enterprise, pemerintah, infrastruktur, dan teknologi.', 'Telecommunications, enterprise, government, infrastructure, and technology.')); ?></p></article>
</div></section>
<section class="section"><div class="container section-heading" data-reveal><span class="eyebrow eyebrow--dark"><?php echo esc_html(dms_t('Cara Kami Bekerja', 'Our Approach')); ?></span><h2><?php echo esc_html(dms_t('Jelas dari kebutuhan hingga implementasi.', 'Clarity from requirement to implementation.')); ?></h2></div><div class="container process-grid" data-stagger>
    <article><span>01</span><h3><?php echo esc_html(dms_t('Memahami', 'Understand')); ?></h3><p><?php echo esc_html(dms_t('Memetakan kebutuhan bisnis, operasional, dan infrastruktur.', 'Clarify business, operational, and infrastructure requirements.')); ?></p></article>
    <article><span>02</span><h3><?php echo esc_html(dms_t('Merancang', 'Design')); ?></h3><p><?php echo esc_html(dms_t('Menentukan kombinasi produk, sistem, dan metode implementasi yang tepat.', 'Define the right mix of products, systems, and implementation methods.')); ?></p></article>
    <article><span>03</span><h3><?php echo esc_html(dms_t('Menghadirkan', 'Deliver')); ?></h3><p><?php echo esc_html(dms_t('Mengeksekusi dengan fokus pada keandalan dan kemudahan pemeliharaan.', 'Execute with a focus on reliability and maintainability.')); ?></p></article>
</div></section>
<?php get_footer(); ?>
