<!doctype html>
<html lang="<?= e(current_language()) ?>">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#07182d">
    <meta name="description" content="Digital Multi Sinergy — solusi ICT, telekomunikasi, konektivitas, software, dan AI.">
    <title><?= $pageTitle ? e($pageTitle) . ' — ' : '' ?>Digital Multi Sinergy</title>
    <link rel="icon" type="image/png" href="<?= e(asset('images/dms-logo.png')) ?>">
    <link rel="apple-touch-icon" href="<?= e(asset('images/dms-logo.png')) ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?= e(versioned_asset('css/app.css')) ?>">
    <link rel="stylesheet" href="<?= e(versioned_asset('css/enhancements.css')) ?>">
</head>
<body>
<a class="sr-only skip-link" href="#main-content"><?= e(tr('Lewati ke konten', 'Skip to content')) ?></a>
<header class="site-header" data-header>
    <div class="container header-inner">
        <a class="brand" href="<?= e(url()) ?>"><img src="<?= e(asset('images/dms-logo.png')) ?>" width="42" height="42" alt=""><span><b>Digital Multi Sinergy</b><small>Technology &amp; Connectivity</small></span></a>
        <button class="menu-toggle" type="button" aria-label="Menu" aria-expanded="false" data-menu-toggle><i></i><i></i><i></i></button>
        <nav class="main-nav" data-menu>
            <a href="<?= e(url()) ?>"><?= e(tr('Beranda','Home')) ?></a><a href="<?= e(url('about')) ?>"><?= e(tr('Tentang','About Us')) ?></a><a href="<?= e(url('products')) ?>"><?= e(tr('Produk','Products')) ?></a><a href="<?= e(url('news')) ?>"><?= e(tr('Berita','News')) ?></a><a href="<?= e(url('career')) ?>"><?= e(tr('Karir','Career')) ?></a><a href="<?= e(url('contact')) ?>"><?= e(tr('Kontak','Contact')) ?></a>
            <span class="language"><a class="<?= current_language() === 'id' ? 'active' : '' ?>" href="<?= e(language_url('id')) ?>">ID</a><i>/</i><a class="<?= current_language() === 'en' ? 'active' : '' ?>" href="<?= e(language_url('en')) ?>">EN</a></span>
            <a class="btn btn-sm" href="<?= e(url('contact')) ?>"><?= e(tr('Konsultasi Gratis','Free Consultation')) ?></a>
        </nav>
    </div>
</header>
<main id="main-content"><?= $content ?></main>
<footer class="site-footer">
    <div class="container footer-grid">
        <div><a class="brand footer-brand" href="<?= e(url()) ?>"><img src="<?= e(asset('images/dms-logo.png')) ?>" width="58" height="58" alt="Digital Multi Sinergy logo"><span><b>Digital Multi Sinergy</b><small>Technology &amp; Connectivity</small></span></a><p><?= e(tr('Solusi teknologi dan konektivitas yang siap membawa bisnis Anda melangkah lebih jauh.','Technology and connectivity solutions ready to move your business forward.')) ?></p><div class="socials"><a href="<?= e($settings['instagram_url']) ?>" target="_blank" rel="noopener">Instagram ↗</a><a href="<?= e($settings['linkedin_url']) ?>" target="_blank" rel="noopener">LinkedIn ↗</a></div></div>
        <div><h3><?= e(tr('Jelajahi','Explore')) ?></h3><a href="<?= e(url('about')) ?>"><?= e(tr('Tentang','About')) ?></a><a href="<?= e(url('products')) ?>"><?= e(tr('Produk','Products')) ?></a><a href="<?= e(url('news')) ?>"><?= e(tr('Berita','News')) ?></a><a href="<?= e(url('career')) ?>"><?= e(tr('Karir','Career')) ?></a></div>
        <div><h3><?= e(tr('Kantor','Office')) ?></h3><p><?= e($settings['address']) ?></p><a href="https://www.google.com/maps/search/?api=1&query=<?= urlencode($settings['map_query']) ?>" target="_blank" rel="noopener"><?= e(tr('Buka Google Maps','Open Google Maps')) ?> ↗</a><a href="mailto:<?= e($settings['email']) ?>"><?= e($settings['email']) ?></a></div>
    </div>
    <div class="container footer-bottom"><span>© <?= date('Y') ?> Digital Multi Sinergy</span><a href="<?= e(url('admin')) ?>">CMS Admin</a></div>
</footer>
<a class="whatsapp" href="https://wa.me/<?= e(preg_replace('/\D/', '', $settings['whatsapp'])) ?>" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.5-1.7a11.7 11.7 0 0 0 5.4 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.4Zm-8.3 18.2h-.1c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 8.5 4.7Zm5.4-7.3c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.2 1 3.1 1 4.2.8.7-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.2-.3-.4-.4-.7-.5Z"/></svg></a>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script><script src="<?= e(versioned_asset('js/app.js')) ?>" defer></script>
</body></html>
