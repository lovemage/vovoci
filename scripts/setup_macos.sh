#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENV_DIR="${ROOT_DIR}/.venv"
PYTHON_BIN="${PYTHON_BIN:-python3}"
RUN_APP=0
SKIP_OS_CHECK=0

usage() {
  cat <<'EOF'
Usage: scripts/setup_macos.sh [options]

Options:
  --run             Launch app.py after setup completes
  --venv <path>     Override virtualenv path (default: .venv at repo root)
  --python <bin>    Override python executable (default: python3)
  --skip-os-check   Allow running on non-macOS host (for CI/debug)
  -h, --help        Show this help
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --run)
      RUN_APP=1
      shift
      ;;
    --venv)
      VENV_DIR="$2"
      shift 2
      ;;
    --python)
      PYTHON_BIN="$2"
      shift 2
      ;;
    --skip-os-check)
      SKIP_OS_CHECK=1
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

if [[ "${SKIP_OS_CHECK}" -ne 1 ]]; then
  if [[ "$(uname -s)" != "Darwin" ]]; then
    echo "This setup script is for macOS only. Use --skip-os-check to bypass." >&2
    exit 1
  fi
fi

if ! command -v "${PYTHON_BIN}" >/dev/null 2>&1; then
  echo "Python not found: ${PYTHON_BIN}" >&2
  exit 1
fi

echo "[1/4] Creating virtual environment at ${VENV_DIR}"
"${PYTHON_BIN}" -m venv "${VENV_DIR}"

echo "[2/4] Installing dependencies"
source "${VENV_DIR}/bin/activate"
python -m pip install --upgrade pip setuptools wheel
python -m pip install -r "${ROOT_DIR}/requirements.txt"

echo "[3/4] Running smoke test"
cd "${ROOT_DIR}"
python -c "import app; print('import ok')"

echo "[4/4] Setup complete"
echo "Activate environment:"
echo "  source \"${VENV_DIR}/bin/activate\""
echo "Run app manually:"
echo "  python app.py"

if [[ "${RUN_APP}" -eq 1 ]]; then
  echo "Launching app.py ..."
  python app.py
fi
