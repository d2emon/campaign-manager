import { ReactNode } from 'react';
import { Edit, Trash } from 'react-feather';
import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Group,
  Loader,
  Text,
  Title,
} from '@mantine/core';
import DateItem from './DateItem';

interface CampaignItemProps {
  className?: string;
  createdAt?: string;
  headSection?: ReactNode;
  isLoading?: boolean;
  isPrivate?: boolean;
  tags?: string[];
  title?: ReactNode;
  updatedAt?: string;
  withDelete?: boolean;
  withEdit?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
}

const CampaignItem = ({
  className,
  createdAt,
  headSection,
  isLoading,
  isPrivate,
  tags,
  title,
  updatedAt,
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
    <Box className={className}>
      <Group justify="space-between">
        <Group align="center">
          <Title order={2} style={{ marginBottom: 0 }}>{title}</Title>
          {isPrivate && (
            <Badge color="red" size="sm">
              Скрытый блок
            </Badge>
          )}
        </Group>
        <Group gap="xs">
          {withEdit && (
            <Button 
              variant="default"
              size="sm"
              leftSection={<Edit size={16} />}
              onClick={onEdit}
            >
              Редактировать
            </Button>
          )}
          {withDelete && (
            <Button
              color="red"
              size="sm" 
              leftSection={<Trash size={16} />}
              onClick={onDelete}
            >
              Удалить
            </Button>
          )}
        </Group>
      </Group>

      <Card mt="md">
        <Group justify="space-between">
          <Group>
            {headSection}
            {tags?.map((tag) => (
              <Badge
                key={tag}
                variant="primary"
              >
                {tag}
              </Badge>
            ))}
          </Group>

          <Group mt="md" mb="md" justify="flex-end" gap="md">
            {createdAt && (
              <div>
                <Text size="sm" c="dimmed">Создано:</Text>
                <DateItem date={createdAt} format={{ year: 'numeric', month: 'short', day: 'numeric' }} />
              </div>
            )}
            {updatedAt && updatedAt !== createdAt && (
              <div>
                <Text size="sm" c="dimmed">Обновлено:</Text>
                <DateItem date={updatedAt} format={{ year: 'numeric', month: 'short', day: 'numeric' }} />
              </div>
            )}
          </Group>
        </Group>

        {children}
      </Card>
    </Box>
  );
};

export default CampaignItem;
