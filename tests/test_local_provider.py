import unittest

from app import PROVIDERS, RefineApp


class LocalProviderTests(unittest.TestCase):
    def test_local_model_provider_has_editable_openai_compatible_defaults(self) -> None:
        self.assertIn("Local Model", PROVIDERS)

        profile = RefineApp._default_provider_profile("Local Model")

        self.assertEqual(profile["api_base"], "http://localhost:11434/v1")
        self.assertEqual(profile["model"], "llama3.1")

    def test_openai_compatible_is_hidden_from_provider_picker(self) -> None:
        self.assertNotIn("OpenAI Compatible", RefineApp._provider_options())
        self.assertIn("Local Model", RefineApp._provider_options())

    def test_local_model_does_not_require_api_key(self) -> None:
        self.assertFalse(RefineApp._provider_requires_api_key("Local Model"))
        self.assertTrue(RefineApp._provider_requires_api_key("OpenRouter"))


if __name__ == "__main__":
    unittest.main()
