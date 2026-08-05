# VOVOCI Windows 安装包构建说明

本项目已准备好 Windows 安装包构建链路，目标是把应用本体、Python 依赖与本地语音模型一并打包。

## 打包产物

- 应用目录：`dist/VOVOCI/`
- 安装包：`release/VOVOCI-Setup-<version>.exe`
- 可携版：`release/VOVOCI-portable-<version>.zip`
- 发布位置：GitHub Releases（**不提交 `release/*.exe` 到仓库**）

## 前置条件

1. Windows 10/11 x64
2. Python 3.11+（可使用 `py`/`python` 命令，或以 `-PythonPath` 指定執行檔）
3. Inno Setup 6（提供 `ISCC.exe`）

## 一键构建

在项目根目录执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-windows-installer.ps1 -Version 0.1.7
```

打包并签章（若系统已安装 `signtool.exe` 且证书可用）：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\package-windows.ps1 -Version 0.1.7 -Sign
```

指定证书（可选其一）：

```powershell
# 按证书 Thumbprint
powershell -ExecutionPolicy Bypass -File .\scripts\package-windows.ps1 -Version 0.1.7 -Sign -CertThumbprint "<thumbprint>"

# 按证书 Subject
powershell -ExecutionPolicy Bypass -File .\scripts\package-windows.ps1 -Version 0.1.7 -Sign -CertSubject "Your Company Name"
```

仅打包可携版 ZIP（不生成安装器）：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\package-windows.ps1 -Version 0.1.7 -PortableOnly
```

可携版 ZIP 内会附带 `Run-VOVOCI-First-Time.cmd`，建议首次运行时优先双击该文件（会自动执行 `Unblock-File` 后启动 `VOVOCI.exe`）。

仅构建可运行目录（不生成安装包）：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-windows-installer.ps1 -Version 0.1.7 -SkipInstaller
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

若 Python 未加入 PATH，可明確指定：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\package-windows.ps1 -Version 0.1.7 -PythonPath "C:\Path\To\python.exe" -PortableOnly
```

## GitHub Release 自动化

推送与 `APP_VERSION` 一致的 tag 后，`.github/workflows/release.yml` 会在 Windows、macOS 与 Linux runner 构建并发布全部产物：

```powershell
git tag v0.1.7
git push origin v0.1.7
```

## 常见问题

1. 找不到 `py`/`python`
- 安装 Python并加入 PATH，或将 Python 執行檔路径传给 `-PythonPath`。

2. 找不到 `ISCC.exe`
- 安装 Inno Setup 6，默认路径通常是：
  - `%LOCALAPPDATA%\Programs\Inno Setup 6\ISCC.exe`
  - `C:\Program Files (x86)\Inno Setup 6\ISCC.exe`
  - `C:\Program Files\Inno Setup 6\ISCC.exe`

3. 首次运行下载模型较慢
- 属于预期行为（首次自动下载）；下载完成后会走本地缓存。
