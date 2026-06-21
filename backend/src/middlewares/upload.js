import multer from 'multer';
import path from 'node:path';
import { HttpError } from '../helpers/HttpError.js';

const tempDir = path.resolve('temp');

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (_req, file, cb) => {
    const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniquePrefix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(HttpError(400, 'Only image files are allowed'));
      return;
    }
    cb(null, true);
  },
});

export function uploadPhoto(req, res, next) {
  upload.single('photo')(req, res, error => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof multer.MulterError) {
      next(HttpError(400, error.message));
      return;
    }

    if (!error.status) {
      error.status = 400;
    }

    next(error);
  });
}
