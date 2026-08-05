<div align="center">

<img src="./logo.png" width="140" />

# VOVOCI

**开口即思考，边说边打磨。**

自然说话，在当前桌面应用中获得干净、润色后的文本 — 由本地 STT 和你选择的 LLM 驱动。

[![Version](https://img.shields.io/badge/version-0.1.7-blue)](https://github.com/lovemage/vovoci/releases)
[![License](https://img.shields.io/badge/license-Apache%202.0-green)](./LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-4C8BF5)](https://github.com/lovemage/vovoci)
[![Downloads](https://img.shields.io/github/downloads/lovemage/vovoci/total)](https://github.com/lovemage/vovoci/releases)

Languages: [English](README.md) | [繁體中文](README.zh-TW.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

</div>

## 为什么要用结构化语音？

说话会激活一种不同的思维方式 — 你会探索想法、发现漏洞，并实时纠正方向。VOVOCI 把这些原始思考转化为干净、结构化的输出，让你可以：

- **边说边想** — 语音将思维外化，帮助大脑比单纯打字更快地处理和打磨想法
- **随时调整方向** — 听到自己的推理过程，发现哪里不对，在说到一半时就修正思路
- **直达任何场景** — 结构化输出直接流入你的 IDE、Agent 提示词、笔记或聊天窗口 — 无需二次整理

## 工作原理

```mermaid
graph LR
    A[🎤 按住热键 <br> 自然说话] --> B[🖥️ 本地 STT <br> faster-whisper]
    B --> C[🤖 LLM 润色 <br> 你选择的服务商]
    C --> D[📋 自动粘贴 <br> 当前活动窗口]
```

> 本地转录，你自己的 API Key。在 LLM 环节之前数据不会离开你的电脑 — 而且你可以选择信任哪个服务商。

## 亮点

| 💰 API 成本可选 | 📖 术语扫描器 | 🪟 语音结束检查窗口 |
|:---:|:---:|:---:|
| 无需订阅。你可以使用付费网络 LLM API、免费额度服务商，或本地 OpenAI-compatible 大模型服务；不强制接入付费的网络 API。 | 将内置提示词复制到你的 AI Agent 中 — 它会扫描你的代码库并导出词汇表。导入后，每次听写都能使用正确的拼写。 | 语音结束时可弹出检查窗口：左侧显示原始输入语言转录，右侧显示 AI 重组后的语义内容，便于粘贴或复制前确认。 |

## v0.1.7 新功能

- **悬浮录音按钮** — 关闭主窗口到系统托盘后选择 `Show Button`；点击鸟图标开始录音，再次点击即可停止、转录并 Refi。
- **原地保存设置** — `Save Settings` 只提示保存完成，不再收起设置区或跳到 History。
- **保留原意的 Refi** — 问句保持问句、陈述句保持陈述句，只有真正包含多个项目时才使用列表。
- **三平台 Release** — 同一套 GitHub workflow 自动生成 Windows、macOS 和 Linux 发布文件。

## 快速开始

### 发布文件

| 平台 | 文件 | Release | 使用方式 |
|:---|:---|:---|:---|
| Windows | `VOVOCI-portable-0.1.7.zip` 或 `VOVOCI-Setup-0.1.7.exe` | [vovoci/releases/latest](https://github.com/lovemage/vovoci/releases/latest) | 解压 ZIP 并运行首次启动程序，或直接运行安装程序。 |
| macOS | `VOVOCI-macOS-0.1.7-unsigned.dmg` | [vovoci/releases/latest](https://github.com/lovemage/vovoci/releases/latest) | 将 `VOVOCI.app` 拖到 `Applications`；如果 Gatekeeper 拦截，请右键选择“打开”。 |
| Linux x86_64 | `VOVOCI-Linux-0.1.7-x86_64.tar.gz` | [vovoci/releases/latest](https://github.com/lovemage/vovoci/releases/latest) | 解压后运行 `VOVOCI/VOVOCI`；桌面环境可能仍需安装输入辅助工具。 |

### 维护者发布流程

当本地变更准备更新到远端 release 与网站时，使用以下流程：

1. 将 source 变更 commit 并 push 到 `lovemage/vovoci`，必须包含 `site/` 与所有语言 README。
2. 确认 Cloudflare Pages 已设置为从推送分支的 `site/` 部署静态网站，或在 Cloudflare dashboard 手动触发 Pages 部署。
3. 推送对应版本 tag（例如 `v0.1.7`），或手动运行 `release` workflow 并填写 `release_version=0.1.7`。
4. Workflow 会检查 `APP_VERSION`、运行测试、构建三个平台，并发布到 `lovemage/vovoci` Releases。
5. 确认 Release 包含 Windows 安装程序与便携 ZIP、macOS DMG、Linux x86_64 压缩包，再确认 `https://vovoci.com` 已显示最新网站。

### 便携版（推荐）

1. 从 [Releases](https://github.com/lovemage/vovoci/releases/latest) 下载 `VOVOCI-portable-0.1.7.zip`
2. 解压并运行 `Run-VOVOCI-First-Time.cmd`
3. 启动 `VOVOCI.exe`

> STT 模型在首次使用时自动下载（需要联网一次），之后缓存到本地可离线复用。

### 从源码运行

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
python -m venv .venv && .venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 服务商

VOVOCI 开箱即用支持六个 LLM 服务商，也支持本地 OpenAI-compatible 模型服务 — 绝不锁定。

**OpenAI Compatible** · **OpenRouter** · **Xiaomi MiMo** · **Google Gemini** · **NVIDIA NIM** *（免费额度）* · **Local Model**

> 已经有自己的本地大模型服务？选择 Local Model，填入本地 API Base URL、模型名称，以及服务器需要时才填写 API Key。这样可以使用本地大模型，不必强制接入付费网络 API。

## 应用截图

![VOVOCI App Screenshot](./docs/images/app-screenshot.png)

<div align="center">

🌐 [官网](https://vovoci.com) · 📄 [Apache 2.0 License](./LICENSE)

</div>
