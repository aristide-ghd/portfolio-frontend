# Génération d'icônes PWA

Ce dossier doit contenir des icônes PNG pour le manifeste PWA :
- icon-72.png
- icon-96.png
```markdown
# Génération d'icônes PWA

Ce dossier doit contenir des icônes PNG pour le manifeste PWA :
- icon-72.png
- icon-96.png
- icon-128.png
- icon-144.png
- icon-152.png
- icon-192.png (maskable)
- icon-384.png
- icon-512.png (maskable)

Méthode recommandée (script Node avec sharp)

1) Installer les dépendances une fois :

```bash
npm install
```

2) Générer les icônes (depuis la racine du projet) :

```bash
npm run make-icons
```

Le script va lire `public/image.jpeg`, produire une source carrée 1024x1024 centrée puis générer les icônes dans `public/icons/`.

Fallback : ImageMagick (optionnel)

Si tu préfères ImageMagick, voici les commandes de référence :

```bash
# créer un carré centré 1024x1024 puis redimensionner
convert public/image.jpeg -resize 1024x1024^ -gravity center -extent 1024x1024 public/icons/source-square.png
convert public/icons/source-square.png -resize 72x72  public/icons/icon-72.png
convert public/icons/source-square.png -resize 96x96  public/icons/icon-96.png
convert public/icons/source-square.png -resize 128x128 public/icons/icon-128.png
convert public/icons/source-square.png -resize 144x144 public/icons/icon-144.png
convert public/icons/source-square.png -resize 152x152 public/icons/icon-152.png
convert public/icons/source-square.png -resize 192x192 public/icons/icon-192.png
convert public/icons/source-square.png -resize 384x384 public/icons/icon-384.png
convert public/icons/source-square.png -resize 512x512 public/icons/icon-512.png
```

Remarque : tu peux aussi exporter des icônes depuis Figma/Photoshop ou utiliser un générateur en ligne.

``` 
