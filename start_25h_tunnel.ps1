$env:Path += ";C:\Program Files\nodejs"
Write-Host "🚀 Starting 25 Hours Dev Server with Cloudflare Tunnel..." -ForegroundColor Cyan

# Start Vite in the background
$viteProcess = Start-Process npm -ArgumentList "run dev:25h" -PassThru -NoNewWindow

Write-Host "⏳ Waiting for Vite to warm up (5s)..." -ForegroundColor DarkGray
Start-Sleep -Seconds 5

# Start Cloudflared
Write-Host "🌐 Opening Tunnel..." -ForegroundColor Yellow
.\cloudflared.exe tunnel --url http://localhost:5173 --logfile tunnel_25h.log

# Cleanup when done
Stop-Process -Id $viteProcess.Id
