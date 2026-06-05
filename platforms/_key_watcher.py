#!/usr/bin/env python3
import json
import os
import select
import sys
import time


KEY_RIGHTCTRL = 97
KEY_RIGHTSHIFT = 62
KEY_RIGHTALT = 108
KEY_LEFTCTRL = 29
KEY_LEFTSHIFT = 42
KEY_LEFTALT = 56
KEY_LEFT = 105
KEY_RIGHT = 106
KEY_END = 107

KEY_NAMES = {
    KEY_RIGHTCTRL: "ctrl_r",
    KEY_RIGHTSHIFT: "shift_r",
    KEY_RIGHTALT: "alt_r",
    KEY_LEFTCTRL: "ctrl_l",
    KEY_LEFTSHIFT: "shift_l",
    KEY_LEFTALT: "alt_l",
    KEY_LEFT: "left",
    KEY_RIGHT: "right",
    KEY_END: "end",
}

WATCH_KEYS = set(KEY_NAMES.keys())


def find_keyboard_devices():
    try:
        import evdev
    except ImportError:
        return []
    keyboards = []
    for path in evdev.list_devices():
        try:
            device = evdev.InputDevice(path)
            caps = device.capabilities(verbose=False)
            if 1 in caps:
                keys = caps[1]
                if KEY_RIGHTCTRL in keys:
                    keyboards.append(device)
                else:
                    device.close()
            else:
                device.close()
        except Exception:
            pass
    return keyboards


def watch_keys(devices, timeout=0.1):
    fds = {dev.fd: dev for dev in devices}
    while True:
        try:
            r, _, _ = select.select(list(fds.keys()), [], [], timeout)
        except (select.error, OSError, ValueError):
            time.sleep(timeout)
            continue
        for fd in r:
            dev = fds[fd]
            try:
                for event in dev.read():
                    if event.type == 1:
                        code = event.code
                        if code in WATCH_KEYS:
                            payload = json.dumps({
                                "key": KEY_NAMES[code],
                                "value": event.value,
                            })
                            sys.stdout.write(payload + "\n")
                            sys.stdout.flush()
            except (OSError, IOError):
                for d in devices:
                    try:
                        d.close()
                    except Exception:
                        pass
                return


def main():
    if len(sys.argv) < 2:
        print("usage: _key_watcher.py <timeout>", file=sys.stderr)
        sys.exit(1)
    try:
        poll_timeout = float(sys.argv[1])
    except ValueError:
        poll_timeout = 0.1

    devices = find_keyboard_devices()
    if not devices:
        print("ERROR: no keyboard devices found", file=sys.stderr)
        sys.exit(1)

    print(f"WATCHING {len(devices)} keyboard(s)", file=sys.stderr)
    for d in devices:
        print(f"  {d.path}: {d.name}", file=sys.stderr)
    sys.stderr.flush()

    try:
        watch_keys(devices, timeout=poll_timeout)
    except KeyboardInterrupt:
        pass
    finally:
        for d in devices:
            try:
                d.close()
            except Exception:
                pass


if __name__ == "__main__":
    main()
