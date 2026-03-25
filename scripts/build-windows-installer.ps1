param(
    [string]$Version = "0.1.0",
    [switch]$SkipInstaller
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

$VenvDir = Join-Path $ProjectRoot ".venv-build"
$PythonExe = Join-Path $VenvDir "Scripts\python.exe"
$PipExe = Join-Path $VenvDir "Scripts\pip.exe"
$IsccUser = Join-Path $env:LOCALAPPDATA "Programs\Inno Setup 6\ISCC.exe"
$IsccDefault = "C:\Program Files (x86)\Inno Setup 6\ISCC.exe"
$IsccAlt = "C:\Program Files\Inno Setup 6\ISCC.exe"

Write-Host "==> Project root: $ProjectRoot"
Write-Host "==> Version: $Version"

if (!(Test-Path $VenvDir)) {
    Write-Host "==> Creating build virtualenv"
    $FallbackPython = Join-Path $env:LOCALAPPDATA "Programs\Python\Python313\python.exe"
    if (Get-Command py -ErrorAction SilentlyContinue) {
        py -3 -m venv $VenvDir
    } elseif (Test-Path $FallbackPython) {
        & $FallbackPython -m venv $VenvDir
    } elseif (Get-Command python -ErrorAction SilentlyContinue) {
        python -m venv $VenvDir
    } else {
        throw "Python launcher not found (need 'py' or 'python' in PATH)."
    }
}

Write-Host "==> Installing build dependencies"
& $PythonExe -m pip install --upgrade pip
& $PipExe install -r requirements-build.txt

Write-Host "==> Cleaning old build outputs"
if (Test-Path ".\build") { Remove-Item ".\build" -Recurse -Force }
if (Test-Path ".\dist") { Remove-Item ".\dist" -Recurse -Force }
if (Test-Path ".\release") { Remove-Item ".\release" -Recurse -Force }

Write-Host "==> Generating Windows icon"
& $PythonExe .\scripts\generate-icon.py

Write-Host "==> Building executable bundle (PyInstaller)"
& $PythonExe -m PyInstaller --noconfirm --clean ".\vovoci.spec"

$DistAppExe = Join-Path $ProjectRoot "dist\VOVOCI\VOVOCI.exe"
if (!(Test-Path $DistAppExe)) {
    throw "Build failed: $DistAppExe not found."
}

if ($SkipInstaller) {
    Write-Host "==> SkipInstaller set. EXE bundle ready at dist\VOVOCI"
    exit 0
}

$Iscc = $null
if (Test-Path $IsccUser) {
    $Iscc = $IsccUser
} elseif (Test-Path $IsccDefault) {
    $Iscc = $IsccDefault
} elseif (Test-Path $IsccAlt) {
    $Iscc = $IsccAlt
} else {
    throw "Inno Setup compiler (ISCC.exe) not found. Install Inno Setup 6 first."
}

Write-Host "==> Building installer (Inno Setup)"
& $Iscc "/DMyAppVersion=$Version" ".\installer\vovoci.iss"

Write-Host "==> Done. Installer output folder: .\release"
