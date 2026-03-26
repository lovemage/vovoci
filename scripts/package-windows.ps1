param(
  [string]$Version,
  [switch]$PortableOnly,
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

if (-not $Version -or [string]::IsNullOrWhiteSpace($Version)) {
  $defaultVersion = "0.1.1"
  $agentPath = Join-Path $ProjectRoot ".agent"
  if (Test-Path $agentPath) {
    try {
      $agentRaw = Get-Content $agentPath -Raw
      $agentJson = $agentRaw | ConvertFrom-Json
      if ($agentJson.version -and -not [string]::IsNullOrWhiteSpace($agentJson.version)) {
        $Version = [string]$agentJson.version
      }
    } catch {
      # Keep default version if .agent is invalid JSON
    }
  }
  if (-not $Version) {
    $Version = $defaultVersion
  }
}

Write-Host "==> Packaging VOVOCI Windows installer"
Write-Host "==> Version: $Version"
if ($PortableOnly) {
  Write-Host "==> Mode: Portable ZIP only (no installer)"
}

$buildArgs = @(
  "-ExecutionPolicy", "Bypass",
  "-File", ".\scripts\build-windows-installer.ps1",
  "-Version", $Version
)
if ($PortableOnly) { $buildArgs += "-SkipInstaller" }
if ($Sign) { $buildArgs += "-Sign" }
if ($SignToolPath -and -not [string]::IsNullOrWhiteSpace($SignToolPath)) { $buildArgs += @("-SignToolPath", $SignToolPath) }
if ($TimestampUrl -and -not [string]::IsNullOrWhiteSpace($TimestampUrl)) { $buildArgs += @("-TimestampUrl", $TimestampUrl) }
if ($CertThumbprint -and -not [string]::IsNullOrWhiteSpace($CertThumbprint)) { $buildArgs += @("-CertThumbprint", $CertThumbprint) }
if ($CertSubject -and -not [string]::IsNullOrWhiteSpace($CertSubject)) { $buildArgs += @("-CertSubject", $CertSubject) }
if ($SkipSignatureVerify) { $buildArgs += "-SkipSignatureVerify" }

powershell @buildArgs
if ($LASTEXITCODE -ne 0) {
  throw "build-windows-installer.ps1 failed with exit code $LASTEXITCODE"
}

if ($PortableOnly) {
  $distDir = Join-Path $ProjectRoot "dist\VOVOCI"
  if (!(Test-Path $distDir)) {
    throw "Portable source folder not found: $distDir"
  }
  $portableLauncherSource = Join-Path $ProjectRoot "scripts\portable\Run-VOVOCI-First-Time.cmd"
  if (Test-Path $portableLauncherSource) {
    Copy-Item $portableLauncherSource (Join-Path $distDir "Run-VOVOCI-First-Time.cmd") -Force
  }
  $releaseDir = Join-Path $ProjectRoot "release"
  if (!(Test-Path $releaseDir)) {
    New-Item -ItemType Directory -Path $releaseDir | Out-Null
  }
  $zipPath = Join-Path $releaseDir ("VOVOCI-portable-{0}.zip" -f $Version)
  if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
  }
  Compress-Archive -Path (Join-Path $distDir "*") -DestinationPath $zipPath -CompressionLevel Optimal
  if (Test-Path $zipPath) {
    Write-Host "==> Done (portable zip): $zipPath"
    return
  }
  throw "Failed to create portable zip: $zipPath"
}

$installerPath = Join-Path $ProjectRoot ("release\VOVOCI-Setup-{0}.exe" -f $Version)
if (Test-Path $installerPath) {
  if ($Sign) {
    Write-Host "==> Done (built + signed): $installerPath"
  } else {
    Write-Host "==> Done: $installerPath"
  }
} else {
  Write-Warning "Build finished but installer not found at expected path: $installerPath"
}
