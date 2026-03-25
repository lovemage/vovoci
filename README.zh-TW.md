# VOVOCI（繁體中文）

VOVOCI 是一個 Windows 開源桌面工具，流程為：

按住熱鍵錄音 -> 本地 STT -> 可選 Refine -> 可選自動貼上

倉庫：`https://github.com/lovemage/vovoci.git`

## 語言版本

- [English](./README.md)
- 繁體中文（本頁）
- [简体中文](./README.zh-CN.md)
- [日本語](./README.ja.md)
- [한국어](./README.ko.md)

## 功能摘要

| 功能 | 說明 |
|---|---|
| Push-to-talk | 按住熱鍵開始錄音，放開後轉寫 |
| 本地 STT | 使用 `faster-whisper` |
| 多語設定 | 主語言 + 次語言提示 |
| Refine | 修正錯字、語助詞、語句流暢度，保留原意 |
| 混語處理 | 支援中英混合輸入 |
| Provider | OpenAI Compatible / OpenRouter / Xiaomi MiMo V2 / Google Gemini API / NVIDIA NIM |
| 分平台 API Key | 每個 Provider 各自儲存 API key |
| Settings | Local STT + Refi Prompt 整合管理 |

## STT 支援

| 引擎 | 模式 | 模型 |
|---|---|---|
| faster-whisper | 本地 | `tiny`, `base`, `small`, `medium`, `large-v3` |

## 完整安裝

### 1. 下載程式碼

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
```

### 2. 建立 Python 虛擬環境

```powershell
python -m venv .venv
.venv\Scripts\activate
```

### 3. 安裝 Python 套件

```powershell
pip install --upgrade pip
pip install keyboard numpy sounddevice faster-whisper ctranslate2 pystray pillow
```

### 4. 預載 STT 模型（建議）

啟動後進入 `Settings` -> `Local STT` -> `Preload STT Model`。  
建議先用 `small`。

## 啟動

```powershell
python app.py
```

## 使用指南

1. 選擇 Provider 與 Model。  
2. 輸入對應 Provider 的 API key。  
3. 點右上 `Settings` 設定 STT 與 Prompt。  
4. 設定熱鍵，按住說話、放開轉寫。  
5. 依需求開啟：
   - Auto Refine After STT
   - Auto Paste to Active Window
   - Recording Overlay 位置（`Left Bottom` / `Center Bottom` / `Right Bottom`）

## 自訂詞彙

定義詞彙對照表，確保特定領域詞彙在 Refine 時能正確處理。

| 欄位 | 說明 |
|---|---|
| Term | 要偵測的詞彙或片語 |
| Preferred | 正確或偏好的形式 |
| Note | 提供給 Refine 引擎的補充說明（選填） |

自訂詞彙會在 Refine 時自動注入系統提示詞。

## Check Permissions

會逐項顯示 `✓ / ✗`：

| 檢查項目 |
|---|
| 本地 STT 依賴是否安裝 |
| STT 模型是否存在 |
| API 連線測試 |
| 麥克風權限 / Runtime |
| 熱鍵 Runtime |
| 更新檢查（GitHub） |

## 更新

| 操作 | 說明 |
|---|---|
| Check Update | 檢查 GitHub 最新版本 |
| Self Update | 在 git 倉庫執行 `git pull --ff-only` |
