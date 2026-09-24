# Digital Multi Sinergy — WordPress Company Profile

Implementasi WordPress custom theme untuk company profile Digital Multi Sinergy. UI mengikuti prototype Figma yang diberikan, dengan penyempurnaan responsive layout, aksesibilitas, form, CMS, dan optimasi aset.

## Tech stack

- WordPress + PHP 8.3
- MySQL 8
- HTML5, custom CSS, vanilla JavaScript
- GSAP + ScrollTrigger
- Docker Compose untuk development lokal
- Polylang-ready untuk Bahasa Indonesia / English
- Kompatibel dengan shared hosting cPanel + LiteSpeed

Tidak ada React, Next.js, Vite, atau proses build Node. Source of truth frontend adalah custom WordPress theme.

## Struktur

```text
.
├── docker-compose.yml                 # local infrastructure
├── scripts/                           # bootstrap dan sample CMS content
└── wp-content/themes/dms-corporate/
    ├── assets/                        # frontend: CSS, JS, WebP, logo
    ├── inc/                           # backend: CMS, form, meta fields, security
    ├── front-page.php                 # homepage
    ├── page-*.php                     # static page templates
    ├── archive-*.php                  # product/career listings
    └── single-*.php                   # detail templates
```

Penjelasan lengkap ada di [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Menjalankan dengan Docker

Persyaratan: Docker Desktop aktif.

### Windows PowerShell

```powershell
Copy-Item .env.example .env
# Ganti password di .env
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\bootstrap.ps1
```

### macOS / Linux / Git Bash

```bash
cp .env.example .env
# Ganti password di .env
chmod +x scripts/bootstrap.sh
./scripts/bootstrap.sh
```

URL default:

- Website: http://localhost:8080
- WordPress Admin: http://localhost:8080/wp-admin
- phpMyAdmin: http://localhost:8081

Stop tanpa menghapus database:

```bash
docker compose stop
```

## CMS

WordPress Admin menyediakan:

- Products + Product Categories
- Posts untuk News / Articles
- Careers
- Inquiries dari contact form
- Appearance → Customize untuk alamat, email, telepon, WhatsApp, jam kerja, dan hero

Form memakai nonce, sanitasi field, honeypot, dan rate limit dasar. Email produksi tetap perlu SMTP.

## Bilingual

Tanpa plugin, toggle ID / EN bawaan theme dapat dipakai untuk preview copy UI. Untuk production, gunakan Polylang agar setiap halaman, post, taxonomy, dan menu memiliki versi terjemahan sendiri.

```bash
docker compose run --rm wpcli plugin install polylang --activate
```

Setelah aktif, buat language `id` dan `en`, lalu hubungkan terjemahan konten serta menu di WordPress Admin.

## Plugin production yang disarankan

Install hanya di environment yang sesuai:

```bash
docker compose run --rm wpcli plugin install polylang wordfence fluent-smtp
docker compose run --rm wpcli plugin activate polylang wordfence fluent-smtp
```

- Polylang: bilingual content
- Wordfence: hardening, firewall, login protection
- FluentSMTP: reliable email delivery
- LiteSpeed Cache: pasang dan aktifkan hanya pada hosting yang benar-benar memakai LiteSpeed

WebP bawaan theme sudah tersimpan lokal. Upload WordPress berikutnya sebaiknya dikonversi ke WebP melalui LiteSpeed Cache atau image optimization hosting.

## Deploy ke shared hosting cPanel

1. Buat WordPress baru dari cPanel.
2. Upload folder `wp-content/themes/dms-corporate` ke instalasi WordPress.
3. Aktifkan theme **DMS Corporate**.
4. Buat halaman Home, About Us, News, dan Contact Us; atur Home sebagai static front page.
5. Buka Settings → Permalinks lalu klik Save.
6. Install/configure Polylang, SMTP, Wordfence, dan LiteSpeed Cache sesuai kebutuhan.
7. Import atau input ulang konten CMS. Database Docker development tidak perlu di-upload jika konten dibuat langsung di production.
8. Aktifkan HTTPS, backup terjadwal, dan nonaktifkan debug.

## Checklist sebelum go-live

- Ganti seluruh sample copy, nomor WhatsApp, email, alamat, dan statistik `XX+`.
- Upload foto proyek dan produk yang telah disetujui.
- Lengkapi partner logo, sertifikasi, spesifikasi produk, dan lowongan.
- Uji delivery email dari form.
- Konfigurasi Polylang dan kedua menu bahasa.
- Jalankan backup, Wordfence scan, serta pengecekan Lighthouse.
