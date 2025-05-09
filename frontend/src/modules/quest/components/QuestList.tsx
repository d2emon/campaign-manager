import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  SimpleGrid,
  Title,
} from '@mantine/core';
import TextBlock from 'components/ui/TextBlock';
import { Quest } from '../types/quest';
import { Plus } from 'react-feather';

interface QuestListProps {
  className?: string;
  quests?: Quest[];
  campaignId?: string;
  withAddButton?: boolean;
  withEditButton?: boolean;
  withDeleteButton?: boolean;
  onAdd?: () => void;
  onEdit?: (quest: Quest) => void;
  onDelete?: (quest: Quest) => void;
}

const QuestList = ({
  className,
  quests,
  campaignId,
  withAddButton = false,
  withEditButton = false,
  withDeleteButton = false,
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

  const createEditHandler = (quest: Quest) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (onEdit) {
      onEdit(quest);
    }
  };

  const createDeleteHandler = (quest: Quest) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (onDelete) {
      onDelete(quest);
    }
  };

  return (
    <Box className={className}>
      <Group justify="space-between" mb="md">
        <Title order={2}>Квесты кампании</Title>
        {withAddButton && (
          <Button
            type="button"
            variant="primary"
            leftSection={<Plus size={16} />}
            onClick={onAdd}
          >
            Добавить квест
          </Button>
        )}
      </Group>
        
      {quests && quests.length > 0 ? (
        <SimpleGrid cols={2}>
          {quests.map((quest) => (
            <Card
              key={quest.slug}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleQuestClick(quest.slug)}
            >
              <div className="flex justify-between items-center mb-1">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {quest.title}
                    {quest.status && (
                      <Badge
                        variant={getStatusColor(quest.status)}
                      >
                        {quest.status.charAt(0).toUpperCase() + quest.status.slice(1)}
                      </Badge>
                    )}
                  </h3>  
                </div>
                <div className="flex items-center space-x-2">
                  {withEditButton && (
                    <Button
                      variant="secondary"
                      onClick={createEditHandler(quest)}
                    >
                      Редактировать
                    </Button>
                  )}
                  {withDeleteButton && (
                    <Button
                      variant="danger"
                      onClick={createDeleteHandler(quest)}
                    >
                      Удалить
                    </Button>
                  )}
                </div>
              </div>

              <TextBlock>
                {quest.description}
              </TextBlock>

              {quest.rewards && quest.rewards.length > 0 && (
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

              {quest.steps && quest.steps.length > 0 && (
                <div>
                  <div className="flex flex-wrap gap-2">
                    Progress:
                  </div>
                  <div className="flex flex-wrap gap-2 text-secondary">
                    {quest.steps.filter((step) => step.isCompleted).length} / {quest.steps.length} steps completed
                  </div>
                </div>
              )}
            </Card>
          ))}
        </SimpleGrid>
      ): (
        <div className="text-center text-gray-500 py-4">
          В этой кампании пока нет квестов
        </div>
      )}
    </Box>
  );
};

export default QuestList;
