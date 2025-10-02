# Portfolio — frontend

Ceci est le dépôt frontend du portfolio d'Aristide GBOHAÏDA.

Ce README explique rapidement le but du projet, comment lancer l'environnement de développement, générer les icônes PWA, builder et prévisualiser la version de production, et quelques notes de debugging.

## Aperçu
- Stack : Vite + React (TypeScript) + TailwindCSS.
- PWA : manifest + service worker (registre uniquement en production preview/build) + composant d'installation (`src/components/InstallPrompt.tsx`).
- Assets : images dans `public/` (fichiers statiques) et `src/assets/` (importables par Vite).

## Prérequis
- Node.js (version 18+ recommandée)
- npm
- (Optionnel) ImageMagick si tu préfères générer les icônes autrement

Remarque : le script de génération d'icônes utilise `sharp` (déjà listé dans `package.json`). Sur certaines machines, `sharp` requiert les bibliothèques système associées (libvips). Si l'installation de `sharp` échoue, préfère ImageMagick ou génère les icônes manuellement depuis Figma/Photoshop.

## Commandes principales

Installer les dépendances :
```bash
npm install
```

Démarrer le serveur de développement (HMR) :
```bash
npm run dev
```

Builder et prévisualiser (comportement proche de la production, le service worker s'enregistrera en preview) :
```bash
npm run build
npm run preview
```

Générer automatiquement les icônes PWA (créera `public/icons/icon-*.png`) :
```bash
npm run make-icons
```

Lint (si besoin) :
```bash
npm run lint
```

## PWA — manifest & service worker

- Le manifeste est `public/manifest.json`. Il référence les icônes dans `public/icons/`.
- Le service worker est `public/sw.js` et **n'est enregistré que** en production/preview (contrôlé depuis `src/main.tsx` avec `import.meta.env.PROD`). Cela évite des problèmes de cache en développement.
- Le composant d'installation (UI) est dans `src/components/InstallPrompt.tsx` — il gère l'événement `beforeinstallprompt` et affiche une bannière pour l'utilisateur.

Tester le PWA :
1. Génère les icônes (`npm run make-icons`) si ce n'est pas déjà fait.
2. `npm run build && npm run preview`.
3. Ouvre l'URL fournie par `vite preview` dans Chrome (desktop) et mobile (Android). Dans DevTools → Application, vérifie le manifeste et les icônes.
4. Sur Android Chrome, teste "Add to Home screen" / "Install".

## Génération d'icônes
- Script recommandé (déjà ajouté) : `npm run make-icons` — il lit `public/image.jpeg` et produit une source carrée puis les icônes 72 → 512 px dans `public/icons/`.
- Si tu préfères ImageMagick, consulte `public/icons/README.md` (exemples de commandes `convert`) pour générer les PNG.

## Notes importantes
- Les modifications PWA (manifest, sw.js, icons) doivent être testées en build/preview — le service worker n'est pas utilisé en dev pour éviter la mise en cache persistante.
- J'ai retiré quelques `console.log` de debug et renforcé l'overlay du hero pour garantir la lisibilité du texte sur mobile (`src/pages/Index.tsx`).
- Si tu veux forcer que tous les messages de commit soient en français, je peux ajouter un hook Git (pré-commit ou prepare-commit-msg). Dis-le moi avant que je l'ajoute.

## Dépannage rapide
- Si `npm run preview` ne répond pas : vérifie le port (par défaut 4173) et s'il est occupé.
- Si `npm run make-icons` échoue à l'installation de `sharp` : installe les dépendances système pour libvips ou utilise ImageMagick pour générer manuellement les icônes.

## Contribution / commits
- Commit local :
```bash
git add .
git commit -m "Ton message en français ici"
git push origin main
```

Si tu veux que je pousse les commits pour toi, dis-le-moi et je le fais.

## Contact
Pour toute question sur ce dépôt, réponds dans cette conversation ou ouvre une issue dans le dépôt GitHub.

---
Fichier(s) clés :
- `src/main.tsx` — bootstrap + registration SW (production seulement)
- `public/manifest.json` — manifeste PWA
- `public/sw.js` — service worker
- `src/components/InstallPrompt.tsx` — UI d'installation PWA
