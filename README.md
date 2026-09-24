# Digital Multi Sinergy — Docker WordPress Starter

Custom WordPress theme implementation for the DMS company profile prototype.

## Stack
- Docker Compose
- WordPress + PHP 8.3 / Apache
- MySQL 8
- Custom WordPress theme (no page builder)
- HTML5 / custom CSS / JavaScript
- GSAP + ScrollTrigger for motion/parallax
- Native WordPress CMS for Products, News, Careers and Inquiries
- Polylang-ready language switcher

## Included
- Home
- About Us
- Product catalogue + category filters + search
- Product detail + technical specifications
- News / Articles
- Career archive + vacancy detail
- Contact form that stores inquiries in WordPress Admin and attempts `wp_mail()`
- Responsive desktop/tablet/mobile
- DMS brand palette and uploaded logo
- Subtle parallax / reveal animations
- Sample content seeder
- phpMyAdmin for local development

## Quick start on Windows (PowerShell)
1. Install Docker Desktop and make sure it is running.
2. Open PowerShell in this project folder.
3. Copy `.env.example` to `.env` and change the admin/database passwords.
4. Run:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\bootstrap.ps1
```

If PowerShell script policy is not an issue, only the second command is needed.

## Quick start with Git Bash / macOS / Linux
```bash
cp .env.example .env
# edit .env
./scripts/bootstrap.sh
```

## Manual Docker commands
```bash
docker compose up -d
```
Then open http://localhost:8080 and complete WordPress install manually if you do not use the bootstrap script.

## Local URLs
- Website: http://localhost:8080
- WordPress Admin: http://localhost:8080/wp-admin
- phpMyAdmin: http://localhost:8081

## Recommended plugins
Install only what is needed:
- Polylang — bilingual ID/EN
- FluentSMTP — reliable production email delivery
- Wordfence — basic WordPress hardening
- LiteSpeed Cache — production only when the host uses LiteSpeed

Example:
```bash
docker compose run --rm wpcli plugin install polylang wordfence fluent-smtp
```
Activate after configuration:
```bash
docker compose run --rm wpcli plugin activate polylang wordfence fluent-smtp
```

## CMS structure
WordPress Admin will contain:
- Products
- Product Categories
- Posts (News)
- Careers
- Inquiries

Product technical fields are available directly in the Product editor.
Career location, type and department fields are available in the Career editor.

## Editing company information
Go to **Appearance → Customize → DMS Company Information** for contact details and **DMS Home Hero** for the primary hero copy.

## Important before production
- Replace all demo/sample copy with approved client content.
- Upload real project / implementation photos.
- Configure SMTP; Docker local `wp_mail()` may not deliver email.
- Configure Polylang and translate content.
- Create a strong admin password and disable debug mode.
- Use HTTPS.
- Configure backups.
- If production hosting is LiteSpeed-based, enable LiteSpeed Cache.
- Put Cloudflare in front of the domain if appropriate.

## Production hosting recommendation
For this scope, begin with a reputable business shared hosting plan that supports:
- PHP 8.2/8.3+
- MySQL/MariaDB
- 2 GB+ practical PHP memory/resources where possible
- NVMe storage
- SSL
- scheduled backups
- SMTP/email or external SMTP support
- LiteSpeed preferred

A VPS is not necessary at the beginning unless traffic, custom server requirements, or integrations later justify it.
