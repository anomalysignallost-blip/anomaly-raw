from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PAGES = [
    ("ar-01", "Digital Anomaly Scan"),
    ("ar-02", "System Error"),
    ("ar-03", "Signal Disturbed"),
    ("ar-04", "Data Corrupted"),
    ("ar-05", "Limited Issue"),
]


def test_drop_pages_exist_with_unique_seo_metadata():
    for slug, title in PAGES:
        page = ROOT / "drop-01" / slug / "index.html"
        assert page.exists(), page
        html = page.read_text(encoding="utf-8")
        assert f"<title>ANOMALY-RAW | {title}" in html
        assert f'rel="canonical" href="https://anomaly-raw.vercel.app/drop-01/{slug}/"' in html
        assert '<meta name="robots" content="index,follow">' in html
        assert 'application/ld+json' in html
        assert '"@type":"Product"' in html
        assert f'/assets/design-{slug[-2:]}.webp' in html
        assert 'https://anomaly-raw.vercel.app/' in html


def test_sitemap_contains_all_drop_pages():
    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    for slug, _ in PAGES:
        assert f"https://anomaly-raw.vercel.app/drop-01/{slug}/" in sitemap
