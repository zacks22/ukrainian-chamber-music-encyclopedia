# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start local dev server
npm run build      # Type-check + build for production (tsc -b && vite build)
npm run lint       # Run ESLint
npm run preview    # Preview production build locally
npm run deploy     # Build and deploy to GitHub Pages (gh-pages -d dist)
```

There are no tests in this project.

## Architecture

This is a React + TypeScript + Vite SPA deployed to `https://ukrainianchambermusic.com` via GitHub Pages.

**Routing** uses `HashRouter` (not `BrowserRouter`) — required for GitHub Pages static hosting. All routes are defined in `src/App.tsx`.

**Data flow**: All data lives as static JSON files in `public/`. Components fetch their data via `fetch(import.meta.env.BASE_URL + 'filename.json')` inside `useEffect` on mount. There is no backend or API.

**Data files** (all in `public/`):
- `composers.json` / `.csv` — 259 composers
- `pieces.json` / `.csv` — 675 pieces
- `instrumentation_categories.json` / `.csv` — 17 categories
- `difficulty_levels.json` / `.csv` — difficulty levels
- `piece_lengths.json` / `.csv` — length buckets

**Updating data**: When a new CSV is received, copy it to `public/`, then regenerate the JSON using Python:
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
There is also a `public/csv_to_json.py` script with hardcoded paths (old machine path) — use the inline command above instead.

**Photos** are stored in `public/composer_photos/` and `public/piece_photos/`. Naming convention:
- Composers: `photo_composer_LASTNAME, Firstname.jpg`
- Pieces: `photo_piece_LASTNAME, Firstname_Piece Title.jpg`

Falls back to `public/default_photos/default_silhouette.svg` (composer) or `default_piece.webp` (piece) on image load error.

**Types** are defined in `src/types.ts`: `Composer`, `Piece`, `InstrumentationCategory`, `Difficulty`, `PieceLength`.

**`vite.config.ts`**: `base` is set to `'/'` for production. If running on a subdomain path during development, change to `'/ukrainian-chamber-music-encyclopedia/'`.

**Key note on `instrumentation_categories`**: The source CSV uses the header `instrumentation` but the app and JSON use `instrumentation_category`. When updating this file, remap the column name during conversion.
