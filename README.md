<div align="center">
  <img src="./logo.png" alt="VOVOCI Logo" width="140" />
  <h1>VOVOCI</h1>
  <p>Structured voice secretary for vibecoding and everyday conversation on Windows.</p>
</div>

Languages: [English](https://github.com/lovemage/vovoci/blob/main/README.md#readme) | [繁體中文](https://github.com/lovemage/vovoci/blob/main/README.zh-TW.md#readme) | [简体中文](https://github.com/lovemage/vovoci/blob/main/README.zh-CN.md#readme) | [日本語](https://github.com/lovemage/vovoci/blob/main/README.ja.md#readme) | [한국어](https://github.com/lovemage/vovoci/blob/main/README.ko.md#readme)

## Version

Current version: `0.1.4`

## Overview

VOVOCI captures your speech, transcribes it locally with `faster-whisper`, then uses your selected LLM to structure semantics while preserving your intent.

## App Screenshot

![VOVOCI App Screenshot](./docs/images/app-screenshot.png)

## Highlights

- Built for vibecoding, notes, social drafts, and general conversation
- Works in any Windows app with push-to-talk and auto paste
- Supports mixed-language input and structured output
- Multi-language UI: English, Traditional Chinese, Japanese, Korean
- Providers: OpenAI-compatible, OpenRouter, Xiaomi MiMo, Google Gemini, NVIDIA NIM
- Recording files are temporary and removed after processing

## Core Workflow

1. Hold hotkey to record
2. Local STT (`faster-whisper`) transcribes audio
3. LLM refines into structured semantic output
4. Result is pasted into the active window

## Quick Start

### 1) Windows Portable (Recommended)

1. Download `VOVOCI-portable-<version>.zip` from [Releases](https://github.com/lovemage/vovoci/releases/latest)
2. Extract the ZIP
3. Run `Run-VOVOCI-First-Time.cmd` first, then use `VOVOCI.exe`

Note: STT model files are auto-downloaded on first use (internet required once), then cached locally for offline reuse.

### 2) Clone (From Source)

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
```

### 3) Setup + Run

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## License

Apache 2.0. See [LICENSE](./LICENSE).

