import { ReactNode } from 'react';
import {
  Badge,
  Button,
  Card,
  Center,
  Group,
  Loader,
  Stack,
  Title,
} from '@mantine/core';
import DataItem from './DataItem';
import DateItem from './DateItem';

interface CampaignItemProps {
  className?: string;
  createdAt?: string;
  updatedAt?: string;
  isLoading?: boolean;
  isPrivate?: boolean;
  title?: ReactNode;
  withDelete?: boolean;
  withEdit?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
}

const CampaignItem = ({
  className,
  createdAt,
  updatedAt,
  isLoading,
  isPrivate,
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
        <Group>
          <Title order={2}>{title}</Title>
          {isPrivate && <Badge variant="danger">Скрытый блок</Badge>}
        </Group>
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

      <Group justify="flex-end">
        <Stack>
          {createdAt && (
            <DataItem label="Создана:">
              <DateItem date={createdAt} />
            </DataItem>
          )}
          {updatedAt && (
            <DataItem label="Обновлена:">
              <DateItem date={updatedAt} />
            </DataItem>
          )}
        </Stack>
      </Group>

      {children}
    </Card>
  );
};

export default CampaignItem;
