#define MyAppName "VOVOCI"
#ifndef MyAppVersion
  #define MyAppVersion "0.1.3"
#endif
#define MyAppPublisher "VOVOCI"
#define MyAppExeName "VOVOCI.exe"

[Setup]
AppId={{E4ECFB93-2E08-45D0-825E-077367B7F56A}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={localappdata}\Programs\VOVOCI
DefaultGroupName=VOVOCI
DisableProgramGroupPage=yes
PrivilegesRequired=lowest
OutputDir=..\release
OutputBaseFilename=VOVOCI-Setup-{#MyAppVersion}
Compression=lzma
SolidCompression=yes
WizardStyle=modern
ArchitecturesInstallIn64BitMode=x64compatible
SetupIconFile=..\build\app.ico
UninstallDisplayIcon={app}\app.ico

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "Create a desktop shortcut"; GroupDescription: "Additional icons:"

[Files]
Source: "..\dist\VOVOCI\*"; DestDir: "{app}"; Flags: recursesubdirs createallsubdirs ignoreversion
Source: "..\build\app.ico"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{autoprograms}\VOVOCI"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\app.ico"
Name: "{autodesktop}\VOVOCI"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon; IconFilename: "{app}\app.ico"

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "Launch VOVOCI"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
Type: files; Name: "{app}\.agent"
Type: files; Name: "{app}\crash.log"
Type: files; Name: "{app}\voice_*.wav"
Type: files; Name: "{app}\vovoci_voice_*.wav"
Type: filesandordirs; Name: "{app}\__pycache__"
Type: files; Name: "{localappdata}\VOVOCI\config.json"
Type: files; Name: "{localappdata}\VOVOCI\system_prompt.json"
Type: filesandordirs; Name: "{localappdata}\VOVOCI\models"

