# Fast Renamer — Figma Plugin

## C'est quoi ?
Plugin Figma qui renomme automatiquement les frames avec auto-layout
en suivant la convention de nommage Tailwind CSS (gap-N).

## Logique de renommage
- Cible : uniquement les frames avec auto-layout (type === FRAME, layoutMode !== NONE)
- Ignoré : composants, ellipses, frames sans auto-layout
- Format : gap-N (N = px ÷ 4, max 1 décimale)
- Exemples : 8px → gap-2 / 10px → gap-2.5 / 16px → gap-4

## Fichiers
- manifest.json : config du plugin
- code.js : logique de renommage
- ui.html : interface du plugin

## État actuel
- ✅ V1 fonctionnelle : renomme la sélection

## Idées futures
- 🔲 Mode surveillance : renommage auto quand le gap change (plugin ouvert)
- 🔲 Détection auto : scan des frames sans nom gap- sur sélection / page / tout le fichier
- 🔲 UI custom : design à venir (maquettes fournies par l'auteur)

## Stack
- Figma Plugin API
- HTML / CSS / JS vanilla