<?php
declare(strict_types=1);

$config = require __DIR__ . '/config.php';
require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/Auth.php';
require_once __DIR__ . '/Schema.php';
require_once __DIR__ . '/Cms.php';

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_name('dms_cms_session');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

$db = Database::connect($config['db']);
Schema::migrate($db, $config['seed_admin']);
$cms = new Cms($db);
$auth = new Auth($db);
