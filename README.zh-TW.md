<div align="center">
  <img src="./logo.png" alt="VOVOCI Logo" width="140" />
  <h1>VOVOCI</h1>
  <p>Windows 上的 vibecoding 與日常對話結構化語音秘書。</p>
</div>

語言版本：[English](./README.md) | [繁體中文](./README.zh-TW.md) | [简体中文](./README.zh-CN.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md)

## 專案簡介

VOVOCI 會先用本機 `faster-whisper` 做語音轉文字，再交給你選擇的 LLM 進行語義結構化，不改變使用者原意。

## 特色

- 適合 vibecoding、語音筆記、社群草稿、一般對話
- 支援任何 Windows 軟體場景（Push-to-talk + Auto paste）
- 支援混合語言輸入與結構化輸出
- 多語系 UI：English、繁體中文、日本語、한국어
- Provider：OpenAI-compatible、OpenRouter、Xiaomi MiMo、Google Gemini、NVIDIA NIM
- 錄音檔為暫存，流程完成後會刪除

## 核心流程

1. 按住熱鍵錄音
2. 本機 STT（`faster-whisper`）轉寫
3. LLM 做語義結構化
4. 輸出貼到目前作用中的視窗

## Quick Start

### 1) Clone

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
```

### 2) Setup + Run

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 授權

Apache 2.0，詳見 [LICENSE](./LICENSE)。
