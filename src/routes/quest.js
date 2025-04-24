import express from 'express';
import * as questHandler from '../handlers/quest.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import gmMiddleware from '../middlewares/gmMiddleware.js';

const router = express.Router();

// router.get('/', authMiddleware, campaignHandler.listCampaigns);

router.post('/:campaignId', authMiddleware, gmMiddleware, questHandler.createQuest);

router.get('/:campaignId/:id', authMiddleware, questHandler.getQuest);

router.put('/:campaignId/:id', authMiddleware, gmMiddleware, questHandler.updateQuest);

router.delete('/:campaignId/:id', authMiddleware, gmMiddleware, questHandler.removeQuest);

export default router;
