$env:Path += ";C:\Program Files\nodejs"
Write-Host ""
Write-Host "  ***************************************************" -ForegroundColor Cyan
Write-Host "  *                                                 *" -ForegroundColor Cyan
Write-Host "  *    25 HOURS COPENHAGEN - LOCAL DEV SERVER      *" -ForegroundColor Cyan
Write-Host "  *                                                 *" -ForegroundColor Cyan
Write-Host "  ***************************************************" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Mode: 25hours" -ForegroundColor White
Write-Host "  Port: 5173" -ForegroundColor White
Write-Host ""
Write-Host "  Checking for node_modules..." -ForegroundColor DarkGray

if (-not (Test-Path "node_modules")) {
    Write-Host "  node_modules not found. Installing dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host "  Launching Vite..." -ForegroundColor Green
npm run dev:25h
