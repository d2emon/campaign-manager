import mongoose from 'mongoose';

const NPCSchema = new mongoose.Schema({
  name: { type: String, required: true },
  race: {
    type: String,
    enum: ['human', 'elf', 'dwarf', 'orc', 'custom'],
    default: 'human',
  },
  role: { type: String, default: 'neutral' },
  description: { type: String, default: '' },
  stats: {
    strength: { type: Number, min: 1, max: 20, default: 10 },
    charisma: { type: Number, min: 1, max: 20, default: 10 },
  },
  campaign: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: true 
  },

  isPublic: { type: Boolean, default: false },
});

export default mongoose.model('NPC', NPCSchema);
