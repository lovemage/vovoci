#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_PATH="${ROOT_DIR}/dist/VOVOCI.app"
RELEASE_DIR="${ROOT_DIR}/release"
VOL_NAME="VOVOCI"
VERSION=""
OUTPUT_PATH=""

usage() {
  cat <<'EOF'
Usage: scripts/build_dmg.sh [options]

Options:
  --app <path>        Path to .app bundle (default: dist/VOVOCI.app)
  --version <ver>     Override version in output filename
  --output <path>     Override output dmg path
  --volume <name>     DMG volume name (default: VOVOCI)
  -h, --help          Show this help

Output default:
  release/VOVOCI-macOS-<version>-unsigned.dmg
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --app)
      APP_PATH="$2"
      shift 2
      ;;
    --version)
      VERSION="$2"
      shift 2
      ;;
    --output)
      OUTPUT_PATH="$2"
      shift 2
      ;;
    --volume)
      VOL_NAME="$2"
      shift 2
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
  echo "This script must run on macOS (requires hdiutil)." >&2
  exit 1
fi

if [[ ! -d "${APP_PATH}" ]]; then
  echo "App bundle not found: ${APP_PATH}" >&2
  echo "Build app first: ./scripts/build_macos_app.sh" >&2
  exit 1
fi

if [[ -z "${VERSION}" ]]; then
  if [[ -f "${ROOT_DIR}/.agent" ]]; then
    VERSION="$(python3 -c "import json,sys;print((json.load(open('${ROOT_DIR}/.agent','r',encoding='utf-8')).get('version') or '').strip())" 2>/dev/null || true)"
  fi
fi
if [[ -z "${VERSION}" ]]; then
  VERSION="0.1.4"
fi

mkdir -p "${RELEASE_DIR}"
if [[ -z "${OUTPUT_PATH}" ]]; then
  OUTPUT_PATH="${RELEASE_DIR}/VOVOCI-macOS-${VERSION}-unsigned.dmg"
fi

STAGE_DIR="$(mktemp -d "${TMPDIR:-/tmp}/vovoci_dmg_stage.XXXXXX")"
cleanup() {
  rm -rf "${STAGE_DIR}"
}
trap cleanup EXIT

cp -R "${APP_PATH}" "${STAGE_DIR}/VOVOCI.app"
ln -s /Applications "${STAGE_DIR}/Applications"

echo "Creating DMG: ${OUTPUT_PATH}"
hdiutil create \
  -volname "${VOL_NAME}" \
  -srcfolder "${STAGE_DIR}" \
  -ov \
  -format UDZO \
  "${OUTPUT_PATH}"

echo "DMG build complete: ${OUTPUT_PATH}"
