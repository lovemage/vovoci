import unittest

import platforms.windows as windows_mod
from platforms.windows import WindowsPlatformAdapter


class _DummyMenuItem:
    def __init__(self, text, callback, default=False, visible=True):
        self.text = text
        self.callback = callback
        self.default = default
        self.visible = visible


class _DummyMenu:
    def __init__(self, *items):
        self.items = list(items)


class _DummyIcon:
    def __init__(self, name, image, title, menu):
        self.name = name
        self.image = image
        self.title = title
        self.menu = menu
        self.stopped = False

    def run(self):
        return None

    def stop(self):
        self.stopped = True


class _DummyThread:
    def __init__(self, target=None, daemon=None):
        self.target = target
        self.daemon = daemon
        self.started = False
        self.join_called = False

    def start(self):
        self.started = True

    def join(self, timeout=None):
        del timeout
        self.join_called = True


class _DummyPystray:
    MenuItem = _DummyMenuItem
    Menu = _DummyMenu
    Icon = _DummyIcon


class WindowsAdapterTests(unittest.TestCase):
    def test_create_tray_has_show_window_item(self) -> None:
        adapter = WindowsPlatformAdapter()
        orig_pystray = windows_mod.pystray
        orig_thread = windows_mod.threading.Thread
        try:
            windows_mod.pystray = _DummyPystray
            windows_mod.threading.Thread = _DummyThread
            tray = adapter.create_tray(
                name="VOVOCI",
                title="VOVOCI",
                image=object(),
                on_primary=lambda: None,
                on_settings=lambda: None,
                on_show_button=lambda: None,
                on_exit=lambda: None,
            )
            self.assertIsNotNone(tray)
            labels = [item.text for item in tray.icon.menu.items]
            self.assertIn("Show Window", labels)
            self.assertIn("Show Button", labels)
            adapter.stop_tray(tray)
            self.assertTrue(tray.icon.stopped)
            self.assertTrue(tray.thread.join_called)
        finally:
            windows_mod.pystray = orig_pystray
            windows_mod.threading.Thread = orig_thread


if __name__ == "__main__":
    unittest.main()
