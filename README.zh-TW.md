<div align="center">

<img src="./logo.png" width="140" />

# VOVOCI

**說出你的想法，邊說邊打磨。**

自然說話，在任何 Windows 應用程式中取得乾淨的結構化文字 — 由本機 STT 與你選擇的 LLM 驅動。

[![Version](https://img.shields.io/badge/version-0.1.5-blue)](https://github.com/lovemage/vovoci-packaging/releases)
[![License](https://img.shields.io/badge/license-Apache%202.0-green)](./LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows-0078D6?logo=windows)](https://github.com/lovemage/vovoci)
[![Downloads](https://img.shields.io/github/downloads/lovemage/vovoci-packaging/total)](https://github.com/lovemage/vovoci-packaging/releases)

Languages: [English](README.md) | [繁體中文](README.zh-TW.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

</div>

## 為什麼要結構化語音？

說話會啟動一種不同的思考方式 — 你會探索想法、發現漏洞，並即時修正方向。VOVOCI 把這些原始思考轉化為乾淨的結構化輸出，讓你可以：

- **邊說邊想** — 語音將思緒外化，幫助大腦比純打字更快地處理和精煉想法
- **掌握方向** — 聽到自己的推理過程，發現哪裡不對，在句子說到一半時就調整開發方向
- **直送任何場景** — 結構化輸出直接流入你的 IDE、agent prompt、筆記或聊天視窗 — 不需要額外整理

## 運作方式

```mermaid
graph LR
    A[🎤 按住快捷鍵 <br> 自然說話] --> B[🖥️ 本機 STT <br> faster-whisper]
    B --> C[🤖 LLM 精煉 <br> 你選擇的供應商]
    C --> D[📋 自動貼上 <br> 作用中視窗]
```

> 本機轉錄。你自己的 API key。在 LLM 步驟之前，資料不會離開你的電腦 — 而且你可以選擇信任哪個供應商。

## 亮點

| 💰 每月約 $3.80 美元 | 📖 術語掃描器 | 🌐 雙快捷鍵翻譯 |
|:---:|:---:|:---:|
| 不用訂閱。你只需為實際使用的 LLM API token 付費。透過 OpenRouter 使用 Grok 4.1 Fast 大量日用約 $3.80/月。 | 把內建 prompt 複製到你的 AI agent — 它會掃描你的程式碼庫並匯出詞彙表。匯入後，每次聽寫都能用正確的拼寫。 | 指定第二組快捷鍵用於翻譯。按下它取代一般的聽寫鍵，VOVOCI 就會自動將你的語音翻譯成目標語言。 |

## 快速開始

### Linux 備註

- `Linux` 為 Linux 平台版本（不是 `Lanus`）。
- 應用程式現在會自動儲存並在下次啟動時自動載入「目前選擇的模型」，不需每次重選。

### 發佈檔案

| 平台 | 檔案 | Release | 使用方式 |
|:---|:---|:---|:---|
| Windows | `VOVOCI-portable-0.1.5.zip` | [vovoci-packaging/releases/latest](https://github.com/lovemage/vovoci-packaging/releases/latest) | 解壓縮後執行 `Run-VOVOCI-First-Time.cmd`，再啟動 `VOVOCI.exe`。 |
| macOS | `VOVOCI-macOS-0.1.5-unsigned.dmg` | [vovoci-packaging/releases/latest](https://github.com/lovemage/vovoci-packaging/releases/latest) | 打開 DMG，把 `VOVOCI.app` 拖到 `Applications`，首次啟動若被 Gatekeeper 擋住，請右鍵選擇「打開」。 |

### 維護者發佈流程

當本地變更準備更新到遠端 release 與網站時，使用以下流程：

1. 將 source 變更 commit 並 push 到 `lovemage/vovoci`，必須包含 `site/` 與全部語言 README。
2. 確認 Cloudflare Pages 已設定從推送分支的 `site/` 部署靜態網站，或到 Cloudflare dashboard 手動觸發 Pages 部署。
3. 在 `lovemage/vovoci-packaging` 執行 `release` workflow，`source_ref` 填入已推送的 branch 或 tag，`release_version` 填入 `0.1.5`。
4. 保持 `package_windows=true`、`package_macos=true`、`publish_release=true`，用 GitHub Actions 編譯並發佈 Windows 與 macOS artifacts。Linux package 不由此 workflow 發佈；Linux 支援目前已在本地以 source/Python app 方式測試完成。
5. Workflow 完成後，確認 GitHub Release 內含 `VOVOCI-Setup-0.1.5.exe`、`VOVOCI-portable-0.1.5.zip`、`VOVOCI-macOS-0.1.5-unsigned.dmg`，再確認 `https://vovoci.com` 已顯示最新靜態網站。

### 免安裝版（推薦）

1. 從 [Releases](https://github.com/lovemage/vovoci-packaging/releases/latest) 下載 `VOVOCI-portable-0.1.5.zip`
2. 解壓縮後執行 `Run-VOVOCI-First-Time.cmd`
3. 啟動 `VOVOCI.exe`

> STT 模型在首次使用時自動下載（需要一次網路連線），之後會快取在本機供離線使用。

### 從原始碼安裝

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
python -m venv .venv && .venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 供應商

VOVOCI 內建支援六個 LLM 供應商，也支援本機 OpenAI-compatible 模型服務 — 你永遠不會被綁定。

**OpenAI Compatible** · **OpenRouter** · **Xiaomi MiMo** · **Google Gemini** · **NVIDIA NIM** *（免費方案）* · **Local Model**

> 已經有自己的本機模型服務？選擇 Local Model，填入本機 API Base URL、API Key 與模型名稱即可。

## 應用程式截圖

![VOVOCI App Screenshot](./docs/images/app-screenshot.png)

<div align="center">

🌐 [官方網站](https://vovoci.com) · 📄 [Apache 2.0 License](./LICENSE)

</div>
