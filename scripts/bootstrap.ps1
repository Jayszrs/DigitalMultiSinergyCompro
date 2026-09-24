$ErrorActionPreference = "Stop"
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "Created .env from .env.example. Edit credentials before production."
}

$envMap = @{}
Get-Content ".env" | ForEach-Object {
    if ($_ -match '^([^#][^=]+)=(.*)$') { $envMap[$matches[1]] = $matches[2] }
}
$WP_URL = $envMap['WP_URL']
$WP_TITLE = $envMap['WP_TITLE']
$WP_ADMIN_USER = $envMap['WP_ADMIN_USER']
$WP_ADMIN_PASSWORD = $envMap['WP_ADMIN_PASSWORD']
$WP_ADMIN_EMAIL = $envMap['WP_ADMIN_EMAIL']

docker compose up -d db wordpress phpmyadmin
Write-Host "Waiting for WordPress files..."
for ($attempt = 1; $attempt -le 30; $attempt++) {
    $ErrorActionPreference = "Continue"
    docker compose run --rm wpcli core version 2>$null | Out-Null
    $readyCode = $LASTEXITCODE
    $ErrorActionPreference = "Stop"
    if ($readyCode -eq 0) { break }
    if ($attempt -eq 30) { throw "WordPress did not become ready in time." }
    Start-Sleep -Seconds 2
}

$ErrorActionPreference = "Continue"
docker compose run --rm wpcli core is-installed --url=$WP_URL 2>$null | Out-Null
$installedCode = $LASTEXITCODE
$ErrorActionPreference = "Stop"
if ($installedCode -ne 0) {
    docker compose run --rm wpcli core install --url=$WP_URL --title=$WP_TITLE --admin_user=$WP_ADMIN_USER --admin_password=$WP_ADMIN_PASSWORD --admin_email=$WP_ADMIN_EMAIL --skip-email
}

docker compose run --rm wpcli theme activate dms-corporate
docker compose run --rm wpcli eval-file /workspace/scripts/seed.php
Write-Host "Website: $WP_URL"
Write-Host "Admin:   $WP_URL/wp-admin"
Write-Host "Database: http://localhost:$($envMap['PMA_PORT'])"
