</main>
<footer class="site-footer">
    <div class="footer-orbit" aria-hidden="true"></div>
    <div class="container footer-grid">
        <div class="footer-intro">
            <a class="brand brand--footer" href="<?php echo esc_url(home_url('/')); ?>">
                <img src="<?php echo esc_url(dms_logo_url()); ?>" width="54" height="54" alt="">
                <span class="brand__copy"><strong>Digital Multi Sinergy</strong><small>Technology &amp; Connectivity</small></span>
            </a>
            <p><?php echo esc_html(dms_t('Solusi teknologi, konektivitas, produk, dan implementasi untuk bisnis modern.', 'Technology, connectivity, products and implementation for modern businesses.')); ?></p>
            <a class="footer-email" href="mailto:<?php echo esc_attr(get_theme_mod('dms_email', 'info@digitalmultisinergy.co.id')); ?>"><?php echo esc_html(get_theme_mod('dms_email', 'info@digitalmultisinergy.co.id')); ?></a>
        </div>
        <div>
            <h3><?php echo esc_html(dms_t('Jelajahi', 'Explore')); ?></h3>
            <div class="footer-links"><?php if (function_exists('pll_the_languages')) {
                wp_nav_menu(['theme_location' => 'footer', 'container' => false, 'menu_class' => 'footer-links', 'fallback_cb' => 'dms_primary_menu_fallback']);
            } else {
                dms_primary_menu_fallback();
            } ?></div>
        </div>
        <div>
            <h3><?php echo esc_html(dms_t('Hubungi Kami', 'Contact')); ?></h3>
            <address><?php echo nl2br(esc_html(get_theme_mod('dms_address', 'Jakarta, Indonesia'))); ?></address>
            <p><a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', get_theme_mod('dms_phone', '+62 21 XXXX XXXX'))); ?>"><?php echo esc_html(get_theme_mod('dms_phone', '+62 21 XXXX XXXX')); ?></a></p>
            <p><?php echo esc_html(get_theme_mod('dms_business_hours', 'Senin–Jumat, 09.00–17.00 WIB')); ?></p>
        </div>
    </div>
    <div class="container footer-bottom">
        <span>&copy; <?php echo esc_html(date('Y')); ?> Digital Multi Sinergy</span>
        <span><?php echo esc_html(dms_t('Hak cipta dilindungi.', 'All rights reserved.')); ?></span>
    </div>
    <div class="footer-wordmark" aria-hidden="true">DIGITAL MULTI SINERGY</div>
</footer>
<a class="whatsapp" href="<?php echo esc_url('https://wa.me/' . preg_replace('/\D/', '', get_theme_mod('dms_whatsapp', '6280000000000'))); ?>" target="_blank" rel="noopener" aria-label="WhatsApp">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.5-1.7a11.7 11.7 0 0 0 5.4 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.4Zm-8.3 18.2h-.1c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 8.5 4.7Zm5.4-7.3c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.2 1 3.1 1 4.2.8.7-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.2-.3-.4-.4-.7-.5Z"/></svg>
</a>
<?php wp_footer(); ?>
</body>
</html>
