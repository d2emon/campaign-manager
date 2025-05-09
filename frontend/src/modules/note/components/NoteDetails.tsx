import { Badge, Group, Text } from '@mantine/core';
import CampaignItem from 'components/ui/CampaignItem';
import DateItem from 'components/ui/DateItem';
import { Note } from '../types/note';
import NoteCategory from './NoteCategory';

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
        <Group>
          <NoteCategory category={note.category} />
          {note.tags?.map((tag) => (
            <Badge
              key={tag}
              variant="primary"
            >
              {tag}
            </Badge>
          ))}
        </Group>

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
