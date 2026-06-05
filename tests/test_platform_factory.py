import unittest

from platforms.factory import create_platform_adapter
from platforms.linux import LinuxPlatformAdapter
from platforms.macos import MacOSPlatformAdapter
from platforms.windows import WindowsPlatformAdapter


class PlatformFactoryTests(unittest.TestCase):
    def test_create_windows_adapter(self) -> None:
        adapter = create_platform_adapter("win32")
        self.assertIsInstance(adapter, WindowsPlatformAdapter)

    def test_create_macos_adapter(self) -> None:
        adapter = create_platform_adapter("darwin")
        self.assertIsInstance(adapter, MacOSPlatformAdapter)

    def test_linux_adapter(self) -> None:
        adapter = create_platform_adapter("linux")
        self.assertIsInstance(adapter, LinuxPlatformAdapter)

    def test_unknown_platform_defaults_to_macos_adapter(self) -> None:
        adapter = create_platform_adapter("freebsd")
        self.assertIsInstance(adapter, MacOSPlatformAdapter)


if __name__ == "__main__":
    unittest.main()
