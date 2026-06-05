# Troubleshooting

## Common Issues

| Symptom | Action |
|---|---|
| Hotkey not triggering | Install `keyboard` library; run app as administrator if the target app is running elevated |
| No microphone input | Install `sounddevice` library; verify Windows microphone privacy settings (Settings → Privacy & Security → Microphone) |
| STT model errors or crashes | Preload a smaller model (e.g., `small`) first; ensure sufficient disk and RAM for model caching |
| API test fails in Check Permissions | Recheck provider/model/base URL/API key mapping; verify internet connectivity |
| Auto paste fails in certain apps | Run VOVOCI with administrator privileges; test with standard text fields first |
| Text refinement not using custom vocabulary | Verify custom vocabulary is saved; check that Terms match expected text patterns |
| App crashes on startup | Check that all dependencies are installed via `pip install keyboard numpy sounddevice faster-whisper ctranslate2 pystray pillow` |

## Detailed Solutions

### Hotkey Issues

**Problem:** The push-to-talk hotkey doesn't respond.

**Solutions:**
1. Ensure the `keyboard` library is installed: `pip install keyboard`
2. Run VOVOCI as administrator (right-click → Run as administrator).
3. If the target application runs elevated, VOVOCI must also run elevated to capture the hotkey.
4. Try a different hotkey combination (some keys may be reserved by Windows or the target app).

### Microphone Not Detected

**Problem:** No audio is being recorded.

**Solutions:**
1. Install `sounddevice`: `pip install sounddevice`
2. Check Windows microphone privacy settings:
   - Go to **Settings → Privacy & Security → Microphone**
   - Ensure the microphone is enabled globally and for individual apps.
3. Test your microphone with another application (e.g., Voice Recorder).
4. If using a USB microphone, ensure it's connected and recognized by Windows.

### STT Model Errors

**Problem:** Crashes or errors when loading or running the STT model.

**Solutions:**
1. Start with a smaller model like `small` or `base` to reduce memory usage.
2. Preload the model first via Settings → Local STT → Preload STT Model.
3. Check available disk space (models are cached in the `models/` folder).
4. Ensure you have at least 4GB of available RAM.
5. Monitor system resources while transcribing; if memory runs out, reduce model size.

### API Connectivity Issues

**Problem:** "API test fails" in Check Permissions.

**Solutions:**
1. Verify your **API key** is correct and not expired.
2. Confirm the **provider** and **base URL** match (see Provider Setup guide).
3. Check that the **model** name is available for your provider.
4. Test internet connectivity (e.g., ping a known domain).
5. Check for firewall or VPN restrictions blocking API access.
6. If using a proxy, configure it in your network settings.

### Auto Paste Not Working

**Problem:** Text is transcribed/refined but not automatically pasted.

**Solutions:**
1. Run VOVOCI as administrator to enable paste in protected/elevated windows.
2. Ensure the target application is a standard text field (not custom UI framework).
3. Click the target text field to ensure it has focus before recording.
4. Disable and re-enable **Auto Paste to Active Window** to reset the feature.
5. Test with a simple application first (e.g., Notepad) to verify functionality.

### Custom Vocabulary Not Applied

**Problem:** Terms aren't being replaced during refinement.

**Solutions:**
1. Verify the custom vocabulary is saved (check `config.json`).
2. Ensure the **Term** exactly matches the text you expect to find.
3. Test with simple, unambiguous terms first.
4. Check that refinement is enabled (Auto Refine After STT toggle).
5. If the term appears in a different form (past tense, plural), add those variants.

## Reporting Issues

If your issue isn't covered above:

1. **Collect logs:** Check console output or save it to a file.
2. **Document steps to reproduce:** Provide a clear sequence of actions.
3. **Include configuration details:** Provider, model, language, OS version.
4. **Visit the repository:** https://github.com/lovemage/vovoci/issues

Your detailed report helps maintainers fix issues faster.
