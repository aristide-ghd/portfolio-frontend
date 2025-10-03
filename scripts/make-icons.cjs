/**
 * generate-icons.js
 *
 * Script pour générer plusieurs tailles d'icônes à partir d'une image source.
 * Utilise Sharp pour le redimensionnement et le traitement d'image.
 *
 * Fonctionnalités :
 * - Lit l'image source (image.jpeg)
 * - Crée une version carrée centrée de 1024x1024 pour éviter les crops étranges
 * - Génère plusieurs tailles d'icônes (72x72 → 512x512)
 * - Sauvegarde les icônes dans un dossier 'icons'
 */

const sharp = require('sharp');   // Bibliothèque de manipulation d'images
const fs = require('fs');         // Module pour gérer le système de fichiers
const path = require('path');     // Module pour gérer les chemins de fichiers

// Chemin de l'image source
const src = path.resolve(__dirname, '../public/image.jpeg');
// Dossier de sortie pour les icônes
const outDir = path.resolve(__dirname, '../public/icons');

// Tailles d'icônes à générer
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Vérifie si l'image source existe
if (!fs.existsSync(src)) {
  console.error('Source image not found at', src);
  process.exit(1);
}

// Crée le dossier de sortie s'il n'existe pas
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Fonction async auto-exécutée pour générer les icônes
(async () => {
  try {
    // Crée un carré 1024x1024 centré pour éviter les crops bizarres
    const squareBuffer = await sharp(src)
      .resize(1024, 1024, { fit: 'cover', position: 'center' })
      .png() // Convertit en PNG
      .toBuffer();

    // Génère toutes les tailles d'icônes en parallèle
    await Promise.all(
      sizes.map((size) =>
        sharp(squareBuffer)
          .resize(size, size)                       // Redimensionne au format souhaité
          .png()                                    // Convertit en PNG
          .toFile(path.join(outDir, `icon-${size}.png`)) // Sauvegarde dans le dossier
      )
    );

    console.log('Icons generated in', outDir);
  } catch (err) {
    console.error('Failed to generate icons', err);
    process.exit(1);
  }
})();
