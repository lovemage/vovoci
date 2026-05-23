from __future__ import annotations

import subprocess
import threading
import time
from typing import Any, Callable

from .base import PlatformAdapter, TrayHandle

try:
    import pystray  # type: ignore
except Exception:
    pystray = None

try:
    from pynput import keyboard as pynput_keyboard  # type: ignore
except Exception:
    pynput_keyboard = None

try:
    import sounddevice as sd  # type: ignore
except Exception:
    sd = None


class MacOSPlatformAdapter(PlatformAdapter):
    def __init__(self) -> None:
        self._listener = None
        self._main_hotkey = None
        self._pressed_keys = set()
        self._main_hotkey_down = False

    def hotkeys_available(self) -> bool:
        return pynput_keyboard is not None

    def register_hotkeys(
        self,
        main_hotkey: str,
        on_press: Callable[[object | None], None],
        on_release: Callable[[object | None], None],
    ) -> Any:
        if pynput_keyboard is None:
            return None
        self.unregister_hotkeys(None)
        self._main_hotkey = self._resolve_key(main_hotkey)
        if self._main_hotkey is None:
            return None
        self._pressed_keys = set()
        self._main_hotkey_down = False

        def _on_press(key) -> None:
            self._pressed_keys.add(key)
            if key == self._main_hotkey and not self._main_hotkey_down:
                self._main_hotkey_down = True
                on_press(None)

        def _on_release(key) -> None:
            try:
                self._pressed_keys.remove(key)
            except KeyError:
                pass
            if key == self._main_hotkey and self._main_hotkey_down:
                self._main_hotkey_down = False
                on_release(None)

        listener = pynput_keyboard.Listener(on_press=_on_press, on_release=_on_release)
        listener.daemon = True
        listener.start()
        self._listener = listener
        return listener

    def unregister_hotkeys(self, binding: Any) -> None:
        del binding
        if self._listener is not None:
            try:
                self._listener.stop()
            except Exception:
                pass
        self._listener = None
        self._main_hotkey = None
        self._pressed_keys = set()
        self._main_hotkey_down = False

    def is_modifier_pressed(self, modifier_hotkey: str) -> bool:
        token = self._resolve_key(modifier_hotkey)
        if token is None:
            return False
        return token in self._pressed_keys

    def paste_to_active_app(self, text: str, root: Any, target_hwnd: int = 0) -> bool:
        del target_hwnd
        try:
            root.clipboard_clear()
            root.clipboard_append(text)
            root.update_idletasks()
        except Exception:
            return False
        try:
            script = 'tell application "System Events" to keystroke "v" using command down'
            subprocess.run(["osascript", "-e", script], check=True, timeout=3)
            return True
        except Exception:
            return False

    def paste_requires_window_target(self) -> bool:
        return False

    def get_foreground_window_handle(self) -> int:
        return 0

    def get_top_level_window_handle(self, hwnd: int) -> int:
        return int(hwnd or 0)

    def has_foreground_text_caret(self) -> bool:
        return True

    def is_valid_window_handle(self, hwnd: int) -> bool:
        return bool(hwnd)

    def tray_available(self) -> bool:
        return pystray is not None

    def create_tray(
        self,
        name: str,
        title: str,
        image: Any,
        on_primary: Callable[[], None],
        on_settings: Callable[[], None],
        on_exit: Callable[[], None],
    ) -> TrayHandle | None:
        if pystray is None or image is None:
            return None

        def _on_primary(icon, item):
            del icon, item
            on_primary()

        def _on_settings(icon, item):
            del icon, item
            on_settings()

        def _on_exit(icon, item):
            del icon, item
            on_exit()

        menu = pystray.Menu(
            pystray.MenuItem("Show Window", _on_primary),
            pystray.MenuItem("Settings", _on_settings),
            pystray.MenuItem("Exit", _on_exit),
            pystray.MenuItem("_OpenHidden", _on_primary, default=True, visible=False),
        )
        icon = pystray.Icon(name, image, title, menu)

        def run_icon() -> None:
            try:
                icon.run()
            except Exception:
                pass

        thread = threading.Thread(target=run_icon, daemon=True)
        thread.start()
        return TrayHandle(icon=icon, thread=thread)

    def stop_tray(self, tray: TrayHandle | None) -> None:
        if tray is None:
            return
        try:
            if tray.icon is not None:
                tray.icon.stop()
        except Exception:
            pass
        try:
            if tray.thread is not None and hasattr(tray.thread, "join"):
                tray.thread.join(timeout=0.5)
        except Exception:
            pass

    def check_permissions(self) -> dict[str, tuple[bool, str]]:
        return {
            "microphone": self._check_microphone_permission(),
            "accessibility": self._check_accessibility_permission(),
            "input_monitoring": self._check_input_monitoring_permission(),
        }

    def open_system_settings(self, target: str) -> bool:
        target_key = (target or "").strip().lower()
        mapping = {
            "microphone": "x-apple.systempreferences:com.apple.preference.security?Privacy_Microphone",
            "accessibility": "x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility",
            "input_monitoring": "x-apple.systempreferences:com.apple.preference.security?Privacy_ListenEvent",
        }
        candidates = []
        if target_key in mapping:
            candidates.append(mapping[target_key])
        candidates.append("x-apple.systempreferences:com.apple.preference.security?Privacy")
        for setting_url in candidates:
            try:
                subprocess.run(["open", setting_url], check=True, timeout=3)
                return True
            except Exception:
                continue
        return False

    def open_mic_settings(self) -> bool:
        return self.open_system_settings("microphone")

    @staticmethod
    def _resolve_key(name: str):
        if pynput_keyboard is None:
            return None
        token = (name or "").strip().lower()
        mapping = {
            "right alt": "alt_r",
            "right ctrl": "ctrl_r",
            "end": "end",
            "left": "left",
            "right": "right",
            "right shift": "shift_r",
            "left shift": "shift_l",
        }
        key_name = mapping.get(token)
        if not key_name:
            return None
        return getattr(pynput_keyboard.Key, key_name, None)

    @staticmethod
    def _check_microphone_permission() -> tuple[bool, str]:
        if sd is None:
            return False, "sounddevice unavailable"
        try:
            stream = sd.InputStream(samplerate=16000, channels=1, dtype="float32")
            stream.start()
            time.sleep(0.05)
            stream.stop()
            stream.close()
            return True, "OK"
        except Exception as exc:
            return False, str(exc)[:120]

    @staticmethod
    def _check_accessibility_permission() -> tuple[bool, str]:
        script = 'tell application "System Events" to get UI elements enabled'
        try:
            proc = subprocess.run(
                ["osascript", "-e", script],
                capture_output=True,
                text=True,
                timeout=3,
                check=False,
            )
            out = (proc.stdout or "").strip().lower()
            if proc.returncode == 0 and "true" in out:
                return True, "OK"
            detail = (proc.stderr or proc.stdout or "Not granted").strip()
            return False, detail[:120] or "Not granted"
        except Exception as exc:
            return False, str(exc)[:120]

    @staticmethod
    def _check_input_monitoring_permission() -> tuple[bool, str]:
        if pynput_keyboard is None:
            return False, "pynput unavailable"
        listener = None
        try:
            listener = pynput_keyboard.Listener(on_press=lambda _k: None, on_release=lambda _k: None)
            listener.daemon = True
            listener.start()
            time.sleep(0.05)
            return True, "OK"
        except Exception as exc:
            return False, str(exc)[:120]
        finally:
            if listener is not None:
                try:
                    listener.stop()
                except Exception:
                    pass
