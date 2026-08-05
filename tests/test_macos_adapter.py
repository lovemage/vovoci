import unittest

import platforms.macos as macos_mod
from platforms.macos import MacOSPlatformAdapter


class _DummyKeys:
    alt_r = object()
    ctrl_r = object()
    end = object()
    left = object()
    right = object()
    shift_r = object()
    shift_l = object()


class _DummyKeyboardModule:
    Key = _DummyKeys


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


class MacOSAdapterTests(unittest.TestCase):
    def setUp(self) -> None:
        self._orig_pynput = macos_mod.pynput_keyboard
        macos_mod.pynput_keyboard = _DummyKeyboardModule()

    def tearDown(self) -> None:
        macos_mod.pynput_keyboard = self._orig_pynput

    def test_resolve_key_mapping(self) -> None:
        self.assertIs(MacOSPlatformAdapter._resolve_key("right alt"), _DummyKeys.alt_r)
        self.assertIs(MacOSPlatformAdapter._resolve_key("right shift"), _DummyKeys.shift_r)
        self.assertIsNone(MacOSPlatformAdapter._resolve_key("unknown"))

    def test_modifier_pressed_state(self) -> None:
        adapter = MacOSPlatformAdapter()
        adapter._pressed_keys = {_DummyKeys.shift_r}
        self.assertTrue(adapter.is_modifier_pressed("right shift"))
        self.assertFalse(adapter.is_modifier_pressed("left shift"))

    def test_check_permissions_collects_expected_keys(self) -> None:
        adapter = MacOSPlatformAdapter()
        orig_mic = MacOSPlatformAdapter._check_microphone_permission
        orig_ax = MacOSPlatformAdapter._check_accessibility_permission
        orig_im = MacOSPlatformAdapter._check_input_monitoring_permission
        try:
            MacOSPlatformAdapter._check_microphone_permission = staticmethod(lambda: (True, "mic"))
            MacOSPlatformAdapter._check_accessibility_permission = staticmethod(lambda: (False, "ax"))
            MacOSPlatformAdapter._check_input_monitoring_permission = staticmethod(lambda: (True, "im"))
            perms = adapter.check_permissions()
            self.assertEqual(perms["microphone"], (True, "mic"))
            self.assertEqual(perms["accessibility"], (False, "ax"))
            self.assertEqual(perms["input_monitoring"], (True, "im"))
        finally:
            MacOSPlatformAdapter._check_microphone_permission = orig_mic
            MacOSPlatformAdapter._check_accessibility_permission = orig_ax
            MacOSPlatformAdapter._check_input_monitoring_permission = orig_im

    def test_open_system_settings_uses_target_specific_url(self) -> None:
        adapter = MacOSPlatformAdapter()
        called = []
        orig_run = macos_mod.subprocess.run

        def fake_run(args, **kwargs):
            called.append(args)
            return 0

        try:
            macos_mod.subprocess.run = fake_run
            ok = adapter.open_system_settings("input_monitoring")
            self.assertTrue(ok)
            self.assertTrue(called)
            self.assertIn("Privacy_ListenEvent", called[0][1])
        finally:
            macos_mod.subprocess.run = orig_run

    def test_create_tray_has_show_window_item(self) -> None:
        adapter = MacOSPlatformAdapter()
        orig_pystray = macos_mod.pystray
        orig_thread = macos_mod.threading.Thread
        try:
            macos_mod.pystray = _DummyPystray
            macos_mod.threading.Thread = _DummyThread
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
            macos_mod.pystray = orig_pystray
            macos_mod.threading.Thread = orig_thread


if __name__ == "__main__":
    unittest.main()
