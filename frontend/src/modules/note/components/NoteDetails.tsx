import { Group, Text } from '@mantine/core';
import CampaignItem from 'components/ui/CampaignItem';
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
      isPrivate={!note.isPublic}
      title={note.title}
      headSection={<NoteCategory category={note.category} />}
      tags={note.tags}
      createdAt={note.createdAt}
      updatedAt={note.updatedAt}
      withEdit
      withDelete
      onEdit={onEdit}
      onDelete={onDelete}
    >
      <Group>
        <Text>
          {note.content}
        </Text>
      </Group>
    </CampaignItem>
  );
};

export default NoteDetails;
