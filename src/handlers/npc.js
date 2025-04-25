import Campaign from '../models/campaign.js';
import NPC from '../models/npc.js';

export const createNPC = async (req, res, next) => {
  try {
    const { name, race, role } = req.body;
    const item = await NPC.create({
      name,
      race,
      role,
      campaign: req.params.campaignId,
    });

    await Campaign.findByIdAndUpdate(
      req.params.campaignId,
      {
        $push: { npcs: item.id },
      },
    );

    return res.status(201).json(item);
  } catch (error) {
    return next(error);
  }
};

export const getNPC = async (req, res, next) => {
  try {
    const item = await NPC.findOne({
      _id: req.params.id,
      campaign: req.params.campaignId,
    }).populate('campaign');
    
    if (!item) {
      return res.status(404).json({
        error: 'Персонаж не найден или неверный код',
      });
    }
      
    return res.json(item);
  } catch (error) {
    return next(error);
  }
};

export const updateNPC = async (req, res, next) => {
  try {
    const { name, race, role } = req.body;
    const item = await NPC.updateOne(
      {
        _id: req.params.id,
        campaign: req.params.campaignId,
      },
      {
        name,
        race,
        role,
      },
    );
    return res.json(item);
  } catch (error) {
    return next(error);
  }
};
  
export const removeNPC = async (req, res, next) => {
  try {
    await NPC.deleteOne({
      _id: req.params.id,
      campaign: req.params.campaignId,
    });
    return res.json({
      result: true,
    });
  } catch (error) {
    return next(error);
  }
};
  