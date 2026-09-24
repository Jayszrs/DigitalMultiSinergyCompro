</main>
<footer class="site-footer">
    <div class="container footer-grid">
        <div>
            <a class="brand brand--footer" href="<?php echo esc_url(home_url('/')); ?>">
                <img src="<?php echo esc_url(dms_logo_url()); ?>" alt="Digital Multi Sinergy">
                <span>Digital Multi Sinergy</span>
            </a>
            <p>Technology, connectivity, products and implementation for modern businesses.</p>
        </div>
        <div>
            <h3>Explore</h3>
            <?php wp_nav_menu(['theme_location' => 'footer', 'container' => false, 'menu_class' => 'footer-links', 'fallback_cb' => false]); ?>
        </div>
        <div>
            <h3>Contact</h3>
            <p><?php echo esc_html(get_theme_mod('dms_address', 'Company office address')); ?></p>
            <p><a href="mailto:<?php echo esc_attr(get_theme_mod('dms_email', get_option('admin_email'))); ?>"><?php echo esc_html(get_theme_mod('dms_email', get_option('admin_email'))); ?></a></p>
            <p><?php echo esc_html(get_theme_mod('dms_phone', '+62 ...')); ?></p>
        </div>
    </div>
    <div class="container footer-bottom">
        <span>© <?php echo esc_html(date('Y')); ?> Digital Multi Sinergy</span>
        <span>Privacy · Terms</span>
    </div>
    <div class="footer-wordmark" aria-hidden="true">DIGITAL MULTI SINERGY</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
