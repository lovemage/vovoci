<div align="center">

<img src="./logo.png" width="140" />

# VOVOCI

**声に出して考えよう。話しながら磨き上げる。**

自然に話すだけで、整った構造化テキストがWindowsアプリに届きます — ローカルSTTとお好みのLLMで動作します。

[![Version](https://img.shields.io/badge/version-0.1.5-blue)](https://github.com/lovemage/vovoci-packaging/releases)
[![License](https://img.shields.io/badge/license-Apache%202.0-green)](./LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows-0078D6?logo=windows)](https://github.com/lovemage/vovoci)
[![Downloads](https://img.shields.io/github/downloads/lovemage/vovoci-packaging/total)](https://github.com/lovemage/vovoci-packaging/releases)

Languages: [English](README.md) | [繁體中文](README.zh-TW.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

</div>

## なぜ「構造化された音声入力」なのか？

話すことは、タイピングとは異なる思考回路を活性化させます — アイデアを探り、抜け漏れに気づき、リアルタイムで軌道修正できます。VOVOCIはその生の思考を整った構造化テキストに変換します。

- **話しながら考える** — 声に出すことで思考が外在化され、タイピングだけより速く脳が処理・整理できます
- **方向を修正する** — 自分の推論を声に出して聞き、おかしな点に気づき、文の途中でもアプローチを調整できます
- **あらゆる場面にそのまま使える** — 構造化された出力がIDE、エージェントプロンプト、メモ、チャットに直接流れます — 手直し不要です

## 仕組み

```mermaid
graph LR
    A[🎤 ホットキー長押し <br> 自然に話す] --> B[🖥️ ローカルSTT <br> faster-whisper]
    B --> C[🤖 LLMで整形 <br> お好みのプロバイダー]
    C --> D[📋 自動ペースト <br> アクティブウィンドウ]
```

> ローカルで文字起こし。APIキーはあなた自身のもの。LLMステップまでデータは外部に送信されません — どのプロバイダーを信頼するかはあなたが選べます。

## 特長

| 💰 月額約$3.80 | 📖 用語スキャナー | 🌐 デュアルホットキー翻訳 |
|:---:|:---:|:---:|
| サブスクリプション不要。実際に使ったLLM APIトークン分だけお支払い。Grok 4.1 Fast（OpenRouter経由）でヘビーに毎日使っても月額約$3.80です。 | 内蔵プロンプトをAIエージェントにコピーするだけ — コードベースをスキャンして用語テーブルをエクスポートします。インポートすれば、すべての音声入力で正しいスペルが使われます。 | 翻訳用に2つ目のホットキーを割り当てられます。通常の音声入力キーの代わりにそのキーを押すと、VOVOCIが発話を自動的にターゲット言語に翻訳します。 |

## クイックスタート

### 配布パッケージ

| プラットフォーム | パッケージ | Release | 使い方 |
|:---|:---|:---|:---|
| Windows | `VOVOCI-portable-0.1.5.zip` | [vovoci-packaging/releases/latest](https://github.com/lovemage/vovoci-packaging/releases/latest) | 展開して `Run-VOVOCI-First-Time.cmd` を実行し、その後 `VOVOCI.exe` を起動します。 |
| macOS | `VOVOCI-macOS-0.1.5-unsigned.dmg` | [vovoci-packaging/releases/latest](https://github.com/lovemage/vovoci-packaging/releases/latest) | DMG を開いて `VOVOCI.app` を `Applications` に移動し、初回起動時に Gatekeeper が警告した場合は右クリックして「開く」を選びます。 |

### メンテナー向けリリース手順

ローカル変更をリモート release とウェブサイトへ反映する場合は、次の手順を使います。

1. source の変更を `lovemage/vovoci` に commit して push します。`site/` と全言語の README を必ず含めます。
2. Cloudflare Pages が push された branch の `site/` から静的サイトをデプロイする設定になっていることを確認します。未設定の場合は Cloudflare dashboard から Pages deploy を手動実行します。
3. `lovemage/vovoci-packaging` の `release` workflow を実行し、`source_ref` に push 済みの branch または tag、`release_version` に `0.1.5` を指定します。
4. `package_windows=true`、`package_macos=true`、`publish_release=true` のままにして、GitHub Actions で Windows と macOS artifacts をビルドして公開します。Linux package はこの workflow では公開しません。Linux 対応は現在、ローカルで source/Python app としてテスト済みです。
5. Workflow 完了後、GitHub Release に `VOVOCI-Setup-0.1.5.exe`、`VOVOCI-portable-0.1.5.zip`、`VOVOCI-macOS-0.1.5-unsigned.dmg` があることを確認し、`https://vovoci.com` が最新の静的サイトを表示していることを確認します。

### ポータブル版（推奨）

1. [Releases](https://github.com/lovemage/vovoci-packaging/releases/latest) から `VOVOCI-portable-0.1.5.zip` をダウンロード
2. 解凍して `Run-VOVOCI-First-Time.cmd` を実行
3. `VOVOCI.exe` を起動

> STTモデルは初回使用時に自動ダウンロードされます（インターネット接続が一度だけ必要）。以降はローカルにキャッシュされ、オフラインで再利用できます。

### ソースから実行

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
python -m venv .venv && .venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## プロバイダー

VOVOCIは6つのLLMプロバイダーにすぐ対応し、ローカルの OpenAI-compatible モデルサーバーも使えます — ロックインはありません。

**OpenAI Compatible** · **OpenRouter** · **Xiaomi MiMo** · **Google Gemini** · **NVIDIA NIM** *（無料枠あり）* · **Local Model**

> 独自のローカルモデルサーバーがある場合は、Local Model を選択し、API Base URL、API Key、モデル名を入力してください。

## アプリのスクリーンショット

![VOVOCI App Screenshot](./docs/images/app-screenshot.png)

<div align="center">

🌐 [ウェブサイト](https://vovoci.com) · 📄 [Apache 2.0 License](./LICENSE)

</div>
