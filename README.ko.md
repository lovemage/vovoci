<div align="center">
  <img src="./logo.png" alt="VOVOCI Logo" width="140" />
  <h1>VOVOCI</h1>
  <p>Windows에서 사용할 수 있는 vibecoding 및 일상 대화를 위한 구조화 음성 비서.</p>
</div>

언어: [English](./README.md) | [繁體中文](./README.zh-TW.md) | [简体中文](./README.zh-CN.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md)

## 개요

VOVOCI는 음성을 로컬 `faster-whisper`로 전사한 뒤, 사용자가 선택한 LLM으로 의미를 구조화합니다. 사용자 의도는 바꾸지 않습니다.

## 특징

- vibecoding, 음성 노트, 소셜 초안, 일반 대화에 적합
- Push-to-talk + Auto paste로 다양한 Windows 앱에서 사용 가능
- 혼합 언어 입력과 구조화 출력 지원
- 다국어 UI: English, 繁體中文, 日本語, 한국어
- Provider: OpenAI-compatible, OpenRouter, Xiaomi MiMo, Google Gemini, NVIDIA NIM
- 녹음 파일은 임시 파일로 처리 후 삭제

## 핵심 흐름

1. 핫키를 눌러 녹음
2. 로컬 STT(`faster-whisper`) 전사
3. LLM으로 의미 구조화
4. 결과를 활성 창에 붙여넣기

## 빠른 시작

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 라이선스

Apache 2.0. 자세한 내용은 [LICENSE](./LICENSE)를 참고하세요.
