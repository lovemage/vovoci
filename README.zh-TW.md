# VOVOCI

Windows 上的 vibecoding 與日常對話結構化語音秘書。

語言版本：[English](./README.md) | [繁體中文](./README.zh-TW.md) | [简体中文](./README.zh-CN.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md)

VOVOCI 會先用本機 `faster-whisper` 做語音轉文字，再交給你選擇的 LLM 進行語義結構化，不改變使用者原意。

## 核心流程

1. 按住熱鍵錄音
2. 本機 STT（`faster-whisper`）轉寫
3. LLM 做語義結構化
4. 輸出貼到目前作用中的視窗

## 授權

Apache 2.0，詳見 [LICENSE](./LICENSE)。
