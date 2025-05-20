import {
  Badge,
} from '@mantine/core';
import CampaignItem from 'components/ui/CampaignItem';
import DataBlock from 'components/ui/DataBlock';
import DataItem from 'components/ui/DataItem';
import TextBlock from 'components/ui/TextBlock';
import { Character } from '../types/character';

interface CharacterDetailsProps {
  character: Character;
  isLoading?: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

const CharacterDetails = ({ character, isLoading, onDelete, onEdit }: CharacterDetailsProps) => {
  return (
    <CampaignItem
      isLoading={isLoading}
      title={character.name}
      onEdit={onEdit}
      onDelete={onDelete}
    >
      <div className="space-y-4">
        <div className="mb-6">
          { character.isPublic && <Badge variant="primary">Публичный</Badge> }
        </div>

        <TextBlock>
          {character.description}
        </TextBlock>

        <DataBlock title="Информация о персонаже">
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
        </DataBlock>

        <DataBlock title="Характеристики">
          <DataItem label="Сила:">{character.stats?.strength || '-'}</DataItem>
          <DataItem label="Харизма:">{character.stats?.charisma || '-'}</DataItem>
        </DataBlock>
      </div>
    </CampaignItem>
  );
};

export default CharacterDetails;
