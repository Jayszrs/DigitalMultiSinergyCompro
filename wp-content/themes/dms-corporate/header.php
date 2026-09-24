<?php if (!defined('ABSPATH')) { exit; } ?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#07182d">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link screen-reader-text" href="#main-content"><?php echo esc_html(dms_t('Lewati ke konten', 'Skip to content')); ?></a>
<header class="site-header" data-site-header>
    <div class="container site-header__inner">
        <a class="brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Digital Multi Sinergy">
            <img src="<?php echo esc_url(dms_logo_url()); ?>" width="44" height="44" alt="">
            <span class="brand__copy"><strong>Digital Multi Sinergy</strong><small>Technology &amp; Connectivity</small></span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" data-nav-toggle>
            <span></span><span></span><span></span><span class="screen-reader-text"><?php echo esc_html(dms_t('Buka menu', 'Open menu')); ?></span>
        </button>
        <nav class="site-nav" id="site-navigation" data-nav aria-label="<?php echo esc_attr(dms_t('Navigasi utama', 'Primary navigation')); ?>">
            <?php if (function_exists('pll_the_languages')) {
                wp_nav_menu([
                    'theme_location' => 'primary',
                    'container' => false,
                    'menu_class' => 'site-nav__list',
                    'fallback_cb' => 'dms_primary_menu_fallback',
                ]);
            } else {
                dms_primary_menu_fallback();
            } ?>
            <?php dms_language_switcher(); ?>
            <a class="button button--sm site-nav__cta" href="<?php echo esc_url(home_url('/contact-us/')); ?>"><?php echo esc_html(dms_t('Konsultasi Gratis', 'Free Consultation')); ?></a>
        </nav>
    </div>
</header>
<main id="main-content">
