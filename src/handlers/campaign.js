import Campaign from '../models/campaign.js';

export const listCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({
      $or: [
        { gameMaster: req.user.id },
        { players: req.user.id },
      ],
    })
    return res.json(campaigns);
  } catch (error) {
    return next(error);
  }
};

export const createCampaign = async (req, res, next) => {
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
  } catch (error) {
    return next(error);
  }
};

export const getCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findOne({
      _id: req.params.id,
      $or: [
        { gameMaster: req.user.id },
        { players: req.user.id },
      ],
    }).populate('npcs');

    if (!campaign) {
      return res.status(404).json({
        error: 'Кампания не найдена или неверный код',
      });
    }
    
    return res.json(campaign);
  } catch (error) {
    return next(error);
  }
};

export const updateCampaign = async (req, res, next) => {
  try {
    const { title, description, genre } = req.body;
    const campaign = await Campaign.updateOne(
      {
        _id: req.params.id,
        gameMaster: req.user.id,
      },
      {
        title,
        description,
        genre,
      },
    );
    return res.json(campaign);
  } catch (error) {
    return next(error);
  }
};

export const removeCampaign = async (req, res, next) => {
  try {
    await Campaign.deleteOne({
      id: req.params.id,
      gameMaster: req.user.id,
    });
    return res.json({
      result: true,
    });
  } catch (error) {
    return next(error);
  }
};

export const joinCampaign = async (req, res, next) => {
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
  } catch (error) {
    return next(error);
  }
};
