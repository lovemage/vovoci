#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENV_DIR="${ROOT_DIR}/.venv-build"
PYTHON_BIN="${PYTHON_BIN:-python3}"
CLEAN=1
VERSION="${APP_VERSION:-0.1.5}"

usage() {
  cat <<'EOF'
Usage: scripts/build_macos_app.sh [options]

Options:
  --venv <path>     Override virtualenv path (default: .venv-build)
  --python <bin>    Override python executable (default: python3)
  --version <ver>   Override app bundle version
  --no-clean        Keep previous build/dist outputs
  -h, --help        Show this help
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --venv)
      VENV_DIR="$2"
      shift 2
      ;;
    --python)
      PYTHON_BIN="$2"
      shift 2
      ;;
    --version)
      VERSION="$2"
      shift 2
      ;;
    --no-clean)
      CLEAN=0
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "This script builds a macOS app and must run on macOS." >&2
  exit 1
fi

if ! command -v "${PYTHON_BIN}" >/dev/null 2>&1; then
  echo "Python not found: ${PYTHON_BIN}" >&2
  exit 1
fi

if [[ ! -d "${VENV_DIR}" ]]; then
  echo "Creating build virtualenv: ${VENV_DIR}"
  "${PYTHON_BIN}" -m venv "${VENV_DIR}"
fi

source "${VENV_DIR}/bin/activate"
python -m pip install --upgrade pip setuptools wheel
python -m pip install -r "${ROOT_DIR}/requirements-build.txt"

cd "${ROOT_DIR}"
if [[ "${CLEAN}" -eq 1 ]]; then
  rm -rf "${ROOT_DIR}/dist/VOVOCI" "${ROOT_DIR}/dist/VOVOCI.app"
fi

mkdir -p "${ROOT_DIR}/build"
MACOS_SPEC="${ROOT_DIR}/build/macos.spec"
cat > "${MACOS_SPEC}" <<'EOF'
# -*- mode: python ; coding: utf-8 -*-

import os
from pathlib import Path

from PyInstaller.utils.hooks import collect_all

source_root = Path(os.environ["SOURCE_DIR"]).resolve()
app_version = os.environ.get("APP_VERSION", "0.1.5")

datas = [
    (str(source_root / "logo.png"), "."),
    (str(source_root / "github.png"), "."),
    (str(source_root / "README.md"), "."),
    (str(source_root / "LICENSE"), "."),
]
binaries = []
hiddenimports = []

for pkg in ("faster_whisper", "ctranslate2", "sounddevice", "pystray", "PIL", "pynput"):
    d, b, h = collect_all(pkg)
    datas += d
    binaries += b
    hiddenimports += h

a = Analysis(
    [str(source_root / "app.py")],
    pathex=[str(source_root)],
    binaries=binaries,
    datas=datas,
    hiddenimports=hiddenimports,
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name="VOVOCI",
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=False,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=True,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=None,
)

coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=False,
    upx_exclude=[],
    name="VOVOCI",
)

app = BUNDLE(
    coll,
    name="VOVOCI.app",
    icon=None,
    bundle_identifier="com.vovoci.app",
    info_plist={
        "CFBundleName": "VOVOCI",
        "CFBundleDisplayName": "VOVOCI",
        "CFBundleShortVersionString": app_version,
        "CFBundleVersion": app_version,
        "LSMinimumSystemVersion": "13.0",
        "NSMicrophoneUsageDescription": "VOVOCI needs microphone access for speech-to-text capture.",
        "NSAppleEventsUsageDescription": "VOVOCI uses System Events to paste text into the active app.",
    },
)
EOF

SOURCE_DIR="${ROOT_DIR}" APP_VERSION="${VERSION}" python -m PyInstaller --noconfirm --clean "${MACOS_SPEC}"

APP_PATH="${ROOT_DIR}/dist/VOVOCI.app"
if [[ ! -d "${APP_PATH}" ]]; then
  echo "Build failed: ${APP_PATH} not found." >&2
  exit 1
fi

echo "Build complete: ${APP_PATH}"
