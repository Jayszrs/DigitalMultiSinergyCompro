<?php
declare(strict_types=1);

// Shared hosting can keep .env beside the private app directory. Docker injects
// the same keys as real environment variables, so nothing secret is served from public/.
$envFile = dirname(__DIR__) . '/.env';
if (is_file($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) continue;
        [$key, $value] = array_map('trim', explode('=', $line, 2));
        if (!preg_match('/^[A-Z][A-Z0-9_]*$/', $key) || getenv($key) !== false) continue;
        $value = trim($value, "\"'");
        putenv($key . '=' . $value);
        $_ENV[$key] = $value;
    }
}

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
    'company' => [
        'company_name' => getenv('COMPANY_NAME') ?: 'Digital Multi Sinergy',
        'company_tagline' => getenv('COMPANY_TAGLINE') ?: 'Technology & Connectivity',
        'email' => getenv('COMPANY_EMAIL') ?: 'info@digitalmultisinergy.co.id',
        'phone' => getenv('COMPANY_PHONE') ?: '+62 878-9111-8166',
        'whatsapp' => getenv('COMPANY_WHATSAPP') ?: '6287891118166',
        'address' => getenv('COMPANY_ADDRESS') ?: 'Cervino Apartment, Office Floor L1, M, N, Jl. KH Abdullah Syafei No.27, RT.3/RW.1, Tebet Barat, Kec. Tebet, Daerah Khusus Ibukota Jakarta 12810',
        'business_hours' => getenv('COMPANY_HOURS') ?: 'Senin–Jumat, 09.00–17.00 WIB',
        'instagram_url' => getenv('INSTAGRAM_URL') ?: 'https://www.instagram.com/digitalmultisinergy.official',
        'linkedin_url' => getenv('LINKEDIN_URL') ?: 'https://www.linkedin.com/company/digitalmultisinergy',
        'map_query' => getenv('MAP_QUERY') ?: 'Cervino Apartment Office Floor L1 M N Jl KH Abdullah Syafei No 27 Tebet Jakarta 12810',
        'project_count' => getenv('PROJECT_COUNT') ?: '50+',
        'partner_count' => getenv('PARTNER_COUNT') ?: '20+',
        'experience_years' => getenv('EXPERIENCE_YEARS') ?: '4+',
    ],
];
