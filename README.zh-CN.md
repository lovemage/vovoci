# VOVOCI

面向 Windows 的 vibecoding 与日常对话结构化语音秘书。

语言版本：[English](./README.md) | [繁體中文](./README.zh-TW.md) | [简体中文](./README.zh-CN.md)

VOVOCI 先用本地 `faster-whisper` 做语音转文字，再交给你选择的 LLM 做语义结构化，不改变用户原意。

## 为什么是 VOVOCI

- 适合 vibecoding、语音笔记、社媒草稿、日常对话
- 可在任意 Windows 软件中使用（Push-to-talk + Auto paste）
- 使用你自己的 Provider 和模型，不锁平台
- 支持混合语言输入与结构化输出

## 核心流程

1. 按住热键录音
2. 本地 STT（`faster-whisper`）转写
3. LLM 做语义结构化
4. 输出粘贴到当前活动窗口

## 翻译模式（双热键）

- 普通精修：按原热键，悬浮窗显示 `Listening ...`
- 翻译模式：按 `Ctrl + 翻译热键`，悬浮窗开头显示 `Translating`
- 内容会被翻译并结构化到你在设置里指定的目标语言

## 功能

- 本地 STT（可离线转写）
- `system_prompt.json` 提示词系统
- 多语言 UI：English、繁體中文、日本語、한국어
- Provider：OpenAI-compatible、OpenRouter、Xiaomi MiMo、Google Gemini、NVIDIA NIM
- 按 Provider 动态加载模型列表
- 自定义词汇表
- 录音文件为临时文件，处理完成后删除

## 建议模型

- `gemini-2.5-flash`
- `openai/gpt-oss-20b`（NVIDIA）
- `Qwen2.5-Coder-7B-Instruct`
- `nvidia/nemotron-nano-9b-v2`
- `mistralai/mistral-small-24b-instruct`

## 快速开始

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

首次启动请到 Settings -> Local STT -> Preload STT Model，先预载 `small`。

## 打包 Windows 安装包

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-windows-installer.ps1 -Version 0.1.0
```

或使用一键打包：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\package-windows.ps1
```

## 许可证

Apache 2.0，详见 [LICENSE](./LICENSE)。
