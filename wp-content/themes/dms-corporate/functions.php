<?php
if (!defined('ABSPATH')) { exit; }

define('DMS_THEME_VERSION', '0.1.0');
define('DMS_THEME_DIR', get_template_directory());
define('DMS_THEME_URI', get_template_directory_uri());

require_once DMS_THEME_DIR . '/inc/setup.php';
require_once DMS_THEME_DIR . '/inc/content-types.php';
require_once DMS_THEME_DIR . '/inc/meta-boxes.php';
require_once DMS_THEME_DIR . '/inc/customizer.php';
require_once DMS_THEME_DIR . '/inc/contact.php';
