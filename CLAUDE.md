# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Plugin overview

**Fast Renamer** is a Figma plugin that renames auto-layout frames using Tailwind CSS gap naming conventions (e.g. `gap-2`, `gap-2.5`).

# Fast Renamer — Figma Plugin

## Contexte
Plugin Figma qui renomme automatiquement les frames avec auto-layout
en suivant la convention de nommage Tailwind CSS (gap-N).

## Stack technique
- React + Vite (UI du plugin)
- Storybook (librairie de composants)
- Lucide React (icônes)
- HTML/CSS/JS vanilla → en cours de migration vers React
- Figma Plugin API

## Fichiers principaux
- `manifest.json` — config du plugin Figma
- `code.js` — logique de renommage (tourne dans le sandbox Figma)
- `ui.html` — interface actuelle (vanilla, à migrer en React)

## Logique de renommage
- Cible : uniquement les FRAME avec layoutMode !== "NONE"
- Ignoré : composants, ellipses, frames sans auto-layout
- Formule : gap-N où N = itemSpacing ÷ 4, arrondi à 1 décimale max
- Exemples : 8px → gap-2 / 10px → gap-2.5 / 16px → gap-4

## Message protocol (UI ↔ plugin)
| Direction | Message type | Payload |
|---|---|---|
| UI → plugin | `rename` | none — déclenche le renommage |
| UI → plugin | `close` | none — ferme le plugin |
| Plugin → UI | `done` | `{ count: number }` |

## État actuel
- ✅ V1 fonctionnelle : renomme la sélection
- ✅ React + Vite installés
- ✅ Storybook installé
- ✅ Lucide React installé
- 🔲 Migration UI vers React (en attente des maquettes)
- 🔲 Composants Storybook (en attente des maquettes)

## Idées futures
- 🔲 Détection des frames sans nom gap- (scan : sélection / page / tout le fichier)
- 🔲 Détection des frames avec un nom gap-N incorrect vs gap réel
- 🔲 Mode surveillance : renommage auto quand le gap change (plugin ouvert)

## GitHub
github.com/theotible-pro/figma-plugin

## Stack

- **React 19** — UI framework
- **Vite 8** — dev server and bundler (`vite.config.js`)
- **Storybook 10** — component development and documentation (`npm run storybook`, port 6006)
- **Lucide React** — icon library
- **Vitest + Playwright** — testing

## Commands

```bash
npm run dev          # start Vite dev server
npm run build        # production build
npm run storybook    # start Storybook on port 6006
npm run lint         # ESLint
```

## Architecture

- **`src/`** — React components and application code
- **`index.html`** — Vite entry point
- **`vite.config.js`** — Vite configuration with React plugin
- **`eslint.config.js`** — ESLint flat config

## Figma plugin integration

The plugin communicates between two sandboxed environments:
- **`code.js`** — runs in the Figma sandbox (access to `figma.*` API, no DOM). Receives messages from the UI and mutates node names.
- **`ui.html`** — runs in an isolated iframe (has DOM, no `figma.*` access). Communicates with `code.js` via `parent.postMessage` / `window.onmessage`.
- **`manifest.json`** — declares entry points and target editor (`figma`).

Load the plugin in Figma via **Plugins → Development → Import plugin from manifest** and select `manifest.json`.

## Renaming logic

`itemSpacing / 4`, rounded to 1 decimal → `gap-{value}`. Only `FRAME` nodes with `layoutMode !== "NONE"` are renamed; everything else is skipped silently.

## Planned features

- **Surveillance mode**: auto-rename when gap changes while plugin is open
- **Auto-detect**: scan frames without a `gap-` name on selection / page / whole file and propose renaming
- **Custom UI**: design mockups to be provided by the author

