$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$pidPath = Join-Path $projectRoot ".dev-server.pid"

if (-not (Test-Path -LiteralPath $pidPath)) {
    Write-Host "No saved portfolio server process was found."
    exit 0
}

$serverPid = Get-Content -LiteralPath $pidPath -ErrorAction SilentlyContinue
if ($serverPid -and (Get-Process -Id $serverPid -ErrorAction SilentlyContinue)) {
    Stop-Process -Id $serverPid
    Write-Host "Portfolio development server stopped." -ForegroundColor Green
}
else { Write-Host "The saved server process is no longer running." }

Remove-Item -LiteralPath $pidPath -Force -ErrorAction SilentlyContinue
