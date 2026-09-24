# Digital Multi Sinergy — Custom PHP CMS

Company profile dan CMS mandiri untuk Digital Multi Sinergy. Implementasi ini memakai PHP dan MySQL tanpa WordPress, React, Next.js, Vite, atau source Figma runtime.

## Tech stack

- PHP 8.3 + Apache
- MySQL 8 / kompatibel MariaDB
- HTML5, custom CSS, vanilla JavaScript
- Plus Jakarta Sans + Manrope
- GSAP + ScrollTrigger sebagai progressive enhancement
- Docker Compose untuk development lokal
- CMS bilingual Indonesia / English
- Kompatibel dengan shared hosting cPanel + LiteSpeed

## Struktur frontend dan backend

```text
.
├── app/                         # backend, database, auth, CMS, dan server-side views
│   ├── views/admin/             # UI panel admin
│   ├── views/layouts/           # layout website dan admin
│   └── views/site/              # halaman frontend publik
├── public/                      # satu-satunya web root
│   ├── assets/css/              # styling frontend dan admin
│   ├── assets/js/               # navigation, GSAP, dan interaksi admin
│   ├── assets/images/           # logo dan gambar WebP
│   ├── uploads/                 # upload CMS; persistent volume di Docker
│   └── index.php                # router HTTP
├── docker/php/                  # image PHP/Apache lokal
├── docker-compose.yml           # web, MySQL, dan phpMyAdmin
└── scripts/                     # bootstrap lintas platform
```

Penjelasan alur data dan batas komponennya ada di [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Menjalankan dengan Docker

Persyaratan: Docker Desktop aktif.

Windows PowerShell:

```powershell
Copy-Item .env.example .env
# Ganti password CMS dan database di .env
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\bootstrap.ps1
```

macOS, Linux, atau Git Bash:

```bash
cp .env.example .env
# Ganti password CMS dan database di .env
chmod +x scripts/bootstrap.sh
./scripts/bootstrap.sh
```

URL lokal:

- Website: http://localhost:8080
- CMS Admin: http://localhost:8080/admin
- phpMyAdmin: http://localhost:8081

Jika `.env` lama sudah ada, Docker akan tetap menggunakannya. Kredensial admin baru hanya dibuat saat tabel user masih kosong. Nilai contoh development adalah `admin@dms.local`; password mengikuti `CMS_ADMIN_PASSWORD` di `.env`.

Stop tanpa menghapus data:

```bash
docker compose stop
```

Reset seluruh database dan upload lokal hanya jika memang ingin menghapus data development:

```bash
docker compose down -v
```

## Yang bisa dikelola dari CMS

- Products: ID/EN, kategori, spesifikasi, gambar, urutan, draft/published
- News: ID/EN, kategori, gambar, tanggal publish, draft/published
- Careers: ID/EN, departemen, lokasi, tipe kerja, draft/published
- Inquiries: data form kontak dan workflow status
- Settings: email, telepon, WhatsApp, alamat, jam kerja, Instagram, LinkedIn, Google Maps, dan statistik

Database dan dummy content dibuat otomatis saat aplikasi pertama kali dibuka. Form kontak memakai CSRF token, honeypot, validasi server, prepared statements, dan rate limit dasar berbasis session.

Seed katalog memulihkan seluruh data prototype: 12 produk dengan spesifikasi, gallery, fitur, aplikasi dan related product; 6 artikel bilingual lengkap; serta 6 posisi karir. Seed memakai version marker sehingga perubahan editor di CMS tidak ditimpa pada request berikutnya.

## Environment dan secret

File `.env` berada di root project, di luar `public/`, dan di-ignore Git. Apache juga menolak akses langsung ke file tersembunyi. Jangan pernah memindahkan `.env` ke document root.

Kelompok variabel yang tersedia:

- Database: `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_ROOT_PASSWORD`
- Runtime: `APP_URL`, `APP_ENV`, `APP_NAME`, `APP_PORT`, `PMA_PORT`
- Admin: `CMS_ADMIN_NAME`, `CMS_ADMIN_EMAIL`, `CMS_ADMIN_PASSWORD`
- Company profile: seluruh `COMPANY_*`, social URL, Maps query, dan statistik

Nilai company profile dari environment hanya menjadi default saat database baru dibuat. Setelah itu editor dapat memperbaruinya melalui CMS Settings.

## Deploy ke cPanel / LiteSpeed

1. Buat database MySQL/MariaDB dan user database dari cPanel.
2. Upload isi folder `public/` ke document root domain, misalnya `public_html/`.
3. Upload folder `app/` satu tingkat di luar `public_html` bila hosting mengizinkan.
4. Sesuaikan path bootstrap pada `public_html/index.php` jika posisi folder `app` berbeda.
5. Set environment variable database, `APP_URL`, dan kredensial admin melalui panel hosting. Jika panel tidak mendukung env var, buat file konfigurasi privat di luar document root dan sesuaikan `app/config.php`.
6. Pastikan PHP extension `pdo_mysql`, `fileinfo`, dan `mbstring` aktif, serta PHP minimal 8.1.
7. Beri izin tulis hanya pada folder `public_html/uploads`.
8. Aktifkan HTTPS, backup database, WebP/AVIF optimization, dan LiteSpeed cache untuk aset statis. Jangan cache route `/admin` atau request POST.
9. Setelah login pertama, gunakan email/password production yang kuat dan jangan memakai kredensial contoh.

Untuk keamanan production, batasi akses phpMyAdmin, aktifkan 2FA dari hosting jika tersedia, jadwalkan backup, dan tambahkan firewall/WAF dari cPanel atau Cloudflare.

## Checklist sebelum go-live

- Ganti seluruh dummy copy, produk, artikel, lowongan, statistik, email, dan nomor telepon.
- Verifikasi Instagram, LinkedIn, WhatsApp, serta lokasi Google Maps.
- Upload gambar yang sudah memiliki izin penggunaan dan versi WebP.
- Uji form inquiry dan proses follow-up di CMS.
- Uji kedua bahasa dan semua ukuran mobile utama.
- Ganti semua password contoh dan aktifkan HTTPS/backup.
