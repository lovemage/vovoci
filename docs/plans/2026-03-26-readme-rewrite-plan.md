# README Rewrite Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite all 5 README language versions with "magazine cover" style — storytelling top-half, practical open-source bottom-half.

**Architecture:** Each README follows the same 8-section structure defined in the design doc. English version is written first as the canonical source, then translated to zh-TW, zh-CN, ja, ko. Mermaid diagrams and badges are shared across all versions.

**Tech Stack:** Markdown, Mermaid (GitHub-native), shields.io badges

---

### Task 1: Write English README (canonical)

**Files:**
- Modify: `README.md`

**Step 1: Write the complete English README**

Structure (8 sections):

1. **Hero + Badges**
   - Logo centered, h1 VOVOCI
   - Tagline: "Voice Your Thoughts. Refine as You Go."
   - Subtitle: Speak naturally, get clean structured text in any Windows app — powered by local STT and your choice of LLM.
   - Badges: version `0.1.4`, license `Apache 2.0`, downloads (GitHub releases), platform `Windows`
   - Language switcher row

2. **Why Structured Voice?**
   - Opening: Speaking activates different thinking...
   - 3 bullets: Think while you speak / Steer your direction / Ship to any context

3. **How It Works** (Mermaid LR diagram)
   - 4 nodes: Hold Hotkey → Local STT → LLM Refine → Auto Paste
   - Privacy blockquote below

4. **Highlights** (3-column table)
   - Costs ~$3.80/month | Term Scanner | Dual-Hotkey Translation
   - Each cell: 2 sentences

5. **Quick Start**
   - Portable: 3 steps with link to Releases
   - From Source: code block (clone → venv → pip → run)
   - Note about STT model auto-download

6. **Providers**
   - Inline list: OpenAI Compatible · OpenRouter · Xiaomi MiMo · Google Gemini · NVIDIA NIM (free tier)
   - Tip blockquote

7. **App Screenshot**
   - Existing image `./docs/images/app-screenshot.png`

8. **Footer**
   - Website + License one-liner

**Step 2: Review and verify**

- Confirm mermaid renders on GitHub
- Confirm badge URLs are correct
- Confirm all internal links work

**Step 3: Commit**

```bash
git add README.md
git commit -m "docs: rewrite English README with magazine-cover style"
```

---

### Task 2: Write Traditional Chinese README (zh-TW)

**Files:**
- Modify: `README.zh-TW.md`

**Step 1: Translate English README to zh-TW**

Translation guidelines:
- Tagline: 自然翻譯，保留英文技術詞彙（STT, LLM, faster-whisper）
- Section headings: 翻譯為中文
- Code blocks: 保持英文不翻譯
- Mermaid node labels: 翻譯為中文
- Badge alt text: 保持英文
- Tone: 自然口語，不過度正式

**Step 2: Commit**

```bash
git add README.zh-TW.md
git commit -m "docs: rewrite zh-TW README"
```

---

### Task 3: Write Simplified Chinese README (zh-CN)

**Files:**
- Modify: `README.zh-CN.md`

**Step 1: Convert zh-TW version to zh-CN**

- 繁轉簡 + 用語調整（e.g. 軟體→软件）
- Mermaid labels also converted

**Step 2: Commit**

```bash
git add README.zh-CN.md
git commit -m "docs: rewrite zh-CN README"
```

---

### Task 4: Write Japanese README (ja)

**Files:**
- Modify: `README.ja.md`

**Step 1: Translate English README to Japanese**

- Natural Japanese tone, not overly formal (です/ます style)
- Keep English technical terms
- Mermaid labels in Japanese

**Step 2: Commit**

```bash
git add README.ja.md
git commit -m "docs: rewrite ja README"
```

---

### Task 5: Write Korean README (ko)

**Files:**
- Modify: `README.ko.md`

**Step 1: Translate English README to Korean**

- Natural Korean tone (합니다 style)
- Keep English technical terms
- Mermaid labels in Korean

**Step 2: Commit**

```bash
git add README.ko.md
git commit -m "docs: rewrite ko README"
```
