from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, Callable

HotkeyCallback = Callable[[object | None], None]


@dataclass
class TrayHandle:
    icon: Any
    thread: Any


class PlatformAdapter(ABC):
    @abstractmethod
    def hotkeys_available(self) -> bool:
        raise NotImplementedError

    @abstractmethod
    def register_hotkeys(
        self,
        main_hotkey: str,
        on_press: HotkeyCallback,
        on_release: HotkeyCallback,
    ) -> Any:
        raise NotImplementedError

    @abstractmethod
    def unregister_hotkeys(self, binding: Any) -> None:
        raise NotImplementedError

    def hotkey_binding_alive(self, binding: Any) -> bool:
        return binding is not None

    @abstractmethod
    def is_modifier_pressed(self, modifier_hotkey: str) -> bool:
        raise NotImplementedError

    @abstractmethod
    def paste_to_active_app(self, text: str, root: Any, target_hwnd: int = 0) -> bool:
        raise NotImplementedError

    @abstractmethod
    def paste_requires_window_target(self) -> bool:
        raise NotImplementedError

    @abstractmethod
    def get_foreground_window_handle(self) -> int:
        raise NotImplementedError

    @abstractmethod
    def get_top_level_window_handle(self, hwnd: int) -> int:
        raise NotImplementedError

    @abstractmethod
    def has_foreground_text_caret(self) -> bool:
        raise NotImplementedError

    @abstractmethod
    def is_valid_window_handle(self, hwnd: int) -> bool:
        raise NotImplementedError

    @abstractmethod
    def tray_available(self) -> bool:
        raise NotImplementedError

    @abstractmethod
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
        raise NotImplementedError

    @abstractmethod
    def stop_tray(self, tray: TrayHandle | None) -> None:
        raise NotImplementedError

    @abstractmethod
    def check_permissions(self) -> dict[str, tuple[bool, str]]:
        raise NotImplementedError

    @abstractmethod
    def open_system_settings(self, target: str) -> bool:
        raise NotImplementedError

    @abstractmethod
    def open_mic_settings(self) -> bool:
        return self.open_system_settings("microphone")
