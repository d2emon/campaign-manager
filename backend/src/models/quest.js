import mongoose from 'mongoose';

const QuestSchema = new mongoose.Schema({
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
  campaign: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: true 
  },
});

export default mongoose.model('Quest', QuestSchema);
