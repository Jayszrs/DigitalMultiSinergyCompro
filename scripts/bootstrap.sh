#!/usr/bin/env bash
set -euo pipefail
if [ ! -f .env ]; then cp .env.example .env; echo "Created .env from .env.example — edit passwords before production."; fi
set -a; source .env; set +a

docker compose up -d db wordpress

echo "Waiting for WordPress files..."
for i in {1..30}; do
  if docker compose run --rm wpcli core version >/dev/null 2>&1; then break; fi
  sleep 2
done

if ! docker compose run --rm wpcli core is-installed --url="$WP_URL" >/dev/null 2>&1; then
  docker compose run --rm wpcli core install --url="$WP_URL" --title="$WP_TITLE" --admin_user="$WP_ADMIN_USER" --admin_password="$WP_ADMIN_PASSWORD" --admin_email="$WP_ADMIN_EMAIL" --skip-email
fi

docker compose run --rm wpcli theme activate dms-corporate
docker compose run --rm wpcli eval-file /workspace/scripts/seed.php

echo "Optional plugins (Polylang + Wordfence + FluentSMTP) are not auto-activated."
echo "Website: $WP_URL"
echo "Admin:   $WP_URL/wp-admin"
