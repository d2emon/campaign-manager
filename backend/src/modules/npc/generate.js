import data from './data.js';

const RACE_KEYS = {
  'гном': 'dwarf',
  'орк': 'orc',
  'эльф': 'elf',
};

const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomRace = () => {
  const totalWeight = data.races.reduce((sum, race) => sum + race.weight, 0);
  const random = Math.random() * totalWeight;

  let currentWeight = 0;
  for (const race of data.races) {
    currentWeight += race.weight;
    if (random <= currentWeight) {
      return race;
    }
  }

  return data.races[0];
};

const getRandomName = (race) => {
  const names = data.names[race];
  return randomItem(names);
};

const getRandomProfession = () => {
  return randomItem(data.professions);
};
  
const getRandomTrait = () => {
  const alignments = Object.keys(data.traits);
  const alignment = randomItem(alignments);
  const traits = data.traits[alignment];
  return {
    alignment, // добрый/злой/нейтральный
    trait: randomItem(traits),
  };
};

const generateNPC = () => {
  const race = getRandomRace();
  const name = getRandomName(race.id);
  const profession = getRandomProfession();
  const { alignment, trait } = getRandomTrait();
  
  return {
    name,
    race: race.id,
    profession,
    alignment,
    trait,
    description: `${name} — ${race.name}, ${profession}. ${trait} (${alignment}).`
  };
};

export default generateNPC;
