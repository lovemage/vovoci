# VOVOCI

Windows 上的 vibecoding 與日常對話結構化語音秘書。

語言版本：[English](./README.md) | [繁體中文](./README.zh-TW.md) | [简体中文](./README.zh-CN.md)

VOVOCI 會先用本機 `faster-whisper` 做語音轉文字，再交給你選擇的 LLM 進行語義結構化，不改變使用者原意。

## 為什麼是 VOVOCI

- 適合 vibecoding、語音筆記、社群草稿、一般對話
- 支援任何 Windows 軟體場景（Push-to-talk + Auto paste）
- 使用你自己的 Provider 與模型，不綁平台
- 支援混合語言輸入與結構化輸出

## 核心流程

1. 按住熱鍵錄音
2. 本機 STT（`faster-whisper`）轉寫
3. LLM 做語義結構化
4. 輸出貼到目前作用中的視窗

## 翻譯模式（雙熱鍵）

- 一般精修：按原本熱鍵，浮窗顯示 `Listening ...`
- 翻譯模式：按 `Ctrl + 翻譯熱鍵`，浮窗開頭顯示 `Translating`
- 內容會翻譯並結構化成你在設定中指定的語言

## 功能

- 本機 STT（可離線轉寫）
- `system_prompt.json` 提示詞系統
- 多語系 UI：English、繁體中文、日本語、한국어
- Provider：OpenAI-compatible、OpenRouter、Xiaomi MiMo、Google Gemini、NVIDIA NIM
- 依 Provider 動態載入模型清單
- 自訂詞彙表
- 錄音檔為暫存，流程完成後會刪除

## 建議模型

- `gemini-2.5-flash`
- `openai/gpt-oss-20b`（NVIDIA）
- `Qwen2.5-Coder-7B-Instruct`
- `nvidia/nemotron-nano-9b-v2`
- `mistralai/mistral-small-24b-instruct`

## 快速開始

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

第一次啟動請到 Settings -> Local STT -> Preload STT Model，先預載 `small`。

## 打包 Windows 安裝檔

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-windows-installer.ps1 -Version 0.1.0
```

或使用一鍵打包：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\package-windows.ps1
```

## 授權

Apache 2.0，詳見 [LICENSE](./LICENSE)。
