import CampaignItem from 'components/ui/CampaignItem';
import MarkdownText from 'components/ui/Markdown';
import NoteCategory from './NoteCategory';
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
      <MarkdownText>
        {note.content}
      </MarkdownText>
    </CampaignItem>
  );
};

export default NoteDetails;
