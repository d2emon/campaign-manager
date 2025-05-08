import { useNavigate } from 'react-router-dom';
import Badge from 'components/ui/Badge';
import CampaignItem from 'components/ui/CampaignItem';
import DataBlock from 'components/ui/DataBlock';
import DataItem from 'components/ui/DataItem';
import DateItem from 'components/ui/DateItem';
import TextBlock from 'components/ui/TextBlock';
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
  const navigate = useNavigate();

  return (
    <CampaignItem
      isLoading={isLoading}
      title={note.title}
      onEdit={onEdit}
      onDelete={onDelete}
    >
      <div className="mb-6">
        {note.category && <Badge variant="primary">{note.category}</Badge>}
        {note.isPrivate && <Badge variant="primary">Личная</Badge>}
      </div>

      <TextBlock>
        {note.content}
      </TextBlock>

      <DataBlock title="Информация о заметке">
        <DateItem label="Создана:" date={note.createdAt} />
        <DateItem label="Обновлена:" date={note.updatedAt} />
        <DataItem label="Категория:">{note.category}</DataItem>
      </DataBlock>
    </CampaignItem>
  );
};

export default NoteDetails;
