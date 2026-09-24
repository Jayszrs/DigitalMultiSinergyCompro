<?php
declare(strict_types=1);

return [
    'app_name' => getenv('APP_NAME') ?: 'Digital Multi Sinergy',
    'base_url' => rtrim(getenv('APP_URL') ?: 'http://localhost:8080', '/'),
    'environment' => getenv('APP_ENV') ?: 'local',
    'db' => [
        'host' => getenv('DB_HOST') ?: 'db',
        'port' => getenv('DB_PORT') ?: '3306',
        'name' => getenv('DB_NAME') ?: 'dms_cms',
        'user' => getenv('DB_USER') ?: 'dms',
        'password' => getenv('DB_PASSWORD') ?: 'dms_dev_password',
    ],
    'seed_admin' => [
        'name' => getenv('CMS_ADMIN_NAME') ?: 'DMS Administrator',
        'email' => getenv('CMS_ADMIN_EMAIL') ?: 'admin@dms.local',
        'password' => getenv('CMS_ADMIN_PASSWORD') ?: 'AdminDMS!2026',
    ],
];
