<?php if (!defined('ABSPATH')) { exit; } ?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header" data-site-header>
    <div class="container site-header__inner">
        <a class="brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Digital Multi Sinergy home">
            <img src="<?php echo esc_url(dms_logo_url()); ?>" alt="Digital Multi Sinergy">
            <span>Digital Multi Sinergy</span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" data-nav-toggle>
            <span></span><span></span><span></span><span class="screen-reader-text">Menu</span>
        </button>
        <nav class="site-nav" id="site-navigation" data-nav>
            <?php wp_nav_menu([
                'theme_location' => 'primary',
                'container' => false,
                'menu_class' => 'site-nav__list',
                'fallback_cb' => 'dms_primary_menu_fallback',
            ]); ?>
            <?php dms_language_switcher(); ?>
            <a class="button button--sm site-nav__cta" href="<?php echo esc_url(home_url('/contact-us/')); ?>">Discuss a Project</a>
        </nav>
    </div>
</header>
<main id="main-content">
