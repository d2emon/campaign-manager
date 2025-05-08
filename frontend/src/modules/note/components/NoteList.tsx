import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import Paper from 'components/ui/Paper';
import { Note } from '../types/note';

interface NoteListProps {
  notes?: Note[];
  campaignId?: string;
  className?: string;
  withAddButton?: boolean;
  onAdd?: () => void;
  onEdit?: (note: Note) => void;
  onDelete?: (note: Note) => void;
}

const NoteList = ({
  notes,
  campaignId = '',
  className,
  withAddButton = false,
  onAdd,
  onEdit,
  onDelete,
}: NoteListProps) => {
  const navigate = useNavigate();

  const handleNoteClick = (noteId: string) => {
    navigate(`/campaigns/${campaignId}/notes/${noteId}`);
  };

  return (
    <Paper className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Заметки</h2>
        {withAddButton && (
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="primary"
              onClick={onAdd}
            >
              Добавить заметку
            </Button>
          </div>
        )}
      </div>

      {notes && notes.length > 0 ? (
        <div className="space-y-4">
          {notes.map((note) => (
            <Paper
              key={note.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleNoteClick(note.id)}
              title={note.title}
            >
              <div className="flex items-center space-x-2">
                { onEdit && (
                  <Button
                    variant="secondary"
                    onClick={() => onEdit(note)}
                  >
                    Редактировать
                  </Button>
                )}
                { onDelete && (
                  <Button
                    variant="danger"
                    onClick={() => onDelete(note)}
                  >
                    Удалить
                  </Button>
                )}
              </div>
            </Paper>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-gray-600">
            Заметки не найдены
          </p>
        </div>
      )}
    </Paper>
  );
};

export default NoteList;
