import Campaign from '../models/campaign.js';
import Quest from '../models/quest.js';

export const createQuest = async (req, res, next) => {
  try {
    const { title, description, reward, status } = req.body;
    const item = await Quest.create({
      title,
      description,
      reward,
      status,
      campaign: req.params.campaignId,
    });

    await Campaign.findByIdAndUpdate(
      req.params.campaignId,
      {
        $push: { quests: item.id },
      },
    );

    return res.status(201).json(item);
  } catch (error) {
    return next(error);
  }
};

export const getQuest = async (req, res, next) => {
  try {
    const item = await Quest.findOne({
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

export const updateQuest = async (req, res, next) => {
  try {
    const { name, race, role } = req.body;
    const item = await Quest.updateOne(
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
  
export const removeQuest = async (req, res, next) => {
  try {
    await Quest.deleteOne({
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
