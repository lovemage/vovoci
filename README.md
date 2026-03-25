# VOVOCI

Structured voice secretary for vibecoding and everyday conversation on Windows.

VOVOCI captures your speech, transcribes it locally with `faster-whisper`, then uses your own selected LLM to structure semantics without changing user intent.

## Why VOVOCI

- Built for **vibecoding**, notes, social drafts, and general conversation
- Works in **any Windows app** with push-to-talk and auto paste
- Uses your own provider and model (no vendor lock-in)
- Handles mixed language input (for example `[language]-English` mixed output)

## Core Workflow

1. Hold hotkey to record
2. Local STT (`faster-whisper`) transcribes audio
3. LLM refines into structured semantic output
4. Result is pasted into the active window

## Translation Mode (Dual Hotkey)

- Normal refine: hold your normal hotkey -> overlay shows `Listening ...`
- Translate mode: press `Ctrl + translate hotkey` -> overlay starts with `Translating`
- Output is translated and structured into your configured target language

## Features

- Local STT (offline transcription)
- Semantic structuring prompt system from `system_prompt.json`
- Multi-language UI: English, Traditional Chinese, Japanese, Korean
- Multiple providers: OpenAI-compatible, OpenRouter, Xiaomi MiMo, Google Gemini, NVIDIA NIM
- Dynamic model list per provider with keyword search in selector
- Custom vocabulary support
- Recording audio is temporary and deleted after refine flow

## Suggested Models

- `gemini-2.5-flash`
- `openai/gpt-oss-20b` (NVIDIA)
- `Qwen2.5-Coder-7B-Instruct`
- `nvidia/nemotron-nano-9b-v2`
- `mistralai/mistral-small-24b-instruct`

## Quick Start

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

On first launch, open Settings -> Local STT -> Preload STT Model, then preload `small`.

## Build Windows Installer

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-windows-installer.ps1 -Version 0.1.0
```

Output installer path:

- `release/VOVOCI-Setup-0.1.0.exe`

## One-Command Packaging Script

You can also run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\package-windows.ps1
```

This wrapper auto-reads version from `.agent` (fallback `0.1.0`) and runs installer build.

## Website Sections (Reference)

- Model performance comparison: `#model-performance`
- Translation feature section: `#translation-mode`

## License

Apache 2.0. See [LICENSE](./LICENSE).
