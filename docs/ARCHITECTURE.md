# Arsitektur DMS Custom CMS

## Batas frontend dan backend

### Frontend publik

- `app/views/site/`: template halaman home, about, products, news, careers, contact, dan detail.
- `app/views/layouts/site.php`: header, navigasi, footer, metadata, social links, dan WhatsApp.
- `public/assets/css/app.css`: design system, responsive layout, serta state interaksi.
- `public/assets/js/app.js`: mobile menu, header state, GSAP reveal, dan parallax.
- `public/assets/images/`: logo serta gambar WebP bawaan.

Template hanya merender data. Produk, artikel, lowongan, inquiry, dan pengaturan perusahaan disimpan di database dan dikelola melalui CMS.

### Backend dan CMS

- `public/index.php`: router publik/admin, form handler, upload validation, serta security headers.
- `app/bootstrap.php`: session, koneksi database, migration, dan dependency wiring.
- `app/Database.php`: koneksi PDO dengan prepared statement native.
- `app/Schema.php`: schema idempotent dan dummy data development.
- `app/data/catalog.json`: katalog lengkap hasil migrasi prototype lama tanpa membawa kembali runtime React.
- `app/Cms.php`: query dan operasi CRUD yang diizinkan.
- `app/Auth.php`: autentikasi admin dan session regeneration.
- `app/views/admin/`: dashboard serta form pengelolaan konten.
- `public/assets/css/admin.css` dan `public/assets/js/admin.js`: tampilan CMS responsive.

Folder `app/` tidak boleh menjadi document root. Hanya folder `public/` yang boleh dapat diakses langsung dari web.

## Alur data

```text
Admin browser → session + CSRF → PHP CMS service → PDO → MySQL/MariaDB
Public browser → PHP router → CMS query → server-side view → HTML/CSS/JS
Contact form → honeypot + validation + rate limit → cms_inquiries → Admin CMS
Image upload → MIME/size validation → public/uploads → URL konten
```

## Database

- `cms_users`: akun administrator dengan password hash.
- `cms_settings`: profil perusahaan, social link, maps, dan statistik.
- `cms_products`: katalog bilingual dan spesifikasi JSON.
- `cms_articles`: berita bilingual dan waktu publish.
- `cms_jobs`: lowongan bilingual.
- `cms_inquiries`: pesan dari form kontak dan status follow-up.

Semua tabel memakai prefix `cms_`, sehingga aman berdampingan dengan tabel lama selama masa migrasi. Untuk production baru, gunakan database kosong.

## Security baseline

- Password disimpan memakai `password_hash` dan dicek dengan `password_verify`.
- Login meregenerasi session ID dan dibatasi setelah percobaan gagal berulang.
- Semua action perubahan data memakai POST + CSRF token.
- Query dinamis hanya memilih tabel dari allowlist; nilai user memakai prepared statement.
- Upload dibatasi 5 MB dan hanya menerima MIME JPEG, PNG, atau WebP.
- Output user/CMS di-escape sebelum masuk HTML.
- Security headers dan directory listing protection dipasang dari aplikasi/`.htaccess`.
- Secret dan konfigurasi runtime berada di `.env` di luar `public/`; akses web ke dotfile ditolak.

Rate limit berbasis session cukup untuk baseline, tetapi production bertrafik tinggi sebaiknya menambah WAF, rate limiter berbasis IP/server, audit log, SMTP notification, dan reset password admin.

## Menambah fitur

- Field database: tambahkan migration idempotent di `app/Schema.php`.
- Operasi data: tambahkan method yang dibatasi di `app/Cms.php`.
- Route/handler: tambahkan di `public/index.php` dan selalu validasi method, auth, serta CSRF.
- Halaman publik: tambahkan view ke `app/views/site/`.
- Modul admin: tambahkan view/form ke `app/views/admin/`.
- Styling: gunakan `public/assets/css/app.css` atau `admin.css` sesuai sisi aplikasi.
- Interaksi: gunakan progressive enhancement di file JavaScript terkait.

Jangan menyimpan business logic di CSS/JavaScript dan jangan menaruh secret, file konfigurasi privat, atau folder `app/` di bawah document root production.
