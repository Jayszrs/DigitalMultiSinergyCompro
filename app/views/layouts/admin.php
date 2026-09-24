<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title><?= e($pageTitle) ?></title>
    <link rel="icon" type="image/png" href="<?= e(asset('images/dms-logo.png')) ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?= e(versioned_asset('css/admin.css')) ?>">
</head>
<body class="admin-page">
<aside class="admin-sidebar">
    <a class="admin-brand" href="<?= e(url('admin')) ?>"><img src="<?= e(asset('images/dms-logo.png')) ?>" alt=""><span>DMS CMS<small>Content Management</small></span></a>
    <nav><a class="<?= $tab === 'overview' ? 'active' : '' ?>" href="<?= e(url('admin')) ?>">Overview</a><a class="<?= $tab === 'products' ? 'active' : '' ?>" href="<?= e(url('admin?tab=products')) ?>">Products</a><a class="<?= $tab === 'articles' ? 'active' : '' ?>" href="<?= e(url('admin?tab=articles')) ?>">News</a><a class="<?= $tab === 'jobs' ? 'active' : '' ?>" href="<?= e(url('admin?tab=jobs')) ?>">Careers</a><a class="<?= $tab === 'inquiries' ? 'active' : '' ?>" href="<?= e(url('admin?tab=inquiries')) ?>">Inquiries</a><a class="<?= $tab === 'settings' ? 'active' : '' ?>" href="<?= e(url('admin?tab=settings')) ?>">Settings</a></nav>
    <a class="view-site" href="<?= e(url()) ?>" target="_blank">View website ↗</a>
</aside>
<div class="admin-shell"><header class="admin-topbar"><div><b><?= e($user['name']) ?></b><small><?= e($user['email']) ?></small></div><form method="post" action="<?= e(url('admin/logout')) ?>"><?= csrf_field() ?><button>Logout</button></form></header><main><?= $content ?></main></div>
<script src="<?= e(versioned_asset('js/admin.js')) ?>" defer></script>
</body>
</html>
