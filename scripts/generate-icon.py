from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / "logo.png"
OUT_DIR = ROOT / "build"
OUT_ICO = OUT_DIR / "app.ico"


def main() -> int:
    if not LOGO.exists():
        raise FileNotFoundError(f"logo file not found: {LOGO}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    with Image.open(LOGO).convert("RGBA") as img:
        sizes = [(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
        img.save(OUT_ICO, format="ICO", sizes=sizes)

    print(f"generated icon: {OUT_ICO}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
