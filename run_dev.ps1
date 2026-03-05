<#
.SYNOPSIS
    Starts both the LabourHand Backend (Spring Boot) and Frontend (Vite) in separate console windows.
#>

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

$BackendDir = Join-Path $ScriptDir "Backend"
$FrontendDir = Join-Path $ScriptDir "Frontend"

Write-Host "🚀 Starting LabourHand Development Servers..." -ForegroundColor Cyan

# Start Backend 
Write-Host "☕ Starting Spring Boot Backend (Port 8081)..." -ForegroundColor Yellow
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "cd '$BackendDir'; Write-Host 'Starting Spring Boot...'; mvn spring-boot:run" -WindowStyle Normal

# Start Frontend 
Write-Host "⚛️ Starting React Frontend (Port 5173)..." -ForegroundColor Blue
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "cd '$FrontendDir'; Write-Host 'Starting React + Vite...'; npm run dev" -WindowStyle Normal

Write-Host "✅ Both servers are starting up in separate windows!" -ForegroundColor Green
Write-Host "- Backend API: http://localhost:8081/api"
Write-Host "- Frontend UI: http://localhost:5173"
