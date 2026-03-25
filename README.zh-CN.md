# VOVOCI（简体中文）

VOVOCI 是一个 Windows 开源桌面工具，流程如下：

按住热键录音 -> 本地 STT -> 可选 Refine -> 可选自动粘贴

仓库：`https://github.com/lovemage/vovoci.git`

## 语言版本

- [English](./README.md)
- [繁體中文](./README.zh-TW.md)
- 简体中文（本页）
- [日本語](./README.ja.md)
- [한국어](./README.ko.md)

## 功能概览

| 功能 | 说明 |
|---|---|
| Push-to-talk | 按住热键开始录音，松开后转写 |
| 本地 STT | 使用 `faster-whisper` |
| 多语言设置 | 主语言 + 次语言提示 |
| Refine | 修正错字、语气词和不通顺表达，保持原意 |
| 混合语言 | 支持中英混输 |
| Provider | OpenAI Compatible / OpenRouter / Xiaomi MiMo V2 / Google Gemini API / NVIDIA NIM |
| 分 Provider API Key | 每个 Provider 独立保存 API key |
| Settings | Local STT + Refi Prompt 集中管理 |

## STT 支持

| 引擎 | 模式 | 模型 |
|---|---|---|
| faster-whisper | 本地 | `tiny`, `base`, `small`, `medium`, `large-v3` |

## 完整安装

### 1. 拉取代码

```powershell
git clone https://github.com/lovemage/vovoci.git
cd vovoci
```

### 2. 创建 Python 虚拟环境

```powershell
python -m venv .venv
.venv\Scripts\activate
```

### 3. 安装 Python 依赖

```powershell
pip install --upgrade pip
pip install keyboard numpy sounddevice faster-whisper ctranslate2 pystray pillow
```

### 4. 预加载 STT 模型（推荐）

启动后进入 `Settings` -> `Local STT` -> `Preload STT Model`。  
建议先用 `small`。

## 运行

```powershell
python app.py
```

## 使用指南

1. 选择 Provider 和 Model。  
2. 输入对应 Provider 的 API key。  
3. 点击右上 `Settings` 配置 STT 和 Prompt。  
4. 设置热键，按住说话，松开转写。  
5. 根据需要启用：
   - Auto Refine After STT
   - Auto Paste to Active Window
   - Recording Overlay 位置（`Left Bottom` / `Center Bottom` / `Right Bottom`）

## 自定义词汇

定义词汇对照表，确保特定领域词汇在 Refine 时能正确处理。

| 字段 | 说明 |
|---|---|
| Term | 要检测的词汇或短语 |
| Preferred | 正确或首选的形式 |
| Note | 提供给 Refine 引擎的补充说明（选填） |

自定义词汇会在 Refine 时自动注入系统提示词。

## Check Permissions

检查结果会按项显示 `✓ / ✗`：

| 检查项 |
|---|
| 本地 STT 依赖是否安装 |
| STT 模型是否存在 |
| API 连通性测试 |
| 麦克风权限 / Runtime |
| 热键 Runtime |
| 更新检查（GitHub） |

## 更新

| 操作 | 说明 |
|---|---|
| Check Update | 检查 GitHub 最新版本 |
| Self Update | 在 git 仓库内执行 `git pull --ff-only` |
