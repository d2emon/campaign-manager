import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['city', 'dungeon', 'forest', 'tavern'],
    default: 'city',
  },
  mapImage: { type: String },
  markers: [{
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    label: { type: String, required: true },
    isSecret: { type: Boolean, default: false },
  }],
  campaign: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: true 
  },
});

export default mongoose.model('Location', LocationSchema);
