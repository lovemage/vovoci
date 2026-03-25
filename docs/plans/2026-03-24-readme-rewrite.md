# README Rewrite Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite README.md to a concise open-source hero style, create Apache 2.0 LICENSE file.

**Architecture:** Two files to write — README.md (full rewrite) and LICENSE (new). No code changes. Wiki pages are out of scope for this plan (separate task).

**Tech Stack:** Markdown, GitHub-flavored markdown

---

### Task 1: Write README.md

**Files:**
- Modify: `README.md` (full rewrite)

**Step 1: Write the new README.md**

Full content — replace entire file:

```markdown
<div align="center">
  <img src="logo.png" alt="VOVOCI logo" width="120">
  <h1>VOVOCI</h1>
  <p><strong>Voice input that works anywhere on Windows — powered by your own LLM.</strong></p>

  <a href="./README.zh-TW.md">🇹🇼 繁體中文</a> ·
  <a href="./README.zh-CN.md">🇨🇳 简体中文</a> ·
  <a href="./README.ja.md">🇯🇵 日本語</a> ·
  <a href="./README.ko.md">🇰🇷 한국어</a>

  <br><br>

  <img src="image/hero.png" alt="VOVOCI screenshot" width="700">
</div>

---

## What is VOVOCI?

Like [Typeless](https://typeless.ch/), VOVOCI lets you speak instead of type — in any Windows app. The difference: you connect your own LLM (OpenAI, Gemini, OpenRouter, and more) to refine transcriptions, so there's no vendor lock-in and no recurring subscription.

**Push-to-talk → Local STT → LLM Refine → Auto Paste**

## Features

- **Push-to-talk** — Hold a hotkey to record, release to transcribe
- **Local STT** — Runs `faster-whisper` on your machine, no cloud dependency
- **LLM Refinement** — Fixes filler words, grammar, and flow while preserving intent
- **Mixed-language support** — Handles Chinese-English (and more) mixed input
- **5 LLM providers** — OpenAI Compatible · OpenRouter · Xiaomi MiMo · Google Gemini · NVIDIA NIM
- **Auto Paste** — Refined text goes straight into the active window
- **Custom Vocabulary** — Define domain-specific term mappings for accurate refinement

## Quick Start

**1. Clone and set up**

\```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
python -m venv .venv
.venv\Scripts\activate
\```

**2. Install dependencies**

\```powershell
pip install keyboard numpy sounddevice faster-whisper ctranslate2 pystray pillow
\```

**3. Run**

\```powershell
python app.py
\```

> On first launch, go to ***Settings → Local STT → Preload STT Model*** and download the `small` model to get started.

## Documentation

| Topic | Description |
|---|---|
| [Provider Setup](../../wiki/Provider-Setup) | Configure API keys for each LLM provider |
| [Usage Guide](../../wiki/Usage-Guide) | Hotkey setup, auto-refine, auto-paste options |
| [Custom Vocabulary](../../wiki/Custom-Vocabulary) | Define domain-specific term mappings |
| [Troubleshooting](../../wiki/Troubleshooting) | Common issues and fixes |

## Requirements

| Item | Version |
|---|---|
| OS | Windows 10 / 11 |
| Python | 3.10+ |
| Git | Required for self-update |

## Built With

Developed by [oceanads.org](https://oceanads.org) with assistance from **Codex 5.3** and **Claude Sonnet 4.6**.

## License

Licensed under [Apache 2.0](./LICENSE). Issues and pull requests are welcome.
```

**Step 2: Verify the file renders correctly**

Visually scan the markdown for broken links, unclosed tags, or formatting issues.

**Step 3: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README to concise open-source hero style"
```

---

### Task 2: Create LICENSE file

**Files:**
- Create: `LICENSE`

**Step 1: Write the Apache 2.0 license file**

Create `LICENSE` with the standard Apache License 2.0 text. Copyright line: `Copyright 2026 oceanads.org`

**Step 2: Commit**

```bash
git add LICENSE
git commit -m "docs: add Apache 2.0 license"
```

---

### Task 3: Create GitHub Wiki stub pages

**Out of scope for file changes.** After README is merged, create these wiki pages on GitHub:

- `Provider-Setup` — migrate content from old README provider table
- `Usage-Guide` — migrate usage guide section
- `Custom-Vocabulary` — migrate custom vocabulary section
- `Troubleshooting` — migrate troubleshooting table

This is a manual GitHub step, not a code task.
