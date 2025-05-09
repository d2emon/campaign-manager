import CampaignItem from 'components/ui/CampaignItem';
import { Quest } from '../types/quest';

interface QuestDetailsProps {
  quest: Quest;
  isLoading?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
}

const QuestDetails = ({
  quest,
  isLoading,
  onDelete,
  onEdit,
}: QuestDetailsProps) => {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Активен';
      case 'completed':
        return 'Завершен';
      case 'failed':
        return 'Провален';
      default:
        return status;
    }
  };

  return (
    <CampaignItem
      isLoading={isLoading}
      title={quest.title}
      onEdit={onEdit}
      onDelete={onDelete}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{quest.title}</h1>
          {quest.status && (
            <div className="text-sm text-gray-500">
              Статус: <span className="font-medium">{getStatusLabel(quest.status)}</span>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Описание</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{quest.description}</p>
        </div>

        {quest.rewards?.map((reward) => (
          <div key={reward.name}>
            <h2 className="text-lg font-semibold mb-2">Награда</h2>
            <p className="text-gray-700">{reward.name}</p>
          </div>
        ))}
      </div>
    </CampaignItem>
  );
};

export default QuestDetails;
