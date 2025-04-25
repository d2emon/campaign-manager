import express from 'express';
import * as campaignHandler from '../handlers/campaign.js';
import * as npcHandler from '../handlers/npc.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import gmMiddleware from '../middlewares/gmMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, campaignHandler.listCampaigns);

router.post('/', authMiddleware, gmMiddleware, campaignHandler.createCampaign);

router.get('/:id', authMiddleware, campaignHandler.getCampaign);

router.put('/:id', authMiddleware, gmMiddleware, campaignHandler.updateCampaign);

router.delete('/:id', authMiddleware, gmMiddleware, campaignHandler.removeCampaign);

router.post('/:id/join', authMiddleware, campaignHandler.joinCampaign);

router.post('/:campaignId/npc', authMiddleware, gmMiddleware, npcHandler.createNPC);

router.post('/:id/npc/generate', authMiddleware, gmMiddleware, campaignHandler.addRandomNpc);

export default router;
