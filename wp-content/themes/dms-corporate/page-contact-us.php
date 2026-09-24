<?php get_header();
$state = sanitize_key(wp_unslash($_GET['inquiry'] ?? ''));
$product = sanitize_text_field(wp_unslash($_GET['product'] ?? ''));
?>
<section class="page-hero section--dark compact-hero"><div class="container" data-reveal><span class="eyebrow"><?php echo esc_html(dms_t('Hubungi Kami', 'Contact Us')); ?></span><h1><?php echo esc_html(dms_t('Mari Diskusikan Proyek Anda.', "Let's Discuss Your Project.")); ?></h1><p><?php echo esc_html(dms_t('Ceritakan apa yang Anda bangun dan tim kami akan membantu mengidentifikasi solusi yang tepat.', 'Tell us what you are building and our team will help identify the right solution.')); ?></p></div></section>
<div class="wave wave--dark-to-white" aria-hidden="true"><svg viewBox="0 0 1440 70" preserveAspectRatio="none"><path d="M0 30c430 42 960-24 1440 5v35H0Z"/></svg></div>
<section class="section section--flush-top"><div class="container contact-grid">
<div data-reveal><div class="section-heading"><h2><?php echo esc_html(dms_t('Kirim pertanyaan', 'Send us an inquiry')); ?></h2></div>
<?php
if ($state === 'success') echo '<div class="form-notice form-notice--success">' . esc_html(dms_t('Terima kasih. Pertanyaan Anda telah kami terima.', 'Thank you. Your inquiry has been received.')) . '</div>';
elseif (in_array($state, ['invalid','error'], true)) echo '<div class="form-notice form-notice--error">' . esc_html(dms_t('Mohon periksa kembali data wajib pada formulir.', 'Please check the required form fields.')) . '</div>';
elseif ($state === 'limited') echo '<div class="form-notice form-notice--error">' . esc_html(dms_t('Mohon tunggu sebentar sebelum mengirim kembali.', 'Please wait a moment before submitting again.')) . '</div>';
?>
<form class="contact-form" method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
    <input type="hidden" name="action" value="dms_submit_inquiry"><input type="hidden" name="form_started" value="<?php echo esc_attr(time()); ?>"><?php wp_nonce_field('dms_contact','dms_contact_nonce'); ?>
    <label class="form-hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
    <div class="form-grid"><label><?php echo esc_html(dms_t('Nama Lengkap', 'Full Name')); ?> *<input name="name" autocomplete="name" required></label><label><?php echo esc_html(dms_t('Perusahaan', 'Company')); ?><input name="company" autocomplete="organization"></label><label>Email *<input type="email" name="email" autocomplete="email" required></label><label><?php echo esc_html(dms_t('Telepon', 'Phone')); ?><input type="tel" name="phone" autocomplete="tel"></label></div>
    <label><?php echo esc_html(dms_t('Jenis Pertanyaan', 'Inquiry Type')); ?><select name="inquiry_type"><option value="Product Inquiry" <?php selected((bool)$product); ?>><?php echo esc_html(dms_t('Pertanyaan Produk', 'Product Inquiry')); ?></option><option value="Connectivity Solution"><?php echo esc_html(dms_t('Solusi Konektivitas', 'Connectivity Solution')); ?></option><option value="IT / Software">IT / Software</option><option value="Partnership"><?php echo esc_html(dms_t('Kemitraan', 'Partnership')); ?></option><option value="Other"><?php echo esc_html(dms_t('Lainnya', 'Other')); ?></option></select></label>
    <label><?php echo esc_html(dms_t('Pesan', 'Message')); ?> *<textarea name="message" rows="7" required placeholder="<?php echo esc_attr($product ? sprintf(dms_t('Saya ingin mendapatkan informasi tentang %s.', 'I would like information about %s.'), $product) : dms_t('Ceritakan kebutuhan proyek Anda...', 'Tell us about your project...')); ?>"></textarea></label>
    <button class="button button--orange" type="submit"><?php echo esc_html(dms_t('Kirim Pertanyaan', 'Send Inquiry')); ?> <span>→</span></button>
</form></div>
<aside class="contact-card" data-reveal><span class="eyebrow"><?php echo esc_html(dms_t('Informasi Kontak', 'Contact Information')); ?></span><h2><?php echo esc_html(dms_t('Mari terhubung.', 'Get in touch.')); ?></h2><dl><dt><?php echo esc_html(dms_t('Alamat', 'Address')); ?></dt><dd><?php echo esc_html(get_theme_mod('dms_address','Jakarta, Indonesia')); ?></dd><dt>Email</dt><dd><a href="mailto:<?php echo esc_attr(get_theme_mod('dms_email', get_option('admin_email'))); ?>"><?php echo esc_html(get_theme_mod('dms_email', get_option('admin_email'))); ?></a></dd><dt><?php echo esc_html(dms_t('Telepon', 'Phone')); ?></dt><dd><?php echo esc_html(get_theme_mod('dms_phone','+62 21 XXXX XXXX')); ?></dd><dt><?php echo esc_html(dms_t('Jam Kerja', 'Business Hours')); ?></dt><dd><?php echo esc_html(get_theme_mod('dms_business_hours','Senin–Jumat, 09.00–17.00 WIB')); ?></dd></dl></aside>
</div></section>
<?php get_footer(); ?>
