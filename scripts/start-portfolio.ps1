$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$nodePath = (Get-Command node.exe -ErrorAction Stop).Source
$nextPath = Join-Path $projectRoot "node_modules\next\dist\bin\next"
$pidPath = Join-Path $projectRoot ".dev-server.pid"
$logPath = Join-Path $projectRoot ".dev-server.log"
$errorLogPath = Join-Path $projectRoot ".dev-server-error.log"

if (-not (Test-Path -LiteralPath $nextPath)) {
    throw "Project dependencies are missing. Open a terminal in this folder and run npm install once."
}

$codeCandidates = @(
    (Join-Path $env:LOCALAPPDATA "Programs\Microsoft VS Code\Code.exe"),
    (Join-Path $env:LOCALAPPDATA "Programs\Microsoft VS Code\_\Code.exe"),
    (Join-Path $env:ProgramFiles "Microsoft VS Code\Code.exe")
)
$codePath = $codeCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $codePath) {
    $codePath = Get-ChildItem -LiteralPath (Join-Path $env:LOCALAPPDATA "Programs") -Filter "Code.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty FullName
}

if ($codePath) { Start-Process -FilePath $codePath -ArgumentList @($projectRoot) }
else { Write-Warning "VS Code was not found automatically. The website will still start." }

$serverRunning = $false
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 2
    $serverRunning = $response.StatusCode -eq 200
}
catch {}

if (-not $serverRunning) {
    if (Test-Path -LiteralPath $pidPath) {
        $oldPid = Get-Content -LiteralPath $pidPath -ErrorAction SilentlyContinue
        if ($oldPid -and (Get-Process -Id $oldPid -ErrorAction SilentlyContinue)) {
            throw "A saved portfolio server process is already running but is not responding. Run Stop Portfolio.bat, then try again."
        }
    }

    $startOptions = @{
        FilePath = $nodePath
        ArgumentList = @($nextPath, "dev")
        WorkingDirectory = $projectRoot
        WindowStyle = "Hidden"
        RedirectStandardOutput = $logPath
        RedirectStandardError = $errorLogPath
        PassThru = $true
    }
    $process = Start-Process @startOptions
    Set-Content -LiteralPath $pidPath -Value $process.Id -Encoding ascii

    for ($attempt = 0; $attempt -lt 60; $attempt++) {
        Start-Sleep -Milliseconds 500
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 2
            if ($response.StatusCode -eq 200) { $serverRunning = $true; break }
        }
        catch {}
    }
}

if (-not $serverRunning) { throw "The development server did not become ready. See .dev-server-error.log for details." }

Start-Process "http://localhost:3000"
Write-Host "Portfolio is running at http://localhost:3000" -ForegroundColor Green
Write-Host "Use Stop Portfolio.bat when you are finished."
