<div align="center">

<img src="./logo.png" width="140" />

# VOVOCI

**Voice Your Thoughts. Refine as You Go.**

Speak naturally, get clean structured text in any Windows app — powered by local STT and your choice of LLM.

[![Version](https://img.shields.io/badge/version-0.1.5-blue)](https://github.com/lovemage/vovoci-packaging/releases)
[![License](https://img.shields.io/badge/license-Apache%202.0-green)](./LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows-0078D6?logo=windows)](https://github.com/lovemage/vovoci)
[![Downloads](https://img.shields.io/github/downloads/lovemage/vovoci-packaging/total)](https://github.com/lovemage/vovoci-packaging/releases)

Languages: [English](README.md) | [繁體中文](README.zh-TW.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

</div>

## Why Structured Voice?

Speaking activates a different kind of thinking — you explore ideas, catch gaps, and course-correct in real time. VOVOCI turns that raw thinking into clean, structured output so you can:

- **Think while you speak** — voice externalizes your thoughts, helping your brain process and refine faster than typing alone
- **Steer your direction** — hear your own reasoning out loud, spot what's off, and adjust your development approach mid-sentence
- **Ship to any context** — structured output flows directly into your IDE, agent prompt, note, or chat — no cleanup needed

## How It Works

```mermaid
graph LR
    A[🎤 Hold Hotkey <br> Speak naturally] --> B[🖥️ Local STT <br> faster-whisper]
    B --> C[🤖 LLM Refine <br> Your chosen provider]
    C --> D[📋 Auto Paste <br> Active window]
```

> Local transcription. Your API key. No data leaves your machine until the LLM step — and you choose which provider to trust.

## Highlights

| 💰 ~$3.80/month | 📖 Term Scanner | 🌐 Dual-Hotkey Translation |
|:---:|:---:|:---:|
| No subscription. You only pay for LLM API tokens you actually use. Heavy daily usage on Grok 4.1 Fast via OpenRouter costs ~$3.80/mo. | Copy a built-in prompt into your AI agent — it scans your codebase and exports a vocabulary table. Import it, and every dictation uses the right spelling. | Assign a second hotkey for translation. Press it instead of the regular dictation key, and VOVOCI translates your speech into your target language automatically. |

## Quick Start

### Linux Note

- `Linux` refers to the Linux platform version (not `Lanus`).
- The app now auto-saves and auto-loads the currently selected model on next launch, so you no longer need to re-select it every time.

### Release Packages

| Platform | Package | Release | How to use |
|:---|:---|:---|:---|
| Windows | `VOVOCI-portable-0.1.5.zip` | [vovoci-packaging/releases/latest](https://github.com/lovemage/vovoci-packaging/releases/latest) | Extract, run `Run-VOVOCI-First-Time.cmd`, then launch `VOVOCI.exe`. |
| macOS | `VOVOCI-macOS-0.1.5-unsigned.dmg` | [vovoci-packaging/releases/latest](https://github.com/lovemage/vovoci-packaging/releases/latest) | Open the DMG, move `VOVOCI.app` to `Applications`, then right-click `Open` on first launch if Gatekeeper warns. |

### Maintainer Release Workflow

Use this flow when local changes are ready to update the remote release and website:

1. Commit and push the source changes to `lovemage/vovoci`, including `site/` and all README language files.
2. Confirm Cloudflare Pages is configured to deploy the static site from `site/` on the pushed branch, or trigger the Cloudflare Pages deploy from the Cloudflare dashboard.
3. Run the `release` workflow in `lovemage/vovoci-packaging` with `source_ref` set to the pushed branch or tag and `release_version` set to `0.1.5`.
4. Keep `package_windows=true`, `package_macos=true`, and `publish_release=true` to build and publish Windows and macOS artifacts. Linux packaging is not published by this workflow; Linux support has been tested locally from source with the Python app.
5. After the workflow finishes, confirm the GitHub Release contains `VOVOCI-Setup-0.1.5.exe`, `VOVOCI-portable-0.1.5.zip`, and `VOVOCI-macOS-0.1.5-unsigned.dmg`, then check that `https://vovoci.com` shows the latest static site.

### Portable (Recommended)

1. Download `VOVOCI-portable-0.1.5.zip` from [Releases](https://github.com/lovemage/vovoci-packaging/releases/latest)
2. Extract and run `Run-VOVOCI-First-Time.cmd`
3. Launch `VOVOCI.exe`

> STT models auto-download on first use (internet required once), then cached locally for offline reuse.

### From Source

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
python -m venv .venv && .venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## Providers

VOVOCI works with six LLM providers out of the box, including local OpenAI-compatible model servers, so you're never locked in.

**OpenAI Compatible** · **OpenRouter** · **Xiaomi MiMo** · **Google Gemini** · **NVIDIA NIM** *(free tier)* · **Local Model**

> Running your own model server? Select Local Model, then enter your local API base URL, API key, and model name.

## App Screenshot

![VOVOCI App Screenshot](./docs/images/app-screenshot.png)

<div align="center">

🌐 [Website](https://vovoci.com) · 📄 [Apache 2.0 License](./LICENSE)

</div>
