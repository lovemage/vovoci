import unittest

from app import PROVIDERS, RefineApp


class LocalProviderTests(unittest.TestCase):
    def test_local_model_provider_has_editable_openai_compatible_defaults(self) -> None:
        self.assertIn("Local Model", PROVIDERS)

        profile = RefineApp._default_provider_profile("Local Model")

        self.assertEqual(profile["api_base"], "http://localhost:11434/v1")
        self.assertEqual(profile["model"], "llama3.1")


if __name__ == "__main__":
    unittest.main()
