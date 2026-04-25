# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Structure

```
src/
  App.tsx          # Root component — all routes defined here
  App.css          # Global styles, layout, home page, responsive breakpoints
  index.css        # CSS variables (--blue, --blue-hover), base resets, typography
  types.ts         # All shared TypeScript types
  main.tsx         # Vite entry point
  components/      # One component per route + Navbar/Footer
```

## Routing

All routes are defined in `App.tsx` using `HashRouter`. The home page (`/`) is an inline JSX element in `App.tsx` — not a separate component.

| Route | Component |
|---|---|
| `/` | Inline in App.tsx |
| `/composers` | ComposerList |
| `/composer/:name` | ComposerInfo |
| `/instrumentation_category` | InstrumentationCategoryList |
| `/instrumentation_category/:category` | InstrumentationCategoryInfo |
| `/difficulty_levels` | DifficultyList |
| `/difficulty_levels/:difficulty` | DifficultyInfo |
| `/piece_lengths` | PieceLengthList |
| `/piece_lengths/:length` | PieceLengthInfo |
| `/piece/:composer/:title` | PieceInfo |

## Data fetching pattern

Every component fetches its data on mount via `useEffect`. There is no shared state, context, or caching — each page fetch is independent. The pattern used throughout:

```tsx
useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}filename.json`)
        .then(res => res.json())
        .then(data => setState(data))
        .catch(err => console.error(err));
}, [param]);
```

`import.meta.env.BASE_URL` is required for GitHub Pages deployment — never use a bare `/` path.

## Component conventions

- **List components** (ComposerList, DifficultyList, etc.) fetch their JSON, render `<h2><Link>` entries.
- **Info components** (ComposerInfo, DifficultyInfo, etc.) fetch two JSONs — the entity record and `pieces.json` — then filter pieces by the URL param. They render the entity fields via `Object.keys()` and a linked piece list below.
- `toTitleCase()` is duplicated in ComposerInfo and PieceInfo — converts `snake_case` field keys to readable labels for display.
- Fields with value `"-"` are filtered out of rendered output on all info pages.

## Types (`types.ts`)

| Type | Key fields |
|---|---|
| `Composer` | composer, composer_cyrillic, birth, death, studied, taught, worked, sources |
| `Piece` | composer, piece_title, instrumentation, instrumentation_category, difficulty_level, length, piece_csv_title |
| `InstrumentationCategory` | instrumentation_category |
| `Difficulty` | difficulty_level |
| `PieceLength` | length |

`piece_csv_title` on `Piece` stores the title as it appears in the photo filename when it differs from `piece_title`. Used by `PieceInfo` to resolve the piece photo path. Leave blank when it matches `piece_title`.

## Styling

- Design token: `--blue: #005BBB` (Ukrainian flag blue) defined in `index.css` — use this for all blue accents, never hardcode other blues.
- `App.css` owns all layout. Navbar and Footer have their own `.css` files.
- Responsive breakpoints are at the bottom of `App.css`: `≤768px` and `≤480px`.
- The `.wrapper` class is a white card with box-shadow used on all detail/info pages.
- The `.home-*` class family owns all home page layout — hero, nav cards, stats bar, about columns, collapsible reference sections.

## Photo resolution (PieceInfo)

```tsx
src = BASE_URL + 'piece_photos/photo_piece_' + composer + '_' + (piece_csv_title || piece_title) + '.jpg'
```

Falls back to `default_photos/default_piece.webp` on error. Composer photos follow the same pattern using `composer_photos/photo_` + name.
