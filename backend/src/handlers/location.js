import Campaign from '../models/campaign.js';
import Location from '../models/location.js';

export const createLocation = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data.slug) {
      return res.status(400).json({
        error: 'Идентификатор обязателен для заполнения',
      })
    }

    const hasSlug = await Location.countDocuments({ slug: data.slug });

    if (hasSlug) {
      return res.status(400).json({
        error: 'Идентификатор уже существует',
      })
    }

    if (!data.name) {
      return res.status(400).json({
        error: 'Название обязательно для заполнения',
      })
    }

    const item = await Location.create({
      ...data,
      campaign: req.params.campaignId,
    });

    await Campaign.findByIdAndUpdate(
      req.params.campaignId,
      {
        $push: { locations: item.id },
      },
    );

    return res.status(201).json(item);
  } catch (error) {
    return next(error);
  }
};

export const getLocation = async (req, res, next) => {
  try {
    const item = await Location.findOne({
      slug: req.params.id,
      campaign: req.params.campaignId,
    }).populate('campaign');
    
    if (!item) {
      return res.status(404).json({ error: 'Локация не найдена' });
    }
      
    return res.json(item);
  } catch (error) {
    return next(error);
  }
};

export const updateLocation = async (req, res, next) => {
  try {
    const data = req.body;
    const item = await Location.updateOne(
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
  
export const removeLocation = async (req, res, next) => {
  try {
    await Location.deleteOne({
      slug: req.params.slug,
      campaign: req.params.campaignId,
    });
    return res.json({
      result: true,
    });
  } catch (error) {
    return next(error);
  }
};
