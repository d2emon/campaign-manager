import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  campaign: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: true 
  },
  title: { type: String, required: true },
  content: { type: String },
  category: {
    type: String,
    enum: ['plot', 'npc', 'location', 'lore'],
    default: 'plot',
  },
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

NoteSchema.index({ slug: 1 }, { unique: true });

export default mongoose.model('Note', NoteSchema);
