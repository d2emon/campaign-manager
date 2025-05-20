import express from 'express';
import multer from 'multer';
import * as imageHandler from '../handlers/image.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import gmMiddleware from '../middlewares/gmMiddleware.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/map/:campaignId/:locationId', authMiddleware, gmMiddleware, upload.single('image'), imageHandler.uploadMapImage);

export default router;
