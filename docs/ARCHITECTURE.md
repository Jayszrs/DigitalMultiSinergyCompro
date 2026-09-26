# Arsitektur DMS Custom CMS

## Batas backend dan frontend

### Backend privat

`backend/` tidak boleh dapat diakses langsung dari web.

- `backend/bootstrap.php`: session, koneksi database, migration, dan dependency wiring.
- `backend/Database.php`: koneksi PDO.
- `backend/Schema.php`: schema dan seed idempotent.
- `backend/Cms.php`: operasi CRUD yang dibatasi allowlist.
- `backend/Auth.php`: autentikasi admin.
- `backend/data/catalog.json`: data awal hasil migrasi prototype.
- `backend/views/site/`: template server-rendered website.
- `backend/views/admin/`: template CMS.
- `backend/views/layouts/`: layout publik dan admin.

### Frontend publik

`frontend/` adalah satu-satunya document root.

- `frontend/index.php`: front controller, router, form handler, upload validation, dan security headers.
- `frontend/assets/css/`: design system website serta CMS.
- `frontend/assets/js/`: navigasi, reveal, parallax, dan interaksi CMS.
- `frontend/assets/images/`: aset gambar bawaan.
- `frontend/uploads/`: file upload CMS pada persistent volume.

Tidak ada build step Node.js. Browser menerima HTML dari PHP serta CSS/JavaScript statis.

## Alur data

```text
Admin browser -> session + CSRF -> PHP CMS service -> PDO -> MySQL/MariaDB
Public browser -> front controller -> CMS query -> server-side view -> HTML/CSS/JS
Contact form -> validation + rate limit -> cms_inquiries -> Admin CMS
Image upload -> MIME/size validation -> frontend/uploads -> URL konten
```

## Database

- `cms_users`: administrator dan password hash.
- `cms_settings`: profil perusahaan, social link, Maps, dan statistik.
- `cms_products`: katalog bilingual dan detail JSON.
- `cms_articles`: artikel bilingual.
- `cms_jobs`: lowongan bilingual.
- `cms_inquiries`: pesan kontak dan status follow-up.

## Security baseline

- Secret hanya berada di `.env` di luar document root.
- Password memakai `password_hash` dan `password_verify`.
- Session ID diregenerasi setelah login.
- Mutasi data memakai POST dan CSRF token.
- Nilai database memakai prepared statement.
- Upload maksimal 5 MB dan hanya JPEG, PNG, atau WebP.
- Output CMS di-escape sebelum masuk HTML.
- Security headers dan perlindungan dotfile diterapkan dari aplikasi/Apache.

## Penempatan perubahan

- Schema database: `backend/Schema.php`.
- Operasi data: `backend/Cms.php`.
- Route/handler: `frontend/index.php`.
- Template publik: `backend/views/site/`.
- Template admin: `backend/views/admin/`.
- Styling/interaksi: `frontend/assets/`.

Jangan menyimpan business logic di CSS/JavaScript dan jangan menaruh `.env` atau `backend/` di bawah document root production.
