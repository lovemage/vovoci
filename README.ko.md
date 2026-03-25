# VOVOCI (한국어)

VOVOCI는 Windows용 오픈소스 음성 입력 도구입니다.

핫키 길게 누름 녹음 -> 로컬 STT -> 선택적 Refine -> 선택적 자동 붙여넣기

저장소: `https://github.com/lovemage/vovoci.git`

## 언어 문서

- [English](./README.md)
- [繁體中文](./README.zh-TW.md)
- [简体中文](./README.zh-CN.md)
- [日本語](./README.ja.md)
- 한국어 (이 문서)

## 주요 기능

| 기능 | 설명 |
|---|---|
| Push-to-talk | 핫키를 누르는 동안 녹음, 떼면 전사 |
| 로컬 STT | `faster-whisper` 사용 |
| 다국어 설정 | 기본 언어 + 보조 언어 힌트 |
| Refine | 오타/군더더기/어색한 문장을 최소 변경으로 정리 |
| 혼합 언어 처리 | 중국어+영어 등 혼합 입력 지원 |
| Provider | OpenAI Compatible / OpenRouter / Xiaomi MiMo V2 / Google Gemini API / NVIDIA NIM |
| Provider별 API Key 저장 | Provider마다 키를 로컬에 분리 저장 |
| Settings | Local STT + Refi Prompt 통합 관리 |

## STT 지원

| 엔진 | 모드 | 모델 |
|---|---|---|
| faster-whisper | 로컬 | `tiny`, `base`, `small`, `medium`, `large-v3` |

## 전체 설치 가이드

### 1) 저장소 클론

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
```

### 2) Python 가상환경 생성

```powershell
python -m venv .venv
.venv\Scripts\activate
```

### 3) Python 의존성 설치

```powershell
pip install --upgrade pip
pip install keyboard numpy sounddevice faster-whisper ctranslate2 pystray pillow
```

### 4) STT 모델 사전 로드 (권장)

실행 후 `Settings` -> `Local STT` -> `Preload STT Model`.  
처음에는 `small` 권장.

## 실행

```powershell
python app.py
```

## 사용 가이드

1. Provider와 Model 선택  
2. 해당 Provider API 키 입력  
3. 우측 상단 `Settings`에서 STT/Prompt 설정  
4. 핫키를 누른 채 말하고, 떼면 전사  
5. 필요 시 다음 옵션 사용:
   - Auto Refine After STT
   - Auto Paste to Active Window
   - Recording Overlay 위치 (`Left Bottom` / `Center Bottom` / `Right Bottom`)

## 커스텀 어휘

용어 매핑을 정의하여 특정 분야 용어가 Refine 시 올바르게 처리되도록 합니다.

| 필드 | 설명 |
|---|---|
| Term | 감지할 단어 또는 구문 |
| Preferred | 올바르거나 선호하는 형태 |
| Note | Refine 엔진을 위한 보충 설명 (선택 사항) |

커스텀 어휘는 Refine 시 시스템 프롬프트에 자동 주입됩니다.

## Check Permissions

각 항목은 `✓ / ✗`로 표시됩니다.

| 점검 항목 |
|---|
| 로컬 STT 의존성 설치 여부 |
| STT 모델 존재 여부 |
| API 연결 테스트 |
| 마이크 권한 / Runtime |
| 핫키 Runtime |
| 업데이트 확인(GitHub) |

## 업데이트

| 동작 | 설명 |
|---|---|
| Check Update | GitHub 최신 버전 확인 |
| Self Update | git 저장소에서 `git pull --ff-only` 실행 |
