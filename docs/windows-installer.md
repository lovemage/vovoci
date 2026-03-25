# VOVOCI Windows 安装包构建说明

本项目已准备好 Windows 安装包构建链路，目标是把应用本体、Python 依赖与本地语音模型一并打包。

## 打包产物

- 应用目录：`dist/VOVOCI/`
- 安装包：`release/VOVOCI-Setup-<version>.exe`
- 发布位置：GitHub Releases（**不提交 `release/*.exe` 到仓库**）

## 前置条件

1. Windows 10/11 x64
2. Python 3.11+（需有 `py` 或 `python` 命令）
3. Inno Setup 6（提供 `ISCC.exe`）

## 一键构建

在项目根目录执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-windows-installer.ps1 -Version 0.1.1
```

仅构建可运行目录（不生成安装包）：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-windows-installer.ps1 -Version 0.1.1 -SkipInstaller
```

## 打包内容（已包含）

- `app.py` 打包后的 `VOVOCI.exe`
- 运行依赖（`requirements.txt`）
- `logo.png`, `github.png`, `README.md`, `LICENSE`

## 语音模型策略

- 安装包不内置语音模型。
- 首次启动会自动准备 STT 模型（若本机无缓存会自动下载）。
- 默认目标模型由应用设置中的 `STT Model` 决定（默认 `small`）。

## 关键文件

- 运行依赖：`requirements.txt`
- 构建依赖：`requirements-build.txt`
- PyInstaller 规则：`vovoci.spec`
- 构建脚本：`scripts/build-windows-installer.ps1`
- Inno Setup 脚本：`installer/vovoci.iss`

## 上传到 GitHub Release

建议使用 GitHub CLI：

```powershell
gh release create v<version> --title "VOVOCI v<version>" --notes "Windows installer release"
gh release upload v<version> release/VOVOCI-Setup-<version>.exe --clobber
```

## 常见问题

1. 找不到 `py`/`python`
- 安装 Python，并勾选加入 PATH。

2. 找不到 `ISCC.exe`
- 安装 Inno Setup 6，默认路径通常是：
  - `%LOCALAPPDATA%\Programs\Inno Setup 6\ISCC.exe`
  - `C:\Program Files (x86)\Inno Setup 6\ISCC.exe`
  - `C:\Program Files\Inno Setup 6\ISCC.exe`

3. 首次运行下载模型较慢
- 属于预期行为（首次自动下载）；下载完成后会走本地缓存。
