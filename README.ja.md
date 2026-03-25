# VOVOCI（日本語）

VOVOCI は Windows 向けのオープンソース音声入力ツールです。

ホットキー長押し録音 -> ローカル STT -> 任意で Refine -> 任意で自動貼り付け

リポジトリ：`https://github.com/lovemage/vovoci.git`

## 言語版

- [English](./README.md)
- [繁體中文](./README.zh-TW.md)
- [简体中文](./README.zh-CN.md)
- 日本語（このページ）
- [한국어](./README.ko.md)

## 主な機能

| 機能 | 説明 |
|---|---|
| Push-to-talk | ホットキー押下中に録音、離すと文字起こし |
| ローカル STT | `faster-whisper` を使用 |
| 多言語設定 | 主言語 + 副言語ヒント |
| Refine | 誤字・不要な言い淀み・不自然な文を最小変更で修正 |
| 混在言語対応 | 中国語 + 英語などの混在入力に対応 |
| Provider | OpenAI Compatible / OpenRouter / Xiaomi MiMo V2 / Google Gemini API / NVIDIA NIM |
| Provider別 API Key 保存 | Provider ごとにキーをローカル保存 |
| Settings | Local STT と Refi Prompt を一元管理 |

## STT 対応

| エンジン | モード | モデル |
|---|---|---|
| faster-whisper | ローカル | `tiny`, `base`, `small`, `medium`, `large-v3` |

## 完全インストール手順

### 1. リポジトリを取得

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
```

### 2. Python 仮想環境を作成

```powershell
python -m venv .venv
.venv\Scripts\activate
```

### 3. Python 依存関係をインストール

```powershell
pip install --upgrade pip
pip install keyboard numpy sounddevice faster-whisper ctranslate2 pystray pillow
```

### 4. STT モデル事前ロード（推奨）

起動後 `Settings` -> `Local STT` -> `Preload STT Model`。  
まずは `small` を推奨。

## 実行

```powershell
python app.py
```

## 利用ガイド

1. Provider と Model を選択。  
2. Provider 用 API キーを入力。  
3. 右上 `Settings` で STT/PROMPT を設定。  
4. ホットキーを押しながら話し、離して文字起こし。  
5. 必要に応じて以下を有効化：
   - Auto Refine After STT
   - Auto Paste to Active Window
   - Recording Overlay 位置（`Left Bottom` / `Center Bottom` / `Right Bottom`）

## カスタム語彙

用語マッピングを定義し、特定分野の語彙が Refine 時に正しく処理されるようにします。

| フィールド | 説明 |
|---|---|
| Term | 検出する単語またはフレーズ |
| Preferred | 正しいまたは推奨される形式 |
| Note | Refine エンジンへの補足説明（任意） |

カスタム語彙は Refine 時にシステムプロンプトへ自動注入されます。

## Check Permissions

各項目は `✓ / ✗` で表示されます。

| チェック項目 |
|---|
| ローカル STT 依存パッケージ |
| STT モデル存在確認 |
| API 接続テスト |
| マイク権限 / Runtime |
| ホットキー Runtime |
| 更新チェック（GitHub） |

## 更新

| 操作 | 内容 |
|---|---|
| Check Update | GitHub の最新バージョン確認 |
| Self Update | git リポジトリで `git pull --ff-only` を実行 |
