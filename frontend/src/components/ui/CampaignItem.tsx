import { ReactNode } from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Group,
  Loader,
  Title,
} from '@mantine/core';
import { Edit, Trash } from 'react-feather';

interface CampaignItemProps {
  className?: string;
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
        {children}
      </Card>
    </Box>
  );
};

export default CampaignItem;
