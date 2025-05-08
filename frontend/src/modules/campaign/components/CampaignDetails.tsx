import { useNavigate } from 'react-router-dom';
import Avatar from 'components/ui/Avatar';
import Badge from 'components/ui/Badge';
import CampaignItem from 'components/ui/CampaignItem';
import DataBlock from 'components/ui/DataBlock';
import DataItem from 'components/ui/DataItem';
import DataItemLink from 'components/ui/DataItemLink';
import DateItem from 'components/ui/DateItem';
import TextBlock from 'components/ui/TextBlock';
import CharacterList from 'modules/character/components/CharacterList';
import LocationList from 'modules/location/components/LocationList';
import NoteList from 'modules/note/components/NoteList';
import QuestList from 'modules/quest/components/QuestList';
import { Campaign } from '../types/campaign';

interface CampaignDetailsProps {
  campaign: Campaign;
  isLoading?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  onGenerate?: () => void;
}

const CampaignDetails = ({ campaign, isLoading=false, onDelete, onEdit, onGenerate }: CampaignDetailsProps) => {
  const navigate = useNavigate();

  const inviteUrl = `${window.location.origin}/campaigns/${campaign.id}/join?inviteCode=${campaign.inviteCode}`;

  return (
    <div>
      <CampaignItem
        className="mb-6"
        isLoading={isLoading}
        title={campaign.title}
        onDelete={onDelete}
        onEdit={onEdit}
      >
        <div className="mb-6">
          { campaign.genre && <Badge variant="primary">{campaign.genre}</Badge> }
          { campaign.gameSystem && <Badge variant="primary">{campaign.gameSystem}</Badge> }
          { campaign.isPublic && <Badge variant="primary">Публичная</Badge> }
        </div>

        <div className="mb-6">
          <Avatar
            src={campaign.coverImage}
            alt={campaign.title}
            className="w-full object-cover"
            size="xxl"
          />
        </div>

        <TextBlock>
          {campaign.description}
        </TextBlock>

        <DataBlock title="Информация о кампании">
          <DateItem label="Создана:" date={campaign.createdAt} />
          <DateItem label="Последняя активность:" date={campaign.lastActive} />
          <DataItem label="Мастер:">{campaign.gameMaster}</DataItem>
          <DataItem label="Игроков">{campaign.players?.length}</DataItem>
          <DataItemLink
            label="Ссылка для приглашения"
            url={inviteUrl}
            withCopyButton
          />
        </DataBlock>
      </CampaignItem>

      <div className="my-6 pt-6">
        Игроки
      </div>

      <LocationList
        className="my-6"
        campaignId={campaign.id}
        locations={campaign.locations || []}
        withAddButton
        onAdd={() => {
          navigate(`/campaigns/${campaign.id}/locations/new`);
        }}
      />

      <QuestList
        className="my-6"
        quests={campaign.quests || []}
        campaignId={campaign.id}
        withAddButton
        onAdd={() => {
          navigate(`/campaigns/${campaign.id}/quests/new`);
        }}
      />

      <NoteList
        className="my-6"
        notes={campaign.notes || []}
      />

      <CharacterList
        className="my-6"
        characters={campaign.npcs}
        withAddButton
        onAdd={() => {
          navigate(`/campaigns/${campaign.id}/characters/new`);
        }}
        onGenerate={onGenerate}
      />
    </div>
  );
};

export default CampaignDetails; 