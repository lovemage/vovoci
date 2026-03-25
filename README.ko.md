# VOVOCI

VOVOCI는 Windows에서 사용할 수 있는 vibecoding 및 일상 대화를 위한 구조화 음성 비서입니다.

언어: [English](./README.md) | [繁體中文](./README.zh-TW.md) | [简体中文](./README.zh-CN.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md)

VOVOCI는 음성을 로컬 `faster-whisper`로 전사한 뒤, 사용자가 선택한 LLM으로 의미를 구조화합니다. 사용자 의도는 바꾸지 않습니다.

## 핵심 흐름

1. 핫키를 눌러 녹음
2. 로컬 STT(`faster-whisper`) 전사
3. LLM으로 의미 구조화
4. 결과를 활성 창에 붙여넣기

## 라이선스

Apache 2.0. 자세한 내용은 [LICENSE](./LICENSE)를 참고하세요.
