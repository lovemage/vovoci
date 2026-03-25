# VOVOCI

面向 Windows 的 vibecoding 与日常对话结构化语音秘书。

语言版本：[English](./README.md) | [繁體中文](./README.zh-TW.md) | [简体中文](./README.zh-CN.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md)

VOVOCI 先用本地 `faster-whisper` 做语音转文字，再交给你选择的 LLM 做语义结构化，不改变用户原意。

## 核心流程

1. 按住热键录音
2. 本地 STT（`faster-whisper`）转写
3. LLM 做语义结构化
4. 输出粘贴到当前活动窗口

## 许可证

Apache 2.0，详见 [LICENSE](./LICENSE)。
