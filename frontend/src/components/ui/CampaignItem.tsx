import {
  Button,
  Card,
  Center,
  Group,
  Loader,
  Title,
} from '@mantine/core';

interface CampaignItemProps {
  className?: string;
  isLoading?: boolean;
  title?: string;
  withDelete?: boolean;
  withEdit?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
}

const CampaignItem = ({
  className,
  isLoading,
  title,
  withDelete,
  withEdit,
  onEdit,
  onDelete,
  children,
}: CampaignItemProps) => {
  if (isLoading) {
    return (
      <Card className={className}>
        <Center>
          <Loader />
        </Center>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <Group justify="space-between">
        <Title order={2}>{title}</Title>
        <Group>
          {withEdit && (
            <Button variant="default" onClick={onEdit}>
              Редактировать
            </Button>
          )}
          {withDelete && (
            <Button  color="red" onClick={onDelete}>
              Удалить
            </Button>
          )}
        </Group>
      </Group>

      {children}
    </Card>
  );
};

export default CampaignItem;
