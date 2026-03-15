"""
Extract scanned certificate images from the Access database.

Reads the 'Record of Deaths' attachment field, strips the Access OLE header,
and writes each JPEG to scripts/extracted-scans/ with a mapping JSON.

The person's name and death date are parsed from the attachment filename
(e.g. "Mary Jane Price 21-2-1956.jpg") rather than the row reference,
which doesn't reliably map to the correct death record.

Usage: python3 scripts/extract-scans.py
"""

import json
import os
import re

from access_parser import AccessParser

ACCDB_PATH = os.path.join(
    os.path.dirname(__file__), "..", "..", "LLBC Cemetery - current.accdb"
)
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "extracted-scans")
MAP_FILE = os.path.join(OUTPUT_DIR, "_image_record_map.json")

ATTACHMENT_TABLE = "f_C29F71F0327946EFAF92C31BA578F2AD_Field1"
DEATHS_TABLE = "Record of Deaths"

JPEG_SOI = b"\xff\xd8"

DATE_PATTERN = re.compile(r"^(.+?)\s+(\d{1,2})-(\d{1,2})-(\d{4})\.\w+$")
IMG_PATTERN = re.compile(r"^IMG_\d+", re.IGNORECASE)


def strip_access_header(data: bytes) -> bytes:
    """Remove the Access attachment header, returning raw image bytes."""
    idx = data.find(JPEG_SOI)
    if idx == -1:
        return data
    return data[idx:]


def sanitize_filename(name: str) -> str:
    return re.sub(r'[\\/:*?"<>|]', "_", name).strip()


def parse_name_from_filename(filename: str) -> dict:
    """
    Parse person name and year of death from an attachment filename.
    Formats: "Mary Jane Price 21-2-1956.jpg" or "IMG_5437.JPG"
    """
    m = DATE_PATTERN.match(filename)
    if m:
        full_name = m.group(1).strip()
        year = int(m.group(4))
        parts = full_name.split()
        if len(parts) >= 2:
            surname = parts[-1]
            given_name = parts[0]
            middle_names = " ".join(parts[1:-1]) if len(parts) > 2 else None
        else:
            surname = full_name
            given_name = ""
            middle_names = None
        return {
            "fullName": full_name,
            "surname": surname,
            "givenName": given_name,
            "middleNames": middle_names,
            "yearOfDeath": year,
        }

    if IMG_PATTERN.match(filename):
        return {
            "fullName": filename.split(".")[0],
            "surname": "",
            "givenName": "",
            "middleNames": None,
            "yearOfDeath": None,
        }

    base = filename.rsplit(".", 1)[0] if "." in filename else filename
    parts = base.split()
    if len(parts) >= 2:
        return {
            "fullName": base,
            "surname": parts[-1],
            "givenName": parts[0],
            "middleNames": " ".join(parts[1:-1]) if len(parts) > 2 else None,
            "yearOfDeath": None,
        }
    return {
        "fullName": base,
        "surname": base,
        "givenName": "",
        "middleNames": None,
        "yearOfDeath": None,
    }


def find_death_record(parsed, deaths, total):
    """Find a matching death record by name and optional year."""
    surname = parsed["surname"].lower()
    given = parsed["givenName"].lower()

    for j in range(total):
        ds = (deaths["Surname"][j] or "").strip().lower()
        dg = (deaths["Given Name"][j] or "").strip().lower()
        dm = (deaths["Middle Name(s)"][j] or "").strip().lower()
        dy = deaths["Year"][j]

        if ds != surname:
            continue

        full_given = f"{dg} {dm}".strip() if dm else dg
        if dg == given or full_given == f"{given} {(parsed['middleNames'] or '').lower()}".strip():
            if parsed["yearOfDeath"] and dy:
                if int(dy) == parsed["yearOfDeath"]:
                    return j, 1.0
            else:
                return j, 0.8
    return None, 0.0


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print(f"Opening database: {ACCDB_PATH}")
    db = AccessParser(ACCDB_PATH)

    deaths = db.parse_table(DEATHS_TABLE)
    attachments = db.parse_table(ATTACHMENT_TABLE)

    total_deaths = len(deaths["ID"])
    total_attachments = len(attachments["FileName"])
    print(f"Found {total_deaths} death records, {total_attachments} attachments\n")

    image_map: list[dict] = []
    extracted = 0
    matched = 0
    skipped = 0

    for i in range(total_attachments):
        file_data = attachments["FileData"][i]
        file_name = attachments["FileName"][i]

        if not isinstance(file_data, bytes) or len(file_data) == 0:
            print(f"  SKIP: No data for attachment {i} ({file_name})")
            skipped += 1
            continue

        parsed = parse_name_from_filename(file_name)
        match_idx, score = find_death_record(parsed, deaths, total_deaths)

        if match_idx is not None:
            surname = (deaths["Surname"][match_idx] or "").strip()
            given_name = (deaths["Given Name"][match_idx] or "").strip()
            middle_names = deaths["Middle Name(s)"][match_idx]
            year_of_death = deaths["Year"][match_idx]
            year_int = int(year_of_death) if year_of_death else None
            matched_name = f"{given_name} {surname}".strip()
            matched += 1
        else:
            surname = parsed["surname"]
            given_name = parsed["givenName"]
            middle_names = parsed["middleNames"]
            year_int = parsed["yearOfDeath"]
            matched_name = parsed["fullName"]
            score = 0.0

        image_bytes = strip_access_header(file_data)

        safe_name = sanitize_filename(file_name)
        if not safe_name.lower().endswith((".jpg", ".jpeg", ".png")):
            safe_name += ".jpg"

        out_path = os.path.join(OUTPUT_DIR, safe_name)
        if os.path.exists(out_path):
            base, ext = os.path.splitext(safe_name)
            counter = 2
            while os.path.exists(os.path.join(OUTPUT_DIR, f"{base}_{counter}{ext}")):
                counter += 1
            safe_name = f"{base}_{counter}{ext}"
            out_path = os.path.join(OUTPUT_DIR, safe_name)

        with open(out_path, "wb") as f:
            f.write(image_bytes)

        image_map.append(
            {
                "imageFilename": safe_name,
                "parsedName": file_name,
                "matchedName": matched_name,
                "surname": surname.strip(),
                "givenName": given_name.strip(),
                "middleNames": middle_names.strip() if middle_names else None,
                "yearOfDeath": year_int,
                "score": score,
            }
        )

        extracted += 1
        size_kb = len(image_bytes) / 1024
        tag = "MATCH" if score > 0 else "NONAME" if IMG_PATTERN.match(file_name) else "NOMATCH"
        print(f"  [{extracted:3d}] [{tag:7s}] {matched_name} (d.{year_int}) <- {safe_name} ({size_kb:.0f}KB)")

    with open(MAP_FILE, "w") as f:
        json.dump(image_map, f, indent=2)

    print(f"\n=== Extraction Summary ===")
    print(f"  Extracted: {extracted}")
    print(f"  Matched:   {matched}")
    print(f"  Skipped:   {skipped}")
    print(f"  Map file:  {MAP_FILE}")


if __name__ == "__main__":
    main()
