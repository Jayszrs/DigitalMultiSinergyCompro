<?php
if (!defined('ABSPATH')) { exit; }

define('DMS_THEME_VERSION', '1.0.0');
define('DMS_THEME_DIR', get_template_directory());
define('DMS_THEME_URI', get_template_directory_uri());

require_once DMS_THEME_DIR . '/inc/setup.php';
require_once DMS_THEME_DIR . '/inc/content-types.php';
require_once DMS_THEME_DIR . '/inc/meta-boxes.php';
require_once DMS_THEME_DIR . '/inc/customizer.php';
require_once DMS_THEME_DIR . '/inc/contact.php';

function dms_asset(string $path): string {
    return DMS_THEME_URI . '/assets/' . ltrim($path, '/');
}

function dms_lang(): string {
    if (function_exists('pll_current_language')) {
        $language = pll_current_language('slug');
        if ($language) return strtolower((string) $language);
    }
    $requested = sanitize_key(wp_unslash($_GET['dms_lang'] ?? ''));
    if (in_array($requested, ['id', 'en'], true)) return $requested;
    $saved = sanitize_key(wp_unslash($_COOKIE['dms_lang'] ?? ''));
    return $saved === 'en' ? 'en' : 'id';
}

function dms_t(string $indonesian, string $english): string {
    return dms_lang() === 'en' ? $english : $indonesian;
}

add_action('init', function (): void {
    if (function_exists('pll_current_language')) return;
    $language = sanitize_key(wp_unslash($_GET['dms_lang'] ?? ''));
    if (!in_array($language, ['id', 'en'], true)) return;
    setcookie('dms_lang', $language, [
        'expires' => time() + MONTH_IN_SECONDS,
        'path' => COOKIEPATH ?: '/',
        'secure' => is_ssl(),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    $_COOKIE['dms_lang'] = $language;
});
