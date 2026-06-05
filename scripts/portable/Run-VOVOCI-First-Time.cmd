@echo off
setlocal

set "APP_DIR=%~dp0"
if not exist "%APP_DIR%VOVOCI.exe" (
  echo [VOVOCI] VOVOCI.exe not found in:
  echo %APP_DIR%
  pause
  exit /b 1
)

echo [VOVOCI] Removing Windows web-zone block from app files...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-ChildItem -LiteralPath '%APP_DIR%' -Recurse -File | Unblock-File -ErrorAction SilentlyContinue" >nul 2>&1

echo [VOVOCI] Launching VOVOCI...
start "" "%APP_DIR%VOVOCI.exe"
exit /b 0
