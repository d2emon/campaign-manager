import Badge from 'components/ui/Badge';
import CampaignItem from 'components/ui/CampaignItem';
import DataBlock from 'components/ui/DataBlock';
import DataItem from 'components/ui/DataItem';
import Spinner from 'components/ui/Spinner';
import TextBlock from 'components/ui/TextBlock';
import { Character } from '../types/character';

interface CharacterDetailsProps {
  character: Character;
  isLoading?: boolean;
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
            { character.isPublic && <Badge variant="primary">Публичный</Badge> }
        </div>

        <TextBlock>
          {character.description}
        </TextBlock>

        <DataBlock title="Информация о персонаже">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DataItem label="Имя игрока:">{character.playerName}</DataItem>
            <DataItem label="Раса:">{character.race}</DataItem>
            <DataItem label="Класс:">
              {character.characterClass}
              {' '}
              <Badge variant="primary">Уровень {character.level}</Badge>
            </DataItem>
            { character.profession && <DataItem label="Профессия:">{character.profession}</DataItem> }
            { character.alignment && <DataItem label="Мировозрение:">{character.alignment}</DataItem> }
            { character.trait && <DataItem label="Черта:">{character.trait}</DataItem> }
            { character.role && <DataItem label="Роль:">{character.role}</DataItem> }
          </dl>
        </DataBlock>

        <DataBlock title="Характеристики">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DataItem label="Сила:">{character.stats?.strength || '-'}</DataItem>
            <DataItem label="Харизма:">{character.stats?.charisma || '-'}</DataItem>
          </dl>
        </DataBlock>
      </CampaignItem>
    </div>
  );
};

export default CharacterDetails;
