# VOVOCI macOS Development Tasklist

## 1. 建立分支與目標
- 建立分支：`feature/macos-support`
- 定義支援範圍：`macOS 13+`、`Intel + Apple Silicon`
- 設定里程碑：`M1 可跑`、`M2 可打包`、`M3 可簽名公證`

## 2. 平台抽象層（優先）
- 新增檔案：
  - `platform/base.py`
  - `platform/windows.py`
  - `platform/macos.py`
- 抽出介面：
  - `register_hotkeys() / unregister_hotkeys()`
  - `paste_to_active_app(text)`
  - `check_permissions()`
  - `open_mic_settings()`
  - `create_tray()`
- 調整 `app.py`：只呼叫介面，不直接依賴 Windows API

## 3. 熱鍵模組（macOS）
- 在 `platform/macos.py` 實作全域熱鍵
- 支援：
  - 主熱鍵（錄音）
  - 翻譯雙熱鍵（主熱鍵 + modifier）
- 驗收：
  - 普通錄音顯示 `Listening ...`
  - 雙熱鍵顯示 `Translating, Listening ...`

## 4. 貼上與前景輸出（macOS）
- 實作 `paste_to_active_app`
- 優先流程：剪貼簿 + 模擬 `cmd+v`
- 失敗 fallback：顯示輸出浮窗
- 驗收：VS Code / Notes / Browser 可貼上

## 5. 權限流程（macOS）
- 權限檢查：麥克風、輔助使用、輸入監控
- 設定頁新增權限引導文案（僅 UI，不動 system prompt）
- 新增「開啟系統設定」按鈕對應 macOS
- 驗收：拒權時有提示且程式不崩潰

## 6. 系統匣 / 選單列
- macOS 使用 menubar/tray（`pystray` 或 `rumps`）
- 功能：開啟設定、顯示主窗、退出
- 驗收：關閉主窗後可從 menubar 恢復

## 7. 相依與環境
- 更新依賴檔（含 macOS 需要套件）
- 新增 `scripts/setup_macos.sh`
- 驗收：新機可一鍵安裝與啟動

## 8. 打包 `.app`
- 新增 `build/macos.spec`（PyInstaller）
- 產出：`VOVOCI.app`
- 驗收：乾淨機器可啟動

## 9. 打包 `.dmg`
- 新增：
  - `scripts/build_dmg.sh`
  - `build/dmg_settings.py`（或 `create-dmg` 設定）
- 產出：`VOVOCI-macOS.dmg`

## 10. 簽名與公證（正式版）
- 新增：
  - `scripts/sign_macos.sh`
  - `scripts/notarize_macos.sh`
- 流程：`codesign -> notarytool -> stapler`
- 驗收：Gatekeeper 可直接開啟

## 11. CI/CD
- 在 GitHub Actions 新增 macOS job：
  - lint/test
  - build app
  - build dmg（可先不簽名）
- 自動上傳 release artifacts

## 12. 測試清單
- 熱鍵：長按、連按、中斷
- 翻譯雙鍵：指定語言輸出正確
- STT：短音訊 / 長音訊 / 混語
- API：OpenRouter / NVIDIA / Gemini
- UI：繁中 / 英 / 日 / 韓切換
- 安裝卸載：app 檔、設定檔、暫存音訊清理

## 13. 文件更新
- 更新 `README.md`（新增 macOS 安裝章節）
- 新增 `docs/macos.md`：
  - 權限開啟步驟
  - 已知限制
  - 常見錯誤排查

## 14. 交付節奏（建議）
- Week 1：Task 2~6（功能可跑）
- Week 2：Task 8~12（可發測試版）
- Week 3：Task 10~13（可正式發佈）
