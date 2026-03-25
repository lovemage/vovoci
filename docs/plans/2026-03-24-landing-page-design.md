# Landing Page Design

## Overview
Single-page static product website for VOVOCI, deployed on Cloudflare Pages.

## Specs
- **Language:** English only
- **Download:** Links to GitHub Releases (`https://github.com/lovemage/vovoci/releases`)
- **GitHub:** `https://github.com/lovemage/vovoci`
- **Tech:** Static HTML + CSS + vanilla JS, no frameworks

## Page Sections (top to bottom)

1. **Navbar** — Logo + anchor nav (Features, How it Works, Quick Start, FAQ) + GitHub button
2. **Hero** — Logo, tagline, hero screenshot, 2x CTA (Download, View on GitHub)
3. **Pipeline** — 4-step visual: Push-to-talk → Local STT → LLM Refine → Auto Paste
4. **Features** — 7 cards (Push-to-talk, Local STT, LLM Refinement, Mixed-language, 5 Providers, Auto Paste, Custom Vocabulary)
5. **Providers** — 5 LLM provider names in a row
6. **Quick Start** — 3 steps: Clone → Install → Run (with code blocks)
7. **Requirements** — Table: Windows 10/11, Python 3.10+, Git
8. **FAQ** — 6 accordion items
9. **Footer** — GitHub link, Apache 2.0, Built by oceanads.org

## FAQ Content
1. Is VOVOCI free? — Yes, open source Apache 2.0
2. Do I need internet? — STT runs locally (no), LLM refine needs API access (yes)
3. What languages are supported? — zh, en, ja, ko, fr, de, es + mixed input
4. Do I need a GPU? — No, CPU works. GPU accelerates STT.
5. Do LLM APIs cost money? — Depends on provider; VOVOCI itself is free
6. Does it support macOS/Linux? — Windows only for now

## Assets
- `logo.png` — navbar + hero
- `image/hero.png` — product screenshot
- `github.png` — GitHub icon
- `build/app.ico` → `favicon.ico`

## File Structure
```
site/
├── index.html
├── styles.css
├── script.js
├── logo.png (copy)
├── hero.png (copy)
├── github.png (copy)
└── favicon.ico (converted from app.ico)
```

## Naming Conventions (shared across HTML/CSS/JS)
- Sections: `#navbar`, `#hero`, `#pipeline`, `#features`, `#providers`, `#quickstart`, `#requirements`, `#faq`, `#footer`
- CSS classes: `.container`, `.section`, `.btn`, `.btn-primary`, `.btn-secondary`, `.card`, `.faq-item`, `.faq-question`, `.faq-answer`, `.pipeline-step`, `.provider-logo`, `.code-block`, `.nav-link`, `.active`
- JS targets: `.faq-question` (click toggle), `a[href^="#"]` (smooth scroll), `.navbar` (scroll shadow)
