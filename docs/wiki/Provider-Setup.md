# Provider Setup

VOVOCI supports **5 LLM providers** via the OpenAI-compatible `/chat/completions` API. Each provider requires its own configuration: base URL, API key, and model selection.

## Provider Overview

| Provider | Base URL | Notes |
|---|---|---|
| OpenAI Compatible | `https://api.openai.com/v1` | Use your OpenAI-compatible API key |
| OpenRouter | `https://openrouter.ai/api/v1` | Uses OpenRouter provider models via OpenAI-compatible API |
| Xiaomi MiMo V2 | `https://api.xiaomimimo.com/v1` | Uses API key, OpenAI-compatible `/chat/completions` |
| Google Gemini API | `https://generativelanguage.googleapis.com/v1beta/openai/` | On provider switch: tries `GOOGLE_API_KEY` / `GEMINI_API_KEY`, else opens browser for key setup |
| NVIDIA NIM | `https://integrate.api.nvidia.com/v1` | Supports NVIDIA-hosted model catalog, including DeepSeek/Mistral/MiniMax families |

## Quick Setup

1. **Select a Provider** from the dropdown in the main window.
2. **Enter Your API Key** for that provider (stored securely in `config.json`).
3. **Choose a Model** from the model dropdown. Some providers (NVIDIA NIM, OpenRouter) fetch model lists dynamically from their API.
4. **Test the Connection** via the Check Permissions dialog to verify API connectivity.

## Provider Details

### OpenAI Compatible
- **Default Base URL:** `https://api.openai.com/v1`
- **Setup:** Obtain an API key from OpenAI and enter it in the settings.
- **Models:** Standard OpenAI models (GPT-4, GPT-3.5-turbo, etc.).

### OpenRouter
- **Default Base URL:** `https://openrouter.ai/api/v1`
- **Setup:** Sign up at OpenRouter, get your API key, and configure in VOVOCI.
- **Models:** Dynamically fetched from OpenRouter's catalog.

### Xiaomi MiMo V2
- **Default Base URL:** `https://api.xiaomimimo.com/v1`
- **Setup:** Obtain an API key from Xiaomi's developer portal.
- **Models:** Xiaomi-hosted models via OpenAI-compatible API.

### Google Gemini API
- **Default Base URL:** `https://generativelanguage.googleapis.com/v1beta/openai/`
- **Setup:** On first use or provider switch, VOVOCI attempts to load from environment variables (`GOOGLE_API_KEY` or `GEMINI_API_KEY`). If not found, a browser window opens to the Google AI Studio for key retrieval.
- **Models:** Google Gemini models.

### NVIDIA NIM
- **Default Base URL:** `https://integrate.api.nvidia.com/v1`
- **Setup:** Obtain an NVIDIA NIM API key and configure in VOVOCI.
- **Models:** Dynamically fetched from NVIDIA's model catalog, including DeepSeek, Mistral, MiniMax, and other supported families.

## Profile Management

Each provider has a **profile** stored in `config.json` containing:
- API key
- Base URL
- Selected model
- Any provider-specific settings

Switching providers automatically loads the corresponding profile. If a required field is missing, VOVOCI prompts you to configure it before proceeding.
