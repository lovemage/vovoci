<div align="center">

<img src="./logo.png" width="140" />

# VOVOCI

**말로 생각하고, 말하면서 다듬어가세요.**

자연스럽게 말하면 다듬어진 텍스트가 현재 사용 중인 데스크톱 앱에 바로 입력됩니다 — 로컬 STT와 원하는 LLM으로 구동됩니다.

[![Version](https://img.shields.io/badge/version-0.1.7-blue)](https://github.com/lovemage/vovoci/releases)
[![License](https://img.shields.io/badge/license-Apache%202.0-green)](./LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-4C8BF5)](https://github.com/lovemage/vovoci)
[![Downloads](https://img.shields.io/github/downloads/lovemage/vovoci/total)](https://github.com/lovemage/vovoci/releases)

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

| 💰 API 비용 선택 가능 | 📖 용어 스캐너 | 🪟 음성 종료 후 검토 창 |
|:---:|:---:|:---:|
| 구독료 없음. 유료 온라인 LLM API, 무료 티어 제공자, 또는 로컬 OpenAI-compatible 모델 서버를 선택할 수 있습니다. 유료 네트워크 API 연결은 필수가 아닙니다. | 내장된 프롬프트를 AI 에이전트에 복사하면, 코드베이스를 스캔하여 용어 테이블을 추출합니다. 이를 가져오면 모든 음성 입력에서 정확한 맞춤법이 적용됩니다. | 음성이 끝나면 검토 창을 띄울 수 있습니다. 왼쪽에는 원래 입력 언어의 전사문, 오른쪽에는 AI가 재구성한 의미 내용이 표시되어 붙여넣기나 복사 전에 확인할 수 있습니다. |

## v0.1.7 새로운 기능

- **플로팅 녹음 버튼** — 메인 창을 트레이로 닫고 `Show Button`을 선택한 뒤, 새 아이콘을 한 번 클릭해 녹음을 시작하고 다시 클릭해 중지·전사·Refi를 실행합니다.
- **현재 화면에서 설정 저장** — `Save Settings`는 저장 완료만 표시하며 설정 패널을 접거나 History로 이동하지 않습니다.
- **의도를 보존하는 Refi** — 질문은 질문으로, 서술문은 서술문으로 유지하고 여러 항목이 있을 때만 목록을 사용합니다.
- **3개 플랫폼 Release** — 하나의 GitHub workflow가 Windows, macOS, Linux 패키지를 생성합니다.

## 빠른 시작

### 배포 패키지

| 플랫폼 | 패키지 | Release | 사용 방법 |
|:---|:---|:---|:---|
| Windows | `VOVOCI-portable-0.1.7.zip` 또는 `VOVOCI-Setup-0.1.7.exe` | [vovoci/releases/latest](https://github.com/lovemage/vovoci/releases/latest) | ZIP 압축을 풀고 첫 실행 도구를 실행하거나 설치 프로그램을 시작합니다. |
| macOS | `VOVOCI-macOS-0.1.7-unsigned.dmg` | [vovoci/releases/latest](https://github.com/lovemage/vovoci/releases/latest) | `VOVOCI.app`을 `Applications`로 옮기고 Gatekeeper 경고 시 우클릭하여 `열기`를 선택합니다. |
| Linux x86_64 | `VOVOCI-Linux-0.1.7-x86_64.tar.gz` | [vovoci/releases/latest](https://github.com/lovemage/vovoci/releases/latest) | 압축을 풀고 `VOVOCI/VOVOCI`를 실행합니다. 데스크톱 환경에 따라 입력 보조 도구가 필요할 수 있습니다. |

### 메인테이너 릴리스 절차

로컬 변경 사항을 원격 release 와 웹사이트에 반영할 때는 다음 절차를 사용합니다.

1. source 변경 사항을 `lovemage/vovoci` 에 commit 하고 push 합니다. `site/` 와 모든 언어의 README 를 반드시 포함합니다.
2. Cloudflare Pages 가 push 된 branch 의 `site/` 에서 정적 사이트를 배포하도록 설정되어 있는지 확인하거나, Cloudflare dashboard 에서 Pages deploy 를 수동으로 실행합니다.
3. 일치하는 version tag(예: `v0.1.7`)를 push하거나 `release` workflow를 `release_version=0.1.7`로 수동 실행합니다.
4. Workflow는 `APP_VERSION` 확인, 테스트, 3개 플랫폼 빌드를 수행하고 `lovemage/vovoci` Releases에 게시합니다.
5. Windows installer/portable ZIP, macOS DMG, Linux x86_64 archive가 Release에 있는지 확인한 뒤 `https://vovoci.com`이 최신 사이트를 표시하는지 확인합니다.

### 포터블 (권장)

1. [Releases](https://github.com/lovemage/vovoci/releases/latest)에서 `VOVOCI-portable-0.1.7.zip`을 다운로드합니다
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

VOVOCI는 여섯 가지 LLM 프로바이더를 기본 지원하며 로컬 OpenAI-compatible 모델 서버도 사용할 수 있습니다 — 특정 서비스에 종속되지 않습니다.

**OpenAI Compatible** · **OpenRouter** · **Xiaomi MiMo** · **Google Gemini** · **NVIDIA NIM** *(무료 티어)* · **Local Model**

> 자체 로컬 대형 모델 서버가 있다면 Local Model을 선택하고 API Base URL, 모델 이름, 서버가 요구하는 경우에만 API Key를 입력하세요. 이를 통해 유료 온라인 API를 강제하지 않고 로컬 모델을 사용할 수 있습니다.

## 앱 스크린샷

![VOVOCI App Screenshot](./docs/images/app-screenshot.png)

<div align="center">

🌐 [웹사이트](https://vovoci.com) · 📄 [Apache 2.0 라이선스](./LICENSE)

</div>
