# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**VOVOCI** — a Windows desktop app for voice input and text refinement. Pipeline: Push-to-talk → Local STT (faster-whisper) → Optional LLM Refine → Optional Auto Paste.

Repository: https://github.com/lovemage/vovoci

## Commands

```powershell
# Run the app
python app.py

# Install dependencies
pip install keyboard numpy sounddevice faster-whisper ctranslate2 pystray pillow

# Virtual environment setup (Windows)
python -m venv .venv
.venv\Scripts\activate
```

No test suite, linter, or build system exists. The app is run directly.

## Release Workflow (Agent Policy)

For Windows releases, always use this process:

1. Build installer
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\package-windows.ps1 -Version <version>
```
2. Confirm artifact exists at `release/VOVOCI-Setup-<version>.exe`.
3. Commit/push source changes only. Do **not** commit `release/*.exe` into repository history.
4. Publish binary via GitHub Release asset upload (not repository files), for example:
```powershell
gh release create v<version> --title "VOVOCI v<version>" --notes "Windows installer release"
gh release upload v<version> release/VOVOCI-Setup-<version>.exe --clobber
```

## Architecture

**Single-file monolith:** All application code lives in `app.py` (~2400 lines). The main class is `RefineApp`.

### Key Subsystems

- **Audio/STT Pipeline:** `sounddevice` records audio via push-to-talk hotkey (`keyboard` library). Audio is transcribed locally using `faster-whisper` (Whisper models cached in `models/`). Supports primary language + secondary language hints and VAD filtering.

- **Text Refinement:** Sends transcribed text to one of 5 LLM providers (OpenAI Compatible, OpenRouter, Xiaomi MiMo V2, Google Gemini API, NVIDIA NIM) via OpenAI-compatible `/chat/completions` API. Per-provider profiles store API key, base URL, and model.

- **Custom Vocabulary:** User-defined term mappings (term → preferred form + notes) are merged into the system prompt at refinement time via `_build_effective_system_prompt()`.

- **GUI:** Tkinter with custom ttk styling. Main window (1120x800), settings dialog, floating text output window, recording overlay, and system tray icon (`pystray`).

- **Threading:** Main thread runs Tkinter event loop. Separate threads handle: global hotkey hook, audio recording callback, STT transcription worker, LLM refine worker, permission checker, and tray icon. A `pipeline_token` counter prevents stale callbacks from earlier operations.

- **Configuration:** All settings persist in `config.json` (provider profiles, hotkey, STT settings, custom terms, conversation history with timestamps).

### Platform Dependencies

Windows-only. Uses `ctypes` for `GetForegroundWindow`, `GUITHREADINFO` (text caret detection), and administrator privilege checking. The `keyboard` library requires elevated privileges when the target app runs as admin.

### Color Palette

Defined at the top of `RefineApp.__init__()`:
- Background: `#f3efe7`, Surface: `#fbf7f1`, Card: `#fffdf9`
- Primary accent: `#1f6b63` (teal), Alt accent: `#c86f4a` (burnt orange)

## Key Patterns

- **Provider management:** Each provider has a profile dict in `config.json["provider_profiles"]`. Switching providers loads the corresponding profile. Some providers (NVIDIA NIM, OpenRouter) dynamically fetch model lists from their API.

- **Self-update:** Compares local version against GitHub releases/tags. Updates via `git pull --ff-only` if the app was cloned from git.

- **Legacy config compatibility:** `_load_config()` handles migration from older config formats (e.g., single `api_key` field to per-provider profiles).
