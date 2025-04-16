import express from 'express';
import debug from 'debug';
import Campaign from '../models/campaign.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import gmMiddleware from '../middlewares/gmMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      $or: [
        { gameMaster: req.user.id },
        { players: req.user.id },
      ],
    })
    return res.json(campaigns);
  } catch(error) {
    debug(`${process.env.APP_NAME}:users:error`)(`Error: ${error}`);
    console.error(error);  
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.post('/', authMiddleware, gmMiddleware, async (req, res) => {
  try {
    const { title, description, genre } = req.body;
    const campaign = await Campaign.create({
      title,
      description,
      genre,
      gameMaster: req.user.id,
      inviteCode: `INV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    });
    return res.status(201).json(campaign);
  } catch(error) {
    debug(`${process.env.APP_NAME}:users:error`)(`Error: ${error}`);
    console.error(error);  
    return res.status(500).json({
      error: error.message,
    });
  }
 });

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const campaign = await Campaign.findOne({
      id: req.params.id,
      players: req.user.id,
    });
    if (!campaign) {
      return res.status(404).json({
        error: 'Кампания не найдена или неверный код',
      });
    }

    return res.json(campaign);
  } catch(error) {
    debug(`${process.env.APP_NAME}:users:error`)(`Error: ${error}`);
    console.error(error);  
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.put('/:id', authMiddleware, gmMiddleware, async (req, res) => {
  try {
    const { title, description, genre } = req.body;
    const campaign = await Campaign.updateOne(
      {
        id: req.params.id,
        gameMaster: req.user.id,
      },
      {
        title,
        description,
        genre,
      },
    );
    return res.json(campaign);
  } catch(error) {
    debug(`${process.env.APP_NAME}:users:error`)(`Error: ${error}`);
    console.error(error);  
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.delete('/:id', authMiddleware, gmMiddleware, async (req, res) => {
  try {
    await Campaign.deleteOne({
      id: req.params.id,
      gameMaster: req.user.id,
    });
    return res.json({
      result: true,
    });
  } catch(error) {
    debug(`${process.env.APP_NAME}:users:error`)(`Error: ${error}`);
    console.error(error);  
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.post('/:id/join', authMiddleware, async (req, res) => {
  try {
    const campaign = await Campaign.findOne({
      id: req.params.id,
      inviteCode: req.query.inviteCode,
    });
    if (!campaign) {
      return res.status(404).json({
        error: 'Кампания не найдена или неверный код',
      });
    }

    campaign.players.push(req.user.id);
    await campaign.save();

    return res.json(campaign);
  } catch(error) {
    debug(`${process.env.APP_NAME}:users:error`)(`Error: ${error}`);
    console.error(error);  
    return res.status(500).json({
      error: error.message,
    });
  }
});
      
export default router;
