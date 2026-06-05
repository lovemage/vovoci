param(
    [string]$Version = "0.1.1",
    [switch]$SkipInstaller,
    [switch]$Sign,
    [string]$SignToolPath = "",
    [string]$TimestampUrl = "http://timestamp.digicert.com",
    [string]$CertThumbprint = "",
    [string]$CertSubject = "",
    [switch]$SkipSignatureVerify
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

function Resolve-SignToolPath {
    param(
        [string]$UserPath
    )

    if ($UserPath -and -not [string]::IsNullOrWhiteSpace($UserPath)) {
        if (Test-Path $UserPath) {
            return $UserPath
        }
        throw "SignTool not found at provided path: $UserPath"
    }

    $candidates = @()
    $kitsRoot = "C:\Program Files (x86)\Windows Kits\10\bin"
    if (Test-Path $kitsRoot) {
        $candidates += Get-ChildItem $kitsRoot -Recurse -Filter signtool.exe -ErrorAction SilentlyContinue |
            Where-Object { $_.FullName -match "\\x64\\signtool\.exe$" } |
            Sort-Object FullName -Descending |
            Select-Object -ExpandProperty FullName
    }

    if ($candidates.Count -gt 0) {
        return $candidates[0]
    }

    $cmd = Get-Command signtool.exe -ErrorAction SilentlyContinue
    if ($cmd -and $cmd.Source) {
        return $cmd.Source
    }

    throw "signtool.exe not found. Install Windows SDK Signing Tools or provide -SignToolPath."
}

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

if ($Sign) {
    $InstallerPath = Join-Path $ProjectRoot ("release\VOVOCI-Setup-{0}.exe" -f $Version)
    if (!(Test-Path $InstallerPath)) {
        throw "Installer not found for signing: $InstallerPath"
    }

    $ResolvedSignTool = Resolve-SignToolPath -UserPath $SignToolPath
    Write-Host "==> Signing installer with: $ResolvedSignTool"

    $signArgs = @("sign", "/fd", "SHA256", "/td", "SHA256", "/tr", $TimestampUrl)
    if ($CertThumbprint -and -not [string]::IsNullOrWhiteSpace($CertThumbprint)) {
        $signArgs += @("/sha1", $CertThumbprint)
    } elseif ($CertSubject -and -not [string]::IsNullOrWhiteSpace($CertSubject)) {
        $signArgs += @("/n", $CertSubject)
    } else {
        $signArgs += "/a"
    }
    $signArgs += $InstallerPath

    & $ResolvedSignTool @signArgs
    if ($LASTEXITCODE -ne 0) {
        throw "signtool sign failed with exit code $LASTEXITCODE"
    }

    if (-not $SkipSignatureVerify) {
        Write-Host "==> Verifying signature"
        & $ResolvedSignTool verify /pa /v $InstallerPath
        if ($LASTEXITCODE -ne 0) {
            throw "signtool verify failed with exit code $LASTEXITCODE"
        }
    }
}

Write-Host "==> Done. Installer output folder: .\release"
