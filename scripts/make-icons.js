/**
 * generate-icons.js
 *
 * Ce script génère différentes tailles d'icônes à partir d'une image source
 * pour les utiliser, par exemple, dans une PWA ou un site web.
 */

const sharp = require('sharp'); // Librairie pour le traitement d'image
const fs = require('fs');       // Pour manipuler le système de fichiers
const path = require('path');   // Pour gérer les chemins de fichiers

// Chemin vers l'image source
const src = path.resolve(__dirname, '../public/image.jpeg');

// Dossier où seront sauvegardées les icônes générées
const outDir = path.resolve(__dirname, '../public/icons');

// Les différentes tailles d'icônes à générer
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Vérification de l'existence de l'image source
if (!fs.existsSync(src)) {
  console.error('Source image not found at', src);
  process.exit(1); // Arrête le script si l'image n'existe pas
}

// Création du dossier de sortie si il n'existe pas
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Fonction async auto-exécutée pour générer les icônes
(async () => {
  try {
    // Crée une version carrée 1024x1024 centrée de l'image pour éviter des crops étranges
    const squareBuffer = await sharp(src)
      .resize(1024, 1024, { fit: 'cover', position: 'center' })
      .png() // Conversion en PNG
      .toBuffer();

    // Génération de toutes les icônes en parallèle
    await Promise.all(
      sizes.map((size) =>
        sharp(squareBuffer)
          .resize(size, size) // Redimensionne à la taille souhaitée
          .png() // Conversion en PNG
          .toFile(path.join(outDir, `icon-${size}.png`)) // Sauvegarde dans le dossier de sortie
      )
    );

    console.log('Icons generated in', outDir);
  } catch (err) {
    console.error('Failed to generate icons', err);
    process.exit(1); // Arrête le script en cas d'erreur
  }
})();
