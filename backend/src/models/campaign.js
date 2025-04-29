import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  genre: { 
    type: String, 
    enum: ['fantasy', 'sci-fi', 'horror', 'steampunk', 'custom'], 
    default: 'fantasy' 
  },
  coverImage: { type: String, default: '' },

  gameMaster: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  players: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  inviteCode: { type: String, unique: true },

  // Контент кампании

  isPublic: { type: Boolean, default: false },
  lastActive: { type: Date, default: Date.now },

  npcs: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'NPC' 
  }],
  locations: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Location' 
  }],
  quests: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Quest' 
  }],
  notes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Note' 
  }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
});

CampaignSchema.index({ title: 'text', description: 'text' });
CampaignSchema.index({ gameMaster: 1 });
CampaignSchema.index({ inviteCode: 1 }, { unique: true });

export default mongoose.model('Campaign', CampaignSchema);
