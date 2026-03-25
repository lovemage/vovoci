<div align="center">
  <img src="./logo.png" alt="VOVOCI Logo" width="140" />
  <h1>VOVOCI</h1>
  <p>Structured voice secretary for vibecoding and everyday conversation on Windows.</p>
</div>

Languages: [English](./README.md) | [繁體中文](./README.zh-TW.md) | [简体中文](./README.zh-CN.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md)

## Overview

VOVOCI captures your speech, transcribes it locally with `faster-whisper`, then uses your selected LLM to structure semantics while preserving your intent.

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

### 1) Clone

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
```

### 2) Setup + Run

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## License

Apache 2.0. See [LICENSE](./LICENSE).
