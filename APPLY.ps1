# Run this script FROM the ANMLYRW DROP folder after extracting this package there.
# It backs up the current index.html, copies the new site files, then deploys to Vercel.
$ErrorActionPreference = 'Stop'
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$backup = "backup-anomaly-raw-$stamp"
New-Item -ItemType Directory -Path $backup -Force | Out-Null
if (Test-Path .\index.html) { Copy-Item .\index.html "$backup\index.html" }
if (Test-Path .\assets) { Copy-Item .\assets "$backup\assets" -Recurse }
Copy-Item .\anomaly-raw-site\index.html .\index.html -Force
Copy-Item .\anomaly-raw-site\assets .\assets -Recurse -Force
Write-Host "ANOMALY-RAW landing page applied. Backup: $backup" -ForegroundColor Green
npx vercel --prod
