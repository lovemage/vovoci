# README Rewrite Design — 2026-03-26

## Goal

Rewrite all 5 language versions of README (EN, zh-TW, zh-CN, ja, ko) with a "magazine cover" style that balances storytelling appeal and practical open-source format.

## Target Audience

Both general users (download & use) and developers/vibecoders (understand & contribute). Upper half attracts, lower half serves.

## Structure

### 1. Hero + Badges
- Logo + product name
- Tagline: **"Voice Your Thoughts. Refine as You Go."**
- One-line subtitle: Speak naturally, get clean structured text in any Windows app — powered by local STT and your choice of LLM.
- Badge row: version, license, release downloads, platform
- Language switcher links

### 2. Why Structured Voice?
- Opening sentence: voice activates different thinking — explore ideas, catch gaps, course-correct in real time
- 3 bullets:
  - Think while you speak — voice externalizes thoughts, brain processes faster than typing
  - Steer your direction — hear reasoning out loud, adjust development approach mid-sentence
  - Ship to any context — structured output flows into IDE, agent prompt, note, chat

### 3. How It Works (Architecture)
- Mermaid LR flow: Hold Hotkey → Local STT (faster-whisper) → LLM Refine → Auto Paste
- Privacy note: local transcription, your API key, you choose which provider

### 4. Highlights (3-column table)
| Costs ~$3.80/month | Term Scanner | Dual-Hotkey Translation |
- Each cell: 2 sentences max
- Most differentiating features vs competitors

### 5. Quick Start
- Portable (recommended): 3 steps
- From Source: clone → venv → pip install → run
- Note about STT model auto-download

### 6. Providers
- Inline one-line list: OpenAI Compatible · OpenRouter · Xiaomi MiMo · Google Gemini · NVIDIA NIM (free tier)
- Tip: start with NVIDIA NIM

### 7. App Screenshot
- Existing screenshot image

### 8. Footer
- Website link + License (one line)

## Style Decisions

- Tagline philosophy: voice is a thinking tool, not just an input method
- Badge row for instant credibility
- Mermaid diagram (GitHub-native rendering, no image files)
- 3-column highlight table for visual rhythm
- Storytelling top-half → standard open-source bottom-half
- Content from site/ is condensed to 1-2 sentences per point, not duplicated in full

## Languages

All 5 versions rewritten simultaneously:
- README.md (English)
- README.zh-TW.md (Traditional Chinese)
- README.zh-CN.md (Simplified Chinese)
- README.ja.md (Japanese)
- README.ko.md (Korean)

## Non-Goals

- No GIF demo (not requested)
- No contributing/roadmap section
- No feature comparison table with competitors
- No full site/ content duplication
