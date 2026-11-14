import io
import json
import unittest
from unittest import mock
from urllib import error

from app import RefineApp, build_no_reasoning_options, is_reasoning_option_rejected


class _FakeResponse:
    def __init__(self, data: dict) -> None:
        self._body = json.dumps(data).encode("utf-8")

    def read(self) -> bytes:
        return self._body

    def __enter__(self) -> "_FakeResponse":
        return self

    def __exit__(self, *exc) -> None:
        return None


class _FakeRoot:
    def __init__(self) -> None:
        self.calls = []

    def after(self, _delay, func, *args) -> None:
        self.calls.append((func, args))


def _ok_response(text: str = "refined") -> _FakeResponse:
    return _FakeResponse({"choices": [{"message": {"content": text}}]})


def _http_error(code: int, body: str) -> error.HTTPError:
    return error.HTTPError("https://example.test", code, "error", {}, io.BytesIO(body.encode("utf-8")))


class RefineReasoningTests(unittest.TestCase):
    def _make_app(self) -> RefineApp:
        app = RefineApp.__new__(RefineApp)
        app.root = _FakeRoot()
        app._set_output = lambda token, text, status: ("output", text)
        app._set_error = lambda token, message: ("error", message)
        return app

    def _run_worker(self, app: RefineApp, provider: str, responses: list) -> list:
        sent = []

        def fake_urlopen(req, timeout=0):
            sent.append(json.loads(req.data.decode("utf-8")))
            result = responses.pop(0)
            if isinstance(result, Exception):
                raise result
            return result

        with mock.patch("app.request.urlopen", side_effect=fake_urlopen):
            app._refine_worker(None, provider, "https://example.test/v1", "sk-test", "some/model", "sys", "hello")
        return sent

    def test_no_reasoning_options_per_provider(self) -> None:
        self.assertEqual(build_no_reasoning_options("OpenRouter"), {"reasoning": {"enabled": False}})
        self.assertEqual(build_no_reasoning_options("Google Gemini API"), {"reasoning_effort": "none"})
        self.assertEqual(build_no_reasoning_options("Local Model"), {})
        self.assertEqual(build_no_reasoning_options("NVIDIA NIM"), {})

    def test_reasoning_rejection_detection(self) -> None:
        self.assertTrue(is_reasoning_option_rejected(400, '{"error":"Reasoning is mandatory for this endpoint"}'))
        self.assertTrue(is_reasoning_option_rejected(400, "thinking cannot be disabled"))
        self.assertFalse(is_reasoning_option_rejected(400, "invalid model"))
        self.assertFalse(is_reasoning_option_rejected(401, "reasoning"))

    def test_openrouter_request_disables_reasoning(self) -> None:
        app = self._make_app()
        sent = self._run_worker(app, "OpenRouter", [_ok_response()])

        self.assertEqual(len(sent), 1)
        self.assertEqual(sent[0]["reasoning"], {"enabled": False})
        self.assertEqual(sent[0]["messages"][1]["content"], "hello")
        func, args = app.root.calls[-1]
        self.assertIs(func, app._set_output)
        self.assertEqual(args[1], "refined")

    def test_local_model_request_has_no_reasoning_fields(self) -> None:
        app = self._make_app()
        sent = self._run_worker(app, "Local Model", [_ok_response()])

        self.assertNotIn("reasoning", sent[0])
        self.assertNotIn("reasoning_effort", sent[0])

    def test_retries_with_defaults_when_reasoning_cannot_be_disabled(self) -> None:
        app = self._make_app()
        rejection = _http_error(400, '{"error":{"message":"Reasoning is mandatory for this endpoint"}}')
        sent = self._run_worker(app, "OpenRouter", [rejection, _ok_response("fallback")])

        self.assertEqual(len(sent), 2)
        self.assertIn("reasoning", sent[0])
        self.assertNotIn("reasoning", sent[1])
        func, args = app.root.calls[-1]
        self.assertIs(func, app._set_output)
        self.assertEqual(args[1], "fallback")

    def test_unrelated_http_error_is_reported_with_detail(self) -> None:
        app = self._make_app()
        sent = self._run_worker(app, "OpenRouter", [_http_error(404, "model not found")])

        self.assertEqual(len(sent), 1)
        func, args = app.root.calls[-1]
        self.assertIs(func, app._set_error)
        self.assertEqual(args[1], "HTTP 404: model not found")


if __name__ == "__main__":
    unittest.main()
