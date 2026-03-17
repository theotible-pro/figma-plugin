# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Plugin overview

**Fast Renamer** is a Figma plugin that renames auto-layout frames using Tailwind CSS gap naming conventions (e.g. `gap-2`, `gap-2.5`). No build step — files are loaded directly by Figma.

## Testing

Load the plugin in Figma via **Plugins → Development → Import plugin from manifest** and select `manifest.json`. Changes to `code.js` or `ui.html` take effect on the next plugin run (no reload needed for `ui.html`; restart the plugin for `code.js` changes).

## Architecture

- **`code.js`** — runs in the Figma sandbox (has access to `figma.*` API, no DOM). Receives messages from the UI and mutates node names.
- **`ui.html`** — runs in an isolated iframe (has DOM, no `figma.*` access). Communicates with `code.js` via `parent.postMessage` / `window.onmessage`.
- **`manifest.json`** — declares entry points and target editor (`figma`).
- **`index.html`** — currently empty placeholder.

## Renaming logic

`itemSpacing / 4`, rounded to 1 decimal → `gap-{value}`. Only `FRAME` nodes with `layoutMode !== "NONE"` are renamed; everything else is skipped silently.

## Planned features (from README)

- **Surveillance mode**: auto-rename when gap changes while plugin is open
- **Auto-detect**: scan frames without a `gap-` name on selection / page / whole file and propose renaming
- **Custom UI**: design mockups to be provided by the author
