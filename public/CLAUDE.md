# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Data files

All data is stored as paired CSV + JSON files. The CSV is the source of truth — always edit the CSV, then regenerate the JSON. Never edit the JSON directly.

| CSV / JSON | Contents |
|---|---|
| `composers` | 259 composers |
| `pieces` | 675 pieces |
| `instrumentation_categories` | 17 instrumentation categories |
| `difficulty_levels` | Difficulty level labels |
| `piece_lengths` | Piece length bucket labels |

**Regenerating JSON from CSV:**
```bash
python3 -c "
import csv, json
for name in ['composers', 'pieces', 'instrumentation_categories', 'difficulty_levels', 'piece_lengths']:
    with open(f'public/{name}.csv', encoding='utf-8') as f:
        data = list(csv.DictReader(f))
    with open(f'public/{name}.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print(f'{name}: {len(data)} rows')
"
```

## Photos

**Composer photos** → `composer_photos/` (236 photos)
Naming: `photo_LASTNAME, Firstname.jpg`

**Piece photos** → `piece_photos/` (459 photos)
Naming: `photo_piece_LASTNAME, Firstname_Piece Title.jpg`

**Fallbacks** → `default_photos/`
- `default_silhouette.svg` — used when no composer photo exists
- `default_piece.webp` — used when no piece photo exists

### Photo–piece title matching

Piece photos are matched to pieces using the `piece_csv_title` field in `pieces.csv/json`. This field stores the title as it appears in the photo filename when it differs from `piece_title`. If `piece_csv_title` is blank, `piece_title` is used directly for the photo lookup.

When adding a new piece photo whose filename title doesn't match the `piece_title` in the CSV exactly, set `piece_csv_title` to the title portion of the filename and regenerate the JSON.

### Known filename edge cases
- Some older piece photos use a comma instead of underscore to separate composer and title: `photo_piece_LASTNAME, Firstname, Title.jpg`
- Some photo filenames have minor spelling differences from the composer name in the CSV (e.g. `HERAYSMENKO` vs `HERASYMENKO`, `KVASNEWSKIY` vs `KVASNEVSKIY`) — these are handled via `piece_csv_title`
