from __future__ import annotations

import json
import os
import subprocess
import sys
import threading
import time
from pathlib import Path
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


class LinuxPlatformAdapter(PlatformAdapter):
    def __init__(self) -> None:
        self._listener = None
        self._watcher_proc = None
        self._watcher_thread = None
        self._main_hotkey = None
        self._pressed_keys = set()
        self._main_hotkey_down = False

    def hotkey_binding_alive(self, binding: Any) -> bool:
        if not binding or not isinstance(binding, tuple):
            return False
        kind = binding[0] if binding else None
        if kind == "pynput":
            listener = binding[1] if len(binding) > 1 else self._listener
            try:
                return bool(listener is not None and listener.is_alive())
            except Exception:
                return False
        if kind == "watcher":
            proc = binding[1] if len(binding) > 1 else self._watcher_proc
            thread = binding[2] if len(binding) > 2 else self._watcher_thread
            proc_alive = False
            thread_alive = False
            try:
                proc_alive = proc is not None and proc.poll() is None
            except Exception:
                proc_alive = False
            try:
                thread_alive = thread is not None and thread.is_alive()
            except Exception:
                thread_alive = False
            return bool(proc_alive and thread_alive)
        return False

    def hotkeys_available(self) -> bool:
        return True

    def register_hotkeys(
        self,
        main_hotkey: str,
        on_press: Callable[[object | None], None],
        on_release: Callable[[object | None], None],
    ) -> Any:
        self.unregister_hotkeys(None)
        self._main_hotkey = main_hotkey.strip().lower()
        self._pressed_keys = set()
        self._main_hotkey_down = False

        is_wayland = os.environ.get("WAYLAND_DISPLAY", "") != ""

        if pynput_keyboard is not None and not is_wayland:
            if self._try_pynput(main_hotkey, on_press, on_release):
                return ("pynput", self._listener)

        return self._start_watcher(main_hotkey, on_press, on_release)

    def _try_pynput(
        self,
        main_hotkey: str,
        on_press: Callable[[object | None], None],
        on_release: Callable[[object | None], None],
    ) -> bool:
        resolved = self._resolve_key(main_hotkey)
        if resolved is None:
            return False
        self._main_hotkey = main_hotkey
        self._pressed_keys = set()
        self._main_hotkey_down = False

        def _on_press(key) -> None:
            self._pressed_keys.add(key)
            if key == resolved and not self._main_hotkey_down:
                self._main_hotkey_down = True
                on_press(None)

        def _on_release(key) -> None:
            try:
                self._pressed_keys.remove(key)
            except KeyError:
                pass
            if key == resolved and self._main_hotkey_down:
                self._main_hotkey_down = False
                on_release(None)

        try:
            listener = pynput_keyboard.Listener(on_press=_on_press, on_release=_on_release)
            listener.daemon = True
            listener.start()
            time.sleep(0.3)
            if not listener.is_alive():
                listener.stop()
                return False
            self._listener = listener
            return True
        except Exception:
            return False

    def _start_watcher(
        self,
        main_hotkey: str,
        on_press: Callable[[object | None], None],
        on_release: Callable[[object | None], None],
    ) -> Any:
        watcher_path = Path(__file__).resolve().parent / "_key_watcher.py"
        if not watcher_path.exists():
            return None

        env = os.environ.copy()
        env.pop("PYTHONPATH", None)

        proc = None
        for cmd in (
            [sys.executable, str(watcher_path), "0.1"],
            ["pkexec", sys.executable, str(watcher_path), "0.1"],
        ):
            try:
                proc = subprocess.Popen(
                    cmd,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.DEVNULL,
                    text=True,
                    env=env,
                )
                self._watcher_proc = proc
                break
            except Exception:
                continue
        if proc is None:
            return None

        resolved_main = self._resolve_key(main_hotkey)
        if resolved_main is not None and pynput_keyboard is not None:
            main_key_name = resolved_main.name if hasattr(resolved_main, 'name') else str(resolved_main)
        else:
            main_key_name = main_hotkey.strip().lower()

        self._pressed_keys = set()

        hotkey_pynput_map = {
            "ctrl_r": "ctrl_r", "shift_r": "shift_r", "alt_r": "alt_r",
            "ctrl_l": "ctrl_l", "shift_l": "shift_l", "alt_l": "alt_l",
            "left": "left", "right": "right", "end": "end",
        }

        def _read_events() -> None:
            try:
                for line in proc.stdout:
                    line = line.strip()
                    if not line:
                        continue
                    try:
                        event = json.loads(line)
                    except ValueError:
                        continue
                    ev_key = event.get("key", "")
                    ev_val = event.get("value", 0)

                    pynput_name = hotkey_pynput_map.get(ev_key, ev_key)
                    if pynput_keyboard is not None:
                        key_token = getattr(pynput_keyboard.Key, pynput_name, None)
                    else:
                        key_token = pynput_name

                    if ev_val == 1:
                        if key_token is not None:
                            self._pressed_keys.add(key_token)
                        if ev_key == main_key_name and not self._main_hotkey_down:
                            self._main_hotkey_down = True
                            on_press(None)
                    elif ev_val == 0:
                        if key_token is not None:
                            try:
                                self._pressed_keys.remove(key_token)
                            except KeyError:
                                pass
                        if ev_key == main_key_name and self._main_hotkey_down:
                            self._main_hotkey_down = False
                            on_release(None)
            except Exception:
                pass

        t = threading.Thread(target=_read_events, daemon=True)
        t.start()
        self._watcher_thread = t

        return ("watcher", proc, t)

    def unregister_hotkeys(self, binding: Any) -> None:
        if binding is None:
            pass
        elif isinstance(binding, tuple) and len(binding) > 0:
            kind = binding[0]
            if kind == "pynput" and self._listener is not None:
                try:
                    self._listener.stop()
                except Exception:
                    pass
            elif kind == "watcher":
                if self._watcher_proc is not None:
                    try:
                        self._watcher_proc.terminate()
                    except Exception:
                        pass
                    try:
                        self._watcher_proc.wait(timeout=1)
                    except Exception:
                        try:
                            self._watcher_proc.kill()
                        except Exception:
                            pass
        self._listener = None
        self._watcher_proc = None
        self._watcher_thread = None
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
            root.update()
            root.update_idletasks()
        except Exception:
            return False

        wait = float(os.environ.get("VOVOCI_PASTE_DELAY", "0.15"))
        time.sleep(wait)

        for tool in self._paste_tools():
            try:
                subprocess.run(tool, check=True, timeout=3)
                return True
            except Exception:
                continue
        return False

    @staticmethod
    def _paste_tools():
        commands = os.environ.get("VOVOCI_PASTE_CMD", "").strip()
        if commands:
            for cmd_line in commands.split(";"):
                parts = cmd_line.strip().split()
                if parts:
                    yield parts
            return

        yield ["wtype", "-M", "ctrl", "v"]
        yield ["ydotool", "key", "29:1", "47:1", "47:0", "29:0"]
        yield ["xdotool", "key", "--clearmodifiers", "ctrl+v"]
        yield ["xdotool", "key", "ctrl+v"]

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
        on_show_button: Callable[[], None],
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

        def _on_show_button(icon, item):
            del icon, item
            on_show_button()

        def _on_exit(icon, item):
            del icon, item
            on_exit()

        menu = pystray.Menu(
            pystray.MenuItem("Show Window", _on_primary),
            pystray.MenuItem("Settings", _on_settings),
            pystray.MenuItem("Show Button", _on_show_button),
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
        # Best-effort desktop-agnostic settings paths.
        candidates: list[list[str]] = []
        if target_key == "microphone":
            candidates.extend(
                [
                    ["gnome-control-center", "privacy", "microphone"],
                    ["kcmshell6", "kcm_pulseaudio"],
                    ["pavucontrol"],
                ]
            )
        elif target_key in ("accessibility", "input_monitoring"):
            candidates.extend(
                [
                    ["gnome-control-center", "privacy"],
                    ["gnome-control-center", "universal-access"],
                    ["systemsettings6", "kcm_access"],
                ]
            )
        candidates.extend([["gnome-control-center"], ["systemsettings6"], ["xdg-settings", "get", "default-web-browser"]])

        for cmd in candidates:
            try:
                subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
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
        # Linux desktops generally don't expose a single API permission gate.
        # Treat availability of at least one paste backend as practical readiness.
        for probe in (["wtype", "--version"], ["ydotool", "--version"], ["xdotool", "--version"]):
            try:
                subprocess.run(probe, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=2, check=False)
                return True, "OK"
            except Exception:
                continue
        return False, "No paste tool found (wtype/ydotool/xdotool)"

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
            if hasattr(listener, "is_alive") and not listener.is_alive():
                return False, "listener not alive"
            return True, "OK"
        except Exception as exc:
            return False, str(exc)[:120]
        finally:
            if listener is not None:
                try:
                    listener.stop()
                except Exception:
                    pass
