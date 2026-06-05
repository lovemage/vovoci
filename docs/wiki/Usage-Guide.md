# Usage Guide

## Quick Start

1. **Select Provider and Model** from the main window dropdowns.
2. **Enter API key** for the selected provider.
3. **Configure STT and Refinement** via the Settings button (top-right).
4. **Choose push-to-talk hotkey** in Settings.
5. **Hold hotkey to speak**, release to transcribe and optionally refine.
6. **Optional:** Enable Auto Refine After STT, Auto Paste to Active Window, or configure Recording Overlay position.

## Recording & Transcription

- **Push-to-Talk:** Hold the configured hotkey to record audio. Release to stop and begin transcription.
- **Local STT:** Audio is transcribed using `faster-whisper` locally on your machine (no internet required).
- **Primary Language:** Set your main language (auto, zh, en, ja, ko, fr, de, es).
- **Secondary Language Hints:** Comma-separated language codes to improve accuracy for mixed-language input.
- **VAD Filtering:** Voice Activity Detection filters out silence and background noise before transcription.

## Text Refinement

After transcription, the text can be optionally refined using your selected LLM provider:
- Corrects spelling and grammar.
- Improves clarity and flow.
- Preserves the original meaning.
- Respects custom vocabulary mappings.

## Auto Paste

Enable **Auto Paste to Active Window** to automatically insert refined text into the currently focused text field without manual copy-paste.

## Recording Overlay

Choose where the recording indicator appears during push-to-talk:
- **Left Bottom**
- **Center Bottom**
- **Right Bottom**

## STT Support

| Engine | Mode | Models |
|---|---|---|
| faster-whisper | Local | tiny, base, small, medium, large-v3 |

**Model Sizes:**
- **tiny:** Smallest, fastest, least accurate.
- **base:** Balance of speed and accuracy.
- **small:** Recommended starting point.
- **medium:** High accuracy, slower.
- **large-v3:** Highest accuracy, slowest.

**Preload Models:** Go to Settings → Local STT → Preload STT Model to download a model before using it. Recommended: start with `small`.

## Check Permissions

The Check Permissions dialog (Settings → Check Permissions) verifies your setup:

| Check Item | Meaning |
|---|---|
| Local STT dependencies | ✓: Required libraries installed; ✗: Missing library (install with pip) |
| Local STT model installed | ✓: Model cached locally; ✗: Model not yet downloaded |
| Provider API connectivity | ✓: API reachable with valid credentials; ✗: Check API key, base URL, and network |
| Microphone permission/runtime | ✓: Microphone available; ✗: Check Windows privacy settings or device connection |
| Global hotkey runtime | ✓: Hotkey listener active; ✗: May require admin privilege or library restart |
| Update check (GitHub) | ✓: Running latest version; ✗: Newer version available (see Update Guide) |

## Update Guide

### Check Update
Compares your local app version with the latest GitHub release/tag.

### Self Update
If VOVOCI was cloned from git, running **Self Update** executes `git pull --ff-only` to fetch and apply the latest changes.

### Manual Update
If VOVOCI is in a non-git folder, the update dialog opens the repository page for manual download and installation.

**Repository:** https://github.com/lovemage/vovoci
