import express from 'express';
import * as npcHandler from '../handlers/npc.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import gmMiddleware from '../middlewares/gmMiddleware.js';

const router = express.Router();

// router.get('/', authMiddleware, campaignHandler.listCampaigns);

router.post('/:campaignId', authMiddleware, gmMiddleware, npcHandler.createNPC);

router.get('/:campaignId/:id', authMiddleware, npcHandler.getNPC);

router.put('/:campaignId/:id', authMiddleware, gmMiddleware, npcHandler.updateNPC);

router.delete('/:campaignId/:id', authMiddleware, gmMiddleware, npcHandler.removeNPC);

export default router;
