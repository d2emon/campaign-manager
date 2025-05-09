import { Box, Group, Stack, Text } from '@mantine/core';
import Badge from 'components/ui/Badge';
import CampaignItem from 'components/ui/CampaignItem';
import DataBlock from 'components/ui/DataBlock';
import DataItem from 'components/ui/DataItem';
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
      title={note.title}
      withEdit
      withDelete
      onEdit={onEdit}
      onDelete={onDelete}
    >
      <Group>
        {getCategory(note.category)}
        {!note.isPublic && <Badge variant="danger">Скрытая</Badge>}
        {note.tags?.map((tag) => (
          <Badge variant="primary">{tag}</Badge>
        ))}
      </Group>

      <Box>
        <DataItem label="Создана:">
          <DateItem date={note.createdAt} />
        </DataItem>
        <DataItem label="Обновлена:">
          <DateItem date={note.updatedAt} />
        </DataItem>
      </Box>

      <Text>
        {note.content}
      </Text>
    </CampaignItem>
  );
};

export default NoteDetails;
