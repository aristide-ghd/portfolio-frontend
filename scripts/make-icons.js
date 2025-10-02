const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../public/image.jpeg');
const outDir = path.resolve(__dirname, '../public/icons');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

if (!fs.existsSync(src)) {
  console.error('Source image not found at', src);
  process.exit(1);
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
  try {
    // Create a centered square source of 1024x1024 to avoid odd crops
    const squareBuffer = await sharp(src)
      .resize(1024, 1024, { fit: 'cover', position: 'center' })
      .png()
      .toBuffer();

    await Promise.all(
      sizes.map((size) =>
        sharp(squareBuffer)
          .resize(size, size)
          .png()
          .toFile(path.join(outDir, `icon-${size}.png`))
      )
    );

    console.log('Icons generated in', outDir);
  } catch (err) {
    console.error('Failed to generate icons', err);
    process.exit(1);
  }
})();
