import { Group, Text } from '@mantine/core';
import Badge from 'components/ui/Badge';
import CampaignItem from 'components/ui/CampaignItem';
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
      createdAt={note.createdAt}
      updatedAt={note.updatedAt}
      isLoading={isLoading}
      isPrivate={true}
      title={note.title}
      withEdit
      withDelete
      onEdit={onEdit}
      onDelete={onDelete}
    >
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

      <Text>
        {note.content}
      </Text>
    </CampaignItem>
  );
};

export default NoteDetails;
