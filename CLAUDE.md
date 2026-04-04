# Fast Renamer — Figma Plugin

## Contexte
Plugin Figma qui renomme automatiquement les frames avec auto-layout
en suivant la convention de nommage Tailwind CSS (gap-N).

## Structure du repo
- `plugin/manifest.json` — config du plugin Figma
- `plugin/code.js` — logique de renommage (tourne dans le sandbox Figma)
- `plugin/ui.html` — interface actuelle (à migrer en React)

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
- 🔲 Migration UI vers React (en attente des maquettes)
- 🔲 UI importée depuis design-system

## Idées futures
- 🔲 Détection des frames sans nom gap- (scan : sélection / page / tout le fichier)
- 🔲 Détection des frames avec un nom gap-N incorrect vs gap réel
- 🔲 Mode surveillance : renommage auto quand le gap change (plugin ouvert)

## Repos liés
- Design system : github.com/theotible-pro/design-system
- GitHub : github.com/theotible-pro/figma-plugin

## Architecture UI

### Stack
- React + Vite + vite-plugin-singlefile (tout inliné dans un seul HTML pour Figma)
- Tailwind CSS (scan les composants du design system via @source)
- @theotible-pro/design-system (GitHub Packages)

### Pourquoi vite-plugin-singlefile ?
Figma ne peut pas charger des fichiers JS/CSS externes depuis un plugin.
Tout doit être inliné dans un seul fichier HTML.

### Pourquoi Tailwind dans figma-plugin ?
Le design system utilise des classes Tailwind mais ne génère pas de CSS.
Tailwind dans figma-plugin scanne les composants du design system via :
`@source "../../node_modules/@theotible-pro/design-system/dist"`

### Fichiers UI
- `src/ui/index.html` — point d'entrée
- `src/ui/main.jsx` — bootstrap React
- `src/ui/App.jsx` — composant principal
- `src/ui/index.css` — Tailwind + scan design system
- `plugin/dist/src/ui/index.html` — fichier final buildé pour Figma

### Commandes
- `npm run build` — génère le fichier UI pour Figma
- Après chaque modification UI → toujours rebuilder avant de tester dans Figma
