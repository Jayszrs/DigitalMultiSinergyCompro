# Digital Multi Sinergy Custom CMS

## Stack

- PHP 8.3 with Apache
- MySQL 8 or MariaDB
- Server-rendered HTML5
- Custom CSS and vanilla JavaScript
- GSAP and ScrollTrigger as progressive enhancement
- Docker Compose for local development

This repository does not use WordPress, React, Next.js, Vite, Tailwind, Node.js, or npm.

## Project boundaries

- `backend/`: private PHP application code, database access, authentication, schema, CMS service, seed data, and server-side views.
- `frontend/`: the only public document root. Contains the front controller, public assets, and CMS uploads.
- `docker/`: PHP/Apache image configuration.
- `docs/`: architecture notes and non-runtime project references.
- `scripts/`: local bootstrap scripts.

Never move `.env` or anything from `backend/` into the public document root.

## Local development

Docker Desktop must be running.

```powershell
.\scripts\bootstrap.ps1
```

Services:

- Website: http://localhost:8080
- CMS: http://localhost:8080/admin
- phpMyAdmin: http://localhost:8081

Use `docker compose up -d --build` after changing Docker configuration. Do not delete `dms-website_db_data` or `dms-website_uploads_data` unless a full data reset was explicitly requested.

## Editing conventions

- Public routes and form handlers live in `frontend/index.php`.
- Business/data operations belong in `backend/Cms.php`.
- Idempotent schema changes belong in `backend/Schema.php`.
- Public templates live in `backend/views/site/`.
- Admin templates live in `backend/views/admin/`.
- Public styles and scripts live in `frontend/assets/`.
- Keep secrets in `.env`; only placeholders belong in `.env.example`.
- Preserve bilingual ID/EN content and mobile behavior.
- Validate PHP and JavaScript after changes.
