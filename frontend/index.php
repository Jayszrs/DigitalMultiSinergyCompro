<?php
declare(strict_types=1);

require dirname(__DIR__) . '/backend/bootstrap.php';

$currentLanguage = current_language();

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: camera=(), microphone=(), geolocation=()');

$path = '/' . trim((string) parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/');
$path = $path === '//' ? '/' : $path;
$method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
$settings = $cms->settings();

if ($path === '/health') {
    header('Content-Type: text/plain; charset=utf-8');
    echo 'OK';
    exit;
}

function save_uploaded_image(): ?string
{
    if (empty($_FILES['image_upload']['tmp_name']) || $_FILES['image_upload']['error'] !== UPLOAD_ERR_OK) return null;
    if ($_FILES['image_upload']['size'] > 5 * 1024 * 1024) throw new RuntimeException('Ukuran gambar maksimal 5 MB.');
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($_FILES['image_upload']['tmp_name']);
    $extensions = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
    if (!isset($extensions[$mime])) throw new RuntimeException('Format gambar harus JPG, PNG, atau WebP.');
    $directory = __DIR__ . '/uploads';
    if (!is_dir($directory)) mkdir($directory, 0775, true);
    $filename = bin2hex(random_bytes(12)) . '.' . $extensions[$mime];
    if (!move_uploaded_file($_FILES['image_upload']['tmp_name'], $directory . '/' . $filename)) throw new RuntimeException('Gagal menyimpan gambar.');
    return '/uploads/' . $filename;
}

if ($path === '/admin/login' && $method === 'POST') {
    verify_csrf();
    $attempts = (int) ($_SESSION['login_attempts'] ?? 0);
    $blockedUntil = (int) ($_SESSION['login_blocked_until'] ?? 0);
    if ($blockedUntil > time()) {
        flash('error', 'Terlalu banyak percobaan. Coba lagi beberapa menit.');
        redirect('admin/login');
    }
    if ($auth->attempt((string) ($_POST['email'] ?? ''), (string) ($_POST['password'] ?? ''))) {
        unset($_SESSION['login_attempts'], $_SESSION['login_blocked_until']);
        redirect('admin');
    }
    $_SESSION['login_attempts'] = ++$attempts;
    if ($attempts >= 5) $_SESSION['login_blocked_until'] = time() + 300;
    flash('error', 'Email atau password salah.');
    redirect('admin/login');
}

if ($path === '/admin/logout' && $method === 'POST') {
    verify_csrf();
    $auth->logout();
    redirect('admin/login');
}

if ($path === '/admin/settings' && $method === 'POST') {
    $auth->requireLogin();
    verify_csrf();
    $cms->saveSettings($_POST);
    flash('success', 'Pengaturan perusahaan berhasil disimpan.');
    redirect('admin?tab=settings');
}

if ($path === '/admin/content/save' && $method === 'POST') {
    $auth->requireLogin();
    verify_csrf();
    $type = (string) ($_POST['type'] ?? '');
    try {
        $upload = save_uploaded_image();
        if ($upload) $_POST['image'] = $upload;
        $id = isset($_POST['id']) && ctype_digit((string) $_POST['id']) ? (int) $_POST['id'] : null;
        $cms->save($type, $_POST, $id);
        flash('success', 'Konten berhasil disimpan.');
    } catch (Throwable $error) {
        flash('error', 'Konten gagal disimpan: ' . $error->getMessage());
    }
    redirect('admin?tab=' . urlencode($type));
}

if ($path === '/admin/content/delete' && $method === 'POST') {
    $auth->requireLogin();
    verify_csrf();
    $type = (string) ($_POST['type'] ?? '');
    $cms->delete($type, (int) ($_POST['id'] ?? 0));
    flash('success', 'Konten berhasil dihapus.');
    redirect('admin?tab=' . urlencode($type));
}

if ($path === '/admin/inquiry/status' && $method === 'POST') {
    $auth->requireLogin();
    verify_csrf();
    $cms->updateInquiry((int) ($_POST['id'] ?? 0), (string) ($_POST['status'] ?? 'new'));
    flash('success', 'Status inquiry diperbarui.');
    redirect('admin?tab=inquiries');
}

if ($path === '/contact/submit' && $method === 'POST') {
    verify_csrf();
    $started = (int) ($_POST['form_started'] ?? 0);
    $honeypot = trim((string) ($_POST['website'] ?? ''));
    if ($honeypot || !$started || time() - $started < 2 || time() - $started > 86400) {
        flash('error', tr('Form tidak valid. Silakan coba lagi.', 'Invalid form. Please try again.'));
        redirect('contact');
    }
    $name = trim((string) ($_POST['name'] ?? ''));
    $email = filter_var(trim((string) ($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
    $message = trim((string) ($_POST['message'] ?? ''));
    if (!$name || !$email || !$message) {
        flash('error', tr('Lengkapi nama, email, dan pesan.', 'Please complete name, email, and message.'));
        redirect('contact');
    }
    if (!empty($_SESSION['last_inquiry']) && time() - (int) $_SESSION['last_inquiry'] < 120) {
        flash('error', tr('Mohon tunggu sebelum mengirim kembali.', 'Please wait before submitting again.'));
        redirect('contact');
    }
    $cms->createInquiry([
        'name' => mb_substr($name, 0, 150), 'company' => mb_substr(trim((string) ($_POST['company'] ?? '')), 0, 150),
        'email' => $email, 'phone' => mb_substr(trim((string) ($_POST['phone'] ?? '')), 0, 80),
        'inquiry_type' => mb_substr(trim((string) ($_POST['inquiry_type'] ?? 'General')), 0, 100), 'message' => mb_substr($message, 0, 5000),
    ]);
    $_SESSION['last_inquiry'] = time();
    flash('success', tr('Terima kasih. Pesan Anda sudah masuk ke CMS kami.', 'Thank you. Your message is now in our CMS.'));
    redirect('contact');
}

if (str_starts_with($path, '/admin')) {
    if ($path === '/admin/login') {
        if ($auth->check()) redirect('admin');
        render('admin/login', ['pageTitle' => 'CMS Login', 'flash' => pull_flash()], 'admin-auth');
        exit;
    }
    $auth->requireLogin();
    $tab = (string) ($_GET['tab'] ?? 'overview');
    $edit = isset($_GET['edit']) && ctype_digit((string) $_GET['edit']) ? $cms->find($tab, (int) $_GET['edit']) : null;
    render('admin/dashboard', [
        'pageTitle' => 'DMS CMS', 'tab' => $tab, 'edit' => $edit, 'flash' => pull_flash(), 'user' => $auth->user(),
        'counts' => $cms->counts(), 'settings' => $settings,
        'products' => $cms->all('products'), 'articles' => $cms->all('articles'), 'jobs' => $cms->all('jobs'), 'inquiries' => $cms->inquiries(),
    ], 'admin');
    exit;
}

if ($path === '/') {
    render('site/home', ['pageTitle' => '', 'settings' => $settings, 'products' => array_slice($cms->all('products', true), 0, 6), 'articles' => array_slice($cms->all('articles', true), 0, 3)]);
} elseif ($path === '/about') {
    render('site/about', ['pageTitle' => tr('Tentang Kami', 'About Us'), 'settings' => $settings]);
} elseif ($path === '/products') {
    $products = $cms->all('products', true);
    $category = trim((string) ($_GET['category'] ?? ''));
    $search = trim((string) ($_GET['q'] ?? ''));
    if ($category) $products = array_values(array_filter($products, fn($item) => $item['category'] === $category));
    if ($search) $products = array_values(array_filter($products, fn($item) => str_contains(strtolower($item['title'] . ' ' . $item['title_en']), strtolower($search))));
    render('site/products', ['pageTitle' => tr('Produk', 'Products'), 'settings' => $settings, 'products' => $products, 'category' => $category, 'search' => $search]);
} elseif (preg_match('#^/products/([a-z0-9-]+)$#', $path, $matches)) {
    $product = $cms->findBySlug('products', $matches[1]);
    if (!$product) { http_response_code(404); render('site/404', ['pageTitle' => '404', 'settings' => $settings]); }
    else {
        $details = json_decode((string) ($product['details_json'] ?? ''), true) ?: [];
        $relatedProducts = [];
        foreach (($details['related'] ?? []) as $slug) if ($related = $cms->findBySlug('products', (string) $slug)) $relatedProducts[] = $related;
        render('site/product', ['pageTitle' => localized($product, 'title'), 'settings' => $settings, 'product' => $product, 'details' => $details, 'relatedProducts' => $relatedProducts]);
    }
} elseif ($path === '/news') {
    render('site/news', ['pageTitle' => tr('Berita', 'News'), 'settings' => $settings, 'articles' => $cms->all('articles', true)]);
} elseif (preg_match('#^/news/([a-z0-9-]+)$#', $path, $matches)) {
    $article = $cms->findBySlug('articles', $matches[1]);
    if (!$article) { http_response_code(404); render('site/404', ['pageTitle' => '404', 'settings' => $settings]); }
    else {
        $relatedArticles = [];
        foreach ((json_decode((string) ($article['related_json'] ?? '[]'), true) ?: []) as $slug) if ($related = $cms->findBySlug('articles', (string) $slug)) $relatedArticles[] = $related;
        render('site/article', ['pageTitle' => localized($article, 'title'), 'settings' => $settings, 'article' => $article, 'relatedArticles' => $relatedArticles]);
    }
} elseif ($path === '/career') {
    render('site/career', ['pageTitle' => tr('Karir', 'Career'), 'settings' => $settings, 'jobs' => $cms->all('jobs', true)]);
} elseif ($path === '/contact') {
    render('site/contact', ['pageTitle' => tr('Kontak', 'Contact'), 'settings' => $settings, 'flash' => pull_flash()]);
} else {
    http_response_code(404);
    render('site/404', ['pageTitle' => '404', 'settings' => $settings]);
}
