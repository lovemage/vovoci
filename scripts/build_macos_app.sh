#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENV_DIR="${ROOT_DIR}/.venv-build"
PYTHON_BIN="${PYTHON_BIN:-python3}"
CLEAN=1

usage() {
  cat <<'EOF'
Usage: scripts/build_macos_app.sh [options]

Options:
  --venv <path>     Override virtualenv path (default: .venv-build)
  --python <bin>    Override python executable (default: python3)
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

python -m PyInstaller --noconfirm --clean "${ROOT_DIR}/build/macos.spec"

APP_PATH="${ROOT_DIR}/dist/VOVOCI.app"
if [[ ! -d "${APP_PATH}" ]]; then
  echo "Build failed: ${APP_PATH} not found." >&2
  exit 1
fi

echo "Build complete: ${APP_PATH}"
