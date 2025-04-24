import mongoose from 'mongoose';
import generateNPC from '../modules/npc/generate.js';

const NPCSchema = new mongoose.Schema({
  name: { type: String, required: true },
  race: {
    type: String,
    enum: ['human', 'elf', 'dwarf', 'orc', 'custom'],
    default: 'human',
  },
  profession: { type: String },
  alignment: { type: String },
  trait: { type: String },
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

NPCSchema.methods.generate = async function () {
  const npc = generateNPC();
  this.name = npc.name;
  this.race = npc.race;
  this.profession = npc.profession;
  this.alignment = npc.alignment;
  this.trait = npc.trait;
  this.description = npc.description;
  return this;
};

export default mongoose.model('NPC', NPCSchema);
