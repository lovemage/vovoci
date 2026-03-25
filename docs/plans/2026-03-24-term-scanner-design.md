# Term Scanner — Design Document

**Date:** 2026-03-24
**Status:** Approved

## Overview

Add a "Term Scanner" tab to the Settings dialog that scans local AI tool configuration files, extracts proper nouns / technical terms via LLM, and imports them into the existing Custom Vocabulary.

Pipeline: Scan paths → Select files → Extract Terms (LLM) → Select terms → Import to Vocabulary

## Motivation

Users of VOVOCI often work with AI coding tools (Claude Code, Cursor, Codex, etc.) that maintain configuration files full of domain-specific terminology. Manually adding these terms to Custom Vocabulary is tedious. This feature automates the extraction.

## Scan Paths

### Project-level (relative to app directory / git root)

| Tool | Path |
|---|---|
| Claude Code | `./CLAUDE.md` |
| Gemini CLI | `./GEMINI.md` |
| OpenAI Codex | `./AGENTS.md` |
| Cursor | `./.cursor/rules/*.md` |
| Windsurf | `./.windsurf/rules/*.md`, `./.windsurfrules` |
| Cline | `./.clinerules`, `./.clinerules/*.md` |
| GitHub Copilot | `./.github/copilot-instructions.md` |
| README | `./README.md` |

### User-level (`%USERPROFILE%` / `~`)

| Tool | Path |
|---|---|
| Claude Code | `~/.claude/CLAUDE.md`, `~/.claude/skills/**/*.md` |
| Gemini CLI | `~/.gemini/GEMINI.md` |
| OpenAI Codex | `~/.codex/AGENTS.md` |
| Windsurf | `~/.codeium/windsurf/memories/global_rules.md` |
| Continue.dev | `~/.continue/config.yaml` |
| Aider | `~/.aider.conf.yml` |

Users can add custom paths (files or folders) via UI, stored in `config.json["scanner_custom_paths"]`.

## UI Layout — Term Scanner Tab

Fourth tab in Settings Notebook, three zones:

### Top: Scan Sources
- Treeview with columns: checkbox, Tool, File Path
- Buttons: **Scan**, **Add Path** (file picker), **Remove Path**

### Middle: Candidate Terms
- Treeview with columns: checkbox, Term, Preferred, Source File
- Populated after Extract Terms
- Users can edit Preferred field on selected row

### Bottom: Action Row
- **Extract Terms** — calls LLM to extract terms from checked files
- **Import to Vocabulary** — imports checked terms to Custom Vocabulary
- Status label for progress feedback

Styling: existing `Surface.TFrame`, `App.Treeview`, `Hero.TButton`, `Ghost.TButton`.

## LLM Extraction Logic

### API Call
- Uses current Provider / API Key / Model settings
- Runs in background thread (same pattern as `_refine_worker`)

### Prompt

System:
```
You are a terminology extractor. From the provided text, extract all proper nouns,
tool names, framework names, API names, product names, technical terms, and
domain-specific vocabulary. For each term, provide the preferred/canonical form.

Output as JSON array: [{"term": "...", "preferred": "..."}, ...]
Only output the JSON array, nothing else.
```

User message: file contents separated by `--- {filename} ---` markers.

### Multi-file Handling
- Merge checked files into one user message
- If total > 8000 chars, split into batches (~8000 chars each), merge results
- Deduplicate: case-insensitive on term field, keep first occurrence

### Import Rules
- Case-insensitive match against existing Custom Vocabulary
- Existing terms are skipped (not overwritten)
- Note field auto-filled: `"Auto-extracted from {filename}"`
- Status reports: "Imported X terms, skipped Y existing"

## Config Changes

Single new field in `config.json`:

```json
{
  "scanner_custom_paths": []
}
```

- Default: empty array
- Backward compatible: `_load_config()` defaults to `[]`
- Scan results are not persisted (always fresh scan)

## Edge Cases

| Scenario | Handling |
|---|---|
| No API Key/Model configured | Show warning, block Extract |
| No files found | Empty treeview, status hint to use Add Path |
| File unreadable (permissions) | Skip file, report in status |
| LLM returns non-JSON | Regex extract `[...]` block, fallback to error message |
| All terms already exist | Status: "All terms already exist, nothing to import" |
| Single file > 8000 chars | Truncate to 8000, note truncation in status |

## Out of Scope (YAGNI)

- No automatic/periodic scanning
- No file content preview
- No vocabulary diff view
- No undo import
- No multi-language UI (follows existing English-only interface)
