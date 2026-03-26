<div align="center">
  <img src="./logo.png" alt="VOVOCI Logo" width="140" />
  <h1>VOVOCI</h1>
  <p>Windows에서 사용할 수 있는 vibecoding 및 일상 대화를 위한 구조화 음성 비서.</p>
</div>

언어: [English](./README.md) | [繁體中文](./README.zh-TW.md) | [简体中文](./README.zh-CN.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md)

## 버전

현재 버전: `0.1.3`

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

## Quick Start

### 1) Windows 포터블 버전 (권장)

1. [Releases](https://github.com/lovemage/vovoci/releases/latest)에서 `VOVOCI-portable-<version>.zip` 다운로드
2. ZIP 압축 해제
3. 먼저 `Run-VOVOCI-First-Time.cmd` 실행 후 `VOVOCI.exe` 사용

참고: STT 모델은 첫 사용 시 자동 다운로드됩니다(인터넷 1회 필요). 이후에는 로컬 캐시로 오프라인 재사용됩니다.

### 2) Clone (소스코드)

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
```

### 3) Setup + Run

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 라이선스

Apache 2.0. 자세한 내용은 [LICENSE](./LICENSE)를 참고하세요.

