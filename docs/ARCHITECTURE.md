# Arsitektur DMS Website

## Batas frontend dan backend

### Frontend

Frontend berada di `wp-content/themes/dms-corporate`:

- Template PHP di root theme merender HTML dari data WordPress.
- `assets/css/main.css` mengatur visual, responsive breakpoints, dan interaction states.
- `assets/js/main.js` mengatur mobile navigation, GSAP reveal, dan parallax.
- `assets/images` berisi logo serta gambar WebP lokal.

Template tidak menyimpan data bisnis permanen. Product, article, career, inquiry, featured image, dan pengaturan perusahaan berasal dari CMS.

### Backend / CMS

Logic backend theme berada di `wp-content/themes/dms-corporate/inc`:

- `content-types.php`: Products, Product Categories, Careers, Inquiries.
- `meta-boxes.php`: field spesifikasi produk dan detail lowongan.
- `contact.php`: validasi, penyimpanan inquiry, rate limit, dan email.
- `customizer.php`: informasi perusahaan dan pengaturan hero.
- `setup.php`: theme support, menu, assets, fallback image, security headers.

WordPress core dan MySQL adalah backend runtime. Jangan menaruh business logic baru di file CSS/JS atau hard-code content yang seharusnya dikelola editor.

### Infrastructure

- `docker-compose.yml`: WordPress, MySQL, WP-CLI, phpMyAdmin.
- `docker/wordpress.htaccess`: pretty permalink rules khusus local Docker.
- `scripts/bootstrap.*`: install WordPress lokal, aktivasi theme, dan seeding.
- `scripts/seed.php`: sample data idempotent untuk development.

Docker tidak dibutuhkan di shared hosting. Di cPanel, deploy theme ke WordPress yang disediakan hosting.

## Alur data

```text
WordPress Admin → MySQL → WP_Query / Theme API → PHP templates → HTML/CSS/JS
Contact form → nonce + validation → private Inquiry post → wp_mail / SMTP
```

## Menambah fitur

- Field CMS baru: tambah di `inc/meta-boxes.php` atau gunakan plugin field yang disepakati.
- Jenis content baru: tambah di `inc/content-types.php`.
- Halaman baru: buat `page-{slug}.php`.
- Styling baru: tambah di `assets/css/main.css`.
- Interaction baru: tambah progressive enhancement di `assets/js/main.js`.

Pertahankan sanitasi saat menyimpan, escaping saat merender, dan nonce untuk setiap action yang mengubah data.
