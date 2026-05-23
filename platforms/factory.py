from __future__ import annotations

import sys

from .base import PlatformAdapter
from .macos import MacOSPlatformAdapter
from .windows import WindowsPlatformAdapter


def create_platform_adapter(platform_name: str | None = None) -> PlatformAdapter:
    name = (platform_name or sys.platform or "").lower()
    if name.startswith("win"):
        return WindowsPlatformAdapter()
    return MacOSPlatformAdapter()
