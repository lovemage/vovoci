<div align="center">
  <img src="./logo.png" alt="VOVOCI Logo" width="140" />
  <h1>VOVOCI</h1>
  <p>面向 Windows 的 vibecoding 与日常对话结构化语音秘书。</p>
</div>

语言版本：[English](https://github.com/lovemage/vovoci/blob/main/README.md#readme) | [繁體中文](https://github.com/lovemage/vovoci/blob/main/README.zh-TW.md#readme) | [简体中文](https://github.com/lovemage/vovoci/blob/main/README.zh-CN.md#readme) | [日本語](https://github.com/lovemage/vovoci/blob/main/README.ja.md#readme) | [한국어](https://github.com/lovemage/vovoci/blob/main/README.ko.md#readme)

## 版本

当前版本：`0.1.4`

## 项目简介

VOVOCI 先用本地 `faster-whisper` 做语音转文字，再交给你选择的 LLM 做语义结构化，不改变用户原意。

## APP 截图

![VOVOCI APP 截图](./docs/images/app-screenshot.png)

## 特色

- 适合 vibecoding、语音笔记、社媒草稿、日常对话
- 可在任意 Windows 软件中使用（Push-to-talk + Auto paste）
- 支持混合语言输入与结构化输出
- 多语言 UI：English、繁體中文、日本語、한국어
- Provider：OpenAI-compatible、OpenRouter、Xiaomi MiMo、Google Gemini、NVIDIA NIM
- 录音文件为临时文件，处理完成后删除

## 核心流程

1. 按住热键录音
2. 本地 STT（`faster-whisper`）转写
3. LLM 做语义结构化
4. 输出粘贴到当前活动窗口

## Quick Start

### 1) Windows 便携版（推荐）

1. 从 [Releases](https://github.com/lovemage/vovoci/releases/latest) 下载 `VOVOCI-portable-<version>.zip`
2. 解压 ZIP
3. 先运行 `Run-VOVOCI-First-Time.cmd`，再使用 `VOVOCI.exe`

注意：STT 模型会在首次使用时自动下载（需要一次联网），之后会缓存到本地供离线重复使用。

### 2) Clone（源码）

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
```

### 3) Setup + Run

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 许可证

Apache 2.0，详见 [LICENSE](./LICENSE)。


