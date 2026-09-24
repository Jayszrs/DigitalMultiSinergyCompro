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
        ['Home', home_url('/')],
        ['About Us', home_url('/about-us/')],
        ['Products', get_post_type_archive_link('dms_product') ?: home_url('/products/')],
        ['News', home_url('/news/')],
        ['Career', get_post_type_archive_link('dms_job') ?: home_url('/career/')],
        ['Contact', home_url('/contact-us/')],
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
        echo '<span class="is-active">ID</span><span class="lang-switch__sep">/</span><span>EN</span>';
    }
    echo '</div>';
}

function dms_image_or_placeholder(int $post_id, string $size = 'large', string $class = ''): void {
    if (has_post_thumbnail($post_id)) {
        echo get_the_post_thumbnail($post_id, $size, ['class' => $class, 'loading' => 'lazy']);
        return;
    }
    printf('<div class="media-placeholder %s" aria-hidden="true"><span></span><span></span><span></span></div>', esc_attr($class));
}
