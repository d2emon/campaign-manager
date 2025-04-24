import express from 'express';
import * as noteHandler from '../handlers/note.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import gmMiddleware from '../middlewares/gmMiddleware.js';

const router = express.Router();

// router.get('/', authMiddleware, campaignHandler.listCampaigns);

router.post('/:campaignId', authMiddleware, gmMiddleware, noteHandler.createNote);

router.get('/:campaignId/:id', authMiddleware, noteHandler.getNote);

router.put('/:campaignId/:id', authMiddleware, gmMiddleware, noteHandler.updateNote);

router.delete('/:campaignId/:id', authMiddleware, gmMiddleware, noteHandler.removeNote);

export default router;
