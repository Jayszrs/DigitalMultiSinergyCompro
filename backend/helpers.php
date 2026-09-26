<?php
declare(strict_types=1);

function e(?string $value): string
{
    return htmlspecialchars($value ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function url(string $path = ''): string
{
    global $config;
    return $config['base_url'] . '/' . ltrim($path, '/');
}

function asset(string $path): string
{
    return url('assets/' . ltrim($path, '/'));
}

function versioned_asset(string $path): string
{
    $path = ltrim($path, '/');
    $file = rtrim((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''), '/\\') . '/assets/' . $path;
    return asset($path) . '?v=' . (is_file($file) ? (string) filemtime($file) : '1');
}

function current_language(): string
{
    static $resolvedLanguage = null;

    if ($resolvedLanguage !== null) return $resolvedLanguage;

    $requested = strtolower(trim((string) ($_GET['lang'] ?? '')));
    $resolvedLanguage = in_array($requested, ['id', 'en'], true)
        ? $requested
        : (($_COOKIE['dms_lang'] ?? 'id') === 'en' ? 'en' : 'id');

    if (in_array($requested, ['id', 'en'], true)) {
        if (!headers_sent()) {
            setcookie('dms_lang', $resolvedLanguage, [
                'expires' => time() + 2592000,
                'path' => '/',
                'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
                'httponly' => true,
                'samesite' => 'Lax',
            ]);
        }
        $_COOKIE['dms_lang'] = $resolvedLanguage;
    }

    return $resolvedLanguage;
}

function language_url(string $language): string
{
    $language = $language === 'en' ? 'en' : 'id';
    $path = (string) (parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/');
    $query = $_GET;
    $query['lang'] = $language;

    return url(ltrim($path, '/')) . '?' . http_build_query($query);
}

function tr(string $indonesian, string $english): string
{
    return current_language() === 'en' ? $english : $indonesian;
}

function localized(array $item, string $field): string
{
    $key = current_language() === 'en' ? $field . '_en' : $field;
    return (string) ($item[$key] ?: $item[$field] ?? '');
}

function redirect(string $path): never
{
    header('Location: ' . url($path), true, 303);
    exit;
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    return $_SESSION['csrf_token'];
}

function csrf_field(): string
{
    return '<input type="hidden" name="csrf_token" value="' . e(csrf_token()) . '">';
}

function verify_csrf(): void
{
    $token = (string) ($_POST['csrf_token'] ?? '');
    if (!$token || !hash_equals((string) ($_SESSION['csrf_token'] ?? ''), $token)) {
        http_response_code(419);
        exit('Invalid or expired form token.');
    }
}

function flash(string $type, string $message): void
{
    $_SESSION['flash'] = compact('type', 'message');
}

function pull_flash(): ?array
{
    $flash = $_SESSION['flash'] ?? null;
    unset($_SESSION['flash']);
    return $flash;
}

function render(string $view, array $data = [], string $layout = 'site'): void
{
    $viewFile = dirname(__DIR__) . '/backend/views/' . $view . '.php';
    $layoutFile = dirname(__DIR__) . '/backend/views/layouts/' . $layout . '.php';
    if (!is_file($viewFile) || !is_file($layoutFile)) throw new RuntimeException('View not found.');
    extract($data, EXTR_SKIP);
    ob_start();
    require $viewFile;
    $content = (string) ob_get_clean();
    require $layoutFile;
}

function image_url(?string $image, string $fallback = 'implementation-digital.webp'): string
{
    if (!$image) return asset('images/' . $fallback);
    if (preg_match('#^https?://#', $image)) return $image;
    if (str_starts_with($image, '/')) return url(ltrim($image, '/'));
    return asset('images/' . $image);
}

function slugify(string $value): string
{
    $value = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $value) ?: $value;
    $value = strtolower(trim((string) preg_replace('/[^A-Za-z0-9-]+/', '-', $value), '-'));
    return $value ?: bin2hex(random_bytes(4));
}
