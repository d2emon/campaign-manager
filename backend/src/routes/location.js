import express from 'express';
import * as locationHandler from '../handlers/location.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import gmMiddleware from '../middlewares/gmMiddleware.js';

const router = express.Router();

// router.get('/', authMiddleware, campaignHandler.listCampaigns);

router.post('/:campaignId', authMiddleware, gmMiddleware, locationHandler.createLocation);

router.get('/:campaignId/:id', authMiddleware, locationHandler.getLocation);

router.put('/:campaignId/:id', authMiddleware, gmMiddleware, locationHandler.updateLocation);

router.delete('/:campaignId/:id', authMiddleware, gmMiddleware, locationHandler.removeLocation);

export default router;
