import Campaign from '../models/campaign.js';
import Note from '../models/note.js';

export const createNote = async (req, res, next) => {
  try {
    const { content, category } = req.body;
    const item = await Note.create({
      content,
      category,
      campaign: req.params.campaignId,
    });

    await Campaign.findByIdAndUpdate(
      req.params.campaignId,
      {
        $push: { notes: item.id },
      },
    );

    return res.status(201).json(item);
  } catch (error) {
    return next(error);
  }
};

export const getNote = async (req, res, next) => {
  try {
    const item = await Note.findOne({
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

export const updateNote = async (req, res, next) => {
  try {
    const { name, race, role } = req.body;
    const item = await Note.updateOne(
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
  
export const removeNote = async (req, res, next) => {
  try {
    await Note.deleteOne({
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
