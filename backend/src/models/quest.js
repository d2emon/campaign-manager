import mongoose from 'mongoose';

const QuestSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  campaign: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: true 
  },
  title: { type: String, required: true },
  status: {
    type: String,
    enum: ['active', 'completed', 'failed'],
    default: 'active',
  },
  rewards: [{
    name: { type: String },
    quantity: { type: Number },
  }],
  steps: [{
    description: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
  }],
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

QuestSchema.index({ slug: 1 }, { unique: true });

export default mongoose.model('Quest', QuestSchema);
