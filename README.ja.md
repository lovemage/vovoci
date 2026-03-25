# VOVOCI

VOVOCI は、Windows 上で使える vibecoding と日常会話向けの構造化音声秘書です。

言語: [English](./README.md) | [繁體中文](./README.zh-TW.md) | [简体中文](./README.zh-CN.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md)

VOVOCI は音声をローカルの `faster-whisper` で文字起こしし、その後あなたが選んだ LLM で意味を構造化します。ユーザーの意図は変更しません。

## コアフロー

1. ホットキーを押して録音
2. ローカル STT（`faster-whisper`）で文字起こし
3. LLM で意味を構造化
4. 出力をアクティブなウィンドウへ貼り付け

## ライセンス

Apache 2.0。詳細は [LICENSE](./LICENSE) を参照してください。
