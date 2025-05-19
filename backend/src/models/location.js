import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  campaign: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: true 
  },
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
  tags: { type: [String] },
  isPublic: { type: Boolean, default: false },
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret._id;
      return ret;
    },
    virtuals: true,
  },
});

LocationSchema.index({ slug: 1 }, { unique: true })

export default mongoose.model('Location', LocationSchema);
