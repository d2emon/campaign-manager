import Campaign from '../models/campaign.js';
import Note from '../models/note.js';

export const createNote = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data.slug) {
      return res.status(400).json({
        error: 'Идентификатор обязателен для заполнения',
      })
    }

    const hasSlug = await Note.countDocuments({ slug: data.slug });
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

    const item = await Note.create({
      ...data,
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
      slug: req.params.id,
      campaign: req.params.campaignId,
    }).populate('campaign');
    
    if (!item) {
      return res.status(404).json({ error: 'Заметка не найдена' });
    }
      
    return res.json(item);
  } catch (error) {
    return next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const data = req.body;
    const item = await Note.updateOne(
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
  
export const removeNote = async (req, res, next) => {
  try {
    await Note.deleteOne({
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
