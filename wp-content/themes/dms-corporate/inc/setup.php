<?php
if (!defined('ABSPATH')) { exit; }

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', [
        'height' => 120,
        'width' => 120,
        'flex-width' => true,
        'flex-height' => true,
    ]);
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
    register_nav_menus([
        'primary' => __('Primary Menu', 'dms'),
        'footer' => __('Footer Menu', 'dms'),
    ]);
    load_theme_textdomain('dms', DMS_THEME_DIR . '/languages');
});

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('dms-fonts', 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap', [], null);
    wp_enqueue_style('dms-main', DMS_THEME_URI . '/assets/css/main.css', [], DMS_THEME_VERSION);
    wp_enqueue_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', [], '3.12.5', true);
    wp_enqueue_script('gsap-scrolltrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', ['gsap'], '3.12.5', true);
    wp_enqueue_script('dms-main', DMS_THEME_URI . '/assets/js/main.js', ['gsap', 'gsap-scrolltrigger'], DMS_THEME_VERSION, true);
});

function dms_logo_url(): string {
    $custom_logo_id = get_theme_mod('custom_logo');
    if ($custom_logo_id) {
        $src = wp_get_attachment_image_url($custom_logo_id, 'full');
        if ($src) return $src;
    }
    return DMS_THEME_URI . '/assets/images/dms-logo.png';
}

function dms_primary_menu_fallback(): void {
    $items = [
        [dms_t('Beranda', 'Home'), home_url('/')],
        [dms_t('Tentang', 'About Us'), home_url('/about-us/')],
        [dms_t('Produk', 'Products'), get_post_type_archive_link('dms_product') ?: home_url('/products/')],
        [dms_t('Berita', 'News'), home_url('/news/')],
        [dms_t('Karir', 'Career'), get_post_type_archive_link('dms_job') ?: home_url('/career/')],
        [dms_t('Kontak', 'Contact'), home_url('/contact-us/')],
    ];
    echo '<ul class="site-nav__list">';
    foreach ($items as [$label, $url]) {
        printf('<li><a href="%s">%s</a></li>', esc_url($url), esc_html($label));
    }
    echo '</ul>';
}

function dms_language_switcher(): void {
    echo '<div class="lang-switch" aria-label="Language selector">';
    if (function_exists('pll_the_languages')) {
        pll_the_languages(['show_flags' => 0, 'show_names' => 1, 'hide_current' => 0]);
    } else {
        printf(
            '<a class="%s" href="%s">ID</a><span class="lang-switch__sep">/</span><a class="%s" href="%s">EN</a>',
            dms_lang() === 'id' ? 'is-active' : '',
            esc_url(add_query_arg('dms_lang', 'id')),
            dms_lang() === 'en' ? 'is-active' : '',
            esc_url(add_query_arg('dms_lang', 'en'))
        );
    }
    echo '</div>';
}

function dms_image_or_placeholder(int $post_id, string $size = 'large', string $class = ''): void {
    if (has_post_thumbnail($post_id)) {
        echo get_the_post_thumbnail($post_id, $size, ['class' => $class, 'loading' => 'lazy']);
        return;
    }
    $fallback = 'images/implementation-digital.webp';
    if (get_post_type($post_id) === 'dms_product') {
        $terms = get_the_terms($post_id, 'dms_product_category');
        $slug = ($terms && !is_wp_error($terms)) ? $terms[0]->slug : '';
        $fallback = $slug === 'active' ? 'images/service-active.webp' :
            (str_contains($slug, 'fttx') ? 'images/service-fttx.webp' :
            (str_contains($slug, 'software') || str_contains($slug, 'ai') ? 'images/service-software.webp' : 'images/hero-fiber.webp'));
    }
    printf(
        '<img class="%s" src="%s" alt="%s" loading="lazy" width="960" height="640">',
        esc_attr($class),
        esc_url(dms_asset($fallback)),
        esc_attr(get_the_title($post_id))
    );
}

add_filter('wp_headers', function (array $headers): array {
    $headers['X-Content-Type-Options'] = 'nosniff';
    $headers['X-Frame-Options'] = 'SAMEORIGIN';
    $headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
    $headers['Permissions-Policy'] = 'camera=(), microphone=(), geolocation=()';
    return $headers;
});

remove_action('wp_head', 'wp_generator');
