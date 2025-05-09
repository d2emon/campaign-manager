import {  Badge, Box, Card, Group, Text } from '@mantine/core';
import CampaignItem from 'components/ui/CampaignItem';
import DateItem from 'components/ui/DateItem';
import { Note } from '../types/note';

interface NoteDetailsProps {
  note: Note;
  isLoading?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
}

const NoteDetails = ({
  note,
  isLoading,
  onDelete,
  onEdit
}: NoteDetailsProps) => {
  const getCategory = (category?: string) => {
    switch (category) {
      case 'plot':
        return <Badge variant="primary">Сюжет</Badge>;
      case 'npc':
        return <Badge variant="primary">Персонажи</Badge>;
      case 'location':
        return <Badge variant="primary">Локации</Badge>;
      case 'lore':
        return <Badge variant="primary">Лоре</Badge>;
      default:
        return null;
    }
  };

  return (
    <CampaignItem
      isLoading={isLoading}
      isPrivate={true}
      title={note.title}
      withEdit
      withDelete
      onEdit={onEdit}
      onDelete={onDelete}
    >
      <Group justify="space-between">
        <Box>
          <Group>
            {getCategory(note.category)}
            {note.tags?.map((tag) => (
              <Badge
                key={tag}
                variant="primary"
              >
                {tag}
              </Badge>
            ))}
          </Group>
        </Box>

        <Group mt="md" mb="md" justify="flex-end" gap="md">
          {note.createdAt && (
            <Text size="sm" c="dimmed">
              Создано: <DateItem date={note.createdAt} format={{ year: 'numeric', month: 'short', day: 'numeric' }} />
            </Text>
          )}
          {note.updatedAt && note.updatedAt !== note.createdAt && (
            <Text size="sm" c="dimmed">
              Обновлено: <DateItem date={note.updatedAt} format={{ year: 'numeric', month: 'short', day: 'numeric' }} />
            </Text>
          )}
        </Group>
      </Group>

      <Group>
        <Text>
          {note.content}
        </Text>
      </Group>
    </CampaignItem>
  );
};

export default NoteDetails;
