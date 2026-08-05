import json
import unittest

from app import DEFAULT_SYSTEM_PROMPT_JSON, RefineApp


class _FakeStringVar:
    def __init__(self) -> None:
        self.value = ""

    def set(self, value: str) -> None:
        self.value = value


class UiActionTests(unittest.TestCase):
    def test_saving_settings_keeps_the_settings_panel_visible(self) -> None:
        app = RefineApp.__new__(RefineApp)
        saves = []
        animations = []
        collapses = []
        app._save_config = lambda *, silent=False: saves.append(silent)
        app.status_var = _FakeStringVar()
        app._t = lambda key: {"settings_saved": "Settings saved."}[key]
        app._main_save_btn = object()
        app._animate_save_button = lambda button, key: animations.append((button, key))
        app._set_workspace_settings_collapsed = lambda collapsed: collapses.append(collapsed)

        app._save_config_with_feedback()

        self.assertEqual(saves, [True])
        self.assertEqual(app.status_var.value, "Settings saved.")
        self.assertEqual(animations, [(app._main_save_btn, "save_settings")])
        self.assertEqual(collapses, [])

    def test_floating_button_starts_and_stops_recording(self) -> None:
        app = RefineApp.__new__(RefineApp)
        actions = []
        app._is_recording = False
        app._is_transcribing = False
        app._floating_button_preferred_hwnd = 42
        app._start_recording_if_needed = lambda *, preferred_paste_hwnd=0: actions.append(("start", preferred_paste_hwnd))
        app._stop_recording_if_needed = lambda: actions.append(("stop", None))
        app._cancel_active_audio_pipeline = lambda reason: actions.append(("cancel", reason))

        app._toggle_floating_button_recording()
        app._is_recording = True
        app._toggle_floating_button_recording()

        self.assertEqual(actions, [("start", 42), ("stop", None)])

    def test_effective_prompt_preserves_sentence_type_and_limits_lists(self) -> None:
        app = RefineApp.__new__(RefineApp)
        app.system_prompt_cache = json.dumps(DEFAULT_SYSTEM_PROMPT_JSON)
        app.custom_terms = []

        prompt = json.loads(app._build_effective_system_prompt())
        rules = " ".join(prompt["non_negotiable_output_rules"]).lower()
        output_policy = " ".join(prompt["output_policy"]).lower()

        self.assertIn("questions remain questions", rules)
        self.assertIn("statements remain statements", rules)
        self.assertIn("single intent", output_policy)
        self.assertIn("never turn a single task or idea into a list", output_policy)


if __name__ == "__main__":
    unittest.main()
