import CampaignItem from 'components/ui/CampaignItem';
import Spinner from 'components/ui/Spinner';
import { Character } from 'types/character';

interface CharacterDetailsProps {
  character: Character;
  isLoading: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

const CharacterDetails = ({ character, isLoading, onDelete, onEdit }: CharacterDetailsProps) => {
  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <CampaignItem
        isLoading={isLoading}
        title={character.name}
        onEdit={onEdit}
        onDelete={onDelete}
      >
        <div className="mb-6">
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            Уровень {character.level}
          </span>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-700">{character.description}</p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Информация о персонаже</h2>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Имя игрока</dt>
              <dd className="mt-1 text-sm text-gray-900">{character.playerName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Раса</dt>
              <dd className="mt-1 text-sm text-gray-900">{character.race}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Класс</dt>
              <dd className="mt-1 text-sm text-gray-900">{character.class}</dd>
            </div>
          </dl>
        </div>
      </CampaignItem>
    </div>
  );
};

export default CharacterDetails;
