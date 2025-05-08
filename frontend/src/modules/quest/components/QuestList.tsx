import Badge from 'components/ui/Badge';
import Button from 'components/ui/Button';
import Paper from 'components/ui/Paper';
import TextBlock from 'components/ui/TextBlock';
import { Quest } from '../types/quest';
import { useNavigate } from 'react-router-dom';

interface QuestListProps {
  className?: string;
  quests?: Quest[];
  campaignId?: string;
  withAddButton?: boolean;
  onAdd?: () => void;
  onEdit?: (quest: Quest) => void;
  onDelete?: (quest: Quest) => void;
}

const QuestList = ({
  className,
  quests,
  campaignId,
  withAddButton = false,
  onAdd,
  onEdit,
  onDelete,
}: QuestListProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: Quest['status']) => {
    switch (status) {
      case 'active':
        return 'primary';
      case 'completed':
        return 'success';
      case 'failed':
        return 'danger';
      default:
        return 'default';
    }
  };

  const handleQuestClick = (questId: string) => {
    navigate(`/campaigns/${campaignId}/quests/${questId}`);
  };

  return (
    <Paper className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Квесты кампании</h2>
        {withAddButton && (
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="primary"
              onClick={onAdd}
            >
              Добавить квест
            </Button>
          </div>
        )}
      </div>
        
      {quests && quests.length > 0 ? (
        <div className="space-y-4">
          {quests.map((quest) => (
            <Paper
              key={quest.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleQuestClick(quest.id)}
            >
              <div className="flex justify-between items-center mb-1">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {quest.title}
                    <Badge
                      variant={getStatusColor(quest.status)}
                    >
                      {quest.status.charAt(0).toUpperCase() + quest.status.slice(1)}
                    </Badge>
                  </h3>  
                </div>
                <div className="flex items-center space-x-2">
                  {onEdit && (
                    <Button
                      variant="secondary"
                      onClick={() => onEdit(quest)}
                    >
                      Редактировать
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="danger"
                      onClick={() => onDelete(quest)}
                    >
                      Удалить
                    </Button>
                  )}
                </div>
              </div>

              <TextBlock>
                {quest.description}
              </TextBlock>

              {quest.rewards.length > 0 && (
                <div className="mb-1">
                  <div className="flex flex-wrap gap-2">
                    Rewards:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quest.rewards.map((reward, index) => (
                      <Badge
                        key={index}
                        variant="outlined"
                      >
                        {`${reward.name} (${reward.quantity})`}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {quest.steps.length > 0 && (
                <div>
                  <div className="flex flex-wrap gap-2">
                    Progress:
                  </div>
                  <div className="flex flex-wrap gap-2 text-secondary">
                    {quest.steps.filter((step) => step.isCompleted).length} / {quest.steps.length} steps completed
                  </div>
                </div>
              )}
            </Paper>
          ))}
        </div>
      ): (
        <div className="text-center text-gray-500 py-4">
          В этой кампании пока нет квестов
        </div>
      )}
    </Paper>
  );
};

export default QuestList;
