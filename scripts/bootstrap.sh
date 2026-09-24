#!/usr/bin/env bash
set -euo pipefail
if [ ! -f .env ]; then cp .env.example .env; echo "Created .env. Change CMS and database passwords before production."; fi
docker compose up -d --build
echo "Waiting for the custom CMS..."
for i in {1..40}; do
  if curl -fsS http://localhost:8080/health >/dev/null; then break; fi
  if [ "$i" -eq 40 ]; then echo "CMS did not become ready in time."; exit 1; fi
  sleep 2
done
echo "Website:    http://localhost:8080"
echo "CMS Admin:  http://localhost:8080/admin"
echo "Database:   http://localhost:8081"
