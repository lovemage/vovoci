/* ============================================================
   VOVOCI i18n — Multi-language support
   Languages: en, zh-TW, ko, ja, th
   ============================================================ */

const translations = {
  en: {
    // Nav
    "nav.how": "How It Works",
    "nav.features": "Features",
    "nav.providers": "Providers",
    "nav.model": "Model Performance",
    "nav.cost": "Cost",
    "nav.translation": "Translation",
    "nav.quickstart": "Quick Start",
    "nav.faq": "FAQ",
    "nav.github": "GitHub",

    // Hero
    "hero.title": "Your Structured Secretary for<br>Vibecoding and Real Conversation.",
    "hero.sub": "VOVOCI is built for fast idea-to-text workflows: coding thoughts, daily notes, social media drafts, and everyday chat. Speak naturally, let VOVOCI structure your meaning, then send clean output to the app you're already using.",
    "hero.small": "One voice workflow. Many scenarios. Works across Windows software.",
    "hero.download": "Download Portable ZIP",
    "hero.github": "View on GitHub",

    // How It Works
    "how.title": "How It Works",
    "how.intro": "VOVOCI is a structured voice workflow: set up once, then speak and ship clean text for vibecoding, conversation, notes, and content creation.",
    "how.phase1": "Phase 1",
    "how.phase1Name": "One-Time Setup",
    "how.installTitle": "Install VOVOCI",
    "how.installDesc": "Download and run the app. No account required, no sign-up forms, no telemetry.",
    "how.connectTitle": "Connect an LLM",
    "how.connectDesc": "Pick any supported provider and add your API key. Start with NVIDIA NIM for free access.",
    "how.phase2": "Phase 2",
    "how.phase2Name": "Daily Use",
    "how.speakTitle": "Speak",
    "how.speakDesc": "Hold your hotkey and talk naturally — coding thoughts, personal notes, social copy ideas, or plain conversation.",
    "how.transcribeTitle": "Transcribe",
    "how.transcribeDesc": "faster-whisper converts your speech to text on your machine. Nothing leaves your computer.",
    "how.refineTitle": "Refine",
    "how.refineDesc": "Your LLM fixes grammar, smooths phrasing, and preserves your original meaning.",
    "how.outputTitle": "Output",
    "how.outputDesc": "Structured text appears in your active app, ready to use in any Windows software.",
    "how.nvidiaCallout": "<strong>We recommend NVIDIA NIM for getting started.</strong> Their free API tier gives you access to capable models at no cost — no credit card needed.",

    // Features
    "feat.title": "Use Cases & Features",
    "feat.vibecodeTitle": "Built for Vibecoding",
    "feat.vibecodeDesc": "Capture implementation ideas, architecture notes, and quick TODO logic by voice, then drop structured text straight into your coding workflow.",
    "feat.notesTitle": "Voice Notes",
    "feat.notesDesc": "Turn fragmented speech into clean notes for planning, journaling, meetings, and daily thought capture without breaking your flow.",
    "feat.socialTitle": "Social Media Drafting",
    "feat.socialDesc": "Speak rough ideas for posts and captions, then get structured, publish-ready drafts you can quickly review and post.",
    "feat.chatTitle": "Everyday Conversation",
    "feat.chatDesc": "Use VOVOCI as your language-structuring secretary for daily communication: clearer replies, cleaner messages, and faster writing.",
    "feat.windowsTitle": "Works in Any Windows App",
    "feat.windowsDesc": "From IDEs to docs, chat tools, browsers, and forms — VOVOCI can output directly where your cursor is.",
    "feat.sttTitle": "Local STT + Your LLM Choice",
    "feat.sttDesc": "Keep speech transcription local with faster-whisper, then choose your preferred LLM provider for final semantic structuring.",
    "feat.vocabTitle": "Custom Vocabulary",
    "feat.vocabDesc": "Keep technical terms, product names, and preferred wording consistent across coding, conversation, and content writing.",

    // Term Scanner
    "scan.title": "Term Scanner",
    "scan.intro": "Your AI agent already knows your codebase. VOVOCI gives it a prompt — it gives you back a vocabulary table. Import it, and every voice dictation uses the right spelling automatically.",
    "scan.copyTitle": "Copy the Prompt",
    "scan.copyDesc": "VOVOCI includes a built-in prompt inside the Term Scanner tab. One click copies it to your clipboard.",
    "scan.pasteTitle": "Paste into Your AI Agent",
    "scan.pasteDesc": "Feed the prompt to Claude, ChatGPT, Gemini, or any AI assistant. It analyzes your environment — tools, frameworks, APIs, domain jargon — and outputs a Markdown vocabulary table.",
    "scan.importTitle": "Import & Done",
    "scan.importDesc": "Save the agent's output as a <code>.md</code> file, open it in VOVOCI's scanner, and import. Every term is now applied to future voice refinements — no manual entry needed.",
    "scan.promptTag": "Built-in Prompt (preview)",
    "scan.promptNote": "The full prompt includes instructions for tool names, API services, domain jargon, project-specific proper nouns, and terms a speech-to-text engine might misrecognize.",

    // Providers
    "prov.title": "Providers",
    "prov.intro": "VOVOCI works with five LLM providers out of the box. Each connects through a standard API — you're never locked into a single vendor.",
    "prov.freeTier": "Free tier",

    // Model Performance
    "model.title": "Model Performance (Speed & Latency Focus)",
    "model.intro": "Prioritize lower first-token latency and faster token throughput for real-time voice structuring. Data below is based on provider benchmarks and public evaluations.",
    "model.thModel": "Model",
    "model.thSpeed": "Speed (ms/token)",
    "model.thLatency": "Latency (ms)",
    "model.thUseCase": "Best Use Case",
    "model.geminiUse": "Default choice for fast mixed-language structuring",
    "model.gptUse": "Balanced cost/perf for real-time assistant output",
    "model.qwenUse": "Coding-oriented structuring and command rewrites",
    "model.nemotronUse": "Low-latency multilingual structure polishing",
    "model.mistralUse": "Higher quality long responses when latency is less critical",
    "model.grokUse": "Ultra-fast reasoning with strong multilingual structuring",
    "model.interpTitle": "Quick Interpretation",
    "model.interpDesc": "If your priority is instant interaction, choose lower latency models first, then optimize for ms/token. For most VOVOCI users, Gemini 2.5 Flash or NVIDIA gpt-oss-20b offers the strongest real-time experience.",
    "model.refTitle": "References",

    // Cost
    "cost.title": "What Does It Actually Cost?",
    "cost.intro": "Voice-to-text tools charge monthly subscriptions. VOVOCI is free — you only pay for the LLM API tokens you actually use. Here's what heavy daily usage looks like with OpenRouter.",
    "cost.chartYTitle": "Cost / Month (USD)",
    "cost.chartXTitle": "Speed (ms / token) — lower is faster",
    "cost.chartRef": "← $3/mo",
    "cost.modelTag": "x-ai/grok-4.1-fast via OpenRouter",
    "cost.period": "/ month",
    "cost.desc": "Based on ~60 voice refinements per day, every day, for a full month. That's roughly 1,800 API calls — enough for power users who dictate constantly through their workday.",
    "cost.labelTokens": "Avg. tokens per call",
    "cost.valueTokens": "~280 (input + output)",
    "cost.labelMonthly": "Monthly tokens",
    "cost.valueMonthly": "~504,000",
    "cost.labelLatency": "First-token latency",
    "cost.valueLatency": "~200–500 ms",
    "cost.labelLicense": "VOVOCI license",
    "cost.valueLicense": "Free, forever",
    "cost.note": "Prices based on OpenRouter's published per-token rates. Actual costs vary by prompt length and output complexity. No markup from VOVOCI.",

    // Translation Mode
    "trans.title": "Dual-Hotkey Translation",
    "trans.intro": "Assign a second hotkey dedicated to translation. Press it instead of the regular dictation hotkey, and VOVOCI translates your speech into your configured target language automatically.",
    "trans.setupTitle": "Set up your translation hotkey",
    "trans.setupDesc": "Go to Settings and assign a <strong>second hotkey</strong> for translation mode — separate from your regular dictation hotkey.",
    "trans.speakTitle": "Hold the translation hotkey and speak",
    "trans.speakDesc": "Press and hold the translation hotkey, then speak naturally in any language or mixed-language format.",
    "trans.outputTitle": "Get translated, structured output",
    "trans.outputDesc": "VOVOCI automatically translates and structures the result into your configured target language, ready for immediate use in any app.",

    // Quick Start
    "qs.title": "Quick Start",
    "qs.cloneTitle": "Clone and set up",
    "qs.depsTitle": "Install dependencies",
    "qs.runTitle": "Run",
    "qs.note": "Portable ZIP users: run <code>Run-VOVOCI-First-Time.cmd</code> first. STT models are downloaded automatically on first use (internet required once), then cached locally for offline reuse.",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.q1": "Is VOVOCI free?",
    "faq.a1": "Completely. The app is open source under the Apache 2.0 license. No paid tiers, no feature gates, no usage limits on the app itself. LLM API costs depend on the provider you choose — but several offer generous free tiers.",
    "faq.q2": "Do I need an internet connection?",
    "faq.a2": "For speech-to-text, no. Transcription runs locally. You do need internet for LLM refinement, since that calls your chosen provider's API. Skip refinement and VOVOCI works fully offline.",
    "faq.q3": "What languages does it support?",
    "faq.a3": "Any language faster-whisper can transcribe — dozens including English, Chinese, Japanese, Spanish, French, German, Korean, and more. Set a primary and secondary language for mixed-language dictation.",
    "faq.q4": "Do I need a GPU?",
    "faq.a4": "No, but it helps. faster-whisper runs on CPU fine, especially with smaller models. A CUDA-compatible GPU speeds up transcription if you're using larger models.",
    "faq.q5": "Will the LLM API cost me money?",
    "faq.a5": "Depends on the provider. NVIDIA NIM offers free-tier endpoints. OpenRouter has pay-per-token with low-cost options. Google Gemini has a free tier. VOVOCI doesn't add any fees on top.",
    "faq.q6": "Does it work on macOS or Linux?",
    "faq.a6": "Not today. VOVOCI relies on Windows-specific APIs for hotkey hooks, window detection, and auto-paste. The project is open source — contributions are welcome.",

    // Footer
    "footer.desc": "Built by oceanads.org — open source, no strings attached.",
    "footer.license": "Apache 2.0",

    // Meta
    "meta.title": "VOVOCI — Structured Voice Secretary for Vibecoding and Everyday Conversation",
    "meta.description": "VOVOCI is a structured voice secretary built for vibecoding and daily conversation. Turn speech into clean, usable text for notes, social posts, and any Windows app.",
  },

  "zh-TW": {
    // Nav
    "nav.how": "運作原理",
    "nav.features": "功能特色",
    "nav.providers": "支援供應商",
    "nav.model": "模型效能",
    "nav.cost": "費用",
    "nav.translation": "翻譯模式",
    "nav.quickstart": "快速開始",
    "nav.faq": "常見問題",
    "nav.github": "GitHub",

    // Hero
    "hero.title": "你的結構化語音秘書，<br>專為 Vibecoding 與日常對話而生。",
    "hero.sub": "VOVOCI 為快速「想法轉文字」工作流程而設計：程式開發構思、每日筆記、社群媒體草稿、日常溝通皆適用。自然地說話，讓 VOVOCI 整理你的語意，再將乾淨的輸出傳送到你正在使用的應用程式。",
    "hero.small": "一套語音工作流程，適用多種情境，相容所有 Windows 軟體。",
    "hero.download": "下載可攜版 ZIP",
    "hero.github": "在 GitHub 查看",

    // How It Works
    "how.title": "運作原理",
    "how.intro": "VOVOCI 是一套結構化語音工作流程：一次設定完成後，只需開口說話，即可為 Vibecoding、對話、筆記和內容創作產出乾淨的文字。",
    "how.phase1": "第一階段",
    "how.phase1Name": "一次性設定",
    "how.installTitle": "安裝 VOVOCI",
    "how.installDesc": "下載並執行應用程式。無需帳號、無需填寫表單、無遙測資料收集。",
    "how.connectTitle": "連接 LLM",
    "how.connectDesc": "選擇任一支援的供應商並輸入 API 金鑰。建議從 NVIDIA NIM 開始，免費使用。",
    "how.phase2": "第二階段",
    "how.phase2Name": "日常使用",
    "how.speakTitle": "說話",
    "how.speakDesc": "按住快捷鍵，自然地說話——程式開發構思、個人筆記、社群內容靈感或日常對話皆可。",
    "how.transcribeTitle": "語音轉文字",
    "how.transcribeDesc": "faster-whisper 在本機將你的語音轉換為文字，資料完全不離開你的電腦。",
    "how.refineTitle": "精煉潤飾",
    "how.refineDesc": "LLM 修正語法、平順措辭，同時保留你原始的表達意圖。",
    "how.outputTitle": "輸出",
    "how.outputDesc": "結構化文字會出現在你目前使用的應用程式中，可直接用於任何 Windows 軟體。",
    "how.nvidiaCallout": "<strong>我們建議從 NVIDIA NIM 開始使用。</strong>其免費 API 方案提供強大模型的存取權限，完全不需要信用卡。",

    // Features
    "feat.title": "使用情境與功能特色",
    "feat.vibecodeTitle": "專為 Vibecoding 打造",
    "feat.vibecodeDesc": "透過語音捕捉實作構思、架構筆記和快速 TODO 邏輯，再將結構化文字直接傳入你的程式開發工作流程。",
    "feat.notesTitle": "語音筆記",
    "feat.notesDesc": "將零散的語音轉化為整齊的筆記，適用於規劃、日記、會議記錄和日常想法捕捉，不打斷你的節奏。",
    "feat.socialTitle": "社群媒體草稿",
    "feat.socialDesc": "口說貼文和說明文字的粗略想法，獲得結構完整、可直接發佈的草稿，快速審閱後即可發文。",
    "feat.chatTitle": "日常對話",
    "feat.chatDesc": "將 VOVOCI 作為日常溝通的語言整理秘書：回覆更清晰、訊息更乾淨、寫作更快速。",
    "feat.windowsTitle": "適用所有 Windows 應用程式",
    "feat.windowsDesc": "從 IDE 到文件、聊天工具、瀏覽器和表單——VOVOCI 可以直接輸出到游標所在位置。",
    "feat.sttTitle": "本地 STT + 自選 LLM",
    "feat.sttDesc": "使用 faster-whisper 在本機進行語音轉文字，再選擇你偏好的 LLM 供應商進行最終語義結構化。",
    "feat.vocabTitle": "自訂詞彙表",
    "feat.vocabDesc": "在程式開發、對話和內容寫作中，保持專業術語、產品名稱和偏好用詞的一致性。",

    // Term Scanner
    "scan.title": "詞彙掃描器",
    "scan.intro": "你的 AI 代理已熟悉你的程式碼庫。VOVOCI 提供一個提示詞——AI 回傳詞彙表，匯入後每次語音聽寫都會自動使用正確拼寫。",
    "scan.copyTitle": "複製提示詞",
    "scan.copyDesc": "VOVOCI 的詞彙掃描器分頁內建了提示詞。一鍵即可複製到剪貼簿。",
    "scan.pasteTitle": "貼入你的 AI 代理",
    "scan.pasteDesc": "將提示詞貼給 Claude、ChatGPT、Gemini 或任何 AI 助理。它會分析你的環境——工具、框架、API、領域術語——並輸出 Markdown 詞彙表。",
    "scan.importTitle": "匯入完成",
    "scan.importDesc": "將代理的輸出儲存為 <code>.md</code> 檔案，在 VOVOCI 的掃描器中開啟並匯入。所有術語即刻套用至後續的語音精煉——無需手動輸入。",
    "scan.promptTag": "內建提示詞（預覽）",
    "scan.promptNote": "完整提示詞包含工具名稱、API 服務、領域術語、專案專有名詞，以及語音轉文字引擎可能誤辨的詞彙的處理說明。",

    // Providers
    "prov.title": "支援供應商",
    "prov.intro": "VOVOCI 內建支援五大 LLM 供應商，每家均透過標準 API 連接——你永遠不會被綁定在單一廠商。",
    "prov.freeTier": "免費方案",

    // Model Performance
    "model.title": "模型效能（速度與延遲重點評估）",
    "model.intro": "為即時語音結構化，優先考慮較低的首 token 延遲和更快的 token 吞吐量。以下資料來自供應商基準測試和公開評估。",
    "model.thModel": "模型",
    "model.thSpeed": "速度（毫秒/token）",
    "model.thLatency": "延遲（毫秒）",
    "model.thUseCase": "最佳使用情境",
    "model.geminiUse": "快速混合語言結構化的預設首選",
    "model.gptUse": "即時助理輸出的成本效能平衡之選",
    "model.qwenUse": "程式開發導向的結構化與指令改寫",
    "model.nemotronUse": "低延遲多語言結構潤飾",
    "model.mistralUse": "延遲較不敏感時的高品質長回覆",
    "model.grokUse": "超快推理與強大多語言結構化能力",
    "model.interpTitle": "快速解讀",
    "model.interpDesc": "如果你優先考量即時互動，先選擇低延遲模型，再針對毫秒/token 進行優化。對多數 VOVOCI 使用者而言，Gemini 2.5 Flash 或 NVIDIA gpt-oss-20b 提供最強的即時體驗。",
    "model.refTitle": "參考資料",

    // Cost
    "cost.title": "實際費用是多少？",
    "cost.intro": "語音轉文字工具收取月費訂閱。VOVOCI 免費——你只需支付實際使用的 LLM API token 費用。以下是透過 OpenRouter 進行大量日常使用的費用估算。",
    "cost.chartYTitle": "月費用（美元）",
    "cost.chartXTitle": "速度（毫秒/token）— 數值越低越快",
    "cost.chartRef": "← $3/月",
    "cost.modelTag": "x-ai/grok-4.1-fast 透過 OpenRouter",
    "cost.period": "/ 月",
    "cost.desc": "以每天 ~60 次語音精煉、每天使用、整整一個月為基準，約 1,800 次 API 呼叫——足夠在整個工作日持續聽寫的重度使用者。",
    "cost.labelTokens": "每次呼叫平均 token 數",
    "cost.valueTokens": "~280（輸入 + 輸出）",
    "cost.labelMonthly": "每月 token 總量",
    "cost.valueMonthly": "~504,000",
    "cost.labelLatency": "首 token 延遲",
    "cost.valueLatency": "~200–500 毫秒",
    "cost.labelLicense": "VOVOCI 授權",
    "cost.valueLicense": "永久免費",
    "cost.note": "價格依據 OpenRouter 公布的每 token 費率。實際費用因提示詞長度和輸出複雜度而異。VOVOCI 不收取任何額外費用。",

    // Translation Mode
    "trans.title": "雙快捷鍵翻譯模式",
    "trans.intro": "指定一個專用於翻譯的第二快捷鍵。按下此鍵而非一般聽寫快捷鍵，VOVOCI 即自動將你的語音翻譯為設定的目標語言。",
    "trans.setupTitle": "設定翻譯快捷鍵",
    "trans.setupDesc": "進入設定，為翻譯模式指定一個<strong>第二快捷鍵</strong>——與一般聽寫快捷鍵分開設定。",
    "trans.speakTitle": "按住翻譯快捷鍵並說話",
    "trans.speakDesc": "按住翻譯快捷鍵，然後以任何語言或混合語言格式自然說話。",
    "trans.outputTitle": "獲得翻譯後的結構化輸出",
    "trans.outputDesc": "VOVOCI 自動翻譯並將結果結構化為你設定的目標語言，可立即在任何應用程式中使用。",

    // Quick Start
    "qs.title": "快速開始",
    "qs.cloneTitle": "複製並設定",
    "qs.depsTitle": "安裝相依套件",
    "qs.runTitle": "執行",
    "qs.note": "可攜版 ZIP 使用者：首次請先執行 <code>Run-VOVOCI-First-Time.cmd</code>。STT 模型會在第一次使用時自動下載（需一次網路），之後會快取於本機供離線重複使用。",

    // FAQ
    "faq.title": "常見問題",
    "faq.q1": "VOVOCI 是免費的嗎？",
    "faq.a1": "完全免費。本應用程式以 Apache 2.0 授權開源發布，無付費方案、無功能限制、應用程式本身無使用量限制。LLM API 費用取決於你選擇的供應商——但多家提供慷慨的免費方案。",
    "faq.q2": "需要網路連線嗎？",
    "faq.a2": "語音轉文字不需要。語音辨識在本機執行。LLM 精煉需要網路，因為這會呼叫你選擇的供應商 API。跳過精煉步驟，VOVOCI 即可完全離線使用。",
    "faq.q3": "支援哪些語言？",
    "faq.a3": "任何 faster-whisper 能辨識的語言——包括英文、中文、日文、西班牙文、法文、德文、韓文等數十種語言。可設定主要和次要語言以支援混合語言聽寫。",
    "faq.q4": "需要 GPU 嗎？",
    "faq.a4": "不需要，但有 GPU 更好。faster-whisper 在 CPU 上也能正常運行，尤其使用較小的模型時。若使用較大模型，CUDA 相容的 GPU 可加速語音辨識。",
    "faq.q5": "LLM API 會產生費用嗎？",
    "faq.a5": "取決於供應商。NVIDIA NIM 提供免費端點。OpenRouter 採按 token 計費，有低成本選項。Google Gemini 有免費方案。VOVOCI 不收取任何額外費用。",
    "faq.q6": "支援 macOS 或 Linux 嗎？",
    "faq.a6": "目前不支援。VOVOCI 依賴 Windows 專用 API 進行快捷鍵鉤取、視窗偵測和自動貼上。本專案為開源——歡迎貢獻。",

    // Footer
    "footer.desc": "由 oceanads.org 打造——開源，無附帶條件。",
    "footer.license": "Apache 2.0",

    // Meta
    "meta.title": "VOVOCI — 專為 Vibecoding 與日常對話打造的結構化語音秘書",
    "meta.description": "VOVOCI 是專為 Vibecoding 與日常對話設計的結構化語音秘書。將語音轉化為筆記、社群貼文及任何 Windows 應用程式可用的乾淨文字。",
  },

  ko: {
    // Nav
    "nav.how": "작동 방식",
    "nav.features": "기능",
    "nav.providers": "제공업체",
    "nav.model": "모델 성능",
    "nav.cost": "비용",
    "nav.translation": "번역 모드",
    "nav.quickstart": "빠른 시작",
    "nav.faq": "자주 묻는 질문",
    "nav.github": "GitHub",

    // Hero
    "hero.title": "바이브코딩과 일상 대화를 위한<br>구조화된 음성 비서.",
    "hero.sub": "VOVOCI는 빠른 아이디어-텍스트 변환 워크플로를 위해 설계되었습니다: 코딩 구상, 일일 메모, 소셜 미디어 초안, 일상 대화까지. 자연스럽게 말하면 VOVOCI가 의미를 구조화하여 현재 사용 중인 앱으로 깔끔한 결과물을 전달합니다.",
    "hero.small": "하나의 음성 워크플로. 다양한 시나리오. 모든 Windows 소프트웨어에서 작동합니다.",
    "hero.download": "포터블 ZIP 다운로드",
    "hero.github": "GitHub에서 보기",

    // How It Works
    "how.title": "작동 방식",
    "how.intro": "VOVOCI는 구조화된 음성 워크플로입니다: 한 번 설정하면 바이브코딩, 대화, 메모, 콘텐츠 제작을 위한 깔끔한 텍스트를 말하고 바로 사용할 수 있습니다.",
    "how.phase1": "1단계",
    "how.phase1Name": "최초 설정",
    "how.installTitle": "VOVOCI 설치",
    "how.installDesc": "앱을 다운로드하고 실행하세요. 계정 불필요, 가입 양식 없음, 원격 측정 없음.",
    "how.connectTitle": "LLM 연결",
    "how.connectDesc": "지원되는 제공업체를 선택하고 API 키를 입력하세요. 무료 이용을 위해 NVIDIA NIM으로 시작하세요.",
    "how.phase2": "2단계",
    "how.phase2Name": "일상 사용",
    "how.speakTitle": "말하기",
    "how.speakDesc": "단축키를 누르고 자연스럽게 말하세요 — 코딩 구상, 개인 메모, 소셜 콘텐츠 아이디어, 또는 일반 대화.",
    "how.transcribeTitle": "변환",
    "how.transcribeDesc": "faster-whisper가 로컬 컴퓨터에서 음성을 텍스트로 변환합니다. 어떤 데이터도 외부로 전송되지 않습니다.",
    "how.refineTitle": "정제",
    "how.refineDesc": "LLM이 문법을 교정하고 표현을 매끄럽게 하면서 원래의 의미를 보존합니다.",
    "how.outputTitle": "출력",
    "how.outputDesc": "구조화된 텍스트가 현재 활성화된 앱에 나타나 모든 Windows 소프트웨어에서 바로 사용 가능합니다.",
    "how.nvidiaCallout": "<strong>시작을 위해 NVIDIA NIM을 추천합니다.</strong> 무료 API 티어로 신용카드 없이 강력한 모델에 접근할 수 있습니다.",

    // Features
    "feat.title": "사용 사례 및 기능",
    "feat.vibecodeTitle": "바이브코딩을 위해 설계됨",
    "feat.vibecodeDesc": "구현 아이디어, 아키텍처 메모, 빠른 TODO 로직을 음성으로 캡처하고 구조화된 텍스트를 코딩 워크플로에 바로 적용하세요.",
    "feat.notesTitle": "음성 메모",
    "feat.notesDesc": "단편적인 말을 계획, 일기 작성, 회의, 일상적인 생각 기록을 위한 깔끔한 메모로 변환하세요. 흐름을 끊지 않고도 가능합니다.",
    "feat.socialTitle": "소셜 미디어 초안 작성",
    "feat.socialDesc": "게시물과 캡션에 대한 거친 아이디어를 말하면 구조화된 발행 준비 초안을 얻어 빠르게 검토하고 게시하세요.",
    "feat.chatTitle": "일상 대화",
    "feat.chatDesc": "VOVOCI를 일상 소통의 언어 구조화 비서로 활용하세요: 더 명확한 답변, 더 깔끔한 메시지, 더 빠른 작성.",
    "feat.windowsTitle": "모든 Windows 앱에서 작동",
    "feat.windowsDesc": "IDE부터 문서, 채팅 도구, 브라우저, 양식까지 — VOVOCI가 커서가 있는 곳에 직접 출력할 수 있습니다.",
    "feat.sttTitle": "로컬 STT + 원하는 LLM 선택",
    "feat.sttDesc": "faster-whisper로 로컬에서 음성 변환을 처리하고, 최종 의미 구조화를 위해 선호하는 LLM 제공업체를 선택하세요.",
    "feat.vocabTitle": "맞춤 어휘",
    "feat.vocabDesc": "코딩, 대화, 콘텐츠 작성 전반에서 기술 용어, 제품명, 선호 표현의 일관성을 유지하세요.",

    // Term Scanner
    "scan.title": "용어 스캐너",
    "scan.intro": "AI 에이전트는 이미 코드베이스를 알고 있습니다. VOVOCI가 프롬프트를 제공하면 — AI가 어휘 표를 반환합니다. 가져오기 하면 모든 음성 받아쓰기에서 올바른 철자가 자동으로 사용됩니다.",
    "scan.copyTitle": "프롬프트 복사",
    "scan.copyDesc": "VOVOCI에는 용어 스캐너 탭에 내장 프롬프트가 포함되어 있습니다. 한 번의 클릭으로 클립보드에 복사됩니다.",
    "scan.pasteTitle": "AI 에이전트에 붙여넣기",
    "scan.pasteDesc": "Claude, ChatGPT, Gemini 또는 모든 AI 어시스턴트에 프롬프트를 제공하세요. 환경 — 도구, 프레임워크, API, 도메인 전문 용어 — 를 분석하여 Markdown 어휘 표를 출력합니다.",
    "scan.importTitle": "가져오기 완료",
    "scan.importDesc": "에이전트 출력을 <code>.md</code> 파일로 저장하고, VOVOCI 스캐너에서 열어 가져오기 하세요. 이제 모든 용어가 향후 음성 정제에 적용됩니다 — 수동 입력 불필요.",
    "scan.promptTag": "내장 프롬프트 (미리보기)",
    "scan.promptNote": "전체 프롬프트에는 도구 이름, API 서비스, 도메인 전문 용어, 프로젝트별 고유명사, 음성-텍스트 엔진이 잘못 인식할 수 있는 용어에 대한 지침이 포함됩니다.",

    // Providers
    "prov.title": "제공업체",
    "prov.intro": "VOVOCI는 기본적으로 5개의 LLM 제공업체와 작동합니다. 각각 표준 API를 통해 연결됩니다 — 단일 벤더에 종속되지 않습니다.",
    "prov.freeTier": "무료 티어",

    // Model Performance
    "model.title": "모델 성능 (속도 및 지연 시간 중심)",
    "model.intro": "실시간 음성 구조화를 위해 낮은 첫 번째 토큰 지연 시간과 빠른 토큰 처리량을 우선시하세요. 아래 데이터는 제공업체 벤치마크와 공개 평가를 기반으로 합니다.",
    "model.thModel": "모델",
    "model.thSpeed": "속도 (ms/토큰)",
    "model.thLatency": "지연 시간 (ms)",
    "model.thUseCase": "최적 사용 사례",
    "model.geminiUse": "빠른 혼합 언어 구조화를 위한 기본 선택",
    "model.gptUse": "실시간 어시스턴트 출력을 위한 비용/성능 균형",
    "model.qwenUse": "코딩 지향 구조화 및 명령어 재작성",
    "model.nemotronUse": "저지연 다국어 구조 다듬기",
    "model.mistralUse": "지연 시간이 덜 중요할 때 고품질 긴 응답",
    "model.grokUse": "강력한 다국어 구조화를 갖춘 초고속 추론",
    "model.interpTitle": "빠른 해석",
    "model.interpDesc": "즉각적인 상호작용이 우선이라면 지연 시간이 낮은 모델을 먼저 선택하고 ms/토큰을 최적화하세요. 대부분의 VOVOCI 사용자에게는 Gemini 2.5 Flash 또는 NVIDIA gpt-oss-20b가 가장 강력한 실시간 경험을 제공합니다.",
    "model.refTitle": "참고 자료",

    // Cost
    "cost.title": "실제 비용은 얼마인가요?",
    "cost.intro": "음성-텍스트 도구는 월 구독료를 청구합니다. VOVOCI는 무료 — 실제 사용한 LLM API 토큰 비용만 지불하면 됩니다. OpenRouter를 통한 하루 집중 사용 시 예상 비용입니다.",
    "cost.chartYTitle": "월 비용 (USD)",
    "cost.chartXTitle": "속도 (ms / 토큰) — 낮을수록 빠름",
    "cost.chartRef": "← $3/월",
    "cost.modelTag": "x-ai/grok-4.1-fast via OpenRouter",
    "cost.period": "/ 월",
    "cost.desc": "하루 ~60회 음성 정제, 매일, 한 달 전체 기준. 약 1,800회 API 호출 — 하루 종일 지속적으로 받아쓰기하는 파워 유저에게 충분한 양입니다.",
    "cost.labelTokens": "호출당 평균 토큰",
    "cost.valueTokens": "~280 (입력 + 출력)",
    "cost.labelMonthly": "월간 토큰",
    "cost.valueMonthly": "~504,000",
    "cost.labelLatency": "첫 번째 토큰 지연",
    "cost.valueLatency": "~200–500 ms",
    "cost.labelLicense": "VOVOCI 라이선스",
    "cost.valueLicense": "영구 무료",
    "cost.note": "가격은 OpenRouter의 공개된 토큰당 요금을 기반으로 합니다. 실제 비용은 프롬프트 길이와 출력 복잡도에 따라 다릅니다. VOVOCI에서 추가 비용은 없습니다.",

    // Translation Mode
    "trans.title": "이중 단축키 번역 모드",
    "trans.intro": "번역 전용 두 번째 단축키를 지정하세요. 일반 받아쓰기 단축키 대신 이 키를 누르면 VOVOCI가 음성을 설정된 목표 언어로 자동 번역합니다.",
    "trans.setupTitle": "번역 단축키 설정",
    "trans.setupDesc": "설정으로 이동하여 번역 모드를 위한 <strong>두 번째 단축키</strong>를 지정하세요 — 일반 받아쓰기 단축키와 별개로.",
    "trans.speakTitle": "번역 단축키를 누르고 말하기",
    "trans.speakDesc": "번역 단축키를 누른 채로 어떤 언어나 혼합 언어 형식으로 자연스럽게 말하세요.",
    "trans.outputTitle": "번역된 구조화 출력 받기",
    "trans.outputDesc": "VOVOCI가 설정된 목표 언어로 결과를 자동으로 번역하고 구조화하여 모든 앱에서 즉시 사용할 수 있습니다.",

    // Quick Start
    "qs.title": "빠른 시작",
    "qs.cloneTitle": "클론 및 설정",
    "qs.depsTitle": "의존성 설치",
    "qs.runTitle": "실행",
    "qs.note": "포터블 ZIP 사용자는 처음에 <code>Run-VOVOCI-First-Time.cmd</code>를 먼저 실행하세요. STT 모델은 첫 사용 시 자동 다운로드되며(인터넷 1회 필요), 이후에는 로컬 캐시로 오프라인 재사용됩니다.",

    // FAQ
    "faq.title": "자주 묻는 질문",
    "faq.q1": "VOVOCI는 무료인가요?",
    "faq.a1": "완전히 무료입니다. 앱은 Apache 2.0 라이선스 하에 오픈 소스로 제공됩니다. 유료 티어, 기능 제한, 앱 자체의 사용량 제한이 없습니다. LLM API 비용은 선택한 제공업체에 따라 다르지만 — 여러 곳에서 넉넉한 무료 티어를 제공합니다.",
    "faq.q2": "인터넷 연결이 필요한가요?",
    "faq.a2": "음성-텍스트 변환에는 필요하지 않습니다. 변환은 로컬에서 실행됩니다. LLM 정제에는 인터넷이 필요합니다 — 선택한 제공업체의 API를 호출하기 때문입니다. 정제를 건너뛰면 VOVOCI가 완전 오프라인으로 작동합니다.",
    "faq.q3": "어떤 언어를 지원하나요?",
    "faq.a3": "faster-whisper가 변환할 수 있는 모든 언어 — 영어, 중국어, 일본어, 스페인어, 프랑스어, 독일어, 한국어 등 수십 개 언어가 포함됩니다. 혼합 언어 받아쓰기를 위해 기본 및 보조 언어를 설정하세요.",
    "faq.q4": "GPU가 필요한가요?",
    "faq.a4": "필요하지 않지만 도움이 됩니다. faster-whisper는 CPU에서도 잘 실행됩니다, 특히 소형 모델의 경우. CUDA 호환 GPU가 있으면 대형 모델 사용 시 변환 속도가 빨라집니다.",
    "faq.q5": "LLM API 비용이 발생하나요?",
    "faq.a5": "제공업체에 따라 다릅니다. NVIDIA NIM은 무료 티어 엔드포인트를 제공합니다. OpenRouter는 저렴한 옵션의 토큰당 결제 방식입니다. Google Gemini에는 무료 티어가 있습니다. VOVOCI는 추가 수수료를 부과하지 않습니다.",
    "faq.q6": "macOS나 Linux에서 작동하나요?",
    "faq.a6": "현재는 작동하지 않습니다. VOVOCI는 단축키 훅, 창 감지, 자동 붙여넣기를 위해 Windows 전용 API에 의존합니다. 프로젝트는 오픈 소스입니다 — 기여를 환영합니다.",

    // Footer
    "footer.desc": "oceanads.org가 제작 — 오픈 소스, 아무 조건 없음.",
    "footer.license": "Apache 2.0",

    // Meta
    "meta.title": "VOVOCI — 바이브코딩과 일상 대화를 위한 구조화된 음성 비서",
    "meta.description": "VOVOCI는 바이브코딩과 일상 대화를 위한 구조화된 음성 비서입니다. 음성을 메모, 소셜 게시물, 모든 Windows 앱에서 사용 가능한 깔끔한 텍스트로 변환하세요.",
  },

  ja: {
    // Nav
    "nav.how": "仕組み",
    "nav.features": "機能",
    "nav.providers": "プロバイダー",
    "nav.model": "モデル性能",
    "nav.cost": "コスト",
    "nav.translation": "翻訳モード",
    "nav.quickstart": "クイックスタート",
    "nav.faq": "よくある質問",
    "nav.github": "GitHub",

    // Hero
    "hero.title": "バイブコーディングと日常会話のための<br>構造化された音声秘書。",
    "hero.sub": "VOVOCIは、アイデアをテキストに変換する高速ワークフロー向けに設計されています：コーディングの構想、日々のメモ、SNS投稿の下書き、日常会話まで。自然に話すだけで、VOVOCIが意味を構造化し、使用中のアプリに整ったテキストを送ります。",
    "hero.small": "ひとつの音声ワークフロー。多様なシナリオ。Windowsソフトウェア全般で動作します。",
    "hero.download": "ポータブルZIPをダウンロード",
    "hero.github": "GitHubで見る",

    // How It Works
    "how.title": "仕組み",
    "how.intro": "VOVOCIは構造化された音声ワークフローです：一度設定すれば、バイブコーディング、会話、メモ、コンテンツ制作のためのクリーンなテキストをすぐに使えます。",
    "how.phase1": "フェーズ1",
    "how.phase1Name": "初回セットアップ",
    "how.installTitle": "VOVOCIをインストール",
    "how.installDesc": "アプリをダウンロードして実行するだけです。アカウント不要、フォーム入力なし、テレメトリーなし。",
    "how.connectTitle": "LLMを接続",
    "how.connectDesc": "対応プロバイダーを選択してAPIキーを入力してください。無料利用にはNVIDIA NIMから始めることをお勧めします。",
    "how.phase2": "フェーズ2",
    "how.phase2Name": "日常利用",
    "how.speakTitle": "話す",
    "how.speakDesc": "ホットキーを押しながら自然に話してください — コーディングの構想、個人メモ、SNSコンテンツのアイデア、または日常会話。",
    "how.transcribeTitle": "文字起こし",
    "how.transcribeDesc": "faster-whisperがローカルマシンで音声をテキストに変換します。データは一切外部に送信されません。",
    "how.refineTitle": "洗練",
    "how.refineDesc": "LLMが文法を修正し、表現を滑らかにしながら、あなたの元の意図を保持します。",
    "how.outputTitle": "出力",
    "how.outputDesc": "構造化されたテキストがアクティブなアプリに表示され、あらゆるWindowsソフトウェアですぐに使用できます。",
    "how.nvidiaCallout": "<strong>はじめにNVIDIA NIMをお勧めします。</strong>無料のAPIティアで、クレジットカード不要で高性能なモデルにアクセスできます。",

    // Features
    "feat.title": "ユースケースと機能",
    "feat.vibecodeTitle": "バイブコーディングのために設計",
    "feat.vibecodeDesc": "実装アイデア、アーキテクチャメモ、クイックTODOロジックを音声でキャプチャし、構造化されたテキストをコーディングワークフローに直接投入できます。",
    "feat.notesTitle": "音声メモ",
    "feat.notesDesc": "断片的な発話を、計画立案、日記、会議、日常的な思考記録のためのクリーンなメモに変換します。集中力を途切れさせることなく。",
    "feat.socialTitle": "SNS投稿の下書き",
    "feat.socialDesc": "投稿やキャプションのラフなアイデアを話すだけで、すぐに確認して投稿できる構造化された下書きが得られます。",
    "feat.chatTitle": "日常会話",
    "feat.chatDesc": "VOVOCIを日常コミュニケーションの言語構造化秘書として活用しましょう：より明確な返信、より整ったメッセージ、より速い作文。",
    "feat.windowsTitle": "あらゆるWindowsアプリで動作",
    "feat.windowsDesc": "IDEからドキュメント、チャットツール、ブラウザ、フォームまで — VOVOCIはカーソルのある場所に直接出力できます。",
    "feat.sttTitle": "ローカルSTT + お好みのLLM",
    "feat.sttDesc": "faster-whisperでローカルの音声変換を行い、最終的な意味構造化には好みのLLMプロバイダーを選択してください。",
    "feat.vocabTitle": "カスタム語彙",
    "feat.vocabDesc": "コーディング、会話、コンテンツ制作を通じて、技術用語、製品名、好みの表現の一貫性を保ちます。",

    // Term Scanner
    "scan.title": "用語スキャナー",
    "scan.intro": "AIエージェントはすでにあなたのコードベースを知っています。VOVOCIがプロンプトを渡すと — AIが語彙表を返します。インポートすれば、すべての音声入力で正しいスペルが自動的に使用されます。",
    "scan.copyTitle": "プロンプトをコピー",
    "scan.copyDesc": "VOVOCIには、用語スキャナータブに内蔵プロンプトが含まれています。ワンクリックでクリップボードにコピーできます。",
    "scan.pasteTitle": "AIエージェントに貼り付け",
    "scan.pasteDesc": "Claude、ChatGPT、Gemini、または任意のAIアシスタントにプロンプトを渡してください。環境 — ツール、フレームワーク、API、ドメイン用語 — を分析し、Markdownの語彙表を出力します。",
    "scan.importTitle": "インポートして完了",
    "scan.importDesc": "エージェントの出力を <code>.md</code> ファイルとして保存し、VOVOCIのスキャナーで開いてインポートしてください。すべての用語が今後の音声洗練に適用されます — 手動入力は不要です。",
    "scan.promptTag": "内蔵プロンプト（プレビュー）",
    "scan.promptNote": "完全なプロンプトには、ツール名、APIサービス、ドメイン用語、プロジェクト固有の固有名詞、および音声認識エンジンが誤認識する可能性のある用語に関する指示が含まれます。",

    // Providers
    "prov.title": "プロバイダー",
    "prov.intro": "VOVOCIは5つのLLMプロバイダーをすぐに利用できます。各プロバイダーは標準APIを通じて接続されます — 単一ベンダーに縛られることはありません。",
    "prov.freeTier": "無料ティア",

    // Model Performance
    "model.title": "モデル性能（速度とレイテンシー重点）",
    "model.intro": "リアルタイム音声構造化のために、低い初回トークンレイテンシーと高速なトークンスループットを優先してください。以下のデータはプロバイダーベンチマークと公開評価に基づいています。",
    "model.thModel": "モデル",
    "model.thSpeed": "速度 (ms/トークン)",
    "model.thLatency": "レイテンシー (ms)",
    "model.thUseCase": "最適なユースケース",
    "model.geminiUse": "高速な混合言語構造化のデフォルト選択",
    "model.gptUse": "リアルタイムアシスタント出力のコスト/性能バランス",
    "model.qwenUse": "コーディング指向の構造化とコマンド書き換え",
    "model.nemotronUse": "低レイテンシーの多言語構造磨き",
    "model.mistralUse": "レイテンシーが重要でない場合の高品質な長文回答",
    "model.grokUse": "強力な多言語構造化を備えた超高速推論",
    "model.interpTitle": "クイック解釈",
    "model.interpDesc": "即時のインタラクションを優先するなら、まず低レイテンシーモデルを選び、次にms/トークンを最適化してください。ほとんどのVOVOCIユーザーには、Gemini 2.5 FlashまたはNVIDIA gpt-oss-20bが最も強力なリアルタイム体験を提供します。",
    "model.refTitle": "参考資料",

    // Cost
    "cost.title": "実際のコストはどのくらいですか？",
    "cost.intro": "音声テキスト変換ツールは月額サブスクリプションを請求します。VOVOCIは無料 — 実際に使用したLLM APIトークンの費用のみ支払います。OpenRouterを使った日常的な大量利用の例です。",
    "cost.chartYTitle": "月額コスト（USD）",
    "cost.chartXTitle": "速度（ms / トークン）— 低いほど高速",
    "cost.chartRef": "← $3/月",
    "cost.modelTag": "x-ai/grok-4.1-fast via OpenRouter",
    "cost.period": "/ 月",
    "cost.desc": "1日~60回の音声洗練、毎日、丸1ヶ月を基準とします。約1,800回のAPI呼び出し — 終日継続的に口述するパワーユーザーに十分な量です。",
    "cost.labelTokens": "1回あたり平均トークン数",
    "cost.valueTokens": "~280（入力 + 出力）",
    "cost.labelMonthly": "月間トークン数",
    "cost.valueMonthly": "~504,000",
    "cost.labelLatency": "初回トークンレイテンシー",
    "cost.valueLatency": "~200–500 ms",
    "cost.labelLicense": "VOVOCIライセンス",
    "cost.valueLicense": "永久無料",
    "cost.note": "価格はOpenRouterが公表するトークン単価に基づいています。実際のコストはプロンプトの長さと出力の複雑さによって異なります。VOVOCIからのマークアップはありません。",

    // Translation Mode
    "trans.title": "デュアルホットキー翻訳モード",
    "trans.intro": "翻訳専用の2番目のホットキーを割り当てます。通常の口述ホットキーの代わりにこれを押すと、VOVOCIが設定した目標言語に音声を自動翻訳します。",
    "trans.setupTitle": "翻訳ホットキーを設定",
    "trans.setupDesc": "設定で翻訳モード用の<strong>2番目のホットキー</strong>を割り当ててください — 通常の口述ホットキーとは別に。",
    "trans.speakTitle": "翻訳ホットキーを押しながら話す",
    "trans.speakDesc": "翻訳ホットキーを押し続けながら、任意の言語や混合言語形式で自然に話してください。",
    "trans.outputTitle": "翻訳された構造化出力を取得",
    "trans.outputDesc": "VOVOCIが設定した目標言語に結果を自動翻訳・構造化し、任意のアプリですぐに使用できる状態にします。",

    // Quick Start
    "qs.title": "クイックスタート",
    "qs.cloneTitle": "クローンとセットアップ",
    "qs.depsTitle": "依存関係のインストール",
    "qs.runTitle": "実行",
    "qs.note": "ポータブルZIP版は初回に <code>Run-VOVOCI-First-Time.cmd</code> を先に実行してください。STTモデルは初回利用時に自動ダウンロードされ（初回のみ要ネット接続）、以後はローカルキャッシュをオフライン再利用します。",

    // FAQ
    "faq.title": "よくある質問",
    "faq.q1": "VOVOCIは無料ですか？",
    "faq.a1": "完全に無料です。アプリはApache 2.0ライセンスのオープンソースです。有料ティア、機能制限、アプリ自体の使用量制限はありません。LLM APIの費用は選択したプロバイダーによって異なりますが — 多くが寛大な無料ティアを提供しています。",
    "faq.q2": "インターネット接続が必要ですか？",
    "faq.a2": "音声テキスト変換には必要ありません。変換はローカルで実行されます。LLMによる洗練にはインターネットが必要です — 選択したプロバイダーのAPIを呼び出すためです。洗練をスキップすると、VOVOCIは完全オフラインで動作します。",
    "faq.q3": "どの言語をサポートしていますか？",
    "faq.a3": "faster-whisperが文字起こしできる任意の言語 — 英語、中国語、日本語、スペイン語、フランス語、ドイツ語、韓国語など数十言語が含まれます。混合言語の口述のために、メインと補助の言語を設定できます。",
    "faq.q4": "GPUは必要ですか？",
    "faq.a4": "必要ありませんが、あると役立ちます。faster-whisperは特に小さいモデルの場合、CPUでも問題なく動作します。CUDA対応のGPUがあれば、大きいモデル使用時の変換速度が向上します。",
    "faq.q5": "LLM APIに費用はかかりますか？",
    "faq.a5": "プロバイダーによって異なります。NVIDIA NIMは無料ティアのエンドポイントを提供します。OpenRouterには低コストオプションのトークン課金制があります。Google Geminiには無料ティアがあります。VOVOCIは追加料金を一切請求しません。",
    "faq.q6": "macOSやLinuxでも動作しますか？",
    "faq.a6": "現在は対応していません。VOVOCIはホットキーフック、ウィンドウ検出、自動貼り付けのためにWindows固有のAPIに依存しています。プロジェクトはオープンソースです — コントリビューションを歓迎します。",

    // Footer
    "footer.desc": "oceanads.orgが構築 — オープンソース、制限なし。",
    "footer.license": "Apache 2.0",

    // Meta
    "meta.title": "VOVOCI — バイブコーディングと日常会話のための構造化された音声秘書",
    "meta.description": "VOVOCIはバイブコーディングと日常会話のために設計された構造化された音声秘書です。音声をメモ、SNS投稿、あらゆるWindowsアプリで使えるクリーンなテキストに変換します。",
  },

  th: {
    // Nav
    "nav.how": "วิธีการทำงาน",
    "nav.features": "คุณสมบัติ",
    "nav.providers": "ผู้ให้บริการ",
    "nav.model": "ประสิทธิภาพโมเดล",
    "nav.cost": "ค่าใช้จ่าย",
    "nav.translation": "โหมดแปลภาษา",
    "nav.quickstart": "เริ่มต้นอย่างรวดเร็ว",
    "nav.faq": "คำถามที่พบบ่อย",
    "nav.github": "GitHub",

    // Hero
    "hero.title": "เลขาฯ เสียงที่มีโครงสร้างสำหรับ<br>Vibecoding และการสนทนาจริง",
    "hero.sub": "VOVOCI ออกแบบมาสำหรับเวิร์กโฟลว์แปลงความคิดเป็นข้อความที่รวดเร็ว: ความคิดด้านการเขียนโค้ด บันทึกประจำวัน ร่างโซเชียลมีเดีย และการสนทนาประจำวัน พูดตามธรรมชาติ ให้ VOVOCI จัดโครงสร้างความหมาย แล้วส่งผลลัพธ์ที่สะอาดไปยังแอปที่คุณใช้อยู่",
    "hero.small": "เวิร์กโฟลว์เสียงเดียว หลากสถานการณ์ ทำงานได้กับซอฟต์แวร์ Windows ทุกชนิด",
    "hero.download": "ดาวน์โหลดไฟล์ ZIP แบบพกพา",
    "hero.github": "ดูบน GitHub",

    // How It Works
    "how.title": "วิธีการทำงาน",
    "how.intro": "VOVOCI คือเวิร์กโฟลว์เสียงที่มีโครงสร้าง: ตั้งค่าครั้งเดียว จากนั้นพูดและส่งข้อความที่สะอาดสำหรับ Vibecoding การสนทนา บันทึก และการสร้างเนื้อหา",
    "how.phase1": "ระยะที่ 1",
    "how.phase1Name": "ตั้งค่าครั้งเดียว",
    "how.installTitle": "ติดตั้ง VOVOCI",
    "how.installDesc": "ดาวน์โหลดและรันแอป ไม่ต้องสร้างบัญชี ไม่มีแบบฟอร์มลงทะเบียน ไม่มีการเก็บข้อมูลระยะไกล",
    "how.connectTitle": "เชื่อมต่อ LLM",
    "how.connectDesc": "เลือกผู้ให้บริการที่รองรับและเพิ่ม API key แนะนำเริ่มต้นด้วย NVIDIA NIM สำหรับการใช้งานฟรี",
    "how.phase2": "ระยะที่ 2",
    "how.phase2Name": "การใช้งานประจำวัน",
    "how.speakTitle": "พูด",
    "how.speakDesc": "กดปุ่มลัดค้างไว้และพูดตามธรรมชาติ — ความคิดด้านการเขียนโค้ด บันทึกส่วนตัว ไอเดียเนื้อหาโซเชียล หรือการสนทนาทั่วไป",
    "how.transcribeTitle": "ถอดเสียง",
    "how.transcribeDesc": "faster-whisper แปลงเสียงของคุณเป็นข้อความบนเครื่องของคุณเอง ไม่มีข้อมูลออกจากคอมพิวเตอร์ของคุณ",
    "how.refineTitle": "ปรับปรุง",
    "how.refineDesc": "LLM แก้ไขไวยากรณ์ ปรับปรุงการใช้ภาษา และรักษาความหมายดั้งเดิมของคุณ",
    "how.outputTitle": "ส่งออก",
    "how.outputDesc": "ข้อความที่มีโครงสร้างปรากฏในแอปที่คุณใช้งานอยู่ พร้อมใช้งานในซอฟต์แวร์ Windows ทุกชนิด",
    "how.nvidiaCallout": "<strong>เราแนะนำ NVIDIA NIM สำหรับการเริ่มต้น</strong> ระดับ API ฟรีของพวกเขาให้คุณเข้าถึงโมเดลที่มีประสิทธิภาพโดยไม่เสียค่าใช้จ่าย ไม่ต้องใช้บัตรเครดิต",

    // Features
    "feat.title": "กรณีการใช้งานและคุณสมบัติ",
    "feat.vibecodeTitle": "สร้างมาเพื่อ Vibecoding",
    "feat.vibecodeDesc": "บันทึกความคิดด้านการนำไปใช้ หมายเหตุสถาปัตยกรรม และตรรกะ TODO อย่างรวดเร็วด้วยเสียง จากนั้นวางข้อความที่มีโครงสร้างลงในเวิร์กโฟลว์การเขียนโค้ดได้เลย",
    "feat.notesTitle": "บันทึกเสียง",
    "feat.notesDesc": "แปลงคำพูดที่เป็นส่วนๆ เป็นบันทึกที่สะอาดสำหรับการวางแผน การจดบันทึก การประชุม และการจับความคิดประจำวัน โดยไม่รบกวนสมาธิ",
    "feat.socialTitle": "ร่างโพสต์โซเชียลมีเดีย",
    "feat.socialDesc": "พูดแนวคิดคร่าวๆ สำหรับโพสต์และคำบรรยาย แล้วรับร่างที่มีโครงสร้างพร้อมเผยแพร่ ตรวจสอบได้อย่างรวดเร็ว",
    "feat.chatTitle": "การสนทนาประจำวัน",
    "feat.chatDesc": "ใช้ VOVOCI เป็นเลขาฯ จัดโครงสร้างภาษาสำหรับการสื่อสารประจำวัน: ตอบกลับที่ชัดเจนขึ้น ข้อความที่สะอาดขึ้น และเขียนได้เร็วขึ้น",
    "feat.windowsTitle": "ทำงานได้กับแอป Windows ทุกชนิด",
    "feat.windowsDesc": "ตั้งแต่ IDE ไปจนถึงเอกสาร เครื่องมือแชท เบราว์เซอร์ และฟอร์ม — VOVOCI สามารถส่งออกตรงไปยังตำแหน่งเคอร์เซอร์ของคุณ",
    "feat.sttTitle": "STT ในเครื่อง + เลือก LLM เอง",
    "feat.sttDesc": "เก็บการถอดเสียงไว้ในเครื่องด้วย faster-whisper จากนั้นเลือกผู้ให้บริการ LLM ที่คุณชื่นชอบสำหรับการจัดโครงสร้างความหมายขั้นสุดท้าย",
    "feat.vocabTitle": "คลังคำศัพท์ที่กำหนดเอง",
    "feat.vocabDesc": "รักษาความสม่ำเสมอของคำศัพท์เทคนิค ชื่อผลิตภัณฑ์ และการใช้คำที่ต้องการทั่วทั้งการเขียนโค้ด การสนทนา และการเขียนเนื้อหา",

    // Term Scanner
    "scan.title": "ตัวสแกนคำศัพท์",
    "scan.intro": "AI agent ของคุณรู้จักโค้ดเบสของคุณอยู่แล้ว VOVOCI ให้ prompt แก่มัน — มันส่งคืนตารางคำศัพท์ นำเข้าแล้ว ทุกการบอกเสียงจะใช้การสะกดที่ถูกต้องโดยอัตโนมัติ",
    "scan.copyTitle": "คัดลอก Prompt",
    "scan.copyDesc": "VOVOCI มี prompt ในตัวอยู่ในแท็บตัวสแกนคำศัพท์ คลิกครั้งเดียวคัดลอกไปยังคลิปบอร์ด",
    "scan.pasteTitle": "วางใน AI Agent ของคุณ",
    "scan.pasteDesc": "ส่ง prompt ให้ Claude, ChatGPT, Gemini หรือ AI assistant ใดก็ได้ มันจะวิเคราะห์สภาพแวดล้อมของคุณ — เครื่องมือ เฟรมเวิร์ก API ศัพท์เฉพาะทาง — และส่งออกตารางคำศัพท์ Markdown",
    "scan.importTitle": "นำเข้าและเสร็จสิ้น",
    "scan.importDesc": "บันทึกผลลัพธ์ของ agent เป็นไฟล์ <code>.md</code> เปิดในตัวสแกนของ VOVOCI และนำเข้า คำศัพท์ทุกคำจะถูกนำไปใช้กับการปรับปรุงเสียงในอนาคต — ไม่ต้องป้อนด้วยตนเอง",
    "scan.promptTag": "Prompt ในตัว (ตัวอย่าง)",
    "scan.promptNote": "Prompt ฉบับสมบูรณ์รวมถึงคำแนะนำสำหรับชื่อเครื่องมือ บริการ API ศัพท์เฉพาะทาง คำนามเฉพาะเฉพาะโปรเจกต์ และคำที่เครื่องมือแปลงเสียงเป็นข้อความอาจจำผิด",

    // Providers
    "prov.title": "ผู้ให้บริการ",
    "prov.intro": "VOVOCI ทำงานร่วมกับผู้ให้บริการ LLM ห้ารายในทันที แต่ละรายเชื่อมต่อผ่าน API มาตรฐาน — คุณไม่ถูกผูกติดกับผู้ขายรายเดียว",
    "prov.freeTier": "ระดับฟรี",

    // Model Performance
    "model.title": "ประสิทธิภาพโมเดล (เน้นความเร็วและ Latency)",
    "model.intro": "ให้ความสำคัญกับ latency token แรกที่ต่ำกว่าและปริมาณ token ที่เร็วกว่าสำหรับการจัดโครงสร้างเสียงแบบเรียลไทม์ ข้อมูลด้านล่างอ้างอิงจาก benchmark ของผู้ให้บริการและการประเมินสาธารณะ",
    "model.thModel": "โมเดล",
    "model.thSpeed": "ความเร็ว (ms/token)",
    "model.thLatency": "Latency (ms)",
    "model.thUseCase": "กรณีการใช้งานที่ดีที่สุด",
    "model.geminiUse": "ตัวเลือกเริ่มต้นสำหรับการจัดโครงสร้างภาษาผสมที่รวดเร็ว",
    "model.gptUse": "สมดุลต้นทุน/ประสิทธิภาพสำหรับเอาต์พุต assistant แบบเรียลไทม์",
    "model.qwenUse": "การจัดโครงสร้างเชิงโค้ดและการเขียนคำสั่งใหม่",
    "model.nemotronUse": "การปรับแต่งโครงสร้างหลายภาษาด้วย latency ต่ำ",
    "model.mistralUse": "การตอบกลับยาวคุณภาพสูงเมื่อ latency ไม่สำคัญนัก",
    "model.grokUse": "การอนุมานที่รวดเร็วมากพร้อมการจัดโครงสร้างหลายภาษาที่แข็งแกร่ง",
    "model.interpTitle": "การแปลความหมายอย่างรวดเร็ว",
    "model.interpDesc": "หากลำดับความสำคัญของคุณคือการโต้ตอบทันที ให้เลือกโมเดลที่มี latency ต่ำก่อน จากนั้นปรับให้เหมาะสมสำหรับ ms/token สำหรับผู้ใช้ VOVOCI ส่วนใหญ่ Gemini 2.5 Flash หรือ NVIDIA gpt-oss-20b มอบประสบการณ์แบบเรียลไทม์ที่แข็งแกร่งที่สุด",
    "model.refTitle": "อ้างอิง",

    // Cost
    "cost.title": "ค่าใช้จ่ายจริงเท่าไหร่?",
    "cost.intro": "เครื่องมือแปลงเสียงเป็นข้อความเรียกเก็บค่าสมัครสมาชิกรายเดือน VOVOCI ฟรี — คุณจ่ายเฉพาะ token API ของ LLM ที่ใช้จริง นี่คือตัวอย่างการใช้งานหนักในแต่ละวันกับ OpenRouter",
    "cost.chartYTitle": "ค่าใช้จ่าย / เดือน (USD)",
    "cost.chartXTitle": "ความเร็ว (ms / token) — ต่ำกว่าเร็วกว่า",
    "cost.chartRef": "← $3/เดือน",
    "cost.modelTag": "x-ai/grok-4.1-fast ผ่าน OpenRouter",
    "cost.period": "/ เดือน",
    "cost.desc": "อ้างอิงจาก ~60 ครั้งการปรับปรุงเสียงต่อวัน ทุกวัน ตลอดทั้งเดือน นั่นคือประมาณ 1,800 การเรียก API — เพียงพอสำหรับผู้ใช้ขั้นสูงที่บอกเสียงอย่างต่อเนื่องตลอดวันทำงาน",
    "cost.labelTokens": "เฉลี่ย token ต่อการเรียก",
    "cost.valueTokens": "~280 (อินพุต + เอาต์พุต)",
    "cost.labelMonthly": "token รายเดือน",
    "cost.valueMonthly": "~504,000",
    "cost.labelLatency": "Latency token แรก",
    "cost.valueLatency": "~200–500 ms",
    "cost.labelLicense": "ใบอนุญาต VOVOCI",
    "cost.valueLicense": "ฟรีตลอดไป",
    "cost.note": "ราคาอ้างอิงจากอัตราต่อ token ที่เผยแพร่ของ OpenRouter ค่าใช้จ่ายจริงขึ้นอยู่กับความยาว prompt และความซับซ้อนของเอาต์พุต ไม่มีการบวกราคาจาก VOVOCI",

    // Translation Mode
    "trans.title": "โหมดแปลภาษาด้วยปุ่มลัดคู่",
    "trans.intro": "กำหนดปุ่มลัดที่สองเฉพาะสำหรับการแปลภาษา กดแทนปุ่มบอกเสียงปกติ และ VOVOCI จะแปลเสียงของคุณเป็นภาษาเป้าหมายที่ตั้งค่าไว้โดยอัตโนมัติ",
    "trans.setupTitle": "ตั้งค่าปุ่มลัดแปลภาษา",
    "trans.setupDesc": "ไปที่การตั้งค่าและกำหนด<strong>ปุ่มลัดที่สอง</strong>สำหรับโหมดแปลภาษา — แยกออกจากปุ่มลัดบอกเสียงปกติ",
    "trans.speakTitle": "กดปุ่มลัดแปลภาษาค้างไว้และพูด",
    "trans.speakDesc": "กดปุ่มลัดแปลภาษาค้างไว้ จากนั้นพูดตามธรรมชาติในภาษาใดก็ได้หรือรูปแบบภาษาผสม",
    "trans.outputTitle": "รับเอาต์พุตที่แปลแล้วและมีโครงสร้าง",
    "trans.outputDesc": "VOVOCI แปลและจัดโครงสร้างผลลัพธ์เป็นภาษาเป้าหมายที่ตั้งค่าไว้โดยอัตโนมัติ พร้อมใช้งานทันทีในแอปใดก็ได้",

    // Quick Start
    "qs.title": "เริ่มต้นอย่างรวดเร็ว",
    "qs.cloneTitle": "Clone และตั้งค่า",
    "qs.depsTitle": "ติดตั้ง dependencies",
    "qs.runTitle": "รัน",
    "qs.note": "สำหรับผู้ใช้ Portable ZIP: ให้รัน <code>Run-VOVOCI-First-Time.cmd</code> ก่อนครั้งแรก โมเดล STT จะถูกดาวน์โหลดอัตโนมัติเมื่อใช้งานครั้งแรก (ต้องใช้อินเทอร์เน็ตครั้งเดียว) แล้วจะถูกแคชไว้ในเครื่องเพื่อใช้งานออฟไลน์ครั้งต่อไป",

    // FAQ
    "faq.title": "คำถามที่พบบ่อย",
    "faq.q1": "VOVOCI ฟรีหรือเปล่า?",
    "faq.a1": "ฟรีอย่างสมบูรณ์ แอปเป็นโอเพ่นซอร์สภายใต้ใบอนุญาต Apache 2.0 ไม่มีระดับแบบชำระเงิน ไม่มีการล็อคคุณสมบัติ ไม่มีขีดจำกัดการใช้งานในตัวแอป ค่าใช้จ่าย API ของ LLM ขึ้นอยู่กับผู้ให้บริการที่คุณเลือก — แต่หลายรายมีระดับฟรีที่ใจกว้าง",
    "faq.q2": "ต้องการการเชื่อมต่ออินเทอร์เน็ตหรือไม่?",
    "faq.a2": "สำหรับการแปลงเสียงเป็นข้อความ ไม่ต้องการ การถอดเสียงทำงานในเครื่อง คุณต้องการอินเทอร์เน็ตสำหรับการปรับปรุงด้วย LLM เนื่องจากเรียก API ของผู้ให้บริการที่คุณเลือก ข้ามการปรับปรุงและ VOVOCI ทำงานได้อย่างสมบูรณ์แบบออฟไลน์",
    "faq.q3": "รองรับภาษาอะไรบ้าง?",
    "faq.a3": "ภาษาใดก็ได้ที่ faster-whisper สามารถถอดเสียงได้ — หลายสิบภาษารวมถึงภาษาอังกฤษ จีน ญี่ปุ่น สเปน ฝรั่งเศส เยอรมัน เกาหลี และอื่นๆ ตั้งค่าภาษาหลักและภาษารองสำหรับการบอกเสียงแบบหลายภาษา",
    "faq.q4": "ต้องการ GPU หรือไม่?",
    "faq.a4": "ไม่จำเป็น แต่ช่วยได้ faster-whisper ทำงานบน CPU ได้ดี โดยเฉพาะกับโมเดลขนาดเล็ก GPU ที่รองรับ CUDA จะเร่งความเร็วการถอดเสียงหากคุณใช้โมเดลขนาดใหญ่",
    "faq.q5": "API ของ LLM จะมีค่าใช้จ่ายหรือไม่?",
    "faq.a5": "ขึ้นอยู่กับผู้ให้บริการ NVIDIA NIM มี endpoint ระดับฟรี OpenRouter มีการชำระตาม token พร้อมตัวเลือกต้นทุนต่ำ Google Gemini มีระดับฟรี VOVOCI ไม่เพิ่มค่าธรรมเนียมใดๆ",
    "faq.q6": "ทำงานบน macOS หรือ Linux ได้หรือไม่?",
    "faq.a6": "ยังไม่ได้ในปัจจุบัน VOVOCI ขึ้นอยู่กับ API เฉพาะ Windows สำหรับ hotkey hook การตรวจจับหน้าต่าง และการวางอัตโนมัติ โปรเจกต์เป็นโอเพ่นซอร์ส — ยินดีรับการมีส่วนร่วม",

    // Footer
    "footer.desc": "สร้างโดย oceanads.org — โอเพ่นซอร์ส ไม่มีเงื่อนไขแฝง",
    "footer.license": "Apache 2.0",

    // Meta
    "meta.title": "VOVOCI — เลขาฯ เสียงที่มีโครงสร้างสำหรับ Vibecoding และการสนทนาประจำวัน",
    "meta.description": "VOVOCI คือเลขาฯ เสียงที่มีโครงสร้างสำหรับ Vibecoding และการสนทนาประจำวัน แปลงเสียงเป็นข้อความที่สะอาดและใช้งานได้สำหรับบันทึก โพสต์โซเชียล และแอป Windows ทุกชนิด",
  },
};

/* ============================================================
   Language Application
   ============================================================ */

function applyLanguage(lang) {
  const t = translations[lang] || translations["en"];

  // Apply textContent translations
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  // Apply innerHTML translations (for elements with HTML tags)
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // Update <html lang="">
  document.documentElement.lang = lang;

  // Update <title>
  if (t["meta.title"]) {
    document.title = t["meta.title"];
  }

  // Update <meta name="description">
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && t["meta.description"]) {
    metaDesc.setAttribute("content", t["meta.description"]);
  }

  // Update OG tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && t["meta.title"]) {
    ogTitle.setAttribute("content", t["meta.title"]);
  }
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc && t["meta.description"]) {
    ogDesc.setAttribute("content", t["meta.description"]);
  }

  // Save to localStorage
  localStorage.setItem("vovoci-lang", lang);

  // Update switcher display
  const labels = {
    en: "EN",
    "zh-TW": "繁中",
    ko: "한국어",
    ja: "日本語",
    th: "ไทย",
  };
  const currentLabel = document.querySelector(".lang-current-label");
  if (currentLabel) {
    currentLabel.textContent = labels[lang] || lang.toUpperCase();
  }

  // Update active state on option buttons
  document.querySelectorAll(".lang-option").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

/* ============================================================
   Language Switcher Interaction
   ============================================================ */

function initLangSwitcher() {
  const switcher = document.querySelector(".lang-switcher");
  const currentBtn = document.querySelector(".lang-current");

  if (!switcher || !currentBtn) return;

  // Toggle dropdown
  currentBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = switcher.classList.toggle("open");
    currentBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Language option selection
  document.querySelectorAll(".lang-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (lang) {
        applyLanguage(lang);
        switcher.classList.remove("open");
        currentBtn.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Close on outside click
  document.addEventListener("click", () => {
    if (switcher.classList.contains("open")) {
      switcher.classList.remove("open");
      currentBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && switcher.classList.contains("open")) {
      switcher.classList.remove("open");
      currentBtn.setAttribute("aria-expanded", "false");
      currentBtn.focus();
    }
  });
}

/* ============================================================
   Auto-initialization
   ============================================================ */

function detectLanguage() {
  // 1. Check URL query parameter (?lang=zh-TW)
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get("lang");
  if (urlLang && translations[urlLang]) return urlLang;

  // 2. Check localStorage
  const saved = localStorage.getItem("vovoci-lang");
  if (saved && translations[saved]) return saved;

  // 3. Check browser language
  const browserLang = navigator.language || navigator.userLanguage || "en";
  const supported = Object.keys(translations);

  // Exact match
  if (supported.includes(browserLang)) return browserLang;

  // Prefix match (e.g. "zh-TW" from "zh-TW-u-...")
  const prefix = browserLang.split("-").slice(0, 2).join("-");
  if (supported.includes(prefix)) return prefix;

  // Single prefix match (e.g. "ja" from "ja-JP")
  const single = browserLang.split("-")[0];
  if (supported.includes(single)) return single;

  return "en";
}

document.addEventListener("DOMContentLoaded", () => {
  initLangSwitcher();
  const lang = detectLanguage();
  applyLanguage(lang);
});
