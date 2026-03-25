# README Rewrite Design

## Goal

Rewrite `README.md` to follow open-source project conventions. Style: Classic Open-Source Hero (concise, high info density on first screen, detailed docs linked externally via GitHub wiki).

## Decisions

| Decision | Choice |
|---|---|
| Primary language | English |
| Typeless comparison | Mention by name + differentiate with features |
| Credits placement | Bottom "Built With" section |
| Style | Concise hero — no emoji, bold + code formatting |
| Images | `logo.png` (hero) + `image/hero.png` (screenshot) |
| Language links | Flag badges inline under hero |
| Documentation | Link to GitHub wiki (to be created) |
| License | Apache 2.0 |
| Other language READMEs | Keep existing, link from English README |

## Structure

1. **Hero** — centered logo + project name + tagline + language badges + screenshot
2. **What is VOVOCI?** — 2-sentence positioning (Typeless comparison + BYO model) + pipeline one-liner
3. **Features** — 7 bold bullet items, no emoji
4. **Quick Start** — 3 steps (clone+venv, install deps, run) + blockquote tip for model preload
5. **Documentation** — table linking to wiki pages (Provider Setup, Usage Guide, Custom Vocabulary, Troubleshooting)
6. **Requirements** — table (OS, Python, Git)
7. **Built With** — oceanads.org + Codex 5.3 + Claude Sonnet 4.6
8. **License** — Apache 2.0, issues/PRs welcome

## Tagline

"Voice input that works anywhere on Windows — powered by your own LLM."

## Files to Modify

- `README.md` — full rewrite
- `LICENSE` — create Apache 2.0 license file

## Files NOT Modified

- `README.zh-TW.md`, `README.zh-CN.md`, `README.ja.md`, `README.ko.md` — keep as-is, linked from English README
