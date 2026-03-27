<div align="center">

<img src="./logo.png" width="140" />

# VOVOCI

**말로 생각하고, 말하면서 다듬어가세요.**

자연스럽게 말하면, 깔끔하게 정리된 텍스트가 Windows 앱에 바로 입력됩니다 — 로컬 STT와 원하는 LLM으로 구동됩니다.

[![Version](https://img.shields.io/badge/version-0.1.4-blue)](https://github.com/lovemage/vovoci-packaging/releases)
[![License](https://img.shields.io/badge/license-Apache%202.0-green)](./LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows-0078D6?logo=windows)](https://github.com/lovemage/vovoci)
[![Downloads](https://img.shields.io/github/downloads/lovemage/vovoci-packaging/total)](https://github.com/lovemage/vovoci-packaging/releases)

Languages: [English](README.md) | [繁體中文](README.zh-TW.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

</div>

## 왜 구조화된 음성인가요?

말하기는 다른 종류의 사고를 활성화합니다 — 아이디어를 탐색하고, 빈틈을 발견하고, 실시간으로 방향을 수정할 수 있습니다. VOVOCI는 그 날것의 사고를 깔끔하고 구조화된 결과물로 바꿔줍니다:

- **말하면서 생각합니다** — 음성은 생각을 외부로 꺼내어, 타이핑만 할 때보다 뇌가 더 빠르게 처리하고 다듬을 수 있게 도와줍니다
- **방향을 조정합니다** — 자신의 추론을 소리 내어 들으면서, 어긋난 부분을 찾아내고 문장 도중에도 접근 방식을 수정할 수 있습니다
- **어디든 바로 적용합니다** — 구조화된 결과물이 IDE, 에이전트 프롬프트, 메모, 채팅 등 어디든 바로 흘러들어갑니다 — 후처리가 필요 없습니다

## 작동 방식

```mermaid
graph LR
    A[🎤 단축키를 누르고 <br> 자연스럽게 말하기] --> B[🖥️ 로컬 STT <br> faster-whisper]
    B --> C[🤖 LLM 다듬기 <br> 선택한 프로바이더]
    C --> D[📋 자동 붙여넣기 <br> 활성 창에]
```

> 로컬 음성 인식. 본인의 API 키 사용. LLM 단계 전까지 데이터가 외부로 나가지 않으며 — 어떤 프로바이더를 신뢰할지는 직접 선택합니다.

## 주요 특징

| 💰 월 ~$3.80 | 📖 용어 스캐너 | 🌐 이중 단축키 번역 |
|:---:|:---:|:---:|
| 구독료 없음. 실제로 사용한 LLM API 토큰만큼만 비용을 지불합니다. OpenRouter를 통해 Grok 4.1 Fast를 매일 많이 사용해도 월 ~$3.80 수준입니다. | 내장된 프롬프트를 AI 에이전트에 복사하면, 코드베이스를 스캔하여 용어 테이블을 추출합니다. 이를 가져오면 모든 음성 입력에서 정확한 맞춤법이 적용됩니다. | 번역 전용 두 번째 단축키를 지정하세요. 일반 음성 입력 키 대신 누르면, VOVOCI가 음성을 자동으로 대상 언어로 번역합니다. |

## 빠른 시작

### 포터블 (권장)

1. [Releases](https://github.com/lovemage/vovoci-packaging/releases/latest)에서 `VOVOCI-portable-0.1.4.zip`을 다운로드합니다
2. 압축을 풀고 `Run-VOVOCI-First-Time.cmd`를 실행합니다
3. `VOVOCI.exe`를 실행합니다

> STT 모델은 첫 사용 시 자동 다운로드됩니다(인터넷 1회 필요). 이후 로컬에 캐시되어 오프라인으로 재사용할 수 있습니다.

### 소스에서 실행

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
python -m venv .venv && .venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 프로바이더

VOVOCI는 다섯 가지 LLM 프로바이더를 기본 지원합니다 — 특정 서비스에 종속되지 않습니다.

**OpenAI Compatible** · **OpenRouter** · **Xiaomi MiMo** · **Google Gemini** · **NVIDIA NIM** *(무료 티어)*

> LLM API가 처음이신가요? NVIDIA NIM으로 시작해 보세요 — 무료 이용 가능, 신용카드 불필요합니다.

## 앱 스크린샷

![VOVOCI App Screenshot](./docs/images/app-screenshot.png)

<div align="center">

🌐 [웹사이트](https://vovoci.com) · 📄 [Apache 2.0 라이선스](./LICENSE)

</div>
