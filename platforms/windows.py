from __future__ import annotations

import os
import threading
import time
from typing import Any, Callable

from .base import PlatformAdapter, TrayHandle

try:
    import keyboard  # type: ignore
except Exception:
    keyboard = None

try:
    import pystray  # type: ignore
except Exception:
    pystray = None


class WindowsPlatformAdapter(PlatformAdapter):
    def hotkeys_available(self) -> bool:
        return keyboard is not None

    def register_hotkeys(
        self,
        main_hotkey: str,
        on_press: Callable[[object | None], None],
        on_release: Callable[[object | None], None],
    ) -> Any:
        if keyboard is None:
            return None
        press_hook = keyboard.on_press_key(main_hotkey, on_press, suppress=False)
        release_hook = keyboard.on_release_key(main_hotkey, on_release, suppress=False)
        return (press_hook, release_hook)

    def unregister_hotkeys(self, binding: Any) -> None:
        if keyboard is None or not binding:
            return
        press_hook = binding[0] if isinstance(binding, tuple) and len(binding) > 0 else None
        release_hook = binding[1] if isinstance(binding, tuple) and len(binding) > 1 else None
        if press_hook is not None:
            try:
                keyboard.unhook(press_hook)
            except Exception:
                pass
        if release_hook is not None:
            try:
                keyboard.unhook(release_hook)
            except Exception:
                pass

    def hotkey_binding_alive(self, binding: Any) -> bool:
        if keyboard is None or not binding:
            return False
        return True

    def is_modifier_pressed(self, modifier_hotkey: str) -> bool:
        if keyboard is None:
            return False
        try:
            return bool(keyboard.is_pressed(modifier_hotkey))
        except Exception:
            return False

    def paste_to_active_app(self, text: str, root: Any, target_hwnd: int = 0) -> bool:
        try:
            root.clipboard_clear()
            root.clipboard_append(text)
            root.update_idletasks()
        except Exception:
            return False

        if target_hwnd and keyboard is not None:
            try:
                import ctypes

                ctypes.windll.user32.SetForegroundWindow(int(target_hwnd))
                time.sleep(0.05)
                keyboard.send("ctrl+v")
                return True
            except Exception:
                pass

        if target_hwnd:
            return self._paste_via_winapi(target_hwnd)
        return False

    def paste_requires_window_target(self) -> bool:
        return True

    def get_foreground_window_handle(self) -> int:
        try:
            import ctypes

            return int(ctypes.windll.user32.GetForegroundWindow())
        except Exception:
            return 0

    def get_top_level_window_handle(self, hwnd: int) -> int:
        if not hwnd:
            return 0
        try:
            import ctypes

            ga_root = 2
            top = int(ctypes.windll.user32.GetAncestor(int(hwnd), ga_root))
            return top or int(hwnd)
        except Exception:
            return int(hwnd)

    def has_foreground_text_caret(self) -> bool:
        try:
            import ctypes
            from ctypes import wintypes

            class RECT(ctypes.Structure):
                _fields_ = [
                    ("left", wintypes.LONG),
                    ("top", wintypes.LONG),
                    ("right", wintypes.LONG),
                    ("bottom", wintypes.LONG),
                ]

            class GUITHREADINFO(ctypes.Structure):
                _fields_ = [
                    ("cbSize", wintypes.DWORD),
                    ("flags", wintypes.DWORD),
                    ("hwndActive", wintypes.HWND),
                    ("hwndFocus", wintypes.HWND),
                    ("hwndCapture", wintypes.HWND),
                    ("hwndMenuOwner", wintypes.HWND),
                    ("hwndMoveSize", wintypes.HWND),
                    ("hwndCaret", wintypes.HWND),
                    ("rcCaret", RECT),
                ]

            user32 = ctypes.windll.user32
            fg = user32.GetForegroundWindow()
            if not fg:
                return False
            tid = user32.GetWindowThreadProcessId(fg, None)
            if not tid:
                return False
            info = GUITHREADINFO()
            info.cbSize = ctypes.sizeof(GUITHREADINFO)
            ok = user32.GetGUIThreadInfo(tid, ctypes.byref(info))
            if not ok:
                return False
            return bool(info.hwndCaret)
        except Exception:
            return False

    def is_valid_window_handle(self, hwnd: int) -> bool:
        if not hwnd:
            return False
        try:
            import ctypes

            return bool(ctypes.windll.user32.IsWindow(int(hwnd)))
        except Exception:
            return True

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
            "microphone": (True, "N/A on Windows"),
            "accessibility": (True, "N/A on Windows"),
            "input_monitoring": (True, "N/A on Windows"),
        }

    def open_system_settings(self, target: str) -> bool:
        target_key = (target or "").strip().lower()
        if target_key == "microphone":
            try:
                os.system("start ms-settings:privacy-microphone")
                return True
            except Exception:
                return False
        return False

    def open_mic_settings(self) -> bool:
        return self.open_system_settings("microphone")

    @staticmethod
    def _paste_via_winapi(hwnd: int) -> bool:
        try:
            import ctypes

            user32 = ctypes.windll.user32
            wm_paste = 0x0302
            smto_abortifhung = 0x0002

            class RECT(ctypes.Structure):
                _fields_ = [
                    ("left", ctypes.c_long),
                    ("top", ctypes.c_long),
                    ("right", ctypes.c_long),
                    ("bottom", ctypes.c_long),
                ]

            class GUITHREADINFO(ctypes.Structure):
                _fields_ = [
                    ("cbSize", ctypes.c_ulong),
                    ("flags", ctypes.c_ulong),
                    ("hwndActive", ctypes.c_void_p),
                    ("hwndFocus", ctypes.c_void_p),
                    ("hwndCapture", ctypes.c_void_p),
                    ("hwndMenuOwner", ctypes.c_void_p),
                    ("hwndMoveSize", ctypes.c_void_p),
                    ("hwndCaret", ctypes.c_void_p),
                    ("rcCaret", RECT),
                ]

            target_hwnd = int(hwnd)
            user32.SetForegroundWindow(target_hwnd)
            time.sleep(0.05)

            thread_id = user32.GetWindowThreadProcessId(target_hwnd, None)
            if thread_id:
                info = GUITHREADINFO()
                info.cbSize = ctypes.sizeof(GUITHREADINFO)
                if user32.GetGUIThreadInfo(thread_id, ctypes.byref(info)):
                    focus_hwnd = int(info.hwndFocus or 0)
                    if focus_hwnd:
                        target_hwnd = focus_hwnd

            result = ctypes.c_ulong()
            ok = user32.SendMessageTimeoutW(
                target_hwnd,
                wm_paste,
                0,
                0,
                smto_abortifhung,
                300,
                ctypes.byref(result),
            )
            return bool(ok)
        except Exception:
            return False
