import Campaign from '../models/campaign.js';
import Location from '../models/location.js';

export const createLocation = async (req, res, next) => {
  try {
    const { name, race, role } = req.body;
    const item = await Location.create({
      name,
      race,
      role,
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

export const updateLocation = async (req, res, next) => {
  try {
    const { name, race, role } = req.body;
    const item = await Location.updateOne(
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
  
export const removeLocation = async (req, res, next) => {
  try {
    await Location.deleteOne({
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
