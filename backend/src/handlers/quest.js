import Campaign from '../models/campaign.js';
import Quest from '../models/quest.js';

export const createQuest = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data.slug) {
      return res.status(400).json({
        error: 'Идентификатор обязателен для заполнения',
      })
    }

    const hasSlug = await Quest.countDocuments({ slug: data.slug });
    if (hasSlug) {
      return res.status(400).json({
        error: 'Идентификатор уже существует',
      })
    }

    if (!data.title) {
      return res.status(400).json({
        error: 'Заголовок обязателен для заполнения',
      })
    }
 
    const item = await Quest.create({
      ...data,
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
      slug: req.params.id,
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
    const data = req.body;
    const item = await Quest.updateOne(
      {
        slug: req.params.id,
        campaign: req.params.campaignId,
      },
      data,
    );
    return res.json(item);
  } catch (error) {
    return next(error);
  }
};
  
export const removeQuest = async (req, res, next) => {
  try {
    await Quest.deleteOne({
      slug: req.params.id,
      campaign: req.params.campaignId,
    });
    return res.json({
      result: true,
    });
  } catch (error) {
    return next(error);
  }
};
