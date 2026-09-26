# Digital Multi Sinergy — Custom PHP CMS

Company profile dan CMS mandiri berbasis PHP dan MySQL. Project ini tidak memakai WordPress, React, Next.js, Vite, Tailwind, Node.js, atau runtime Figma.

## Tech stack

- PHP 8.3 + Apache
- MySQL 8 / MariaDB
- HTML5, custom CSS, vanilla JavaScript
- Plus Jakarta Sans + Manrope
- GSAP + ScrollTrigger sebagai progressive enhancement
- Docker Compose untuk development lokal
- CMS bilingual Indonesia / English
- Kompatibel dengan shared hosting cPanel + LiteSpeed

## Struktur project

```text
.
├── backend/                    # kode privat PHP
│   ├── data/                   # seed katalog
│   ├── views/admin/            # template CMS
│   ├── views/layouts/          # layout publik dan admin
│   └── views/site/             # template website publik
├── frontend/                   # satu-satunya document root
│   ├── assets/css/             # CSS website dan CMS
│   ├── assets/js/              # interaksi dan animasi
│   ├── assets/images/          # logo dan gambar WebP
│   ├── uploads/                # upload CMS
│   └── index.php               # front controller/router
├── docker/php/                 # image PHP/Apache
├── docs/                       # arsitektur dan dokumen referensi
├── scripts/                    # bootstrap Windows/Linux
└── docker-compose.yml
```

Detail alur dan batas komponen tersedia di [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Menjalankan dengan Docker

Windows PowerShell:

```powershell
Copy-Item .env.example .env
# Ganti semua password development.
.\scripts\bootstrap.ps1
```

macOS, Linux, atau Git Bash:

```bash
cp .env.example .env
# Ganti semua password development.
chmod +x scripts/bootstrap.sh
./scripts/bootstrap.sh
```

URL lokal:

- Website: http://localhost:8080
- CMS Admin: http://localhost:8080/admin
- phpMyAdmin: http://localhost:8081

Stop tanpa menghapus data:

```bash
docker compose stop
```

Jangan memakai `docker compose down -v` kecuali memang ingin menghapus seluruh database dan upload lokal.

## CMS

CMS mengelola:

- Produk bilingual, kategori, spesifikasi, gambar, urutan, dan status publish.
- Berita bilingual, kategori, gambar, tanggal publish, dan status.
- Lowongan bilingual.
- Inquiry dari form kontak.
- Profil perusahaan, social link, Maps, WhatsApp, dan statistik.

Seed development berisi 12 produk, 6 artikel, dan 6 posisi karier. Form publik memakai CSRF, honeypot, validasi server, prepared statements, dan rate limit berbasis session.

## Environment dan secret

`.env` berada di root project, di luar `frontend/`, serta diabaikan Git. Jangan memindahkannya ke document root.

Kelompok variabel:

- Database: `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_ROOT_PASSWORD`
- Runtime: `APP_URL`, `APP_ENV`, `APP_NAME`, `APP_PORT`, `PMA_PORT`
- Admin: `CMS_ADMIN_NAME`, `CMS_ADMIN_EMAIL`, `CMS_ADMIN_PASSWORD`
- Company: seluruh `COMPANY_*`, social URL, Maps query, dan statistik

Kredensial admin dari environment disinkronkan ke database dalam bentuk password hash. Nilai secret tidak pernah dirender ke halaman publik.

## Deploy cPanel / LiteSpeed

1. Buat database MySQL/MariaDB dan user database.
2. Upload isi `frontend/` ke document root, misalnya `public_html/`.
3. Upload `backend/` satu tingkat di luar `public_html/`.
4. Sesuaikan path bootstrap pada `public_html/index.php` bila susunannya berbeda.
5. Simpan konfigurasi dan secret di luar document root.
6. Aktifkan extension `pdo_mysql`, `fileinfo`, dan `mbstring`; gunakan PHP minimal 8.1.
7. Beri izin tulis hanya pada `public_html/uploads/`.
8. Aktifkan HTTPS, backup, optimasi WebP/AVIF, dan LiteSpeed Cache untuk aset statis.
9. Jangan cache `/admin` atau request POST.

## Checklist go-live

- Ganti dummy copy, produk, artikel, lowongan, statistik, dan kontak.
- Verifikasi Instagram, LinkedIn, WhatsApp, dan Google Maps.
- Uji form inquiry, kedua bahasa, serta ukuran mobile.
- Gunakan password production yang kuat.
- Aktifkan HTTPS, firewall/WAF, dan backup berkala.
