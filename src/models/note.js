import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  category: {
    type: String,
    enum: ['plot', 'npc', 'location', 'lore'],
    default: 'plot',
  },
  campaign: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: true 
  },

  isPublic: { type: Boolean, default: false },
});

export default mongoose.model('Note', NoteSchema);
