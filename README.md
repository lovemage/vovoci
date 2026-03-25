# VOVOCI

Structured voice secretary for vibecoding and everyday conversation on Windows.

Languages: [English](./README.md) | [繁體中文](./README.zh-TW.md) | [简体中文](./README.zh-CN.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md)

VOVOCI captures your speech, transcribes it locally with `faster-whisper`, then uses your selected LLM to structure semantics without changing user intent.

## Why VOVOCI

- Built for vibecoding, notes, social drafts, and general conversation
- Works in any Windows app with push-to-talk and auto paste
- Uses your own provider and model (no vendor lock-in)
- Supports mixed-language input and structured output

## Core Workflow

1. Hold hotkey to record
2. Local STT (`faster-whisper`) transcribes audio
3. LLM refines into structured semantic output
4. Result is pasted into the active window

## Translation Mode (Dual Hotkey)

- Normal refine: hold your normal hotkey, overlay shows `Listening ...`
- Translate mode: press `Ctrl + translate hotkey`, overlay starts with `Translating`
- Output is translated and structured into your configured target language

## Features

- Local STT (offline transcription)
- Prompt system from `system_prompt.json`
- Multi-language UI: English, Traditional Chinese, Japanese, Korean
- Providers: OpenAI-compatible, OpenRouter, Xiaomi MiMo, Google Gemini, NVIDIA NIM
- Dynamic provider model list
- Custom vocabulary support
- Recording files are temporary and removed after processing

## Quick Start

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## License

Apache 2.0. See [LICENSE](./LICENSE).
