<div align="center">

<img src="./logo.png" width="140" />

# VOVOCI

**Voice Your Thoughts. Refine as You Go.**

Speak naturally and get clean, refined text in your active desktop app — powered by local STT and your choice of LLM.

[![Version](https://img.shields.io/badge/version-0.1.7-blue)](https://github.com/lovemage/vovoci/releases)
[![License](https://img.shields.io/badge/license-Apache%202.0-green)](./LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-4C8BF5)](https://github.com/lovemage/vovoci)
[![Downloads](https://img.shields.io/github/downloads/lovemage/vovoci/total)](https://github.com/lovemage/vovoci/releases)

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

| 💰 Optional API Cost | 📖 Term Scanner | 🪟 Review Window |
|:---:|:---:|:---:|
| No subscription. You can use paid online LLM APIs, free-tier providers, or a local OpenAI-compatible model server. Paid network APIs are not required. | Copy a built-in prompt into your AI agent — it scans your codebase and exports a vocabulary table. Import it, and every dictation uses the right spelling. | When speech ends, VOVOCI can show a pop-up review window: the original transcript appears on the left, and the AI-restructured semantic output appears on the right before you paste or copy it. |

## New in v0.1.7

- **Floating recorder** — close VOVOCI to the system tray, choose `Show Button`, then click the floating bird once to record and again to stop, transcribe, and refine.
- **In-place settings save** — `Save Settings` confirms completion without collapsing the settings panel or jumping to History.
- **Intent-preserving Refi** — questions remain questions, statements remain statements, and bullet lists are reserved for genuinely multi-item input.
- **Three-platform releases** — one GitHub workflow now builds Windows, macOS, and Linux packages from the same versioned source.

## Quick Start

### Linux Note

- `Linux` refers to the Linux platform version (not `Lanus`).
- The app now auto-saves and auto-loads the currently selected model on next launch, so you no longer need to re-select it every time.

### Release Packages

| Platform | Package | Release | How to use |
|:---|:---|:---|:---|
| Windows | `VOVOCI-portable-0.1.7.zip` or `VOVOCI-Setup-0.1.7.exe` | [vovoci/releases/latest](https://github.com/lovemage/vovoci/releases/latest) | Extract the ZIP and run `Run-VOVOCI-First-Time.cmd`, or launch the installer. |
| macOS | `VOVOCI-macOS-0.1.7-unsigned.dmg` | [vovoci/releases/latest](https://github.com/lovemage/vovoci/releases/latest) | Move `VOVOCI.app` to `Applications`, then right-click `Open` if Gatekeeper warns. |
| Linux x86_64 | `VOVOCI-Linux-0.1.7-x86_64.tar.gz` | [vovoci/releases/latest](https://github.com/lovemage/vovoci/releases/latest) | Extract the archive and run `VOVOCI/VOVOCI`; desktop input helpers may still be required. |

### Maintainer Release Workflow

Use this flow when local changes are ready to update the remote release and website:

1. Commit and push the source changes to `lovemage/vovoci`, including `site/` and all README language files.
2. Confirm Cloudflare Pages is configured to deploy the static site from `site/` on the pushed branch, or trigger the Cloudflare Pages deploy from the Cloudflare dashboard.
3. Push a matching version tag such as `v0.1.7`, or manually dispatch the `release` workflow with `release_version=0.1.7`.
4. The workflow validates `APP_VERSION`, runs tests, builds all three platforms, and publishes the assets to `lovemage/vovoci` Releases.
5. Confirm the Release contains the Windows installer/portable ZIP, macOS DMG, and Linux x86_64 archive, then check that `https://vovoci.com` shows the latest static site.

### Portable (Recommended)

1. Download `VOVOCI-portable-0.1.7.zip` from [Releases](https://github.com/lovemage/vovoci/releases/latest)
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

> Running your own model server? Select Local Model, then enter your local API base URL, API key if your server requires one, and model name. This lets you use a local large language model without forcing a paid online API.

## App Screenshot

![VOVOCI App Screenshot](./docs/images/app-screenshot.png)

<div align="center">

🌐 [Website](https://vovoci.com) · 📄 [Apache 2.0 License](./LICENSE)

</div>
