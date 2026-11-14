import unittest

from app import NVIDIA_DEFAULT_MODEL, OPENROUTER_DEFAULT_MODEL, PROVIDERS, RefineApp


class _FakeVar:
    def __init__(self, value: str = "") -> None:
        self.value = value

    def get(self) -> str:
        return self.value

    def set(self, value: str) -> None:
        self.value = value


class ModelPersistenceTests(unittest.TestCase):
    def test_resolve_keeps_user_model_missing_from_list(self) -> None:
        model = RefineApp._resolve_saved_model(
            "~deepseek/deepseek-flash-latest", ["a/model", "b/model"], OPENROUTER_DEFAULT_MODEL
        )
        self.assertEqual(model, "~deepseek/deepseek-flash-latest")

    def test_resolve_replaces_unavailable_builtin_default(self) -> None:
        model = RefineApp._resolve_saved_model(OPENROUTER_DEFAULT_MODEL, ["a/model", "b/model"], OPENROUTER_DEFAULT_MODEL)
        self.assertEqual(model, "a/model")

    def test_resolve_fills_empty_model_with_fallback(self) -> None:
        model = RefineApp._resolve_saved_model("", ["x", NVIDIA_DEFAULT_MODEL], NVIDIA_DEFAULT_MODEL, NVIDIA_DEFAULT_MODEL)
        self.assertEqual(model, NVIDIA_DEFAULT_MODEL)

    def test_dynamic_refresh_does_not_overwrite_selected_openrouter_model(self) -> None:
        app = RefineApp.__new__(RefineApp)
        selected = "~deepseek/deepseek-flash-latest"
        app.provider_profiles = {"OpenRouter": {"api_key": "k", "api_base": "https://openrouter.ai/api/v1", "model": selected}}
        app._all_provider_models = {}
        app.provider_var = _FakeVar("Local Model")
        app.status_var = _FakeVar()
        saves = []
        app._save_config = lambda *a, **k: saves.append(True)
        original = list(PROVIDERS["OpenRouter"]["models"])
        try:
            app._apply_dynamic_provider_models([("OpenRouter", ["inclusionai/ling-3.2-flash:free", "other/model"])], True)
        finally:
            PROVIDERS["OpenRouter"]["models"] = original

        self.assertEqual(app.provider_profiles["OpenRouter"]["model"], selected)
        self.assertEqual(app._all_provider_models["OpenRouter"][0], selected)
        self.assertEqual(saves, [True])


if __name__ == "__main__":
    unittest.main()
