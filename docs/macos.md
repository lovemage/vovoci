# VOVOCI macOS Setup

This page covers local setup and permission guidance for the unsigned VOVOCI build path.

## Quick Start

```bash
cd /path/to/vovoci
./scripts/setup_macos.sh
```

Optional:

```bash
./scripts/setup_macos.sh --run
```

What this script does:
- Creates `.venv`
- Installs dependencies from `requirements.txt`
- Runs smoke test: `python -c "import app; print('import ok')"`

## Manual Run

```bash
source .venv/bin/activate
python app.py
```

## macOS Privacy Permissions

VOVOCI may require these permissions:
- Microphone
- Accessibility
- Input Monitoring

Use the in-app System Check tab buttons:
- Open Microphone Settings
- Open Accessibility Settings
- Open Input Monitoring Settings

If macOS still blocks input simulation, re-open System Settings > Privacy & Security and confirm VOVOCI/Python is enabled.

## Unsigned VP Build Notes

Without Apple Developer signing/notarization, Gatekeeper may block first launch.

Try:
- Right-click app > Open
- If quarantine blocks launch:

```bash
xattr -dr com.apple.quarantine /Applications/VOVOCI.app
```

## Build Unsigned `.app`

Run on macOS:

```bash
./scripts/build_macos_app.sh
```

Output:
- `dist/VOVOCI.app`

If you need custom python/venv:

```bash
./scripts/build_macos_app.sh --python python3 --venv .venv-build
```

## Build Unsigned `.dmg`

After `dist/VOVOCI.app` exists:

```bash
./scripts/build_dmg.sh
```

Default output:
- `release/VOVOCI-macOS-<version>-unsigned.dmg`

Optional:

```bash
./scripts/build_dmg.sh --version 0.1.7 --volume VOVOCI
```
