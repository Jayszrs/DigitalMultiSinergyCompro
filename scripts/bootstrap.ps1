$ErrorActionPreference = "Stop"
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "Created .env. Change CMS and database passwords before production."
}
docker compose up -d --build
Write-Host "Waiting for the custom CMS..."
for ($attempt = 1; $attempt -le 40; $attempt++) {
    try {
        $response = Invoke-WebRequest -UseBasicParsing -Uri "http://localhost:8080/health" -TimeoutSec 3
        if ($response.StatusCode -eq 200) { break }
    } catch {}
    if ($attempt -eq 40) { throw "CMS did not become ready in time." }
    Start-Sleep -Seconds 2
}
Write-Host "Website:    http://localhost:8080"
Write-Host "CMS Admin:  http://localhost:8080/admin"
Write-Host "Database:   http://localhost:8081"
