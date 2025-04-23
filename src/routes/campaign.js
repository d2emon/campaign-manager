import express from 'express';
import * as campaignHandler from '../handlers/campaign.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import gmMiddleware from '../middlewares/gmMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, campaignHandler.listCampaigns);

router.post('/', authMiddleware, gmMiddleware, campaignHandler.createCampaign);

router.get('/:id', authMiddleware, campaignHandler.getCampaign);

router.put('/:id', authMiddleware, gmMiddleware, campaignHandler.updateCampaign);

router.delete('/:id', authMiddleware, gmMiddleware, campaignHandler.removeCampaign);

router.post('/:id/join', authMiddleware, campaignHandler.joinCampaign);
      
export default router;
