#!/usr/bin/env python3
"""Install polkit policy to allow passwordless keyboard monitoring via _key_watcher.py"""
import json
import os
import subprocess
import sys
from pathlib import Path

RULES_FILE = Path("/etc/polkit-1/rules.d/99-vovoci-key-watcher.rules")
POLICY_FILE = Path("/usr/share/polkit-1/actions/com.vovoci.keywatcher.policy")


def install_rules():
    rules_content = """polkit.addRule(function(action, subject) {
    if (action.id == "com.vovoci.keywatcher" &&
        subject.isInGroup("sudo")) {
        return polkit.Result.YES;
    }
});
"""
    try:
        RULES_FILE.write_text(rules_content)
        RULES_FILE.chmod(0o644)
        print(f"Installed {RULES_FILE}")
    except PermissionError:
        print(f"Cannot write {RULES_FILE}, trying pkexec...")
        with open("/tmp/99-vovoci-key-watcher.rules", "w") as f:
            f.write(rules_content)
        subprocess.run(
            ["pkexec", "cp", "/tmp/99-vovoci-key-watcher.rules", str(RULES_FILE)],
            check=True,
        )
        print(f"Installed {RULES_FILE} via pkexec")

    policy_content = """<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE policyconfig PUBLIC
 "-//freedesktop//DTD PolicyKit Policy Configuration 1.0//EN"
 "http://www.freedesktop.org/standards/PolicyKit/1/policyconfig.dtd">
<policyconfig>
  <action id="com.vovoci.keywatcher">
    <description>Monitor keyboard input for VOVOCI</description>
    <message>VOVOCI needs to monitor keyboard events for push-to-talk functionality</message>
    <defaults>
      <allow_any>auth_admin</allow_any>
      <allow_inactive>auth_admin</allow_inactive>
      <allow_active>auth_admin</allow_active>
    </defaults>
    <annotate key="org.freedesktop.policykit.exec.path">{watcher_path}</annotate>
    <annotate key="org.freedesktop.policykit.exec.allow_gui">false</annotate>
  </action>
</policyconfig>
""".format(watcher_path=str(Path(__file__).resolve().parent / "_key_watcher.py"))
    try:
        POLICY_FILE.write_text(policy_content)
        POLICY_FILE.chmod(0o644)
        print(f"Installed {POLICY_FILE}")
    except PermissionError:
        print(f"Cannot write {POLICY_FILE}, trying pkexec...")
        with open("/tmp/com.vovoci.keywatcher.policy", "w") as f:
            f.write(policy_content)
        subprocess.run(
            ["pkexec", "cp", "/tmp/com.vovoci.keywatcher.policy", str(POLICY_FILE)],
            check=True,
        )
        print(f"Installed {POLICY_FILE} via pkexec")

    print("Polkit policy installed. Keyboard monitoring should now work without password prompts.")


if __name__ == "__main__":
    install_rules()
