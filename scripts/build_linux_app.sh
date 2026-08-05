#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENV_DIR="${ROOT_DIR}/.venv-build"
PYTHON_BIN="${PYTHON_BIN:-python3}"
VERSION="${APP_VERSION:-0.1.7}"
CLEAN=1

usage() {
  cat <<'EOF'
Usage: scripts/build_linux_app.sh [options]

Options:
  --venv <path>     Override virtualenv path (default: .venv-build)
  --python <bin>    Override Python executable (default: python3)
  --version <ver>   Override package version
  --no-clean        Keep previous build/dist outputs
  -h, --help        Show this help

Output:
  release/VOVOCI-Linux-<version>-x86_64.tar.gz
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

if [[ "$(uname -s)" != "Linux" ]]; then
  echo "This script builds the Linux package and must run on Linux." >&2
  exit 1
fi

if ! command -v "${PYTHON_BIN}" >/dev/null 2>&1; then
  echo "Python not found: ${PYTHON_BIN}" >&2
  exit 1
fi

if [[ ! -d "${VENV_DIR}" ]]; then
  "${PYTHON_BIN}" -m venv "${VENV_DIR}"
fi

source "${VENV_DIR}/bin/activate"
python -m pip install --upgrade pip setuptools wheel
python -m pip install -r "${ROOT_DIR}/requirements-build.txt"

cd "${ROOT_DIR}"
if [[ "${CLEAN}" -eq 1 ]]; then
  rm -rf "${ROOT_DIR}/build/linux" "${ROOT_DIR}/dist/VOVOCI"
fi

python -m PyInstaller --noconfirm --clean "${ROOT_DIR}/linux.spec"

APP_PATH="${ROOT_DIR}/dist/VOVOCI/VOVOCI"
if [[ ! -x "${APP_PATH}" ]]; then
  echo "Build failed: ${APP_PATH} not found or not executable." >&2
  exit 1
fi

mkdir -p "${ROOT_DIR}/release"
OUTPUT_PATH="${ROOT_DIR}/release/VOVOCI-Linux-${VERSION}-x86_64.tar.gz"
tar -C "${ROOT_DIR}/dist" -czf "${OUTPUT_PATH}" VOVOCI
echo "Linux package complete: ${OUTPUT_PATH}"
