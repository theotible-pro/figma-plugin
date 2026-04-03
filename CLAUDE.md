# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Plugin overview

**Fast Renamer** is a Figma plugin that renames auto-layout frames using Tailwind CSS gap naming conventions (e.g. `gap-2`, `gap-2.5`).

# Fast Renamer — Figma Plugin

## Contexte
Plugin Figma qui renomme automatiquement les frames avec auto-layout
en suivant la convention de nommage Tailwind CSS (gap-N).

## Structure du repo

```
/                    — app React (UI du plugin, Storybook, composants)
  src/               — composants React
  index.html         — entrée Vite
  vite.config.js     — config Vite
  components.json    — config shadcn/ui
/plugin/             — fichiers du plugin Figma (sandbox)
  manifest.json      — config du plugin Figma
  code.js            — logique de renommage (sandbox Figma, pas de DOM)
  ui.html            — interface actuelle (vanilla, à migrer en React)
```

## Stack (racine)

- **React 19** — UI framework
- **Vite** — dev server et bundler (`vite.config.js`)
- **Storybook 10** — librairie de composants (`npm run storybook`, port 6006)
- **shadcn/ui** — composants UI (`components.json`)
- **Tailwind CSS v4** — styles (via `@tailwindcss/vite`)
- **Lucide React** — icônes
- **Vitest + Playwright** — tests

## Commands

```bash
npm run dev          # start Vite dev server
npm run build        # production build
npm run storybook    # start Storybook on port 6006
npm run lint         # ESLint
```

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

## Figma plugin integration

The plugin communicates between two sandboxed environments:
- **`plugin/code.js`** — runs in the Figma sandbox (access to `figma.*` API, no DOM). Receives messages from the UI and mutates node names.
- **`plugin/ui.html`** — runs in an isolated iframe (has DOM, no `figma.*` access). Communicates with `code.js` via `parent.postMessage` / `window.onmessage`.
- **`plugin/manifest.json`** — declares entry points and target editor (`figma`).

Load the plugin in Figma via **Plugins → Development → Import plugin from manifest** and select `plugin/manifest.json`.

## État actuel
- ✅ V1 fonctionnelle : renomme la sélection
- ✅ React + Vite + Storybook + shadcn + Tailwind + Lucide installés
- ✅ Fichiers plugin déplacés dans `/plugin`
- 🔲 Migration UI vers React (en attente des maquettes)
- 🔲 Composants Storybook (en attente des maquettes)

## Idées futures
- 🔲 Détection des frames sans nom gap- (scan : sélection / page / tout le fichier)
- 🔲 Détection des frames avec un nom gap-N incorrect vs gap réel
- 🔲 Mode surveillance : renommage auto quand le gap change (plugin ouvert)

## GitHub
github.com/theotible-pro/figma-plugin
