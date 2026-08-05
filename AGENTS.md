# Repository Guidelines

## Project Structure & Module Organization

- `app.py` is the desktop application entry point and contains the main UI, audio, provider, and refinement flow.
- `platforms/` contains OS-specific adapters plus the platform factory; keep platform behavior isolated here.
- `tests/` contains Python `unittest` cases named `test_*.py`.
- `scripts/` contains setup, packaging, icon-generation, and portable-launcher tools. Windows packaging uses PowerShell; macOS and Linux packaging use Bash.
- `docs/` holds user and platform documentation, while `site/` contains the published static website. Root-level PNG/JPG files are application or website assets.

## Build, Test, and Development Commands

Create and activate a development environment, then install runtime dependencies:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python app.py
```

Run the full test suite and syntax checks with:

```powershell
python -m unittest discover -s tests -p "test_*.py"
python -m compileall app.py platforms tests
```

For release builds, use `powershell -ExecutionPolicy Bypass -File .\scripts\package-windows.ps1 -Version <version>` on Windows. On macOS, run `./scripts/build_macos_app.sh`, followed by `./scripts/build_dmg.sh`; on Linux, run `bash ./scripts/build_linux_app.sh --version <version>`.

## Coding Style & Naming Conventions

Use 4-space indentation, readable PEP 8-style Python, and type hints for new or changed interfaces. Use `snake_case` for functions, variables, and test methods; `PascalCase` for classes; and descriptive adapter names such as `MacOSPlatformAdapter`. No repository formatter or linter is configured, so keep imports tidy and match surrounding code.

## Testing Guidelines

Use the standard-library `unittest` framework. Add focused tests beside related coverage in `tests/`, keep test modules named `test_<area>.py`, and prefer deterministic mocks for OS, tray, keyboard, and provider integrations. Run the full discovery command before submitting changes; platform-specific changes should also pass the relevant CI workflow.

## Commit & Pull Request Guidelines

Use short imperative subjects with the established prefixes: `feat:`, `fix:`, `docs:`, `ci:`, `chore:`, or `release:`. Pull requests should explain the behavior change, list validation commands, identify affected platforms, and include screenshots for UI or website changes. Link an issue when applicable and keep generated build outputs out of commits.

## Security & Configuration Tips

API keys and local settings belong in `config.json` or environment-specific configuration and must never be committed. Treat `models/`, `build/`, `dist/`, and `release/` as generated output; inspect release contents before publishing.
