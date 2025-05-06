import { Copy } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import CharacterList from 'components/modules/Campaign/CharacterList';
import Avatar from 'components/ui/Avatar';
import Badge from 'components/ui/Badge';
import CampaignItem from 'components/ui/CampaignItem';
import DataBlock from 'components/ui/DataBlock';
import DataItem from 'components/ui/DataItem';
import DateItem from 'components/ui/DateItem';
import Spinner from 'components/ui/Spinner';
import TextBlock from 'components/ui/TextBlock';
import { Campaign } from 'types/campaign';

interface CampaignDetailsProps {
  campaign: Campaign;
  isLoading: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  onGenerate?: () => void;
}

const CampaignDetails = ({ campaign, isLoading, onDelete, onEdit, onGenerate }: CampaignDetailsProps) => {
  const navigate = useNavigate();

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const inviteUrl = `${window.location.origin}/campaigns/${campaign.id}/join?inviteCode=${campaign.inviteCode}`;

  const copyInviteUrl = () => {
    navigator.clipboard.writeText(inviteUrl);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DateItem label="Создана:" date={campaign.createdAt} />
            <DateItem label="Последняя активность:" date={campaign.lastActive} />
            <DataItem label="Мастер:">{campaign.gameMaster}</DataItem>
            <DataItem label="Игроков">{campaign.players?.length}</DataItem>
            <DataItem label="Ссылка для приглашения">
              <div className="flex items-center gap-2">
                <Link
                  to={`/campaigns/${campaign.id}/join?inviteCode=${campaign.inviteCode}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {inviteUrl}
                </Link>
                <button
                  onClick={copyInviteUrl}
                  className="p-1 text-gray-500 hover:text-gray-700"
                  title="Скопировать ссылку"
                >
                  <Copy size={18} />
                </button>
              </div>
            </DataItem>
          </dl>
        </DataBlock>
      </CampaignItem>

      <div className="my-6 pt-6">
        Игроки
      </div>

      <div className="my-6 pt-6">
        Локации
      </div>

      <div className="my-6 pt-6">
        Квесты
      </div>

      <div className="my-6 pt-6">
        Заметки
      </div>

      <CharacterList
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