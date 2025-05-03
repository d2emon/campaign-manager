import { Character } from 'types/character';

interface CharacterListProps {
  characters?: Character[];
}

const CharacterList = ({ characters }: CharacterListProps) => {
  if (!characters || characters.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        В этой кампании пока нет персонажей
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {characters.map((character) => (
        <div
          key={character.id}
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {character.name}
              </h3>
              <p className="text-sm text-gray-500">
                Игрок: {character.playerName}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Уровень {character.level}
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              {character.race} {character.class}
            </p>
            {character.description && (
              <p className="mt-2 text-sm text-gray-700">
                {character.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterList; 