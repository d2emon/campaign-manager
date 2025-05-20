import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import config from '../helpers/config.js';

export const uploadMapImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send('Не удаётся загрузить файл');
    }

    const maxSize = config.MAX_IMAGE_SIZE || 5 * 1024 * 1024;
    if (req.file.size > maxSize) {
      fs.unlinkSync(req.file.path);
      return res.status(413).send('Файл слишком большой');
    }

    const filename = `${req.file.filename}.png`;
    const outputPath = path.join('public/images', filename);

    await sharp(req.file.path)
      .resize(1200, null, { withoutEnlargement: true })
      .png({ quality: 80 })
      .toFile(outputPath);

    fs.unlinkSync(req.file.path);

    return res.json({
      url: `${config.BASE_URL || ''}/images/${filename}`,
    });
  } catch (error) {
    return next(error);
  }
};