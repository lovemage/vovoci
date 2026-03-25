param(
  [string]$Version
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

powershell -ExecutionPolicy Bypass -File .\scripts\build-windows-installer.ps1 -Version $Version

$installerPath = Join-Path $ProjectRoot ("release\VOVOCI-Setup-{0}.exe" -f $Version)
if (Test-Path $installerPath) {
  Write-Host "==> Done: $installerPath"
} else {
  Write-Warning "Build finished but installer not found at expected path: $installerPath"
}
