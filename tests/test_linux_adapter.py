import unittest

from platforms.linux import LinuxPlatformAdapter


class _DummyProc:
    def __init__(self, returncode=None):
        self.returncode = returncode

    def poll(self):
        return self.returncode


class _DummyThread:
    def __init__(self, alive=True):
        self._alive = alive

    def is_alive(self):
        return self._alive


class LinuxAdapterTests(unittest.TestCase):
    def test_watcher_binding_alive_requires_process_and_thread(self) -> None:
        adapter = LinuxPlatformAdapter()
        self.assertTrue(adapter.hotkey_binding_alive(("watcher", _DummyProc(), _DummyThread())))
        self.assertFalse(adapter.hotkey_binding_alive(("watcher", _DummyProc(1), _DummyThread())))
        self.assertFalse(adapter.hotkey_binding_alive(("watcher", _DummyProc(), _DummyThread(False))))


if __name__ == "__main__":
    unittest.main()
