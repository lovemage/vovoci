# Term Scanner Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a "Term Scanner" tab to Settings that scans local AI tool config files, extracts proper nouns via LLM, and imports them into Custom Vocabulary.

**Architecture:** New constant `SCANNER_PATHS` defines all scan targets. New methods on `RefineApp` handle scanning, UI, LLM extraction, and import. All code stays in `app.py` following the existing monolith pattern. The Term Scanner tab is the 4th tab in the Settings Notebook.

**Tech Stack:** Python 3.10+, Tkinter/ttk, `urllib.request` for LLM API calls, `pathlib`/`glob` for file scanning, `json` for response parsing.

**Design doc:** `docs/plans/2026-03-24-term-scanner-design.md`

---

### Task 1: Add SCANNER_PATHS constant

**Files:**
- Modify: `app.py:48-52` (after `GITHUB_API` / `GITHUB_REPO_URL` constants, before `PROVIDER_PORTALS`)

**Step 1: Add the constant**

Insert after line 53 (`GITHUB_REPO_URL = ...`), before `PROVIDER_PORTALS`:

```python
SCANNER_PATHS_PROJECT = [
    ("Claude Code", "CLAUDE.md"),
    ("Gemini CLI", "GEMINI.md"),
    ("OpenAI Codex", "AGENTS.md"),
    ("Cursor", ".cursor/rules/*.md"),
    ("Windsurf", ".windsurf/rules/*.md"),
    ("Windsurf", ".windsurfrules"),
    ("Cline", ".clinerules"),
    ("Cline", ".clinerules/*.md"),
    ("GitHub Copilot", ".github/copilot-instructions.md"),
    ("README", "README.md"),
]

SCANNER_PATHS_USER = [
    ("Claude Code", ".claude/CLAUDE.md"),
    ("Claude Code", ".claude/skills/**/*.md"),
    ("Gemini CLI", ".gemini/GEMINI.md"),
    ("OpenAI Codex", ".codex/AGENTS.md"),
    ("Windsurf", ".codeium/windsurf/memories/global_rules.md"),
    ("Continue.dev", ".continue/config.yaml"),
    ("Aider", ".aider.conf.yml"),
]

TERM_EXTRACTOR_SYSTEM_PROMPT = (
    "You are a terminology extractor. From the provided text, extract all proper nouns, "
    "tool names, framework names, API names, product names, technical terms, and "
    "domain-specific vocabulary. For each term, provide the preferred/canonical form.\n\n"
    "Output as JSON array: [{\"term\": \"...\", \"preferred\": \"...\"}, ...]\n"
    "Only output the JSON array, nothing else."
)
```

**Step 2: Verify syntax**

Run: `python -c "import ast; ast.parse(open('app.py').read()); print('OK')"`
Expected: `OK`

**Step 3: Commit**

```bash
git add app.py
git commit -m "feat(scanner): add SCANNER_PATHS constants and extraction prompt"
```

---

### Task 2: Add scanner state variables to __init__

**Files:**
- Modify: `app.py` — `RefineApp.__init__()`, after `self._pipeline_token = 0` (line 260)

**Step 1: Add instance variables**

Insert after `self._pipeline_token = 0`:

```python
        self.scanner_custom_paths = []
        self._scanner_file_tree = None
        self._scanner_term_tree = None
        self._scanner_status_var = None
        self._scanner_preferred_var = None
        self._is_extracting = False
```

**Step 2: Verify syntax**

Run: `python -c "import ast; ast.parse(open('app.py').read()); print('OK')"`
Expected: `OK`

**Step 3: Commit**

```bash
git add app.py
git commit -m "feat(scanner): add scanner state variables to __init__"
```

---

### Task 3: Add scanner_custom_paths to _load_config and _save_config

**Files:**
- Modify: `app.py` — `_load_config()` and `_save_config()`

**Step 1: Add load logic**

In `_load_config()`, after the line `self.conversation_history = history[-300:]` (approximately line 1629), add:

```python
            raw_scanner_paths = data.get("scanner_custom_paths", [])
            if isinstance(raw_scanner_paths, list):
                self.scanner_custom_paths = [str(p) for p in raw_scanner_paths if isinstance(p, str) and p.strip()]
            else:
                self.scanner_custom_paths = []
```

**Step 2: Add save logic**

In `_save_config()`, in the `data = { ... }` dict, after the `"conversation_history"` key (approximately line 1661), add:

```python
            "scanner_custom_paths": self.scanner_custom_paths,
```

**Step 3: Verify syntax**

Run: `python -c "import ast; ast.parse(open('app.py').read()); print('OK')"`
Expected: `OK`

**Step 4: Commit**

```bash
git add app.py
git commit -m "feat(scanner): persist scanner_custom_paths in config.json"
```

---

### Task 4: Add _scan_context_files method

**Files:**
- Modify: `app.py` — new method on `RefineApp`, insert before `_close_settings_window`

**Step 1: Add the scan method**

Insert as a new method on `RefineApp` (before `_close_settings_window`):

```python
    def _scan_context_files(self) -> list[tuple[str, str]]:
        """Return list of (tool_name, absolute_path) for all found context files."""
        found = []
        seen = set()

        project_dir = APP_DIR
        for tool, pattern in SCANNER_PATHS_PROJECT:
            for match in project_dir.glob(pattern):
                if match.is_file() and str(match) not in seen:
                    seen.add(str(match))
                    found.append((tool, str(match)))

        home = Path.home()
        for tool, pattern in SCANNER_PATHS_USER:
            for match in home.glob(pattern):
                if match.is_file() and str(match) not in seen:
                    seen.add(str(match))
                    found.append((tool, str(match)))

        for custom in self.scanner_custom_paths:
            p = Path(custom)
            if p.is_file() and str(p) not in seen:
                seen.add(str(p))
                found.append(("Custom", str(p)))
            elif p.is_dir():
                for match in p.glob("**/*.md"):
                    if match.is_file() and str(match) not in seen:
                        seen.add(str(match))
                        found.append(("Custom", str(match)))
                for match in p.glob("**/*.yaml"):
                    if match.is_file() and str(match) not in seen:
                        seen.add(str(match))
                        found.append(("Custom", str(match)))
                for match in p.glob("**/*.yml"):
                    if match.is_file() and str(match) not in seen:
                        seen.add(str(match))
                        found.append(("Custom", str(match)))
                for match in p.glob("**/*.txt"):
                    if match.is_file() and str(match) not in seen:
                        seen.add(str(match))
                        found.append(("Custom", str(match)))

        return found
```

**Step 2: Verify syntax**

Run: `python -c "import ast; ast.parse(open('app.py').read()); print('OK')"`
Expected: `OK`

**Step 3: Commit**

```bash
git add app.py
git commit -m "feat(scanner): add _scan_context_files method"
```

---

### Task 5: Build Term Scanner tab UI in _open_settings_window

**Files:**
- Modify: `app.py` — `_open_settings_window()`, after the History tab block and before the footer

**Step 1: Add the Term Scanner tab**

After the History tab section (after `ttk.Button(history_action, text="Clear History", ...)`), before the `footer = ttk.Frame(...)` line, insert:

```python
        scanner_tab = ttk.Frame(notebook, padding=14, style="Surface.TFrame")
        notebook.add(scanner_tab, text="Term Scanner")
        scanner_tab.columnconfigure(0, weight=1)
        scanner_tab.rowconfigure(1, weight=1)
        scanner_tab.rowconfigure(3, weight=1)

        # --- Top: Scan Sources ---
        src_frame = ttk.LabelFrame(scanner_tab, text="Scan Sources", padding=8, style="Card.TLabelframe")
        src_frame.grid(row=0, column=0, sticky="nsew", pady=(0, 8))
        src_frame.columnconfigure(0, weight=1)
        src_frame.rowconfigure(0, weight=1)

        self._scanner_file_tree = ttk.Treeview(
            src_frame, columns=("tool", "path"), show="headings", height=6, style="App.Treeview"
        )
        self._scanner_file_tree.heading("tool", text="Tool")
        self._scanner_file_tree.heading("path", text="File Path")
        self._scanner_file_tree.column("tool", width=120, anchor="w")
        self._scanner_file_tree.column("path", width=600, anchor="w")
        self._scanner_file_tree.grid(row=0, column=0, sticky="nsew")
        file_scroll = ttk.Scrollbar(src_frame, orient="vertical", command=self._scanner_file_tree.yview)
        file_scroll.grid(row=0, column=1, sticky="ns")
        self._scanner_file_tree.configure(yscrollcommand=file_scroll.set)

        src_btns = ttk.Frame(src_frame, style="Card.TLabelframe")
        src_btns.grid(row=0, column=2, sticky="ns", padx=(8, 0))
        ttk.Button(src_btns, text="Scan", command=self._scanner_run_scan, style="Hero.TButton").pack(fill="x", pady=(0, 4))
        ttk.Button(src_btns, text="Add Path", command=self._scanner_add_path, style="Ghost.TButton").pack(fill="x", pady=(0, 4))
        ttk.Button(src_btns, text="Remove Path", command=self._scanner_remove_path, style="Ghost.TButton").pack(fill="x")

        # --- Middle: Candidate Terms ---
        term_frame = ttk.LabelFrame(scanner_tab, text="Candidate Terms", padding=8, style="Card.TLabelframe")
        term_frame.grid(row=1, column=0, sticky="nsew", pady=(0, 8))
        term_frame.columnconfigure(0, weight=1)
        term_frame.rowconfigure(0, weight=1)

        self._scanner_term_tree = ttk.Treeview(
            term_frame, columns=("term", "preferred", "source"), show="headings", height=8, style="App.Treeview"
        )
        self._scanner_term_tree.heading("term", text="Term")
        self._scanner_term_tree.heading("preferred", text="Preferred")
        self._scanner_term_tree.heading("source", text="Source File")
        self._scanner_term_tree.column("term", width=180, anchor="w")
        self._scanner_term_tree.column("preferred", width=180, anchor="w")
        self._scanner_term_tree.column("source", width=360, anchor="w")
        self._scanner_term_tree.grid(row=0, column=0, sticky="nsew")
        term_scroll = ttk.Scrollbar(term_frame, orient="vertical", command=self._scanner_term_tree.yview)
        term_scroll.grid(row=0, column=1, sticky="ns")
        self._scanner_term_tree.configure(yscrollcommand=term_scroll.set)
        self._scanner_term_tree.bind("<<TreeviewSelect>>", self._scanner_on_term_select)

        edit_row = ttk.Frame(term_frame, style="Card.TLabelframe")
        edit_row.grid(row=1, column=0, columnspan=2, sticky="ew", pady=(6, 0))
        ttk.Label(edit_row, text="Preferred:").pack(side="left")
        self._scanner_preferred_var = tk.StringVar()
        ttk.Entry(edit_row, textvariable=self._scanner_preferred_var, width=30, style="App.TEntry").pack(side="left", padx=(6, 8))
        ttk.Button(edit_row, text="Update", command=self._scanner_update_preferred, style="Ghost.TButton").pack(side="left")

        # --- Bottom: Actions ---
        self._scanner_status_var = tk.StringVar(value="Click Scan to discover context files.")
        action_row = ttk.Frame(scanner_tab, style="Surface.TFrame")
        action_row.grid(row=2, column=0, sticky="ew")
        ttk.Button(action_row, text="Extract Terms", command=self._scanner_extract_terms, style="Hero.TButton").pack(side="left")
        ttk.Button(action_row, text="Import to Vocabulary", command=self._scanner_import_terms, style="Hero.TButton").pack(side="left", padx=8)
        ttk.Label(action_row, textvariable=self._scanner_status_var, style="Status.TLabel").pack(side="right")
```

**Step 2: Verify syntax**

Run: `python -c "import ast; ast.parse(open('app.py').read()); print('OK')"`
Expected: `OK` (methods called here don't exist yet — that's fine, Python won't call them until runtime)

**Step 3: Commit**

```bash
git add app.py
git commit -m "feat(scanner): build Term Scanner tab UI in Settings"
```

---

### Task 6: Implement scanner action methods — Scan, Add Path, Remove Path

**Files:**
- Modify: `app.py` — new methods on `RefineApp`, insert after `_scan_context_files`

**Step 1: Add methods**

```python
    def _scanner_run_scan(self) -> None:
        if self._scanner_file_tree is None:
            return
        for item in self._scanner_file_tree.get_children():
            self._scanner_file_tree.delete(item)
        files = self._scan_context_files()
        if not files:
            self._scanner_status_var.set("No context files found. Use Add Path to add manually.")
            return
        for idx, (tool, path) in enumerate(files):
            self._scanner_file_tree.insert("", "end", iid=str(idx), values=(tool, path))
        self._scanner_status_var.set(f"Found {len(files)} files. Select files and click Extract Terms.")

    def _scanner_add_path(self) -> None:
        from tkinter import filedialog
        paths = filedialog.askopenfilenames(
            title="Add Context Files",
            filetypes=[("Text files", "*.md *.txt *.yaml *.yml *.json"), ("All files", "*.*")],
        )
        if not paths:
            return
        for p in paths:
            p_str = str(p).strip()
            if p_str and p_str not in self.scanner_custom_paths:
                self.scanner_custom_paths.append(p_str)
        self._save_config()
        self._scanner_run_scan()

    def _scanner_remove_path(self) -> None:
        if self._scanner_file_tree is None:
            return
        selected = self._scanner_file_tree.selection()
        if not selected:
            return
        for sel in selected:
            values = self._scanner_file_tree.item(sel, "values")
            if values and len(values) >= 2:
                path = values[1]
                if path in self.scanner_custom_paths:
                    self.scanner_custom_paths.remove(path)
        self._save_config()
        self._scanner_run_scan()
```

**Step 2: Verify syntax**

Run: `python -c "import ast; ast.parse(open('app.py').read()); print('OK')"`
Expected: `OK`

**Step 3: Commit**

```bash
git add app.py
git commit -m "feat(scanner): implement Scan, Add Path, Remove Path actions"
```

---

### Task 7: Implement _scanner_extract_terms (LLM call)

**Files:**
- Modify: `app.py` — new methods on `RefineApp`, after the scan action methods

**Step 1: Add extraction methods**

```python
    def _scanner_extract_terms(self) -> None:
        if self._is_extracting:
            return
        if self._scanner_file_tree is None:
            return
        selected = self._scanner_file_tree.selection()
        if not selected:
            items = self._scanner_file_tree.get_children()
            if not items:
                self._scanner_status_var.set("No files to extract from. Run Scan first.")
                return
            selected = items

        api_key = self.api_key_var.get().strip()
        api_base = self.api_base_var.get().strip()
        model = self.model_var.get().strip()
        provider = self.provider_var.get().strip()
        if not api_key or not api_base or not model:
            self._scanner_status_var.set("Please configure Provider and API Key first.")
            return

        file_paths = []
        for sel in selected:
            values = self._scanner_file_tree.item(sel, "values")
            if values and len(values) >= 2:
                file_paths.append(values[1])

        if not file_paths:
            return

        self._is_extracting = True
        self._scanner_status_var.set(f"Extracting terms from {len(file_paths)} files...")
        thread = threading.Thread(
            target=self._scanner_extract_worker,
            args=(provider, api_base, api_key, model, file_paths),
            daemon=True,
        )
        thread.start()

    def _scanner_extract_worker(self, provider, api_base, api_key, model, file_paths) -> None:
        try:
            batches = []
            current_batch = []
            current_len = 0
            for fpath in file_paths:
                try:
                    content = Path(fpath).read_text(encoding="utf-8", errors="ignore")
                    if len(content) > 8000:
                        content = content[:8000]
                    chunk = f"--- {Path(fpath).name} ---\n{content}\n"
                except Exception:
                    continue
                if current_len + len(chunk) > 8000 and current_batch:
                    batches.append(current_batch)
                    current_batch = []
                    current_len = 0
                current_batch.append(chunk)
                current_len += len(chunk)
            if current_batch:
                batches.append(current_batch)

            all_terms = []
            seen_terms = set()
            for batch in batches:
                user_msg = "\n".join(batch) + "\n\nExtract all proper nouns and technical terms."
                endpoint = f"{api_base.rstrip('/')}/chat/completions"
                payload = {
                    "model": model,
                    "temperature": 0,
                    "messages": [
                        {"role": "system", "content": TERM_EXTRACTOR_SYSTEM_PROMPT},
                        {"role": "user", "content": user_msg},
                    ],
                }
                body = json.dumps(payload).encode("utf-8")
                headers = {
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {api_key}",
                }
                if provider == "Xiaomi MiMo V2":
                    headers["api-key"] = api_key
                if provider == "OpenRouter":
                    headers["HTTP-Referer"] = "https://localhost/VOVOCI"
                    headers["X-Title"] = "VOVOCI"
                req = request.Request(endpoint, data=body, headers=headers, method="POST")
                with request.urlopen(req, timeout=60) as resp:
                    raw = resp.read().decode("utf-8")
                data = json.loads(raw)
                text = parse_text_from_response(data)
                terms = self._parse_extracted_terms(text, batch)
                for t in terms:
                    key = t["term"].lower()
                    if key not in seen_terms:
                        seen_terms.add(key)
                        all_terms.append(t)

            self.root.after(0, self._scanner_on_extract_done, all_terms, "")
        except error.HTTPError as exc:
            try:
                detail = exc.read().decode("utf-8", errors="ignore")[:200]
            except Exception:
                detail = str(exc)
            self.root.after(0, self._scanner_on_extract_done, [], f"HTTP {exc.code}: {detail}")
        except Exception as exc:
            self.root.after(0, self._scanner_on_extract_done, [], str(exc)[:200])

    @staticmethod
    def _parse_extracted_terms(text: str, batch: list) -> list[dict]:
        source = ""
        if batch:
            first_line = batch[0].split("\n", 1)[0]
            source = first_line.replace("---", "").strip()
        try:
            terms = json.loads(text)
            if isinstance(terms, list):
                result = []
                for t in terms:
                    if isinstance(t, dict) and "term" in t:
                        result.append({
                            "term": str(t["term"]).strip(),
                            "preferred": str(t.get("preferred", t["term"])).strip(),
                            "source": source,
                        })
                return result
        except json.JSONDecodeError:
            pass
        match = re.search(r"\[.*\]", text, re.DOTALL)
        if match:
            try:
                terms = json.loads(match.group())
                if isinstance(terms, list):
                    result = []
                    for t in terms:
                        if isinstance(t, dict) and "term" in t:
                            result.append({
                                "term": str(t["term"]).strip(),
                                "preferred": str(t.get("preferred", t["term"])).strip(),
                                "source": source,
                            })
                    return result
            except json.JSONDecodeError:
                pass
        return []

    def _scanner_on_extract_done(self, terms: list, err: str) -> None:
        self._is_extracting = False
        if err:
            self._scanner_status_var.set(f"Extraction failed: {err[:120]}")
            return
        if self._scanner_term_tree is None:
            return
        for item in self._scanner_term_tree.get_children():
            self._scanner_term_tree.delete(item)
        if not terms:
            self._scanner_status_var.set("No terms extracted. Try different files or check API settings.")
            return
        self._scanner_term_tree.tag_configure("even", background="#ffffff")
        self._scanner_term_tree.tag_configure("odd", background="#f8f5ef")
        for idx, t in enumerate(terms):
            tag = "even" if idx % 2 == 0 else "odd"
            self._scanner_term_tree.insert(
                "", "end", iid=str(idx),
                values=(t["term"], t["preferred"], t["source"]),
                tags=(tag,),
            )
        self._scanner_status_var.set(f"Extracted {len(terms)} candidate terms. Select and Import to Vocabulary.")
```

**Step 2: Verify syntax**

Run: `python -c "import ast; ast.parse(open('app.py').read()); print('OK')"`
Expected: `OK`

**Step 3: Commit**

```bash
git add app.py
git commit -m "feat(scanner): implement LLM-based term extraction with batch support"
```

---

### Task 8: Implement term selection editing and import methods

**Files:**
- Modify: `app.py` — new methods on `RefineApp`, after extraction methods

**Step 1: Add methods**

```python
    def _scanner_on_term_select(self, _event=None) -> None:
        if self._scanner_term_tree is None or self._scanner_preferred_var is None:
            return
        selected = self._scanner_term_tree.selection()
        if not selected:
            return
        values = self._scanner_term_tree.item(selected[0], "values")
        if values and len(values) >= 2:
            self._scanner_preferred_var.set(values[1])

    def _scanner_update_preferred(self) -> None:
        if self._scanner_term_tree is None or self._scanner_preferred_var is None:
            return
        selected = self._scanner_term_tree.selection()
        if not selected:
            return
        new_preferred = self._scanner_preferred_var.get().strip()
        if not new_preferred:
            return
        values = list(self._scanner_term_tree.item(selected[0], "values"))
        if len(values) >= 2:
            values[1] = new_preferred
            self._scanner_term_tree.item(selected[0], values=values)

    def _scanner_import_terms(self) -> None:
        if self._scanner_term_tree is None:
            return
        selected = self._scanner_term_tree.selection()
        if not selected:
            items = self._scanner_term_tree.get_children()
            if not items:
                self._scanner_status_var.set("No candidate terms. Run Extract Terms first.")
                return
            selected = items

        imported = 0
        skipped = 0
        existing_lower = {str(t.get("term", "")).strip().lower() for t in self.custom_terms}

        for sel in selected:
            values = self._scanner_term_tree.item(sel, "values")
            if not values or len(values) < 3:
                continue
            term = str(values[0]).strip()
            preferred = str(values[1]).strip()
            source = str(values[2]).strip()
            if not term:
                continue
            if term.lower() in existing_lower:
                skipped += 1
                continue
            note = f"Auto-extracted from {source}" if source else "Auto-extracted"
            self.custom_terms.append({"term": term, "preferred": preferred or term, "note": note})
            existing_lower.add(term.lower())
            imported += 1

        if imported > 0:
            self._refresh_term_tree()
            self._save_config()

        parts = []
        if imported > 0:
            parts.append(f"Imported {imported} terms")
        if skipped > 0:
            parts.append(f"skipped {skipped} existing")
        if not parts:
            parts.append("All terms already exist, nothing to import")
        self._scanner_status_var.set(". ".join(parts) + ".")
        self.status_var.set(". ".join(parts) + ".")
```

**Step 2: Verify syntax**

Run: `python -c "import ast; ast.parse(open('app.py').read()); print('OK')"`
Expected: `OK`

**Step 3: Commit**

```bash
git add app.py
git commit -m "feat(scanner): implement term selection editing and vocabulary import"
```

---

### Task 9: Clean up scanner state on settings window close

**Files:**
- Modify: `app.py` — `_close_settings_window()`

**Step 1: Add cleanup**

In `_close_settings_window()`, after `self._history_tree = None`, add:

```python
        self._scanner_file_tree = None
        self._scanner_term_tree = None
        self._scanner_status_var = None
        self._scanner_preferred_var = None
```

**Step 2: Verify syntax**

Run: `python -c "import ast; ast.parse(open('app.py').read()); print('OK')"`
Expected: `OK`

**Step 3: Commit**

```bash
git add app.py
git commit -m "feat(scanner): clean up scanner state on settings close"
```

---

### Task 10: Manual integration test

**Step 1: Launch the app**

Run: `python app.py`

**Step 2: Verify Term Scanner tab exists**

- Click "Settings" → confirm 4 tabs: Local STT, Refine Prompt, History, Term Scanner

**Step 3: Test Scan**

- Click "Term Scanner" tab → click "Scan"
- Verify files are listed (at minimum `CLAUDE.md` and `README.md` from the project dir)

**Step 4: Test Add Path**

- Click "Add Path" → select any `.md` file → confirm it appears in the list

**Step 5: Test Extract Terms**

- Ensure Provider/API Key/Model are configured
- Select some files → click "Extract Terms"
- Verify candidate terms appear in the lower treeview

**Step 6: Test Import**

- Select some terms → click "Import to Vocabulary"
- Close Settings → verify terms appear in main window's Custom Vocabulary table

**Step 7: Commit**

```bash
git add app.py
git commit -m "feat(scanner): complete Term Scanner feature"
```
