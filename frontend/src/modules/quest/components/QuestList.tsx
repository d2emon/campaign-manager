import Badge from 'components/ui/Badge';
import Paper from 'components/ui/Paper';
import TextBlock from 'components/ui/TextBlock';
import { Quest } from '../types/quest';

interface QuestListProps {
  className?: string;
  quests?: Quest[];
}

const QuestList = ({ quests, className }: QuestListProps) => {
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

  return (
    <Paper className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Квесты кампании</h2>

        {quests && quests.length > 0 ? (
          <div className="flex items-center space-x-2">
            {quests.map((quest) => (
              <Paper key={quest.id}>
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {quest.title}
                    </h3>  
                  </div>

                  <h6 className="text-lg font-semibold text-gray-900">
                    {quest.title}
                  </h6>

                  <Badge
                    variant={getStatusColor(quest.status)}
                  >
                    {quest.status.charAt(0).toUpperCase() + quest.status.slice(1)}
                  </Badge>
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
      </div>  
    </Paper>
  );
};

export default QuestList;
