# VOVOCI macOS Implementation Plan (Executable)

## 0. 範圍、目標與 Gate
- 分支：`feature/macos-support`
- 支援範圍：`macOS 13+`（Ventura/Sonoma/Sequoia）、`Intel + Apple Silicon`
- 本階段目標：
  - `Milestone A`：在 macOS 可啟動、可錄音、可輸出文字
  - `Milestone B`：可打包 VP 測試包（未簽名 `.app` 與 `.dmg`）
  - `Milestone C`（可選）：有 Apple 開發者帳號時可簽名、公證並通過 Gatekeeper
- Gate（未滿足不得進入下一階段）：
  - Gate A：平台抽象層完成，`app.py` 不再直接呼叫 WinAPI
  - Gate B：macOS 熱鍵 + 貼上 + 權限流程完成且手測通過
  - Gate C（VP）：未簽名包可安裝、啟動、卸載流程可重複

## 0.1 無 Apple 開發者帳號發佈策略（VP）
- 可完成：
  - 產出未簽名 `VOVOCI.app`
  - 產出未簽名 `VOVOCI-macOS-<version>-unsigned.dmg`
  - 內部測試與手動分發
- 已知限制：
  - 無法 notarization
  - Gatekeeper 可能顯示「無法驗證開發者」警告
  - 下載後可能需手動移除 quarantine 屬性
- VP 驗收標準：
  - 測試機可透過「右鍵 -> 開啟」成功執行
  - 若遭 quarantine，可用 `xattr -dr com.apple.quarantine /Applications/VOVOCI.app` 後啟動

## 1. 先決策（避免返工）
- 目錄命名改為 `platforms/`（避免與 Python 標準庫 `platform` 衝突）
- macOS 技術選型：
  - 全域熱鍵：`pynput`
  - 貼上：剪貼簿 + `osascript` 觸發 `cmd+v`
  - Menubar：沿用 `pystray`
  - 權限引導：系統設定 deep link + 失敗 fallback 到一般隱私頁
- Python 版本：沿用專案現況（不升級 major/minor）

## 2. 平台抽象層（P0，必先做）
- 新增檔案：
  - `platforms/base.py`
  - `platforms/windows.py`
  - `platforms/macos.py`
  - `platforms/factory.py`
- 介面契約（`base.py`）：
  - `register_hotkeys(on_press, on_release, main_hotkey, modifier_hotkey) -> None`
  - `unregister_hotkeys() -> None`
  - `is_modifier_pressed(modifier_hotkey) -> bool`
  - `paste_to_active_app(text: str) -> bool`
  - `check_permissions() -> dict[str, bool]`
  - `open_system_settings(target: str) -> None`
  - `create_tray(on_show, on_settings, on_exit) -> TrayHandle`
  - `stop_tray(tray_handle) -> None`
- `app.py` 重構原則：
  - 只呼叫抽象介面
  - WinAPI 與 `keyboard` 直呼叫搬移至 `platforms/windows.py`
  - macOS 專用邏輯只存在 `platforms/macos.py`
- 驗收：
  - Windows 既有功能不回歸
  - macOS 分支可 import、可啟動主視窗

## 3. 熱鍵（macOS，P0）
- 實作：
  - 使用 `pynput.keyboard.Listener` 監聽主熱鍵 press/release
  - `is_modifier_pressed` 檢查翻譯輔助鍵狀態
  - 長按只觸發一次錄音開始，放開觸發停止
- 事件規格：
  - 主熱鍵按下：`Listening ...`
  - 主熱鍵 + modifier：`Translating, Listening ...`
- 驗收：
  - 長按、連按、中斷皆可正確開始/停止
  - 無重複觸發、無卡死 listener thread

## 4. 貼上與前景輸出（macOS，P0）
- 實作流程：
  - 寫入系統剪貼簿
  - `osascript` 執行 `keystroke "v" using command down`
  - 若失敗或無法操作前景輸入框，fallback 到既有浮窗輸出
- 驗收目標 App：
  - VS Code
  - Notes
  - 任一 Chromium 瀏覽器
- 可測量標準：
  - 10 次連續貼上成功率 >= 9/10
  - 失敗時必定 fallback，且 UI 不崩潰

## 5. 權限流程（macOS，P0）
- 權限檢查：
  - Microphone
  - Accessibility
  - Input Monitoring
- UI 變更：
  - 設定頁加入權限狀態列與引導文案
  - 新增「開啟系統設定」按鈕（依權限類型導向）
- `open_system_settings(target)` 支援：
  - `microphone`
  - `accessibility`
  - `input_monitoring`
- 驗收：
  - 拒權狀況下顯示可操作提示
  - 拒權不崩潰，且有 fallback 行為

## 6. Menubar / Tray（macOS，P1）
- 功能：
  - 顯示主窗
  - 開啟設定
  - 退出程式
- 驗收：
  - 關閉主窗後可從 menubar 恢復
  - 退出時 hotkey listener 與 tray thread 正常釋放

## 7. 相依與開發環境（P0）
- 依賴更新：
  - `requirements.txt` 新增 `pynput`
  - 保留既有套件，避免一次性大改
- 新增腳本：
  - `scripts/setup_macos.sh`
- `setup_macos.sh` 最低要求：
  - 建立/啟用 venv
  - 安裝 requirements
  - 啟動 smoke test（`python -c "import app; print('import ok')"`）
- 驗收：
  - 乾淨機器可一鍵完成安裝與啟動

## 8. 打包 `.app`（P1）
- 新增：
  - `build/macos.spec`
- 產出：
  - `dist/VOVOCI.app`
- 驗收：
  - 非開發機可啟動
  - 啟動後可開啟主窗、可最小化到 menubar

## 9. 打包 `.dmg`（P1）
- 新增：
  - `scripts/build_dmg.sh`
  - `build/dmg_settings.py`（若採 `dmgbuild`）
- 產出：
  - `release/VOVOCI-macOS-<version>-unsigned.dmg`
- 驗收：
  - DMG 可掛載、拖拉安裝可用

## 10. 簽名與公證（P2，可選，需 Apple 開發者帳號）
- 新增：
  - `scripts/sign_macos.sh`
  - `scripts/notarize_macos.sh`
  - `build/entitlements.plist`
- 必要環境變數：
  - `APPLE_TEAM_ID`
  - `APPLE_ID`
  - `APPLE_APP_PASSWORD`
  - `APPLE_SIGN_IDENTITY`
- 流程：
  - `codesign --deep --force --options runtime`
  - `xcrun notarytool submit --wait`
  - `xcrun stapler staple`
- 驗收：
  - `spctl --assess --type execute` 通過
  - Gatekeeper 雙擊可開啟

## 11. CI/CD（P1）
- GitHub Actions 新增 macOS workflow：
  - `lint/test`
  - `build app`
  - `build dmg`（unsigned）
- artifacts：
  - 上傳 `.app`（壓縮）
  - 上傳 `.dmg`
- 進階（P2）：
  - 以 secrets 啟用簽名與公證 job

## 12. 測試矩陣（執行清單）
- 功能：
  - 熱鍵：長按、連按、中斷
  - 翻譯雙鍵：指定語言輸出正確
  - STT：短音訊 / 長音訊 / 混語
  - API：OpenRouter / NVIDIA / Gemini
  - UI：繁中 / 英 / 日 / 韓切換
- 平台：
  - Intel 1 台
  - Apple Silicon 1 台
- 安裝生命週期：
  - `.app` 啟動/升級/卸載
  - 設定檔與暫存音訊清理

## 13. 文件更新（P1）
- 更新 `README.md`、`README.zh-TW.md`：
  - 平台徽章改為 Windows + macOS
  - 新增 macOS 安裝與權限章節
- 新增 `docs/macos.md`：
  - 權限開啟步驟
  - 已知限制
  - 常見錯誤排查

## 14. 交付節奏（可執行）
- Week 1：
  - 完成 Task 1~5（Gate A/B）
  - 交付可跑內測版（source run）
- Week 2：
  - 完成 Task 6~9
  - 交付 `.app` + `.dmg` 測試包
- Week 3：
  - 完成 Task 13 + VP 文件補強（Gate C）
  - 交付 VP 測試版（unsigned）
  - 若有 Apple 開發者帳號，再執行 Task 10 產出正式版

## 15. 開工 Definition of Ready（DoR）
- 已確認 `platforms/` 命名與介面契約
- 已確認 macOS 熱鍵/貼上/權限技術選型
- 已準備至少 1 台 Intel 或 Apple Silicon 測試機
- 已建立分支 `feature/macos-support`

## 16. 完工 Definition of Done（DoD）
- macOS 功能驗收全數通過，且 Windows 無回歸
- VP 路線：`.app`、`-unsigned.dmg` 可在乾淨機器安裝使用（可接受右鍵開啟）
- 文件與 CI 已同步更新
-（正式版，可選）簽名、公證、Gatekeeper 驗收通過
